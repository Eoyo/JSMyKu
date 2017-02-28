//creat array you like:
function getArray(len,alli){
	var tpar=new Array(len);
	for(var k=0;k<len;k++){
		tpar[k]=alli;
	}
	return tpar;
}
function getArraywh(w,h,alli){
	alli=alli||0;
	var tpar=getArray(w*h,alli);
	tpar.w=w;
	tpar.h=h;
	return tpar;
}
