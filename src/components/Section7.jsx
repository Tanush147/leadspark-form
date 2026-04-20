export default function Section7({ goNext, goPrev, sectionTag }) { return (
<div className="card active" id="section-7"><div className="section-tag">{sectionTag}</div>

    <h2>Final Details</h2>
    <p className="section-desc">Help us set realistic goals and avoid any landmines.</p>

    <div className="field-group">
      <label className="field-label" htmlFor="q31"><span className="q-num">31</span>What does success look like in the first 90 days?</label>
      <p className="field-hint">e.g. 5 qualified meetings, 2 pilot orders, 3 new accounts</p>
      <textarea id="q31" name="q31" placeholder="e.g. At least 8 qualified replies, 3 site visits scheduled, 1 pilot order placed..." />
    </div>

    <div className="field-group">
      <label className="field-label" htmlFor="q32"><span className="q-num">32</span>Are there any companies, markets, or contacts we should avoid?</label>
      <p className="field-hint">Existing clients, competitors, geographic restrictions</p>
      <textarea id="q32" name="q32" placeholder="e.g. Do not contact Maruti Suzuki (existing client), avoid Honda (failed relationship)..." />
    </div>

    <div className="field-group">
      <label className="field-label" htmlFor="q33"><span className="q-num">33</span>Anything else we should know before we begin?</label>
      <p className="field-hint">Brand voice preferences, past outreach attempts, sensitivities</p>
      <textarea id="q33" name="q33" placeholder="e.g. Our tone should remain formal and technical. We tried LinkedIn outreach in 2023 with no success..." />
    </div>

    <div className="nav-row">
      <button className="btn btn-ghost" onClick={goPrev}>← Back</button>
      <button className="btn btn-primary" onClick={goNext}>Next — Lead Definition →</button>
    </div>
</div>
); }