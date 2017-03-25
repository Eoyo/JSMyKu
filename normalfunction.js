function isOut(i,j){
		return (i<0||j<0)&&(i>=height||j>=width);
}
function seearray(arr){
	var str="";
	var len=arr.length;
	for(var i=0;i<len;i++){
		str+=arr[i].join(',')+'\n';
	}
	console.log(str);
}
function isu(e){
	return e==undefined||e==null;
}
function createCopyObj(obj){
	if(obj){
		var p=Object.getPrototypeOf(obj);
		if(p){
			var pobj=createCopyObj(p);//对原型对象copy
			var f=function (){}
			f.prototype=pobj;
			var co = new f();
			var names=Object.getOwnPropertyNames(obj);
			for(var k in names){
				var i=names[k];
				var desc=Object.getOwnPropertyDescriptor(obj,i);
				Object.defineProperty(co,i,desc);
				if(typeof(obj[i])=="object"){
					if(obj[i]==null){
						continue;
					}
					co[i]=createCopyObj(obj[i]);//是对象时对象copy
				}
				else{
					co[i]=obj[i];
				}
			}
			return co;
		}
	}
	else{
		console.log('绝逼发生意外了');
	}
}
function copyobj2(obj,co){//自属性拷贝
	if(obj==null){
		return ;
	}
	var co=co||{};
	var names=Object.getOwnPropertyNames(obj);
	for(var k in names){
		var i=names[k];
		var desc=Object.getOwnPropertyDescriptor(obj,i);
		Object.defineProperty(co,i,desc);
		if(typeof(obj[i])=="object"){
			if(obj[i]==null){
				continue;
			}
			co[i]=copyobj(obj[i]);
		}
		else{
			co[i]=obj[i];
		}
	}
	return co;
}
function Extend(obj,ext){// creatCopyObj extend
	var p;
	if(obj==null){
		return ;
	}
	var f=function(){}
	switch(typeof(obj)){
		case "function":
			p=new obj();
			f.prototype=p;//p是引用
			break;
		case "object":
			f.prototype=createCopyObj(obj);
			break;
		default:
			throw TypeError();
	}
	for(var i in ext){
		p[i]=ext[i];
	}
	return f;
}
/*Object.defineProperty(Object.prototype,
	"extend",
	{
		writable:true,
		enumerable:false,
		configurable:true,
		value(o){
			var names=Object.getOwnPropertyNames(o);
//			var has=Object.getOwnPropertyNames(this);
			for(var i=0;i<names.length;i++){
				if(names[i] in this) continue;
				var desc=Object.getOwnPropertyDescriptor(o,names[i]);
				Object.defineProperty(this,names[i],desc);
			}
		}
	}
);*/

//Rhinocerros _我大犀牛
Array.join = Array.join || function (a,sep){
	return Array.prototype.join.call(a,sep);
}
Array.slice = Array.slice || function (a,from,to){
	return Array.prototype.join.call(a,from,to);
}
Array.map = Array.map || function (a,f,thisArg){
	return Array.prototype.join.call(a,f,thisArg);
}
function classof(o){
	if(o===null) return "Null";
	if(o===undefined) return "Undefined";
	return Object.prototype.toString.call(o).slice(8,-1);
}
function memorize(f){
	var cache={};
	return function (){
		var key = arguments.length + Array.prototype.join.call(arguments,",");
		if(key in cache){
			return cache[key];
		}
		else{
			return cache[key] = f.apply(this,arguments);
		}
	}
}
function inherit (p){
	if (p == null){
		throw TypeError();
	}
	if(Object.create){
		return Object.create(p);
	}
	var t=typeof p;
	if (t!== "object" && t !== "function") throw TypeError();
	function f(){}
	f.prototype=p;
	return new f();
}
function isArrayLike(o){
	if( o &&
		typeof o ==="object" &&
		isFinite(o.length) &&
		o.length >= 0 &&
		o.length===Math.floor(o.length) &&  //是正数
		o.length < 4294967296){
		return true;
	}else{
		return false;
	}
}
function extend (obj,p){
	for (var x in p){
		obj[x]=p[x];
	}
	return obj;
}
function defineclass (constructor,methods,statics){
	if(methods) extend(constructor.prototype,methods);
	if(statics)	extend(constructor,statics);
	return constructor;
}
function defineSubclass (superclass,ct, methods,statics){
	ct.prototype = inherit(superclass.prototype); 
			//创建了新对象继承superclass.prototype 即:  ct.prototype.__proto__-->superclass.prototype
			//如下 重写了constructor,constructor被覆盖了;还得系统级 的访问__proto__才能找到superclass.prototype;
	ct.prototype.constructor = ct;
	if(methods) extend(ct.prototype,methods);
	if(statics)	extend(ct,statics);
	return ct;
}
function Pwakeup(par,son,...args){//模拟super 好不容易呀!!//前提是大家有constructor;
	par=Object.getPrototypeOf(par.prototype);//记录在每一层,传入的constructor;
	par.constructor.apply(son,...args);		 //由其获得父原型 的constructor;
}
Function.prototype.extend = function (constructor,methods,statics){
	return defineSubclass(this,constructor,methods,statics);
}