export default function Section4({ goNext, goPrev, formData, handleICPChange, numICPs }) { return (
<div className="card active" id="section-4">
<div className="section-tag">Section 4</div>
    <h2>ICP Setup</h2>
    <p className="section-desc">ICP = Ideal Customer Profile. We'll build targeted outreach around these.</p>

    <div className="field-group">
      <label className="field-label" htmlFor="q12"><span className="q-num">12</span>How many ICPs are you targeting?</label>
      <p className="field-hint">Select between 1 and 5</p>
      <select id="q12" name="q12" value={numICPs} onChange={handleICPChange}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>

    <div className="nav-row">
      <button className="btn btn-ghost" onClick={goPrev}>← Back</button>
      <button className="btn btn-primary" onClick={goNext}>Next — ICP Profile →</button>
    </div>
</div>
); }