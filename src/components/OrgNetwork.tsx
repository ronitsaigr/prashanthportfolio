import { motion } from 'framer-motion'
import { fragments, orgNodes } from '../data/organization'

type NetworkMode = 'current' | 'diagnose' | 'transformed'

type Props = {
  detailed?: boolean
  mode?: NetworkMode
}

const edges = [
  ['revenue', 'data'],
  ['people', 'data'],
  ['product', 'data'],
  ['data', 'customer'],
  ['data', 'operations'],
  ['data', 'leadership'],
  ['operations', 'revenue'],
  ['product', 'customer'],
] as const

const frictionEdges = new Set([1, 4, 6])

export function OrgNetwork({ detailed = false, mode = 'current' }: Props) {
  const nodeById = Object.fromEntries(orgNodes.map((node) => [node.id, node]))
  const transformed = mode === 'transformed'
  const diagnosing = mode === 'diagnose'

  return (
    <div className={`org-network org-network--${mode} ${detailed ? 'org-network--detailed' : ''}`} aria-hidden="true">
      <svg className="org-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        {edges.map(([from, to], index) => {
          const a = nodeById[from]
          const b = nodeById[to]
          const broken = !transformed && frictionEdges.has(index)
          return (
            <motion.line
              key={`${from}-${to}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              className={`edge ${broken ? 'edge--broken' : ''} ${diagnosing && broken ? 'edge--diagnosed' : ''}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: transformed ? 0.72 : diagnosing ? (broken ? 0.95 : 0.22) : detailed ? 0.48 : 0.22,
              }}
              transition={{ duration: 0.75, delay: index * 0.04 }}
            />
          )
        })}
      </svg>

      {orgNodes.map((node, index) => (
        <motion.div
          className={`org-node org-node--${node.id}`}
          key={node.id}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: transformed ? 1 : detailed || diagnosing ? 0.94 : 0.42,
            scale: transformed ? 1.03 : 1,
          }}
          transition={{ duration: 0.5, delay: index * 0.035 }}
        >
          <span className="node-dot" />
          <span className="node-label">{node.label}</span>
          <span className="node-detail">{node.detail}</span>
        </motion.div>
      ))}

      {(detailed || diagnosing) && !transformed && fragments.map((fragment, index) => (
        <motion.span
          key={fragment.text}
          className={`fragment ${diagnosing && index < 3 ? 'fragment--hot' : ''}`}
          style={{ left: `${fragment.x}%`, top: `${fragment.y}%` }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: diagnosing ? (index < 3 ? 1 : 0.45) : 0.68, scale: 1 }}
          transition={{ duration: 0.35, delay: index * 0.04 }}
        >
          {fragment.text}
        </motion.span>
      ))}

      {transformed && (
        <>
          <motion.div className="intelligence-core" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55 }}>
            <span>AI + AUTOMATION</span>
            <strong>INTELLIGENCE</strong>
            <small>context → decision → action</small>
          </motion.div>
          <motion.div className="system-signal system-signal--one" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .25 }}>shared context</motion.div>
          <motion.div className="system-signal system-signal--two" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .35 }}>faster decisions</motion.div>
          <motion.div className="system-signal system-signal--three" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .45 }}>measured outcomes</motion.div>
        </>
      )}
    </div>
  )
}
