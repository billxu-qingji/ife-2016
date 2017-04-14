/*
* @Author: Administrator
* @Date:   2017-04-03 21:24:47
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-06 22:31:50
*/

'use strict';
(function(){
	/*------------------功能函数部分-----------------*/

	// 将字符串转化为element节点模板
	function html2node(str){
		var div = document.createElement("div");
		div.innerHTML = str;
		return div.children[0];
	}

	// 扩展对象属性函数
	function extend(source, target){
		var props = Object.getOwnPropertyNames(target);
		for(var i=0, len=props.length; i<len; i++){
			var des = Object.getOwnPropertyDescriptor(target, props[i]);
			if(source.hasOwnProperty(props[i])) continue;
			Object.defineProperty(source, props[i], des);
		}
	}

	/*---------------------Table类部分-------------------*/

	var template = '<table cellspacing="0">\
                		<thead></thead>\
                		<tbody></tbody>\
                		<tfoot></tfoot>\
            		</table>'

	// Table构造函数
	function Table(options){
		this.data = options.data;
		this.target = document.querySelector(options.target);
		this.sortItem = options.sortItem;
		this._init();
	}

	// 扩展Table原型
	extend(Table.prototype, {
		_init: function(){
			var table = html2node(template);
			table.setAttribute("class", "table");
			var tr = document.createElement("tr");
			this.data.head.forEach(function(item, index){
				var th = document.createElement("th");
				th.innerText = item;

				// 记录当前项的索引值
				th.value = index;
				
				// 判断是否支持排序
				if(this.isSupportedSort(item)){
					var spanUP = document.createElement("span");
					spanUP.innerHTML = "△";
					spanUP.addEventListener("click", this.sort.bind(this, false));
					th.appendChild(spanUP);
					var spanDown = document.createElement("span");
					spanDown.innerHTML = "▽";
					th.appendChild(spanDown);
					spanDown.addEventListener("click", this.sort.bind(this, true));
				}
				tr.appendChild(th);
			}, this);
			table.children[0].appendChild(tr);

			this.data.body.forEach(function(item){
				var tr = document.createElement("tr");
				item.forEach(function(elem){
					var td = document.createElement("td");
					td.innerHTML = elem;
					tr.appendChild(td);
				})
				table.children[1].appendChild(tr);
			})

			this.target.appendChild(table);
		},

		// 排序
		sort: function(flag, event){
			var index = event.target.parentNode.value;
			console.log(index);
			// 保留外部选择按字母进行排序的权利
			
			if((typeof this.sortFunc) !== "function"){
				this.data.body.sort(function(x, y){
					return x[index] - y[index];
				});
				if(flag){
					this.data.body.reverse();
				}
			}else{
				this.data.body.sort(function(x, y){
					console.log(this);
					return this.sortFunc(x[index], y[index]);
				}.bind(this));
				if(flag){
					this.data.body.reverse();
				}
			}
			this.reform();
		},

		// 判断是否支持排序
		isSupportedSort: function(item){

			if(!item || this.sortItem.indexOf(item) === -1){
				return false;
			}
			return true;
		},

		// 重新进行排序
		reform: function(){
			this.target.innerHTML = "";
			this._init();
		}
	})

	window.Table = Table;
})()
