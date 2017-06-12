
//前台调用
var $ = function(args){
	return new Base(args);
}
//基础库
function Base(args){
	this.elements=[];
	if(typeof args=='string'){
		alert(args);
	}else if(typeof args = 'object'){
		if(args!=undefined){
			this.elements[0]=args;
		}
	}
	
}
//获取id节点
Base.prototype.getId = function(id){
	this.elements.push(document.getElementById(id));
	return this;
}
//获取元素节点
Base.prototype.getTagName = function(tag){
	var tags = document.getElementsByTagName(tag);
	for(var i=0;i<tags.length;i++){
		this.elements.push(tags[i]);
	}
	return this;
}
//获取class节点
Base.prototype.getClass=function(className,idName){
	var node = null;
	if(arguments.length==2){
		node = document.getElementById(idName)
	}else{
		node=document;
	}
	
	var all = node.getElementsByTagName('*');
	for(var i=0;i<all.length;i++){
		if(all[i].className==className){
			this.elements.push(all[i]);
		}
	}
	return this;
}
//添加class
Base.prototype.addClass=function(className){
	for(var i =0;i<this.elements.length;i++){
		if(!hasClass(this.elements[i],className)){
			this.elements[i].className +=' '+className;
		}
		
	}
	return this;
}
//移除class
Base.prototype.removeClass=function(className){
	for(var i = 0;i<this.elements.length;i++){
		if(hasClass(this.elements[i],className)){
			this.elements[i].className=this.elements[i].className.replace(new RegExp('(\\s|^)'+className+'(\\s|$)'),' ');
		}
		
	}
	return this;
}
//获取某一个节点,并返回这个节点对象
Base.prototype.getElement=function(num){
	return this.elements[num];
};
//返回某一个节点,并返回Base对象
Base.prototype.eq=function(num){
	var element = this.elements[num];
	this.elements = [];
	this.elements[0] = element;
	return this;
}
//设置css
Base.prototype.css = function(attr,value){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==1){
			return getStyle(this.elements[i],attr);
		}
		this.elements[i].style[attr] = value;
	}
	return this;
}

//设置InnerHTML
Base.prototype.html = function(str){
	for(var i =0;i<this.elements.length;i++){
		if(arguments.length!=0){
			this.elements[i].innerHTML=str;
		}else{
			return this.elements[i].innerHTML;
		}
	}
	return this;
}
//click点击事件
Base.prototype.click=function(fn){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].onclick=fn;
	}
	return this;
}
//设置显示
Base.prototype.show=function(){
	for(var i =0;i<this.elements.length;i++){
		this.elements[i].style.display='block';
	}
}
//设置隐藏
Base.prototype.hidden=function(){
	for(var i =0;i<this.elements.length;i++){
		this.elements[i].style.display='none';
	}
}
//设置物体居中
Base.prototype.center = function(width,height){
	var top = (getInner().height-height)/2;
	var left = (getInner().width-width)/2;
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.top = top+'px';
		this.elements[i].style.left= left+'px';
	}
	return this;
}
//设置鼠标移入移除事件
Base.prototype.hover = function(over,out){
	for(var i =0;i<this.elements.length;i++){
		//this.elements[i].onmouseover = over;
		//this.elements[i].onmouseout=out;
		addEvent(this.elements[i],'mouseover',over);
		addEvent(this.elements[i],'mouseout',out);
	}
	return this;
}
//触发浏览器窗口事件
Base.prototype.resize = function(fn){
	for(var i =0;i<this.elements.length;i++){
		var element = this.elements[i];
		window.onresize=function(){
			fn();
			if(element.offsetLeft>getInner().width-element.offsetWidth){
				element.style.left=getInner().width-element.offsetWidth+'px';
				element.style.top=getInner().height-element.offsetHeight+'px';
			}
		};
	}
	return this;
};
//锁屏
Base.prototype.lock=function(){
	for(var i = 0;i<this.elements.length;i++){
		this.elements[i].style.width=getInner().width+'px';
		this.elements[i].style.height=getInner().height+'px';
		this.elements[i].style.display='block';
	}
	return this;
};
Base.prototype.unlock=function(){
	for(var i = 0;i<this.elements.length;i++){
		this.elements[i].style.display='none';
	}
	return this;
}

//插件入口
Base.prototype.extend = function(name,fn){
	Base.prototype[name] =fn; 
}

//拖拽功能
/*Base.prototype.drag=function(){
	
}*/
