function u(t){const e=Object.prototype.toString.call(t);return t instanceof Date||typeof t=="object"&&e==="[object Date]"?new t.constructor(+t):typeof t=="number"||e==="[object Number]"||typeof t=="string"||e==="[object String]"?new Date(t):new Date(NaN)}function w(t,e){const n=u(t),o=u(e),a=n.getTime()-o.getTime();return a<0?-1:a>0?1:a}const M=43200,D=1440;function S(t,e){const n=u(t),o=u(e),a=n.getFullYear()-o.getFullYear(),s=n.getMonth()-o.getMonth();return a*12+s}function W(t){const e=u(t);return e.setHours(23,59,59,999),e}function k(t){const e=u(t),n=e.getMonth();return e.setFullYear(e.getFullYear(),n+1,0),e.setHours(23,59,59,999),e}function F(t){const e=u(t);return+W(e)==+k(e)}function x(t,e){const n=u(t),o=u(e),a=w(n,o),s=Math.abs(S(n,o));let i;if(s<1)i=0;else{n.getMonth()===1&&n.getDate()>27&&n.setDate(30),n.setMonth(n.getMonth()-a*s);let r=w(n,o)===-a;F(u(t))&&s===1&&w(t,o)===1&&(r=!1),i=a*(s-Number(r))}return i===0?0:i}function T(t){return e=>{const o=(t?Math[t]:Math.trunc)(e);return o===0?0:o}}function C(t,e){return+u(t)-+u(e)}function O(t,e,n){const o=C(t,e)/1e3;return T(n?.roundingMethod)(o)}const X={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}},j=(t,e,n)=>{let o;const a=X[t];return typeof a=="string"?o=a:e===1?o=a.one:o=a.other.replace("{{count}}",e.toString()),n?.addSuffix?n.comparison&&n.comparison>0?"in "+o:o+" ago":o};function p(t){return(e={})=>{const n=e.width?String(e.width):t.defaultWidth;return t.formats[n]||t.formats[t.defaultWidth]}}const A={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},N={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},Y={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},_={date:p({formats:A,defaultWidth:"full"}),time:p({formats:N,defaultWidth:"full"}),dateTime:p({formats:Y,defaultWidth:"full"})},I={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"},R=(t,e,n,o)=>I[t];function y(t){return(e,n)=>{const o=n?.context?String(n.context):"standalone";let a;if(o==="formatting"&&t.formattingValues){const i=t.defaultFormattingWidth||t.defaultWidth,r=n?.width?String(n.width):i;a=t.formattingValues[r]||t.formattingValues[i]}else{const i=t.defaultWidth,r=n?.width?String(n.width):t.defaultWidth;a=t.values[r]||t.values[i]}const s=t.argumentCallback?t.argumentCallback(e):e;return a[s]}}const V={narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},z={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},L={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},q={narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},J={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},E={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},H=(t,e)=>{const n=Number(t),o=n%100;if(o>20||o<10)switch(o%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},Q={ordinalNumber:H,era:y({values:V,defaultWidth:"wide"}),quarter:y({values:z,defaultWidth:"wide",argumentCallback:t=>t-1}),month:y({values:L,defaultWidth:"wide"}),day:y({values:q,defaultWidth:"wide"}),dayPeriod:y({values:J,defaultWidth:"wide",formattingValues:E,defaultFormattingWidth:"wide"})};function b(t){return(e,n={})=>{const o=n.width,a=o&&t.matchPatterns[o]||t.matchPatterns[t.defaultMatchWidth],s=e.match(a);if(!s)return null;const i=s[0],r=o&&t.parsePatterns[o]||t.parsePatterns[t.defaultParseWidth],l=Array.isArray(r)?B(r,g=>g.test(i)):U(r,g=>g.test(i));let d;d=t.valueCallback?t.valueCallback(l):l,d=n.valueCallback?n.valueCallback(d):d;const h=e.slice(i.length);return{value:d,rest:h}}}function U(t,e){for(const n in t)if(Object.prototype.hasOwnProperty.call(t,n)&&e(t[n]))return n}function B(t,e){for(let n=0;n<t.length;n++)if(e(t[n]))return n}function K(t){return(e,n={})=>{const o=e.match(t.matchPattern);if(!o)return null;const a=o[0],s=e.match(t.parsePattern);if(!s)return null;let i=t.valueCallback?t.valueCallback(s[0]):s[0];i=n.valueCallback?n.valueCallback(i):i;const r=e.slice(a.length);return{value:i,rest:r}}}const $=/^(\d+)(th|st|nd|rd)?/i,G=/\d+/i,Z={narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},tt={any:[/^b/i,/^(a|c)/i]},et={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},nt={any:[/1/i,/2/i,/3/i,/4/i]},at={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},ot={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},rt={narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},it={narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},st={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},ut={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},ct={ordinalNumber:K({matchPattern:$,parsePattern:G,valueCallback:t=>parseInt(t,10)}),era:b({matchPatterns:Z,defaultMatchWidth:"wide",parsePatterns:tt,defaultParseWidth:"any"}),quarter:b({matchPatterns:et,defaultMatchWidth:"wide",parsePatterns:nt,defaultParseWidth:"any",valueCallback:t=>t+1}),month:b({matchPatterns:at,defaultMatchWidth:"wide",parsePatterns:ot,defaultParseWidth:"any"}),day:b({matchPatterns:rt,defaultMatchWidth:"wide",parsePatterns:it,defaultParseWidth:"any"}),dayPeriod:b({matchPatterns:st,defaultMatchWidth:"any",parsePatterns:ut,defaultParseWidth:"any"})},dt={code:"en-US",formatDistance:j,formatLong:_,formatRelative:R,localize:Q,match:ct,options:{weekStartsOn:0,firstWeekContainsDate:1}};let lt={};function ht(){return lt}function P(t){const e=u(t),n=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return n.setUTCFullYear(e.getFullYear()),+t-+n}function ft(t,e,n){const o=ht(),a=n?.locale??o.locale??dt,s=2520,i=w(t,e);if(isNaN(i))throw new RangeError("Invalid time value");const r=Object.assign({},n,{addSuffix:n?.addSuffix,comparison:i});let l,d;i>0?(l=u(e),d=u(t)):(l=u(t),d=u(e));const h=O(d,l),g=(P(d)-P(l))/1e3,c=Math.round((h-g)/60);let m;if(c<2)return n?.includeSeconds?h<5?a.formatDistance("lessThanXSeconds",5,r):h<10?a.formatDistance("lessThanXSeconds",10,r):h<20?a.formatDistance("lessThanXSeconds",20,r):h<40?a.formatDistance("halfAMinute",0,r):h<60?a.formatDistance("lessThanXMinutes",1,r):a.formatDistance("xMinutes",1,r):c===0?a.formatDistance("lessThanXMinutes",1,r):a.formatDistance("xMinutes",c,r);if(c<45)return a.formatDistance("xMinutes",c,r);if(c<90)return a.formatDistance("aboutXHours",1,r);if(c<D){const f=Math.round(c/60);return a.formatDistance("aboutXHours",f,r)}else{if(c<s)return a.formatDistance("xDays",1,r);if(c<M){const f=Math.round(c/D);return a.formatDistance("xDays",f,r)}else if(c<M*2)return m=Math.round(c/M),a.formatDistance("aboutXMonths",m,r)}if(m=x(d,l),m<12){const f=Math.round(c/M);return a.formatDistance("xMonths",f,r)}else{const f=m%12,v=Math.trunc(m/12);return f<3?a.formatDistance("aboutXYears",v,r):f<9?a.formatDistance("overXYears",v,r):a.formatDistance("almostXYears",v+1,r)}}export{ft as f};