function o(e){for(var r={},t=0,n=e.length;t<n;++t)r[e[t]]=!0;return r}var u=o(["note","across","when","variant","until","unique","undefine","then","strip","select","retry","rescue","require","rename","reference","redefine","prefix","once","old","obsolete","loop","local","like","is","inspect","infix","include","if","frozen","from","external","export","ensure","end","elseif","else","do","creation","create","check","alias","agent","separate","invariant","inherit","indexing","feature","expanded","deferred","class","Void","True","Result","Precursor","False","Current","create","attached","detachable","as","and","implies","not","or"]),s=o([":=","and then","and","or","<<",">>"]);function c(e,r,t){return t.tokenize.push(e),e(r,t)}function f(e,r){if(e.eatSpace())return null;var t=e.next();return t=='"'||t=="'"?c(p(t,"string"),e,r):t=="-"&&e.eat("-")?(e.skipToEnd(),"comment"):t==":"&&e.eat("=")?"operator":/[0-9]/.test(t)?(e.eatWhile(/[xXbBCc0-9\.]/),e.eat(/[\?\!]/),"variable"):/[a-zA-Z_0-9]/.test(t)?(e.eatWhile(/[a-zA-Z_0-9]/),e.eat(/[\?\!]/),"variable"):/[=+\-\/*^%<>~]/.test(t)?(e.eatWhile(/[=+\-\/*^%<>~]/),"operator"):null}function p(e,r,t){return function(n,l){for(var a=!1,i;(i=n.next())!=null;){if(i==e&&!a){l.tokenize.pop();break}a=!a&&i=="%"}return r}}const d={name:"eiffel",startState:function(){return{tokenize:[f]}},token:function(e,r){var t=r.tokenize[r.tokenize.length-1](e,r);if(t=="variable"){var n=e.current();t=u.propertyIsEnumerable(e.current())?"keyword":s.propertyIsEnumerable(e.current())?"operator":/^[A-Z][A-Z_0-9]*$/g.test(n)?"tag":/^0[bB][0-1]+$/g.test(n)||/^0[cC][0-7]+$/g.test(n)||/^0[xX][a-fA-F0-9]+$/g.test(n)||/^([0-9]+\.[0-9]*)|([0-9]*\.[0-9]+)$/g.test(n)||/^[0-9]+$/g.test(n)?"number":"variable"}return t},languageData:{commentTokens:{line:"--"}}};export{d as eiffel};
