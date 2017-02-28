function LoadPicToCanvas(drawBeauty,beauty)  //方法,图片
{
	if(beauty.complete){
	   drawBeauty(beauty);
	}else{
	   beauty.onload = function(){
	     drawBeauty(beauty);
	   }
	   beauty.onerror = function(){
	   	var message=beauty.src+'  加载wrong';
	     window.alert(message);
	   }
	}  
}

//画自适应的图;
function supersetwh_bywidth(doc,w,h){
	setwh(doc,w,h);
	var ow=doc.offsetWidth;
	var aim_h=h/w*ow;
	doc.style.height=aim_h+"px";
}
function supersetwh_byheight(doc,w,h){
	setwh(doc,w,h);
	var ow=doc.offsetHeight;
	var aim_w=w/h*ow;
	doc.style.width=aim_w+"px";
}
function supersetwh(doc,w,h,mos){
	setwh(doc,w,h);
	switch(mos){
		case undefined:break;
		case 'h':
			var ow=doc.offsetHeight;
			var aim_w=w/h*ow;
			doc.style.width=aim_w+"px";
			break;
		case 'w':
			var ow=doc.offsetWidth;
			var aim_h=h/w*ow;
			doc.style.height=aim_h+"px"
			break;
	}
}
function setwh(doc,w,h){
	try{
		doc.width=w;
		doc.height=h;
	}catch(e){
		try{
			doc.style.width=w+"px";
			doc.style.height=h+"px";
		}catch(e){
			console.log("setwh() fail");
		}
	}
}
var canvas=function (id){
	doc:document.getElementById(id);
}
var tup=new canvas("tup");
