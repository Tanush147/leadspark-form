import { useState } from "react";

export default function Section6({ goNext, goPrev, formData, handleChange, sectionTag }) { 
  const [showOther, setShowOther] = useState(false);
  
  return (
<div className="card active" id="section-6"><div className="section-tag">{sectionTag}</div>

    <h2>Global CTA &amp; Offer</h2>
    <p className="section-desc">Your primary call-to-action across all outreach campaigns.</p>

    <div className="field-group">
      <label className="field-label"><span className="q-num">29</span>What is your primary call-to-action across all outreach?</label>
      <div className="check-group">
        <div className="check-item"><input type="radio" id="q29a" name="q29" value="Book a 15-minute intro call" onChange={() => setShowOther(false)} /><label htmlFor="q29a">Book a 15-minute intro call</label></div>
        <div className="check-item"><input type="radio" id="q29b" name="q29" value="Request a free design mockup" onChange={() => setShowOther(false)} /><label htmlFor="q29b">Request a free design mockup</label></div>
        <div className="check-item"><input type="radio" id="q29c" name="q29" value="Receive a free physical sample" onChange={() => setShowOther(false)} /><label htmlFor="q29c">Receive a free physical sample</label></div>
        <div className="check-item"><input type="radio" id="q29d" name="q29" value="Schedule a product demo or presentation" onChange={() => setShowOther(false)} /><label htmlFor="q29d">Schedule a product demo or presentation</label></div>
        <div className="check-item" id="q29other-item">
          <input type="radio" id="q29e" name="q29" value="Other" onChange={() => setShowOther(true)} />
          <label htmlFor="q29e">Other (describe below)</label>
        </div>
      </div>
      <input type="text" id="q29other" className="other-input" placeholder="Describe your preferred CTA..." style={{ display: showOther ? 'block' : 'none' }} />
    </div>

    <div className="field-group">
      <label className="field-label" htmlFor="q30"><span className="q-num">30</span>Any additional context about the first interaction you want with a prospect?</label>
      <textarea id="q30" name="q30" placeholder="e.g. We prefer warm intros over cold emails; keep tone formal; always mention our Maruti Suzuki partnership..." />
    </div>

    <div className="nav-row">
      <button className="btn btn-ghost" onClick={goPrev}>← Back</button>
      <button className="btn btn-primary" onClick={goNext}>Next — Final Details →</button>
    </div>
</div>
); }