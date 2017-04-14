/*
* @Author: Administrator
* @Date:   2017-02-20 18:59:38
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-20 21:04:53
*/
// GO：向蓝色边所面向的方向前进一格（一格等同于正方形的边长）
// TUN LEF：向左转（逆时针旋转90度）
// TUN RIG：向右转（顺时针旋转90度）
// TUN BAC：向右转（旋转180度）
'use strict';
function Square(btn, ipt, tb){
	this.ipt = document.getElementById(ipt);
	this.btn = document.getElementById(btn);
	this.tb = document.getElementById(tb);
	this._init();
}
Square.prototype = {
	_init: function(){
		this.btn.addEventListener("click", this.handlerClick.bind(this), false);

		this.blueElem = document.createElement("span");
		this.blueElem.style.width = "30px";
		this.blueElem.style.height = "10px";
		this.blueElem.style.backgroundColor = "blue";
		this.blueElem.style.display = "block";

		this.redElem = document.createElement("span");
		this.redElem.style.width = "30px";
		this.redElem.style.height = "20px";
		this.redElem.style.backgroundColor = "red";
		this.redElem.style.display = "block";

		this.direction = 0;
		this.x = 5;
		this.y = 5;

		this.currentElem = this.tb.children[this.x].children[this.y];
		this.currentElem.appendChild(this.blueElem);
		this.currentElem.appendChild(this.redElem);

	},
	handlerClick: function(){
		var value = this.ipt.value;
		switch(value){
			case "GO": 
				this.go();
				break;
			case "TUN LEF":
				this.direction -= 90;
				this.changeDrection();
				break;
			case "TUN RIG":
				this.direction += 90;
				this.changeDrection();
				break;
			case "TUN BAC": 
				this.direction += 180;
				this.changeDrection();
				break;
			default: 
				console.log("no this type");
				break;
		}
	},
	go: function(){
		this.direction = this.direction % 360;
		switch(this.direction){
			// 向右
			case -90:
			case 270:
				if(this.x > 1){
					this.x = this.x - 1;
				} 
				this.move();
				break;
			// 向左
			case 90:
			case -270:
				if(this.x < 9){
					this.x = this.x + 1;
				}
				this.move();
				break;
			// 向后
			case 180:
			case -180:
				if(this.y < 9){
					this.y = this.y + 1;
				}
				this.move();
				break;
			// 向前
			default:
				if(this.y > 1){
					this.y = this.y - 1;
				}
				this.move();
				break;
		}
	},
	move: function(){
		// 先删除原先的内容
		this.currentElem.removeChild(this.blueElem);
		this.currentElem.removeChild(this.redElem);
		// 改变当前位置
		this.currentElem = this.tb.children[this.y].children[this.x];
		this.currentElem.appendChild(this.blueElem);
		this.currentElem.appendChild(this.redElem);
		this.changeDrection();
	},
	changeDrection: function(){
		this.currentElem.style.webkitTransform = "rotate("+this.direction+"deg)";
	},
}
var square = new Square("btn", "ipt", "tb");