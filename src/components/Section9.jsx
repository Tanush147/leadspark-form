export default function Section9({ goNext, goPrev, sectionTag, toggleOther }) { return (
<div className="card active" id="section-9"><div className="section-tag">{sectionTag}</div>

    <h2>Seasonality &amp; Timing</h2>
    <p className="section-desc">Help us time outreach for maximum impact.</p>

    <div className="field-group">
      <label className="field-label" htmlFor="q39"><span className="q-num">39</span>Are there peak seasons or events that drive most of your sales?</label>
      <p className="field-hint">e.g. Q4 budget cycles, model year launches, trade shows</p>
      <textarea id="q39" name="q39" placeholder="e.g. Q3-Q4 (OEM annual model launches), Auto Expo, Bharat Mobility Global Expo..." />
    </div>

    <div className="field-group">
      <label className="field-label" htmlFor="q40"><span className="q-num">40</span>Are there dead periods where outreach would be wasted?</label>
      <p className="field-hint">e.g. plant shutdowns, festive blackouts</p>
      <textarea id="q40" name="q40" placeholder="e.g. Diwali week, Christmas-New Year (Dec 23 – Jan 2), plant shutdown in May..." />
    </div>

    <div className="field-group">
      <label className="field-label" htmlFor="q41"><span className="q-num">41</span>Is there a specific window you want this campaign to hit?</label>
      <p className="field-hint">e.g. "We need leads by September for October procurement cycles"</p>
      <input type="text" id="q41" name="q41" placeholder="e.g. Launch by June, leads by August" />
    </div>

    <div className="nav-row">
      <button className="btn btn-ghost" onClick={goPrev}>← Back</button>
      <button className="btn btn-primary" onClick={goNext}>Next — Past Outreach →</button>
    </div>
</div>
); }