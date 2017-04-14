/*
* @Author: Administrator
* @Date:   2017-02-03 18:15:01
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-03 19:40:00
*/

// 知识点：
// unshift(values) 从数组的头部入
// push(values) 从数组的尾部入
// shift() 从数组的头部出
// pop() 从数组的尾部出
// delete 数组 不会改变索引，数组只会变成稀疏数组
// 数组最好使用for循环犀牛书P151


'use strict';
/*如图，模拟一个队列，队列的每个元素是一个数字，初始队列为空
有一个input输入框，以及4个操作按钮
点击"左侧入"，将input中输入的数字从左侧插入队列中；
点击"右侧入"，将input中输入的数字从右侧插入队列中；
点击"左侧出"，读取并删除队列左侧第一个元素，并弹窗显示元素中数值；
点击"右侧出"，读取并删除队列又侧第一个元素，并弹窗显示元素中数值；
点击队列中任何一个元素，则该元素会被从队列中删除*/
var Queue = function(){
	this._init();
};
Queue.prototype = {
	_init: function(){
		this._queue = [];
		this.value = "";
		this.id = "";
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
				this.value = this.input.value;
				this._queue.unshift(this.value);
				break;

			case "right-in-btn":
				this.value = this.input.value;
				this._queue.push(this.value);
				break;

			case "left-out-btn":
				this._queue.shift();
				break;

			case "right-out-btn":
				this._queue.pop();
				break;

			default: 
				console.log("没有此项功能！");
				break;
		}
		this.renderQueue();
	},
	handlerSpanClickEevent: function(event){
		this.value = event.target.innerHTML;
		// delete this
	},
	renderQueue: function(){
		this.html = "";
		for(var item in this._queue){
			this.html += "<span>"+this._queue[item]+"</span>"
		}
		this.display.innerHTML = this.html;
		alert(this.value);
	}
}
var queue = new Queue();

// 利用数组存储此方案行不通
// 当点击任何一个元素删除该元素时，
// 需要遍历数组才能找到该元素，并且必须要求数组是不重复的，
// 即便找到了元素在数组中删除元素只会删除该元素所对应的值，
// 并不会改变其他元素的索引值，点击次数多了稀疏数组会越来越大，直至崩溃


