import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { Nav } from './components/Nav'
import { OrgNetwork } from './components/OrgNetwork'
import { AskPrButton } from './components/AskPrButton'

const method = [
  ['01', 'UNDERSTAND', 'people / process / customer / economics'],
  ['02', 'REDESIGN', 'remove / simplify / connect'],
  ['03', 'ADD INTELLIGENCE', 'reasoning / generation / prediction / agents'],
  ['04', 'AUTOMATE', 'systems / APIs / actions / orchestration'],
  ['05', 'MEASURE', 'revenue / time / cost / quality / adoption'],
]

const diagnosticPhases = [
  {
    eyebrow: 'CURRENT STATE',
    title: 'The organization is working.\nThe system is not.',
    body: 'Information is scattered. Handoffs are manual. Teams repeat work. Leaders wait for visibility. The customer experiences the gaps between departments.',
    mode: 'current' as const,
    status: 'FRAGMENTED OPERATING SYSTEM',
  },
  {
    eyebrow: 'DIAGNOSIS',
    title: 'Find the friction\nbefore adding AI.',
    body: 'I look for where context disappears, work gets duplicated, decisions queue up, revenue leaks and human judgment is being used on the wrong problems.',
    mode: 'diagnose' as const,
    status: '3 HIGH-LEVERAGE FRICTION POINTS',
  },
  {
    eyebrow: 'REDESIGN',
    title: 'Connect context,\ndecisions and action.',
    body: 'Then AI becomes useful: a reasoning layer over real business context, connected to workflows, systems and human approvals instead of another isolated tool.',
    mode: 'transformed' as const,
    status: 'INTELLIGENCE LAYER ACTIVE',
  },
  {
    eyebrow: 'OUTCOME',
    title: 'The goal is not\nmore automation.',
    body: 'The goal is a business that responds faster, sees problems earlier, reduces unnecessary work and makes better decisions with measurable commercial impact.',
    mode: 'transformed' as const,
    status: 'SYSTEM OPTIMIZED FOR OUTCOMES',
  },
]

const proof = [
  ['27K → 400K+', 'AUDIENCE SYSTEM', 'Scaled Parikshe YouTube by aligning content, audience insight, product priorities and conversion pathways.'],
  ['+26%', 'SALES EFFICIENCY', 'Redesigned lead scoring, CRM workflows, follow-up SOPs and performance dashboards across revenue operations.'],
  ['900 / 3 MONTHS', 'GTM SYSTEM', 'Took a physical learning product from concept through pricing, vendor execution, launch, sales and fulfilment.'],
  ['₹6 CR / MONTH', 'REVENUE OPERATIONS', 'Supported high-volume revenue operations through forecasting, capacity planning, conversion reviews and payment visibility.'],
]

const decisionNodes = [
  ['Should we follow up?', 'The first decision is whether another touch is useful at all.'],
  ['What happened previously?', 'Read CRM history, conversation context, promises and unresolved questions.'],
  ['What does the customer want?', 'Infer current intent instead of treating every lead the same.'],
  ['What objection exists?', 'Identify the unresolved barrier before generating another message.'],
  ['Which channel and when?', 'Choose the action around context, urgency and customer behaviour.'],
  ['Does a human need to intervene?', 'Escalate when judgment, accountability or empathy matters.'],
]

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -52])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.78, 1], [1, 0.78, 0])
  const networkScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  return (
    <section ref={ref} className="hero section" aria-labelledby="hero-title">
      <motion.div className="hero-network-wrap" style={{ scale: networkScale }}>
        <OrgNetwork />
      </motion.div>
      <div className="hero-grid" />
      <div className="hero-vignette" />
      <div className="hero-noise" />

      <motion.div className="hero-content" style={{ y: contentY, opacity: contentOpacity }}>
        <motion.div className="hero-status" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.15 }}>
          <span className="status-pulse" /> BUSINESS SYSTEMS / AI / AUTOMATION
        </motion.div>

        <motion.h1 id="hero-title" initial="hidden" animate="visible" variants={reveal} transition={{ duration: 0.95, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}>
          I redesign organizations<br /><span>around AI.</span>
        </motion.h1>

        <motion.div className="hero-lower" initial="hidden" animate="visible" variants={reveal} transition={{ duration: 0.8, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}>
          <p className="hero-copy">I connect growth, operations, data and automation into systems that help businesses decide faster, execute better and scale with less friction.</p>
          <div className="hero-actions">
            <a className="button button--primary" href="#operator">SEE HOW I THINK <span>↓</span></a>
            <button className="button button--ghost" onClick={() => document.getElementById('proof')?.scrollIntoView({ behavior: 'smooth' })}>VIEW PROOF <span>↗</span></button>
          </div>
        </motion.div>
      </motion.div>

      <div className="hero-principle">SYSTEM FIRST <i>→</i> INTELLIGENCE SECOND <i>→</i> AUTOMATION THIRD</div>
      <div className="scroll-cue"><span className="scroll-line" />SCROLL TO ENTER THE SYSTEM</div>
    </section>
  )
}

