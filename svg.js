class SvgPen{
	constructor(id,str){
		this.doc=document.getElementById(id);
		this.xmlns=str||"http://www.w3.org/2000/svg";
	}
	circle(cx,cy,r){
		let c=document.createElementNS(this.xmlns,'circle');
		c.setAttribute('cx',cx);
		c.setAttribute('cy',cy);
		c.setAttribute('r',r);
		this.doc.appendChild(c);
		return this;
	}
	text(cx,cy,str){
		let t=document.createElementNS(this.xmlns,'text');
		t.setAttribute('x',cx);t.setAttribute('y',cy);
		t.textContent=str;
		this.doc.appendChild(t);
		return this;
	}
	line(x1,y1,x2,y2){
		let c=document.createElementNS(this.xmlns,'line');
		c.setAttribute('x1',x1);
		c.setAttribute('y1',y1);
		c.setAttribute('x2',x2);
		c.setAttribute('y2',y2);
		this.doc.appendChild(c);
		return this;
	}
	setdoc(doc){
		this.doc=doc;
	}
}
