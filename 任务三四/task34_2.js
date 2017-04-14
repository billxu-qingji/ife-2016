/*
* @Author: Administrator
* @Date:   2017-02-24 14:51:47
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-24 16:35:38
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
function MoveBox(options){
	this._init(options);
}
MoveBox.prototype = {
	// 初始化对象
	_init: function(options){
		this.bindDom(options);
		this.createTable();
		this.bindEvent();

		this.currentLeft = parseInt(this.getStyle(this.box, "left"));
		this.currentTop = parseInt(this.getStyle(this.box, "top"));
	},
	// 绑定dom元素
	bindDom: function(options){
		this.container = options.container;
		this.ipt = options.ipt;
		this.box = options.box;
		this.btn = options.btn;
	},
	// 创建表格
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
	// 绑定事件
	bindEvent: function(){
		this.btn.addEventListener("click", this.handlerClick.bind(this), false);
	},
	// 事件处理
	handlerClick: function(){
		var values = this.ipt.value.toUpperCase().split(" ");
		if(values[0] == "TRA"){
			this.move(values[1]);
		}else if(values[0] == "MOV"){
			this.rotate(values[1]);
			this.move(values[1]);
		}else{
			alert("无效指令");
		}
	},
	// 平移
	move: function(value){

		switch(value){
			case "LEF":
				if(this.currentLeft <= 40){
					alert("已到达边界");
				}else{
					this.currentLeft -= 40;
					this.box.style.left = this.currentLeft + "px";
				}
				break;
			case "RIG":
				if(this.currentLeft >= 360){
					alert("已到达边界");
				}else{
					this.currentLeft += 40;
					this.box.style.left = this.currentLeft + "px";
				}
				break;
			case "TOP":
				if(this.currentTop <= 40){
					alert("已到达边界");
				}else{
					this.currentTop -= 40;
					this.box.style.top = this.currentTop + "px";
				}
				break;
			case "BOT":
				if(this.currentTop >= 360){
					alert("已到达边界");
				}else{
					this.currentTop += 40;
					this.box.style.top = this.currentTop + "px";
				}
				break;
			default: 
				alert("无效指令");
				break;
		}
	},
	// 旋转
	rotate: function(value){
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
}

var moveBox = new MoveBox({
	container: document.getElementById("container"),
	ipt: document.getElementById("ipt"),
	btn: document.getElementById("btn"),
	box: document.getElementById("box"),
});