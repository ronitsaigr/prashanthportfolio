export function AskPrButton() {
  return (
    <button
      className="ask-pr"
      onClick={() => document.getElementById('ask-preview')?.scrollIntoView({ behavior: 'smooth' })}
      aria-label="Open Ask PR preview"
    >
      <span className="ask-dot" />
      ASK PR //
    </button>
  )
}
