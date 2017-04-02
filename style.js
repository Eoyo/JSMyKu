class StyleControl{
	constructor(doc,stylenum){
		if(!doc){
			alert("Maybe wrong will happend,if you don't give document");
		}
		this.document=doc||document;//document ;
		this.num=stylenum||0;
		this.rules=null;//避免没初始化
		this.sels={};//for selesctors 
		this.init();
	}
	init(){
		this.num=0;//stylelist only one
		this.rules=this.document.styleSheets[0].cssRules||this.document.styleSheets[0].rules;
		var len=this.rules.length;
		for(var i=0;i<len;i++){
			var str=this.rules[i].selectorText;
			this.sels[str]=i;
		}
	}
	getrule(str){
		return this.rules[this.sels[str]];
	}
	seerule(num){
		if(num!=undefined)
			console.log(this.rules[num].selectorText);
		else{
			var str="";
			for(var i=0;i<this.rules.length;i++){
				str+=this.rules[i].selectorText+"|| ||\n";
			}
			console.log(str);
		}
	}
}
function stys(){
	
}
