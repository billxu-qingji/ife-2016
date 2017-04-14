/*
* @Author: Administrator
* @Date:   2017-02-09 16:44:36
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-09 20:43:46
*/

'use strict';

var btn = document.getElementById("btn");
var root = document.getElementById("root");
var elems = [];
var timer = null;

btn.addEventListener("click", handlerClickEvent, false);
function handlerClickEvent(event){
	switch(event.target.id){
		case "pre":
			preOder(root);
			break;
		case "ord":
			inOrder(root);
			break;
		case "epi":
			postOrder(root);
			break;
		default:
			console.log("no this type");
			return;
	}
	show();
}

// 先序遍历
function preOder(node){
	if(node){
		elems.push(node);
		preOder(node.firstElementChild);
		preOder(node.lastElementChild);
	}

}
// 中序遍历
function inOrder(node){
	if(node){
		inOrder(node.firstElementChild);
		elems.push(node);
		inOrder(node.lastElementChild);
	}
}
// 后序遍历
function postOrder(node){
	if(node){
		postOrder(node.firstElementChild);
		postOrder(node.lastElementChild);
		elems.push(node);
	}
}
// 显示元素
function show(){
	console.log(elems);
	var i = 0;
	timer = setInterval(function(){
		if(i>=elems.length){
			elems[elems.length-1].style.background = "white";
			clearInterval(timer);
			elems.splice(0);
			return ;
		}
		elems[i].style.background = "red";
		if(i>0){
			elems[i-1].style.background = "white";
		}
		i++;

	}, 1000);
}
