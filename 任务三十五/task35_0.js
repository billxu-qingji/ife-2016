/*
* @Author: Administrator
* @Date:   2017-02-24 14:51:47
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-25 21:56:12
*/

// TRA LEF：向屏幕的左侧移动一格，方向不变
// TRA TOP：向屏幕的上面移动一格，方向不变
// TRA RIG：向屏幕的右侧移动一格，方向不变
// TRA BOT：向屏幕的下面移动一格，方向不变
// MOV LEF：方向转向屏幕左侧，并向屏幕的左侧移动一格
// MOV TOP：方向转向屏幕上面，向屏幕的上面移动一格
// MOV RIG：方向转向屏幕右侧，向屏幕的右侧移动一格
// MOV BOT：方向转向屏幕下面，向屏幕的下面移动一格

'use strict';
// 命令类
function Command(options){
	this._init(options);
}
Command.prototype = {
	_init: function(options){
		// 存储命令
		this.command = [];
		// 存储单个命令
		this.value = [];
		// 保存目前处在第几行
		this.num = 1;

		this.bindDom(options);
		this.bindEvent();
	},
	// 绑定dom元素
	bindDom: function(options){
		this.ipt = options.ipt;
		this.exeBtn = options.exeBtn;
		this.refreshBtn = options.refreshBtn;
		this.ol = options.ol;
	},
	// 绑定事件
	bindEvent: function(){
		this.ipt.addEventListener("keypress", this.keypressHandler.bind(this), false);
		this.refreshBtn.addEventListener("click", this.clickRefreshBtnHandler.bind(this), false);
	},
	// 处理键盘输入事件
	keypressHandler: function(event){
		if(event.keyCode != 13){
			this.value.push(String.fromCharCode(event.keyCode));
		}else{
			console.log(this.value);
			var li = document.createElement("li");
			this.ol.appendChild(li);
			li.innerHTML = ++this.num;

			var valueStr = this.value.join("");
			// 对命令进行合法性判断
			if(this.checkValue(valueStr)){
				this.command.push(valueStr);
			}else{
				li.previousElementSibling.style.background = "red";
			}
			this.value.splice(0);
		}
	},
	// 处理点击refresh按钮事件
	clickRefreshBtnHandler: function(){
		this.reStart();
	},
	// 恢复原状
	reStart: function(){
		this.ipt.value = "";
		this.num = 0;
		this.command = [];
		this.value = [];
	},
	// 合法性检查
	checkValue: function(str){
		return /^(TRA|MOV)\s+(LEF|RIG|TOP|BOT)\s*(\d*)$/i.test(str) || /^GO\s*\d*/i.test(str);
	},
}
var command = new Command({
	ipt: document.getElementById("ipt"),
	exeBtn: document.getElementById("exeBtn"),
	refreshBtn: document.getElementById("refreshBtn"),
	ol: document.getElementById("list"),
});
// 移动类
function MoveBox(options){
	this._init(options);
}
MoveBox.prototype = {
	_init: function(options){
		this.bindDom(options);
		this.bindEvent();
		this.createTable();

		// 保存当前的方向
		this.direction = "TOP";
		// 获取当前样式
		this.currentLeft = parseInt(this.getStyle(this.box, "left"));
		this.currentTop = parseInt(this.getStyle(this.box, "top"));
	},
	bindDom: function(options){
		this.box = options.box;
		this.exeBtn = options.exeBtn;
		this.container = options.container;
	},
	bindEvent: function(){
		this.exeBtn.addEventListener("click", this.clickHandler.bind(this), false);
	},
	callBack: function(item){
		var values = item.toUpperCase().split(" ");
		switch(values[0]){
			case "GO":
				if(!values[1]){
					values.push(1);
				}
				this.move(this.direction, values[1]); 
				break;
			case "TRA":
				if(!values[2]){
					values.push(1);
				}
				this.move(values[1], values[2]);
				break;
			case "MOV":
				if(!values[2]){
					values.push(1);
				}
				this.rotate(values[1], values[2]);
				this.move(values[1], values[2]);
				break;
			default: 
				console.log("no this type");
				break;
		}
	},
	clickHandler: function(){
		command.command.forEach(function(item, i){
			if(i == 0){
				this.callBack(item);
			}else{
				setTimeout(this.callBack.bind(this, item), 2000);
			}
		},this);
		command.reStart();
	},
		// 平移
	move: function(value, num){
		switch(value){
			case "LEF":
				for(var i=0; i<num; i++){
					if(this.currentLeft <= 40){
						alert("已到达边界");
					}else{
						this.currentLeft -= 40;
						this.box.style.left = this.currentLeft + "px";
					}
				}
				break;
			case "RIG":
				for(var i=0; i<num; i++){
					if(this.currentLeft >= 360){
						alert("已到达边界");
					}else{
						this.currentLeft += 40;
						this.box.style.left = this.currentLeft + "px";
					}
				}
				break;
			case "TOP":
				for(var i=0; i<num; i++){
					if(this.currentTop <= 40){
						alert("已到达边界");
					}else{
						this.currentTop -= 40;
						this.box.style.top = this.currentTop + "px";
					}
				}
				break;
			case "BOT":
				for(var i=0; i<num; i++){
					if(this.currentTop >= 360){
						alert("已到达边界");
					}else{
						this.currentTop += 40;
						this.box.style.top = this.currentTop + "px";
					}
				}
				break;
			default: 
				alert("无效指令");
				break;
		}
	},
	// 旋转
	rotate: function(value){
		this.direction = value;
		switch(value){
			case "LEF":
				this.box.style.webkitTransform = "rotate(-90deg)";
				break;
			case "RIG":
				this.box.style.webkitTransform = "rotate(90deg)";
				break;
			case "TOP":
				this.box.style.webkitTransform = "rotate(0deg)";
				break;
			case "BOT":
				this.box.style.webkitTransform = "rotate(180deg)";
				break;
			default: 
				alert("无效指令");
				break;
		}
	},
	// 获取样式
	getStyle: function(dom, name){
		if(window.getComputedStyle){
			return window.getComputedStyle(dom, null)[name];
		}else{
			return dom.currentStyle[name];
		}
	},
	createTable: function(){
		var table = document.createElement("table");
		table.cellSpacing = 0;
		for(var i=0; i<10; i++){
			var tr = document.createElement("tr");
			for(var j=0; j<10; j++){
				var td = document.createElement("td");
				if(i == 0){
					if(j != 0){
						td.innerText = j;
					}
				}else{
					if(j == 0){
						td.innerText = i;
					}
				}
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}
		this.container.appendChild(table);
	},
}
var moveBox = new MoveBox({
	box: document.getElementById("box"),
	exeBtn: document.getElementById("exeBtn"),
	container: document.getElementById("container"),
});