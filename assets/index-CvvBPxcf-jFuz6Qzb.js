import{a as E,i as u,z as q,$ as P,k as W,S as U,O as L,K as T,H as B,y as j,T as S,e as F}from"./index-Bm_ungOR.js";const i=63,v=64,H=1,N=2,Z=3,A=4,y=5,I=6,M=7,z=65,K=66,J=8,OO=9,eO=10,nO=11,tO=12,V=13,aO=19,PO=20,QO=29,oO=33,rO=34,sO=47,cO=0,$=1,k=2,l=3,x=4;class s{constructor(e,n,t){this.parent=e,this.depth=n,this.type=t,this.hash=(e?e.hash+e.hash<<8:0)+n+(n<<4)+t}}s.top=new s(null,-1,cO);function X(O,e){for(let n=0,t=e-O.pos-1;;t--,n++){let Q=O.peek(t);if(o(Q)||Q==-1)return n}}function b(O){return O==32||O==9}function o(O){return O==10||O==13}function G(O){return b(O)||o(O)}function c(O){return O<0||G(O)}const iO=new E({start:s.top,reduce(O,e){return O.type==l&&(e==PO||e==rO)?O.parent:O},shift(O,e,n,t){if(e==Z)return new s(O,X(t,t.pos),$);if(e==z||e==y)return new s(O,X(t,t.pos),k);if(e==i)return O.parent;if(e==aO||e==oO)return new s(O,0,l);if(e==V&&O.type==x)return O.parent;if(e==sO){let Q=/[1-9]/.exec(t.read(t.pos,n.pos));if(Q)return new s(O,O.depth+ +Q[0],x)}return O},hash(O){return O.hash}});function p(O,e,n=0){return O.peek(n)==e&&O.peek(n+1)==e&&O.peek(n+2)==e&&c(O.peek(n+3))}const pO=new u((O,e)=>{if(O.next==-1&&e.canShift(v))return O.acceptToken(v);let n=O.peek(-1);if((o(n)||n<0)&&e.context.type!=l){if(p(O,45))if(e.canShift(i))O.acceptToken(i);else return O.acceptToken(H,3);if(p(O,46))if(e.canShift(i))O.acceptToken(i);else return O.acceptToken(N,3);let t=0;for(;O.next==32;)t++,O.advance();(t<e.context.depth||t==e.context.depth&&e.context.type==$&&(O.next!=45||!c(O.peek(1))))&&O.next!=-1&&!o(O.next)&&O.next!=35&&O.acceptToken(i,-t)}},{contextual:!0}),XO=new u((O,e)=>{if(e.context.type==l){O.next==63&&(O.advance(),c(O.next)&&O.acceptToken(M));return}if(O.next==45)O.advance(),c(O.next)&&O.acceptToken(e.context.type==$&&e.context.depth==X(O,O.pos-1)?A:Z);else if(O.next==63)O.advance(),c(O.next)&&O.acceptToken(e.context.type==k&&e.context.depth==X(O,O.pos-1)?I:y);else{let n=O.pos;for(;;)if(b(O.next)){if(O.pos==n)return;O.advance()}else if(O.next==33)C(O);else if(O.next==38)m(O);else if(O.next==42){m(O);break}else if(O.next==39||O.next==34){if(g(O,!0))break;return}else if(O.next==91||O.next==123){if(!fO(O))return;break}else{_(O,!0,!1,0);break}for(;b(O.next);)O.advance();if(O.next==58){if(O.pos==n&&e.canShift(QO))return;let t=O.peek(1);c(t)&&O.acceptTokenTo(e.context.type==k&&e.context.depth==X(O,n)?K:z,n)}}},{contextual:!0});function lO(O){return O>32&&O<127&&O!=34&&O!=37&&O!=44&&O!=60&&O!=62&&O!=92&&O!=94&&O!=96&&O!=123&&O!=124&&O!=125}function D(O){return O>=48&&O<=57||O>=97&&O<=102||O>=65&&O<=70}function Y(O,e){return O.next==37?(O.advance(),D(O.next)&&O.advance(),D(O.next)&&O.advance(),!0):lO(O.next)||e&&O.next==44?(O.advance(),!0):!1}function C(O){if(O.advance(),O.next==60){for(O.advance();;)if(!Y(O,!0)){O.next==62&&O.advance();break}}else for(;Y(O,!1););}function m(O){for(O.advance();!c(O.next)&&R(O.tag)!="f";)O.advance()}function g(O,e){let n=O.next,t=!1,Q=O.pos;for(O.advance();;){let a=O.next;if(a<0)break;if(O.advance(),a==n)if(a==39)if(O.next==39)O.advance();else break;else break;else if(a==92&&n==34)O.next>=0&&O.advance();else if(o(a)){if(e)return!1;t=!0}else if(e&&O.pos>=Q+1024)return!1}return!t}function fO(O){for(let e=[],n=O.pos+1024;;)if(O.next==91||O.next==123)e.push(O.next),O.advance();else if(O.next==39||O.next==34){if(!g(O,!0))return!1}else if(O.next==93||O.next==125){if(e[e.length-1]!=O.next-2)return!1;if(e.pop(),O.advance(),!e.length)return!0}else{if(O.next<0||O.pos>n||o(O.next))return!1;O.advance()}}const RO="iiisiiissisfissssssssssssisssiiissssssssssssssssssssssssssfsfssissssssssssssssssssssssssssfif";function R(O){return O<33?"u":O>125?"s":RO[O-33]}function d(O,e){let n=R(O);return n!="u"&&!(e&&n=="f")}function _(O,e,n,t){if(R(O.next)=="s"||(O.next==63||O.next==58||O.next==45)&&d(O.peek(1),n))O.advance();else return!1;let Q=O.pos;for(;;){let a=O.next,r=0,f=t+1;for(;G(a);){if(o(a)){if(e)return!1;f=0}else f++;a=O.peek(++r)}if(!(a>=0&&(a==58?d(O.peek(r+1),n):a==35?O.peek(r-1)!=32:d(a,n)))||!n&&f<=t||f==0&&!n&&(p(O,45,r)||p(O,46,r)))break;if(e&&R(a)=="f")return!1;for(let h=r;h>=0;h--)O.advance();if(e&&O.pos>Q+1024)return!1}return!0}const uO=new u((O,e)=>{if(O.next==33)C(O),O.acceptToken(tO);else if(O.next==38||O.next==42){let n=O.next==38?eO:nO;m(O),O.acceptToken(n)}else O.next==39||O.next==34?(g(O,!1),O.acceptToken(OO)):_(O,!1,e.context.type==l,e.context.depth)&&O.acceptToken(J)}),dO=new u((O,e)=>{let n=e.context.type==x?e.context.depth:-1,t=O.pos;O:for(;;){let Q=0,a=O.next;for(;a==32;)a=O.peek(++Q);if(!Q&&(p(O,45,Q)||p(O,46,Q))||!o(a)&&(n<0&&(n=Math.max(e.context.depth+1,Q)),Q<n))break;for(;;){if(O.next<0)break O;let r=o(O.next);if(O.advance(),r)continue O;t=O.pos}}O.acceptTokenTo(V,t)}),SO=q({DirectiveName:P.keyword,DirectiveContent:P.attributeValue,"DirectiveEnd DocEnd":P.meta,QuotedLiteral:P.string,BlockLiteralHeader:P.special(P.string),BlockLiteralContent:P.content,Literal:P.content,"Key/Literal Key/QuotedLiteral":P.definition(P.propertyName),"Anchor Alias":P.labelName,Tag:P.typeName,Comment:P.lineComment,": , -":P.separator,"?":P.punctuation,"[ ]":P.squareBracket,"{ }":P.brace}),kO=W.deserialize({version:14,states:"5lQ!ZQgOOO#PQfO'#CpO#uQfO'#DOOOQR'#Dv'#DvO$qQgO'#DRO%gQdO'#DUO%nQgO'#DUO&ROaO'#D[OOQR'#Du'#DuO&{QgO'#D^O'rQgO'#D`OOQR'#Dt'#DtO(iOqO'#DbOOQP'#Dj'#DjO(zQaO'#CmO)YQgO'#CmOOQP'#Cm'#CmQ)jQaOOQ)uQgOOQ]QgOOO*PQdO'#CrO*nQdO'#CtOOQO'#Dw'#DwO+]Q`O'#CxO+hQdO'#CwO+rQ`O'#CwOOQO'#Cv'#CvO+wQdO'#CvOOQO'#Cq'#CqO,UQ`O,59[O,^QfO,59[OOQR,59[,59[OOQO'#Cx'#CxO,eQ`O'#DPO,pQdO'#DPOOQO'#Dx'#DxO,zQdO'#DxO-XQ`O,59jO-aQfO,59jOOQR,59j,59jOOQR'#DS'#DSO-hQcO,59mO-sQgO'#DVO.TQ`O'#DVO.YQcO,59pOOQR'#DX'#DXO#|QfO'#DWO.hQcO'#DWOOQR,59v,59vO.yOWO,59vO/OOaO,59vO/WOaO,59vO/cQgO'#D_OOQR,59x,59xO0VQgO'#DaOOQR,59z,59zOOQP,59|,59|O0yOaO,59|O1ROaO,59|O1aOqO,59|OOQP-E7h-E7hO1oQgO,59XOOQP,59X,59XO2PQaO'#DeO2_QgO'#DeO2oQgO'#DkOOQP'#Dk'#DkQ)jQaOOO3PQdO'#CsOOQO,59^,59^O3kQdO'#CuOOQO,59`,59`OOQO,59c,59cO4VQdO,59cO4aQdO'#CzO4kQ`O'#CzOOQO,59b,59bOOQU,5:Q,5:QOOQR1G.v1G.vO4pQ`O1G.vOOQU-E7d-E7dO4xQdO,59kOOQO,59k,59kO5SQdO'#DQO5^Q`O'#DQOOQO,5:d,5:dOOQU,5:R,5:ROOQR1G/U1G/UO5cQ`O1G/UOOQU-E7e-E7eO5kQgO'#DhO5xQcO1G/XOOQR1G/X1G/XOOQR,59q,59qO6TQgO,59qO6eQdO'#DiO6lQgO'#DiO7PQcO1G/[OOQR1G/[1G/[OOQR,59r,59rO#|QfO,59rOOQR1G/b1G/bO7_OWO1G/bO7dOaO1G/bOOQR,59y,59yOOQR,59{,59{OOQP1G/h1G/hO7lOaO1G/hO7tOaO1G/hO8POaO1G/hOOQP1G.s1G.sO8_QgO,5:POOQP,5:P,5:POOQP,5:V,5:VOOQP-E7i-E7iOOQO,59_,59_OOQO,59a,59aOOQO1G.}1G.}OOQO,59f,59fO8oQdO,59fOOQR7+$b7+$bP,XQ`O'#DfOOQO1G/V1G/VOOQO,59l,59lO8yQdO,59lOOQR7+$p7+$pP9TQ`O'#DgOOQR'#DT'#DTOOQR,5:S,5:SOOQR-E7f-E7fOOQR7+$s7+$sOOQR1G/]1G/]O9YQgO'#DYO9jQ`O'#DYOOQR,5:T,5:TO#|QfO'#DZO9oQcO'#DZOOQR-E7g-E7gOOQR7+$v7+$vOOQR1G/^1G/^OOQR7+$|7+$|O:QOWO7+$|OOQP7+%S7+%SO:VOaO7+%SO:_OaO7+%SOOQP1G/k1G/kOOQO1G/Q1G/QOOQO1G/W1G/WOOQR,59t,59tO:jQgO,59tOOQR,59u,59uO#|QfO,59uOOQR<<Hh<<HhOOQP<<Hn<<HnO:zOaO<<HnOOQR1G/`1G/`OOQR1G/a1G/aOOQPAN>YAN>Y",stateData:";S~O!fOS!gOS^OS~OP_OQbORSOTUOWROXROYYOZZO[XOcPOqQO!PVO!V[O!cTO~O`cO~P]OVkOWROXROYeOZfO[dOcPOmhOqQO~OboO~P!bOVtOWROXROYeOZfO[dOcPOmrOqQO~OpwO~P#WORSOTUOWROXROYYOZZO[XOcPOqQO!PVO!cTO~OSvP!avP!bvP~P#|OWROXROYeOZfO[dOcPOqQO~OmzO~P%OOm!OOUzP!azP!bzP!dzP~P#|O^!SO!b!QO!f!TO!g!RO~ORSOTUOWROXROcPOqQO!PVO!cTO~OY!UOP!QXQ!QX!V!QX!`!QXS!QX!a!QX!b!QXU!QXm!QX!d!QX~P&aO[!WOP!SXQ!SX!V!SX!`!SXS!SX!a!SX!b!SXU!SXm!SX!d!SX~P&aO^!ZO!W![O!b!YO!f!]O!g!YO~OP!_O!V[OQaX!`aX~OPaXQaX!VaX!`aX~P#|OP!bOQ!cO!V[O~OP_O!V[O~P#|OWROXROY!fOcPOqQObfXmfXofXpfX~OWROXRO[!hOcPOqQObhXmhXohXphX~ObeXmlXoeX~ObkXokX~P%OOm!kO~Om!lObnPonP~P%OOb!pOo!oO~Ob!pO~P!bOm!sOosXpsX~OosXpsX~P%OOm!uOotPptP~P%OOo!xOp!yO~Op!yO~P#WOS!|O!a#OO!b#OO~OUyX!ayX!byX!dyX~P#|Om#QO~OU#SO!a#UO!b#UO!d#RO~Om#WOUzX!azX!bzX!dzX~O]#XO~O!b#XO!g#YO~O^#ZO!b#XO!g#YO~OP!RXQ!RX!V!RX!`!RXS!RX!a!RX!b!RXU!RXm!RX!d!RX~P&aOP!TXQ!TX!V!TX!`!TXS!TX!a!TX!b!TXU!TXm!TX!d!TX~P&aO!b#^O!g#^O~O^#_O!b#^O!f#`O!g#^O~O^#_O!W#aO!b#^O!g#^O~OPaaQaa!Vaa!`aa~P#|OP#cO!V[OQ!XX!`!XX~OP!XXQ!XX!V!XX!`!XX~P#|OP_O!V[OQ!_X!`!_X~P#|OWROXROcPOqQObgXmgXogXpgX~OWROXROcPOqQObiXmiXoiXpiX~Obkaoka~P%OObnXonX~P%OOm#kO~Ob#lOo!oO~Oosapsa~P%OOotXptX~P%OOm#pO~Oo!xOp#qO~OSwP!awP!bwP~P#|OS!|O!a#vO!b#vO~OUya!aya!bya!dya~P#|Om#xO~P%OOm#{OU}P!a}P!b}P!d}P~P#|OU#SO!a$OO!b$OO!d#RO~O]$QO~O!b$QO!g$RO~O!b$SO!g$SO~O^$TO!b$SO!g$SO~O^$TO!b$SO!f$UO!g$SO~OP!XaQ!Xa!V!Xa!`!Xa~P#|Obnaona~P%OOotapta~P%OOo!xO~OU|X!a|X!b|X!d|X~P#|Om$ZO~Om$]OU}X!a}X!b}X!d}X~O]$^O~O!b$_O!g$_O~O^$`O!b$_O!g$_O~OU|a!a|a!b|a!d|a~P#|O!b$cO!g$cO~O",goto:",]!mPPPPPPPPPPPPPPPPP!nPP!v#v#|$`#|$c$f$j$nP%VPPP!v%Y%^%a%{&O%a&R&U&X&_&b%aP&e&{&e'O'RPP']'a'g'm's'y(XPPPPPPPP(_)e*X+c,VUaObcR#e!c!{ROPQSTUXY_bcdehknrtvz!O!U!W!_!b!c!f!h!k!l!s!u!|#Q#R#S#W#c#k#p#x#{$Z$]QmPR!qnqfPQThknrtv!k!l!s!u#R#k#pR!gdR!ieTlPnTjPnSiPnSqQvQ{TQ!mkQ!trQ!vtR#y#RR!nkTsQvR!wt!RWOSUXY_bcz!O!U!W!_!b!c!|#Q#S#W#c#x#{$Z$]RySR#t!|R|TR|UQ!PUR#|#SR#z#RR#z#SyZOSU_bcz!O!_!b!c!|#Q#S#W#c#x#{$Z$]R!VXR!XYa]O^abc!a!c!eT!da!eQnPR!rnQvQR!{vQ!}yR#u!}Q#T|R#}#TW^Obc!cS!^^!aT!aa!eQ!eaR#f!eW`Obc!cQxSS}U#SQ!`_Q#PzQ#V!OQ#b!_Q#d!bQ#s!|Q#w#QQ$P#WQ$V#cQ$Y#xQ$[#{Q$a$ZR$b$]xZOSU_bcz!O!_!b!c!|#Q#S#W#c#x#{$Z$]Q!VXQ!XYQ#[!UR#]!W!QWOSUXY_bcz!O!U!W!_!b!c!|#Q#S#W#c#x#{$Z$]pfPQThknrtv!k!l!s!u#R#k#pQ!gdQ!ieQ#g!fR#h!hSgPn^pQTkrtv#RQ!jhQ#i!kQ#j!lQ#n!sQ#o!uQ$W#kR$X#pQuQR!zv",nodeNames:"⚠ DirectiveEnd DocEnd - - ? ? ? Literal QuotedLiteral Anchor Alias Tag BlockLiteralContent Comment Stream BOM Document ] [ FlowSequence Item Tagged Anchored Anchored Tagged FlowMapping Pair Key : Pair , } { FlowMapping Pair Pair BlockSequence Item Item BlockMapping Pair Pair Key Pair Pair BlockLiteral BlockLiteralHeader Tagged Anchored Anchored Tagged Directive DirectiveName DirectiveContent Document",maxTerm:74,context:iO,nodeProps:[["isolate",-3,8,9,14,""],["openedBy",18,"[",32,"{"],["closedBy",19,"]",33,"}"]],propSources:[SO],skippedNodes:[0],repeatNodeCount:6,tokenData:"-Y~RnOX#PXY$QYZ$]Z]#P]^$]^p#Ppq$Qqs#Pst$btu#Puv$yv|#P|}&e}![#P![!]'O!]!`#P!`!a'i!a!}#P!}#O*g#O#P#P#P#Q+Q#Q#o#P#o#p+k#p#q'i#q#r,U#r;'S#P;'S;=`#z<%l?HT#P?HT?HU,o?HUO#PQ#UU!WQOY#PZp#Ppq#hq;'S#P;'S;=`#z<%lO#PQ#kTOY#PZs#Pt;'S#P;'S;=`#z<%lO#PQ#}P;=`<%l#P~$VQ!f~XY$Qpq$Q~$bO!g~~$gS^~OY$bZ;'S$b;'S;=`$s<%lO$b~$vP;=`<%l$bR%OX!WQOX%kXY#PZ]%k]^#P^p%kpq#hq;'S%k;'S;=`&_<%lO%kR%rX!WQ!VPOX%kXY#PZ]%k]^#P^p%kpq#hq;'S%k;'S;=`&_<%lO%kR&bP;=`<%l%kR&lUoP!WQOY#PZp#Ppq#hq;'S#P;'S;=`#z<%lO#PR'VUmP!WQOY#PZp#Ppq#hq;'S#P;'S;=`#z<%lO#PR'p[!PP!WQOY#PZp#Ppq#hq{#P{|(f|}#P}!O(f!O!R#P!R![)p![;'S#P;'S;=`#z<%lO#PR(mW!PP!WQOY#PZp#Ppq#hq!R#P!R![)V![;'S#P;'S;=`#z<%lO#PR)^U!PP!WQOY#PZp#Ppq#hq;'S#P;'S;=`#z<%lO#PR)wY!PP!WQOY#PZp#Ppq#hq{#P{|)V|}#P}!O)V!O;'S#P;'S;=`#z<%lO#PR*nUcP!WQOY#PZp#Ppq#hq;'S#P;'S;=`#z<%lO#PR+XUbP!WQOY#PZp#Ppq#hq;'S#P;'S;=`#z<%lO#PR+rUqP!WQOY#PZp#Ppq#hq;'S#P;'S;=`#z<%lO#PR,]UpP!WQOY#PZp#Ppq#hq;'S#P;'S;=`#z<%lO#PR,vU`P!WQOY#PZp#Ppq#hq;'S#P;'S;=`#z<%lO#P",tokenizers:[pO,XO,uO,dO,0,1],topRules:{Stream:[0,15]},tokenPrec:0}),xO=W.deserialize({version:14,states:"!vOQOPOOO]OPO'#C_OhOPO'#C^OOOO'#Cc'#CcOpOPO'#CaQOOOOOO{OPOOOOOO'#Cb'#CbO!WOPO'#C`O!`OPO,58xOOOO-E6a-E6aOOOO-E6`-E6`OOOO'#C_'#C_OOOO1G.d1G.d",stateData:"!h~OXPOYROWTP~OWVXXRXYRX~OYVOXSP~OXROYROWTX~OXROYROWTP~OYVOXSX~OX[O~OXY~",goto:"vWPPX[beioRUOQQOR]XRXQTTOUQWQRZWSSOURYS",nodeNames:"⚠ Document Frontmatter DashLine FrontmatterContent Body",maxTerm:10,skippedNodes:[0],repeatNodeCount:2,tokenData:"$z~RXOYnYZ!^Z]n]^!^^}n}!O!i!O;'Sn;'S;=`!c<%lOn~qXOYnYZ!^Z]n]^!^^;'Sn;'S;=`!c<%l~n~On~~!^~!cOY~~!fP;=`<%ln~!lZOYnYZ!^Z]n]^!^^}n}!O#_!O;'Sn;'S;=`!c<%l~n~On~~!^~#bZOYnYZ!^Z]n]^!^^}n}!O$T!O;'Sn;'S;=`!c<%l~n~On~~!^~$WXOYnYZ$sZ]n]^$s^;'Sn;'S;=`!c<%l~n~On~~$s~$zOX~Y~",tokenizers:[0],topRules:{Document:[0,1]},tokenPrec:67}),w=U.define({name:"yaml",parser:kO.configure({props:[L.add({Stream:O=>{for(let e=O.node.resolve(O.pos,-1);e&&e.to>=O.pos;e=e.parent){if(e.name=="BlockLiteralContent"&&e.from<e.to)return O.baseIndentFor(e);if(e.name=="BlockLiteral")return O.baseIndentFor(e)+O.unit;if(e.name=="BlockSequence"||e.name=="BlockMapping")return O.column(e.from,1);if(e.name=="QuotedLiteral")return null;if(e.name=="Literal"){let n=O.column(e.from,1);if(n==O.lineIndent(e.from,1))return n;if(e.to>O.pos)return null}}return null},FlowMapping:T({closing:"}"}),FlowSequence:T({closing:"]"})}),B.add({"FlowMapping FlowSequence":j,"BlockSequence Pair BlockLiteral":(O,e)=>({from:e.doc.lineAt(O.from).to,to:O.to})})]}),languageData:{commentTokens:{line:"#"},indentOnInput:/^\s*[\]\}]$/}});function $O(){return new S(w)}const bO=U.define({name:"yaml-frontmatter",parser:xO.configure({props:[q({DashLine:P.meta})]})});function gO(O){let{language:e,support:n}=O.content instanceof S?O.content:{language:O.content,support:[]};return new S(bO.configure({wrap:F(t=>t.name=="FrontmatterContent"?{parser:w.parser}:t.name=="Body"?{parser:e.parser}:null)}),n)}export{$O as yaml,gO as yamlFrontmatter,w as yamlLanguage};
