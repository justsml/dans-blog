import{j as l}from"./jsx-runtime.B6Q2Q8rY.js";import{r as f,g as cr}from"./index.caxmlYbZ.js";import{c as fr}from"./index.BgZf5yFv.js";import{s as ur}from"./pathHelpers.DmToPstD.js";import{Q as P}from"./QuestionStore.Cfbsl7zP.js";import{c as j}from"./clsx.B-dksMZM.js";const vr=f.createContext({answers:[],setAnswers:()=>{},currentChallenge:0,setCurrentChallenge:()=>{},totalQuestions:0,setTotalQuestions:()=>{},correctAnswers:0,setCorrectAnswers:()=>{}});/**
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
*/var pr=typeof Object.defineProperty=="function"?Object.defineProperty:null,gr=pr;/**
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
*/var dr=gr;function hr(){try{return dr({},"x",{}),!0}catch{return!1}}var mr=hr;/**
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
*/var br=Object.defineProperty,$r=br;/**
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
*/function wr(r){return typeof r=="number"}var U=wr;/**
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
*/function yr(r){return r[0]==="-"}function G(r){var i="",a;for(a=0;a<r;a++)i+="0";return i}function Sr(r,i,a){var e=!1,n=i-r.length;return n<0||(yr(r)&&(e=!0,r=r.substr(1)),r=a?r+G(n):G(n)+r,e&&(r="-"+r)),r}var Y=Sr;/**
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
*/var _r=U,F=Y,Er=String.prototype.toLowerCase,q=String.prototype.toUpperCase;function xr(r){var i,a,e;switch(r.specifier){case"b":i=2;break;case"o":i=8;break;case"x":case"X":i=16;break;case"d":case"i":case"u":default:i=10;break}if(a=r.arg,e=parseInt(a,10),!isFinite(e)){if(!_r(a))throw new Error("invalid integer. Value: "+a);e=0}return e<0&&(r.specifier==="u"||i!==10)&&(e=4294967295+e+1),e<0?(a=(-e).toString(i),r.precision&&(a=F(a,r.precision,r.padRight)),a="-"+a):(a=e.toString(i),!e&&!r.precision?a="":r.precision&&(a=F(a,r.precision,r.padRight)),r.sign&&(a=r.sign+a)),i===16&&(r.alternate&&(a="0x"+a),a=r.specifier===q.call(r.specifier)?q.call(a):Er.call(a)),i===8&&r.alternate&&a.charAt(0)!=="0"&&(a="0"+a),a}var Cr=xr;/**
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
*/function Tr(r){return typeof r=="string"}var Pr=Tr;/**
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
*/var jr=U,Rr=Math.abs,Or=String.prototype.toLowerCase,B=String.prototype.toUpperCase,p=String.prototype.replace,Ar=/e\+(\d)$/,Nr=/e-(\d)$/,Ir=/^(\d+)$/,zr=/^(\d+)e/,Gr=/\.0$/,Fr=/\.0*e/,qr=/(\..*[^0])0*e/;function Br(r){var i,a,e=parseFloat(r.arg);if(!isFinite(e)){if(!jr(r.arg))throw new Error("invalid floating-point number. Value: "+a);e=r.arg}switch(r.specifier){case"e":case"E":a=e.toExponential(r.precision);break;case"f":case"F":a=e.toFixed(r.precision);break;case"g":case"G":Rr(e)<1e-4?(i=r.precision,i>0&&(i-=1),a=e.toExponential(i)):a=e.toPrecision(r.precision),r.alternate||(a=p.call(a,qr,"$1e"),a=p.call(a,Fr,"e"),a=p.call(a,Gr,""));break;default:throw new Error("invalid double notation. Value: "+r.specifier)}return a=p.call(a,Ar,"e+0$1"),a=p.call(a,Nr,"e-0$1"),r.alternate&&(a=p.call(a,Ir,"$1."),a=p.call(a,zr,"$1.e")),e>=0&&r.sign&&(a=r.sign+a),a=r.specifier===B.call(r.specifier)?B.call(a):Or.call(a),a}var Vr=Br;/**
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
*/function V(r){var i="",a;for(a=0;a<r;a++)i+=" ";return i}function Dr(r,i,a){var e=i-r.length;return e<0||(r=a?r+V(e):V(e)+r),r}var Lr=Dr;/**
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
*/var Qr=Cr,Zr=Pr,Xr=Vr,Wr=Lr,Mr=Y,Hr=String.fromCharCode,Ur=Array.isArray;function S(r){return r!==r}function Yr(r){var i={};return i.specifier=r.specifier,i.precision=r.precision===void 0?1:r.precision,i.width=r.width,i.flags=r.flags||"",i.mapping=r.mapping,i}function Jr(r){var i,a,e,n,c,o,s,u,g;if(!Ur(r))throw new TypeError("invalid argument. First argument must be an array. Value: `"+r+"`.");for(o="",s=1,u=0;u<r.length;u++)if(e=r[u],Zr(e))o+=e;else{if(i=e.precision!==void 0,e=Yr(e),!e.specifier)throw new TypeError("invalid argument. Token is missing `specifier` property. Index: `"+u+"`. Value: `"+e+"`.");for(e.mapping&&(s=e.mapping),a=e.flags,g=0;g<a.length;g++)switch(n=a.charAt(g),n){case" ":e.sign=" ";break;case"+":e.sign="+";break;case"-":e.padRight=!0,e.padZeros=!1;break;case"0":e.padZeros=a.indexOf("-")<0;break;case"#":e.alternate=!0;break;default:throw new Error("invalid flag: "+n)}if(e.width==="*"){if(e.width=parseInt(arguments[s],10),s+=1,S(e.width))throw new TypeError("the argument for * width at position "+s+" is not a number. Value: `"+e.width+"`.");e.width<0&&(e.padRight=!0,e.width=-e.width)}if(i&&e.precision==="*"){if(e.precision=parseInt(arguments[s],10),s+=1,S(e.precision))throw new TypeError("the argument for * precision at position "+s+" is not a number. Value: `"+e.precision+"`.");e.precision<0&&(e.precision=1,i=!1)}switch(e.arg=arguments[s],e.specifier){case"b":case"o":case"x":case"X":case"d":case"i":case"u":i&&(e.padZeros=!1),e.arg=Qr(e);break;case"s":e.maxWidth=i?e.precision:-1,e.arg=String(e.arg);break;case"c":if(!S(e.arg)){if(c=parseInt(e.arg,10),c<0||c>127)throw new Error("invalid character code. Value: "+e.arg);e.arg=S(c)?String(e.arg):Hr(c)}break;case"e":case"E":case"f":case"F":case"g":case"G":i||(e.precision=6),e.arg=Xr(e);break;default:throw new Error("invalid specifier: "+e.specifier)}e.maxWidth>=0&&e.arg.length>e.maxWidth&&(e.arg=e.arg.substring(0,e.maxWidth)),e.padZeros?e.arg=Mr(e.arg,e.width||e.precision,e.padRight):e.width&&(e.arg=Wr(e.arg,e.width,e.padRight)),o+=e.arg||"",s+=1}return o}var Kr=Jr;/**
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
*/var kr=Kr,re=kr;/**
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
*/var _=/%(?:([1-9]\d*)\$)?([0 +\-#]*)(\*|\d+)?(?:(\.)(\*|\d+)?)?[hlL]?([%A-Za-z])/g;function ee(r){var i={mapping:r[1]?parseInt(r[1],10):void 0,flags:r[2],width:r[3],precision:r[5],specifier:r[6]};return r[4]==="."&&r[5]===void 0&&(i.precision="1"),i}function ae(r){var i,a,e,n;for(a=[],n=0,e=_.exec(r);e;)i=r.slice(n,_.lastIndex-e[0].length),i.length&&a.push(i),a.push(ee(e)),n=_.lastIndex,e=_.exec(r);return i=r.slice(n),i.length&&a.push(i),a}var ie=ae;/**
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
*/var te=ie,ne=te;/**
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
*/function se(r){return typeof r=="string"}var oe=se;/**
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
*/var le=re,ce=ne,fe=oe;function J(r){var i,a;if(!fe(r))throw new TypeError(J("invalid argument. First argument must be a string. Value: `%s`.",r));for(i=[ce(r)],a=1;a<arguments.length;a++)i.push(arguments[a]);return le.apply(null,i)}var ue=J;/**
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
*/var ve=ue,K=ve;/**
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
*/var D=K,h=Object.prototype,L=h.toString,Q=h.__defineGetter__,Z=h.__defineSetter__,pe=h.__lookupGetter__,ge=h.__lookupSetter__;function de(r,i,a){var e,n,c,o;if(typeof r!="object"||r===null||L.call(r)==="[object Array]")throw new TypeError(D("invalid argument. First argument must be an object. Value: `%s`.",r));if(typeof a!="object"||a===null||L.call(a)==="[object Array]")throw new TypeError(D("invalid argument. Property descriptor must be an object. Value: `%s`.",a));if(n="value"in a,n&&(pe.call(r,i)||ge.call(r,i)?(e=r.__proto__,r.__proto__=h,delete r[i],r[i]=a.value,r.__proto__=e):r[i]=a.value),c="get"in a,o="set"in a,n&&(c||o))throw new Error("invalid argument. Cannot specify one or more accessors and a value or writable attribute in the property descriptor.");return c&&Q&&Q.call(r,i,a.get),o&&Z&&Z.call(r,i,a.set),r}var he=de;/**
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
*/var me=mr,be=$r,$e=he,O;me()?O=be:O=$e;var we=O;/**
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
*/var ye=we;function Se(r,i,a){ye(r,i,{configurable:!1,enumerable:!1,writable:!1,value:a})}var _e=Se;/**
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
*/var Ee=_e,xe=Ee;/**
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
*/function Ce(r){return typeof r=="boolean"}var k=Ce;/**
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
*/function Te(){return typeof Symbol=="function"&&typeof Symbol("foo")=="symbol"}var Pe=Te;/**
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
*/var je=Pe,Re=je;/**
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
*/var Oe=Re,Ae=Oe();function Ne(){return Ae&&typeof Symbol.toStringTag=="symbol"}var Ie=Ne;/**
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
*/var ze=Ie,rr=ze;/**
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
*/var Ge=Object.prototype.toString,er=Ge;/**
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
*/var Fe=er;function qe(r){return Fe.call(r)}var Be=qe;/**
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
*/var Ve=Object.prototype.hasOwnProperty;function De(r,i){return r==null?!1:Ve.call(r,i)}var Le=De;/**
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
*/var Qe=Le,Ze=Qe;/**
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
*/var Xe=typeof Symbol=="function"?Symbol:void 0,We=Xe;/**
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
*/var Me=We,He=Me;/**
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
*/var X=He,Ue=typeof X=="function"?X.toStringTag:"",Ye=Ue;/**
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
*/var Je=Ze,m=Ye,R=er;function Ke(r){var i,a,e;if(r==null)return R.call(r);a=r[m],i=Je(r,m);try{r[m]=void 0}catch{return R.call(r)}return e=R.call(r),i?r[m]=a:delete r[m],e}var ke=Ke;/**
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
*/var ra=rr,ea=Be,aa=ke,A;ra()?A=aa:A=ea;var ia=A;/**
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
*/var fa=ca;function ua(r){try{return fa.call(r),!0}catch{return!1}}var va=ua;/**
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
*/var pa=rr,ga=ia,da=oa,ha=va,ma=pa();function ba(r){return typeof r=="object"?r instanceof da?!0:ma?ha(r):ga(r)==="[object Boolean]":!1}var ar=ba;/**
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
*/var $a=k,wa=ar;function ya(r){return $a(r)||wa(r)}var Sa=ya;/**
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
*/var ir=xe,N=Sa,_a=k,Ea=ar;ir(N,"isPrimitive",_a);ir(N,"isObject",Ea);var xa=N;/**
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
*/var Ia=xa.isPrimitive,za=K,Ga=Ta,W=ja,M=Oa,H=Na;function Fa(r){if(arguments.length){if(!Ia(r))throw new TypeError(za("invalid argument. Must provide a boolean. Value: `%s`.",r));if(r)return Ga()}if(H)return H;if(W)return W;if(M)return M;throw new Error("unexpected error. Unable to resolve global object.")}var qa=Fa;const Ba=cr(qa),b=Ba();function Ma({children:r,title:i,group:a,question:e,options:n,explanation:c,index:o}){let s=null;const{setTotalQuestions:u,setCorrectAnswers:g}=f.useContext(vr),E=f.useRef(null),[d,$]=f.useState("untouched"),[x,C]=f.useState(void 0),[w,tr]=f.useState(!1),[I,nr]=f.useState(c),sr=()=>{const t=document.querySelectorAll("main .challenge"),v=document.querySelectorAll("main .challenge.correct");u(t?.length),g(v?.length)};f.useEffect(()=>{s||(s=P(b?.location.pathname))},[b?.location?.pathname]),f.useEffect(()=>{s||(s=P(b?.location.pathname)),s&&s.addQuestion({title:i,group:a,question:e,index:o})},[s,i,a,e,n,c]),f.useEffect(()=>{const t=s?.isCorrect({index:o})??void 0;C(t),$(t===!0?"correct":t===!1?"incorrect":"")},[]);const or=(t,v)=>{const y=b?.posthog;y&&y.capture(t,v)},lr=t=>{console.log("Answering question:",i,e,t),s||(s=P(b?.location.pathname)),s?.answerQuestion({index:o},t),t.isAnswer?(C(!0),$("correct pulse")):(C(!1),$("incorrect shake")),or("QuizAnswer",{isCorrect:t.isAnswer,option:t,question:e||"",title:i,questionIndex:o}),setTimeout(sr,20)};f.useEffect(()=>{const t=d.includes("shake")||d.includes("pulse");if(d&&t){const v=d.split(" ").filter(y=>!["shake","pulse"].includes(y));setTimeout(()=>{$(v.join(" "))},1e3)}},[d]),f.useEffect(()=>{if(E.current){const t=E.current.querySelector("div.explanation")?.innerHTML;t&&nr(t)}},[I]);const T=(o??0)+1;n.filter(t=>t.isAnswer).length===0&&console.error("No correct answers found for question:",e,i,n);const z=n.map(t=>{const v=x&&t.isAnswer;return x&&!t.isAnswer?null:l.jsx("a",{className:fr("option",{"correct-answer":v}),onClick:()=>!x&&lr(t),children:l.jsx("label",{children:t.text})},t.text)}).filter(Boolean);return l.jsxs("div",{id:`qq-${T}`,className:j("challenge",d),ref:E,children:[l.jsxs("div",{className:"quiz-header",children:[l.jsxs("div",{className:"quiz-question-count",children:[l.jsxs("a",{href:`#qq-${T}`,children:[T,"."]})," "]}),l.jsx("h2",{className:"quiz-title",id:ur(i),children:i})]}),l.jsx("div",{className:"quiz-question",children:e||r}),l.jsx("aside",{className:"quiz-hint-toggle",children:l.jsxs("button",{onClick:()=>tr(!w),className:j("hint-toggle",{open:w}),children:[w?"Hide":"Show"," Explainer"," "]})}),l.jsxs("section",{className:j("quiz-body-panel","card-container",{"card-flip":w}),style:{height:`${80*z.length}px`,transition:"height 0.2s ease-in-out"},children:[l.jsx("section",{className:"quiz-options card card-front",children:z}),l.jsx("section",{className:"explanation card card-back ",children:l.jsx("p",{className:"help-box",dangerouslySetInnerHTML:{__html:I}})})]})]})}export{Ma as default};
