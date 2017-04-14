/*
* @Author: Administrator
* @Date:   2017-02-12 15:29:52
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-12 20:05:52
*/

'use strict';
// 利用闭包实现封装
var queue = (function(){
	// 静态私有变量
	var data = [];
	var _tag = function(options){
		// 私有属性
		var data = [];
		// 特权方法
		this.getData = function(){
			return data;
		}
		// 安全模式
		if(this instanceof _tag){
			this._init(options);
		}else{
			return new _tag();
		}
	}
	_tag.prototype = {
		_init: function(options){
			this.input = options.input;
			this.display = options.display;
			this.btn = options.btn;
			this.type = options.type;

			this.bindEvent();
		},
		bindEvent: function(){
			switch(this.type){
				case "tag":
				this.input.addEventListener("keypress", this.handlerKeypress.bind(this), false);
				this.display.addEventListener("mouseover", this.displayHandler.bind(this), false);
				this.display.addEventListener("mouseout", this.displayHandler.bind(this), false);
				this.display.addEventListener("click", this.displayHandler.bind(this), false);
					break;
				case "hobby":
				this.btn.addEventListener("click", this.handlerClick.bind(this), false);
					break;
				default:
					console.log("no this type");
					break;
			}
		},
		displayHandler: function(event){
			console.log(event.target.tagName);
			if(event.target.tagName == "SPAN"){
				switch(event.type){
					case "click":
						var value = event.target.innerHTML;
						var index = this.getData().indexOf(value);
						this.getData().splice(index,1);
						event.target.parentNode.removeChild(event.target);
						break;
					case "mouseover":
						event.target.innerHTML = "删除" + event.target.innerHTML;
						event.target.className = "selected";
						break;
					case "mouseout":
						event.target.innerHTML =  event.target.innerHTML.replace("删除", "");
						event.target.className = "";
						break;
				}
			}
		},
		handlerKeypress: function(event){
			var value = this.input.value;
			if(event.keyCode === 13 || event.keyCode === 44 || event.keyCode === 32){
				this.checkItem(value);
				event.preventDefault();
				this.renderChart();
			}
		},
		checkItem: function(item){
			var data = this.getData();
			var index = data.indexOf(item);
			if(index == -1){
				data.push(item);
			}
			if(data.length > 10){
				data.shift();
			}
		},
		renderChart: function(){
			this.input.value = "";
			var html = "";
			this.getData().forEach(function(item){
				html += "<span>"+item+"</span>"
			});
			this.display.innerHTML = html;
		},

		handlerClick: function(){
			var valueStr = this.input.value;
			var values = this.strSplit(valueStr);
			values.forEach(function(item){
				this.checkItem(item);
			}, this);
			this.renderChart();
		},
		strSplit: function(valueStr){
			return valueStr.split(/[^0-9A-Za-z\u4e00-\u9fa5]+/);
		}
	}
	return _tag;
})()

var options = {};
options.input = document.getElementById("tag-input");
options.display = document.getElementById("tag-display");
options.type = "tag";
var tag = new queue(options);

var obj = {};
obj.input = document.getElementById("interest-input");
obj.display = document.getElementById("interest-display");
obj.btn = document.getElementById("interest-btn");
obj.type = "hobby";

var hobby = new queue(obj);