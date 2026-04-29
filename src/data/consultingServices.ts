export type ConsultingService = {
  slug: string;
  kicker: string;
  title: string;
  navTitle: string;
  metaTitle: string;
  description: string;
  heroTitle: string;
  heroBody: string;
  primaryCta: string;
  secondaryCta: string;
  stats: Array<{ value: string; label: string }>;
  whyNow: string[];
  outcomes: string[];
  deliverables: string[];
  caseStudy?: {
    label: string;
    title: string;
    body: string;
    highlight: string;
  };
  approach: Array<{ title: string; body: string }>;
};

export const INTRO_CALL_LINK =
  process.env.INTRO_CALL_LINK ??
  "https://cal.com/dan-levy-net/30min?overlayCalendar=true";

export const consultingServices: ConsultingService[] = [
  {
    slug: "ai-consulting",
    kicker: "AI Consulting",
    title: "AI Consulting and Cost Optimization",
    navTitle: "AI Consulting",
    metaTitle: "AI Consulting for Cost, Architecture, and LLM Systems",
    description:
      "Senior help with agentic application architecture, model routing, token observability, prompt systems, and eval-backed production tradeoffs.",
    heroTitle: "Build agentic applications that can be tested, operated, and trusted.",
    heroBody:
      "I help teams move from impressive demos to agentic systems with clear routes, measurable quality, useful traces, and test/eval gates. That can mean redesigning model routing, adding token observability, building eval suites, improving caching, or turning a fragile prototype into a production system your team can reason about.",
    primaryCta: "Book an AI Consulting Call",
    secondaryCta: "See all consulting services",
    stats: [
      { value: "40-70%", label: "Common token cost reduction target" },
      { value: "Eval-led", label: "Quality checks before agent autonomy" },
      { value: "Visible", label: "Spend and quality tied to features" },
    ],
    whyNow: [
      "Agentic products often ship before the team has a clean way to measure quality, regressions, cost, and autonomy boundaries.",
      "Once usage grows, small routing, context, and tool-calling decisions start shaping product behavior.",
      "Teams need practical architecture judgment that balances quality, latency, safety, and cost without treating evals as an afterthought.",
    ],
    outcomes: [
      "Identify the features, prompts, routes, and user patterns driving the majority of AI spend.",
      "Design model-routing, tool-use, and caching strategies that reserve heavier work for tasks that truly need it.",
      "Add token, trace, and eval observability so product, engineering, and finance can reason from the same facts.",
      "Turn architecture improvements into measurable changes your team can keep operating after the engagement.",
    ],
    deliverables: [
      "Agentic architecture review across prompts, traces, tools, models, and data flow",
      "Test and eval plan for quality, regressions, autonomy boundaries, and cost",
      "Model routing, caching, batching, and prompt strategy recommendations",
      "Implementation support for the highest-leverage fixes",
    ],
    approach: [
      {
        title: "Make behavior explainable",
        body: "We connect traces, prompts, tool calls, invoices, endpoints, and product behavior so quality and cost have visible causes.",
      },
      {
        title: "Tune the system, not just the prompt",
        body: "I look at routing, context design, tools, caching, retrieval, retries, evals, and fallback behavior together because quality emerges from the system.",
      },
      {
        title: "Ship measurable changes",
        body: "The goal is not a slide deck of suggestions. It is a set of improvements your team can deploy, evaluate, and keep improving.",
      },
    ],
  },
  {
    slug: "ai-guardrails",
    kicker: "AI Guardrails",
    title: "AI Guardrails Consulting",
    navTitle: "AI Guardrails",
    metaTitle: "AI Guardrails Consulting for Safer, Cheaper AI Products",
    description:
      "Expert guidance for adding practical safety, moderation, policy controls, and eval-backed boundaries to agentic applications.",
    heroTitle: "Add AI safety that protects the product without freezing the team.",
    heroBody:
      "I help teams add moderation, prompt defenses, policy enforcement, evals, and human-review escape hatches that fit the product they actually have today. The goal is not theater. It is practical guardrails that let agentic features keep moving with evidence.",
    primaryCta: "Book an AI Guardrails Review",
    secondaryCta: "See all consulting services",
    stats: [
      { value: "Fast", label: "Retrofit into existing AI flows" },
      { value: "Lower", label: "Moderation cost through layered checks" },
      { value: "Clear", label: "Policies engineers can implement" },
    ],
    whyNow: [
      "Prompt injection, jailbreak attempts, and adversarial users usually show up after product-market fit, not before.",
      "Teams often overspend on blanket moderation calls when a layered policy engine would catch most issues for far less.",
      "A safe demo is not the same thing as a production-safe agentic workflow with logging, evals, escalation, and recovery paths.",
    ],
    outcomes: [
      "Map every risky AI interaction across input, retrieval, tools, output, and logging.",
      "Design layered moderation so cheap deterministic checks absorb routine policy issues before expensive model reviews fire.",
      "Add trust controls like rate limiting, review queues, redaction, quarantine, eval gates, and escalation paths.",
      "Document guardrail coverage so product, engineering, and leadership all understand residual risk.",
    ],
    deliverables: [
      "Guardrail architecture and threat model for your current product",
      "Recommended moderation and eval stack with cost and latency tradeoffs",
      "Policy matrix for unsafe content, prompt attacks, PII, and tool misuse",
      "Implementation roadmap your team can ship in phases",
    ],
    approach: [
      {
        title: "Inspect the real traffic",
        body: "We start with the prompts, retrieval payloads, tool calls, and failure modes your app already sees instead of designing for imaginary users.",
      },
      {
        title: "Layer the controls",
        body: "I combine cheap static rules, contextual classifiers, and targeted model-based moderation only where they add real value.",
      },
      {
        title: "Build for operations",
        body: "The final design includes observability, human review, safe fallbacks, and incident response so the controls stay useful after launch.",
      },
    ],
  },
  {
    slug: "supabase-scaling-migration",
    kicker: "Supabase Scaling & Migration",
    title: "Supabase Scaling and Migration Consulting",
    navTitle: "Supabase Scaling",
    metaTitle: "Supabase Scaling, Migration, and Auth Cost Rescue",
    description:
      "Modernize hosted defaults, move selected services to native cloud or blended open-source infrastructure, and use agentic delivery to explore safer paths in parallel.",
    heroTitle: "Modern migrations do not have to move one file at a time.",
    heroBody:
      "I work with teams that outgrew the easy early path. Instead of treating migration as one long serial march, we can use agentic coding to explore slices in parallel, test the results against real behavior, and converge on the safest target architecture.",
    primaryCta: "Talk Through Your Supabase Stack",
    secondaryCta: "See all consulting services",
    stats: [
      { value: "$22,500", label: "Monthly auth bill in one rescue" },
      { value: "Parallel", label: "Multiple migration paths explored at once" },
      { value: "14x", label: "User growth absorbed after the switch" },
    ],
    whyNow: [
      "Hosted convenience can hide which parts of auth, database, storage, and edge workloads still belong together.",
      "Work that used to require a slow rewrite can now be split into agent-sized investigations with tests around each boundary.",
      "Avoid rip-and-replace by identifying which parts of the stack still help and which parts should move.",
    ],
    outcomes: [
      "Audit which parts of Supabase still help and which parts are now acting like a tax on growth.",
      "Design a migration plan to native cloud, open-source infrastructure, or a blended architecture with testable seams.",
      "Use parallel agentic exploration to compare implementation paths before the team commits.",
      "Preserve operational simplicity while replacing the parts that no longer fit.",
    ],
    deliverables: [
      "Scaling and cost assessment across auth, database, storage, and edge usage",
      "Migration blueprint with eval harnesses, rollback strategy, and cutover sequencing",
      "Target-state recommendation covering native cloud and open-source options",
      "Execution support for agent-assisted migration windows",
    ],
    caseStudy: {
      label: "Case Study",
      title: "A company was spending $22,500 every month just to authenticate users.",
      body: "Before a major ad campaign, I helped them migrate off that setup to better-auth in under one month. The campaign landed, their user base grew 14x, and the new architecture held when adoption climbed.",
      highlight: "Today, the same class of work can be accelerated further by letting agents explore migration paths in parallel while tests decide what is safe to keep.",
    },
    approach: [
      {
        title: "Find the true choke point",
        body: "Sometimes the problem is database throughput. Sometimes it is auth. Sometimes it is vendor coupling. We find the real constraint first.",
      },
      {
        title: "Unbundle what no longer belongs together",
        body: "I separate the services that still benefit from managed convenience from the ones that need native cloud performance or open-source economics.",
      },
      {
        title: "Parallelize the unknowns",
        body: "For time-sensitive launches, agentic coding can explore multiple cutover and implementation paths while validation checks keep the work honest.",
      },
    ],
  },
  {
    slug: "rag-rescue",
    kicker: "RAG Rescue",
    title: "RAG Rescue Consulting",
    navTitle: "RAG Rescue",
    metaTitle: "RAG Rescue for Collapsing LLM Knowledge Bases",
    description:
      "Rescue LLM knowledge systems with retrieval evals, grounding checks, query routing, and document-scale diagnostics.",
    heroTitle: "Your RAG system worked beautifully until success broke it.",
    heroBody:
      "That is a common pattern. A knowledge integration feels magical at first, then volume rises, the document graph gets messy, and the model starts pulling the wrong things for the right questions. I help teams build evals around the failures, diagnose the collapse, and rebuild retrieval for relevance, precision, and scale.",
    primaryCta: "Book a RAG Rescue Session",
    secondaryCta: "See all consulting services",
    stats: [
      { value: "25–50K", label: "Docs where many systems start wobbling" },
      { value: "3 layers", label: "Hybrid retrieval strategy I implemented" },
      { value: "Context aware", label: "graphRAG activation by query intent" },
    ],
    whyNow: [
      "RAG failures often look like model failures even when retrieval is the real culprit.",
      "As document counts rise, chunking, metadata, embeddings, and reranking choices interact in ways that create semantic confusion.",
      "Teams can waste months tuning prompts when the right fix is retrieval evals, architecture, and query routing.",
    ],
    outcomes: [
      "Identify the specific causes of context collapse, retrieval drift, and semantic confusion in your current stack.",
      "Rework indexing, metadata, reranking, and query planning so the model sees the right evidence more often.",
      "Route only the right queries into heavier graph-based retrieval so quality rises without exploding cost.",
      "Make relevance measurable with evals, debug traces, and failure-class tracking instead of vibes.",
    ],
    deliverables: [
      "Retrieval architecture review with failure analysis",
      "Layered search strategy spanning lexical, vector, and structural retrieval",
      "Reranking and query-routing recommendations tied to cost and latency",
      "Evaluation plan for relevance, grounding, and answer consistency",
    ],
    caseStudy: {
      label: "Case Study",
      title: "A company’s knowledgebase integration was wildly successful until it fell over.",
      body: "At roughly 25,000 to 50,000 indexed documents, they started seeing context collapse, semantic confusion, and degraded answer quality. I rebuilt retrieval around a highly optimized three-layer hybrid search design, with graphRAG only kicking in when the query context justified the extra depth.",
      highlight: "The fix was not one more prompt tweak. It was retrieval architecture.",
    },
    approach: [
      {
        title: "Debug the failure classes",
        body: "We look at missed retrieval, wrong retrieval, stale retrieval, over-broad retrieval, and answer hallucination as separate problems with separate remedies.",
      },
      {
        title: "Rebuild retrieval in layers",
        body: "I combine lexical precision, vector recall, and graph-aware traversal so each query gets the cheapest path that still returns the right evidence.",
      },
      {
        title: "Instrument the system",
        body: "You leave with clearer evals and retrieval diagnostics so the next scale jump becomes manageable instead of mysterious.",
      },
    ],
  },
  {
    slug: "developer-ai-coding-security",
    kicker: "Developer AI Coding Security",
    title: "Developer AI Coding Security Consulting",
    navTitle: "AI Coding Security",
    metaTitle: "Developer AI Coding Security, Sandboxing, and CI/CD Hardening",
    description:
      "Secure the way developers and AI coding agents write, run, test, evaluate, and ship code with sandboxing, canaries, hardened CI/CD, and controlled access.",
    heroTitle: "Agentic coding needs speed, taste, and guardrails.",
    heroBody:
      "I help teams make AI-assisted development powerful without letting it become chaos. That includes sandboxed execution, decoy credentials, repository controls, CI/CD hardening, eval gates, and operational boundaries that let many agents work in parallel without losing control.",
    primaryCta: "Review AI Coding Security",
    secondaryCta: "See all consulting services",
    stats: [
      { value: "Sandboxed", label: "Execution paths for risky automation" },
      { value: "Canary", label: "Decoy credentials for fast detection" },
      { value: "Hardened", label: "CI/CD and repository guardrails" },
    ],
    whyNow: [
      "AI coding tools move faster than most internal engineering processes.",
      "Repository access, terminal execution, secrets exposure, and automation sprawl create a new threat surface inside engineering itself.",
      "Teams need controls that support productivity instead of forcing developers back to manual workarounds.",
    ],
    outcomes: [
      "Define safe boundaries for AI coding agents, assistants, and automation in local, CI, and production-adjacent environments.",
      "Reduce the chance of secret leakage, prompt-based repo abuse, poisoned dependencies, and unsafe autonomous actions.",
      "Use canary credentials and monitoring to detect misuse early rather than discovering it after real access is abused.",
      "Harden CI/CD so generated code still passes through principled review, tests, evals, and release controls.",
    ],
    deliverables: [
      "Threat model for AI-assisted development workflows",
      "Recommendations for sandboxing, access control, and secret handling",
      "Canary credential and detection strategy",
      "CI/CD and eval-gate checklist tailored to your engineering workflow",
    ],
    approach: [
      {
        title: "Trace how code actually gets written",
        body: "We map editor agents, CLI agents, pull request bots, terminals, build systems, and deployment steps so the controls match reality.",
      },
      {
        title: "Reduce blast radius",
        body: "I focus on isolation, least privilege, secret segmentation, auditability, and tripwires that expose misuse before it escalates.",
      },
      {
        title: "Keep teams shipping",
        body: "The goal is a secure developer workflow that remains pleasant enough engineers will actually use it.",
      },
    ],
  },
  {
    slug: "enterprise-security-assessment",
    kicker: "Whole Enterprise Security Assessment",
    title: "Whole Enterprise Security Assessment",
    navTitle: "Enterprise Security",
    metaTitle: "Whole Enterprise Security Assessment for Modern Engineering Orgs",
    description:
      "A broad security assessment spanning application risk, identity, infrastructure, cloud posture, developer workflow, AI exposure, and organizational weak points.",
    heroTitle: "Security problems rarely stay in one layer. Your assessment should not either.",
    heroBody:
      "I perform enterprise-minded security reviews for companies that need the real picture, not a narrow point-in-time scan. We look across product, cloud, identity, engineering workflow, AI systems, and operational practices to find the vulnerabilities that compound together.",
    primaryCta: "Book a Security Assessment Call",
    secondaryCta: "See all consulting services",
    stats: [
      { value: "Broad", label: "Coverage across app, cloud, identity, AI" },
      { value: "Practical", label: "Findings prioritized by business risk" },
      { value: "Actionable", label: "Roadmap your team can execute" },
    ],
    whyNow: [
      "Many serious incidents are created by two or three moderate weaknesses interacting, not by one dramatic flaw.",
      "Fast-moving engineering organizations accumulate invisible risk in build pipelines, auth layers, cloud defaults, and AI integrations.",
      "Leadership needs prioritized security work, not an unreadable pile of disconnected findings.",
    ],
    outcomes: [
      "Reveal the risk patterns connecting product, infrastructure, identity, AI, and developer workflow.",
      "Prioritize findings by impact, exploitability, and business urgency rather than by generic scanner severity alone.",
      "Separate what needs immediate remediation from what can be scheduled responsibly.",
      "Give engineering leadership a roadmap they can defend to product, ops, and the executive team.",
    ],
    deliverables: [
      "Assessment report with prioritized findings and remediation themes",
      "Architecture-level risk review across critical systems",
      "Executive summary for leadership and detailed guidance for engineering",
      "Follow-up planning session to sequence the fixes",
    ],
    approach: [
      {
        title: "Survey the attack surface",
        body: "We examine the product, the cloud, the identity layer, developer tooling, and the new AI-specific surfaces that most classic reviews miss.",
      },
      {
        title: "Connect the dots",
        body: "I look for the combinations that turn several small issues into one expensive incident path.",
      },
      {
        title: "Turn findings into decisions",
        body: "You get a practical remediation plan with owners, priorities, and tradeoffs instead of a report that dies in a folder.",
      },
    ],
  },
];

export const consultingServicesBySlug = new Map(
  consultingServices.map((service) => [service.slug, service]),
);
