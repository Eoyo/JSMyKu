function getTop(e){ 
	var offset=e.offsetTop; 
	if(e.offsetParent!=null) offset+=getTop(e.offsetParent); 
//	console.log(offset);
	return offset; 
} 

//获取元素的横坐标
function getLeft(e){ 
	var offset=e.offsetLeft; 
	if(e.offsetParent!=null) offset+=getLeft(e.offsetParent); 
	return offset; 
}

var table=table||{};
table.creathead=function (head){
	var str='';
	for(var v in head){
		str+='<th>'+head[v]+'</th>';
	}
	return str;
}
table.creatdata=function(data){
	var str='';
	for(var v in data){
		str+='<td>'+data[v]+'</td>';
	}
	return str;
}
table.addattribute=function (str){
	table.attri=str;
}
table.creattable=function(head,items){
	var str='',sth='',std='';
	if(table.attri){
		str+='<table border="1px"'+table.attri+'">';
	}else{
		str+='<table>';
	}
	
	sth+='<tr>';
	sth+=table.creathead(head);
	sth+='</tr>';
	
	for(var k=0;k<items.length;k++){
		std+='<tr>';
		std+=table.creatdata(items[k]);
		std+='</tr>';
	}
	str+=sth+std;
	
	str+='</table>';
	return str;
}
/*
 * 
 */
function toiddoc(str){
	var doc=null;
	if(typeof(str)==="string"){var doc=document.getElementById(str);doc=doc;}
	else{doc=str;}
	return doc;
}
function toclassdoc(str){
	var doc;
	if(typeof(str)==="string"){
//		var docs=document.getElementsByClassName(str);
//		if(docs.length<=1){
//			doc=docs[0];
//		}else{
//			doc=docs;
//		}
		doc=document.getElementsByClassName(str);
	}
	else{doc=str;}
	return doc;
}
var ele=function (str){
	if(typeof(str)==="string"){var doc=document.getElementById(str);this.doc=doc;}
	else{this.doc=str;}
	this.y=getTop(this.doc);
	this.x=getLeft(this.doc);
	this.ev={
		fadeouted:function (){}
	};
	this.seto=function (str){
		this.doc.style.backgroundColor=str;
	}
	this.opaque=function(n){
		this.doc.style.opacity=n;
	}
	this.see_top_left=function (){
		console.log(this.y,this.x);
	}
}
//ele.prototype.getLeftto=function(todoc){
//	var doc=this.doc;
//	var offset=0;
//	todoc=toiddoc(todoc);
//	function get(e){
//		offset+=e.offsetLeft;
//		if(e.offsetParent!=null){
//			if(e.offsetParent==todoc){
//				return ;
//			}
//			get(e.offsetParent);
//			return ;
//		}
//		else{
//			offset=NaN;
//			return ;
//		}
//	}
//	get(doc);
//	return offset;
//}
//ele.prototype.getTopto=function(todoc){
//	var doc=this.doc;
//	var offset=0;
//	todoc=toiddoc(todoc);
//	function get(e){
//		offset=e.offsetTop;
//		if(e.offsetParent!=null){
//			if(e.offsetParent==todoc){
//				return ;
//			}
//			get(e.offsetParent);
//			return ;
//		}
//		else{
//			offset=NaN;
//			return ;
//		}
//	}
//	get(doc);
//	return offset;
//}
ele.prototype.creatdiv=function(weizhi){
	var doc=document.createElement('div');
	if(weizhi)doc.style.position=weizhi;
	doc.style.width=this.doc.offsetWidth+"px";
	doc.style.height=this.doc.offsetHeight+"px";
	return doc;
}
ele.prototype.getOffsetto=function(todoc){
	var doc=this.doc;
	var offset={top:0,left:0};
	todoc=toiddoc(todoc);
	function get(e){
		offset.top+=e.offsetTop;
		offset.left+=e.offsetLeft;
		if(e.offsetParent!=null){
			if(e.offsetParent==todoc){
				return ;
			}
			get(e.offsetParent);
			return ;
		}
		else{
			offset.top=NaN;
			offset.left=NaN;
			return ;
		}
	}
	get(doc);
	return offset;
}
ele.prototype.absolutenow=function(){
	this.doc.style.position="absolute";
	this.doc.style.left=this.x+"px";
	this.doc.style.top=this.y+"px";
}
ele.prototype.wrapby=function(idoc){
	idoc.style.position="fixed";
	idoc.style.top=this.y+"px";
	idoc.style.left=this.x+"px";
	idoc.style.width=this.doc.offsetWidth+"px";
	idoc.style.height=this.doc.offsetHeight+"px";
}
ele.prototype.fixnow=function(){
	if(this.doc.parentElement.className=="wrap"){
		var parentdoc=this.doc.parentElement.style;
		parentdoc.height=this.doc.offsetHeight+"px";
		parentdoc.width=this.doc.offsetWidth+"px";
		this.doc.style.position="fixed";
		this.doc.style.left=this.x+"px";
		this.doc.style.top=this.y+"px";
	}
	else{
		console.log("\"#"+this.doc.id+"\" should be added \".wrap\" parent");
	}
}
ele.prototype.del=function(){
	var parant=this.doc.parentElement;
	parant.removeChild(this.doc);
}
ele.prototype.hide=function(){
	this.doc.style.visibility="hidden";
}
ele.prototype.rise=function(){
	this.doc.style.display="block";
}
ele.prototype.fadein=function (t,tostart,toend){
	if(t===undefined){
		var di=0.01;
	}else{
		if(t<0)return;
		var di=0.016/t;
	}
	toend=toend||1;
	var opa=tostart||0;
	if(toend<=opa){return;}
	var the=this;
	the.rise();
	(function dying(){
		opa+=di;
		if(opa>=toend){
			the.opaque(toend);
			return;
		}
		the.opaque(opa);
		window.requestAnimationFrame(dying);
	}());
}
ele.prototype.divEvent=function (str,func){
	switch(str){
		case "fadeouted" :this.ev.fadeouted=func;break;
		default: console.log("no this :\""+str+"\"");
	}
}
ele.prototype.fadeout=function(t,toend,tostart){
	if(t===undefined){
		var di=0.01;
	}else{
		if(t<0)return;
		var di=0.016/t;
	}
	toend=toend||0;
	var opa=tostart||1;
	if(tostart<=toend){return;}
	var the=this;
	(function dying(){
		opa-=di;
		if(opa<=toend){
			the.opaque(toend);
			the.ev.fadeouted();
//			the.hide();
			return;
		}
		the.opaque(opa);
		window.requestAnimationFrame(dying);
	}());
}
ele.prototype.ptop=function (){
	console.log(getTop(this.doc));
}
ele.prototype.dwarf=function (n,t){
	if(t===undefined){
		di=7.2;
	}
	else{di=n/(t/0.016);
	}
	var the=this.doc;
	var h=the.offsetHeight;
	var aim_h=h-n;
	var polarity=1;
	if(n<0){
		n=-n;
		polarity=-1;
	}
	(function shorter(){
		di+=polarity;
		h-=di;
		n-=di*polarity;
		if(n<0){
			the.style.height=aim_h+"px";
			finished=true;//这可是有延迟的finised，只能在函数里
			return ;
		}
		the.style.height=h+"px";
		window.requestAnimationFrame(shorter);
	}());
}
