/*
* @Author: Administrator
* @Date:   2017-03-18 13:59:56
* @Last Modified by:   Administrator
* @Last Modified time: 2017-03-31 22:22:19
*/
// 存在问题：
// 在dom方面掌握的不是牢固
// 在table表格标签方便掌握不牢固
// 设计程序时事先要求不够明确导致后面出现很多改动，造成麻烦

'use strict';
var data = {
	caption: ["姓名", "语文", "数学", "英语", "总分"],
	bodyData: [["小红", 80, 90, 70, 240], ["小明",90, 60, 90, 240],["小亮", 60, 100, 70, 230]]
}
function Table(){
	
}
Table.prototype = {
	init: function(target, data){
		var tableContainer = document.getElementById(target);
		this.data = data;
		this.target = tableContainer;
	},
	create: function(){
		// 创建表头
		var htr = document.createElement("tr");
		this.data.caption.forEach(function(item, index){
			var th = document.createElement("th");
			th.innerText = item;
			th.value = index;

			if(index !== 0){
				var btnUp = document.createElement("button");
				btnUp.innerText = "升序";
				btnUp.addEventListener("click", this.sort.bind(this), false);
				th.appendChild(btnUp);
				var btnDown = document.createElement("button");
				btnDown.innerText = "降序";
				btnDown.addEventListener("click", this.sort.bind(this), false);
				th.appendChild(btnDown);
			}

			htr.appendChild(th);

		}, this)
		this.target.getElementsByTagName("thead")[0].appendChild(htr);

		// 创建表体
		var tbody = this.target.getElementsByTagName("tbody")[0];
		data.bodyData.forEach(function(item){
			var tr = document.createElement("tr");
			item.forEach(function(elem){
				var td = document.createElement("td");
				td.innerText = elem;
				tr.appendChild(td);
			})
			tbody.appendChild(tr);
		})
	},

	// 对表格进行排序
	sort: function(event){
		var method = event.target.innerText;
		var index = event.target.parentNode.value;
		if(method == "升序"){
			this.data.bodyData.sort(function(x, y){
				return x[index] - y[index];
			})
		}else if(method = "降序"){
			this.data.bodyData.sort(function(x, y){
				return y[index] - x[index];
			})
		}
		this.clear();
		this.create(this.target, this.data);
	},
	clear: function(){
		console.log(this.target);
		var childs = this.target.getElementsByTagName("table")[0].children;
		console.log(childs);
		Array.prototype.forEach.call(childs, function(item){
			item.innerHTML = "";
		});
	}
}
var table = new Table();
table.init("tableContainer", data);
table.create();