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
  { metric: '27K → 400K+', label: 'Audience growth', detail: 'Scaled an education YouTube ecosystem by connecting content, audience insight, product priorities and conversion pathways.' },
  { metric: '+26%', label: 'Sales efficiency', detail: 'Improved revenue operations through CRM redesign, lead scoring, follow-up systems and performance visibility.' },
  { metric: '900 / 3 MO', label: 'GTM execution', detail: 'Took a physical learning product from concept through pricing, vendors, launch, sales and fulfilment.' },
  { metric: '₹6 CR / MO', label: 'Revenue operations', detail: 'Supported high-volume revenue operations with forecasting, conversion reviews, capacity planning and payment visibility.' },
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
]

const capabilities = [
  ['Business diagnosis', 'Find the constraint before automating the symptom.'],
  ['AI workflow design', 'Design reasoning, data, human control and actions as one system.'],
  ['Automation architecture', 'Connect CRM, APIs, messaging, payments and operational tools.'],
  ['Growth + GTM systems', 'Turn customer and funnel signals into sharper experiments and decisions.'],
  ['Rapid prototyping', 'Build enough of the future state to test it with real users quickly.'],
  ['Measurement', 'Tie the system back to time, cost, conversion, quality, adoption or revenue.'],
]

const askAnswers: Record<string, { title: string; answer: string; evidence: string }> = {
  'What makes you different from an AI tools person?': {
    title: 'I start with the operating system, not the tool.',
    answer: 'My base is business ownership: growth, revenue, CRM, operations, people, product thinking and P&L. AI is a leverage layer I add after understanding where context disappears, decisions slow down or work repeats.',
    evidence: 'That is why this portfolio shows business outcomes and operating depth before the tool stack.',
  },
  'Can you actually build automations?': {
    title: 'Yes — from event to decision to action.',
    answer: 'I work across n8n, APIs, webhooks, CRM, WhatsApp, payments, Sheets and LLMs. I think in complete workflows: trigger, context, reasoning, action, human control and measurement.',
    evidence: 'Examples above include lead intelligence, cross-tool orchestration, meeting-to-action systems and contextual follow-up.',
  },
  'Where is your strongest business depth?': {
    title: 'Full-funnel growth and revenue operations.',
    answer: 'I have worked across acquisition, content, CRM, sales systems, product, pricing, onboarding, retention and P&L — which helps me see automation opportunities across functions instead of inside one silo.',
    evidence: 'Proof points include 27K→400K+ audience growth, +26% sales efficiency and high-volume revenue operations.',
  },
  'What role are you best suited for?': {
    title: 'AI automation / business transformation / growth systems leadership.',
    answer: 'The best fit is a role where I can diagnose business processes, redesign workflows, prototype AI-enabled systems and drive adoption across teams — not simply manage a tool or write prompts.',
    evidence: 'My advantage is connecting commercial judgment with hands-on automation and product thinking.',
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
          <a href="#systems">AI Systems</a>
          <a href="#method">Method</a>
          <a href="#ask">Ask PR</a>
        </div>
        <a className="nav-cta" href="mailto:prashanthasai.rapelli@gmail.com">LET'S TALK ↗</a>
      </nav>

      <section className="hero section">
        <div className="hero-grid" />
        <div className="hero-glow hero-glow--one" />
        <div className="hero-glow hero-glow--two" />
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <div className="eyebrow"><span className="live-dot" /> BUSINESS SYSTEMS × AI × AUTOMATION</div>
          <h1>I turn messy business systems into <em>intelligent operating systems.</em></h1>
          <p className="hero-lede">I combine growth, revenue, operations, product thinking and hands-on AI automation to help teams decide faster, execute better and scale with less friction.</p>
          <div className="hero-actions">
            <a className="btn btn--primary" href="#systems">EXPLORE AI SYSTEMS <span>↓</span></a>
            <a className="btn btn--secondary" href="#proof">SEE OPERATING PROOF <span>↗</span></a>
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
          <h2>Before AI, there has to be <span>business depth.</span></h2>
          <p>I have operated inside real funnels, targets, teams, customer problems and P&L constraints. That changes how I design automation.</p>
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

      <section className="systems section" id="systems">
        <motion.div className="section-heading section-heading--wide" {...fadeUp}>
          <p className="kicker">02 / AI SYSTEMS LAB</p>
          <h2>Not a list of tools. <span>A library of business use cases.</span></h2>
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
          <p className="kicker">03 / HOW I WORK</p>
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
          <p className="kicker">04 / WHAT I BRING</p>
          <h2>A business operator who can <span>get technical enough to ship.</span></h2>
          <p>I am most useful between strategy and implementation — where a business problem needs to become a working system people actually adopt.</p>
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
        <p className="kicker">05 / CURRENT TOOLBELT</p>
        <div className="toolbelt-grid">
          <div><h2>Tools change.<br /><span>Operating logic shouldn't.</span></h2><p>I learn the stack fast, but I do not build my identity around a vendor.</p></div>
          <div className="tool-cloud">
            {['ChatGPT', 'Claude', 'Gemini', 'n8n', 'NotebookLM', 'Fireflies', 'Whisper', 'Lovable', 'Bolt', 'Supabase', 'Firebase', 'ElevenLabs', 'Suno', 'Kling', 'Seedance', 'Canva', 'GA4', 'GSC', 'CRM', 'WhatsApp API', 'Razorpay Webhooks', 'Google Sheets'].map((tool) => <span key={tool}>{tool}</span>)}
          </div>
        </div>
      </section>

      <section className="ask section" id="ask">
        <motion.div className="ask-copy" {...fadeUp}>
          <p className="kicker">06 / ASK PR</p>
          <h2>Interrogate the profile.</h2>
          <p>A useful portfolio should answer the questions a hiring leader is actually thinking — clearly and with evidence.</p>
          <div className="ask-options">
            {Object.keys(askAnswers).map((question) => <button key={question} onClick={() => setAsk(question)} className={ask === question ? 'active' : ''}>{question}<span>↗</span></button>)}
          </div>
        </motion.div>
        <motion.div className="answer-panel" key={ask} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="answer-head"><span>PR / PORTFOLIO INTELLIGENCE</span><b>GROUNDED RESPONSE</b></div>
          <small>QUESTION</small><p className="question">{ask}</p>
          <small>ANSWER</small><h3>{answer.title}</h3><p>{answer.answer}</p>
          <div className="evidence"><small>EVIDENCE</small><p>{answer.evidence}</p></div>
        </motion.div>
      </section>

      <section className="contact section" id="contact">
        <div className="contact-glow" />
        <p className="kicker">07 / LET'S BUILD</p>
        <h2>Bring me the process everyone has learned to tolerate.</h2>
        <p>If a workflow is slow, fragmented, repetitive or impossible to see end-to-end, I want to understand it.</p>
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
