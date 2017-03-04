var List=function (){
	this.length=0;
	this.pos=0;
	this.data=[];
	this.clear=clear;
	this.find=find;
	this.toString=toString;
	this.append=append;
	function append(ele){
		this.data[this.length++]=ele;
	}
}

var Node=function (ele){
	this.ele=ele;
	this.next=null;
}
var LinkList=function(){
	this.head= new Node("head");
	this.tail= new Node("tail");
	this.head.next=this.tail;
	this.find=find;
	this.insert=insert;
//	this.remove=remove;
	this.display=display;
	this.add=add;
	function add(ele){
		var temptail=this.tail;
		temptail.ele=ele;
		this.tail=new Node("tail");//引用新的对象
		temptail.next=this.tail;
	}
	function find(ele){
		var tofind=this.head;
		while(tofind&&(tofind.ele!=item)){
			tofind=tofind.next;
		}
		if(!tofind){
			console.error("can't find");
		}
		return tofind;
	}
	function insert(ele,item){
		var toinsert=new Node(ele);
		var itemnode=this.find(item);
		toinsert.next=itemnode.next;
		itemnode.next=toinsert;
	}
	function display(){
		var tempNode=this.head;
		var str="";
		while(tempNode.next.next){
			str += tempNode.next.ele+' ';
			tempNode=tempNode.next;
		}
		console.log(str);
	}
}
var Dict=function (){//dictionary字典
	this.data=[];//datastore;
	this.add=function (key,dt){
		this.data[key]=dt;
	}
	this.get=function (key){// not remove 
		if(!key){
			key=Object.keys(this.data)[this.count()-1];
		}
		return this.data[key];
	}
	this.pop=function (){
		var key=Object.keys(this.data)[this.count()-1];
		var toreturn=this.data[key];
		delete this.data[key];
		return toreturn;
	}
	this.remove=function (key){
		delete this.data[key];
	}
	this.count=function (){
		return Object.keys(this.data).length;
	}
	this.display=function (){
//		for(var key in this.data){
//			console.log(key,this.data[key]);
//		}
		var wode=console.log(this.data);
	}
}
var Gether=function (data,name){
	this.ele=[];
	if(data){
		ele=data;
	}
	this.name="gather";
	if(name)this.name=name;
	this.add=function (ele){
		if(this.exit(ele)){
			console.log(ele+" is exit in"+this.name);
		}
		else{
			this.ele.push(ele);
		}
	}
	this.exit=function(ele){
		for(var k=0;k<this.ele.length;k++){
			if(ele==this.ele[k])return  true;
		}
		return false;
	}
}

function TiquDao(){
	var imgdata=[];
	var biaoji=[];
	biaoji[0]=[1,0,1,0,1,1,1,0];
	biaoji[1]=[1,0,0,0,1,1,1,0];
	biaoji[2]=[1,0,0,0,1,1,0,1];
	biaoji[3]=[1,1,0,0,1,1,0,0];
	biaoji[4]=[1,1,1,1,1,1,1,1];
	biaoji[5]=[0,1,0,1,1,0,0,0];
	biaoji[6]=[0,1,1,1,1,0,0,0];
	biaoji[7]=[0,0,0,1,1,1,1,1];
	var k=2;
	var height=biaoji.length;
	var width=biaoji[0].length;
	function see(i,j){
		if(biaoji[i][j]||(i<0||j<0)) return ;
		biaoji[i][j]=k;
		see(i,j+1);
		see(i+1,j);
		see(i,j-1);
		see(i-1,j);
	}
	for(var i=0,j=0;i<height;i++){
		for(;j<width;j++){
			if(biaoji[i][j]==0){
				see(i,j);
				k++;
			}
		}
	}
	console.log(biaoji);
}
//算法区
//+++++搜索遍历


//执行区
var zidian=new Dict();//字典实验
zidian.add("LM",'liumiao');
zidian.add("XX","xixi");
zidian.display();
console.log(zidian.pop(),zidian.pop());

var oiyd=new LinkList();
oiyd.add("liu");
oiyd.add("你好");
oiyd.display();

TiquDao();
