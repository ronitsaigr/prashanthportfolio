import { motion } from 'framer-motion'

export function Nav() {
  return (
    <motion.header
      className="nav"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <a className="brand" href="#top" aria-label="Prashanth home">PRASHANTH / AI</a>
      <nav className="modes" aria-label="Portfolio sections">
        <a href="#operator">SYSTEMS</a>
        <a href="#builder">METHOD</a>
        <a href="#proof">PROOF</a>
      </nav>
      <a className="work-link" href="#work-with-me">WORK WITH ME ↗</a>
    </motion.header>
  )
}
