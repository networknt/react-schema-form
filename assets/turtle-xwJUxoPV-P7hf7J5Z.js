var i;function x(e){return new RegExp("^(?:"+e.join("|")+")$","i")}x([]);var f=x(["@prefix","@base","a"]),u=/[*+\-<>=&|]/;function p(e,t){var n=e.next();if(i=null,n=="<"&&!e.match(/^[\s\u00a0=]/,!1))return e.match(/^[^\s\u00a0>]*>?/),"atom";if(n=='"'||n=="'")return t.tokenize=s(n),t.tokenize(e,t);if(/[{}\(\),\.;\[\]]/.test(n))return i=n,null;if(n=="#")return e.skipToEnd(),"comment";if(u.test(n))return e.eatWhile(u),null;if(n==":")return"operator";if(e.eatWhile(/[_\w\d]/),e.peek()==":")return"variableName.special";var o=e.current();return f.test(o)?"meta":n>="A"&&n<="Z"?"comment":"keyword";var o}function s(e){return function(t,n){for(var o=!1,r;(r=t.next())!=null;){if(r==e&&!o){n.tokenize=p;break}o=!o&&r=="\\"}return"string"}}function c(e,t,n){e.context={prev:e.context,indent:e.indent,col:n,type:t}}function a(e){e.indent=e.context.indent,e.context=e.context.prev}const m={name:"turtle",startState:function(){return{tokenize:p,context:null,indent:0,col:0}},token:function(e,t){if(e.sol()&&(t.context&&t.context.align==null&&(t.context.align=!1),t.indent=e.indentation()),e.eatSpace())return null;var n=t.tokenize(e,t);if(n!="comment"&&t.context&&t.context.align==null&&t.context.type!="pattern"&&(t.context.align=!0),i=="(")c(t,")",e.column());else if(i=="[")c(t,"]",e.column());else if(i=="{")c(t,"}",e.column());else if(/[\]\}\)]/.test(i)){for(;t.context&&t.context.type=="pattern";)a(t);t.context&&i==t.context.type&&a(t)}else i=="."&&t.context&&t.context.type=="pattern"?a(t):/atom|string|variable/.test(n)&&t.context&&(/[\}\]]/.test(t.context.type)?c(t,"pattern",e.column()):t.context.type=="pattern"&&!t.context.align&&(t.context.align=!0,t.context.col=e.column()));return n},indent:function(e,t,n){var o=t&&t.charAt(0),r=e.context;if(/[\]\}]/.test(o))for(;r&&r.type=="pattern";)r=r.prev;var l=r&&o==r.type;return r?r.type=="pattern"?r.col:r.align?r.col+(l?0:1):r.indent+(l?0:n.unit):0},languageData:{commentTokens:{line:"#"}}};export{m as turtle};
