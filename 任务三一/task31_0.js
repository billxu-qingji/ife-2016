/*
* @Author: Administrator
* @Date:   2017-02-15 11:44:16
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-15 16:20:05
*/

'use strict';
var data = {
	"北京": ["北京大学", "清华大学", "北京师范大学"],
	"杭州": ["浙江大学", "浙江理工大学", "杭州师范大学"],
	"南京": ["南京大学", "南京师范大学", "南京航空大学"],
}
var radios = document.getElementsByName("school");
var dis = document.getElementsByClassName("school");
for(var i=0; i<radios.length; i++){
	radios[i].onclick = (function(i){
		return function(){
			for(var j=0; j<radios.length; j++){
				dis[j].style.display = "none";
			}
			dis[i].style.display = "block";
		}
	})(i)
}
var city = document.getElementById("city");
var school = document.getElementById("school");
var html = "";
for(var item in data){
	html += "<option>"+item+"</option>"
}
city.innerHTML = html;
city.onchange = function(){
	var html = "";
	data[this.value].forEach(function(item){
		html += "<option>"+item+"</option>"
	});
	school.innerHTML = html;
}