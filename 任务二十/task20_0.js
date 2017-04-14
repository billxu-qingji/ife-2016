/*
* @Author: Administrator
* @Date:   2017-02-03 19:35:16
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-08 19:13:44
*/

'use strict';

var Query = function(){
	this._init();
}
Query.prototype = {
	_init: function(){
		this.inputValue = document.getElementById("input-value");
		this.queryValue = document.getElementById("query-value");
		this.btn = document.getElementById("btn");
		this.display = document.getElementById("display");
		this.data = [];
		this.bindEvent();
	},
	bindEvent: function(){
		this.btn.addEventListener("click", this.handlerBtnEvent.bind(this), false);
		this.display.addEventListener("click", this.handlerSpanEvent.bind(this), false);
	},
	renderQueue: function(){
		var html = "";
		this.data.forEach(function(i){
			html += "<span>"+i+"</span>"
		});
		this.display.innerHTML = html;
	},
	handlerSpanEvent: function(event){
		var value = event.target.innerHTML;
		var index = this.data.indexOf(value);
		this.data.splice(index,1);
		event.target.parentNode.removeChild(event.target);
	},
	handlerBtnEvent: function(event){
		var id = event.target.id;
		switch(id){
			case "left-in-btn":
				var value = this.inputValue.value;
				this.splitValue(value).forEach(function(i){
					console.log(this);
					this.data.unshift(i);
				}, this);;
				this.renderQueue();
				break;
			case "right-in-btn":
				var value = this.inputValue.value;
				this.data = this.data.concat(this.splitValue(value));
				this.renderQueue();
				break;
			case "left-out-btn":
				this.data.shift();
				this.renderQueue();
				break;
			case "right-out-btn":
				this.data.pop();
				this.renderQueue();
				break;
			case "query":
				var value = this.queryValue.value;
				this.query(value);
				break;
			default:
				console.log("no this event type!")
				break;
		}
	},
	splitValue: function(value){
		return value.split(/[^0-9A-Za-z\u4e00-\u9fa5]+/);
	},
	query: function(value){
		this.data.forEach(function(i,index){
			this.display.children[index].className = "";
			if(i.search(value) !== -1){
				this.display.children[index].className = "selected";
			}
		}, this);
	},
}
var query = new Query();