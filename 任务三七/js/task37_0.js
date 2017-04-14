/*
* @Author: Administrator
* @Date:   2017-03-05 19:43:04
* @Last Modified by:   Administrator
* @Last Modified time: 2017-03-05 22:00:06
*/

'use strict';
function FloatLayer(options){
	this._init(options);
}
FloatLayer.prototype = {
	// 初始化
	_init: function(options){
		this.bindDom(options);
		this.bindEvent();
	},
	// 绑定事件
	bindEvent: function(){
		this.close.addEventListener("click", this.hide.bind(this), false);
		document.addEventListener("click",function(event){
			if(event.target.id != "float" && event.target.id != "login"){
				this.hide();
			}
		}.bind(this), false);
		this.floatLay.addEventListener("mousedown", this.mousedownHandler.bind(this), false);
		this.floatLay.addEventListener("mouseup", this.mouseupHandler.bind(this), false);
	},
	// 处理鼠标按下事件
	mousedownHandler: function(event){
		this.lefVal = event.clientX - this.floatLay.offsetLeft;
		this.topVal = event.clientY - this.floatLay.offsetTop;
		document.addEventListener("mousemove", this.mousemoveHandler.bind(this), false);
	},
	mouseupHandler: function(){
		console.log("hahh");
		document.removeEventListener("mousemove", this.mousemoveHandler, false);
	},
	mousemoveHandler: function(){
		this.floatLay.style.left = event.clientX - this.lefVal + "px";
		this.floatLay.style.top = event.clientY - this.topVal + "px";
		window.getSelection ? window.getSelection().removeAllRanges() : window.selection.empty();
	},
	// 绑定dom元素
	bindDom: function(options){
		this.close = options.close;
		this.floatLay = options.floatLay;
		this.mask = options.mask;
	},
	// 显示浮出层
	show: function(){
		this.mask.style.display = "block";
		this.floatLay.style.display = "block";
	},
	// 隐藏浮出层
	hide: function(){
		this.floatLay.style.display = "none";
		this.mask.style.display = "none";
	}

}

var floatLay = new FloatLayer({
	floatLay: document.getElementById("float"),
	close: document.getElementById("close"),
	mask: document.getElementById("mask"),
});

var loginBtn = document.getElementById("login");
loginBtn.addEventListener("click", function(){
	floatLay.show();
}, false);