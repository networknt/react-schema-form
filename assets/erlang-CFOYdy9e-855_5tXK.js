var x=["-type","-spec","-export_type","-opaque"],S=["after","begin","catch","case","cond","end","fun","if","let","of","query","receive","try","when"],z=/[\->,;]/,W=["->",";",","],U=["and","andalso","band","bnot","bor","bsl","bsr","bxor","div","not","or","orelse","rem","xor"],A=/[\+\-\*\/<>=\|:!]/,E=["=","+","-","*","/",">",">=","<","=<","=:=","==","=/=","/=","||","<-","!"],Z=/[<\(\[\{]/,d=["<<","(","[","{"],q=/[>\)\]\}]/,y=["}","]",")",">>"],T=["is_atom","is_binary","is_bitstring","is_boolean","is_float","is_function","is_integer","is_list","is_number","is_pid","is_port","is_record","is_reference","is_tuple","atom","binary","bitstring","boolean","function","integer","list","number","pid","port","record","reference","tuple"],D=["abs","adler32","adler32_combine","alive","apply","atom_to_binary","atom_to_list","binary_to_atom","binary_to_existing_atom","binary_to_list","binary_to_term","bit_size","bitstring_to_list","byte_size","check_process_code","contact_binary","crc32","crc32_combine","date","decode_packet","delete_module","disconnect_node","element","erase","exit","float","float_to_list","garbage_collect","get","get_keys","group_leader","halt","hd","integer_to_list","internal_bif","iolist_size","iolist_to_binary","is_alive","is_atom","is_binary","is_bitstring","is_boolean","is_float","is_function","is_integer","is_list","is_number","is_pid","is_port","is_process_alive","is_record","is_reference","is_tuple","length","link","list_to_atom","list_to_binary","list_to_bitstring","list_to_existing_atom","list_to_float","list_to_integer","list_to_pid","list_to_tuple","load_module","make_ref","module_loaded","monitor_node","node","node_link","node_unlink","nodes","notalive","now","open_port","pid_to_list","port_close","port_command","port_connect","port_control","pre_loaded","process_flag","process_info","processes","purge_module","put","register","registered","round","self","setelement","size","spawn","spawn_link","spawn_monitor","spawn_opt","split_binary","statistics","term_to_binary","time","throw","tl","trunc","tuple_size","tuple_to_list","unlink","unregister","whereis"],f=/[\w@Ø-ÞÀ-Öß-öø-ÿ]/,N=/[0-7]{1,3}|[bdefnrstv\\"']|\^[a-zA-Z]|x[0-9a-zA-Z]{2}|x{[0-9a-zA-Z]+}/;function O(t,r){if(r.in_string)return r.in_string=!k(t),i(r,t,"string");if(r.in_atom)return r.in_atom=!h(t),i(r,t,"atom");if(t.eatSpace())return i(r,t,"whitespace");if(!_(r)&&t.match(/-\s*[a-zß-öø-ÿ][\wØ-ÞÀ-Öß-öø-ÿ]*/))return o(t.current(),x)?i(r,t,"type"):i(r,t,"attribute");var n=t.next();if(n=="%")return t.skipToEnd(),i(r,t,"comment");if(n==":")return i(r,t,"colon");if(n=="?")return t.eatSpace(),t.eatWhile(f),i(r,t,"macro");if(n=="#")return t.eatSpace(),t.eatWhile(f),i(r,t,"record");if(n=="$")return t.next()=="\\"&&!t.match(N)?i(r,t,"error"):i(r,t,"number");if(n==".")return i(r,t,"dot");if(n=="'"){if(!(r.in_atom=!h(t))){if(t.match(/\s*\/\s*[0-9]/,!1))return t.match(/\s*\/\s*[0-9]/,!0),i(r,t,"fun");if(t.match(/\s*\(/,!1)||t.match(/\s*:/,!1))return i(r,t,"function")}return i(r,t,"atom")}if(n=='"')return r.in_string=!k(t),i(r,t,"string");if(/[A-Z_Ø-ÞÀ-Ö]/.test(n))return t.eatWhile(f),i(r,t,"variable");if(/[a-z_ß-öø-ÿ]/.test(n)){if(t.eatWhile(f),t.match(/\s*\/\s*[0-9]/,!1))return t.match(/\s*\/\s*[0-9]/,!0),i(r,t,"fun");var e=t.current();return o(e,S)?i(r,t,"keyword"):o(e,U)?i(r,t,"operator"):t.match(/\s*\(/,!1)?o(e,D)&&(_(r).token!=":"||_(r,2).token=="erlang")?i(r,t,"builtin"):o(e,T)?i(r,t,"guard"):i(r,t,"function"):$(t)==":"?e=="erlang"?i(r,t,"builtin"):i(r,t,"function"):o(e,["true","false"])?i(r,t,"boolean"):i(r,t,"atom")}var c=/[0-9]/,a=/[0-9a-zA-Z]/;return c.test(n)?(t.eatWhile(c),t.eat("#")?t.eatWhile(a)||t.backUp(1):t.eat(".")&&(t.eatWhile(c)?t.eat(/[eE]/)&&(t.eat(/[-+]/)?t.eatWhile(c)||t.backUp(2):t.eatWhile(c)||t.backUp(1)):t.backUp(1)),i(r,t,"number")):b(t,Z,d)?i(r,t,"open_paren"):b(t,q,y)?i(r,t,"close_paren"):g(t,z,W)?i(r,t,"separator"):g(t,A,E)?i(r,t,"operator"):i(r,t,null)}function b(t,r,n){if(t.current().length==1&&r.test(t.current())){for(t.backUp(1);r.test(t.peek());)if(t.next(),o(t.current(),n))return!0;t.backUp(t.current().length-1)}return!1}function g(t,r,n){if(t.current().length==1&&r.test(t.current())){for(;r.test(t.peek());)t.next();for(;0<t.current().length;){if(o(t.current(),n))return!0;t.backUp(1)}t.next()}return!1}function k(t){return v(t,'"',"\\")}function h(t){return v(t,"'","\\")}function v(t,r,n){for(;!t.eol();){var e=t.next();if(e==r)return!0;e==n&&t.next()}return!1}function $(t){var r=t.match(/^\s*([^\s%])/,!1);return r?r[1]:""}function o(t,r){return-1<r.indexOf(t)}function i(t,r,n){switch(C(t,j(n,r)),n){case"atom":return"atom";case"attribute":return"attribute";case"boolean":return"atom";case"builtin":return"builtin";case"close_paren":return null;case"colon":return null;case"comment":return"comment";case"dot":return null;case"error":return"error";case"fun":return"meta";case"function":return"tag";case"guard":return"property";case"keyword":return"keyword";case"macro":return"macroName";case"number":return"number";case"open_paren":return null;case"operator":return"operator";case"record":return"bracket";case"separator":return null;case"string":return"string";case"type":return"def";case"variable":return"variable";default:return null}}function w(t,r,n,e){return{token:t,column:r,indent:n,type:e}}function j(t,r){return w(r.current(),r.column(),r.indentation(),t)}function B(t){return w(t,0,0,t)}function _(t,r){var n=t.tokenStack.length,e=r||1;return n<e?!1:t.tokenStack[n-e]}function C(t,r){r.type=="comment"||r.type=="whitespace"||(t.tokenStack=F(t.tokenStack,r),t.tokenStack=G(t.tokenStack))}function F(t,r){var n=t.length-1;return 0<n&&t[n].type==="record"&&r.type==="dot"?t.pop():(0<n&&t[n].type==="group"&&t.pop(),t.push(r)),t}function G(t){if(!t.length)return t;var r=t.length-1;if(t[r].type==="dot")return[];if(r>1&&t[r].type==="fun"&&t[r-1].token==="fun")return t.slice(0,r-1);switch(t[r].token){case"}":return s(t,{g:["{"]});case"]":return s(t,{i:["["]});case")":return s(t,{i:["("]});case">>":return s(t,{i:["<<"]});case"end":return s(t,{i:["begin","case","fun","if","receive","try"]});case",":return s(t,{e:["begin","try","when","->",",","(","[","{","<<"]});case"->":return s(t,{r:["when"],m:["try","if","case","receive"]});case";":return s(t,{E:["case","fun","if","receive","try","when"]});case"catch":return s(t,{e:["try"]});case"of":return s(t,{e:["case"]});case"after":return s(t,{e:["receive","try"]});default:return t}}function s(t,r){for(var n in r)for(var e=t.length-1,c=r[n],a=e-1;-1<a;a--)if(o(t[a].token,c)){var u=t.slice(0,a);switch(n){case"m":return u.concat(t[a]).concat(t[e]);case"r":return u.concat(t[e]);case"i":return u;case"g":return u.concat(B("group"));case"E":return u.concat(t[a]);case"e":return u.concat(t[a])}}return n=="E"?[]:t}function H(t,r,n){var e,c=I(r),a=_(t,1),u=_(t,2);return t.in_string||t.in_atom?null:u?a.token=="when"?a.column+n.unit:c==="when"&&u.type==="function"?u.indent+n.unit:c==="("&&a.token==="fun"?a.column+3:c==="catch"&&(e=m(t,["try"]))?e.column:o(c,["end","after","of"])?(e=m(t,["begin","case","fun","if","receive","try"]),e?e.column:null):o(c,y)?(e=m(t,d),e?e.column:null):o(a.token,[",","|","||"])||o(c,[",","|","||"])?(e=P(t),e?e.column+e.token.length:n.unit):a.token=="->"?o(u.token,["receive","case","if","try"])?u.column+n.unit+n.unit:u.column+n.unit:o(a.token,d)?a.column+a.token.length:(e=Q(t),l(e)?e.column+n.unit:0):0}function I(t){var r=t.match(/,|[a-z]+|\}|\]|\)|>>|\|+|\(/);return l(r)&&r.index===0?r[0]:""}function P(t){var r=t.tokenStack.slice(0,-1),n=p(r,"type",["open_paren"]);return l(r[n])?r[n]:!1}function Q(t){var r=t.tokenStack,n=p(r,"type",["open_paren","separator","keyword"]),e=p(r,"type",["operator"]);return l(n)&&l(e)&&n<e?r[n+1]:l(n)?r[n]:!1}function m(t,r){var n=t.tokenStack,e=p(n,"token",r);return l(n[e])?n[e]:!1}function p(t,r,n){for(var e=t.length-1;-1<e;e--)if(o(t[e][r],n))return e;return!1}function l(t){return t!==!1&&t!=null}const R={name:"erlang",startState(){return{tokenStack:[],in_string:!1,in_atom:!1}},token:O,indent:H,languageData:{commentTokens:{line:"%"}}};export{R as erlang};
