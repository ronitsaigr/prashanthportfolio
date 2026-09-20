import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

type UseCase = {
  id: string
  category: 'Revenue' | 'Operations' | 'Build'
  title: string
  summary: string
  outcome: string
  stack: string[]
  status: 'BUILT' | 'APPLIED' | 'PROTOTYPED'
  flow: string[]
}

const RESUME = '/downloads/Prashanth_Rapelli_Resume.pdf'

const proof = [
  { metric: '10+ YEARS', label: 'Operating depth', detail: 'Growth, revenue, product, CRM, people, business operations and P&L.' },
  { metric: '100+ PEOPLE', label: 'Leadership scale', detail: 'Teams and operating units led across education, technology and operations.' },
  { metric: '+26%', label: 'Sales efficiency', detail: 'CRM logic, lead scoring, follow-up systems and performance visibility.' },
  { metric: '₹6 CR / MONTH', label: 'Revenue operations', detail: 'Planning, forecasting, capacity, conversion reviews and payment visibility.' },
]

const transformations = [
  { tag: 'GROWTH SYSTEM', title: 'Content reach became a full-funnel education engine.', action: 'Connected audience insight, content, product pathways, lead capture and CRM follow-up.', result: '27K → 400K+ subscribers' },
  { tag: 'REVENUE SYSTEM', title: 'Lead prioritisation became visible and coachable.', action: 'Redesigned CRM logic, scoring, dashboards, follow-up discipline and review cadences.', result: '+26% sales efficiency' },
  { tag: 'PRODUCT + GTM', title: 'A student need became a shipped learning product.', action: 'Owned concept, pricing, vendors, launch, sales coordination and fulfilment.', result: '900 Powerguides / 3 months' },
]

const useCases: UseCase[] = [
  {
    id: 'lead-intelligence', category: 'Revenue', title: 'Lead Intelligence + Next Best Action', status: 'BUILT',
    summary: 'Turns CRM history, lead attributes and conversation context into a clear recommendation for what the rep should do next.',
    outcome: 'Less blind follow-up. Better prioritisation. More contextual conversations.',
    stack: ['CRM', 'n8n', 'LLMs', 'WhatsApp API'], flow: ['Assemble context', 'Infer intent', 'Recommend action', 'Human acts'],
  },
  {
    id: 'call-coach', category: 'Revenue', title: 'Call Intelligence + Rep Coaching', status: 'APPLIED',
    summary: 'Converts calls into structured coaching across discovery, objections, product clarity, missed questions and next-call preparation.',
    outcome: 'Faster manager feedback and a repeatable coaching loop across the team.',
    stack: ['Superleap', 'Transcription', 'LLMs', 'Rubrics'], flow: ['Capture call', 'Apply rubric', 'Find gaps', 'Create coaching plan'],
  },
  {
    id: 'manager-copilot', category: 'Operations', title: 'Manager Command Center', status: 'APPLIED',
    summary: 'Turns counsellor-level funnel data, pending follow-ups and activity into an individualised manager view.',
    outcome: 'Clearer priorities, faster intervention and less time assembling reports.',
    stack: ['CRM', 'Sheets', 'LLMs', 'Slack'], flow: ['Ingest activity', 'Score health', 'Flag risk', 'Manager reviews'],
  },
  {
    id: 'knowledge-copilot', category: 'Operations', title: 'SOP + Knowledge Copilot', status: 'APPLIED',
    summary: 'Turns training material, brochures, notes and recordings into a grounded assistant for teams.',
    outcome: 'Faster onboarding, fewer repeated questions and more consistent product knowledge.',
    stack: ['NotebookLM', 'LLMs', 'Drive', 'Fireflies'], flow: ['Collect sources', 'Structure knowledge', 'Ground answers', 'Trace source'],
  },
  {
    id: 'meeting-action', category: 'Operations', title: 'Meeting → Decision → Action', status: 'APPLIED',
    summary: 'Turns meetings into decisions, owners, deadlines and follow-ups instead of passive transcripts.',
    outcome: 'Less context loss between conversation and execution.',
    stack: ['Fireflies', 'n8n', 'Slack', 'LLMs'], flow: ['Capture', 'Extract decisions', 'Assign owners', 'Follow up'],
  },
  {
    id: 'workflow-os', category: 'Build', title: 'Cross-Tool Workflow Orchestration', status: 'BUILT',
    summary: 'Connects forms, CRM, payments, messaging, spreadsheets and AI models so information moves with the customer.',
    outcome: 'Fewer hand-off failures and less manual copy-paste.',
    stack: ['n8n', 'Webhooks', 'WhatsApp API', 'CRM'], flow: ['Event occurs', 'Validate data', 'Route workflow', 'Update + notify'],
  },
]

