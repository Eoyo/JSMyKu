class AVLNode{
	constructor(v){
		this.bf=0;
		this.lc=null;
		this.rc=null;
		this.v=v;
	}
}
class AVLTree{
	constructor(v){
		this.root=new AVLNode(v);
	}
	add(v){//内递归
		var result=true;
		var balance=false;
		function roteR(p,sr){
			var t=p[sr];
			var r=t.rc;
			if(r.bf==-1){//RR旋转,r上位;
				t.lc=r.lc; r.lc=t;
				t.bf=0;
				p[sr]=r;
			}
			else{//LR 旋转,分解了r.lc,r.lc上位;根据r.lc.bf来调整各自的bf;
				var u=r.lc; 
				r.lc=u.rc;u.rc=r;
				t.rc=u.lc;u.lc=t;
//				switch(u.bf){
//					case 1:t.bf=0;r.bf=-1;break;
//					case 0:t.bf=0;r.bf=0;break;
//					case -1:t.bf=1;r.bf=0;break;
//				}
				//可总结出:
				t.bf=+(u.bf<0);
				r.bf=-(u.bf>0);
				p[sr]=u;	
			}
			t.bf=0;
			balance=true;
		}
		function roteL(p,sr){
			var t=p[sr];
			var l=t.lc;
			if(l.bf==1){//LL旋转,l上位;
				t.lc=l.rc;
				l.rc=t;
				t.bf=0;
				p[sr]=l;
			}
			else{//LR 旋转,分解了l.rc,l.rc上位;根据l.rc.bf来调整各自的bf;
				var u=l.rc; 
				l.rc=u.lc;u.lc=l;
				t.lc=u.rc;u.rc=t;
				t.bf=-(u.bf>0);
				l.bf=+(u.bf<0);
				p[sr]=u;
			}
			t.bf=0;
			balance=true;
		}
		function adding(p,sr,v){
			var t=p[sr];
			if(t==undefined||t==null){//利用回溯修改bf的值;
				p[sr]=new AVLNode(v);
				return ;
			}
			
			if(t.v==v){
				balance=true;
				result=false;return;
			}
			else if(t.v<v){
				adding(t,'rc',v);
				if(balance)return;
				switch(t.bf){
					case 1:t.bf=0;balance=true;break;
					case 0:t.bf=-1;break;
					case -1:roteR(p,sr);break;//JS的妙用!解构传输参数,实现了引用;
				}
			}
			else{
				adding(t,'lc',v);
				if(balance)return;
				switch(t.bf){
					case -1:t.bf=0;balance=true;break;
					case 0:t.bf=1;break;
					case 1:roteL(p,sr);break;
				}
			}
		}
		if(!this.root.v){
			this.root.v=v;return true;
		}
		adding(this,'root',v);
		return result;
	}
	see(type){//
		var nodes=[];
		var oxp=[0,1,2];//语句顺序控制大法!!
		type=type||0;
		if(type>=3){
			oxp=[2,1,0];
		}
		function LNR(p){//默认是 中序遍历;
			if(!p){return ;}
			for(var k=0;k<3;k++){
				switch((oxp[k]+type)%3){
					case 0:LNR(p.lc);break;
					case 1:
						if(p.v){
							nodes.push(p.v);
						}
						break;
					case 2:LNR(p.rc);break;
				}
			}
		}
		LNR(this.root);
		return nodes;
	}
}
var avl=new AVLTree();
avl.add(45);
avl.add(56);
avl.add(34);
avl.add(40);
avl.add(30);
avl.add(33);
console.log(avl.see(0));
