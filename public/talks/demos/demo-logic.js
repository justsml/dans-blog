/* Offline stage fixtures. These rules do not call or evaluate a language model. */
(function(root){
 const cases={
  spelling:{objective:'Assess spelling without assistance',decision:'Preserve',reason:'If spelling is the capability being assessed, automatic correction conceals the evidence.'},
  argument:{objective:'Assess the strength of an argument',decision:'Augment',reason:'Grammar help can leave the argument visible. Ask the learner to defend the premises and address a counterexample.'},
  formatting:{objective:'Assess a scientific explanation',decision:'Delegate',reason:'Citation formatting is incidental to this objective. Source selection and interpretation still need evidence.'}
 };
 function normalizeError(s){return String(s).toLowerCase().replace(/127\.0\.0\.1:\d+|localhost:\d+/g,'localhost:<port>').replace(/\b\d{4}-\d{2}-\d{2}[t ][\d:.z+-]+/g,'<time>').replace(/\s+/g,' ').trim();}
 const prior={error:'connect econnrefused localhost:<port>',scope:'Local integration tests require the database service',cause:'Test suite ran before the database was ready',artifact:'Run the readiness check before integration tests',regression:'Service unavailable must fail before tests start'};
 function matchFailure(input){const normalized=normalizeError(input);const known=normalized.includes('econnrefused')&&normalized.includes('localhost:<port>');return{normalized,known,record:known?prior:null};}
 function promote({regressionPassed,holdoutPassed,scopeMatches}){return regressionPassed&&holdoutPassed&&scopeMatches?'Promote scoped readiness check':'Keep proposed fix in review';}
 const strategies={lookup:{label:'Deterministic lookup',cost:0.001,seconds:0.02,agents:0},simple:{label:'One small-model attempt + checks',cost:0.02,seconds:2,agents:1},novel:{label:'Two independent hypotheses + verification',cost:0.30,seconds:15,agents:3}};
 function route({task,budget,deadline,highRisk}){
  if(highRisk)return{label:'Human decision gate',reason:'Consequential action requires accountable review',agents:0,cost:0,seconds:0,human:true};
  const s=strategies[task];if(!s)throw Error('Unknown task');
  if(s.cost>budget||s.seconds>deadline)return{label:'Stop and request more resources',reason:'No accepted strategy fits both caps',agents:0,cost:0,seconds:0,blocked:true};
  return{...s,reason:'Illustrative policy selected a strategy within the supplied caps'};
 }
 function economics({requests,inference,other,pass,multiplier}){
  if(![requests,inference,other,pass,multiplier].every(Number.isFinite)||requests<0||inference<0||other<0||pass<=0||pass>1||multiplier<0)throw Error('Enter nonnegative costs and a pass rate between 0 and 100%.');
  const total=requests*(inference*multiplier+other);return{total,successful:requests*pass,costPerSuccess:(inference*multiplier+other)/pass};
 }
 /* Slide 7 reconstruction. Fixture: a $100 price rises 20%, then the new price falls 20%.
    The submitted claim is "equal and opposite, so the final price is $100." Clean prose, wrong base. */
 const studentReplay=[
  {rung:'Diagnostic question',tutor:'Which price does the discount use?',learner:'The original $100.',evidence:'Identifies a specific mistaken base. The final number alone would not have shown this.'},
  {rung:'Conceptual hint',tutor:'What is the price after the increase? Apply the discount to that current price.',learner:'$120.',evidence:'Support given is visible and recorded. Asking a question costs the learner nothing.'},
  {rung:'Supported correction',tutor:'So what is the final price, and why?',learner:'$120 times 0.8 is $96. I used the wrong starting amount for the discount.',evidence:'Supported correction with an explanation. Score the reasoning, not the number.'},
  {rung:'Transfer item',tutor:'Now start at $80, increase 25%, then decrease 20%. Explain why this one returns to its start.',learner:'It reaches $100, then $80. 1.25 times 0.8 equals 1.',evidence:'Immediate transfer under known conditions. Same invariant, different numbers; it breaks the shortcut "opposite changes never cancel."'},
  {rung:'The record',tutor:'What would you record, and what remains unknown?',learner:'Concept: sequential percentage bases. Observed: used the original amount for the second change. Support: conceptual hint. Next check: a new independent item after practice.',evidence:'Retention and unaided performance remain unknown. A record is context for the next teaching decision, never a label.'}
 ];
 const experiments=[{name:'Control',activation:.40,support:.03,pattern:'neutral'}, {name:'Pressure copy',activation:.48,support:.09,pattern:'false urgency'}, {name:'Clearer first step',activation:.45,support:.04,pattern:'neutral'}];
 function decideExperiment({index,maxSupport,allowFalseUrgency}){const e=experiments[index];if(!e)throw Error('Unknown experiment');const reasons=[];if(e.support>maxSupport)reasons.push('Support burden exceeds guardrail');if(e.pattern==='false urgency'&&!allowFalseUrgency)reasons.push('False urgency violates product principles');return{...e,reasons,status:reasons.length?'Reject candidate':'Eligible for human review',uplift:e.activation-experiments[0].activation};}
 root.PortfolioDemo={cases,normalizeError,matchFailure,promote,route,economics,studentReplay,experiments,decideExperiment};
})(globalThis);
