/*
* @Author: Administrator
* @Date:   2017-02-15 16:28:21
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-15 20:43:30
*/

'use strict';


    // {
    //     label: '名称',                    // 表单标签
    //     type: 'input',                   // 表单类型
    //     validator: function () {...},    // 表单验证规
    //     rules: '必填，长度为4-16个字符',    // 填写规则提示
    //     success: '格式正确',              // 验证通过提示
    //     fail: '名称不能为空'               // 验证失败提示
    // }


function formFactory(obj){
	this._init(obj);
}
formFactory.prototype = {
	_init: function(obj){
		this.container = obj.container;
		this.label = obj.label;
		this.type = obj.type;
		this.validator = obj.validator;
		this.rules = obj.rules;
		this.success = obj.success;
		this.fail = obj.fail;

		this.createElement();
		this.bindEvent();
	},
	createElement: function(){
		var label = document.createElement("label");
		label.innerHTML = this.label;
		// 创建输入框
		this.ipt = document.createElement("input");
		this.ipt.type = this.type;
		// 创建提示信息
		this.dis = document.createElement("p");
		// this.dis.innerHTML = this.rules;

		label.appendChild(this.ipt);
		label.appendChild(this.dis);

		this.container.appendChild(label);
	},
	bindEvent: function(){
		this.ipt.addEventListener("focus", this.handlerFocus.bind(this), false);
		this.ipt.addEventListener("blur", this.handlerBlur.bind(this), false);
	},
	handlerBlur: function(){
		var value = this.ipt.value;
		this.changeStyle(this.validator(value));
	},
	handlerFocus: function(){
		this.ipt.style.borderColor = "";
		this.dis.style.color = "#ccc";
		this.dis.innerHTML = this.rules;
	},
	changeStyle: function(boolean){
		if(boolean){
			this.dis.style.color = "green";
			this.dis.innerHTML = this.success;
		}else{
			this.dis.style.color = "red";
			this.ipt.style.borderColor = "red";
			this.dis.innerHTML = this.fail;
		}
	},
}
var container = document.getElementById("cotainer");
var text = new formFactory({
	container: container,
	label: "用户名",
	type : "text",
	validator: function(value){
		var totalCount = 0;
			for(var i=0; i<value.length; i++){
				var index = value.charCodeAt(i);
				if(index>=0 && index<128){
					totalCount++;
				}else{
					totalCount += 2;
				}
			}
		if(totalCount<16 && totalCount>4){
			return true;
		}else{
			return false;
		}
	},
	rules: "必填,字符长度为4-16",
	success: "格式正确",
	fail: "格式错误",
});

var password = new formFactory({
	container: container,
	label: "用户名",
	type : "password",
	validator: function(){
		
	},
	rules: "必填,字符长度为4-16",
	success: "格式正确",
	fail: "格式错误",
});