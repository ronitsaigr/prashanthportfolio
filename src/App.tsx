import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

type UseCase = {
  id: string
  category: 'Revenue' | 'Operations' | 'Growth' | 'Build' | 'Creative'
  title: string
  summary: string
  outcome: string
  stack: string[]
  status: 'BUILT' | 'APPLIED' | 'PROTOTYPED'
  flow: string[]
}

const proof = [
  { metric: '27K → 400K+', label: 'Audience growth', detail: 'Scaled a Karnataka education channel by linking content strategy, audience insight, product pathways and conversion.' },
  { metric: '+26%', label: 'Sales efficiency', detail: 'Improved revenue operations through CRM redesign, lead scoring, follow-up systems and performance visibility.' },
  { metric: '900 IN 3 MONTHS', label: 'Product GTM', detail: 'Took Powerguides from concept through pricing, vendors, launch, sales and fulfilment.' },
  { metric: '₹6 CR / MONTH', label: 'Revenue operations', detail: 'Supported high-volume international admissions through forecasting, conversion reviews, capacity planning and payment visibility.' },
]

const transformations = [
  {
    tag: 'GROWTH SYSTEM',
    title: 'Turned content reach into a full-funnel education engine.',
    context: 'A growing audience needed a clearer path from discovery to trust, product and enrolment.',
    action: 'Connected YouTube, SEO, audience insight, program positioning, lead capture and CRM follow-up.',
    result: '27K → 400K+ subscribers',
  },
  {
    tag: 'REVENUE SYSTEM',
    title: 'Made lead prioritisation and follow-up measurable.',
    context: 'High lead volume created uneven follow-up, weak visibility and avoidable manager effort.',
    action: 'Redesigned CRM logic, lead scoring, dashboards, follow-up discipline and conversion reviews.',
    result: '+26% sales efficiency',
  },
  {
    tag: 'PRODUCT + GTM',
    title: 'Shipped a learning product from idea to market.',
    context: 'Students needed a practical, outcome-oriented study product beyond classes alone.',
    action: 'Owned product concept, pricing, vendors, launch, sales coordination and fulfilment.',
    result: '900 Powerguides / 3 months',
  },
]

const orgManagerModules = [
  ['CRM', 'Leads, pipeline, scoring and conversion context'],
  ['PROJECTS', 'CRM-linked delivery, owners, tasks and due dates'],
  ['HRMS', 'People, leave, attendance, payroll and recruitment'],
  ['AUTOMATION', 'Triggers, field changes, hand-offs and workflows'],
  ['COMMUNICATIONS', 'Email, SMS, WhatsApp and calling integrations'],
  ['INTELLIGENCE', 'Dashboards, unified insights and ask-your-data'],
]

const orgManagerFlow = [
  ['01', 'CAPTURE', 'Source + intent'],
  ['02', 'QUALIFY', 'Score + stage'],
  ['03', 'CONVERT', 'Calls + messages'],
  ['04', 'DELIVER', 'Task + owner'],
  ['05', 'LEARN', 'Views + analytics'],
]

