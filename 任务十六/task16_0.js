/*
* @Author: Administrator
* @Date:   2017-01-31 21:49:30
* @Last Modified by:   Administrator
* @Last Modified time: 2017-01-31 21:50:20
*/

'use strict';
	/*参考以下示例代码，用户输入城市名称和空气质量指数后，点击“确认添加”按钮后，就会将用户的输入在进行验证后，添加到下面的表格中，新增一行进行显示
用户输入的城市名必须为中英文字符，空气质量指数必须为整数
用户输入的城市名字和空气质量指数需要进行前后去空格及空字符处理（trim）
用户输入不合规格时，需要给出提示（允许用alert，也可以自行定义提示方式）
用户可以点击表格列中的“删除”按钮，删掉那一行的数据*/
window.onload = function(){
	function City(){
	this._init();
}
City.prototype = {
	_init: function(){
		this.city_input = document.getElementById("aqi-city-input");
		this.value_input = document.getElementById("aqi-value-input");
		this.table = document.getElementById("aqi-table");
	},
	add: function(that){
		var city = that.city_input.value;
		var city = that.trim(city);
		var value = that.value_input.value;
		var value = that.trim(value);

		if(that.checkCityName(city) && that.checkAqiValue(value)){
			// 如果正确
			var html = "<tr><td>"+ city +"</td><td>"+ value +"</td><td><button class='.delete'>删除</button></td></tr>";
			that.table.innerHTML += html;
			that.addEvent();
		}else{
			// 否则给出提示
			alert("输入格式有误！");
		}
	},
	addEvent: function(){
		var btns = document.getElementsByClassName(".delete");
		for(var i=0; i<btns.length; i++){
			btns[i].addEventListener("click", handlerClickEvent, false);
		}
		function handlerClickEvent(event){
			this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
		}
	},
	delete: function(){
		var that = this;
		this.table.addEventListener("click", that.handlerClickEvent);
	},
	
	trim: function(str){
		return str.replace(/(\s*)/g,"");
	},
	checkCityName: function(str){
		if(str.search(/[^\u4e00-\u9fa5a-zA-Z]/) == -1)
			return true;
		else 
			return false;
	},
	checkAqiValue: function(str){
		if(str.search(/\D/ == -1))
			return true;
		else 
			return false;
	}
}
var city = new City();
var btn = document.getElementById("add-btn");
btn.addEventListener("click", function(){
	city.add(city);
});
}