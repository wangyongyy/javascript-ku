
//跨浏览器事件绑定
function addEvent(obj,type,fn){
	if(typeof obj.addEventListener!='undefined'){	//W3C
		obj.addEventListener(type,fn,false);
	}else if(typeof obj.attachEvent !='undefined'){
		obj.attachEvent('on'+type,function(){
			fn.call(obj,window.event);
		});
	}
}
//把IE常用的Event对象配对到W3C中去
addEvent.fixEvent = function(event){
	event.preventDefault=addEvent.fixEvent.preventDefault;
	event.stopPropagation=addEvent.fixEvent.stopPropagation;
	event.target = event.srcElement;
	return event;
};
//IE阻止默认行为
addEvent.fixEvent.preventDefault=function(){
	this.returnValue=false;
};
//IE取消冒泡
addEvent.fixEvent.stopPropagation = function(){
	this.cancelBubble=true;
}
//跨浏览器删除事件
function removeEvent(obj,type,fn){
	if(typeof obj.removeEventListener!='undefined'){
		obj.removeEventListener(type,fn,false);
	}else if(typeof obj.detachEvent!='undefined'){
		obj.detachEvent('on'+type,fn);
	}
}

//跨浏览器获取适口
function getInner(){
	if(typeof window.innerWidth!='undefined'){
		return {
			width:window.innerWidth,
			height:window.innerHeight
		}
	}else{
		return {
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		}
	}
};
//跨浏览器获取style
function getStyle(element,attr){
	if(typeof window.getComputedStyle!='undefined'){//W3C
		return window.getComputedStyle(element,null)[attr];
	}else if(typeof element.currentStyle!=='undefined'){//IE
		return element.currentStyle[attr];
	}
}
//判断class是否存在
function hasClass(element,className){
	return element.className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))
}
//获取Event对象
function getEvent(event){
	return event || window.event;
}
//移除左右空格
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g,'');
}