function SystemDiagnostic() {
  const ref = useRef<HTMLElement>(null)
  const [phase, setPhase] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = Math.min(diagnosticPhases.length - 1, Math.floor(value * diagnosticPhases.length))
    setPhase((current) => current === next ? current : next)
  })

  const current = diagnosticPhases[phase]

  return (
    <section ref={ref} className="diagnostic" id="operator">
      <div className="diagnostic-sticky section">
        <div className="diagnostic-grid">
          <div className="diagnostic-copy">
            <p className="kicker">01 / HOW I SEE A BUSINESS</p>
            <div className="phase-index">
              {diagnosticPhases.map((item, index) => (
                <span key={item.eyebrow} className={index === phase ? 'active' : index < phase ? 'done' : ''}>{String(index + 1).padStart(2, '0')}</span>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={phase} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .32 }}>
                <p className="diagnostic-eyebrow">{current.eyebrow}</p>
                <h2>{current.title.split('\n').map((line, index) => <span key={line}>{line}{index === 0 && <br />}</span>)}</h2>
                <p className="diagnostic-body">{current.body}</p>
              </motion.div>
            </AnimatePresence>
            <div className="diagnostic-rule">I don't start with AI. <strong>I start with the system.</strong></div>
          </div>

          <div className="network-frame network-frame--diagnostic">
            <div className="frame-label frame-label--top">ORGANIZATION / LIVE DIAGNOSTIC</div>
            <div className="frame-status"><span />{current.status}</div>
            <OrgNetwork detailed mode={current.mode} />
            {phase === 3 && (
              <motion.div className="outcome-strip" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <span><b>01</b> LESS REWORK</span>
                <span><b>02</b> FASTER RESPONSE</span>
                <span><b>03</b> BETTER VISIBILITY</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function App() {
  const [activeDecision, setActiveDecision] = useState<number | null>(0)

  return (
    <main id="top">
      <Nav />
      <AskPrButton />
      <Hero />
      <SystemDiagnostic />

      <section className="method section" id="builder">
        <div className="method-header">
          <p className="kicker">02 / OPERATING PHILOSOPHY</p>
          <h2>The business outcome<br />is the outcome.</h2>
          <p>Technology is not the outcome. Automation is not the outcome. AI is not the outcome. They are leverage applied to a system that already makes business sense.</p>
        </div>
        <div className="method-orbit">
          <div className="outcome-wrap">
            <div className="orbit-ring orbit-ring--one" />
            <div className="orbit-ring orbit-ring--two" />
            <div className="outcome-core"><span>DESIRED</span><strong>OUTCOME</strong><small>VALUE FIRST</small></div>
          </div>
          <div className="method-list">
            {method.map(([num, title, detail], index) => (
              <motion.div className="method-step" key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
                <span className="method-num">{num}</span><div><strong>{title}</strong><small>{detail}</small></div><span className="method-arrow">↗</span>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div className="outcomes-line" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>I automate outcomes. <span>Not tasks.</span></motion.div>
      </section>

      <section className="proof section" id="proof">
        <div className="proof-head">
          <p className="kicker">03 / PROOF OF OPERATING DEPTH</p>
          <h2>Systems thinking only matters<br />when it survives reality.</h2>
          <p>My background is not “AI tools.” It is revenue, growth, operations, CRM, people and execution — with technology used to make the system stronger.</p>
        </div>
        <div className="proof-grid">
          {proof.map(([metric, title, detail], index) => (
            <motion.article className="proof-card" key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ delay: index * .06 }}>
              <span>{String(index + 1).padStart(2, '0')}</span><strong>{metric}</strong><h3>{title}</h3><p>{detail}</p>
            </motion.article>
          ))}
        </div>
        <div className="proof-system-line"><span>BUSINESS</span><i>→</i><span>DATA</span><i>→</i><span>DECISION</span><i>→</i><span>AUTOMATION</span><i>→</i><span>OUTCOME</span></div>
      </section>

      <section className="email-demo section" id="creator">
        <div className="email-inner">
          <p className="kicker">04 / PROVE THE DIFFERENCE</p>
          <div className="email-title-row"><h2>“Send a follow-up email.”</h2><span className="task-chip">AUTOMATION REQUEST</span></div>
          <div className="simple-flow" aria-label="Simple automation flow"><span>TRIGGER</span><i>→</i><span>GENERATE</span><i>→</i><span>SEND</span><b>✓ DONE</b></div>
          <p className="email-intro">That works. <strong>But it solves the task, not necessarily the problem.</strong></p>

          <div className="decision-layout">
            <div className="decision-system">
              <div className="decision-spine" />
              {decisionNodes.map(([title], index) => (
                <button className={`decision-node ${activeDecision === index ? 'decision-node--active' : ''}`} key={title} onClick={() => setActiveDecision(index)}>
                  <span>{String(index + 1).padStart(2, '0')}</span><strong>{title}</strong><em>VIEW LOGIC</em>
                </button>
              ))}
            </div>
            <div className="decision-panel-shell">
              <div className="panel-label">INTELLIGENCE LAYER</div>
              <AnimatePresence mode="wait">
                {activeDecision !== null && (
                  <motion.div className="decision-detail" key={activeDecision} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .25 }}>
                    <span>VIEW LOGIC / {String(activeDecision + 1).padStart(2, '0')}</span><h4>{decisionNodes[activeDecision][0]}</h4><p>{decisionNodes[activeDecision][1]}</p>
                    <div className="logic-grid"><div><small>INPUT</small><b>CONTEXT</b></div><div><small>DECISION</small><b>REASON</b></div><div><small>OUTPUT</small><b>NEXT ACTION</b></div><div><small>CONTROL</small><b>HUMAN WHEN NEEDED</b></div></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="email-conclusion"><p className="kicker">THE ACTUAL PROBLEM</p><h3>The email was never the problem.</h3><p>Understanding what should happen next was.</p></div>
        </div>
      </section>

      <section className="stack section">
        <p className="kicker">05 / TECHNOLOGY AS LEVERAGE</p>
        <div className="stack-grid">
          <h2>I use the stack that<br />fits the system.</h2>
          <div className="stack-cloud">
            {['ChatGPT', 'Claude', 'Gemini', 'n8n', 'CRM', 'WhatsApp API', 'Razorpay Webhooks', 'Google Sheets', 'GA4', 'GSC', 'Fireflies', 'NotebookLM'].map((tool) => <span key={tool}>{tool}</span>)}
          </div>
        </div>
        <p className="stack-note">Tools change. The operating logic should survive the tool change.</p>
      </section>

      <section className="ask-preview section" id="ask-preview">
        <p className="kicker">ASK PR / NEXT BUILD</p>
        <h2>The portfolio should eventually<br />answer with evidence, not hype.</h2>
        <p>The next layer is a portfolio intelligence navigator that can answer questions about my work, systems and case studies from structured evidence.</p>
        <a href="#top" className="button button--ghost">BACK TO TOP <span>↑</span></a>
      </section>

      <section id="work-with-me" className="work section">
        <p className="kicker">WORK WITH ME</p>
        <h2>Bring me a messy system.</h2>
        <p>If growth, sales, operations and technology are all moving but the organization still feels slower than it should, that is the kind of problem I like working on.</p>
        <div className="contact-actions"><a className="button button--primary" href="mailto:prashanthasai.rapelli@gmail.com">EMAIL ME <span>↗</span></a><a className="button button--ghost" href="https://linkedin.com/in/prashanthrapelli" target="_blank" rel="noreferrer">LINKEDIN <span>↗</span></a></div>
      </section>
    </main>
  )
}

export default App
