import{g as ve}from"./_commonjsHelpers.Cpj98o6Y.js";/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var _,pr;function pe(){if(pr)return _;pr=1;var r=typeof Object.defineProperty=="function"?Object.defineProperty:null;return _=r,_}/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var q,dr;function de(){if(dr)return q;dr=1;var r=pe();function i(){try{return r({},"x",{}),!0}catch{return!1}}return q=i,q}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var $,gr;function ge(){if(gr)return $;gr=1;var r=Object.defineProperty;return $=r,$}/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var w,hr;function te(){if(hr)return w;hr=1;function r(i){return typeof i=="number"}return w=r,w}/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var R,br;function ue(){if(br)return R;br=1;function r(n){return n[0]==="-"}function i(n){var a="",t;for(t=0;t<n;t++)a+="0";return a}function u(n,a,t){var s=!1,o=a-n.length;return o<0||(r(n)&&(s=!0,n=n.substr(1)),n=t?n+i(o):i(o)+n,s&&(n="-"+n)),n}return R=u,R}/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var S,mr;function he(){if(mr)return S;mr=1;var r=te(),i=ue(),u=String.prototype.toLowerCase,n=String.prototype.toUpperCase;function a(t){var s,o,f;switch(t.specifier){case"b":s=2;break;case"o":s=8;break;case"x":case"X":s=16;break;case"d":case"i":case"u":default:s=10;break}if(o=t.arg,f=parseInt(o,10),!isFinite(f)){if(!r(o))throw new Error("invalid integer. Value: "+o);f=0}return f<0&&(t.specifier==="u"||s!==10)&&(f=4294967295+f+1),f<0?(o=(-f).toString(s),t.precision&&(o=i(o,t.precision,t.padRight)),o="-"+o):(o=f.toString(s),!f&&!t.precision?o="":t.precision&&(o=i(o,t.precision,t.padRight)),t.sign&&(o=t.sign+o)),s===16&&(t.alternate&&(o="0x"+o),o=t.specifier===n.call(t.specifier)?n.call(o):u.call(o)),s===8&&t.alternate&&o.charAt(0)!=="0"&&(o="0"+o),o}return S=a,S}/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var E,yr;function be(){if(yr)return E;yr=1;function r(i){return typeof i=="string"}return E=r,E}/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var P,_r;function me(){if(_r)return P;_r=1;var r=te(),i=Math.abs,u=String.prototype.toLowerCase,n=String.prototype.toUpperCase,a=String.prototype.replace,t=/e\+(\d)$/,s=/e-(\d)$/,o=/^(\d+)$/,f=/^(\d+)e/,g=/\.0$/,c=/\.0*e/,v=/(\..*[^0])0*e/;function h(e){var d,l,p=parseFloat(e.arg);if(!isFinite(p)){if(!r(e.arg))throw new Error("invalid floating-point number. Value: "+l);p=e.arg}switch(e.specifier){case"e":case"E":l=p.toExponential(e.precision);break;case"f":case"F":l=p.toFixed(e.precision);break;case"g":case"G":i(p)<1e-4?(d=e.precision,d>0&&(d-=1),l=p.toExponential(d)):l=p.toPrecision(e.precision),e.alternate||(l=a.call(l,v,"$1e"),l=a.call(l,c,"e"),l=a.call(l,g,""));break;default:throw new Error("invalid double notation. Value: "+e.specifier)}return l=a.call(l,t,"e+0$1"),l=a.call(l,s,"e-0$1"),e.alternate&&(l=a.call(l,o,"$1."),l=a.call(l,f,"$1.e")),p>=0&&e.sign&&(l=e.sign+l),l=e.specifier===n.call(e.specifier)?n.call(l):u.call(l),l}return P=h,P}/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var T,qr;function ye(){if(qr)return T;qr=1;function r(u){var n="",a;for(a=0;a<u;a++)n+=" ";return n}function i(u,n,a){var t=n-u.length;return t<0||(u=a?u+r(t):r(t)+u),u}return T=i,T}/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var I,$r;function _e(){if($r)return I;$r=1;var r=he(),i=be(),u=me(),n=ye(),a=ue(),t=String.fromCharCode,s=Array.isArray;function o(c){return c!==c}function f(c){var v={};return v.specifier=c.specifier,v.precision=c.precision===void 0?1:c.precision,v.width=c.width,v.flags=c.flags||"",v.mapping=c.mapping,v}function g(c){var v,h,e,d,l,p,b,m,y;if(!s(c))throw new TypeError("invalid argument. First argument must be an array. Value: `"+c+"`.");for(p="",b=1,m=0;m<c.length;m++)if(e=c[m],i(e))p+=e;else{if(v=e.precision!==void 0,e=f(e),!e.specifier)throw new TypeError("invalid argument. Token is missing `specifier` property. Index: `"+m+"`. Value: `"+e+"`.");for(e.mapping&&(b=e.mapping),h=e.flags,y=0;y<h.length;y++)switch(d=h.charAt(y),d){case" ":e.sign=" ";break;case"+":e.sign="+";break;case"-":e.padRight=!0,e.padZeros=!1;break;case"0":e.padZeros=h.indexOf("-")<0;break;case"#":e.alternate=!0;break;default:throw new Error("invalid flag: "+d)}if(e.width==="*"){if(e.width=parseInt(arguments[b],10),b+=1,o(e.width))throw new TypeError("the argument for * width at position "+b+" is not a number. Value: `"+e.width+"`.");e.width<0&&(e.padRight=!0,e.width=-e.width)}if(v&&e.precision==="*"){if(e.precision=parseInt(arguments[b],10),b+=1,o(e.precision))throw new TypeError("the argument for * precision at position "+b+" is not a number. Value: `"+e.precision+"`.");e.precision<0&&(e.precision=1,v=!1)}switch(e.arg=arguments[b],e.specifier){case"b":case"o":case"x":case"X":case"d":case"i":case"u":v&&(e.padZeros=!1),e.arg=r(e);break;case"s":e.maxWidth=v?e.precision:-1,e.arg=String(e.arg);break;case"c":if(!o(e.arg)){if(l=parseInt(e.arg,10),l<0||l>127)throw new Error("invalid character code. Value: "+e.arg);e.arg=o(l)?String(e.arg):t(l)}break;case"e":case"E":case"f":case"F":case"g":case"G":v||(e.precision=6),e.arg=u(e);break;default:throw new Error("invalid specifier: "+e.specifier)}e.maxWidth>=0&&e.arg.length>e.maxWidth&&(e.arg=e.arg.substring(0,e.maxWidth)),e.padZeros?e.arg=a(e.arg,e.width||e.precision,e.padRight):e.width&&(e.arg=n(e.arg,e.width,e.padRight)),p+=e.arg||"",b+=1}return p}return I=g,I}/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var x,wr;function qe(){if(wr)return x;wr=1;var r=_e();return x=r,x}/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var L,Rr;function $e(){if(Rr)return L;Rr=1;var r=/%(?:([1-9]\d*)\$)?([0 +\-#]*)(\*|\d+)?(?:(\.)(\*|\d+)?)?[hlL]?([%A-Za-z])/g;function i(n){var a={mapping:n[1]?parseInt(n[1],10):void 0,flags:n[2],width:n[3],precision:n[5],specifier:n[6]};return n[4]==="."&&n[5]===void 0&&(a.precision="1"),a}function u(n){var a,t,s,o;for(t=[],o=0,s=r.exec(n);s;)a=n.slice(o,r.lastIndex-s[0].length),a.length&&t.push(a),t.push(i(s)),o=r.lastIndex,s=r.exec(n);return a=n.slice(o),a.length&&t.push(a),t}return L=u,L}/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var O,Sr;function we(){if(Sr)return O;Sr=1;var r=$e();return O=r,O}/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var M,Er;function Re(){if(Er)return M;Er=1;function r(i){return typeof i=="string"}return M=r,M}/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var C,Pr;function Se(){if(Pr)return C;Pr=1;var r=qe(),i=we(),u=Re();function n(a){var t,s;if(!u(a))throw new TypeError(n("invalid argument. First argument must be a string. Value: `%s`.",a));for(t=[i(a)],s=1;s<arguments.length;s++)t.push(arguments[s]);return r.apply(null,t)}return C=n,C}/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var G,Tr;function oe(){if(Tr)return G;Tr=1;var r=Se();return G=r,G}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var F,Ir;function Ee(){if(Ir)return F;Ir=1;var r=oe(),i=Object.prototype,u=i.toString,n=i.__defineGetter__,a=i.__defineSetter__,t=i.__lookupGetter__,s=i.__lookupSetter__;function o(f,g,c){var v,h,e,d;if(typeof f!="object"||f===null||u.call(f)==="[object Array]")throw new TypeError(r("invalid argument. First argument must be an object. Value: `%s`.",f));if(typeof c!="object"||c===null||u.call(c)==="[object Array]")throw new TypeError(r("invalid argument. Property descriptor must be an object. Value: `%s`.",c));if(h="value"in c,h&&(t.call(f,g)||s.call(f,g)?(v=f.__proto__,f.__proto__=i,delete f[g],f[g]=c.value,f.__proto__=v):f[g]=c.value),e="get"in c,d="set"in c,h&&(e||d))throw new Error("invalid argument. Cannot specify one or more accessors and a value or writable attribute in the property descriptor.");return e&&n&&n.call(f,g,c.get),d&&a&&a.call(f,g,c.set),f}return F=o,F}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var j,xr;function Pe(){if(xr)return j;xr=1;var r=de(),i=ge(),u=Ee(),n;return r()?n=i:n=u,j=n,j}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var B,Lr;function Te(){if(Lr)return B;Lr=1;var r=Pe();function i(u,n,a){r(u,n,{configurable:!1,enumerable:!1,writable:!1,value:a})}return B=i,B}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var D,Or;function Ie(){if(Or)return D;Or=1;var r=Te();return D=r,D}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var V,Mr;function se(){if(Mr)return V;Mr=1;function r(i){return typeof i=="boolean"}return V=r,V}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var z,Cr;function xe(){if(Cr)return z;Cr=1;function r(){return typeof Symbol=="function"&&typeof Symbol("foo")=="symbol"}return z=r,z}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var A,Gr;function Le(){if(Gr)return A;Gr=1;var r=xe();return A=r,A}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Z,Fr;function Oe(){if(Fr)return Z;Fr=1;var r=Le(),i=r();function u(){return i&&typeof Symbol.toStringTag=="symbol"}return Z=u,Z}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var N,jr;function fe(){if(jr)return N;jr=1;var r=Oe();return N=r,N}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var W,Br;function le(){if(Br)return W;Br=1;var r=Object.prototype.toString;return W=r,W}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var X,Dr;function Me(){if(Dr)return X;Dr=1;var r=le();function i(u){return r.call(u)}return X=i,X}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Q,Vr;function Ce(){if(Vr)return Q;Vr=1;var r=Object.prototype.hasOwnProperty;function i(u,n){return u==null?!1:r.call(u,n)}return Q=i,Q}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var U,zr;function Ge(){if(zr)return U;zr=1;var r=Ce();return U=r,U}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var H,Ar;function Fe(){if(Ar)return H;Ar=1;var r=typeof Symbol=="function"?Symbol:void 0;return H=r,H}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var J,Zr;function je(){if(Zr)return J;Zr=1;var r=Fe();return J=r,J}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Y,Nr;function Be(){if(Nr)return Y;Nr=1;var r=je(),i=typeof r=="function"?r.toStringTag:"";return Y=i,Y}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var K,Wr;function De(){if(Wr)return K;Wr=1;var r=Ge(),i=Be(),u=le();function n(a){var t,s,o;if(a==null)return u.call(a);s=a[i],t=r(a,i);try{a[i]=void 0}catch{return u.call(a)}return o=u.call(a),t?a[i]=s:delete a[i],o}return K=n,K}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var k,Xr;function Ve(){if(Xr)return k;Xr=1;var r=fe(),i=Me(),u=De(),n;return r()?n=u:n=i,k=n,k}/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var rr,Qr;function ze(){if(Qr)return rr;Qr=1;var r=Boolean;return rr=r,rr}/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var er,Ur;function Ae(){if(Ur)return er;Ur=1;var r=ze();return er=r,er}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var ir,Hr;function Ze(){if(Hr)return ir;Hr=1;var r=Boolean.prototype.toString;return ir=r,ir}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var ar,Jr;function Ne(){if(Jr)return ar;Jr=1;var r=Ze();function i(u){try{return r.call(u),!0}catch{return!1}}return ar=i,ar}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var nr,Yr;function ce(){if(Yr)return nr;Yr=1;var r=fe(),i=Ve(),u=Ae(),n=Ne(),a=r();function t(s){return typeof s=="object"?s instanceof u?!0:a?n(s):i(s)==="[object Boolean]":!1}return nr=t,nr}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var tr,Kr;function We(){if(Kr)return tr;Kr=1;var r=se(),i=ce();function u(n){return r(n)||i(n)}return tr=u,tr}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var ur,kr;function Xe(){if(kr)return ur;kr=1;var r=Ie(),i=We(),u=se(),n=ce();return r(i,"isPrimitive",u),r(i,"isObject",n),ur=i,ur}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var or,re;function Qe(){if(re)return or;re=1;function r(){return new Function("return this;")()}return or=r,or}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var sr,ee;function Ue(){if(ee)return sr;ee=1;var r=typeof self=="object"?self:null;return sr=r,sr}/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var fr,ie;function He(){if(ie)return fr;ie=1;var r=typeof window=="object"?window:null;return fr=r,fr}/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var lr,ae;function Je(){if(ae)return lr;ae=1;var r=typeof globalThis=="object"?globalThis:null;return lr=r,lr}/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var cr,ne;function Ye(){if(ne)return cr;ne=1;var r=Xe().isPrimitive,i=oe(),u=Qe(),n=Ue(),a=He(),t=Je();function s(o){if(arguments.length){if(!r(o))throw new TypeError(i("invalid argument. Must provide a boolean. Value: `%s`.",o));if(o)return u()}if(t)return t;if(n)return n;if(a)return a;throw new Error("unexpected error. Unable to resolve global object.")}return cr=s,cr}var Ke=Ye();const ke=ve(Ke),vr=ke(),ei=r=>{r=r.replace(/^\/|\/$/gm,"");const i=JSON.parse(vr?.localStorage?.getItem(r)??"[]"),u=()=>vr?.localStorage.setItem(r,JSON.stringify(i));return{__slug:r,__questions:i,total:()=>i.length,correct:()=>i.filter(a=>a.isCorrect).length,sumOfTries:()=>i.reduce((a,t)=>a+(t?.tries??0),0),reset:()=>vr?.localStorage.setItem(r,"[]"),addQuestion:a=>(a.index==null,i[a.index]||(i[a.index]={...a,isCorrect:void 0,tries:0},u()),i.length),isCorrect:({index:a})=>i?.[a].isCorrect,getTries:({index:a})=>i?.[a]?.tries,answerQuestion:(a,t)=>{if(!a||!t)throw Error("Missing question and/or option args");if(a.index==null)throw Error("Missing question.index");if(!i[a.index])throw Error(`Question ${a.index} not found`);const s=t.isAnswer;return i[a.index].isCorrect=s,i[a.index].tries++,u(),t.isAnswer}}};export{ei as Q,ke as g};