const timeline = [
  { years: '2026 — NOW', company: 'GROWTHSCHOOL / OUTSKILL', role: 'Sales Manager, AI Programs', detail: 'Leading a 10-member consultant team; applying AI to coaching, prioritisation, product knowledge and manager visibility.' },
  { years: '2024 — 2026', company: 'PARIKSHE', role: 'Senior Business Manager', detail: 'Owned growth, revenue, product priorities, CRM, operations and P&L across multiple education products.' },
  { years: '2021 — 2024', company: 'PHYSICS WALLAH / INEURON', role: 'Associate General Manager', detail: 'Led 60+ across inside sales, CRM, marketing, student success and business operations.' },
  { years: '2017 — 2021', company: 'SHREE GROUP', role: 'Assistant Manager, Operations & Sales', detail: 'Managed a 120+ employee operating unit; increased output 46% and profitability approximately 30%.' },
  { years: '2015 — 2017', company: 'TIKONA INFINET', role: 'Marketing Executive', detail: 'Built the commercial foundation in customer acquisition, relationships and sales-to-service hand-offs.' },
]

const screenshots = [
  { src: '/orgmanager/dashboard.png', title: 'Operating dashboard', copy: 'A role-aware view of the organisation, priorities and work requiring attention.' },
  { src: '/orgmanager/crm-funnel.png', title: 'CRM funnel', copy: 'A clear view of movement, conversion and where the pipeline needs intervention.' },
  { src: '/orgmanager/projects.png', title: 'Connected delivery', copy: 'Project work stays linked to the customer context that created it.' },
  { src: '/orgmanager/agentic-os.png', title: 'Agentic OS', copy: 'An intelligence layer designed to answer questions and support decisions across the workspace.' },
]

const fadeUp = {
  initial: { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.58, ease: [0.16, 1, 0.3, 1] as const },
}

function Arrow() { return <span aria-hidden="true">↗</span> }

function Brand() {
  return <a className="brand" href="#top" aria-label="Prashanth Rapelli home"><span>PR</span><b>PRASHANTH RAPELLI</b></a>
}

function RecruiterBrief({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [onClose])

  if (!open) return null

  return <div className="brief-backdrop" role="presentation" onMouseDown={onClose}>
    <section className="brief-modal" role="dialog" aria-modal="true" aria-labelledby="brief-title" onMouseDown={(event) => event.stopPropagation()}>
      <div className="brief-head"><span>RECRUITER BRIEF / 90 SECONDS</span><button onClick={onClose} aria-label="Close recruiter brief">×</button></div>
      <div className="brief-body">
        <p className="kicker">THE SHORT VERSION</p><h2 id="brief-title">A business operator who can build the system.</h2>
        <p className="brief-lede">Prashanth brings 10+ years across growth, revenue, product, people, operations and P&L—plus hands-on AI workflow and product execution.</p>
        <div className="brief-grid">
          <div><small>BEST-FIT ROLES</small><p>AI Automation · Business Transformation · Product / Program Operations · Growth / Revenue Operations</p></div>
          <div><small>OPERATING SIGNAL</small><p>100+ people led · ₹6 Cr/month operations · +26% efficiency · 27K→400K+ audience</p></div>
          <div><small>BUILD SIGNAL</small><p>OrgManager live MVP · AI manager workflows · n8n, APIs, webhooks and rapid prototypes</p></div>
          <div><small>LOCATION</small><p>Remote / global first · Bengaluru or Hyderabad hybrid</p></div>
        </div>
        <div className="brief-actions"><a className="btn btn--primary" href={RESUME} download>DOWNLOAD RÉSUMÉ <span>↓</span></a><a className="btn btn--secondary" href="mailto:prashanthasai.rapelli@gmail.com">EMAIL PRASHANTH <Arrow /></a></div>
      </div>
    </section>
  </div>
}

