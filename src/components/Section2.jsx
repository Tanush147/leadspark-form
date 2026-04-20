export default function Section2({ goNext, goPrev, formData, handleChange }) { return (
<div className="card active" id="section-2">
<div className="section-tag">Section 2</div>
    <h2>Product Lineup</h2>
    <p className="section-desc">Tell us about your products and what you offer.</p>

    <div className="field-group">
      <label className="field-label" htmlFor="q5"><span className="q-num">5</span>What are your best-performing products?</label>
      <p className="field-hint">The ones that drive the most revenue or wins</p>
      <textarea id="q5" name="q5" placeholder="e.g. Door hinges, seat rail brackets, chassis reinforcement plates..." />
    </div>

    <div className="field-group">
      <label className="field-label"><span className="q-num">6</span>Do you offer custom or bespoke products?</label>
      <div className="check-group">
        <div className="check-item">
          <input type="radio" id="q6a" name="q6" value="Yes — fully custom to client brief" />
          <label htmlFor="q6a">Yes — fully custom to client brief</label>
        </div>
        <div className="check-item">
          <input type="radio" id="q6b" name="q6" value="Yes — customisable from standard catalogue" />
          <label htmlFor="q6b">Yes — customisable from standard catalogue</label>
        </div>
        <div className="check-item">
          <input type="radio" id="q6c" name="q6" value="No — standard catalogue only" />
          <label htmlFor="q6c">No — standard catalogue only</label>
        </div>
      </div>
    </div>

    <div className="nav-row">
      <button className="btn btn-ghost" onClick={goPrev}>← Back</button>
      <button className="btn btn-primary" onClick={goNext}>Next — Positioning →</button>
    </div>
</div>
); }