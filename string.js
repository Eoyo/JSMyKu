function sayerror(type){
	var str="";
	switch(type){
		case 0:str="lost something!";break;
		case 1:str="wrong order!";break;
	}
	console.error(str);
}
function strpush(str,i,s){
	if(arguments.length>3){//在多个地方插入
		var len=arguments.length;
		if(!(len%2)){
			sayerror(0);
			return undefined;
		}//非奇数个的args
		var restr="";
		var last=0;
		for(var k=1;k<len;k+=2){
			restr+=str.slice(last,arguments[k]);
			if(arguments[k]>last){
				last=arguments[k];
			}else{
				sayerror(1);return ;
			}
			restr+=arguments[k+1];
		}
		restr+=str.slice(last);
		return restr;
	}
	var a=str.slice(0,i);
	var b=str.slice(i);
	return a+s+b;
}

function fail(str){
	let [j,k,f]=[0,-1,[]];
	var len=str.length;
	f[0]=-1;
	while(j<len){
		if((k==-1)||(str[j]==str[k])){
			j++;k++;
			if(str[j]==str[k]) f[j]=f[k];
			else f[j]=k;
		}
		else{
			k=f[k];
		}
	}
	return f;
}

function pipei(str,a){
	var f=fail(a);
	let [j,k]=[0,0];
	var  len=str.length;
	while(j<len){
		if(k==-1||a[k]==str[j]){
			k++;j++;
		}
		else{
			k=f[k];
		}
		if(k==a.length){
			console.log(strpush(str,j-k,"\'",j,"\'"));
			return true;
		}
	}
	return false;
}

console.log(pipei("abcabcdcdabccd","abccd"));