const useCases: UseCase[] = [
  {
    id: 'lead-intelligence', category: 'Revenue', title: 'AI Lead Intelligence + Next Best Action', status: 'BUILT',
    summary: 'Turn fragmented CRM history, lead attributes and conversation context into a clear recommendation for what the rep should do next.',
    outcome: 'Less blind follow-up. Better prioritisation. More contextual conversations.',
    stack: ['CRM', 'n8n', 'ChatGPT / Claude', 'WhatsApp API', 'Sheets'],
    flow: ['Lead enters', 'Context assembled', 'Intent + objection inferred', 'Next action recommended', 'Human approves / acts'],
  },
  {
    id: 'call-coach', category: 'Revenue', title: 'AI Call Intelligence + Rep Coaching', status: 'APPLIED',
    summary: 'Convert sales calls into structured coaching: discovery quality, objection handling, product clarity, missed questions and a next-call plan.',
    outcome: 'Faster manager feedback and a repeatable coaching loop across a sales team.',
    stack: ['Fireflies', 'Whisper / transcription', 'LLMs', 'Notion / Sheets'],
    flow: ['Call recorded', 'Transcript created', 'Rubric applied', 'Gaps identified', 'Coaching plan generated'],
  },
  {
    id: 'follow-up-agent', category: 'Revenue', title: 'Context-Aware Follow-up Agent', status: 'PROTOTYPED',
    summary: 'A follow-up system that decides whether to contact, what unresolved objection exists, which channel fits and when a human should intervene.',
    outcome: 'Automation that optimises the decision, not just the message.',
    stack: ['n8n', 'CRM', 'LLM', 'Email', 'WhatsApp API'],
    flow: ['Read history', 'Check intent', 'Resolve objection', 'Select channel + timing', 'Escalate when needed'],
  },
  {
    id: 'exec-brief', category: 'Operations', title: 'Executive Daily Operating Brief', status: 'PROTOTYPED',
    summary: 'Aggregate sales, marketing, operations and team signals into a concise daily brief with anomalies, priorities and decisions requiring attention.',
    outcome: 'Leadership sees what changed, why it matters and what needs action without opening five dashboards.',
    stack: ['n8n', 'Sheets', 'CRM', 'GA4', 'LLM'],
    flow: ['Pull signals', 'Detect change', 'Rank importance', 'Explain impact', 'Deliver brief'],
  },
  {
    id: 'knowledge-copilot', category: 'Operations', title: 'SOP + Knowledge Copilot', status: 'APPLIED',
    summary: 'Convert scattered training material, brochures, notes and session recordings into a searchable, grounded assistant for teams.',
    outcome: 'Faster onboarding, fewer repeated questions and more consistent product knowledge.',
    stack: ['NotebookLM', 'LLMs', 'Drive / docs', 'Fireflies'],
    flow: ['Collect sources', 'Structure knowledge', 'Ground responses', 'Ask in natural language', 'Trace back to source'],
  },
  {
    id: 'meeting-action', category: 'Operations', title: 'Meeting → Decisions → Action System', status: 'APPLIED',
    summary: 'Turn meetings into decisions, owners, deadlines and follow-ups instead of passive transcripts that nobody revisits.',
    outcome: 'Less context loss between conversation and execution.',
    stack: ['Fireflies', 'n8n', 'Notion / Sheets', 'Slack', 'LLM'],
    flow: ['Capture meeting', 'Extract decisions', 'Assign owners', 'Create actions', 'Follow up automatically'],
  },
  {
    id: 'content-engine', category: 'Growth', title: 'AI Research-to-Content Engine', status: 'APPLIED',
    summary: 'Research a topic, synthesise credible inputs, create channel-specific drafts and preserve a consistent operator voice across content.',
    outcome: 'Higher content velocity without turning the output into generic AI copy.',
    stack: ['ChatGPT', 'Claude', 'NotebookLM', 'Canva', 'Automation'],
    flow: ['Research', 'Synthesize', 'Find angle', 'Draft by channel', 'Human editorial pass'],
  },
  {
    id: 'audience-system', category: 'Growth', title: 'Audience Insight + GTM Signal Engine', status: 'PROTOTYPED',
    summary: 'Cluster audience questions, search behaviour, lead conversations and campaign data into themes that inform content, positioning and offers.',
    outcome: 'A tighter feedback loop between audience signals and go-to-market decisions.',
    stack: ['GSC', 'GA4', 'CRM', 'Sheets', 'LLMs'],
    flow: ['Collect signals', 'Cluster intent', 'Detect themes', 'Map to offer', 'Prioritise experiments'],
  },
  {
    id: 'rapid-app', category: 'Build', title: 'Rapid AI App Prototyping', status: 'BUILT',
    summary: 'Move from a business problem to an interactive working product quickly, then validate workflows before investing in a larger build.',
    outcome: 'Shorter distance between idea, user feedback and a usable system.',
    stack: ['Lovable', 'Bolt', 'Supabase', 'Firebase', 'APIs'],
    flow: ['Define job', 'Prototype UI', 'Connect data', 'Add intelligence', 'Test with users'],
  },
  {
    id: 'workflow-os', category: 'Build', title: 'Cross-Tool Workflow Orchestration', status: 'BUILT',
    summary: 'Connect forms, CRM, payments, messaging, spreadsheets and AI models so information moves without manual copy-paste.',
    outcome: 'Fewer handoff failures and an operating system that moves with the customer.',
    stack: ['n8n', 'Razorpay Webhooks', 'WhatsApp API', 'Sheets', 'CRM'],
    flow: ['Event occurs', 'Validate data', 'Route workflow', 'Update systems', 'Notify / trigger next step'],
  },
  {
    id: 'video-studio', category: 'Creative', title: 'AI Video Production Pipeline', status: 'APPLIED',
    summary: 'Take a narrative from concept and storyboard through image/video generation, voice and final creative assembly.',
    outcome: 'Rapid visual experimentation for campaigns, explainers and creative concepts.',
    stack: ['Kling', 'Seedance', 'Crea', 'Canva', 'LLMs'],
    flow: ['Concept', 'Storyboard', 'Generate shots', 'Iterate continuity', 'Assemble final'],
  },
  {
    id: 'voice-music', category: 'Creative', title: 'AI Voice + Music Production', status: 'APPLIED',
    summary: 'Use generative audio tools as part of a structured creative process for voice, music ideation and production experiments.',
    outcome: 'A practical understanding of multimodal AI beyond text-only workflows.',
    stack: ['ElevenLabs', 'Suno', 'LLMs', 'Audio workflow'],
    flow: ['Creative brief', 'Write / prompt', 'Generate', 'Evaluate', 'Refine + publish'],
  },
  {
    id: 'manager-copilot', category: 'Operations', title: 'AI Manager Command Center', status: 'APPLIED',
    summary: 'Turn counsellor-level funnel data, pending follow-ups and daily activity into a focused manager view with individual coaching priorities.',
    outcome: 'Clearer daily priorities, faster intervention and less time spent assembling reports manually.',
    stack: ['CRM', 'Sheets', 'LLMs', 'Slack', 'Automation'],
    flow: ['Ingest activity', 'Score funnel health', 'Flag risk', 'Draft coaching brief', 'Manager reviews + acts'],
  },
  {
    id: 'roleplay-simulator', category: 'Revenue', title: 'AI Roleplay + Conversation Simulator', status: 'APPLIED',
    summary: 'Create realistic prospect personas, objections and evaluation rubrics so teams can practise discovery and receive consistent feedback.',
    outcome: 'More deliberate practice, faster readiness and coaching based on observable call behaviours.',
    stack: ['LLMs', 'Voice', 'Transcription', 'Rubrics', 'Knowledge base'],
    flow: ['Choose persona', 'Run simulation', 'Transcribe', 'Score behaviours', 'Generate practice plan'],
  },
  {
    id: 'opportunity-agent', category: 'Build', title: 'Opportunity Discovery + Application Agent', status: 'PROTOTYPED',
    summary: 'Find relevant roles, score fit, prevent duplicates and generate tailored application assets while keeping final submission under human control.',
    outcome: 'A repeatable agentic workflow for high-quality opportunity discovery without spray-and-pray applications.',
    stack: ['Search', 'LLMs', 'Automation', 'Email', 'Sheets / database'],
    flow: ['Discover roles', 'Verify eligibility', 'Score fit', 'Tailor assets', 'Human approval + send'],
  },
]

