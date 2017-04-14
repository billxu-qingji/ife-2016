/*
* @Author: Administrator
* @Date:   2017-02-01 12:42:28
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-01 14:13:14
*/

'use strict';
// 主要知识点有：
// 1.正则表达式
// 2.bind的使用
// 3.冒泡的使用，event对象的属性
// 4.dom元素的和对象属性的删除
// 5.trim()方法
 
/*参考以下示例代码，用户输入城市名称和空气质量指数后，点击“确认添加”按钮后，就会将用户的输入在进行验证后，添加到下面的表格中，新增一行进行显示
用户输入的城市名必须为中英文字符，空气质量指数必须为整数
用户输入的城市名字和空气质量指数需要进行前后去空格及空字符处理（trim）
用户输入不合规格时，需要给出提示（允许用alert，也可以自行定义提示方式）
用户可以点击表格列中的“删除”按钮，删掉那一行的数据*/

function City(){
	this.init();
}
City.prototype = {
	init: function(){
		this.add_btn = document.getElementById("add-btn");
		this.aqi_table = document.getElementById("aqi-table");
		this.bindEvent();
	},
	bindEvent: function(){
		this.add_btn.addEventListener("click", this.addEventHandler.bind(this), false);
		this.aqi_table.addEventListener("click", this.delEventHandler.bind(this), false);
	},
	addEventHandler: function(){
		this.city = document.getElementById("aqi-city-input").value;
		this.value = document.getElementById("aqi-value-input").value;
		if(this.checkCity(this.city) && this.checkValue(this.value)){
			var tr = document.createElement("tr");
			var html = "<td>"+this.city+"</td><td>"+this.value+"</td><td><button>删除</button></td>";
			tr.innerHTML = html;

			this.aqi_table.appendChild(tr);
		}else{
			alert("您输入的信息有误！！");
		}	
	},
	delEventHandler: function(event){
		if(event.target.tagName == "button" || event.target.tagName == "BUTTON"){
			this.aqi_table.removeChild(event.target.parentNode.parentNode);
		}
	},
	checkCity: function(city){
		this.city = this.trim(city);
		if(this.city.search(/[^\u4e00-\u9fa5a-zA-Z]/) == -1)
			return true;
		else
			return false;

	},
	checkValue: function(value){
		this.value = this.trim(value);
		if(this.value.search(/[^\d]/) == -1)
			return true;
		else
			return false;
	},
	trim: function(str){
		return str.replace(/\s/, "");
	}


}
var city = new City();
