var d=function(){function e(z){return{type:z,style:"keyword"}}for(var t=e("operator"),n={type:"atom",style:"atom"},r={type:"punctuation",style:null},c={type:"axis_specifier",style:"qualifier"},s={",":r},x=["after","all","allowing","ancestor","ancestor-or-self","any","array","as","ascending","at","attribute","base-uri","before","boundary-space","by","case","cast","castable","catch","child","collation","comment","construction","contains","content","context","copy","copy-namespaces","count","decimal-format","declare","default","delete","descendant","descendant-or-self","descending","diacritics","different","distance","document","document-node","element","else","empty","empty-sequence","encoding","end","entire","every","exactly","except","external","first","following","following-sibling","for","from","ftand","ftnot","ft-option","ftor","function","fuzzy","greatest","group","if","import","in","inherit","insensitive","insert","instance","intersect","into","invoke","is","item","language","last","lax","least","let","levels","lowercase","map","modify","module","most","namespace","next","no","node","nodes","no-inherit","no-preserve","not","occurs","of","only","option","order","ordered","ordering","paragraph","paragraphs","parent","phrase","preceding","preceding-sibling","preserve","previous","processing-instruction","relationship","rename","replace","return","revalidation","same","satisfies","schema","schema-attribute","schema-element","score","self","sensitive","sentence","sentences","sequence","skip","sliding","some","stable","start","stemming","stop","strict","strip","switch","text","then","thesaurus","times","to","transform","treat","try","tumbling","type","typeswitch","union","unordered","update","updating","uppercase","using","validate","value","variable","version","weight","when","where","wildcards","window","with","without","word","words","xquery"],a=0,i=x.length;a<i;a++)s[x[a]]=e(x[a]);for(var g=["xs:anyAtomicType","xs:anySimpleType","xs:anyType","xs:anyURI","xs:base64Binary","xs:boolean","xs:byte","xs:date","xs:dateTime","xs:dateTimeStamp","xs:dayTimeDuration","xs:decimal","xs:double","xs:duration","xs:ENTITIES","xs:ENTITY","xs:float","xs:gDay","xs:gMonth","xs:gMonthDay","xs:gYear","xs:gYearMonth","xs:hexBinary","xs:ID","xs:IDREF","xs:IDREFS","xs:int","xs:integer","xs:item","xs:java","xs:language","xs:long","xs:Name","xs:NCName","xs:negativeInteger","xs:NMTOKEN","xs:NMTOKENS","xs:nonNegativeInteger","xs:nonPositiveInteger","xs:normalizedString","xs:NOTATION","xs:numeric","xs:positiveInteger","xs:precisionDecimal","xs:QName","xs:short","xs:string","xs:time","xs:token","xs:unsignedByte","xs:unsignedInt","xs:unsignedLong","xs:unsignedShort","xs:untyped","xs:untypedAtomic","xs:yearMonthDuration"],a=0,i=g.length;a<i;a++)s[g[a]]=n;for(var f=["eq","ne","lt","le","gt","ge",":=","=",">",">=","<","<=",".","|","?","and","or","div","idiv","mod","*","/","+","-"],a=0,i=f.length;a<i;a++)s[f[a]]=t;for(var k=["self::","attribute::","child::","descendant::","descendant-or-self::","parent::","ancestor::","ancestor-or-self::","following::","preceding::","following-sibling::","preceding-sibling::"],a=0,i=k.length;a<i;a++)s[k[a]]=c;return s}();function p(e,t,n){return t.tokenize=n,n(e,t)}function u(e,t){var n=e.next(),r=!1,c=A(e);if(n=="<"){if(e.match("!--",!0))return p(e,t,N);if(e.match("![CDATA",!1))return t.tokenize=S,"tag";if(e.match("?",!1))return p(e,t,D);var s=e.eat("/");e.eatSpace();for(var x="",a;a=e.eat(/[^\s\u00a0=<>\"\'\/?]/);)x+=a;return p(e,t,T(x,s))}else{if(n=="{")return l(t,{type:"codeblock"}),null;if(n=="}")return o(t),null;if(b(t))return n==">"?"tag":n=="/"&&e.eat(">")?(o(t),"tag"):"variable";if(/\d/.test(n))return e.match(/^\d*(?:\.\d*)?(?:E[+\-]?\d+)?/),"atom";if(n==="("&&e.eat(":"))return l(t,{type:"comment"}),p(e,t,w);if(!c&&(n==='"'||n==="'"))return p(e,t,v(n));if(n==="$")return p(e,t,I);if(n===":"&&e.eat("="))return"keyword";if(n==="(")return l(t,{type:"paren"}),null;if(n===")")return o(t),null;if(n==="[")return l(t,{type:"bracket"}),null;if(n==="]")return o(t),null;var i=d.propertyIsEnumerable(n)&&d[n];if(c&&n==='"')for(;e.next()!=='"';);if(c&&n==="'")for(;e.next()!=="'";);i||e.eatWhile(/[\w\$_-]/);var g=e.eat(":");!e.eat(":")&&g&&e.eatWhile(/[\w\$_-]/),e.match(/^[ \t]*\(/,!1)&&(r=!0);var f=e.current();return i=d.propertyIsEnumerable(f)&&d[f],r&&!i&&(i={type:"function_call",style:"def"}),E(t)?(o(t),"variable"):((f=="element"||f=="attribute"||i.type=="axis_specifier")&&l(t,{type:"xmlconstructor"}),i?i.style:"variable")}}function w(e,t){for(var n=!1,r=!1,c=0,s;s=e.next();){if(s==")"&&n)if(c>0)c--;else{o(t);break}else s==":"&&r&&c++;n=s==":",r=s=="("}return"comment"}function v(e,t){return function(n,r){var c;if(_(r)&&n.current()==e)return o(r),t&&(r.tokenize=t),"string";if(l(r,{type:"string",name:e,tokenize:v(e,t)}),n.match("{",!1)&&m(r))return r.tokenize=u,"string";for(;c=n.next();)if(c==e){o(r),t&&(r.tokenize=t);break}else if(n.match("{",!1)&&m(r))return r.tokenize=u,"string";return"string"}}function I(e,t){var n=/[\w\$_-]/;if(e.eat('"')){for(;e.next()!=='"';);e.eat(":")}else e.eatWhile(n),e.match(":=",!1)||e.eat(":");return e.eatWhile(n),t.tokenize=u,"variable"}function T(e,t){return function(n,r){if(n.eatSpace(),t&&n.eat(">"))return o(r),r.tokenize=u,"tag";if(n.eat("/")||l(r,{type:"tag",name:e,tokenize:u}),n.eat(">"))r.tokenize=u;else return r.tokenize=h,"tag";return"tag"}}function h(e,t){var n=e.next();return n=="/"&&e.eat(">")?(m(t)&&o(t),b(t)&&o(t),"tag"):n==">"?(m(t)&&o(t),"tag"):n=="="?null:n=='"'||n=="'"?p(e,t,v(n,h)):(m(t)||l(t,{type:"attribute",tokenize:h}),e.eat(/[a-zA-Z_:]/),e.eatWhile(/[-a-zA-Z0-9_:.]/),e.eatSpace(),(e.match(">",!1)||e.match("/",!1))&&(o(t),t.tokenize=u),"attribute")}function N(e,t){for(var n;n=e.next();)if(n=="-"&&e.match("->",!0))return t.tokenize=u,"comment"}function S(e,t){for(var n;n=e.next();)if(n=="]"&&e.match("]",!0))return t.tokenize=u,"comment"}function D(e,t){for(var n;n=e.next();)if(n=="?"&&e.match(">",!0))return t.tokenize=u,"processingInstruction"}function b(e){return y(e,"tag")}function m(e){return y(e,"attribute")}function E(e){return y(e,"xmlconstructor")}function _(e){return y(e,"string")}function A(e){return e.current()==='"'?e.match(/^[^\"]+\"\:/,!1):e.current()==="'"?e.match(/^[^\"]+\'\:/,!1):!1}function y(e,t){return e.stack.length&&e.stack[e.stack.length-1].type==t}function l(e,t){e.stack.push(t)}function o(e){e.stack.pop();var t=e.stack.length&&e.stack[e.stack.length-1].tokenize;e.tokenize=t||u}const q={name:"xquery",startState:function(){return{tokenize:u,cc:[],stack:[]}},token:function(e,t){if(e.eatSpace())return null;var n=t.tokenize(e,t);return n},languageData:{commentTokens:{block:{open:"(:",close:":)"}}}};export{q as xQuery};