const capabilities = [
  ['Business diagnosis', 'Find the constraint before automating the symptom.'],
  ['AI workflow design', 'Design reasoning, data, human control and actions as one system.'],
  ['Automation architecture', 'Connect CRM, APIs, messaging, payments and operational tools.'],
  ['Growth + GTM systems', 'Turn customer and funnel signals into sharper experiments and decisions.'],
  ['Rapid prototyping', 'Build enough of the future state to test it with real users quickly.'],
  ['Measurement', 'Tie the system back to time, cost, conversion, quality, adoption or revenue.'],
]

const askAnswers: Record<string, { title: string; answer: string; evidence: string; proof: string[] }> = {
  'What makes you different from an AI tools person?': {
    title: 'I understand the business before I automate it.',
    answer: 'My base is business ownership across growth, revenue, CRM, operations, people, product thinking and P&L. I use AI after finding where context disappears, decisions slow down or work repeats.',
    evidence: 'The difference is operating judgment: choosing what should change, where a human stays in control and which business metric proves the system worked.',
    proof: ['7+ years operating depth', '100+ people led', 'P&L + full-funnel ownership'],
  },
  'Can you actually build automations?': {
    title: 'Yes — from trigger to decision to action.',
    answer: 'I work across n8n, APIs, webhooks, CRM, WhatsApp, payments, Sheets and LLMs. I design complete workflows with context, reasoning, safeguards, human approval and measurement.',
    evidence: 'The systems library shows practical automation patterns, while OrgManager proves I can carry a business problem through product modelling, workflow design and a public multi-tenant MVP.',
    proof: ['Live SaaS MVP', 'n8n + APIs + webhooks', 'Human-in-the-loop design'],
  },
  'Where is your strongest business depth?': {
    title: 'Growth, GTM and revenue operations — end to end.',
    answer: 'I have worked across acquisition, content, CRM, sales systems, product, pricing, onboarding, retention and P&L. That lets me spot automation opportunities across the customer journey, not inside one isolated task.',
    evidence: 'My strongest work connects customer signals, team behaviour and operating data to a faster decision or a measurable commercial outcome.',
    proof: ['27K → 400K+ audience', '+26% sales efficiency', '₹6 Cr/month operations'],
  },
  'What role are you best suited for?': {
    title: 'AI Automation & Business Transformation Lead.',
    answer: 'The strongest fit is a cross-functional role where I can diagnose processes, redesign workflows, prototype AI-enabled systems and drive adoption across growth, operations and customer-facing teams.',
    evidence: 'I sit between strategy and implementation: commercially grounded enough to prioritise the right problem and technical enough to get a credible solution shipped.',
    proof: ['AI Automation', 'Business Transformation', 'Growth / Revenue Operations'],
  },
}

