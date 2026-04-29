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
      "Senior help with AI architecture, model routing, token observability, prompt systems, and cost optimization when LLM usage starts affecting product margins.",
    heroTitle: "Make your AI system cheaper, clearer, and easier to operate.",
    heroBody:
      "I help teams understand where LLM cost, latency, quality, and architecture tradeoffs are hiding. That can mean auditing prompts and traces, redesigning model routing, adding token observability, improving caching, or turning a fragile AI prototype into a production system with measurable unit economics.",
    primaryCta: "Book an AI Consulting Call",
    secondaryCta: "See all consulting services",
    stats: [
      { value: "40-70%", label: "Common token cost reduction target" },
      { value: "Routed", label: "Model selection by task, risk, and price" },
      { value: "Visible", label: "Spend tied to features and users" },
    ],
    whyNow: [
      "AI products often ship with hidden unit economics because prompts, context windows, retries, and model choices were optimized for speed of launch.",
      "Once usage grows, small routing and context decisions become recurring infrastructure spend.",
      "Teams need practical architecture judgment that balances quality, latency, safety, and cost instead of chasing one metric at a time.",
    ],
    outcomes: [
      "Identify the features, prompts, routes, and user patterns driving the majority of AI spend.",
      "Design a model-routing and caching strategy that keeps quality high while reserving expensive models for work that truly needs them.",
      "Add token and trace observability so product, engineering, and finance can reason from the same facts.",
      "Turn cost improvements into measurable changes your team can keep operating after the engagement.",
    ],
    deliverables: [
      "AI architecture and cost review across prompts, traces, models, and data flow",
      "Prioritized optimization roadmap with risk, effort, and savings tradeoffs",
      "Model routing, caching, batching, and prompt strategy recommendations",
      "Implementation support for the highest-leverage fixes",
    ],
    approach: [
      {
        title: "Make the bill explainable",
        body: "We connect invoices, traces, prompts, endpoints, and product behavior so the spend has owners and causes.",
      },
      {
        title: "Tune the architecture, not just the prompt",
        body: "I look at routing, context design, caching, retrieval, retries, evals, and fallback behavior together because cost usually emerges from the system.",
      },
      {
        title: "Ship measurable changes",
        body: "The goal is not a slide deck of suggestions. It is a set of improvements your team can deploy, verify, and keep improving.",
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
      "Expert guidance for adding practical, cost-effective safety, moderation, and policy controls to AI apps without slowing product teams down.",
    heroTitle: "Add AI safety that protects the product without crushing velocity.",
    heroBody:
      "I help teams add moderation, prompt defenses, policy enforcement, and human-review escape hatches that fit the product they actually have today. The goal is not theater. It is practical guardrails that cut abuse, reduce risk, and avoid expensive overblocking.",
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
      "A safe demo is not the same thing as a production-safe workflow with logging, escalation, and recovery paths.",
    ],
    outcomes: [
      "Map every risky AI interaction across input, retrieval, tools, output, and logging.",
      "Design layered moderation so cheap deterministic checks absorb routine policy issues before expensive model reviews fire.",
      "Add user trust controls like rate limiting, review queues, redaction, quarantine, and escalation paths.",
      "Document guardrail coverage so product, engineering, and leadership all understand residual risk.",
    ],
    deliverables: [
      "Guardrail architecture and threat model for your current product",
      "Recommended moderation stack with cost and latency tradeoffs",
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
      "Scale beyond fragile hosted defaults, migrate to native cloud or blended open-source infrastructure, and cut runaway auth and database costs before growth punishes the stack.",
    heroTitle: "When Supabase is getting expensive or fragile, I help you regain control before growth turns into a fire drill.",
    heroBody:
      "I work with teams that outgrew the easy early path. That can mean moving pieces of Supabase to native cloud, replacing the most expensive services, or designing a blended open-source stack that keeps the developer experience while fixing the bill and removing scaling bottlenecks.",
    primaryCta: "Talk Through Your Supabase Stack",
    secondaryCta: "See all consulting services",
    stats: [
      { value: "$22,500", label: "Monthly auth bill in one rescue" },
      { value: "< 1 month", label: "Migration window before major campaign" },
      { value: "14x", label: "User growth absorbed after the switch" },
    ],
    whyNow: [
      "Hosted convenience becomes very expensive when auth, database, storage, and edge workloads all scale at once.",
      "Migration gets riskier the longer it waits, especially if product growth is about to accelerate.",
      "Avoid rip-and-replace by identifying which parts of the stack still help and which parts are now a tax on growth.",
    ],
    outcomes: [
      "Audit which parts of Supabase still help and which parts are now acting like a tax on growth.",
      "Design a migration plan to native cloud, open-source infrastructure, or a blended architecture with minimal customer disruption.",
      "Reduce auth and data-plane risk before a launch, campaign, or pricing change magnifies it.",
      "Preserve operational simplicity while eliminating the monthly surprises that make finance and engineering both nervous.",
    ],
    deliverables: [
      "Scaling and cost assessment across auth, database, storage, and edge usage",
      "Migration blueprint with rollback strategy and cutover sequencing",
      "Target-state recommendation covering native cloud and open-source options",
      "Execution support for high-risk migration windows",
    ],
    caseStudy: {
      label: "Case Study",
      title: "A company was spending $22,500 every month just to authenticate users.",
      body: "Before a major ad campaign, I helped them migrate off that setup to better-auth in under one month. The campaign landed, their user base grew 14x, and they avoided the kind of auth bill that would have burned millions as adoption climbed.",
      highlight: "This is the kind of migration that pays for itself quickly when growth is real.",
    },
    approach: [
      {
        title: "Find the true choke point",
        body: "Sometimes the problem is database throughput. Sometimes it is auth. Sometimes it is vendor coupling. We diagnose the expensive part first.",
      },
      {
        title: "Unbundle what no longer belongs together",
        body: "I separate the services that still benefit from managed convenience from the ones that need native cloud performance or open-source economics.",
      },
      {
        title: "Migrate under pressure without guessing",
        body: "For time-sensitive launches, I plan staged cutovers, rollback paths, validation checks, and post-launch monitoring so the move holds under load.",
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
      "Rescue LLM knowledge systems that worked early, then collapsed under real document volume with semantic confusion, retrieval drift, and unstable answers.",
    heroTitle: "Your RAG system worked beautifully until success broke it.",
    heroBody:
      "That is a common pattern. A knowledge integration feels magical at first, then volume rises, the document graph gets messy, and the model starts pulling the wrong things for the right questions. I help teams diagnose the collapse and rebuild retrieval for relevance, precision, and scale.",
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
      "Teams can waste months tuning prompts when the right fix is retrieval architecture and query routing.",
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
      "Secure the way developers and AI coding agents write, run, test, and ship code with sandboxing, canary credentials, hardened CI/CD, and controlled access patterns.",
    heroTitle: "If your developers or agents can generate code fast, they can also create blast radius fast.",
    heroBody:
      "I help teams secure AI-assisted development before the workflow becomes impossible to govern. That includes sandboxed execution, decoy credentials, repository controls, CI/CD hardening, and operational boundaries that keep experiments from turning into incidents.",
    primaryCta: "Review AI Coding Security",
    secondaryCta: "See all consulting services",
    stats: [
      { value: "Sandboxed", label: "Execution paths for risky automation" },
      { value: "Canary", label: "Decoy credentials for fast detection" },
      { value: "Hardened", label: "CI/CD and repository guardrails" },
    ],
    whyNow: [
      "AI coding tools move faster than most internal security review processes.",
      "Repository access, terminal execution, secrets exposure, and automation sprawl create a new threat surface inside engineering itself.",
      "Teams need controls that support productivity instead of forcing developers back to manual workarounds.",
    ],
    outcomes: [
      "Define safe boundaries for AI coding agents, assistants, and automation in local, CI, and production-adjacent environments.",
      "Reduce the chance of secret leakage, prompt-based repo abuse, poisoned dependencies, and unsafe autonomous actions.",
      "Use canary credentials and monitoring to detect misuse early rather than discovering it after real access is abused.",
      "Harden CI/CD so generated code still passes through principled review, validation, and release controls.",
    ],
    deliverables: [
      "Threat model for AI-assisted development workflows",
      "Recommendations for sandboxing, access control, and secret handling",
      "Canary credential and detection strategy",
      "CI/CD hardening checklist tailored to your engineering workflow",
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
