export default function Section12({ goPrev, submitForm, formData, handleChange, sectionTag, submitting }) { return (
<div className="card active" id="section-12"><div className="section-tag">{sectionTag}</div>

    <h2>Competitor Intelligence</h2>
    <p className="section-desc">Knowing your competitors helps us pre-empt objections in outreach copy.</p>

    <div className="field-group">
      <label className="field-label" htmlFor="q50"><span className="q-num">50</span>Who are your top 3 competitors?</label>
      <textarea id="q50" name="q50" placeholder="1. Company A&#10;2. Company B&#10;3. Company C" />
    </div>

    <div className="field-group">
      <label className="field-label" htmlFor="q51"><span className="q-num">51</span>What do clients say when they choose a competitor over you?</label>
      <p className="field-hint">Honest answer — this helps us pre-empt objections in copy</p>
      <textarea id="q51" name="q51" placeholder="e.g. 'They offer slightly lower MOQ', 'Competitor has a facility closer to our plant'..." />
    </div>


    <div className="nav-row">
      <button className="btn btn-ghost" onClick={goPrev}>← Back</button>
      <button className="btn btn-primary" onClick={submitForm} disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit Form ✓'}
      </button>
    </div>
</div>
); }