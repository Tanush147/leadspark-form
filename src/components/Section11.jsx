export default function Section11({ goNext, goPrev, sectionTag, toggleOther }) { return (
<div className="card active" id="section-11"><div className="section-tag">{sectionTag}</div>

    <h2>Channels &amp; Handoff Preference</h2>
    <p className="section-desc">How would you like to receive leads when they come in?</p>

    <div className="field-group">
      <label className="field-label"><span className="q-num">48</span>How would you like leads delivered to you?</label>
      <div className="check-group">
        <div className="check-item"><input type="checkbox" id="q48a" name="q48" value="Weekly report via email" /><label htmlFor="q48a">Weekly report via email</label></div>
        <div className="check-item"><input type="checkbox" id="q48b" name="q48" value="Real-time WhatsApp notification per lead" /><label htmlFor="q48b">Real-time WhatsApp notification per lead</label></div>
        <div className="check-item"><input type="checkbox" id="q48c" name="q48" value="Direct forwarding of the full conversation thread" /><label htmlFor="q48c">Direct forwarding of the full conversation thread</label></div>
        <div className="check-item">
          <input type="checkbox" id="q48d" name="q48" value="Other" onChange={() => toggleOther('q48other')} />
          <label htmlFor="q48d">Other (describe)</label>
        </div>
      </div>
      <input type="text" id="q48other" className="other-input" placeholder="Describe your preferred delivery method..." />
    </div>

    <div className="field-group">
      <label className="field-label" htmlFor="q49"><span className="q-num">49</span>Who on your team will be responsible for following up on leads within 24 hours?</label>
      <p className="field-hint">Name + contact</p>
      <input type="text" id="q49" name="q49" placeholder="e.g. Priya Singh — priya@company.com / +91 98765 43210" />
    </div>

    <div className="nav-row">
      <button className="btn btn-ghost" onClick={goPrev}>← Back</button>
      <button className="btn btn-primary" onClick={goNext}>Next — Competitor Intel →</button>
    </div>
</div>
); }