/*
* @Author: Administrator
* @Date:   2017-02-14 12:19:32
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-14 14:12:36
*/

'use strict';
var confirm = document.getElementById("confirm");
var ipt = document.getElementById("ipt");
var alert = document.getElementById("alert");

confirm.addEventListener("click", handlerClickEvent, false);
function handlerClickEvent(){
	var value = ipt.value;
	checkValue(value);
}
function checkValue(value){
	if(!value){
		changeAlert("姓名不能为空","red");
	}else if(countLength(value)>16 || countLength(value)<4){
			changeAlert("字符串长度不正确","red");
		}else{
			changeAlert("名称格式正确","green");
		}
}
function countLength(value){
	var sumLength = 0;
	for(var i=0; i<value.length; i++){
		var index = value.charCodeAt(i);
		if(index>=0 && index<128){
			sumLength += 1;
		}else{
			sumLength += 2;
		}
	}
	return sumLength;
}

function changeAlert(content, color){
	alert.innerHTML = content;
	alert.style.color = color;
	ipt.style.borderColor = color;
}