const filters = ['All', 'Revenue', 'Operations', 'Growth', 'Build', 'Creative'] as const

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
}

function App() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')
  const [activeCase, setActiveCase] = useState(useCases[0].id)
  const [ask, setAsk] = useState(Object.keys(askAnswers)[0])

  const visibleCases = useMemo(() => filter === 'All' ? useCases : useCases.filter((item) => item.category === filter), [filter])
  const selected = useCases.find((item) => item.id === activeCase) ?? useCases[0]
  const answer = askAnswers[ask]

  const chooseFilter = (next: (typeof filters)[number]) => {
    setFilter(next)
    const first = next === 'All' ? useCases[0] : useCases.find((item) => item.category === next)
    if (first) setActiveCase(first.id)
  }

  return (
    <main id="top">
      <nav className="nav">
        <a className="brand" href="#top" aria-label="Prashanth Rapelli home"><span>PR</span><b>PRASHANTH RAPELLI</b></a>
        <div className="nav-links">
          <a href="#proof">Proof</a>
          <a href="#orgmanager">OrgManager</a>
          <a href="#systems">AI Systems</a>
          <a href="#ask">Ask PR</a>
        </div>
        <a className="nav-cta" href="mailto:prashanthasai.rapelli@gmail.com">LET'S TALK ↗</a>
      </nav>

      <section className="hero section">
        <div className="hero-grid" />
        <div className="hero-glow hero-glow--one" />
        <div className="hero-glow hero-glow--two" />
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <div className="eyebrow"><span className="live-dot" /> AI AUTOMATION × BUSINESS TRANSFORMATION</div>
          <h1>I redesign how businesses <em>decide, execute and scale.</em></h1>
          <p className="hero-lede">I bring 7+ years across growth, revenue, operations, product and P&L — then apply AI and automation to turn fragmented work into systems teams can actually use.</p>
          <div className="hero-actions">
            <a className="btn btn--primary" href="#systems">EXPLORE AI SYSTEMS <span>↓</span></a>
            <a className="btn btn--secondary" href="#orgmanager">VIEW SHIPPED PRODUCT <span>↗</span></a>
          </div>
          <div className="hero-fit" aria-label="Best-fit roles">
            <small>BEST FIT</small>
            <span>AI Automation</span>
            <span>Business Transformation</span>
            <span>Growth & Revenue Operations</span>
          </div>
        </motion.div>

        <motion.div className="hero-console" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}>
          <div className="console-top"><span>PR / SYSTEM DIAGNOSTIC</span><span className="console-status">● LIVE</span></div>
          <div className="console-core">
            <div className="core-ring ring-1" /><div className="core-ring ring-2" /><div className="core-ring ring-3" />
            <div className="core">AI<small>INTELLIGENCE<br />LAYER</small></div>
            <span className="node node-a">GROWTH</span><span className="node node-b">SALES</span><span className="node node-c">OPS</span><span className="node node-d">DATA</span><span className="node node-e">PRODUCT</span>
          </div>
          <div className="console-flow"><span>CONTEXT</span><i>→</i><span>DECISION</span><i>→</i><span>ACTION</span><i>→</i><span>MEASURE</span></div>
        </motion.div>

        <div className="hero-bottom">
          <span>7+ YEARS / BUSINESS + GROWTH + OPERATIONS</span>
          <span>AI IS THE LEVER. BUSINESS OUTCOME IS THE POINT.</span>
        </div>
      </section>

      <section className="proof section" id="proof">
        <motion.div className="section-heading" {...fadeUp}>
          <p className="kicker">01 / OPERATING PROOF</p>
          <h2>Business depth first. <span>AI leverage second.</span></h2>
          <p>I have operated inside real funnels, targets, teams, customer problems and P&L constraints. That is the foundation behind every system shown here.</p>
        </motion.div>
        <div className="proof-grid">
          {proof.map((item, index) => (
            <motion.article className="proof-card" key={item.metric} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.06 }}>
              <div className="proof-index">0{index + 1}</div>
              <strong>{item.metric}</strong>
              <h3>{item.label}</h3>
              <p>{item.detail}</p>
            </motion.article>
          ))}
        </div>
        <motion.div className="credibility-strip" {...fadeUp}>
          <span>FULL-FUNNEL</span><i>→</i><span>CRM + REVOPS</span><i>→</i><span>P&L</span><i>→</i><span>100+ PEOPLE LED</span><i>→</i><span>AI + AUTOMATION</span>
        </motion.div>
      </section>

      <section className="transformations section" id="transformations">
        <motion.div className="section-heading section-heading--wide" {...fadeUp}>
          <p className="kicker">02 / SELECTED TRANSFORMATIONS</p>
          <h2>Three problems. <span>Three operating systems rebuilt.</span></h2>
          <p>Compact case studies showing the situation, the intervention and the measurable result.</p>
        </motion.div>
        <div className="transformation-grid">
          {transformations.map((item, index) => (
            <motion.article className="transformation-card" key={item.tag} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.07 }}>
              <div className="transformation-top"><span>0{index + 1}</span><small>{item.tag}</small></div>
              <h3>{item.title}</h3>
              <dl>
                <div><dt>CONTEXT</dt><dd>{item.context}</dd></div>
                <div><dt>INTERVENTION</dt><dd>{item.action}</dd></div>
              </dl>
              <strong>{item.result}</strong>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="orgmanager section" id="orgmanager">
        <motion.div className="orgmanager-hero" {...fadeUp}>
          <div className="orgmanager-brandline">
            <div className="om-mark" aria-hidden="true">OM</div>
            <div>
              <small>SHIPPED PRODUCT / LIVE MVP</small>
              <strong>OrgManager</strong>
            </div>
            <span className="product-live"><i /> LIVE AT ORGMANAGER.IN</span>
          </div>

          <div className="orgmanager-title">
            <div>
              <p className="kicker">03 / PRODUCT OWNERSHIP</p>
              <h2>One operating record from <span>lead to delivery.</span></h2>
            </div>
            <div className="orgmanager-intro">
              <p>OrgManager is an India-first Business OS built to stop customer context, ownership and next actions from disappearing between CRM, delivery, people and communication tools.</p>
              <div className="orgmanager-actions">
                <a className="btn btn--primary" href="https://www.orgmanager.in/" target="_blank" rel="noreferrer">OPEN LIVE PRODUCT <span>↗</span></a>
                <a className="product-text-link" href="https://www.orgmanager.in/signup" target="_blank" rel="noreferrer">Create an organisation <span>↗</span></a>
              </div>
            </div>
          </div>

          <div className="product-canvas" aria-label="OrgManager product model">
            <div className="product-sidebar">
              <div className="product-sidebar-brand"><span>OM</span><b>OrgManager</b></div>
              {['Overview', 'CRM', 'Projects', 'People', 'Automations', 'Insights'].map((item, index) => (
                <div className={index === 1 ? 'active' : ''} key={item}><i />{item}</div>
              ))}
              <small>ONE ORG · ONE CONTEXT</small>
            </div>
            <div className="product-workspace">
              <div className="product-window-top">
                <div><small>ORGANISATION</small><strong>Operating workspace</strong></div>
                <div className="window-actions"><span /><span /><b>PR</b></div>
              </div>
              <div className="product-workspace-title">
                <div><small>CONNECTED WORKFLOW</small><h3>Customer context moves with the work.</h3></div>
                <span className="workspace-state">ROLE-AWARE</span>
              </div>
              <div className="product-flow-preview">
                {orgManagerFlow.slice(0, 4).map(([num, title, detail], index) => (
                  <div className="product-stage" key={title}>
                    <span>{num}</span><small>{title}</small><strong>{detail}</strong>
                    {index < 3 && <i>→</i>}
                  </div>
                ))}
              </div>
              <div className="product-context-row">
                <div><small>SHARED CONTEXT</small><strong>Lead history · owner · status · next action</strong></div>
                <div><small>CONTROL</small><strong>Organisation boundaries · roles · permissions</strong></div>
                <div><small>INTELLIGENCE</small><strong>Dashboards · scoring · ask-your-data</strong></div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="orgmanager-story">
          <motion.article className="product-thesis" {...fadeUp}>
            <p className="kicker">WHY I BUILT IT</p>
            <h3>The problem was never another missing tool. It was the missing hand-off between them.</h3>
            <p>At Parikshe, source, conversations, payment status and delivery work lived across tools and people. Managers had to reconstruct who owned the customer, what had happened and what should happen next.</p>
            <div className="product-role">
              <small>MY OWNERSHIP</small>
              <p>Mapped the hand-offs, defined the product model and business rules, designed the workflows, built the web experience and released the public MVP.</p>
            </div>
          </motion.article>

          <motion.div className="product-modules" {...fadeUp}>
            {orgManagerModules.map(([title, detail], index) => (
              <div className="product-module" key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{title}</strong>
                <p>{detail}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div className="product-architecture" {...fadeUp}>
          <div className="architecture-label"><small>CORE OPERATING LOOP</small><strong>Context stays connected.</strong></div>
          <div className="architecture-flow">
            {orgManagerFlow.map(([num, title, detail], index) => (
              <div key={title}>
                <span>{num}</span><strong>{title}</strong><small>{detail}</small>
                {index < orgManagerFlow.length - 1 && <i>→</i>}
              </div>
            ))}
          </div>
          <p><b>Current proof:</b> public product, organisation sign-up, multi-tenant structure, role-based access and connected CRM-to-delivery workflow. Quantified customer impact is not claimed yet.</p>
        </motion.div>
      </section>

      <section className="systems section" id="systems">
        <motion.div className="section-heading section-heading--wide" {...fadeUp}>
          <p className="kicker">04 / AI SYSTEMS LAB</p>
          <h2>A working library of <span>business use cases.</span></h2>
          <p>Selected systems I have built, applied or prototyped across revenue, operations, growth, rapid product development and multimodal creative workflows.</p>
        </motion.div>

        <div className="filters" role="tablist" aria-label="AI use case categories">
          {filters.map((item) => <button key={item} onClick={() => chooseFilter(item)} className={filter === item ? 'active' : ''}>{item}</button>)}
        </div>

        <div className="systems-layout">
          <div className="case-list">
            {visibleCases.map((item, index) => (
              <motion.button key={item.id} className={`case-row ${activeCase === item.id ? 'active' : ''}`} onClick={() => setActiveCase(item.id)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.025 }}>
                <span className="case-num">{String(useCases.indexOf(item) + 1).padStart(2, '0')}</span>
                <span className="case-main"><small>{item.category}</small><strong>{item.title}</strong></span>
                <span className={`case-status status-${item.status.toLowerCase()}`}>{item.status}</span>
                <span className="case-arrow">↗</span>
              </motion.button>
            ))}
          </div>

          <motion.aside className="case-detail" key={selected.id} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.28 }}>
            <div className="detail-top"><span>{selected.category.toUpperCase()} / SYSTEM DETAIL</span><b>{selected.status}</b></div>
            <h3>{selected.title}</h3>
            <p className="detail-summary">{selected.summary}</p>
            <div className="detail-outcome"><small>BUSINESS OUTCOME</small><p>{selected.outcome}</p></div>
            <div className="flow">
              {selected.flow.map((step, index) => <div key={step}><span>{String(index + 1).padStart(2, '0')}</span><b>{step}</b>{index < selected.flow.length - 1 && <i>↓</i>}</div>)}
            </div>
            <div className="stack"><small>STACK / EXAMPLES</small><div>{selected.stack.map((tool) => <span key={tool}>{tool}</span>)}</div></div>
          </motion.aside>
        </div>
      </section>

      <section className="method section" id="method">
        <motion.div className="section-heading" {...fadeUp}>
          <p className="kicker">05 / HOW I WORK</p>
          <h2>System first. <span>Intelligence second.</span> Automation third.</h2>
          <p>The fastest automation is useless if it accelerates the wrong process. I use a business-first transformation loop.</p>
        </motion.div>
        <div className="method-grid">
          {[
            ['01', 'UNDERSTAND', 'Customer, people, process, economics and the actual constraint.'],
            ['02', 'REDESIGN', 'Remove waste, simplify handoffs and decide what the future workflow should be.'],
            ['03', 'ADD INTELLIGENCE', 'Use reasoning, generation, retrieval or agents only where judgment adds leverage.'],
            ['04', 'AUTOMATE', 'Connect systems, APIs and actions with the right human checkpoints.'],
            ['05', 'MEASURE', 'Track revenue, time, cost, quality, adoption and failure modes.'],
          ].map(([num, title, detail], index) => (
            <motion.article key={title} className="method-card" {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.06 }}>
              <span>{num}</span><h3>{title}</h3><p>{detail}</p><div className="method-line" />
            </motion.article>
          ))}
        </div>
      </section>

      <section className="capabilities section">
        <motion.div className="capability-intro" {...fadeUp}>
          <p className="kicker">06 / WHAT I BRING</p>
          <h2>Strategy that reaches <span>implementation.</span></h2>
          <p>I am most useful between the leadership conversation and the working system — where priorities, people, process, data and technology have to come together.</p>
        </motion.div>
        <div className="capability-list">
          {capabilities.map(([title, detail], index) => (
            <motion.div className="capability-row" key={title} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.04 }}>
              <span>{String(index + 1).padStart(2, '0')}</span><strong>{title}</strong><p>{detail}</p><i>↗</i>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="toolbelt section">
        <p className="kicker">07 / CURRENT TOOLBELT</p>
        <div className="toolbelt-grid">
          <div><h2>Tools change.<br /><span>Operating logic shouldn't.</span></h2><p>I learn the stack fast, but I do not build my identity around a vendor.</p></div>
          <div className="tool-cloud">
            {['ChatGPT', 'Claude', 'Gemini', 'n8n', 'NotebookLM', 'Fireflies', 'Whisper', 'Lovable', 'Bolt', 'Supabase', 'Firebase', 'ElevenLabs', 'Suno', 'Kling', 'Seedance', 'Canva', 'GA4', 'GSC', 'CRM', 'WhatsApp API', 'Razorpay Webhooks', 'Google Sheets'].map((tool) => <span key={tool}>{tool}</span>)}
          </div>
        </div>
      </section>

      <section className="ask section" id="ask">
        <motion.div className="ask-copy" {...fadeUp}>
          <p className="kicker">08 / HIRING QUESTIONS</p>
          <h2>Ask what matters.</h2>
          <p>Choose the question behind the interview. The answer includes the fit, the reasoning and the proof.</p>
          <div className="ask-options" role="tablist" aria-label="Hiring questions">
            {Object.keys(askAnswers).map((question) => <button key={question} role="tab" aria-selected={ask === question} onClick={() => setAsk(question)} className={ask === question ? 'active' : ''}>{question}<span>↗</span></button>)}
          </div>
        </motion.div>
        <motion.div className="answer-panel" key={ask} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} aria-live="polite">
          <div className="answer-head"><span>PR / HIRING BRIEF</span><b>EVIDENCE-BASED</b></div>
          <div className="answer-content">
            <div className="answer-primary">
              <small>QUESTION</small><p className="question">{ask}</p>
              <small>ANSWER</small><h3>{answer.title}</h3><p>{answer.answer}</p>
            </div>
            <div className="answer-evidence">
              <div className="proof-chips">{answer.proof.map((item) => <span key={item}>{item}</span>)}</div>
              <div className="evidence"><small>WHY IT MATTERS</small><p>{answer.evidence}</p></div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="contact section" id="contact">
        <div className="contact-glow" />
        <p className="kicker">09 / LET'S TALK</p>
        <h2>If you are redesigning how a team works, let's talk.</h2>
        <p>I am best suited to AI automation, business transformation and growth or revenue operations roles where strategy has to become a working system.</p>
        <div className="contact-actions">
          <a className="btn btn--primary" href="mailto:prashanthasai.rapelli@gmail.com">EMAIL ME <span>↗</span></a>
          <a className="btn btn--secondary" href="https://linkedin.com/in/prashanthrapelli" target="_blank" rel="noreferrer">LINKEDIN <span>↗</span></a>
          <a className="btn btn--secondary" href="https://github.com/ronitsaigr" target="_blank" rel="noreferrer">GITHUB <span>↗</span></a>
        </div>
        <div className="footer"><span>PRASHANTH RAPELLI © 2026</span><span>BUSINESS SYSTEMS / AI / AUTOMATION</span><a href="#top">BACK TO TOP ↑</a></div>
      </section>
    </main>
  )
}

export default App
