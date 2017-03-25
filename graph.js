'use strict'
var createGraph=function(){//关联图,不多重;//无法继承与扩展了
	var nodes={};
	function insert(s,e,w){//start,end,weight;
		if(nodes[s]===undefined){
			nodes[s]={};
			Object.defineProperty(nodes[s],'len',{
//				enumerable:false, 默认为false;
				writable:true,
				value:0
			});
		}
		nodes[s][e]=w;
		++nodes[s].len;
	}
	function remove(s,e){
		if(nodes[s]===undefined){
			return true;
		}
		delete nodes[s][e];
		--nodes[s].len;
		if(nodes[s].len==0){
			delete nodes[s];
		}
	}
	function see(){
		var restr="";
		for(var x in nodes){
			restr+=x+'\n';
			var str="  ";
			for(var y in nodes[x]){
				str+=y+' ';
			}
			restr+=str+'\n';
		}
		restr+='....\n'
		console.log(restr);
	}
	return {
		insert,
		remove,
		see
	};
}
var Graph=function(){//关联图,不多重;
	this.nodes={};
	this.initnode=function(s){
		var nodes=this.nodes;
		if(nodes[s]===undefined){
			nodes[s]={};
			Object.defineProperty(nodes[s],'runout',{
				enumerable:false,
				writable:true,
				value:0
			});
			Object.defineProperty(nodes[s],'runin',{
				enumerable:false,
				writable:true,
				value:0
			});
		}
	}
	this.insert=function(s,e,w){//start,end,weight;
		var nodes=this.nodes;
		this.initnode(s);
		this.initnode(e);
		nodes[s][e]=w;
		++nodes[s].runout;
		++nodes[e].runin;
	}
	this.remove=function(s,e){
		var nodes=this.nodes;
		if(nodes[s]===undefined){
			return false;
		}
		if(nodes[s][e]){
			delete nodes[s][e];
			--nodes[s].runout;
		}
		if(nodes[s].runout==0&&nodes[s].runin==0){
			delete nodes[s];
		}
	}
	this.see=function(){
		var nodes=this.nodes;
		var restr="";
		for(var x in nodes){
			restr+=x+'\n';
			var str="  ";
			for(var y in nodes[x]){
				str+=y+' ';
			}
			restr+=str+'\n';
		}
		restr+='....\n'
		console.log(restr);
	}
}
//var Tup=Extend(tup,{
//	out(){
//		console.log(this.nodes);
//	}
//});
//var ctup=new Tup();
//var MTup=Extend(ctup,{
//	say(){
//		console.log("say");
//	}
//});
//var mctup=new MTup();
//ctup.insert(4,5,6);
//ctup.see();
//mctup.see();
//var MMctup=Extend(mctup,{});
//var mmctup=new MMctup();
//mmctup.insert(8,8,8);
//mctup.see();
//mmctup.see();

class pp{
	constructor(...args){
		this.name="parent";
		this.one=args[0];
	}
	psay(){
		return this.name+"对象在此";
	}
}
//pp.prototype 是只读的
class Tp extends pp{
	constructor(...args){
		super(...args);
		this.name="son";
		this.tow=args[1];
	}
	say(){
		return this.name+"对象在此";
	}
}
function func(){
} 
func.prototype={
	constructor:func,
	getname:function (){
		console.log (this.name);
	},
	name:"liumiao"
}
var tup=new func();
console.log()
