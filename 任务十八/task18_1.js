/*
* @Author: Administrator
* @Date:   2017-02-03 19:35:16
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-03 20:21:17
*/

// 知识点：
// appendChild(newChild);
// insertBefore('selector');
// removeChild(oldChild);
// firstChild lastChild


'use strict';
var Queue = function(){
	this._init();
}
Queue.prototype = {
	_init: function(){
		this.input = document.getElementById("value-input");
		this.btn = document.getElementById("btn");
		this.display = document.getElementById("display");
		this.bindEvent();
	},
	bindEvent: function(){
		this.btn.addEventListener("click", this.handlerBtnClickEevent.bind(this), false);
		this.display.addEventListener("click", this.handlerSpanClickEevent.bind(this), false);
	},
	handlerBtnClickEevent: function(event){
		var id = event.target.id;
		switch( id ){
			case "left-in-btn":
				this.display.insertBefore(this.createElement(), this.display.firstChild);
				break;

			case "right-in-btn":
				this.display.appendChild(this.createElement());
				break;

			case "left-out-btn":
				this.display.removeChild(this.display.firstChild);
				break;

			case "right-out-btn":
				this.display.removeChild(this.display.lastChild);
				break;

			default: 
				console.log("没有此项功能！");
				break;
		}
	},
	createElement: function(){
		console.log(this);
		var span = document.createElement("span");
		this.value = this.input.value;
		span.innerText = this.value;
		return span;
	},
	handlerSpanClickEevent: function(event){
		this.display.removeChild(event.target);
	},
}
var queue = new Queue();