function Home({ openBrief }: { openBrief: () => void }) {
  const [filter, setFilter] = useState<'All' | 'Revenue' | 'Operations' | 'Build'>('All')
  const [activeCase, setActiveCase] = useState(useCases[0].id)
  const visibleCases = useMemo(() => filter === 'All' ? useCases : useCases.filter((item) => item.category === filter), [filter])
  const selected = useCases.find((item) => item.id === activeCase) ?? useCases[0]
  const chooseFilter = (next: typeof filter) => {
    setFilter(next)
    setActiveCase((next === 'All' ? useCases[0] : useCases.find((item) => item.category === next))?.id ?? useCases[0].id)
  }

  return <main id="top">
    <nav className="nav"><Brand /><div className="nav-links"><a href="#proof">Proof</a><a href="#work">Work</a><a href="#systems">Systems</a><a href="#journey">Journey</a></div><button className="nav-cta" onClick={openBrief}>RECRUITER BRIEF</button></nav>

    <section className="hero section hero-v2">
      <div className="hero-orb hero-orb-a" /><div className="hero-orb hero-orb-b" />
      <motion.div className="hero-copy" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: [0.16, 1, 0.3, 1] }}>
        <div className="eyebrow"><span className="live-dot" /> BUSINESS SYSTEMS × AI × EXECUTION</div>
        <h1>Make the business <em>work better.</em></h1>
        <p className="hero-lede">I redesign how teams decide, execute and scale—then use AI, automation and product thinking to make the new operating model real.</p>
        <div className="hero-actions"><a className="btn btn--primary" href="#work">EXPLORE THE WORK <span>↓</span></a><button className="btn btn--secondary" onClick={openBrief}>OPEN RECRUITER BRIEF <Arrow /></button></div>
      </motion.div>
      <motion.div className="hero-proofline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .45, duration: .7 }}><span>10+ years operating depth</span><i /><span>100+ people led</span><i /><span>Live SaaS product</span><i /><a href={RESUME} download>Résumé ↓</a></motion.div>
    </section>

    <section className="proof section" id="proof">
      <motion.div className="section-heading" {...fadeUp}><p className="kicker">01 / OPERATING PROOF</p><h2>Not a tools portfolio. <span>An outcomes portfolio.</span></h2><p>The AI work is grounded in years spent inside real targets, teams, customers, operations and P&L constraints.</p></motion.div>
      <div className="proof-grid">{proof.map((item, index) => <motion.article className="proof-card" key={item.metric} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * .05 }}><span className="proof-index">0{index + 1}</span><strong>{item.metric}</strong><h3>{item.label}</h3><p>{item.detail}</p></motion.article>)}</div>
      <div className="transformation-strip">{transformations.map((item, index) => <motion.article key={item.tag} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * .05 }}><small>{item.tag}</small><h3>{item.title}</h3><p>{item.action}</p><strong>{item.result}</strong></motion.article>)}</div>
    </section>

    <section className="featured section" id="work">
      <motion.div className="section-heading section-heading--wide" {...fadeUp}><p className="kicker">02 / FLAGSHIP WORK</p><h2>Two systems that show <span>how I think.</span></h2><p>One is a shipped multi-tenant product. The other is the personal operating system behind how I research, decide and execute with AI.</p></motion.div>
      <motion.article className="feature-card feature-card--org" {...fadeUp}>
        <div className="feature-copy"><div className="feature-meta"><span>01</span><small>LIVE PRODUCT / FOUNDER-BUILDER</small></div><h3>OrgManager</h3><p>An India-first Business OS designed to keep customer context, ownership and next actions connected from lead to delivery.</p><div className="feature-pills"><span>CRM</span><span>Projects</span><span>HRMS</span><span>Automation</span><span>Intelligence</span></div><div className="feature-actions"><a className="btn btn--primary" href="#/work/orgmanager">READ CASE STUDY <Arrow /></a><a className="text-link" href="https://www.orgmanager.in/" target="_blank" rel="noreferrer">Open live product ↗</a></div></div>
        <a className="feature-visual browser-frame" href="#/work/orgmanager" aria-label="View OrgManager case study"><div className="browser-bar"><i /><i /><i /><span>orgmanager.in</span></div><img src="/orgmanager/dashboard.png" alt="OrgManager operating dashboard" loading="lazy" /></a>
      </motion.article>
      <motion.article className="feature-card feature-card--aios" {...fadeUp}>
        <div className="feature-copy"><div className="feature-meta"><span>02</span><small>APPLIED SYSTEM / HUMAN-IN-THE-LOOP</small></div><h3>Personal AI Operating System</h3><p>A practical operating layer that turns information from AI tools, Slack, meetings and documents into decisions, drafts, reminders and finished work.</p><div className="feature-actions"><a className="btn btn--primary" href="#/work/personal-ai-os">EXPLORE THE SYSTEM <Arrow /></a></div></div>
        <div className="feature-visual os-loop" aria-label="Personal AI operating system loop">{['CAPTURE', 'SENSE', 'DECIDE', 'CREATE', 'ACT'].map((step, index) => <div key={step}><span>0{index + 1}</span><strong>{step}</strong>{index < 4 && <i>→</i>}</div>)}<p>HUMAN JUDGMENT AT EVERY CONSEQUENTIAL STEP</p></div>
      </motion.article>
    </section>

    <section className="systems section" id="systems">
      <motion.div className="section-heading section-heading--wide" {...fadeUp}><p className="kicker">03 / SELECTED AI SYSTEMS</p><h2>Six useful systems. <span>No tool theatre.</span></h2><p>A tighter selection organised around decisions, execution and measurable team leverage.</p></motion.div>
      <div className="filters" role="tablist" aria-label="AI system categories">{(['All', 'Revenue', 'Operations', 'Build'] as const).map((item) => <button key={item} onClick={() => chooseFilter(item)} className={filter === item ? 'active' : ''}>{item}</button>)}</div>
      <div className="systems-layout">
        <div className="case-list">{visibleCases.map((item) => <button key={item.id} className={`case-row ${activeCase === item.id ? 'active' : ''}`} onClick={() => setActiveCase(item.id)}><span className="case-num">0{useCases.indexOf(item) + 1}</span><span className="case-main"><small>{item.category}</small><strong>{item.title}</strong></span><span className={`case-status status-${item.status.toLowerCase()}`}>{item.status}</span><span className="case-arrow">↗</span></button>)}</div>
        <motion.aside className="case-detail" key={selected.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}><div className="detail-top"><span>{selected.category.toUpperCase()} / SYSTEM</span><b>{selected.status}</b></div><h3>{selected.title}</h3><p className="detail-summary">{selected.summary}</p><div className="detail-outcome"><small>WHY IT MATTERS</small><p>{selected.outcome}</p></div><div className="flow">{selected.flow.map((step, index) => <div key={step}><span>0{index + 1}</span><b>{step}</b>{index < selected.flow.length - 1 && <i>↓</i>}</div>)}</div><div className="stack"><small>STACK / EXAMPLES</small><div>{selected.stack.map((tool) => <span key={tool}>{tool}</span>)}</div></div></motion.aside>
      </div>
      <p className="lab-note">Additional experiments span research-to-content, audience intelligence, voice, video, role-play simulation and opportunity discovery. They stay secondary here so the strongest business systems remain clear.</p>
    </section>

    <section className="journey section" id="journey">
      <motion.div className="section-heading" {...fadeUp}><p className="kicker">04 / PROFESSIONAL JOURNEY</p><h2>From frontline acquisition to <span>business systems leadership.</span></h2></motion.div>
      <div className="timeline">{timeline.map((item, index) => <motion.article key={item.company} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * .04 }}><span className="timeline-dot" /><time>{item.years}</time><div><small>{item.company}</small><h3>{item.role}</h3><p>{item.detail}</p></div></motion.article>)}</div>
    </section>

    <section className="testimonials section">
      <motion.div className="section-heading" {...fadeUp}><p className="kicker">05 / VERIFIED FEEDBACK</p><h2>What people noticed <span>in the work.</span></h2></motion.div>
      <div className="quote-grid"><motion.blockquote {...fadeUp}><span>“</span><p>Session went well, Prashanth was great.</p><footer><strong>Ritu Kataria</strong><small>Program feedback · 4.45 CSAT · 80 show-ups</small></footer></motion.blockquote><motion.blockquote {...fadeUp}><span>“</span><p>I loved your attitude today.</p><footer><strong>Surya Jugal</strong><small>Team feedback · September 2026</small></footer></motion.blockquote><motion.aside className="feedback-context" {...fadeUp}><small>WHY ONLY TWO?</small><p>These are direct, verified comments. I would rather show a small amount of real feedback than fill a portfolio with polished but unverified praise.</p></motion.aside></div>
    </section>

    <section className="decision section" id="ask">
      <motion.div className="decision-copy" {...fadeUp}><p className="kicker">06 / THE HIRING DECISION</p><h2>Operator first. Builder when useful. <span>Outcome always.</span></h2><p>The strongest fit is a cross-functional role where a messy process has to become a clear operating model, a credible AI-enabled system and a behaviour teams actually adopt.</p><div className="role-list"><span>AI Automation</span><span>Business Transformation</span><span>Product / Program Operations</span><span>Growth / Revenue Operations</span></div></motion.div>
      <motion.aside className="decision-card" {...fadeUp}><small>RECRUITER NEXT STEP</small><h3>Everything needed for the first decision.</h3><p>Open the concise brief, download the current résumé or move directly into a conversation.</p><button className="btn btn--primary" onClick={openBrief}>OPEN RECRUITER BRIEF <Arrow /></button><a className="download-link" href={RESUME} download>Download résumé ↓</a></motion.aside>
    </section>

    <section className="contact section" id="contact"><p className="kicker">07 / LET'S TALK</p><h2>Build a business that works <span>with more intelligence.</span></h2><p>For AI automation, business transformation, product / program operations and growth or revenue operations roles.</p><div className="contact-actions"><a className="btn btn--primary" href="mailto:prashanthasai.rapelli@gmail.com">EMAIL ME <Arrow /></a><a className="btn btn--secondary" href="https://linkedin.com/in/prashanthrapelli" target="_blank" rel="noreferrer">LINKEDIN <Arrow /></a><a className="btn btn--secondary" href={RESUME} download>RÉSUMÉ ↓</a></div><footer className="footer"><span>PRASHANTH RAPELLI © 2026</span><span>BUSINESS SYSTEMS / AI / AUTOMATION</span><a href="#top">BACK TO TOP ↑</a></footer></section>
  </main>
}

