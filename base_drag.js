//拖拽功能

$().extend('drag',function(tags){
	for(var i = 0 ;i<this.elements.length;i++){
		addEvent(this.elements[i],'mousedown',function(e){
			
			var _this=this;
			//alert(e.clientX);
			//alert(oDiv.offsetLeft);
			var diffX = e.clientX - _this.offsetLeft;
			var diffY = e.clientY - _this.offsetTop;
			
			//自定义拖拽区域
			var flag = false;
			//alert(tags)
			for(var i =0;i<tags.length;i++){
				if(e.target==tags[i]){
					flag= true;
					break;
				}
			}
			
			
			if(flag){
				document.onmousemove=function(e){
					//alert(e.clientX);
					var left = e.clientX-diffX
					var top = e.clientY-diffY
					if(left<0){
						left=0;
					}else if(left>getInner().width-_this.offsetWidth){
						left = getInner().width-_this.offsetWidth;
					}
					if(top<0){
						top=0
					}else if(top>getInner().height-_this.offsetHeight){
						top = getInner().height-_this.offsetHeight;
					};
					_this.style.left =left +'px';
					_this.style.top =top +'px';
					if(typeof _this.setCapture!='undefined'){
						_this.setCapture();
					};
				}
			
				document.onmouseup=function(){
					this.onmousemove = null;
					this.onmouseup = null;
					if(typeof _this.releaseCapture !='undefined'){
						_this.releaseCapture();
					}
				}
			};	
		})
	}
	return this;
})
	

