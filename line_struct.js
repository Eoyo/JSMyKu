//creat array you like:
function createArray(len,alli){
	var tpar=new Array(len);
	for(var k=0;k<len;k++){
		tpar[k]=alli;
	}
	return tpar;
}
function createArraywh(w,h,alli){
	alli=alli||0;
	var tpar=getArray(w*h,alli);
	tpar.w=w;
	tpar.h=h;
	return tpar;
}
class Link{
	constructor(){
		this.head= new Node("head");//head,和 tail 节点对外不可见;
		this.tail= new Node("tail");
		this.head.next=this.tail;
	}//keyi ; bu keyi , 
	add(ele){
		var temptail=this.tail;
		temptail.ele=ele;
		this.tail=new Node("tail");//引用新的对象
		temptail.next=this.tail;
	}
	find(ele){
		return this.find_parent(ele).next;
	}
	find_parent(ele){
		var tofind=this.head;
		while(tofind.next&&(tofind.next.ele!=ele)){
			tofind=tofind.next;
		}
		if(!tofind.next||!tofind.next.next){
			return false;
		}
		return tofind;
	}
	remove(ele){
		var nos=this.find_parent(ele);
		if(!nos) return false;
		var nx=nos.next.next;
		delete nos.next;
		nos.next=nx;
		return true;
	}
	reverse(){
		var cur=this.head;
		this.head=this.tail;//调整头尾
		this.tail=cur;
		var left=cur;
		cur=cur.next;
		left.next=null;
		var right=cur;
		while(cur){
			//调整
			right=cur.next;
			cur.next=left;
			
			//向right移动
			left=cur;
			cur=right;
		}
	}
	insert(ele,item){
		var toinsert=new Node(ele);
		var itemnode=this.find(item);
		toinsert.next=itemnode.next;
		itemnode.next=toinsert;
	}
	display(){
		var tempNode=this.head;
		var str="";
		while(tempNode.next.next){
			str += tempNode.next.ele+' ';
			tempNode=tempNode.next;
		}
		console.log(str);
	}
}
class Node{
	constructor(ele){
		this.ele=ele;
		this.next=null;
	}
}
class TimeLink extends Link{
	constructor(){
		super();
	}
	add(ele){//重写以覆盖;
		this.push(ele);
	}
	push(ele){
		this.remove(ele);
		super.add(ele);
	}
	pop_oldest(){
		var nx=this.head.next;
		this.head.next=nx.next;
		return nx.ele;
	}
}
