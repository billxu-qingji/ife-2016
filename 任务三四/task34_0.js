/*
* @Author: Administrator
* @Date:   2017-02-21 19:07:48
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-24 16:46:31
*/

'use strict';
// 对于正方形的移动增加相应动画，包括移动和旋转
// 每个指令的执行时间是1s（可以自己调整）
// 增加新的指令如下：


function MoveBox(options){
	this._init(options);
}
MoveBox.prototype = {
	_init: function(options){
		// 绑定数据
		this.box = document.getElementById(options.box);
		this.btn = document.getElementById(options.btn);
		this.ipt = document.getElementById(options.ipt);
		// 绑定事件 
		this.btn.addEventListener("click", this.clickHandler.bind(this), false);
	},
	clickHandler: function(){
		var value = this.ipt.value;
		switch(value){
			case "TRA LEF":
				// var value = parseInt(getComputedStyle(this.box, null)["left"]);
				// this.animate.init({target: this.box, param: {left: value - 40}, duration: 3000, type: "linear"});
				break;
			case "TRA RIG":
				// var value = parseInt(getComputedStyle(this.box, null)["left"]);
				// this.animate.init({target: this.box, param: {left: value + 40}, duration: 3000, type: "linear"});
				break;
			case "TRA TOP":
				// var value = parseInt(getComputedStyle(this.box, null)["top"]);
				// this.animate.init({target: this.box, param: {top: value - 40}, duration: 3000, type: "linear"});
				break;
			case "TRA BOT":
				// var value = parseInt(getComputedStyle(this.box, null)["top"]);
				// this.animate.init({target: this.box, param: {top: value + 40}, duration: 3000, type: "linear"});
				break;
			case "MOV LEF":
				// this.animate.init({target: this.box, param: {rotate: -90}, duration: 3000, type: "rotate"});

				// var value = parseInt(getComputedStyle(this.box, null)["left"]);
				// this.animate.init({target: this.box, param: {left: value - 40}, duration: 3000, type: "linear"});
				break;
			case "MOV RIG":
				// this.animate.init({target: this.box, param: {rotate: -90}, duration: 3000, type: "rotate"});

				// var value = parseInt(getComputedStyle(this.box, null)["left"]);
				// this.animate.init({target: this.box, param: {left: value + 40}, duration: 3000, type: "linear"});
				break;
			case "MOV TOP":
				// this.animate.init({target: this.box, param: {rotate: -90}, duration: 3000, type: "rotate"});

				// var value = parseInt(getComputedStyle(this.box, null)["top"]);
				// this.animate.init({target: this.box, param: {top: value - 40}, duration: 3000, type: "linear"});
				break;
			case "MOV BOT":
				var animateRotate = new animate({target: this.box, param: {rotate: 90}, duration: 3000, type: "rotate"});

				var value = parseInt(getComputedStyle(this.box, null)["top"]);
				var animateLinear = new animate({target: this.box, param: {top: value + 40}, duration: 3000, type: "linear"});
				break;
			default:
				console.log("no this type");
				break;
		}
	},
	// options中包括动画执行时间，动画参数， 动画类型
	// {type: linear, param: {left: 100px}, duration: 1000}
	animate: 
}
function Animate(options){
	this.init(options)
}
Animate.prototype = {
		init: function(options){
			// 绑定数据
			this.type = options.type;
			this.param = options.param;
			this.duration = options.duration;
			this.target = options.target;
			// 默认情况下的执行速率
			this.interval = 16;
			this.run();
		},
		// 开始执行动画
		run: function(){
			this.startTime = +new Date();
				if(this.type != "rotate"){
					this.paramArr = this.adapter(this.param);
				}
				this.timer = setInterval(this[this.type].bind(this), this.interval);
		},
		// 每执行一次的操作
		linear: function(){
			var bween = this.getTween();
			var propertion = bween/this.duration;
			if(propertion >= 1){
				propertion = 1;
			}
			this.paramArr.forEach(function(item){
				this.target.style[item.type] = item.startValue + propertion*item.distance + "px";
			}, this);
			if(bween == 1){
				this.stop();
			}
			// 当前值 = 原始值 + 间隔时间/总时间*总移动距离
		},
		getTween: function(){
			var nowTime = +new Date();
			return nowTime - this.startTime;
		},
		rotate: function(){
			var bween = this.getTween();
			var propertion = bween/this.duration;
			if(propertion >= 1){
				propertion = 1;
			}

			this.target.style.webkitTransform = "rotate("+ propertion*this.param.rotate +"deg)";

			if(propertion == 1){
				this.stop();
			}


		},
		adapter: function(json){
			var objArr = [];
			for(var item in json){
				var obj = {};
				obj.type = item;
				obj.startValue = parseInt(this.getStyle(item));
				obj.distance = json[item] - obj.startValue;
				objArr.push(obj);
			}
			return objArr;
		},
		getStyle: function(name){
			console.log(this);
			if(getComputedStyle){
				return getComputedStyle(this.target, null)[name];
			}else{
				return this.target.currentStyle[name];
			}
		},
		stop: function(){
			clearInterval(this.timer);
		}
	}
var moveBox = new MoveBox({box: "box", btn: "btn", ipt: "ipt"});
// var target = document.getElementById("test-box");
// moveBox.animate.init({
// 	type: "rotate",
// 	target: target,
// 	duration: 3000,
// 	param: {rotate: 120},
// });
