/*
* @Author: Administrator
* @Date:   2017-02-14 15:12:50
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-14 20:57:58
*/

'use strict';
var fromFactory = (function(){
	var password = null;

	function fromFactory(iptID, alertID){
		this._init(iptID, alertID);
	}
	fromFactory.prototype = {
		_init: function(iptID, alertID){
			this.status = false;
			this.ipt = document.getElementById(iptID);
			this.alert = document.getElementById(alertID);
			this.bindEvent(iptID);
		},
		bindEvent: function(iptID){
			switch(iptID){
				case "username":
					this.ipt.addEventListener("blur", this.checkUserName.bind(this), false);
					this.ipt.addEventListener("focus", this.handlerFocus.bind(this, "必填，长度为4-16个字符"), false);
					break;
				case "password":
					this.ipt.addEventListener("blur", this.checkPassword.bind(this), false);
					this.ipt.addEventListener("focus", this.handlerFocus.bind(this, "必填，由英文字母和数字组成的4-12位密码"), false)
					break;
				case "check":
					this.ipt.addEventListener("blur", this.checkLab.bind(this), false);
					this.ipt.addEventListener("focus", this.handlerFocus.bind(this, "必填，长度为4-16个字符"), false)
					break;
				case "email":
					this.ipt.addEventListener("blur", this.checkEmail.bind(this), false);
					this.ipt.addEventListener("focus", this.handlerFocus.bind(this, "必填"), false);
					break;
				case "phone":
					this.ipt.addEventListener("blur", this.checkPhone.bind(this), false);
					this.ipt.addEventListener("focus", this.handlerFocus.bind(this, "必填"), false);
					break;
				default:
					console.log("no this type");
					break;
			}
		},
		handlerFocus: function(content){
			this.alert.style.color = "#ccc";
			this.ipt.style.borderColor = "";
			this.alert.innerHTML = content;
			this.alert.style.display = "block";
		},
		changeStyle: function(text, type){
			this.alert.innerHTML = text;
			if(type){
				this.ipt.style.borderColor = "";
				this.alert.style.color = "green";
			}else{
				this.ipt.style.borderColor = "red";
				this.alert.style.color = "red";
			}
		},
		totalCount: function(value){
			var totalCount = 0;
			for(var i=0; i<value.length; i++){
				var index = value.charCodeAt(i);
				if(index>=0 && index<128){
					totalCount++;
				}else{
					totalCount += 2;
				}
			}
			return totalCount;
		},
		checkUserName: function(){
			var value = this.ipt.value;
			if(!value){
				this.status = false;
				this.changeStyle("用户名不能为空");
			}else{
				var totalCount = this.totalCount(value);
				if(totalCount>16){
					this.status = false;
					this.changeStyle("用户名过长");
				}else if(totalCount<4){
					this.status = false;
					this.changeStyle("用户名过短");
				}else{
					this.changeStyle("用户名可用", true);
					this.status = true;
				}
	
			}
	
		},
		checkPassword: function(){
			var value = this.ipt.value;
			if(value.search(/\W/) != -1){
				this.status = false;
				this.changeStyle("密码格式不正确");
			}else{
				var totalCount = this.totalCount(value);
				if(totalCount<4){
					this.status = false;
					this.changeStyle("密码过短");
				}else if(totalCount>12){
					this.status = false;
					this.changeStyle("密码过长");
				}else{
					password = value;
					this.changeStyle("密码可用", true);
					this.status = true;
				}
			}
		},
		checkLab: function(){
			var value = this.ipt.value;
			console.log(password);
			console.log(value);
			if(value != password){
				this.changeStyle("密码不一致");
				this.status = false;
			}else{
				this.changeStyle("输入正确", true);
				this.status = true;
			}
		},
		checkEmail: function(){
			var value = this.ipt.value;
			if(value.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)){
				this.changeStyle("邮箱正确", true);
				this.status = true;
			}else{
				this.changeStyle("邮箱格式不正确");
				this.status = false;
			}
		},
		checkPhone: function(){
			var value = this.ipt.value;
			if(value.match(/^\d{11}$/)){
				this.changeStyle("手机号格式正确", true);
				this.status = true;
			}else{
				this.changeStyle("手机号格式不正确");
				this.status = false;
			}
		},
	}
	return fromFactory;
})()
var ipts = [];
ipts.push(new fromFactory("username", "dis-username"))
ipts.push(new fromFactory("password", "dis-password"));
ipts.push(new fromFactory("check", "dis-check"));
ipts.push(new fromFactory("email", "dis-email"));
ipts.push(new fromFactory("phone", "dis-phone"));

var submit = document.getElementById("submit");
submit.addEventListener("click", handlerClick, false);
function handlerClick(){
	var flags = true;
	ipts.forEach(function(item){
		if(item.status == false){
			flags = false;
		}
	});
	if(flags){
		alert("提交成功");
	}else{
		alert("提交失败");
	}
}