function CaseNav({ openBrief }: { openBrief: () => void }) {
  return <nav className="nav case-nav"><a className="case-back" href="#work">← BACK TO WORK</a><Brand /><button className="nav-cta" onClick={openBrief}>RECRUITER BRIEF</button></nav>
}

function CaseFooter() {
  return <footer className="case-footer section"><a href="#top">PRASHANTH RAPELLI</a><span>AI AUTOMATION × BUSINESS TRANSFORMATION</span><a href="mailto:prashanthasai.rapelli@gmail.com">START A CONVERSATION ↗</a></footer>
}

function OrgManagerCase({ openBrief }: { openBrief: () => void }) {
  const [shot, setShot] = useState(0)
  return <main id="top" className="case-page">
    <CaseNav openBrief={openBrief} />
    <header className="case-hero section">
      <motion.div className="case-hero-copy" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}><p className="kicker">CASE STUDY / LIVE PRODUCT</p><div className="case-title-row"><h1>OrgManager</h1><span><i /> LIVE MVP</span></div><p className="case-deck">One operating record from lead to delivery.</p><p className="case-intro">An India-first Business OS built to stop customer context, ownership and next actions from disappearing between CRM, delivery, people and communication tools.</p><div className="case-meta"><div><small>ROLE</small><strong>Founder · Product · Workflow design · Build</strong></div><div><small>SCOPE</small><strong>Multi-tenant SaaS · CRM · Projects · HRMS · AI</strong></div><div><small>STATUS</small><strong>Public MVP · Active iteration</strong></div></div><div className="case-actions"><a className="btn btn--primary" href="https://www.orgmanager.in/" target="_blank" rel="noreferrer">OPEN LIVE PRODUCT <Arrow /></a><a className="btn btn--secondary" href="https://www.orgmanager.in/signup" target="_blank" rel="noreferrer">CREATE AN ORGANISATION <Arrow /></a></div></motion.div>
      <motion.div className="case-hero-image browser-frame" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 }}><div className="browser-bar"><i /><i /><i /><span>app.orgmanager.in / dashboard</span></div><img src="/orgmanager/dashboard.png" alt="OrgManager dashboard" /></motion.div>
    </header>
    <section className="case-section section case-problem"><motion.div {...fadeUp}><p className="kicker">01 / THE PROBLEM</p><h2>The problem was not a missing tool. <span>It was the missing hand-off.</span></h2></motion.div><motion.div className="case-prose" {...fadeUp}><p>Source, conversation history, payment status, delivery work and ownership often live across different tools and people. Managers reconstruct the customer journey manually. Teams lose time. Customers repeat themselves. Next actions become invisible.</p><p>OrgManager reframes the company as one connected operating record: capture the customer, qualify intent, coordinate conversion, move the work into delivery and learn from the full journey.</p></motion.div></section>
    <section className="operating-loop section">{['CAPTURE|Source + intent', 'QUALIFY|Score + stage', 'CONVERT|Calls + messages', 'DELIVER|Task + owner', 'LEARN|Views + analytics'].map((item, index) => { const [title, detail] = item.split('|'); return <motion.div key={title} {...fadeUp}><span>0{index + 1}</span><strong>{title}</strong><small>{detail}</small>{index < 4 && <i>→</i>}</motion.div> })}</section>
    <section className="walkthrough section"><motion.div className="section-heading" {...fadeUp}><p className="kicker">02 / REAL PRODUCT WALKTHROUGH</p><h2>Follow the work through <span>the actual product.</span></h2><p>These are real authenticated product screens from the current OrgManager build.</p></motion.div><div className="walkthrough-layout"><div className="shot-tabs" role="tablist">{screenshots.map((item, index) => <button key={item.title} className={shot === index ? 'active' : ''} onClick={() => setShot(index)}><span>0{index + 1}</span><div><strong>{item.title}</strong><small>{item.copy}</small></div></button>)}</div><motion.figure className="shot-stage browser-frame" key={screenshots[shot].src} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }}><div className="browser-bar"><i /><i /><i /><span>OrgManager / {screenshots[shot].title}</span></div><img src={screenshots[shot].src} alt={`OrgManager ${screenshots[shot].title}`} /><figcaption><span>0{shot + 1}</span><strong>{screenshots[shot].title}</strong><p>{screenshots[shot].copy}</p></figcaption></motion.figure></div></section>
    <section className="case-section section"><motion.div {...fadeUp}><p className="kicker">03 / PRODUCT MODEL</p><h2>Six modules. <span>One connected context.</span></h2></motion.div><div className="module-grid">{[['CRM', 'Leads, pipeline, scoring and conversation context.'], ['PROJECTS', 'CRM-linked delivery, owners, tasks and due dates.'], ['HRMS', 'People, leave, attendance, payroll and recruitment.'], ['AUTOMATION', 'Triggers, field changes, hand-offs and workflows.'], ['COMMUNICATIONS', 'Email, SMS, WhatsApp and calling integrations.'], ['INTELLIGENCE', 'Dashboards, unified insights and ask-your-data.']].map(([title, detail], index) => <motion.article key={title} {...fadeUp}><span>0{index + 1}</span><h3>{title}</h3><p>{detail}</p></motion.article>)}</div></section>
    <section className="case-section section case-decisions"><motion.div {...fadeUp}><p className="kicker">04 / PRODUCT JUDGMENT</p><h2>The build is important. <span>The decisions are the case.</span></h2></motion.div><div className="decision-grid"><motion.article {...fadeUp}><small>ONE ORG · ONE CONTEXT</small><h3>Tenant boundaries are part of the product.</h3><p>Organisation-aware data, roles and permissions are treated as core operating logic—not an afterthought.</p></motion.article><motion.article {...fadeUp}><small>WORK FOLLOWS THE CUSTOMER</small><h3>CRM does not end at conversion.</h3><p>Delivery tasks and ownership stay connected to the customer context that created the work.</p></motion.article><motion.article {...fadeUp}><small>INTELLIGENCE WITH CONTROL</small><h3>AI supports the decision.</h3><p>The intelligence layer is designed to surface context and recommendations while keeping consequential action with a person.</p></motion.article></div></section>
    <section className="case-proof section"><div><p className="kicker">05 / CURRENT PROOF</p><h2>What is real today.</h2></div><div className="case-proof-list"><span>Public product</span><span>Organisation sign-up</span><span>Multi-tenant structure</span><span>Role-based access</span><span>Connected CRM-to-delivery workflow</span><span>Authenticated product experience</span></div><p className="integrity-note">Quantified customer impact is not claimed yet. The current proof is product depth, operating logic and a functioning public MVP.</p></section>
    <section className="case-cta section"><p className="kicker">SEE IT IN CONTEXT</p><h2>Open the product. Follow the workflow.</h2><div><a className="btn btn--primary" href="https://www.orgmanager.in/" target="_blank" rel="noreferrer">VISIT ORGMANAGER.IN <Arrow /></a><a className="btn btn--secondary" href="#/work/personal-ai-os">NEXT CASE: PERSONAL AI OS <Arrow /></a></div></section><CaseFooter />
  </main>
}

