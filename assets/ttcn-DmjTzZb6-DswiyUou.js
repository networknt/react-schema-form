function o(t){for(var e={},n=t.split(" "),r=0;r<n.length;++r)e[n[r]]=!0;return e}const i={name:"ttcn",keywords:o("activate address alive all alt altstep and and4b any break case component const continue control deactivate display do else encode enumerated except exception execute extends extension external for from function goto group if import in infinity inout interleave label language length log match message mixed mod modifies module modulepar mtc noblock not not4b nowait of on optional or or4b out override param pattern port procedure record recursive rem repeat return runs select self sender set signature system template testcase to type union value valueof var variant while with xor xor4b"),builtin:o("bit2hex bit2int bit2oct bit2str char2int char2oct encvalue decomp decvalue float2int float2str hex2bit hex2int hex2oct hex2str int2bit int2char int2float int2hex int2oct int2str int2unichar isbound ischosen ispresent isvalue lengthof log2str oct2bit oct2char oct2hex oct2int oct2str regexp replace rnd sizeof str2bit str2float str2hex str2int str2oct substr unichar2int unichar2char enum2int"),types:o("anytype bitstring boolean char charstring default float hexstring integer objid octetstring universal verdicttype timer"),timerOps:o("read running start stop timeout"),portOps:o("call catch check clear getcall getreply halt raise receive reply send trigger"),configOps:o("create connect disconnect done kill killed map unmap"),verdictOps:o("getverdict setverdict"),sutOps:o("action"),functionOps:o("apply derefers refers"),verdictConsts:o("error fail inconc none pass"),booleanConsts:o("true false"),otherConsts:o("null NULL omit"),visibilityModifiers:o("private public friend"),templateMatch:o("complement ifpresent subset superset permutation"),multiLineStrings:!0};var b=[];function u(t){if(t)for(var e in t)t.hasOwnProperty(e)&&b.push(e)}u(i.keywords);u(i.builtin);u(i.timerOps);u(i.portOps);var y=i.keywords||{},v=i.builtin||{},g=i.timerOps||{},x=i.portOps||{},k=i.configOps||{},O=i.verdictOps||{},E=i.sutOps||{},w=i.functionOps||{},I=i.verdictConsts||{},z=i.booleanConsts||{},L=i.otherConsts||{},C=i.types||{},S=i.visibilityModifiers||{},M=i.templateMatch||{},W=i.multiLineStrings,T=i.indentStatements!==!1,f=/[+\-*&@=<>!\/]/,a;function N(t,e){var n=t.next();if(n=='"'||n=="'")return e.tokenize=$(n),e.tokenize(t,e);if(/[\[\]{}\(\),;\\:\?\.]/.test(n))return a=n,"punctuation";if(n=="#")return t.skipToEnd(),"atom";if(n=="%")return t.eatWhile(/\b/),"atom";if(/\d/.test(n))return t.eatWhile(/[\w\.]/),"number";if(n=="/"){if(t.eat("*"))return e.tokenize=d,d(t,e);if(t.eat("/"))return t.skipToEnd(),"comment"}if(f.test(n))return n=="@"&&(t.match("try")||t.match("catch")||t.match("lazy"))?"keyword":(t.eatWhile(f),"operator");t.eatWhile(/[\w\$_\xa1-\uffff]/);var r=t.current();return y.propertyIsEnumerable(r)?"keyword":v.propertyIsEnumerable(r)?"builtin":g.propertyIsEnumerable(r)||k.propertyIsEnumerable(r)||O.propertyIsEnumerable(r)||x.propertyIsEnumerable(r)||E.propertyIsEnumerable(r)||w.propertyIsEnumerable(r)?"def":I.propertyIsEnumerable(r)||z.propertyIsEnumerable(r)||L.propertyIsEnumerable(r)?"string":C.propertyIsEnumerable(r)?"typeName.standard":S.propertyIsEnumerable(r)?"modifier":M.propertyIsEnumerable(r)?"atom":"variable"}function $(t){return function(e,n){for(var r=!1,l,m=!1;(l=e.next())!=null;){if(l==t&&!r){var s=e.peek();s&&(s=s.toLowerCase(),(s=="b"||s=="h"||s=="o")&&e.next()),m=!0;break}r=!r&&l=="\\"}return(m||!(r||W))&&(n.tokenize=null),"string"}}function d(t,e){for(var n=!1,r;r=t.next();){if(r=="/"&&n){e.tokenize=null;break}n=r=="*"}return"comment"}function h(t,e,n,r,l){this.indented=t,this.column=e,this.type=n,this.align=r,this.prev=l}function p(t,e,n){var r=t.indented;return t.context&&t.context.type=="statement"&&(r=t.context.indented),t.context=new h(r,e,n,null,t.context)}function c(t){var e=t.context.type;return(e==")"||e=="]"||e=="}")&&(t.indented=t.context.indented),t.context=t.context.prev}const P={name:"ttcn",startState:function(){return{tokenize:null,context:new h(0,0,"top",!1),indented:0,startOfLine:!0}},token:function(t,e){var n=e.context;if(t.sol()&&(n.align==null&&(n.align=!1),e.indented=t.indentation(),e.startOfLine=!0),t.eatSpace())return null;a=null;var r=(e.tokenize||N)(t,e);if(r=="comment")return r;if(n.align==null&&(n.align=!0),(a==";"||a==":"||a==",")&&n.type=="statement")c(e);else if(a=="{")p(e,t.column(),"}");else if(a=="[")p(e,t.column(),"]");else if(a=="(")p(e,t.column(),")");else if(a=="}"){for(;n.type=="statement";)n=c(e);for(n.type=="}"&&(n=c(e));n.type=="statement";)n=c(e)}else a==n.type?c(e):T&&((n.type=="}"||n.type=="top")&&a!=";"||n.type=="statement"&&a=="newstatement")&&p(e,t.column(),"statement");return e.startOfLine=!1,r},languageData:{indentOnInput:/^\s*[{}]$/,commentTokens:{line:"//",block:{open:"/*",close:"*/"}},autocomplete:b}};export{P as ttcn};