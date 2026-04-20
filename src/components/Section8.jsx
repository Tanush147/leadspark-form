export default function Section8({ goNext, goPrev, sectionTag, toggleOther }) { return (
<div className="card active" id="section-8"><div className="section-tag">{sectionTag}</div>

    <h2>Lead Definition Agreement</h2>
    <p className="section-desc">We agree on this before outreach begins. This is what counts as a delivered lead.</p>

    <div className="field-group">
      <label className="field-label"><span className="q-num">36</span>What counts as a qualified inquiry for your business?</label>
      <p className="field-hint">Tick all that apply</p>
      <div className="check-group">
        <div className="check-item"><input type="checkbox" id="q36a" name="q36" value="Someone asks for a quote or pricing" /><label htmlFor="q36a">Someone asks for a quote or pricing</label></div>
        <div className="check-item"><input type="checkbox" id="q36b" name="q36" value="Someone requests a sample, catalogue, or portfolio" /><label htmlFor="q36b">Someone requests a sample, catalogue, or portfolio</label></div>
        <div className="check-item"><input type="checkbox" id="q36c" name="q36" value="Someone discloses an active project or upcoming buying need" /><label htmlFor="q36c">Someone discloses an active project or upcoming buying need</label></div>
        <div className="check-item"><input type="checkbox" id="q36d" name="q36" value="Someone agrees to a call or meeting" /><label htmlFor="q36d">Someone agrees to a call or meeting</label></div>
        <div className="check-item"><input type="checkbox" id="q36e" name="q36" value="A decision maker replies with genuine engagement" /><label htmlFor="q36e">A decision maker (not a gatekeeper) replies with any genuine engagement</label></div>
        <div className="check-item">
          <input type="checkbox" id="q36f" name="q36" value="Other" onChange={() => toggleOther('q36other')} />
          <label htmlFor="q36f">Other (describe)</label>
        </div>
      </div>
      <input type="text" id="q36other" className="other-input" placeholder="Describe..." />
    </div>

    <div className="field-group">
      <label className="field-label" htmlFor="q37"><span className="q-num">37</span>What does NOT count as a lead for your business?</label>
      <p className="field-hint">e.g. &quot;remove me&quot; replies, junior staff forwards, vague &quot;send more info&quot;</p>
      <textarea id="q37" name="q37" placeholder="e.g. Automated out-of-office replies, intern forwards without context, 'send brochure' with no follow-up..." />
    </div>

    <div className="field-group">
      <label className="field-label" htmlFor="q38"><span className="q-num">38</span>Who on your team is responsible for following up on leads within 24 hours?</label>
      <p className="field-hint">Name + direct contact</p>
      <input type="text" id="q38" name="q38" placeholder="e.g. Rahul Sharma — +91 98765 43210 / rahul@company.com" />
    </div>

    <div className="nav-row">
      <button className="btn btn-ghost" onClick={goPrev}>← Back</button>
      <button className="btn btn-primary" onClick={goNext}>Next — Seasonality →</button>
    </div>
</div>
); }