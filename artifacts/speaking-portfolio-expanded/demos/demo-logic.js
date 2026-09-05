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
 const studentReplay=[
  {prompt:'Both learners submitted the same polished explanation. What can we infer?',a:'The artifact is correct.',b:'The artifact is correct.',evidence:'Artifact quality alone does not distinguish these scripted learners.'},
  {prompt:'What assumption does the argument require?',a:'That the two groups were comparable before the intervention.',b:'It is correct because the answer sounds scientific.',evidence:'A states a relevant assumption. B supplies confidence without a reason.'},
  {prompt:'What evidence could change your conclusion?',a:'A baseline imbalance or a confounding change could explain the result.',b:'I would need to look that up.',evidence:'Probe B further. One weak answer is not a misconduct finding or a final grade.'},
  {prompt:'How will you demonstrate understanding next?',a:'I will compare the baseline data and explain a counterexample.',b:'Give me a smaller example. I will identify the groups and try again.',evidence:'Plan the next learning step. Offer an accessible written alternative to oral defense.'}
 ];
 const experiments=[{name:'Control',activation:.40,support:.03,pattern:'neutral'}, {name:'Pressure copy',activation:.48,support:.09,pattern:'false urgency'}, {name:'Clearer first step',activation:.45,support:.04,pattern:'neutral'}];
 function decideExperiment({index,maxSupport,allowFalseUrgency}){const e=experiments[index];if(!e)throw Error('Unknown experiment');const reasons=[];if(e.support>maxSupport)reasons.push('Support burden exceeds guardrail');if(e.pattern==='false urgency'&&!allowFalseUrgency)reasons.push('False urgency violates product principles');return{...e,reasons,status:reasons.length?'Reject candidate':'Eligible for human review',uplift:e.activation-experiments[0].activation};}
 root.PortfolioDemo={cases,normalizeError,matchFailure,promote,route,economics,studentReplay,experiments,decideExperiment};
})(globalThis);
