/*
* @Author: Administrator
* @Date:   2017-02-03 19:35:16
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-03 21:52:54
*/

// 知识点：
// appendChild(newChild);
// insertBefore('selector');
// removeChild(oldChild);
// firstChild lastChild
// children属性

// 基于任务18
// 限制输入的数字在10-100
// 队列元素数量最多限制为60个，当超过60个时，添加元素时alert出提示
// 队列展现方式变化如图，直接用高度表示数字大小
// 实现一个简单的排序功能，如冒泡排序（不限制具体算法），用可视化的方法表达出来，参考见下方参考资料

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
			
				if(this.display.children.length>= 60){
					alert("队列已满！");
					return
				}
				this.display.insertBefore(this.createElement(), this.display.firstChild);
				break;

			case "right-in-btn":
				if(this.display.childNodes.length>= 60){
					alert("队列已满！");
					return
				}
				this.display.appendChild(this.createElement());
				break;

			case "left-out-btn":
				this.display.removeChild(this.display.firstChild);
				break;

			case "right-out-btn":
				this.display.removeChild(this.display.lastChild);
				break;

			default: 
				this.handlerSortClickEevent();
				break;
		}
	},
	createElement: function(){
		var span = document.createElement("span");
		this.value = this.input.value;
		if(this.value < 10 || this.value > 100){
			alert("您输入的数超出范围");
			return;
		}
		span.style.height = this.value * 3 + "px";
		return span;
	},
	handlerSpanClickEevent: function(event){
		this.display.removeChild(event.target);
	},
	handlerSortClickEevent: function(event){
		var spans = [];
		var value = 0;
		var height = "";
		for(var i=0, len=this.display.children.length; i<len; i++){
			height = this.display.children[i].style.height;
			value = height.replace(/[^\d]/g, "");
			spans.push(value);
		}
		this.sort(spans);
	},
	sort:  function(spans){
		var temp = 0;
		for(var i=0, len=spans.length; i<len; i++){
			for(var j=i+1; j<len; j++ ){
				if(spans[i] < spans[j]){
					temp = spans[i];
					spans[i] = spans[j];
					spans[j] = temp;
				}
			}
		}
		this.renderSort(spans);
	},
	renderSort: function(arr){
		var html = "";
		for(var i=0, len=arr.length; i<len; i++){
			html += "<span style='height:"+ arr[i] +"px'></span>"
		}
		this.display.innerHTML = html;
	}

}
var queue = new Queue();
