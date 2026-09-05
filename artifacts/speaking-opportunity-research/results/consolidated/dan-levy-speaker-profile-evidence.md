# Dan Levy: speaker-profile evidence inventory

Verified against repository sources on 2026-09-05. This is an evidence file, not a finished public bio. The two 2026 resumes and the website are Dan's own materials; they are first-party claims, not independent verification. Where repository code or published articles demonstrate a topic, that evidence is identified separately.

## Safe summary

Dan Levy is a Denver-based senior AI engineer, engineering leader, consultant, educator, and longtime software builder. His 2026 resumes report 25 years shipping production systems and leading teams. He is currently a Sr. AI Staff Engineer at MagicSchool.ai and runs an independent AI consulting and education practice. His work spans agentic systems, retrieval and memory, LLM evaluation and observability, generative interfaces, AI security, developer productivity, and cloud-native infrastructure.

His earlier roles combine hands-on engineering, organizational leadership, and technical education: Principal Engineer and senior engineering manager at Hotel Engine; Sr. Lead Engineer at Quizlet; director at Lambda School; lead full-stack instructor at Galvanize; founding engineer and CTO at Property X-Ray/Core Title Co.; and co-owner and VP of Engineering at Hillside Software. He reports scaling Hotel Engine's engineering organization from 6 to more than 60 people in under a year, directing a 2,500-student division across five countries, and teaching at least 1,800 engineers through other bootcamps and consulting.

Dan also writes and contributes in public. Repository sources link his `llm://` URI-scheme Internet-Draft and implementation, Functional Promises, and contributions to projects including Mastra, Pagefind, PostGIS, React Router, Docker/Moby, Node.js, Angular, Lodash, MDN examples, Gatsby, and others. His blog contains practical material on AI evaluation, model routing, retrieval, databases, software architecture, security, instructional design, and education in the age of AI.

