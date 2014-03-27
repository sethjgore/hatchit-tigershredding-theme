!function(a,b){"function"==typeof define&&define.amd?define(["exports"],b):b("undefined"!=typeof exports?exports:a)}(this,function(a){function b(a){function b(){switch(l.tokenType){case"(":case"[":case"{":return c();case"FUNCTION":return k();default:return l}}function c(){for(var a={"(":")","[":"]","{":"}"}[l.tokenType],c=new h(l.tokenType);;)switch(r(),l.tokenType){case"EOF":case a:return c;default:c.append(b())}}function k(){for(var a=new i(l.value),c=new j;;)switch(r(),l.tokenType){case"EOF":case")":return a.append(c),a;case"DELIM":","==l.value?(a.append(c),c=new j):c.append(l);break;default:c.append(b())}}for(var l,m="top-level",n=-1,o=new d,p=[o],q=p[0],r=function(b){return void 0===b&&(b=1),n+=b,l=n<a.length?a[n]:new EOFToken,!0},s=function(){return n--,!0},t=function(){return a[n+1]},u=function(a){return void 0===a?""!==q.fillType?m=q.fillType:"STYLESHEET"==q.type?m="top-level":(console.log("Unknown rule-type while switching to current rule's content mode: ",q),m=""):m=a,!0},v=function(a){return q=a,p.push(q),!0},w=function(a){return console.log("Parse error at token "+n+": "+l+".\n"+a),!0},x=function(){var a=p.pop();return q=p[p.length-1],q.append(a),!0},y=function(){return p.pop(),q=p[p.length-1],!0},z=function(){for(;p.length>1;)x()};;)if(r(),"DELIM"!==l.tokenType||"\r"!==l.value)switch(m){case"top-level":switch(l.tokenType){case"CDO":case"CDC":case"WHITESPACE":break;case"AT-KEYWORD":v(new e(l.value))&&u("at-rule");break;case"{":w("Attempt to open a curly-block at top-level.")&&b();break;case"EOF":return z(),o;default:v(new f)&&u("selector")&&s()}break;case"at-rule":switch(l.tokenType){case";":x()&&u();break;case"{":""!==q.fillType?u(q.fillType):w("Attempt to open a curly-block in a statement-type at-rule.")&&y()&&u("next-block")&&s();break;case"EOF":return z(),o;default:q.appendPrelude(b())}break;case"rule":switch(l.tokenType){case"WHITESPACE":break;case"}":x()&&u();break;case"AT-KEYWORD":v(new e(l.value))&&u("at-rule");break;case"EOF":return z(),o;default:v(new f)&&u("selector")&&s()}break;case"selector":switch(l.tokenType){case"{":u("declaration");break;case"EOF":return y()&&z(),o;default:q.appendSelector(b())}break;case"declaration":switch(l.tokenType){case"WHITESPACE":case";":break;case"}":x()&&u();break;case"AT-RULE":v(new e(l.value))&&u("at-rule");break;case"IDENT":v(new g(l.value))&&u("after-declaration-name");break;case"EOF":return z(),o;default:w()&&y()&&u("next-declaration")}break;case"after-declaration-name":switch(l.tokenType){case"WHITESPACE":break;case":":u("declaration-value");break;case";":w("Incomplete declaration - semicolon after property name.")&&y()&&u();break;case"EOF":return y()&&z(),o;default:w("Invalid declaration - additional token after property name")&&y()&&u("next-declaration")}break;case"declaration-value":switch(l.tokenType){case"DELIM":"!"==l.value&&"IDENTIFIER"==t().tokenType&&"important"==t().value.toLowerCase()?(r(),q.important=!0,u("declaration-end")):q.append(l);break;case";":x()&&u();break;case"}":x()&&x()&&u();break;case"EOF":return z(),o;default:q.append(b())}break;case"declaration-end":switch(l.tokenType){case"WHITESPACE":break;case";":x()&&u();break;case"}":x()&&x()&&u();break;case"EOF":return z(),o;default:w("Invalid declaration - additional token after !important.")&&y()&&u("next-declaration")}break;case"next-block":switch(l.tokenType){case"{":b()&&u();break;case"EOF":return z(),o;default:b()}break;case"next-declaration":switch(l.tokenType){case";":u("declaration");break;case"}":u("declaration")&&s();break;case"EOF":return z(),o;default:b()}break;default:return void console.log("Unknown parsing mode: "+m)}}function c(){return this}function d(){return this.value=[],this}function e(a){return this.name=a,this.prelude=[],this.value=[],a in e.registry&&(this.fillType=e.registry[a]),this}function f(){return this.selector=[],this.value=[],this}function g(a){return this.name=a,this.value=[],this}function h(a){return this.name=a,this.value=[],this}function i(a){return this.name=a,this.value=[],this}function j(){return this.value=[],this}c.prototype.fillType="",c.prototype.toString=function(a){return JSON.stringify(this.toJSON(),null,a)},c.prototype.append=function(a){return this.value.push(a),this},d.prototype=new c,d.prototype.type="STYLESHEET",d.prototype.toJSON=function(){return{type:"stylesheet",value:this.value.map(function(a){return a.toJSON()})}},e.prototype=new c,e.prototype.type="AT-RULE",e.prototype.appendPrelude=function(a){return this.prelude.push(a),this},e.prototype.toJSON=function(){return{type:"at",name:this.name,prelude:this.prelude.map(function(a){return a.toJSON()}),value:this.value.map(function(a){return a.toJSON()})}},e.registry={"import":"",media:"rule","font-face":"declaration",page:"declaration",keyframes:"rule",namespace:"","counter-style":"declaration",supports:"rule",document:"rule","font-feature-values":"declaration",viewport:"","region-style":"rule"},f.prototype=new c,f.prototype.type="STYLE-RULE",f.prototype.fillType="declaration",f.prototype.appendSelector=function(a){return this.selector.push(a),this},f.prototype.toJSON=function(){return{type:"selector",selector:this.selector.map(function(a){return a.toJSON()}),value:this.value.map(function(a){return a.toJSON()})}},g.prototype=new c,g.prototype.type="DECLARATION",g.prototype.toJSON=function(){return{type:"declaration",name:this.name,value:this.value.map(function(a){return a.toJSON()})}},h.prototype=new c,h.prototype.type="BLOCK",h.prototype.toJSON=function(){return{type:"block",name:this.name,value:this.value.map(function(a){return a.toJSON()})}},i.prototype=new c,i.prototype.type="FUNCTION",i.prototype.toJSON=function(){return{type:"func",name:this.name,value:this.value.map(function(a){return a.toJSON()})}},j.prototype=new c,j.prototype.type="FUNCTION-ARG",j.prototype.toJSON=function(){return this.value.map(function(a){return a.toJSON()})},a.parse=b}),function(a,b){"function"==typeof define&&define.amd?define(["exports"],b):b("undefined"!=typeof exports?exports:a)}(this,function(a){function b(a){return Q(a,48,57)}function c(a){return b(a)||Q(a,65,70)||Q(a,97,102)}function d(a){return Q(a,65,90)}function e(a){return Q(a,97,122)}function f(a){return d(a)||e(a)}function g(a){return a>=160}function h(a){return f(a)||g(a)||95==a}function i(a){return h(a)||b(a)||45==a}function j(a){return Q(a,0,8)||Q(a,14,31)||Q(a,127,159)}function k(a){return 10==a||12==a}function l(a){return k(a)||9==a||32==a}function m(a){return k(a)||isNaN(a)}function n(a,d){void 0==d&&(d={transformFunctionWhitespace:!1,scientificNotation:!1});for(var e,f,g=-1,n=[],o="data",p=0,F=0,Q=0,S=function(){p+=1,Q=F,F=0},T={line:p,column:F},U=function(b){return void 0===b&&(b=1),a.charCodeAt(g+b)},V=function(b){return void 0===b&&(b=1),g+=b,e=a.charCodeAt(g),k(e)?S():F+=b,!0},W=function(){return g-=1,k(e)?(p-=1,F=Q):F-=1,T.line=p,T.column=F,!0},X=function(){return g>=a.length},Y=function(){},Z=function(a){return a?a.finish():a=f.finish(),d.loc===!0&&(a.loc={},a.loc.start={line:T.line,column:T.column},T={line:p,column:F},a.loc.end=T),n.push(a),f=void 0,!0},$=function(a){return f=a,!0},_=function(){return console.log("Parse error at index "+g+", processing codepoint 0x"+e.toString(16)+" in state "+o+"."),!0},ab=function(a){return console.log("MAJOR SPEC ERROR: "+a),!0},bb=function(a){return o=a,!0},cb=function(){if(V(),c(e)){for(var a=[],b=0;6>b&&c(e);b++)a.push(e),V();var d=parseInt(a.map(String.fromCharCode).join(""),16);return d>R&&(d=65533),l(e)||W(),d}return e};;){if(g>2*a.length)return"I'm infinite-looping!";switch(V(),o){case"data":if(l(e))for(Z(new s);l(U());)V();else if(34==e)bb("double-quote-string");else if(35==e)bb("hash");else if(39==e)bb("single-quote-string");else if(40==e)Z(new B);else if(41==e)Z(new C);else if(43==e)b(U())||46==U()&&b(U(2))?bb("number")&&W():Z(new E(e));else if(45==e)45==U(1)&&62==U(2)?V(2)&&Z(new u):b(U())||46==U(1)&&b(U(2))?bb("number")&&W():bb("ident")&&W();else if(46==e)b(U())?bb("number")&&W():Z(new E(e));else if(47==e)42==U()?V()&&bb("comment"):Z(new E(e));else if(58==e)Z(new v);else if(59==e)Z(new w);else if(60==e)33==U(1)&&45==U(2)&&45==U(3)?V(3)&&Z(new t):Z(new E(e));else if(64==e)bb("at-keyword");else if(91==e)Z(new z);else if(92==e)m(U())?_()&&Z(new E(e)):bb("ident")&&W();else if(93==e)Z(new A);else if(123==e)Z(new x);else if(125==e)Z(new y);else if(b(e))bb("number")&&W();else if(85==e||117==e)43==U(1)&&c(U(2))?V()&&bb("unicode-range"):bb("ident")&&W();else if(h(e))bb("ident")&&W();else{if(X())return Z(new D),n;Z(new E(e))}break;case"double-quote-string":void 0==f&&$(new K),34==e?Z()&&bb("data"):X()?_()&&Z()&&bb("data")&&W():k(e)?_()&&Z(new q)&&bb("data")&&W():92==e?m(U())?_()&&Z(new q)&&bb("data"):k(U())?V():f.append(cb()):f.append(e);break;case"single-quote-string":void 0==f&&$(new K),39==e?Z()&&bb("data"):X()?_()&&Z()&&bb("data"):k(e)?_()&&Z(new q)&&bb("data")&&W():92==e?m(U())?_()&&Z(new q)&&bb("data"):k(U())?V():f.append(cb()):f.append(e);break;case"hash":i(e)?$(new J(e))&&bb("hash-rest"):92==e?m(U())?_()&&Z(new E(35))&&bb("data")&&W():$(new J(cb()))&&bb("hash-rest"):Z(new E(35))&&bb("data")&&W();break;case"hash-rest":i(e)?f.append(e):92==e?m(U())?_()&&Z()&&bb("data")&&W():f.append(cb()):Z()&&bb("data")&&W();break;case"comment":42==e?47==U()?V()&&bb("data"):Y():X()?_()&&bb("data")&&W():Y();break;case"at-keyword":45==e?h(U())?$(new I(45))&&bb("at-keyword-rest"):92!=U(1)||m(U(2))?_()&&Z(new E(64))&&bb("data")&&W():$(new AtKeywordtoken(45))&&bb("at-keyword-rest"):h(e)?$(new I(e))&&bb("at-keyword-rest"):92==e?m(U())?_()&&Z(new E(35))&&bb("data")&&W():$(new I(cb()))&&bb("at-keyword-rest"):Z(new E(64))&&bb("data")&&W();break;case"at-keyword-rest":i(e)?f.append(e):92==e?m(U())?_()&&Z()&&bb("data")&&W():f.append(cb()):Z()&&bb("data")&&W();break;case"ident":45==e?h(U())?$(new G(e))&&bb("ident-rest"):92!=U(1)||m(U(2))?Z(new E(45))&&bb("data"):$(new G(e))&&bb("ident-rest"):h(e)?$(new G(e))&&bb("ident-rest"):92==e?m(U())?_()&&bb("data")&&W():$(new G(cb()))&&bb("ident-rest"):ab("Hit the generic 'else' clause in ident state.")&&bb("data")&&W();break;case"ident-rest":i(e)?f.append(e):92==e?m(U())?_()&&Z()&&bb("data")&&W():f.append(cb()):40==e?f.ASCIImatch("url")?bb("url"):Z(new H(f))&&bb("data"):l(e)&&d.transformFunctionWhitespace?bb("transform-function-whitespace")&&W():Z()&&bb("data")&&W();break;case"transform-function-whitespace":l(U())?Y():40==e?Z(new H(f))&&bb("data"):Z()&&bb("data")&&W();break;case"number":$(new M),45==e?b(U())?V()&&f.append([45,e])&&bb("number-rest"):46==U(1)&&b(U(2))?V(2)&&f.append([45,46,e])&&bb("number-fraction"):bb("data")&&W():43==e?b(U())?V()&&f.append([43,e])&&bb("number-rest"):46==U(1)&&b(U(2))?V(2)&&f.append([43,46,e])&&bb("number-fraction"):bb("data")&&W():b(e)?f.append(e)&&bb("number-rest"):46==e?b(U())?V()&&f.append([46,e])&&bb("number-fraction"):bb("data")&&W():bb("data")&&W();break;case"number-rest":b(e)?f.append(e):46==e?b(U())?V()&&f.append([46,e])&&bb("number-fraction"):Z()&&bb("data")&&W():37==e?Z(new N(f))&&bb("data"):69==e||101==e?b(U())?V()&&f.append([37,e])&&bb("sci-notation"):43!=U(1)&&45!=U(1)||!b(U(2))?$(new O(f,e))&&bb("dimension"):f.append([37,U(1),U(2)])&&V(2)&&bb("sci-notation"):45==e?h(U())?V()&&$(new O(f,[45,e]))&&bb("dimension"):92==U(1)&&m(U(2))?_()&&Z()&&bb("data")&&W():92==U(1)?V()&&$(new O(f,[45,cb()]))&&bb("dimension"):Z()&&bb("data")&&W():h(e)?$(new O(f,e))&&bb("dimension"):92==e?m(U)?_()&&Z()&&bb("data")&&W():$(new O(f,cb))&&bb("dimension"):Z()&&bb("data")&&W();break;case"number-fraction":f.type="number",b(e)?f.append(e):37==e?Z(new N(f))&&bb("data"):69==e||101==e?b(U())?V()&&f.append([101,e])&&bb("sci-notation"):43!=U(1)&&45!=U(1)||!b(U(2))?$(new O(f,e))&&bb("dimension"):f.append([101,U(1),U(2)])&&V(2)&&bb("sci-notation"):45==e?h(U())?V()&&$(new O(f,[45,e]))&&bb("dimension"):92==U(1)&&m(U(2))?_()&&Z()&&bb("data")&&W():92==U(1)?V()&&$(new O(f,[45,cb()]))&&bb("dimension"):Z()&&bb("data")&&W():h(e)?$(new O(f,e))&&bb("dimension"):92==e?m(U)?_()&&Z()&&bb("data")&&W():$(new O(f,cb()))&&bb("dimension"):Z()&&bb("data")&&W();break;case"dimension":i(e)?f.append(e):92==e?m(U())?_()&&Z()&&bb("data")&&W():f.append(cb()):Z()&&bb("data")&&W();break;case"sci-notation":f.type="number",b(e)?f.append(e):Z()&&bb("data")&&W();break;case"url":X()?_()&&Z(new r)&&bb("data"):34==e?bb("url-double-quote"):39==e?bb("url-single-quote"):41==e?Z(new L)&&bb("data"):l(e)?Y():bb("url-unquoted")&&W();break;case"url-double-quote":f instanceof L||$(new L),X()?_()&&Z(new r)&&bb("data"):34==e?bb("url-end"):k(e)?_()&&bb("bad-url"):92==e?k(U())?V():m(U())?_()&&Z(new r)&&bb("data")&&W():f.append(cb()):f.append(e);break;case"url-single-quote":f instanceof L||$(new L),X()?_()&&Z(new r)&&bb("data"):39==e?bb("url-end"):k(e)?_()&&bb("bad-url"):92==e?k(U())?V():m(U())?_()&&Z(new r)&&bb("data")&&W():f.append(cb()):f.append(e);break;case"url-end":X()?_()&&Z(new r)&&bb("data"):l(e)?Y():41==e?Z()&&bb("data"):_()&&bb("bad-url")&&W();break;case"url-unquoted":f instanceof L||$(new L),X()?_()&&Z(new r)&&bb("data"):l(e)?bb("url-end"):41==e?Z()&&bb("data"):34==e||39==e||40==e||j(e)?_()&&bb("bad-url"):92==e?m(U())?_()&&bb("bad-url"):f.append(cb()):f.append(e);break;case"bad-url":X()?_()&&Z(new r)&&bb("data"):41==e?Z(new r)&&bb("data"):92==e?m(U())?Y():cb():Y();break;case"unicode-range":for(var db=[e],eb=[e],fb=1;6>fb&&c(U());fb++)V(),db.push(e),eb.push(e);if(63==U()){for(;6>fb&&63==U();fb++)V(),db.push("0".charCodeAt(0)),eb.push("f".charCodeAt(0));Z(new P(db,eb))&&bb("data")}else if(45==U(1)&&c(U(2))){V(),V(),eb=[e];for(var fb=1;6>fb&&c(U());fb++)V(),eb.push(e);Z(new P(db,eb))&&bb("data")}else Z(new P(db))&&bb("data");break;default:ab("Unknown state '"+o+"'")}}}function o(a){return String.fromCharCode.apply(null,a.filter(function(a){return a}))}function p(){return this}function q(){return this}function r(){return this}function s(){return this}function t(){return this}function u(){return this}function v(){return this}function w(){return this}function x(){return this}function y(){return this}function z(){return this}function A(){return this}function B(){return this}function C(){return this}function D(){return this}function E(a){return this.value=String.fromCharCode(a),this}function F(){return this}function G(a){this.value=[],this.append(a)}function H(a){this.value=a.finish().value}function I(a){this.value=[],this.append(a)}function J(a){this.value=[],this.append(a)}function K(a){this.value=[],this.append(a)}function L(a){this.value=[],this.append(a)}function M(a){this.value=[],this.append(a),this.type="integer"}function N(a){a.finish(),this.value=a.value,this.repr=a.repr}function O(a,b){a.finish(),this.num=a.value,this.unit=[],this.repr=a.repr,this.append(b)}function P(a,b){return a=parseInt(o(a),16),b=void 0===b?a+1:parseInt(o(b),16),a>R&&(b=a),a>b&&(b=a),b>R&&(b=R),this.start=a,this.end=b,this}var Q=function(a,b,c){return a>=b&&c>=a},R=1114111;p.prototype.finish=function(){return this},p.prototype.toString=function(){return this.tokenType},p.prototype.toSourceString=p.prototype.toString,p.prototype.toJSON=function(){return this.toString()},q.prototype=new p,q.prototype.tokenType="BADSTRING",r.prototype=new p,r.prototype.tokenType="BADURL",s.prototype=new p,s.prototype.tokenType="WHITESPACE",s.prototype.toString=function(){return"WS"},s.prototype.toSourceString=function(){return" "},t.prototype=new p,t.prototype.tokenType="CDO",u.prototype=new p,u.prototype.tokenType="CDC",v.prototype=new p,v.prototype.tokenType=":",w.prototype=new p,w.prototype.tokenType=";",x.prototype=new p,x.prototype.tokenType="{",y.prototype=new p,y.prototype.tokenType="}",z.prototype=new p,z.prototype.tokenType="[",A.prototype=new p,A.prototype.tokenType="]",B.prototype=new p,B.prototype.tokenType="(",C.prototype=new p,C.prototype.tokenType=")",D.prototype=new p,D.prototype.tokenType="EOF",E.prototype=new p,E.prototype.tokenType="DELIM",E.prototype.toString=function(){return"DELIM("+this.value+")"},E.prototype.toSourceString=function(){return this.value},F.prototype=new p,F.prototype.append=function(a){if(a instanceof Array)for(var b=0;b<a.length;b++)this.value.push(a[b]);else this.value.push(a);return!0},F.prototype.finish=function(){return this.value=this.valueAsString(),this},F.prototype.ASCIImatch=function(a){return this.valueAsString().toLowerCase()==a.toLowerCase()},F.prototype.valueAsString=function(){return"string"==typeof this.value?this.value:o(this.value)},F.prototype.valueAsCodes=function(){if("string"==typeof this.value){for(var a=[],b=0;b<this.value.length;b++)a.push(this.value.charCodeAt(b));return a}return this.value.filter(function(a){return a})},G.prototype=new F,G.prototype.tokenType="IDENT",G.prototype.toString=function(){return"IDENT("+this.value+")"},G.prototype.toSourceString=function(){return this.value},H.prototype=new F,H.prototype.tokenType="FUNCTION",H.prototype.toString=function(){return"FUNCTION("+this.value+")"},H.prototype.toSourceString=function(){return this.value},I.prototype=new F,I.prototype.tokenType="AT-KEYWORD",I.prototype.toString=function(){return"AT("+this.value+")"},I.prototype.toSourceString=function(){return"@"+this.value},J.prototype=new F,J.prototype.tokenType="HASH",J.prototype.toString=function(){return"HASH("+this.value+")"},J.prototype.toSourceString=function(){return"#"+this.value},K.prototype=new F,K.prototype.tokenType="STRING",K.prototype.toString=function(){return'"'+this.value+'"'},K.prototype.toSourceString=K.prototype.toString,L.prototype=new F,L.prototype.tokenType="URL",L.prototype.toString=function(){return"URL("+this.value+")"},L.prototype.toSourceString=function(){return"url('"+this.value+"')"},M.prototype=new F,M.prototype.tokenType="NUMBER",M.prototype.toString=function(){return"integer"==this.type?"INT("+this.value+")":"NUMBER("+this.value+")"},M.prototype.toSourceString=function(){return"integer"==this.type?this.value:this.value},M.prototype.finish=function(){return this.repr=this.valueAsString(),this.value=1*this.repr,Math.abs(this.value)%1!=0&&(this.type="number"),this},N.prototype=new p,N.prototype.tokenType="PERCENTAGE",N.prototype.toString=function(){return"PERCENTAGE("+this.value+")"},N.prototype.toSourceString=function(){return this.value+"%"},O.prototype=new p,O.prototype.tokenType="DIMENSION",O.prototype.toString=function(){return"DIM("+this.num+","+this.unit+")"},O.prototype.toSourceString=function(){return this.num+this.unit},O.prototype.append=function(a){if(a instanceof Array)for(var b=0;b<a.length;b++)this.unit.push(a[b]);else this.unit.push(a);return!0},O.prototype.finish=function(){return this.unit=o(this.unit),this.repr+=this.unit,this},P.prototype=new p,P.prototype.tokenType="UNICODE-RANGE",P.prototype.toString=function(){return this.start+1==this.end?"UNICODE-RANGE("+this.start.toString(16).toUpperCase()+")":this.start<this.end?"UNICODE-RANGE("+this.start.toString(16).toUpperCase()+"-"+this.end.toString(16).toUpperCase()+")":"UNICODE-RANGE()"},P.prototype.toSourceString=function(){return this.start+1==this.end?"UNICODE-RANGE("+this.start.toString(16).toUpperCase()+")":this.start<this.end?"UNICODE-RANGE("+this.start.toString(16).toUpperCase()+"-"+this.end.toString(16).toUpperCase()+")":"UNICODE-RANGE()"},P.prototype.contains=function(a){return a>=this.start&&a<this.end},a.tokenize=n}),function(){var a,b,c,d,e;a=[function(){return new XMLHttpRequest},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Msxml3.XMLHTTP")},function(){return new ActiveXObject("Microsoft.XMLHTTP")}],c=function(){var b,c,d;for(d=!1,c=0;c<a.length;){try{d=a[c++]()}catch(e){b=e;continue}break}return d},b=function(a,b){var d;d=c(),d.onreadystatechange=function(){if(4===d.readyState){if(200!==d.status)throw"Error!";b(d.responseText)}},d.open("GET",a,!0),d.send()},d=function(){var a,b;return a=0,b=0,window.innerHeight?(a=window.innerWidth,b=window.innerHeight):document.documentElement&&document.documentElement.clientHeight?(a=document.documentElement.clientWidth,b=document.documentElement.clientHeight):document.body&&(a=document.body.clientWidth,b=document.body.clientHeight),{width:a,height:b}},(e=function(){var a,c,e,f,g,h,i,j,k,l,m,n;for(a=function(a){var b,c,d,e,f,g,h,i,j,k;for(c=[],j=a.value,f=0,h=j.length;h>f;f++){for(b=j[f],d=!1,k=b.value,g=0,i=k.length;i>g;g++)e=k[g],"DIMENSION"!==e.tokenType||"vmin"!==e.unit&&"vh"!==e.unit&&"vw"!==e.unit||(d=!0);d&&c.push(b)}return a.value=c,c},c=function(b){var d,e,f,g,h,i,j;for(g=[],j=b.value,h=0,i=j.length;i>h;h++)switch(f=j[h],f.type){case"STYLE-RULE":e=a(f),0!==e.length&&g.push(f);break;case"AT-RULE":d=c(f),0!==d.length&&g.push(f)}return b.value=g,g},i=function(){var a,b,c,e,f,g,h,i,j;j=d(),b={vh:j.height/100,vw:j.width/100},b.vmin=Math.min(b.vh,b.vw),i=j.width/j.height,f=function(a,b){var c,d,e,f;if(null!=a.map)return a.map(b);for(c=[],e=0,f=a.length;f>e;e++)d=a[e],c.push(b(d));return c},c=function(a){var c,d,e,g,h,i,j,k,l,m;for(d=[],e=f(a.selector,function(a){return null!=a.toSourceString?a.toSourceString():""}).join(""),e+="{",l=a.value,h=0,j=l.length;j>h;h++){for(c=l[h],e+=c.name,e+=":",m=c.value,i=0,k=m.length;k>i;i++)g=m[i],e+="DIMENSION"!==g.tokenType||"vmin"!==g.unit&&"vh"!==g.unit&&"vw"!==g.unit?g.toSourceString():""+Math.floor(g.num*b[g.unit])+"px";e+=";"}return e+="}\r"},e=function(a){var b,d,g,h,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y;for(j="",v=a.value,n=0,r=v.length;r>n;n++)switch(h=v[n],h.type){case"STYLE-RULE":j+=c(h);break;case"AT-RULE":if("media"===h.name){for(g="",b=!1,d=[],w=h.prelude,o=0,s=w.length;s>o;o++)if(l=w[o],"("===l.name){for(g+="(",x=l.value,p=0,t=x.length;t>p;p++)m=x[p],k=null!=m.toSourceString?m.toSourceString():"","IDENT"===m.tokenType&&"max-aspect-ratio"===k&&(b=!0),"NUMBER"===m.tokenType&&d.push(parseInt(k)),g+=k;g+=")"}else g+=l.toSourceString();i<d[0]/d[1]&&(j+=e(h))}else{for(g="",y=h.prelude,q=0,u=y.length;u>q;q++)l=y[q],"("===l.name?(g+="(",g+=f(l.value,function(a){return null!=a.toSourceString?a.toSourceString():""}).join(""),g+=")"):g+=l.toSourceString();j+="@"+h.name+" "+g+" {",j+=e(h),j+="}\n"}}return j},a="";for(h in k)g=k[h],a+=e(g);return null!=l.styleSheet?l.styleSheet.cssText=a:l.innerHTML=a},k={},l=document.createElement("style"),e=document.getElementsByTagName("head")[0],e.appendChild(l),h=document.getElementsByTagName("link"),g=0,j=0,m=0,n=h.length;n>m;m++)f=h[m],"stylesheet"===f.rel&&(g++,b(f.href,function(a){var b,d;d=tokenize(a),b=parse(d),c(b),k[f.href]=b,j++,j===g&&window.onresize()}));window.onresize=i})()}.call(this);