function PersonalAIOSCase({ openBrief }: { openBrief: () => void }) {
  const stages = [['01', 'CAPTURE', 'ChatGPT, Claude, Slack, meetings, documents and web research'], ['02', 'SENSE', 'Summarise, cluster, retrieve context and identify what changed'], ['03', 'DECIDE', 'Frame options, risks, priorities and the next best action'], ['04', 'CREATE', 'Draft briefs, reports, messages, content, plans and prototypes'], ['05', 'ACT', 'Schedule, remind, hand off, update tools or request approval']]
  return <main id="top" className="case-page aios-page">
    <CaseNav openBrief={openBrief} />
    <header className="case-hero section aios-hero"><motion.div className="case-hero-copy" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}><p className="kicker">CASE STUDY / APPLIED SYSTEM</p><div className="case-title-row"><h1>Personal AI<br />Operating System</h1><span><i /> HUMAN-IN-THE-LOOP</span></div><p className="case-deck">From information overload to finished work.</p><p className="case-intro">A practical operating layer that brings research, memory, decisions, creation and action into one repeatable loop—without pretending every tool is fully autonomous.</p><div className="case-meta"><div><small>ROLE</small><strong>System designer · Primary user · Operator</strong></div><div><small>SCOPE</small><strong>Research · Decisions · Content · Workflow</strong></div><div><small>STATUS</small><strong>Applied daily · Continuously evolving</strong></div></div></motion.div><motion.div className="aios-orbit" initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .12 }}><div className="aios-core">PR<small>JUDGMENT</small></div>{['CONTEXT', 'MEMORY', 'TOOLS', 'ACTION', 'REVIEW'].map((item, index) => <span className={`orbit-node orbit-${index + 1}`} key={item}>{item}</span>)}</motion.div></header>
    <section className="case-section section case-problem"><motion.div {...fadeUp}><p className="kicker">01 / THE DESIGN QUESTION</p><h2>How can one person use many AI tools <span>without creating more fragmentation?</span></h2></motion.div><motion.div className="case-prose" {...fadeUp}><p>The common failure mode is a collection of clever chats: good answers, scattered context and no reliable path to action. The operating system is designed around a different unit—the complete job.</p><p>Information enters once, gets interpreted with relevant context, becomes a decision or draft, then moves to a real action with a human checkpoint where the consequence matters.</p></motion.div></section>
    <section className="aios-pipeline section">{stages.map(([num, title, detail], index) => <motion.article key={title} {...fadeUp}><span>{num}</span><h3>{title}</h3><p>{detail}</p>{index < stages.length - 1 && <i>↓</i>}</motion.article>)}</section>
    <section className="case-section section"><motion.div {...fadeUp}><p className="kicker">02 / THE OPERATING LAYERS</p><h2>One loop. <span>Different levels of autonomy.</span></h2></motion.div><div className="layer-grid"><motion.article {...fadeUp}><span>CONNECTED</span><h3>Tool calls and grounded context</h3><p>Use ChatGPT, Claude, Slack, Drive, documents and research as a connected working surface when integrations allow it.</p></motion.article><motion.article {...fadeUp}><span>SCHEDULED</span><h3>Briefs, reminders and recurring checks</h3><p>Move predictable work into scheduled tasks so attention is reserved for exceptions, judgment and creative direction.</p></motion.article><motion.article {...fadeUp}><span>MANUAL BY DESIGN</span><h3>Approval at consequential steps</h3><p>Keep sending, publishing, committing or changing business state behind an explicit human decision.</p></motion.article></div></section>
    <section className="daily-system section"><motion.div {...fadeUp}><p className="kicker">03 / DAILY APPLICATION</p><h2>The system meets the work <span>where it happens.</span></h2></motion.div><div className="daily-grid">{[['LEADERSHIP', 'Turn CRM signals and team activity into manager priorities and coaching briefs.'], ['RESEARCH', 'Move from broad questions to sourced synthesis, trade-offs and a decision-ready brief.'], ['CREATION', 'Carry an idea through writing, visual direction, audio experiments and final editorial judgment.'], ['BUILD', 'Translate a business problem into requirements, a working prototype and a testable workflow.'], ['FOLLOW-THROUGH', 'Convert conversations into owners, deadlines, reminders and the next review point.'], ['MEMORY', 'Retain durable preferences, constraints and decisions so the next task starts with context.']].map(([title, detail], index) => <motion.article key={title} {...fadeUp}><span>0{index + 1}</span><h3>{title}</h3><p>{detail}</p></motion.article>)}</div></section>
    <section className="case-section section case-decisions"><motion.div {...fadeUp}><p className="kicker">04 / GUARDRAILS</p><h2>Useful automation needs <span>honest boundaries.</span></h2></motion.div><div className="decision-grid"><motion.article {...fadeUp}><small>GROUND THE ANSWER</small><h3>Source before confidence.</h3><p>Use authoritative context, show the basis for recommendations and make uncertainty visible.</p></motion.article><motion.article {...fadeUp}><small>PRESERVE AGENCY</small><h3>Assist before acting.</h3><p>Draft, recommend and prepare; require approval before sending or changing consequential state.</p></motion.article><motion.article {...fadeUp}><small>DESIGN FOR FAILURE</small><h3>Exceptions are part of the workflow.</h3><p>Define what happens when context is missing, a tool fails or the system should escalate to a person.</p></motion.article></div></section>
    <section className="case-proof section"><div><p className="kicker">05 / PRACTICAL VALUE</p><h2>What the system changes.</h2></div><div className="case-proof-list"><span>Less context switching</span><span>Faster first drafts</span><span>Clearer decisions</span><span>More reliable follow-through</span><span>Reusable working memory</span><span>Human control preserved</span></div><p className="integrity-note">This is an applied operating case, not a claim of full autonomy. Some actions are connected, some scheduled and some intentionally manual.</p></section>
    <section className="case-cta section"><p className="kicker">NEXT</p><h2>See the operating logic become a product.</h2><div><a className="btn btn--primary" href="#/work/orgmanager">VIEW ORGMANAGER CASE <Arrow /></a><a className="btn btn--secondary" href={RESUME} download>DOWNLOAD RÉSUMÉ ↓</a></div></section><CaseFooter />
  </main>
}

function App() {
  const [route, setRoute] = useState(window.location.hash)
  const [briefOpen, setBriefOpen] = useState(false)
  useEffect(() => { const onHash = () => setRoute(window.location.hash); window.addEventListener('hashchange', onHash); return () => window.removeEventListener('hashchange', onHash) }, [])
  useEffect(() => {
    const isCase = route.startsWith('#/work/')
    document.title = isCase ? `${route.includes('orgmanager') ? 'OrgManager' : 'Personal AI Operating System'} — Prashanth Rapelli` : 'Prashanth Rapelli — AI Automation & Business Transformation'
    if (isCase || !route) window.scrollTo({ top: 0, behavior: 'instant' })
    else requestAnimationFrame(() => document.getElementById(route.slice(1))?.scrollIntoView())
  }, [route])
  const openBrief = () => setBriefOpen(true)
  let page = <Home openBrief={openBrief} />
  if (route === '#/work/orgmanager') page = <OrgManagerCase openBrief={openBrief} />
  if (route === '#/work/personal-ai-os') page = <PersonalAIOSCase openBrief={openBrief} />
  return <>{page}<RecruiterBrief open={briefOpen} onClose={() => setBriefOpen(false)} /></>
}

export default App
