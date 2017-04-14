/*
* @Author: Administrator
* @Date:   2017-02-08 19:34:30
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-09 14:22:19
*/

'use strict';


var Queue = function(options){
	this.inputValue = options.inputValue;
	this.display = options.display;
	this.data = [];
};
Queue.prototype = {
	renderQueue: function(){
		var html = "";
		this.data.forEach(function(item){
			html += "<span>"+item+"</span>"
		}, this);
		this.display.innerHTML = html;
	},
	noRepeat: function(value){
		this.inputValue.value = "";   
		var index = this.data.indexOf(value);
		if(index == -1){
			this.data.push(value);
		}
		if(this.data.length > 10){
			this.data.shift();
		}
	},
	splitValue: function(value){
		return value.split(/[^0-9A-Za-z\u4e00-\u9fa5]+/);
	},
	handlerSpanEvent: function(event){
		var value = event.target.innerHTML.replace("点击删除","");
		var index = this.data.indexOf(value);
		this.data.splice(index,1);
		event.target.parentNode.removeChild(event.target);
	},
}
var inputValue = document.getElementById("tag-input");
var display = document.getElementById("tag-display");
var tag = new Queue({
	inputValue: inputValue,
	display: display,
});
tag.inputValue.addEventListener("keypress", handlerTextInputEvent, false);
function handlerTextInputEvent(event){
	var value = tag.inputValue.value;
	if(event.keyCode === 13 || event.keyCode === 44 || event.keyCode === 32){
		tag.noRepeat(value);
		event.preventDefault();
	}
	tag.renderQueue();
}
tag.display.addEventListener("mouseover", hanlderMouseoverEvent, false);
tag.display.addEventListener("mouseout", handlerMouseoutEvent, false);
tag.display.addEventListener("click", tag.handlerSpanEvent.bind(tag), false);
function hanlderMouseoverEvent(event){
	if(event.target.tagName == "SPAN"){
		event.target.className = "selected";
		event.target.innerHTML = "点击删除" + event.target.innerHTML;
	}
}
function handlerMouseoutEvent(event){
	if(event.target.tagName == "SPAN"){
		event.target.className = "";
		event.target.innerHTML = event.target.innerHTML.replace("点击删除", "");
	}
}

var istInput = document.getElementById("interest-input");
var istDisplay = document.getElementById("interest-display");

var ist = new Queue({
	inputValue: istInput,
	display: istDisplay,
});

var btn = document.getElementById("interest-btn");
btn.addEventListener("click", hanlderClickEvent, false);

function hanlderClickEvent(){
	var values = ist.splitValue(ist.inputValue.value);
	values.forEach(function(item){
		ist.noRepeat(item);
	});
	ist.renderQueue();
}