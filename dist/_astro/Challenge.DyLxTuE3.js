import{j as o}from"./jsx-runtime.B6Q2Q8rY.js";import{r as c,g as le}from"./index.caxmlYbZ.js";import{c as ce}from"./index.BgZf5yFv.js";import{s as ue}from"./pathHelpers.DmToPstD.js";import{Q as fe}from"./QuestionStore.DWFhWJsj.js";import{c as P}from"./clsx.B-dksMZM.js";const ve=c.createContext({answers:[],setAnswers:()=>{},currentChallenge:0,setCurrentChallenge:()=>{},totalQuestions:0,setTotalQuestions:()=>{},correctAnswers:0,setCorrectAnswers:()=>{}});/**
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
*/function ye(e){return typeof e=="number"}var H=ye;/**
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
*/function we(e){return e[0]==="-"}function N(e){var i="",a;for(a=0;a<e;a++)i+="0";return i}function Se(e,i,a){var r=!1,n=i-e.length;return n<0||(we(e)&&(r=!0,e=e.substr(1)),e=a?e+N(n):N(n)+e,r&&(e="-"+e)),e}var U=Se;/**
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
*/var _e=H,z=U,Ee=String.prototype.toLowerCase,G=String.prototype.toUpperCase;function xe(e){var i,a,r;switch(e.specifier){case"b":i=2;break;case"o":i=8;break;case"x":case"X":i=16;break;case"d":case"i":case"u":default:i=10;break}if(a=e.arg,r=parseInt(a,10),!isFinite(r)){if(!_e(a))throw new Error("invalid integer. Value: "+a);r=0}return r<0&&(e.specifier==="u"||i!==10)&&(r=4294967295+r+1),r<0?(a=(-r).toString(i),e.precision&&(a=z(a,e.precision,e.padRight)),a="-"+a):(a=r.toString(i),!r&&!e.precision?a="":e.precision&&(a=z(a,e.precision,e.padRight)),e.sign&&(a=e.sign+a)),i===16&&(e.alternate&&(a="0x"+a),a=e.specifier===G.call(e.specifier)?G.call(a):Ee.call(a)),i===8&&e.alternate&&a.charAt(0)!=="0"&&(a="0"+a),a}var Te=xe;/**
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
*/function Ce(e){return typeof e=="string"}var Pe=Ce;/**
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
*/var je=H,Re=Math.abs,Oe=String.prototype.toLowerCase,B=String.prototype.toUpperCase,p=String.prototype.replace,Ie=/e\+(\d)$/,Ae=/e-(\d)$/,qe=/^(\d+)$/,Ne=/^(\d+)e/,ze=/\.0$/,Ge=/\.0*e/,Be=/(\..*[^0])0*e/;function Fe(e){var i,a,r=parseFloat(e.arg);if(!isFinite(r)){if(!je(e.arg))throw new Error("invalid floating-point number. Value: "+a);r=e.arg}switch(e.specifier){case"e":case"E":a=r.toExponential(e.precision);break;case"f":case"F":a=r.toFixed(e.precision);break;case"g":case"G":Re(r)<1e-4?(i=e.precision,i>0&&(i-=1),a=r.toExponential(i)):a=r.toPrecision(e.precision),e.alternate||(a=p.call(a,Be,"$1e"),a=p.call(a,Ge,"e"),a=p.call(a,ze,""));break;default:throw new Error("invalid double notation. Value: "+e.specifier)}return a=p.call(a,Ie,"e+0$1"),a=p.call(a,Ae,"e-0$1"),e.alternate&&(a=p.call(a,qe,"$1."),a=p.call(a,Ne,"$1.e")),r>=0&&e.sign&&(a=e.sign+a),a=e.specifier===B.call(e.specifier)?B.call(a):Oe.call(a),a}var Ve=Fe;/**
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
*/function F(e){var i="",a;for(a=0;a<e;a++)i+=" ";return i}function De(e,i,a){var r=i-e.length;return r<0||(e=a?e+F(r):F(r)+e),e}var Qe=De;/**
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
*/var Le=Te,Ze=Pe,Xe=Ve,We=Qe,Me=U,He=String.fromCharCode,Ue=Array.isArray;function S(e){return e!==e}function Ye(e){var i={};return i.specifier=e.specifier,i.precision=e.precision===void 0?1:e.precision,i.width=e.width,i.flags=e.flags||"",i.mapping=e.mapping,i}function Je(e){var i,a,r,n,l,u,s,f,g;if(!Ue(e))throw new TypeError("invalid argument. First argument must be an array. Value: `"+e+"`.");for(u="",s=1,f=0;f<e.length;f++)if(r=e[f],Ze(r))u+=r;else{if(i=r.precision!==void 0,r=Ye(r),!r.specifier)throw new TypeError("invalid argument. Token is missing `specifier` property. Index: `"+f+"`. Value: `"+r+"`.");for(r.mapping&&(s=r.mapping),a=r.flags,g=0;g<a.length;g++)switch(n=a.charAt(g),n){case" ":r.sign=" ";break;case"+":r.sign="+";break;case"-":r.padRight=!0,r.padZeros=!1;break;case"0":r.padZeros=a.indexOf("-")<0;break;case"#":r.alternate=!0;break;default:throw new Error("invalid flag: "+n)}if(r.width==="*"){if(r.width=parseInt(arguments[s],10),s+=1,S(r.width))throw new TypeError("the argument for * width at position "+s+" is not a number. Value: `"+r.width+"`.");r.width<0&&(r.padRight=!0,r.width=-r.width)}if(i&&r.precision==="*"){if(r.precision=parseInt(arguments[s],10),s+=1,S(r.precision))throw new TypeError("the argument for * precision at position "+s+" is not a number. Value: `"+r.precision+"`.");r.precision<0&&(r.precision=1,i=!1)}switch(r.arg=arguments[s],r.specifier){case"b":case"o":case"x":case"X":case"d":case"i":case"u":i&&(r.padZeros=!1),r.arg=Le(r);break;case"s":r.maxWidth=i?r.precision:-1,r.arg=String(r.arg);break;case"c":if(!S(r.arg)){if(l=parseInt(r.arg,10),l<0||l>127)throw new Error("invalid character code. Value: "+r.arg);r.arg=S(l)?String(r.arg):He(l)}break;case"e":case"E":case"f":case"F":case"g":case"G":i||(r.precision=6),r.arg=Xe(r);break;default:throw new Error("invalid specifier: "+r.specifier)}r.maxWidth>=0&&r.arg.length>r.maxWidth&&(r.arg=r.arg.substring(0,r.maxWidth)),r.padZeros?r.arg=Me(r.arg,r.width||r.precision,r.padRight):r.width&&(r.arg=We(r.arg,r.width,r.padRight)),u+=r.arg||"",s+=1}return u}var Ke=Je;/**
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
*/var lr=er,cr=nr,ur=or;function Y(e){var i,a;if(!ur(e))throw new TypeError(Y("invalid argument. First argument must be a string. Value: `%s`.",e));for(i=[cr(e)],a=1;a<arguments.length;a++)i.push(arguments[a]);return lr.apply(null,i)}var fr=Y;/**
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
*/var vr=fr,J=vr;/**
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
*/var V=J,m=Object.prototype,D=m.toString,Q=m.__defineGetter__,L=m.__defineSetter__,pr=m.__lookupGetter__,gr=m.__lookupSetter__;function dr(e,i,a){var r,n,l,u;if(typeof e!="object"||e===null||D.call(e)==="[object Array]")throw new TypeError(V("invalid argument. First argument must be an object. Value: `%s`.",e));if(typeof a!="object"||a===null||D.call(a)==="[object Array]")throw new TypeError(V("invalid argument. Property descriptor must be an object. Value: `%s`.",a));if(n="value"in a,n&&(pr.call(e,i)||gr.call(e,i)?(r=e.__proto__,e.__proto__=m,delete e[i],e[i]=a.value,e.__proto__=r):e[i]=a.value),l="get"in a,u="set"in a,n&&(l||u))throw new Error("invalid argument. Cannot specify one or more accessors and a value or writable attribute in the property descriptor.");return l&&Q&&Q.call(e,i,a.get),u&&L&&L.call(e,i,a.set),e}var hr=dr;/**
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
*/var mr=me,br=$e,$r=hr,R;mr()?R=br:R=$r;var yr=R;/**
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
*/var wr=yr;function Sr(e,i,a){wr(e,i,{configurable:!1,enumerable:!1,writable:!1,value:a})}var _r=Sr;/**
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
*/function Tr(e){return typeof e=="boolean"}var K=Tr;/**
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
*/function Cr(){return typeof Symbol=="function"&&typeof Symbol("foo")=="symbol"}var Pr=Cr;/**
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
*/var Or=Rr,Ir=Or();function Ar(){return Ir&&typeof Symbol.toStringTag=="symbol"}var qr=Ar;/**
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
*/var Nr=qr,k=Nr;/**
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
*/var zr=Object.prototype.toString,ee=zr;/**
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
*/var Gr=ee;function Br(e){return Gr.call(e)}var Fr=Br;/**
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
*/var Vr=Object.prototype.hasOwnProperty;function Dr(e,i){return e==null?!1:Vr.call(e,i)}var Qr=Dr;/**
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
*/var Lr=Qr,Zr=Lr;/**
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
*/var Z=Hr,Ur=typeof Z=="function"?Z.toStringTag:"",Yr=Ur;/**
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
*/var Jr=Zr,b=Yr,j=ee;function Kr(e){var i,a,r;if(e==null)return j.call(e);a=e[b],i=Jr(e,b);try{e[b]=void 0}catch{return j.call(e)}return r=j.call(e),i?e[b]=a:delete e[b],r}var kr=Kr;/**
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
*/var ea=k,ra=Fr,aa=kr,O;ea()?O=aa:O=ra;var ia=O;/**
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
*/var ua=ca;function fa(e){try{return ua.call(e),!0}catch{return!1}}var va=fa;/**
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
*/var pa=k,ga=ia,da=oa,ha=va,ma=pa();function ba(e){return typeof e=="object"?e instanceof da?!0:ma?ha(e):ga(e)==="[object Boolean]":!1}var re=ba;/**
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
*/var $a=K,ya=re;function wa(e){return $a(e)||ya(e)}var Sa=wa;/**
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
*/var ae=xr,I=Sa,_a=K,Ea=re;ae(I,"isPrimitive",_a);ae(I,"isObject",Ea);var xa=I;/**
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
*/function Ta(){return new Function("return this;")()}var Ca=Ta;/**
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
*/var Ia=typeof globalThis=="object"?globalThis:null,Aa=Ia;/**
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
*/var qa=xa.isPrimitive,Na=J,za=Ca,X=ja,W=Oa,M=Aa;function Ga(e){if(arguments.length){if(!qa(e))throw new TypeError(Na("invalid argument. Must provide a boolean. Value: `%s`.",e));if(e)return za()}if(M)return M;if(X)return X;if(W)return W;throw new Error("unexpected error. Unable to resolve global object.")}var Ba=Ga;const Fa=le(Ba),h=Fa();function Wa({children:e,title:i,group:a,question:r,options:n,explanation:l,index:u}){let s=null;const{setTotalQuestions:f,setCorrectAnswers:g}=c.useContext(ve),E=c.useRef(null),[d,$]=c.useState("untouched"),[x,T]=c.useState(void 0),[y,ie]=c.useState(!1),[A,te]=c.useState(l),ne=()=>{const t=document.querySelectorAll("main .challenge"),v=document.querySelectorAll("main .challenge.correct");f(t?.length),g(v?.length)};c.useEffect(()=>{h.__questionStoreBySlug||(h.__questionStoreBySlug={});let t=h.__questionStoreBySlug?.[location.pathname];t||(t=fe(location.pathname),h.__questionStoreBySlug[location.pathname]=t),s=t},[h?.location?.pathname]),c.useEffect(()=>{if(s){const t=s.addQuestion({title:i,group:a,question:r,options:n,explanation:l});console.log("Added question to store:",t,a,i)}else console.error("QuestionStore is not initialized")},[s,i,a,r,n,l]),c.useEffect(()=>{const t=s?.isCorrect({question:r,title:i})??void 0;console.log("Checking if we already answered this question:",t),console.log("Found cached answer:",t),T(t),$(t===!0?"correct":t===!1?"incorrect":"")},[]);const se=(t,v)=>{const w=h?.posthog;w&&w.capture(t,v)},oe=t=>{s?.answerQuestion({title:i,question:r||""},t),t.isAnswer?(T(!0),$("correct pulse")):(T(!1),$("incorrect shake")),se("QuizAnswer",{isCorrect:t.isAnswer,option:t,question:r||"",title:i,questionIndex:u}),setTimeout(ne,200)};c.useEffect(()=>{const t=d.includes("shake")||d.includes("pulse");if(d&&t){const v=d.split(" ").filter(w=>!["shake","pulse"].includes(w));setTimeout(()=>{$(v.join(" "))},1e3)}},[d]),c.useEffect(()=>{if(E.current){const t=E.current.querySelector("div.explanation")?.innerHTML;t&&te(t)}},[A]);const C=(u??0)+1,q=n.map(t=>{const v=x&&t.isAnswer;return x&&!t.isAnswer?null:o.jsx("a",{className:ce("option",{"correct-answer":v}),onClick:()=>!x&&oe(t),children:o.jsx("label",{children:t.text})},t.text)}).filter(Boolean);return o.jsxs("div",{id:`qq-${C}`,className:P("challenge",d),ref:E,children:[o.jsxs("div",{className:"quiz-header",children:[o.jsxs("div",{className:"quiz-question-count",children:[o.jsxs("a",{href:`#qq-${C}`,children:[C,"."]})," "]}),o.jsx("h2",{className:"quiz-title",id:ue(i),children:i})]}),o.jsx("div",{className:"quiz-question",children:r||e}),o.jsx("aside",{className:"quiz-hint-toggle",children:o.jsxs("button",{onClick:()=>ie(!y),className:P("hint-toggle",{open:y}),children:[y?"Hide":"Show"," Explainer"," "]})}),o.jsxs("section",{className:P("quiz-body-panel","card-container",{"card-flip":y}),style:{height:`${80*q.length}px`,transition:"height 0.2s ease-in-out"},children:[o.jsx("section",{className:"quiz-options card card-front",children:q}),o.jsx("section",{className:"explanation card card-back ",children:o.jsx("p",{className:"help-box",dangerouslySetInnerHTML:{__html:A}})})]})]})}export{Wa as default};
