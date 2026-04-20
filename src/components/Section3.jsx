export default function Section3({ goNext, goPrev, formData, handleChange }) { return (
<div className="card active" id="section-3">
<div className="section-tag">Section 3</div>
    <h2>Problem Statement &amp; Positioning</h2>
    <p className="section-desc">This helps us craft messaging that resonates with your ideal clients.</p>

    <div className="field-group">
      <label className="field-label" htmlFor="q9"><span className="q-num">9</span>What is the #1 problem your clients have before they find you?</label>
      <textarea id="q9" name="q9" placeholder="e.g. Inconsistent quality from multiple suppliers, long lead times, high rejection rates..." />
    </div>

    <div className="field-group">
      <label className="field-label" htmlFor="q10"><span className="q-num">10</span>Why do clients ultimately choose you over competitors?</label>
      <textarea id="q10" name="q10" placeholder="e.g. IATF 16949 certification, dedicated PPAP process, on-time delivery record..." />
    </div>

    <div className="field-group">
      <label className="field-label" htmlFor="q11"><span className="q-num">11</span>What makes your business difficult to replicate?</label>
      <p className="field-hint">Process, heritage, equipment, capacity, relationships</p>
      <textarea id="q11" name="q11" placeholder="e.g. 20+ years supplying Tier-1 auto OEMs, proprietary die tooling, ISO-certified QMS..." />
    </div>

    <div className="nav-row">
      <button className="btn btn-ghost" onClick={goPrev}>← Back</button>
      <button className="btn btn-primary" onClick={goNext}>Next — ICP Setup →</button>
    </div>
</div>
); }