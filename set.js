var Set=defineclass(
	function Set(){
		this.values={};
		this.n=0;
		for(var x= 0; x<arguments.length;x++){
			if(isArrayLike(arguments[x])){
				this.add.apply(this,arguments[x])
			}
			else{
				this.add.call(this,arguments[x]);
			}
		}
	},
	{
		add:function(val){
			for(var i=0; i<arguments.length;i++){
				var val=arguments[i];
				var str =Set._v2s(val);
				if(!this.values.hasOwnProperty(str)){
					this.values[str]=val;
					this.n++;
				}
			}
			return this;
		},
		remove:function(val){
			for (var i=0;i<arguments.length;i++){
				var str=Set._v2s(val);
				if(this.values.hasOwnProperty(str)){
					delete this.values[str];
					this.n--;
				}
			}
			return this;
		},
		contains:function(val){
			return this.values.hasOwnProperty(Set._v2s(val));
		},
		size:function(){
			return this.n;
		},
		forEach:function(f,context){
			for (var s in this.values){
				if(this.values.hasOwnProperty(s)){
					f.call(context,this.values[s]);
				}
			}
		}
	},
	{
		_v2s:function (val){
			switch(val){//前缀法
				case undefined:return 'u';
				case null:return 'n';
				case true:return 't';
				case false : return 'f';
				default:
					switch(typeof val){
						case 'string' : return '"'+val;
						case 'number' : return '#'+val;
						default:
							return '@'+setobjid(val);
					}
			}
			function setobjid(o){//特殊属性法
				var prop= "|**objectid**|";
				if(!o.hasOwnProperty(prop)){
					o[prop]=Set._v2s.count++;
				}
				return o[prop];
			}
		}
	}
);
Set._v2s.count=100;


function enumeration (namesTovalues){
	var enumeration =function (){
		throw "Can't Instantiate Enumeration";
	}
	var proto = enumeration.prototype=create_proto(
		enumeration,
		{
			toString :function (){return this.name;},
			valueOf : function () {return this.value;},
			toJSON: function () { return this.name;}
		}
	);
	enumeration.values=[];
	for(var name in namesTovalues){
		var e = inherit(proto);
		e.name =name;
		e.value= namesTovalues[name];
		enumeration[name]=e;
		enumeration.values.push(e);
	}
	enumeration.forEach=function (f,c){
		for (var i= 0; i<this.values.length;i++){
			f.call(c,this.values[i]);
		}
	}
	return enumeration;
}
extend(Set.prototype,{
	toString:function(){
		var s="{",i=0;
		this.forEach(function (v){
			s +=((i>0)?", ":(++i,""))+v;
		});
		return s + "}";
	},
	toArray:function (){
		var a=[];
		this.forEach(function (v){
			a.push(v);
		});
		return a;
	}
});
//low!!!!!!!!!!!low!!
//var FileteredSet=Set.extend(
//	function FileteredSet(set,filter){
//		this.set=set;
//		this.filter=filter;
//	},
//	{
//		add:function (){
//			if(this.filter){
//				for(var i =0;i<arguments.length;i++){
//					var v=arguments[i];
//					if(!this.filter(v)){
//						throw new Error("FilteredSet: value "+ v + "rejeccted by filter");
//					}
//				}
//			}
//			this.set.add.apply(this.set,arguments);
//			return this;
//		}
//		remove:function (){
//			this.set.remove.apply(this.set,arguments);
//			return this;
//		}
//		contains:function (){
//			this.set.contains.apply(this.set,arguments);
//			return this;
//		}
//		size:function (){
//			return this.set.size();
//		}
//		forEach:function (f,c){
//			return this.set.forEach(f,c);
//		}
//	}
//);
var FilteredSet=Set.extend(
	function FilteredSet(filter,...args){
		this.filter=filter;
		Pwakeup(FilteredSet,this,...args);//super  必须在this前执行! Pwakeup 就不必了;
	},
	{
		add:function (){
			if(this.filter){
				var par=getParent(FilteredSet);
				for(var i =0;i<arguments.length;i++){
					var v=arguments[i];
					try{
						if(!this.filter(v)){
							throw new Error("FilteredSet: value "+ v + "rejeccted by filter");
						}
						else{
							par.add.call(this,v);
						}
					}catch(e){
						console.log("filtered:  ",Set._v2s(v));
						return this;
					}
				}
			}
			return this;
		}
	}
);