/*
 * @Author: Administrator
 * @Date:   2017-02-27 21:11:01
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-03 10:24:49
 */

'use strict';
var obedientBox = {
	// 创建地图
	createMap: function(container) {
		var table = document.createElement("table");
		table.cellSpacing = 0;
		for (var i = 0; i < 10; i++) {
			var tr = document.createElement("tr");
			for (var j = 0; j < 10; j++) {
				var td = document.createElement("td");
				if (i == 0) {
					if (j != 0) {
						td.innerText = j;
					}
				} else {
					if (j == 0) {
						td.innerText = i;
					}
				}
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}
		container.appendChild(table);
	},
	// 获取命令
	getCommand: {
		init: function(options){
			this.bindDOM(options);
			this.bindEvent(options);
		},
		bindDOM: function(options){
			this.ipt = options.ipt;
			this.list = options.list;
			this.refresh = options.refresh;
		},
		bindEvent: function(){
			this.ipt.addEventListener("keydown", this.keydownHandler.bind(this), false);
			this.ipt.addEventListener("focus", this.focusHandler.bind(this), false);
			this.ipt.addEventListener("blur", this.blurHandler.bind(this), false);
			this.ipt.addEventListener("scroll", this.scrollHandler.bind(this), false);
			this.refresh.addEventListener("click", this.refreshHandler.bind(this), false);
		},
		getValues: function(){
			return this.ipt.value.split(/\n/);
		},
		refreshHandler: function(){
			console.log(11);
			this.ipt.value = "";
			this.list.innerHTML = "";
		},
		keydownHandler: function(){
			var values = this.getValues();
			if(event.keyCode == 13){
				this.createList(values.length+1
					);
			}else{
				this.createList(values.length);
			}
			values.forEach(function(item, i){
				if(!this.checkCommand(item)){
					this.list.children[i].style.background = "red";
				}else{
					this.list.children[i].style.background = "";
				}
			}, this);
		},
		focusHandler: function(){
			if(this.ipt.value == ""){
				this.createList(1);
			}
		},
		blurHandler: function(){
			if(this.ipt.value == ""){
				this.list.innerHTML = "";
			}
		},
		scrollHandler: function(){
			this.list.style.top = -this.ipt.scrollTop + "px";
		},
		createList: function(num){
			var html = "";
			for(var i=0; i<num; i++){
				html += "<li>"+ (i+1) +"</li>";
			}
			this.list.innerHTML = html;
			
		},
		checkCommand: function(str){
			return /^(TRA|MOV)\s+(LEF|RIG|TOP|BOT)\s*(\d*)$/i.test(str) || /^GO\s*\d*/i.test(str);
		}
	},
	// 执行命令
	exeCommand: {
		init: function(options){
			this.dir = {
				LEF: -90,
				RIG: 90,
				TOP: 0,
				BOT: 180,
			};
			this.bindDOM(options);
			this.bindEvent();
			
			this.currentLeft = parseInt(this.getStyle(this.box, "left"));
			this.currentTop = parseInt(this.getStyle(this.box, "top"));

			this.direction = "TOP";
			this.box.style.left = this.currentLeft + "px";
			this.box.style.top = this.currentTop + "px";
		},
		bindDOM: function(options){
			this.exeBtn = options.exeBtn;
			this.box = options.box;
		},
		bindEvent: function(){
			this.exeBtn.addEventListener("click", this.exeBtnHandler.bind(this), false);
		},
		getVaildCommand: function(){
			var command = [];
			var values = obedientBox.getCommand.getValues();
			var i = 0;
			values.forEach(function(item, i){
				if(obedientBox.getCommand.checkCommand(item)){
					command.push(item);
				}
			});
			return command;
		},
		exeBtnHandler: function(){
			var validCommands = this.getVaildCommand();
			var i=0;
			var timer = setInterval(function(){
				if(i<validCommands.length){
					var values = validCommands[i].toUpperCase().trim().split(" ");
					this.chose(values);
					i++;
				}else{
					clearInterval(timer);
				}
			}.bind(this), 1000);
				
		},
		chose: function(values){
				switch(values[0]){
					case "TRA":
						var num = values[2] || 1;
						this.shift(values[1], num);  
						break;
					case "MOV":
						if(!values[2]){
							this.rotate(values[1]);
						}else{
							var num = values[2] || 1; 
							this.rotate(values[1]);
							this.shift(this.direction, num);
						}
						break;
					case "GO":
						var num = values[1] || 1;
						this.shift(this.direction, num); 
						break;
					default: 
						console.log("no this type");
				}
		},
		shift: function(direction, num){
			switch(direction){
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
		rotate: function(direction){
			this.direction = direction;
			this.box.style.webkitTransform = "rotate("+ this.dir[direction] +"deg)"
		},
		getStyle: function(dom, name){
			if(window.getComputedStyle){
				return window.getComputedStyle(dom, null)[name];
			}else{
				return dom.currentStyle[name];
			}
		},
	},
}
obedientBox.createMap(document.getElementById("container"));
obedientBox.getCommand.init({
	ipt: document.getElementById("ipt"),
	list: document.getElementById("ol-list"),
	refresh: document.getElementById("refreshBtn"),
});
obedientBox.exeCommand.init({
	box: document.getElementById("box"),
	exeBtn: document.getElementById("exeBtn"),
});