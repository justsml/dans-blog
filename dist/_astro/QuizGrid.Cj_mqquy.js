import{j as e}from"./jsx-runtime.vlAWDSmm.js";import{B as v}from"./index.C5zVmnY3.js";import{P as O,a as w,b as B}from"./popover.C6hFTEj_.js";import{r as l}from"./index.BwNzhqGF.js";import{s as j}from"./pathHelpers.kwYD5byA.js";import{c as z}from"./clsx.B-dksMZM.js";import{Q as D}from"./QuestionStore.DoXL2Hea.js";import"./index.DmAWNlUL.js";import"./_commonjsHelpers.Cpj98o6Y.js";function P(r){const[t,c]=l.useState([]);l.useEffect(()=>{r?.onSearchChange?.(t)},[t]);const o=a=>{if(a=j(a),t.includes(a)){c(t.filter(s=>s!==a)),r?.onSearchChange?.(t);return}c([...t,a]),r?.onSearchChange?.(t)},n=({children:a,className:s=""})=>{const i=j(a),u=t.includes(i)||t.includes(a),f=(u?"open-":"closed-")+i;return e.jsx("div",{className:z({selectedItem:u},s,f," flex-wrap items-center justify-between"),children:e.jsx(v,{onClick:()=>o(i),variant:u?"default":"secondary",children:a})})};return e.jsxs(O,{children:[e.jsx(w,{asChild:!0,className:"toggle-filters",children:e.jsx(v,{variant:"outline",children:"Filters "})}),e.jsx(B,{className:"w-80",children:e.jsx("div",{className:"grid gap-2",children:e.jsx("div",{className:"p-4",children:e.jsxs("div",{className:"mt-4 space-y-2 inline-flex justify-start align-top place-self-start",children:[e.jsxs("section",{className:"tag-filters skill-level inline-grid mx-4 gap-4 self-end justify-center",children:[e.jsx(n,{children:"Beginner"}),e.jsx(n,{children:"Intermediate"}),e.jsx(n,{children:"Advanced"})]}),e.jsxs("section",{className:"hidden status-filters mx-4 gap-4 self-end justify-center",children:[e.jsx(n,{children:"Not Started"}),e.jsx(n,{children:"Started"}),e.jsx(n,{children:"Complete"})]})]})})})})]})}const k=({article:r,className:t})=>{const c=r.slug,{index:o,title:n,subCategory:a,label:s,draft:i,date:u,modified:f,tags:p}=r.data,[d,b]=l.useState(0),[q,y]=l.useState(0),[g,Q]=l.useState(0);let C=`cat-${j(a)}`;i&&(C+=" draft");const T="quiz-card",m=r.data.questionCount??q;l.useEffect(()=>{const x=D(c);b(x.correct()),y(x.total()),Q(x.sumOfTries())},[c,d]);const h=d===m,N=d/m,S=g>0||d>0,E=h?{order:-1}:{};return e.jsx("div",{style:{"--quiz-index":o,"--percent-completed":Number.isNaN(N)?0:N,...E},className:z(T,C,t,{completed:h,started:S}),children:e.jsxs("a",{href:`/${c}/`,className:"quiz-card-inner","data-created":u,"data-modified":f,children:[e.jsx("label",{className:"small-label",title:p&&p.join(", "),children:e.jsx("b",{children:a})}),e.jsx("h2",{className:"post-title","aria-description":n.replace("Quiz: ",""),children:s}),h?e.jsxs("div",{className:"quiz-status",children:[e.jsx("span",{className:"status-icon",children:"✅ "}),e.jsx("span",{className:"status-text",children:" Completed"})]}):S?e.jsxs("p",{title:"in "+(g??0)+" tries",children:[(d??0)<1?"Zero":d," correct of"," ",m]}):e.jsxs("p",{children:[m," questions - click to begin!"]})]})})},J=({quizList:r})=>{const[t,c]=l.useState(r),[o,n]=l.useState([]),a=s=>{n(s)};return t.forEach(s=>{s.data.tags=s.data.tags.map(i=>i.toLowerCase())}),l.useEffect(()=>{o.length>0?c(t.filter(({data:{tags:s}})=>o.some(i=>s.includes(i)))):c(r)},[o]),e.jsxs("section",{className:"quiz-grid",children:[e.jsx("div",{className:"filter-toolbar",children:e.jsx(P,{onOpenChange:console.log,onSearchChange:a})}),e.jsx("div",{className:"quiz-list",children:t.filter(({data:{hidden:s}})=>s!==!0).map((s,i)=>e.jsx(k,{className:"tilt-effect",article:s},i))})]})};export{J as QuizGrid};