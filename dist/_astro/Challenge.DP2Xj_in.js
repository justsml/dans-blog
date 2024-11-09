import{j as l}from"./jsx-runtime.B6Q2Q8rY.js";import{r as f,g as ce}from"./index.caxmlYbZ.js";import{c as fe}from"./index.BgZf5yFv.js";import{s as ue}from"./pathHelpers.DmToPstD.js";import{Q as P}from"./QuestionStore.bE0-Cc3Q.js";import{c as j}from"./clsx.B-dksMZM.js";const ve=f.createContext({answers:[],setAnswers:()=>{},currentChallenge:0,setCurrentChallenge:()=>{},totalQuestions:0,setTotalQuestions:()=>{},correctAnswers:0,setCorrectAnswers:()=>{}});/**
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
*/var pe=typeof Object.defineProperty=="function"?Object.defineProperty:null,ge=pe;/**
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
*/var de=ge;function he(){try{return de({},"x",{}),!0}catch{return!1}}var me=he;/**
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
*/var be=Object.defineProperty,$e=be;/**
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
*/function we(e){return typeof e=="number"}var U=we;/**
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
*/function ye(e){return e[0]==="-"}function G(e){var i="",a;for(a=0;a<e;a++)i+="0";return i}function Se(e,i,a){var r=!1,n=i-e.length;return n<0||(ye(e)&&(r=!0,e=e.substr(1)),e=a?e+G(n):G(n)+e,r&&(e="-"+e)),e}var Y=Se;/**
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
*/var _e=U,F=Y,Ee=String.prototype.toLowerCase,q=String.prototype.toUpperCase;function xe(e){var i,a,r;switch(e.specifier){case"b":i=2;break;case"o":i=8;break;case"x":case"X":i=16;break;case"d":case"i":case"u":default:i=10;break}if(a=e.arg,r=parseInt(a,10),!isFinite(r)){if(!_e(a))throw new Error("invalid integer. Value: "+a);r=0}return r<0&&(e.specifier==="u"||i!==10)&&(r=4294967295+r+1),r<0?(a=(-r).toString(i),e.precision&&(a=F(a,e.precision,e.padRight)),a="-"+a):(a=r.toString(i),!r&&!e.precision?a="":e.precision&&(a=F(a,e.precision,e.padRight)),e.sign&&(a=e.sign+a)),i===16&&(e.alternate&&(a="0x"+a),a=e.specifier===q.call(e.specifier)?q.call(a):Ee.call(a)),i===8&&e.alternate&&a.charAt(0)!=="0"&&(a="0"+a),a}var Ce=xe;/**
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
*/function Te(e){return typeof e=="string"}var Pe=Te;/**
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
*/var je=U,Re=Math.abs,Oe=String.prototype.toLowerCase,B=String.prototype.toUpperCase,p=String.prototype.replace,Ae=/e\+(\d)$/,Ne=/e-(\d)$/,Ie=/^(\d+)$/,ze=/^(\d+)e/,Ge=/\.0$/,Fe=/\.0*e/,qe=/(\..*[^0])0*e/;function Be(e){var i,a,r=parseFloat(e.arg);if(!isFinite(r)){if(!je(e.arg))throw new Error("invalid floating-point number. Value: "+a);r=e.arg}switch(e.specifier){case"e":case"E":a=r.toExponential(e.precision);break;case"f":case"F":a=r.toFixed(e.precision);break;case"g":case"G":Re(r)<1e-4?(i=e.precision,i>0&&(i-=1),a=r.toExponential(i)):a=r.toPrecision(e.precision),e.alternate||(a=p.call(a,qe,"$1e"),a=p.call(a,Fe,"e"),a=p.call(a,Ge,""));break;default:throw new Error("invalid double notation. Value: "+e.specifier)}return a=p.call(a,Ae,"e+0$1"),a=p.call(a,Ne,"e-0$1"),e.alternate&&(a=p.call(a,Ie,"$1."),a=p.call(a,ze,"$1.e")),r>=0&&e.sign&&(a=e.sign+a),a=e.specifier===B.call(e.specifier)?B.call(a):Oe.call(a),a}var Ve=Be;/**
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
*/function V(e){var i="",a;for(a=0;a<e;a++)i+=" ";return i}function De(e,i,a){var r=i-e.length;return r<0||(e=a?e+V(r):V(r)+e),e}var Le=De;/**
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
*/var Qe=Ce,Ze=Pe,Xe=Ve,We=Le,Me=Y,He=String.fromCharCode,Ue=Array.isArray;function S(e){return e!==e}function Ye(e){var i={};return i.specifier=e.specifier,i.precision=e.precision===void 0?1:e.precision,i.width=e.width,i.flags=e.flags||"",i.mapping=e.mapping,i}function Je(e){var i,a,r,n,c,o,s,u,g;if(!Ue(e))throw new TypeError("invalid argument. First argument must be an array. Value: `"+e+"`.");for(o="",s=1,u=0;u<e.length;u++)if(r=e[u],Ze(r))o+=r;else{if(i=r.precision!==void 0,r=Ye(r),!r.specifier)throw new TypeError("invalid argument. Token is missing `specifier` property. Index: `"+u+"`. Value: `"+r+"`.");for(r.mapping&&(s=r.mapping),a=r.flags,g=0;g<a.length;g++)switch(n=a.charAt(g),n){case" ":r.sign=" ";break;case"+":r.sign="+";break;case"-":r.padRight=!0,r.padZeros=!1;break;case"0":r.padZeros=a.indexOf("-")<0;break;case"#":r.alternate=!0;break;default:throw new Error("invalid flag: "+n)}if(r.width==="*"){if(r.width=parseInt(arguments[s],10),s+=1,S(r.width))throw new TypeError("the argument for * width at position "+s+" is not a number. Value: `"+r.width+"`.");r.width<0&&(r.padRight=!0,r.width=-r.width)}if(i&&r.precision==="*"){if(r.precision=parseInt(arguments[s],10),s+=1,S(r.precision))throw new TypeError("the argument for * precision at position "+s+" is not a number. Value: `"+r.precision+"`.");r.precision<0&&(r.precision=1,i=!1)}switch(r.arg=arguments[s],r.specifier){case"b":case"o":case"x":case"X":case"d":case"i":case"u":i&&(r.padZeros=!1),r.arg=Qe(r);break;case"s":r.maxWidth=i?r.precision:-1,r.arg=String(r.arg);break;case"c":if(!S(r.arg)){if(c=parseInt(r.arg,10),c<0||c>127)throw new Error("invalid character code. Value: "+r.arg);r.arg=S(c)?String(r.arg):He(c)}break;case"e":case"E":case"f":case"F":case"g":case"G":i||(r.precision=6),r.arg=Xe(r);break;default:throw new Error("invalid specifier: "+r.specifier)}r.maxWidth>=0&&r.arg.length>r.maxWidth&&(r.arg=r.arg.substring(0,r.maxWidth)),r.padZeros?r.arg=Me(r.arg,r.width||r.precision,r.padRight):r.width&&(r.arg=We(r.arg,r.width,r.padRight)),o+=r.arg||"",s+=1}return o}var Ke=Je;/**
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
*/var ke=Ke,er=ke;/**
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
*/var _=/%(?:([1-9]\d*)\$)?([0 +\-#]*)(\*|\d+)?(?:(\.)(\*|\d+)?)?[hlL]?([%A-Za-z])/g;function rr(e){var i={mapping:e[1]?parseInt(e[1],10):void 0,flags:e[2],width:e[3],precision:e[5],specifier:e[6]};return e[4]==="."&&e[5]===void 0&&(i.precision="1"),i}function ar(e){var i,a,r,n;for(a=[],n=0,r=_.exec(e);r;)i=e.slice(n,_.lastIndex-r[0].length),i.length&&a.push(i),a.push(rr(r)),n=_.lastIndex,r=_.exec(e);return i=e.slice(n),i.length&&a.push(i),a}var ir=ar;/**
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
*/var tr=ir,nr=tr;/**
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
*/function sr(e){return typeof e=="string"}var or=sr;/**
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
*/var lr=er,cr=nr,fr=or;function J(e){var i,a;if(!fr(e))throw new TypeError(J("invalid argument. First argument must be a string. Value: `%s`.",e));for(i=[cr(e)],a=1;a<arguments.length;a++)i.push(arguments[a]);return lr.apply(null,i)}var ur=J;/**
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
*/var vr=ur,K=vr;/**
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
*/var D=K,h=Object.prototype,L=h.toString,Q=h.__defineGetter__,Z=h.__defineSetter__,pr=h.__lookupGetter__,gr=h.__lookupSetter__;function dr(e,i,a){var r,n,c,o;if(typeof e!="object"||e===null||L.call(e)==="[object Array]")throw new TypeError(D("invalid argument. First argument must be an object. Value: `%s`.",e));if(typeof a!="object"||a===null||L.call(a)==="[object Array]")throw new TypeError(D("invalid argument. Property descriptor must be an object. Value: `%s`.",a));if(n="value"in a,n&&(pr.call(e,i)||gr.call(e,i)?(r=e.__proto__,e.__proto__=h,delete e[i],e[i]=a.value,e.__proto__=r):e[i]=a.value),c="get"in a,o="set"in a,n&&(c||o))throw new Error("invalid argument. Cannot specify one or more accessors and a value or writable attribute in the property descriptor.");return c&&Q&&Q.call(e,i,a.get),o&&Z&&Z.call(e,i,a.set),e}var hr=dr;/**
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
*/var mr=me,br=$e,$r=hr,O;mr()?O=br:O=$r;var wr=O;/**
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
*/var yr=wr;function Sr(e,i,a){yr(e,i,{configurable:!1,enumerable:!1,writable:!1,value:a})}var _r=Sr;/**
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
*/var Er=_r,xr=Er;/**
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
*/function Cr(e){return typeof e=="boolean"}var k=Cr;/**
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
*/function Tr(){return typeof Symbol=="function"&&typeof Symbol("foo")=="symbol"}var Pr=Tr;/**
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
*/var jr=Pr,Rr=jr;/**
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
*/var Or=Rr,Ar=Or();function Nr(){return Ar&&typeof Symbol.toStringTag=="symbol"}var Ir=Nr;/**
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
*/var zr=Ir,ee=zr;/**
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
*/var Gr=Object.prototype.toString,re=Gr;/**
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
*/var Fr=re;function qr(e){return Fr.call(e)}var Br=qr;/**
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
*/var Vr=Object.prototype.hasOwnProperty;function Dr(e,i){return e==null?!1:Vr.call(e,i)}var Lr=Dr;/**
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
*/var Qr=Lr,Zr=Qr;/**
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
*/var Xr=typeof Symbol=="function"?Symbol:void 0,Wr=Xr;/**
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
*/var Mr=Wr,Hr=Mr;/**
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
*/var X=Hr,Ur=typeof X=="function"?X.toStringTag:"",Yr=Ur;/**
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
*/var Jr=Zr,m=Yr,R=re;function Kr(e){var i,a,r;if(e==null)return R.call(e);a=e[m],i=Jr(e,m);try{e[m]=void 0}catch{return R.call(e)}return r=R.call(e),i?e[m]=a:delete e[m],r}var kr=Kr;/**
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
*/var ea=ee,ra=Br,aa=kr,A;ea()?A=aa:A=ra;var ia=A;/**
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
*/var ta=Boolean,na=ta;/**
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
*/var sa=na,oa=sa;/**
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
*/var la=Boolean.prototype.toString,ca=la;/**
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
*/var fa=ca;function ua(e){try{return fa.call(e),!0}catch{return!1}}var va=ua;/**
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
*/var pa=ee,ga=ia,da=oa,ha=va,ma=pa();function ba(e){return typeof e=="object"?e instanceof da?!0:ma?ha(e):ga(e)==="[object Boolean]":!1}var ae=ba;/**
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
*/var $a=k,wa=ae;function ya(e){return $a(e)||wa(e)}var Sa=ya;/**
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
*/var ie=xr,N=Sa,_a=k,Ea=ae;ie(N,"isPrimitive",_a);ie(N,"isObject",Ea);var xa=N;/**
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
*/function Ca(){return new Function("return this;")()}var Ta=Ca;/**
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
*/var Pa=typeof self=="object"?self:null,ja=Pa;/**
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
*/var Ra=typeof window=="object"?window:null,Oa=Ra;/**
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
*/var Aa=typeof globalThis=="object"?globalThis:null,Na=Aa;/**
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
*/var Ia=xa.isPrimitive,za=K,Ga=Ta,W=ja,M=Oa,H=Na;function Fa(e){if(arguments.length){if(!Ia(e))throw new TypeError(za("invalid argument. Must provide a boolean. Value: `%s`.",e));if(e)return Ga()}if(H)return H;if(W)return W;if(M)return M;throw new Error("unexpected error. Unable to resolve global object.")}var qa=Fa;const Ba=ce(qa),b=Ba();function Ma({children:e,title:i,group:a,question:r,options:n,explanation:c,index:o}){let s=null;const{setTotalQuestions:u,setCorrectAnswers:g}=f.useContext(ve),E=f.useRef(null),[d,$]=f.useState("untouched"),[x,C]=f.useState(void 0),[w,te]=f.useState(!1),[I,ne]=f.useState(c),se=()=>{const t=document.querySelectorAll("main .challenge"),v=document.querySelectorAll("main .challenge.correct");u(t?.length),g(v?.length)};f.useEffect(()=>{s||(s=P(b?.location.pathname))},[b?.location?.pathname]),f.useEffect(()=>{s||(s=P(b?.location.pathname)),s&&s.addQuestion({title:i,group:a,question:r,index:o})},[s,i,a,r,n,c]),f.useEffect(()=>{const t=s?.isCorrect({index:o})??void 0;C(t),$(t===!0?"correct":t===!1?"incorrect":"")},[]);const oe=(t,v)=>{const y=b?.posthog;y&&y.capture(t,v)},le=t=>{console.log("Answering question:",i,r,t),s||(s=P(b?.location.pathname)),s?.answerQuestion({index:o},t),t.isAnswer?(C(!0),$("correct pulse")):(C(!1),$("incorrect shake")),oe("QuizAnswer",{isCorrect:t.isAnswer,option:t,question:r||"",title:i,questionIndex:o}),setTimeout(se,20)};f.useEffect(()=>{const t=d.includes("shake")||d.includes("pulse");if(d&&t){const v=d.split(" ").filter(y=>!["shake","pulse"].includes(y));setTimeout(()=>{$(v.join(" "))},1e3)}},[d]),f.useEffect(()=>{if(E.current){const t=E.current.querySelector("div.explanation")?.innerHTML;t&&ne(t)}},[I]);const T=(o??0)+1;n.filter(t=>t.isAnswer).length===0&&console.error("No correct answers found for question:",r,i,n);const z=n.map(t=>{const v=x&&t.isAnswer;return x&&!t.isAnswer?null:l.jsx("a",{className:fe("option",{"correct-answer":v}),onClick:()=>!x&&le(t),children:l.jsx("label",{children:t.text})},t.text)}).filter(Boolean);return l.jsxs("div",{id:`qq-${T}`,className:j("challenge",d),ref:E,children:[l.jsxs("div",{className:"quiz-header",children:[l.jsxs("div",{className:"quiz-question-count",children:[l.jsxs("a",{href:`#qq-${T}`,children:[T,"."]})," "]}),l.jsx("h2",{className:"quiz-title",id:ue(i),children:a})]}),l.jsx("div",{className:"quiz-question",children:r||e}),l.jsx("aside",{className:"quiz-hint-toggle",children:l.jsxs("button",{onClick:()=>te(!w),className:j("hint-toggle",{open:w}),children:[w?"Hide":"Show"," Explainer"," "]})}),l.jsxs("section",{className:j("quiz-body-panel","card-container",{"card-flip":w}),style:{height:`${80*z.length}px`,transition:"height 0.2s ease-in-out"},children:[l.jsx("section",{className:"quiz-options card card-front",children:z}),l.jsx("section",{className:"explanation card card-back ",children:l.jsx("p",{className:"help-box",dangerouslySetInnerHTML:{__html:I}})})]})]})}export{Ma as default};
