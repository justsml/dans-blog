import{Q as q}from"./QuestionStore.DoXL2Hea.js";import"./hoisted.ZmSVZ1iE.js";import"./hoisted.CfthDVfd.js";import"./_commonjsHelpers.Cpj98o6Y.js";import"./router.B-sij-_X.js";let c=null,p=0;window.__updateCounts=()=>{const e=document.querySelectorAll(".quiz-ui"),t=document.querySelectorAll("main .challenge");if(!(e.length>0)||t.length<=0)return!1;const l=document.querySelectorAll(".score"),o=l[0],f=document.querySelector(".score-wrapper"),i=document.querySelector(".score label"),r=document.querySelectorAll("main .challenge.correct"),a=document.querySelector(".congrats-message"),d=m(),s=d?d.sumOfTries():w(),u=t.length===r.length&&s===t.length;if(o?.parentNode?.nodeName!=="BODY"&&document.body.appendChild(o),u&&(o?.classList.add("perfect"),e[0].classList.add("perfect")),l.length>=2&&console.error("Multiple score elements found"),!i)return console.error("Expected score label, not found"),!1;if(r.length>0&&l[0].classList.add("active"),t.length===r.length){if(o.classList.add("all-correct"),a){const h=u?"WOW! Perfect!":"All correct!",g=u?"h2":"h3";a.innerHTML=`<${g}>${h} ${r.length} / ${t.length} ${s>0?`<sup>(${s} tries)</sup>`:""}</${g}>`}f?.classList.toggle("pulse"),o?.classList.add("success")}else i.innerHTML=`${r.length} / ${t.length} ${s>0?`<sup>(${s} tries)</sup>`:""}`;return!0};function m(){const e=q(window.location.pathname);return e||null}document.addEventListener("astro:page-load",function(){const e=document.querySelector(".quiz-ui");if(e){const t=m(),n=document.querySelector("button.reset-quiz");n&&n.addEventListener("click",()=>{console.log("Resetting quiz state for",location.pathname),t?.reset(),location.reload()}),c=setInterval(()=>{if(p++,window.__updateCounts(),p>12){clearInterval(c);return}},100),e.addEventListener("mousedown",()=>{clearInterval(c)},{once:!0}),e.addEventListener("click",()=>{clearInterval(c),window.__updateCounts()})}});function w(){return[...document.querySelectorAll("[data-answer-count")].reduce((e,t)=>{const n=parseInt(t.getAttribute("data-answer-count")||"0",10);return e+n},0)}