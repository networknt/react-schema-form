var u;function d(e){return new RegExp("^(?:"+e.join("|")+")$","i")}var p=d(["str","lang","langmatches","datatype","bound","sameterm","isiri","isuri","iri","uri","bnode","count","sum","min","max","avg","sample","group_concat","rand","abs","ceil","floor","round","concat","substr","strlen","replace","ucase","lcase","encode_for_uri","contains","strstarts","strends","strbefore","strafter","year","month","day","hours","minutes","seconds","timezone","tz","now","uuid","struuid","md5","sha1","sha256","sha384","sha512","coalesce","if","strlang","strdt","isnumeric","regex","exists","isblank","isliteral","a","bind"]),m=d(["base","prefix","select","distinct","reduced","construct","describe","ask","from","named","where","order","limit","offset","filter","optional","graph","by","asc","desc","as","having","undef","values","group","minus","in","not","service","silent","using","insert","delete","union","true","false","with","data","copy","to","move","add","create","drop","clear","load","into"]),F=/[*+\-<>=&|\^\/!\?]/,s="[A-Za-z_\\-0-9]",x=new RegExp("[A-Za-z]"),g=new RegExp("(("+s+"|\\.)*("+s+"))?:");function f(e,t){var n=e.next();if(u=null,n=="$"||n=="?")return n=="?"&&e.match(/\s/,!1)?"operator":(e.match(/^[A-Za-z0-9_\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][A-Za-z0-9_\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]*/),"variableName.local");if(n=="<"&&!e.match(/^[\s\u00a0=]/,!1))return e.match(/^[^\s\u00a0>]*>?/),"atom";if(n=='"'||n=="'")return t.tokenize=h(n),t.tokenize(e,t);if(/[{}\(\),\.;\[\]]/.test(n))return u=n,"bracket";if(n=="#")return e.skipToEnd(),"comment";if(F.test(n))return"operator";if(n==":")return l(e),"atom";if(n=="@")return e.eatWhile(/[a-z\d\-]/i),"meta";if(x.test(n)&&e.match(g))return l(e),"atom";e.eatWhile(/[_\w\d]/);var a=e.current();return p.test(a)?"builtin":m.test(a)?"keyword":"variable"}function l(e){e.match(/(\.(?=[\w_\-\\%])|[:\w_-]|\\[-\\_~.!$&'()*+,;=/?#@%]|%[a-f\d][a-f\d])+/i)}function h(e){return function(t,n){for(var a=!1,r;(r=t.next())!=null;){if(r==e&&!a){n.tokenize=f;break}a=!a&&r=="\\"}return"string"}}function o(e,t,n){e.context={prev:e.context,indent:e.indent,col:n,type:t}}function i(e){e.indent=e.context.indent,e.context=e.context.prev}const v={name:"sparql",startState:function(){return{tokenize:f,context:null,indent:0,col:0}},token:function(e,t){if(e.sol()&&(t.context&&t.context.align==null&&(t.context.align=!1),t.indent=e.indentation()),e.eatSpace())return null;var n=t.tokenize(e,t);if(n!="comment"&&t.context&&t.context.align==null&&t.context.type!="pattern"&&(t.context.align=!0),u=="(")o(t,")",e.column());else if(u=="[")o(t,"]",e.column());else if(u=="{")o(t,"}",e.column());else if(/[\]\}\)]/.test(u)){for(;t.context&&t.context.type=="pattern";)i(t);t.context&&u==t.context.type&&(i(t),u=="}"&&t.context&&t.context.type=="pattern"&&i(t))}else u=="."&&t.context&&t.context.type=="pattern"?i(t):/atom|string|variable/.test(n)&&t.context&&(/[\}\]]/.test(t.context.type)?o(t,"pattern",e.column()):t.context.type=="pattern"&&!t.context.align&&(t.context.align=!0,t.context.col=e.column()));return n},indent:function(e,t,n){var a=t&&t.charAt(0),r=e.context;if(/[\]\}]/.test(a))for(;r&&r.type=="pattern";)r=r.prev;var c=r&&a==r.type;return r?r.type=="pattern"?r.col:r.align?r.col+(c?0:1):r.indent+(c?0:n.unit):0},languageData:{commentTokens:{line:"#"}}};export{v as sparql};