Sources: [engineering-leader resume](../../../../public/docs/Resume_Dan_Levy_AI_Engineering_Leader_2026.pdf), [principal-engineer resume](../../../../public/docs/Resume_Dan_Levy_Principal_AI_Engineer_2026.pdf), [existing speaker kit](../../../speaking-portfolio-expanded/packets/speaker/bio.md#L20-L34), [site biography](../../../../src/shared/uiTranslations.ts#L191-L201).

## Explicit identity and positioning

- Name: Dan Levy.
- Location: Denver, Colorado.
- Current positioning in the resumes: "Sr. AI Staff Engineer" at MagicSchool.ai and "Independent AI Consultant & Educator / Founder · AI Advisory."
- Public professional links: [danlevy.net](https://danlevy.net), [GitHub `justsml`](https://github.com/justsml), [LinkedIn `realdaniellevy`](https://linkedin.com/in/realdaniellevy), and X/Twitter `@justsml`. The handles are also encoded in [`src/consts.ts`, lines 11–14](../../../../src/consts.ts#L11-L14).
- The site's concise self-description is "Coder | Leader | Thinker | Tinkerer" and its role list is Engineer, Entrepreneur, Educator, and Leader: [`src/consts.ts`, lines 2–7](../../../../src/consts.ts#L2-L7).

## Experience and results

All dates and results in this section are explicit first-party resume claims.

### MagicSchool.ai — Sr. AI Staff Engineer, March 2025–present

- Built a flexible diagram and graph-generation system using sandboxed Python execution for personalized learning content.
- Developed evaluation tooling and coding-agent skills; integrated Braintrust, AutoEvals, custom scoring, deterministic checks, and LLM-as-judge evaluation.
- Architected a persistent memory graph and retrieval framework for context-aware interactions and personalization.
- Built generative-UI prototypes and shipped automated slideshow and mathematics features for student experiences.
- Implemented security measures for tokens and secrets, developer-container workflows, and endpoint hardening.

Source: engineering-leader resume, page 1; principal-engineer resume, page 1.

### Independent AI Consultant & Educator — Founder / AI advisory, 2024–present

- Advises engineers and enterprise teams on agentic architecture, RAG pipelines, developer productivity, and AI security.
- Reports production-workflow specialization in Mastra, LangChain, and LangGraph.
- Works on agent-to-interface integration across AG-UI, A2UI, JSON Render, and CopilotKit.
- Establishes LLM evaluation and observability practices with Langfuse, Weights & Biases, Helicone, Braintrust, and LangSmith.
- Reports work fine-tuning vision-language models with Unsloth for low-cost document understanding.

Source: engineering-leader resume, pages 1–2; principal-engineer resume, page 1. The live consulting catalogue separately shows the services Dan currently offers: [`src/data/consultingServices.ts`, lines 29–78](../../../../src/data/consultingServices.ts#L29-L78), lines 80–128, lines 187–240, and lines 243–340.

### Hotel Engine — February 2021–March 2025

- Titles listed across the resumes: Engineering Manager, Sr. Engineering Manager, and Principal Engineer.
- Reports scaling the engineering organization from 6 to more than 60 engineers in under one year.
- Introduced ensemble development, cross-team "free agents," and continuous-feedback practices.
- Championed AI-assisted code review, test generation, and documentation pipelines across the organization.
- As Principal Engineer, modernized production testing and architected critical high-traffic systems in Python, TypeScript, and Node.js.
- The leadership resume says his team consistently ranked first internally for productivity and engineering happiness. Treat this as a claim needing the underlying internal measurement if used in a public application.

Source: engineering-leader resume, page 2; principal-engineer resume, pages 1–2.

### Lambda School — Director, March–December 2019

- Designed and executed a scaling plan reported to enable 430% enrollment growth.
- Held responsibility for more than 2,500 students and hundreds of staff across five countries.
- Built real-time instructional-analytics tools.
- Authored changes intended to reduce bias in admissions.

Source: engineering-leader resume, page 2. The principal-engineer resume summarizes the position as "Web Program Director," page 2.

### Galvanize — Lead Instructor, September 2017–February 2019

- Led a six-month Full Stack Development Immersive bootcamp.
- Recorded hundreds of hours of instructional video.
- Co-authored dozens of curriculum assessments.

Source: engineering-leader resume, page 2.

### Quizlet — Sr. Lead Engineer, March–December 2020

- Served as a JavaScript/TypeScript performance and security subject-matter expert on a real-time WebSocket platform reported to serve 50 million users.
- Led complex cross-team projects.
- Coached presenters at all organizational levels.

Source: engineering-leader resume, page 2; principal-engineer resume, page 2.

### Property X-Ray / Core Title Co. — Founding Engineer and CTO, December 2013–December 2018

- Built a hybrid SaaS and on-premises title-insurance platform.
- Led the technical transition through acquisition.
- The principal-engineer resume reports completing twice-yearly security audits.

Source: both resumes, page 2.

### Hillside Software — Co-owner and VP of Engineering, March 1999–September 2014

- Co-founded and ran engineering at a small software-product company for 15 years.

Source: engineering-leader resume, page 2; principal-engineer resume, page 2.

## Relevant skill inventory

### AI platforms and agentic systems

Explicitly claimed experience:

- Agentic-system and workflow architecture with Mastra, LangChain, and LangGraph.
- Persistent memory graphs and context-aware agent interactions.
- MCP, AG-UI, A2UI, JSON Render, and CopilotKit.
- Production model experience across Anthropic Claude, OpenAI GPT, Llama, Mistral, and Gemini.
- Model routing, prompt systems, tool use, caching, fallback behavior, autonomy boundaries, and cost/quality tradeoffs.

Evidence in the repository:

- A substantial article explains measured evaluator-tuning loops, variance, accuracy, cost, and latency: [`Auto-Tune Your LLM Judge`, lines 19–44](../../../../src/content/posts/2026-08-11--auto-tune-your-llm-judge/index.mdx#L19-L44).
- A production-evaluation article distinguishes deterministic, model-graded, and human evaluation and supplies a concrete evaluation harness: [`Fight Evils with Evals!`, lines 16–77](../../../../src/content/posts/2026-05-06--llm-evals-are-broken/index.mdx#L16-L77).
- The open-source ledger records a Mastra streaming-output-processor fix: [`src/shared/ossData.ts`, lines 3–9](../../../../src/shared/ossData.ts#L3-L9), [Mastra repository](https://github.com/mastra-ai/mastra).

### Retrieval, search, and data systems

Explicitly claimed experience:

- RAG, hybrid retrieval, graph RAG, embeddings, reranking, query routing, and grounding evaluation.
- LanceDB, pgvector, Chroma, OpenSearch/Elasticsearch, BM25, approximate nearest-neighbor search, ColBERT, PostgreSQL, PostGIS, Redis, DynamoDB, Firestore, Cassandra, and S3-style storage.
- A reported three-layer hybrid-search rescue for a knowledge base that degraded around 25,000–50,000 indexed documents: [`src/data/consultingServices.ts`, lines 187–238](../../../../src/data/consultingServices.ts#L187-L238). This client result needs permission and corroborating material before naming the client or treating the numbers as independently verified.
- A reported browser-native LanceDB/WebAssembly project with direct S3-compatible access, temporary-credential flows, and pluggable OAuth.

Evidence in the repository:

- The semantic-search guide explains exact, lexical, fuzzy, semantic, and hybrid retrieval and the role of pgvector and HNSW: [`Semantic Vector Search`, lines 20–48](../../../../src/content/posts/2026-05-01--semantic-vector-search-landscape/index.mdx#L20-L48) and lines 67–77.
- The Fact Service reference project is described as supporting Postgres, Redis, DynamoDB, Firestore, and Cassandra: [`One Weird Trick`, lines 120–129](../../../../src/content/posts/2024-09-29--one-weird-trick-to-speed-up-feature-teams/index.mdx#L120-L129), [GitHub project](https://github.com/justsml/fact-service).
- The open-source ledger records a PostGIS documentation contribution: [`src/shared/ossData.ts`, lines 23–27](../../../../src/shared/ossData.ts#L23-L27), [PostGIS repository](https://github.com/postgis/postgis).

### LLM evaluation, observability, and quality engineering

- Deterministic evaluation, LLM-as-judge, human evaluation, custom scoring, bias and variance analysis, regression gates, retrieval evaluation, prompt evaluation, and cost/latency tracking.
- Tools claimed: Braintrust, AutoEvals, Langfuse, Weights & Biases, Helicone, LangSmith, and guardrail systems.
- Production testing strategy, automated test generation, CI/CD evaluation gates, and observability tied to product features.

Sources: both resumes; [`Fight Evils with Evals!`, lines 20–77](../../../../src/content/posts/2026-05-06--llm-evals-are-broken/index.mdx#L20-L77); [`Auto-Tune Your LLM Judge`, lines 19–44](../../../../src/content/posts/2026-08-11--auto-tune-your-llm-judge/index.mdx#L19-L44).

### Security and production hardening

- AI guardrails, prompt-injection defenses, PII handling, moderation, redaction, access control, least privilege, developer-agent sandboxing, secret segmentation, decoy credentials, CI/CD hardening, threat modeling, and incident response.
- Application, cloud, identity, infrastructure, and developer-workflow security assessment.
- Twice-yearly security-audit experience at Property X-Ray/Core Title Co.
- Docker/container isolation and cloud-native delivery.

Evidence in the repository:

- The guardrails article includes concrete Mastra input/output processors for Unicode normalization, prompt-injection detection, and PII redaction: [`Production AI is Terrifying`, lines 15–29](../../../../src/content/posts/2026-01-03--mastra-security-guardrails/index.mdx#L15-L29) and lines 31–104.
- The consulting catalogue describes developer-agent sandboxing, secret handling, canaries, repository controls, and CI/CD gates: [`src/data/consultingServices.ts`, lines 243–289](../../../../src/data/consultingServices.ts#L243-L289).
- The open-source ledger reports a Docker install-script OS-detection fix and "Docker Mentor" status: [`src/shared/ossData.ts`, lines 41–46](../../../../src/shared/ossData.ts#L41-L46), [Moby repository](https://github.com/moby/moby).

### Software engineering and architecture

- Languages and runtimes claimed: Python, TypeScript, JavaScript, Node.js, FastAPI, Rust, and WebAssembly.
- Front-end and application technologies claimed: React and React Native.
- Infrastructure claimed: Docker, Kubernetes, AWS, Google Cloud Platform, CI/CD, PostgreSQL, and PostGIS.
- Architecture experience across high-traffic systems, real-time WebSockets, hybrid SaaS/on-premises products, browser-native databases, platform APIs, and production testing.
- Product and developer-experience work including generative interfaces, internal tooling, accessibility review, and UI/UX analysis.

Sources: both resumes; site biography at [`src/shared/uiTranslations.ts`, lines 191–201](../../../../src/shared/uiTranslations.ts#L191-L201).

### Engineering leadership and organizational design

- Engineering-organization scaling from 6 to 60+ in under one year.
- Technical hiring, team design, ensemble development, cross-team staffing, feedback practices, mentoring, and presentation coaching.
- Founder/operator experience: multiple startups, CTO role, acquisition transition, and 15 years co-owning a product company.
- Large education-operation leadership: more than 2,500 students and hundreds of staff across five countries.
- Executive and board-level technical communication is asserted by the site biography, although no named examples are in the repository.

Sources: engineering-leader resume, pages 1–2; site biography at [`src/shared/uiTranslations.ts`, lines 195–200](../../../../src/shared/uiTranslations.ts#L195-L200).

### Teaching, curriculum, and instructional design

- Lead instructor for a six-month full-stack immersive; hundreds of hours of recorded instruction; dozens of co-authored assessments.
- Directed a 2,500-student division and built real-time instructional analytics.
- Mentoring and presentation coaching.
- Writes interactive programming quizzes and about the design of diagnostic multiple-choice questions.
- Current engineering work at an education-technology company includes personalized learning visualizations, slideshows, and mathematics features.
- Public education/AI perspective includes assessment redesign and teaching students when AI supports versus short-circuits learning.

Evidence in the repository:

- Dan explains how he designs distractors around real misconceptions and uses quizzes as tests of instructional clarity: [`The Unassuming Power of Multiple-Choice Questions`, lines 15–38](../../../../src/content/posts/2025-01-01--the-unassuming-power-of-multiple-choice-questions/index.mdx#L15-L38) and lines 63–86.
- His education-and-AI argument calls for AI literacy and redesigned assessment: [`The Last to Think`, lines 17–29](../../../../src/content/posts/2025-05-31--the-last-to-think/index.mdx#L17-L29).

### Open source, standards, and technical writing

- Authored the `llm://` URI-scheme Internet-Draft and published a supporting `llm-strings` package and implementation: [`LLM Connection Strings`, lines 16–18](../../../../src/content/posts/2026-01-30--llm-connection-strings/index.mdx#L16-L18), [IETF Datatracker](https://datatracker.ietf.org/doc/draft-levy-llm-uri-scheme/), [npm](https://www.npmjs.com/package/llm-strings), [GitHub](https://github.com/justsml/llm-strings).
- Maintains Functional Promises: [fpromises.io](https://fpromises.io/). The repository's OSS ledger ties Dan to the library at [`src/shared/ossData.ts`, lines 100–104](../../../../src/shared/ossData.ts#L100-L104).
- Repository-recorded contributions include:
  - Mastra streaming output processors: lines 3–9.
  - Pagefind Node.js runtime support: lines 11–15.
  - BlockNote React render performance: lines 17–21.
  - PostGIS K-means documentation: lines 23–27.
  - Polly.JS TypeScript examples: lines 29–33.
  - React Router documentation and search visibility: lines 35–39.
  - Docker/Moby OS-detection fix and mentor status: lines 41–46.
  - Node.js/TC39 input around classes, promises, async/await, and the URL parser: lines 49–53.
  - Angular documentation: lines 56–60.
  - Lodash ArrayBuffer support: lines 62–67.
  - MDN Promise, Fetch, and Array examples: lines 94–97.
  - React Native Mapbox, Gatsby, Turf, Astro Critical CSS, Execa, AWS SDK Client Mock, and other code/documentation contributions: [`src/shared/ossData.ts`](../../../../src/shared/ossData.ts).
- The repository contains 61 primary-language post source files at the time of review. That count establishes a substantial writing corpus in the repository, not readership or publication reach.

## Speaking-relevant credentials

The strongest documented speaker credentials are adjacent evidence rather than a conventional public conference list:

- Hundreds of hours of recorded instruction at Galvanize.
- Leadership of a six-month full-stack immersive.
- Co-authorship of dozens of curriculum assessments.
- Direction of a 2,500-student program across five countries.
- Presentation coaching at Quizlet.
- The site claims a reputation for practical, motivating talks "from graduations to the board room": [`src/shared/uiTranslations.ts`, lines 195–200](../../../../src/shared/uiTranslations.ts#L195-L200).
- The open-source ledger says Dan helped at local meetups as a Docker Mentor: [`src/shared/ossData.ts`, lines 41–46](../../../../src/shared/ossData.ts#L41-L46).
- A large public body of technical writing, tutorials, quizzes, diagrams, and code examples can support subject-matter credibility and proposal samples.

The existing speaker packet correctly notes that no public list of prior appearances exists in the repository: [`artifacts/speaking-portfolio-expanded/packets/speaker/bio.md`, lines 36–45](../../../speaking-portfolio-expanded/packets/speaker/bio.md#L36-L45). No event names, talk titles, dates, audience sizes, video URLs, or slide links should be invented.

## Education

- University of Denver, 2002–2007.
- The engineering-leader resume says "Major in Business Ethics & Legal Studies" and lists Philosophy and Organic Chemistry as minors.
- The principal-engineer resume instead describes coursework in Business Law, Philosophy, History, and Organic Chemistry, and explicitly says Dan left to pursue founding-engineer roles.
- No completed degree, certification, license, or academic appointment is established by the repository. Use "studied at the University of Denver" or "coursework at the University of Denver" unless Dan confirms a degree.

Source: engineering-leader resume, page 3; principal-engineer resume, page 2.

## Reasonable inferences, not credentials

- The combination of staff/principal engineering, management, founder, consulting, and teaching roles makes Dan credible for practitioner talks that connect architecture to organizational behavior. This is an inference from the role history, not an award or formal credential.
- MagicSchool.ai work plus Lambda School and Galvanize experience gives him a differentiated perspective at the intersection of AI engineering and education. It does not by itself establish K–12 classroom teaching, faculty status, education research, or school-district administration.
- The recorded-instruction and curriculum history suggests he can design and deliver workshops. It does not prove a current conference workshop, recent public recording, or a particular audience rating.
- The published technical corpus supports expertise in the topics covered. Authorship demonstrates communication and applied knowledge, not peer review, research validation, or production outcomes unless those are separately documented.
- The `llm://` Internet-Draft is a concrete standards contribution. It is not an RFC, an adopted Internet Standard, or evidence of IETF endorsement.

## Claims to confirm before public use

1. **Education wording:** confirm that no degree was awarded and reconcile "major/minors" with the other resume's "coursework" wording.
2. **Engineer-teaching total:** the leadership resume headline says 4,000+ engineers taught, while its prose says a 2,500-student division was directed and 1,800+ engineers were taught elsewhere. Directing students is not automatically equivalent to personally teaching them. Use "led education programs serving 2,500+ students and taught 1,800+ engineers" until Dan confirms the 4,000+ formulation.
3. **Internet-Draft status:** remove the resumes' parenthetical "RFC 7595." RFC 7595 is a URI-scheme registration-process reference, not the status or RFC number of Dan's draft. Say "author of an IETF Internet-Draft proposing the `llm://` URI scheme."
4. **Speaking history:** collect named graduations, internal leadership presentations, meetups, webinars, podcasts, workshops, conference sessions, videos, and slides.
5. **Public recording:** the repository has a recording plan but no completed, stable speaker-reel or talk URL: [`recording-plan.md`](../../../speaking-portfolio-expanded/packets/speaker/recording-plan.md).
6. **"Five unicorn ascents":** the principal resume displays this number but provides no company list, definition, dates, role attribution, or evidence. Do not use it without clarification.
7. **MagicSchool.ai superlative:** "largest and fastest-growing education technology company ever" appears in the leadership resume summary without evidence. Omit or source it independently.
8. **Internal results:** Hotel Engine's number-one productivity/happiness ranking and the 430% Lambda enrollment-growth attribution need supporting definitions and records for high-scrutiny applications.
9. **Consulting case studies:** confirm client permission, baseline, measurement window, and Dan's contribution before using the $22,500 monthly auth-cost, 14× user-growth, and 25,000–50,000-document RAG claims publicly.
10. **Open-source specifics:** link the exact pull requests or commits for any contribution emphasized in an application. The OSS ledger is a useful index, but it is still Dan's own summary.
11. **Current titles and dates:** both resumes are dated 2026, but any application after a role change should refresh title, employer, and advisory status.
12. **Formal credentials:** no professional certification, completed university degree, research publication, patent, security clearance, or award was found in the repository.

## Recommended factual one-liners

- **General:** Denver-based senior AI engineer, engineering leader, consultant, and educator with 25 years of software experience across startups, high-scale platforms, and technical education.
- **AI engineering:** Sr. AI Staff Engineer at MagicSchool.ai working on agentic retrieval and memory, LLM evaluation, generative interfaces, and AI-system hardening.
- **Education:** Former director of a program serving more than 2,500 students across five countries and former lead full-stack bootcamp instructor who recorded hundreds of hours of technical instruction.
- **Leadership:** Former principal engineer and senior engineering manager who reports helping scale Hotel Engine's engineering organization from 6 to more than 60 people in under one year.
- **Standards/open source:** Author of an IETF Internet-Draft proposing the `llm://` URI scheme, maintainer of Functional Promises, and contributor to widely used JavaScript, data, infrastructure, and documentation projects.

These one-liners deliberately avoid the unverified 4,000+ teaching total, RFC wording, degree implication, named consulting-client results, and undocumented conference history.
