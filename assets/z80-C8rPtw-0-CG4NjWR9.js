function s(l){var n,i;l?(n=/^(exx?|(ld|cp)([di]r?)?|[lp]ea|pop|push|ad[cd]|cpl|daa|dec|inc|neg|sbc|sub|and|bit|[cs]cf|x?or|res|set|r[lr]c?a?|r[lr]d|s[lr]a|srl|djnz|nop|[de]i|halt|im|in([di]mr?|ir?|irx|2r?)|ot(dmr?|[id]rx|imr?)|out(0?|[di]r?|[di]2r?)|tst(io)?|slp)(\.([sl]?i)?[sl])?\b/i,i=/^(((call|j[pr]|rst|ret[in]?)(\.([sl]?i)?[sl])?)|(rs|st)mix)\b/i):(n=/^(exx?|(ld|cp|in)([di]r?)?|pop|push|ad[cd]|cpl|daa|dec|inc|neg|sbc|sub|and|bit|[cs]cf|x?or|res|set|r[lr]c?a?|r[lr]d|s[lr]a|srl|djnz|nop|rst|[de]i|halt|im|ot[di]r|out[di]?)\b/i,i=/^(call|j[pr]|ret[in]?|b_?(call|jump))\b/i);var c=/^(af?|bc?|c|de?|e|hl?|l|i[xy]?|r|sp)\b/i,o=/^(n?[zc]|p[oe]?|m)\b/i,d=/^([hl][xy]|i[xy][hl]|slia|sll)\b/i,a=/^([\da-f]+h|[0-7]+o|[01]+b|\d+d?)\b/i;return{name:"z80",startState:function(){return{context:0}},token:function(t,r){if(t.column()||(r.context=0),t.eatSpace())return null;var e;if(t.eatWhile(/\w/))if(l&&t.eat(".")&&t.eatWhile(/\w/),e=t.current(),t.indentation()){if((r.context==1||r.context==4)&&c.test(e))return r.context=4,"variable";if(r.context==2&&o.test(e))return r.context=4,"variableName.special";if(n.test(e))return r.context=1,"keyword";if(i.test(e))return r.context=2,"keyword";if(r.context==4&&a.test(e))return"number";if(d.test(e))return"error"}else return t.match(a)?"number":null;else{if(t.eat(";"))return t.skipToEnd(),"comment";if(t.eat('"')){for(;(e=t.next())&&e!='"';)e=="\\"&&t.next();return"string"}else if(t.eat("'")){if(t.match(/\\?.'/))return"number"}else if(t.eat(".")||t.sol()&&t.eat("#")){if(r.context=5,t.eatWhile(/\w/))return"def"}else if(t.eat("$")){if(t.eatWhile(/[\da-f]/i))return"number"}else if(t.eat("%")){if(t.eatWhile(/[01]/))return"number"}else t.next()}return null}}}const u=s(!1),f=s(!0);export{f as ez80,u as z80};
