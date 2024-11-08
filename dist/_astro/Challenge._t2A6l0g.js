import{j as l}from"./jsx-runtime.B6Q2Q8rY.js";import{r as f,g as fe}from"./index.caxmlYbZ.js";import{c as ue}from"./index.BgZf5yFv.js";import{s as ve}from"./pathHelpers.DmToPstD.js";import{Q as P}from"./QuestionStore.Cfbsl7zP.js";import{c as j}from"./clsx.B-dksMZM.js";const pe=f.createContext({answers:[],setAnswers:()=>{},currentChallenge:0,setCurrentChallenge:()=>{},totalQuestions:0,setTotalQuestions:()=>{},correctAnswers:0,setCorrectAnswers:()=>{}});/**
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
*/var ge=typeof Object.defineProperty=="function"?Object.defineProperty:null,de=ge;/**
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
*/var he=de;function me(){try{return he({},"x",{}),!0}catch{return!1}}var be=me;/**
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
*/var we=Object.defineProperty,$e=we;/**
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
*/function ye(e){return typeof e=="number"}var Y=ye;/**
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
*/function Se(e){return e[0]==="-"}function F(e){var i="",a;for(a=0;a<e;a++)i+="0";return i}function _e(e,i,a){var r=!1,n=i-e.length;return n<0||(Se(e)&&(r=!0,e=e.substr(1)),e=a?e+F(n):F(n)+e,r&&(e="-"+e)),e}var J=_e;/**
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
*/var Ee=Y,q=J,xe=String.prototype.toLowerCase,B=String.prototype.toUpperCase;function Ce(e){var i,a,r;switch(e.specifier){case"b":i=2;break;case"o":i=8;break;case"x":case"X":i=16;break;case"d":case"i":case"u":default:i=10;break}if(a=e.arg,r=parseInt(a,10),!isFinite(r)){if(!Ee(a))throw new Error("invalid integer. Value: "+a);r=0}return r<0&&(e.specifier==="u"||i!==10)&&(r=4294967295+r+1),r<0?(a=(-r).toString(i),e.precision&&(a=q(a,e.precision,e.padRight)),a="-"+a):(a=r.toString(i),!r&&!e.precision?a="":e.precision&&(a=q(a,e.precision,e.padRight)),e.sign&&(a=e.sign+a)),i===16&&(e.alternate&&(a="0x"+a),a=e.specifier===B.call(e.specifier)?B.call(a):xe.call(a)),i===8&&e.alternate&&a.charAt(0)!=="0"&&(a="0"+a),a}var Te=Ce;/**
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
*/function Pe(e){return typeof e=="string"}var je=Pe;/**
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
*/var Re=Y,Ae=Math.abs,Oe=String.prototype.toLowerCase,V=String.prototype.toUpperCase,p=String.prototype.replace,Ne=/e\+(\d)$/,ze=/e-(\d)$/,Ie=/^(\d+)$/,Ge=/^(\d+)e/,Fe=/\.0$/,qe=/\.0*e/,Be=/(\..*[^0])0*e/;function Ve(e){var i,a,r=parseFloat(e.arg);if(!isFinite(r)){if(!Re(e.arg))throw new Error("invalid floating-point number. Value: "+a);r=e.arg}switch(e.specifier){case"e":case"E":a=r.toExponential(e.precision);break;case"f":case"F":a=r.toFixed(e.precision);break;case"g":case"G":Ae(r)<1e-4?(i=e.precision,i>0&&(i-=1),a=r.toExponential(i)):a=r.toPrecision(e.precision),e.alternate||(a=p.call(a,Be,"$1e"),a=p.call(a,qe,"e"),a=p.call(a,Fe,""));break;default:throw new Error("invalid double notation. Value: "+e.specifier)}return a=p.call(a,Ne,"e+0$1"),a=p.call(a,ze,"e-0$1"),e.alternate&&(a=p.call(a,Ie,"$1."),a=p.call(a,Ge,"$1.e")),r>=0&&e.sign&&(a=e.sign+a),a=e.specifier===V.call(e.specifier)?V.call(a):Oe.call(a),a}var De=Ve;/**
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
*/function D(e){var i="",a;for(a=0;a<e;a++)i+=" ";return i}function Qe(e,i,a){var r=i-e.length;return r<0||(e=a?e+D(r):D(r)+e),e}var Le=Qe;/**
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
*/var Ze=Te,Xe=je,Me=De,We=Le,He=J,Ue=String.fromCharCode,Ye=Array.isArray;function S(e){return e!==e}function Je(e){var i={};return i.specifier=e.specifier,i.precision=e.precision===void 0?1:e.precision,i.width=e.width,i.flags=e.flags||"",i.mapping=e.mapping,i}function Ke(e){var i,a,r,n,c,o,s,u,g;if(!Ye(e))throw new TypeError("invalid argument. First argument must be an array. Value: `"+e+"`.");for(o="",s=1,u=0;u<e.length;u++)if(r=e[u],Xe(r))o+=r;else{if(i=r.precision!==void 0,r=Je(r),!r.specifier)throw new TypeError("invalid argument. Token is missing `specifier` property. Index: `"+u+"`. Value: `"+r+"`.");for(r.mapping&&(s=r.mapping),a=r.flags,g=0;g<a.length;g++)switch(n=a.charAt(g),n){case" ":r.sign=" ";break;case"+":r.sign="+";break;case"-":r.padRight=!0,r.padZeros=!1;break;case"0":r.padZeros=a.indexOf("-")<0;break;case"#":r.alternate=!0;break;default:throw new Error("invalid flag: "+n)}if(r.width==="*"){if(r.width=parseInt(arguments[s],10),s+=1,S(r.width))throw new TypeError("the argument for * width at position "+s+" is not a number. Value: `"+r.width+"`.");r.width<0&&(r.padRight=!0,r.width=-r.width)}if(i&&r.precision==="*"){if(r.precision=parseInt(arguments[s],10),s+=1,S(r.precision))throw new TypeError("the argument for * precision at position "+s+" is not a number. Value: `"+r.precision+"`.");r.precision<0&&(r.precision=1,i=!1)}switch(r.arg=arguments[s],r.specifier){case"b":case"o":case"x":case"X":case"d":case"i":case"u":i&&(r.padZeros=!1),r.arg=Ze(r);break;case"s":r.maxWidth=i?r.precision:-1,r.arg=String(r.arg);break;case"c":if(!S(r.arg)){if(c=parseInt(r.arg,10),c<0||c>127)throw new Error("invalid character code. Value: "+r.arg);r.arg=S(c)?String(r.arg):Ue(c)}break;case"e":case"E":case"f":case"F":case"g":case"G":i||(r.precision=6),r.arg=Me(r);break;default:throw new Error("invalid specifier: "+r.specifier)}r.maxWidth>=0&&r.arg.length>r.maxWidth&&(r.arg=r.arg.substring(0,r.maxWidth)),r.padZeros?r.arg=He(r.arg,r.width||r.precision,r.padRight):r.width&&(r.arg=We(r.arg,r.width,r.padRight)),o+=r.arg||"",s+=1}return o}var ke=Ke;/**
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
*/var er=ke,rr=er;/**
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
*/var _=/%(?:([1-9]\d*)\$)?([0 +\-#]*)(\*|\d+)?(?:(\.)(\*|\d+)?)?[hlL]?([%A-Za-z])/g;function ar(e){var i={mapping:e[1]?parseInt(e[1],10):void 0,flags:e[2],width:e[3],precision:e[5],specifier:e[6]};return e[4]==="."&&e[5]===void 0&&(i.precision="1"),i}function ir(e){var i,a,r,n;for(a=[],n=0,r=_.exec(e);r;)i=e.slice(n,_.lastIndex-r[0].length),i.length&&a.push(i),a.push(ar(r)),n=_.lastIndex,r=_.exec(e);return i=e.slice(n),i.length&&a.push(i),a}var tr=ir;/**
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
*/var nr=tr,sr=nr;/**
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
*/function or(e){return typeof e=="string"}var lr=or;/**
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
*/var cr=rr,fr=sr,ur=lr;function K(e){var i,a;if(!ur(e))throw new TypeError(K("invalid argument. First argument must be a string. Value: `%s`.",e));for(i=[fr(e)],a=1;a<arguments.length;a++)i.push(arguments[a]);return cr.apply(null,i)}var vr=K;/**
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
*/var pr=vr,k=pr;/**
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
*/var Q=k,h=Object.prototype,L=h.toString,Z=h.__defineGetter__,X=h.__defineSetter__,gr=h.__lookupGetter__,dr=h.__lookupSetter__;function hr(e,i,a){var r,n,c,o;if(typeof e!="object"||e===null||L.call(e)==="[object Array]")throw new TypeError(Q("invalid argument. First argument must be an object. Value: `%s`.",e));if(typeof a!="object"||a===null||L.call(a)==="[object Array]")throw new TypeError(Q("invalid argument. Property descriptor must be an object. Value: `%s`.",a));if(n="value"in a,n&&(gr.call(e,i)||dr.call(e,i)?(r=e.__proto__,e.__proto__=h,delete e[i],e[i]=a.value,e.__proto__=r):e[i]=a.value),c="get"in a,o="set"in a,n&&(c||o))throw new Error("invalid argument. Cannot specify one or more accessors and a value or writable attribute in the property descriptor.");return c&&Z&&Z.call(e,i,a.get),o&&X&&X.call(e,i,a.set),e}var mr=hr;/**
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
*/var br=be,wr=$e,$r=mr,A;br()?A=wr:A=$r;var yr=A;/**
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
*/var Sr=yr;function _r(e,i,a){Sr(e,i,{configurable:!1,enumerable:!1,writable:!1,value:a})}var Er=_r;/**
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
*/var xr=Er,Cr=xr;/**
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
*/function Tr(e){return typeof e=="boolean"}var ee=Tr;/**
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
*/function Pr(){return typeof Symbol=="function"&&typeof Symbol("foo")=="symbol"}var jr=Pr;/**
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
*/var Rr=jr,Ar=Rr;/**
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
*/var Or=Ar,Nr=Or();function zr(){return Nr&&typeof Symbol.toStringTag=="symbol"}var Ir=zr;/**
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
*/var Gr=Ir,re=Gr;/**
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
*/var Fr=Object.prototype.toString,ae=Fr;/**
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
*/var qr=ae;function Br(e){return qr.call(e)}var Vr=Br;/**
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
*/var Dr=Object.prototype.hasOwnProperty;function Qr(e,i){return e==null?!1:Dr.call(e,i)}var Lr=Qr;/**
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
*/var Zr=Lr,Xr=Zr;/**
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
*/var Mr=typeof Symbol=="function"?Symbol:void 0,Wr=Mr;/**
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
*/var Hr=Wr,Ur=Hr;/**
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
*/var M=Ur,Yr=typeof M=="function"?M.toStringTag:"",Jr=Yr;/**
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
*/var Kr=Xr,m=Jr,R=ae;function kr(e){var i,a,r;if(e==null)return R.call(e);a=e[m],i=Kr(e,m);try{e[m]=void 0}catch{return R.call(e)}return r=R.call(e),i?e[m]=a:delete e[m],r}var ea=kr;/**
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
*/var ra=re,aa=Vr,ia=ea,O;ra()?O=ia:O=aa;var ta=O;/**
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
*/var na=Boolean,sa=na;/**
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
*/var oa=sa,la=oa;/**
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
*/var ca=Boolean.prototype.toString,fa=ca;/**
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
*/var ua=fa;function va(e){try{return ua.call(e),!0}catch{return!1}}var pa=va;/**
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
*/var ga=re,da=ta,ha=la,ma=pa,ba=ga();function wa(e){return typeof e=="object"?e instanceof ha?!0:ba?ma(e):da(e)==="[object Boolean]":!1}var ie=wa;/**
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
*/var $a=ee,ya=ie;function Sa(e){return $a(e)||ya(e)}var _a=Sa;/**
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
*/var te=Cr,N=_a,Ea=ee,xa=ie;te(N,"isPrimitive",Ea);te(N,"isObject",xa);var Ca=N;/**
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
*/function Ta(){return new Function("return this;")()}var Pa=Ta;/**
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
*/var ja=typeof self=="object"?self:null,Ra=ja;/**
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
*/var Aa=typeof window=="object"?window:null,Oa=Aa;/**
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
*/var Na=typeof globalThis=="object"?globalThis:null,za=Na;/**
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
*/var Ia=Ca.isPrimitive,Ga=k,Fa=Pa,W=Ra,H=Oa,U=za;function qa(e){if(arguments.length){if(!Ia(e))throw new TypeError(Ga("invalid argument. Must provide a boolean. Value: `%s`.",e));if(e)return Fa()}if(U)return U;if(W)return W;if(H)return H;throw new Error("unexpected error. Unable to resolve global object.")}var Ba=qa;const Va=fe(Ba),b=Va();function Wa({children:e,title:i,group:a,question:r,options:n,explanation:c,index:o}){let s=null;const{setTotalQuestions:u,setCorrectAnswers:g}=f.useContext(pe),E=f.useRef(null),[d,w]=f.useState("untouched"),[x,C]=f.useState(void 0),[$,ne]=f.useState(!1),[z,se]=f.useState(c),oe=()=>{const t=document.querySelectorAll("main .challenge"),v=document.querySelectorAll("main .challenge.correct");u(t?.length),g(v?.length)};f.useEffect(()=>{s||(s=P(b?.location.pathname))},[b?.location?.pathname]),f.useEffect(()=>{s||(s=P(b?.location.pathname)),s?(s.addQuestion({title:i,group:a,question:r,index:o}),console.log("Added question to store:",o,a,i)):console.error("QuestionStore is not initialized")},[s,i,a,r,n,c]),f.useEffect(()=>{const t=s?.isCorrect({index:o})??void 0;console.log("Checking if we already answered this question:",t),console.log("Found cached answer:",t),C(t),w(t===!0?"correct":t===!1?"incorrect":"")},[]);const le=(t,v)=>{const y=b?.posthog;y&&y.capture(t,v)},ce=t=>{console.log("Answering question:",i,r,t),s||(s=P(b?.location.pathname)),s?.answerQuestion({index:o},t),t.isAnswer?(C(!0),w("correct pulse")):(C(!1),w("incorrect shake")),le("QuizAnswer",{isCorrect:t.isAnswer,option:t,question:r||"",title:i,questionIndex:o}),setTimeout(oe,20)};f.useEffect(()=>{const t=d.includes("shake")||d.includes("pulse");if(d&&t){const v=d.split(" ").filter(y=>!["shake","pulse"].includes(y));setTimeout(()=>{w(v.join(" "))},1e3)}},[d]),f.useEffect(()=>{if(E.current){const t=E.current.querySelector("div.explanation")?.innerHTML;t&&se(t)}},[z]);const T=(o??0)+1;let I=n.filter(t=>t.isAnswer).length;I===0?console.error("No correct answers found for question:",r,i,n):I>=2&&console.error("NotYrtSupported: Multiple correct answers found for question:",r,i,n);const G=n.map(t=>{const v=x&&t.isAnswer;return x&&!t.isAnswer?null:l.jsx("a",{className:ue("option",{"correct-answer":v}),onClick:()=>!x&&ce(t),children:l.jsx("label",{children:t.text})},t.text)}).filter(Boolean);return l.jsxs("div",{id:`qq-${T}`,className:j("challenge",d),ref:E,children:[l.jsxs("div",{className:"quiz-header",children:[l.jsxs("div",{className:"quiz-question-count",children:[l.jsxs("a",{href:`#qq-${T}`,children:[T,"."]})," "]}),l.jsx("h2",{className:"quiz-title",id:ve(i),children:i})]}),l.jsx("div",{className:"quiz-question",children:r||e}),l.jsx("aside",{className:"quiz-hint-toggle",children:l.jsxs("button",{onClick:()=>ne(!$),className:j("hint-toggle",{open:$}),children:[$?"Hide":"Show"," Explainer"," "]})}),l.jsxs("section",{className:j("quiz-body-panel","card-container",{"card-flip":$}),style:{height:`${80*G.length}px`,transition:"height 0.2s ease-in-out"},children:[l.jsx("section",{className:"quiz-options card card-front",children:G}),l.jsx("section",{className:"explanation card card-back ",children:l.jsx("p",{className:"help-box",dangerouslySetInnerHTML:{__html:z}})})]})]})}export{Wa as default};
