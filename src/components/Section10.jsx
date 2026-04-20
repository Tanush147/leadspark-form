export default function Section10({ goNext, goPrev, sectionTag, toggleOther }) { return (
<div className="card active" id="section-10"><div className="section-tag">{sectionTag}</div>

    <h2>Past Outreach History</h2>
    <p className="section-desc">Understanding what's been tried helps us avoid repeating mistakes.</p>

    <div className="field-group">
      <label className="field-label"><span className="q-num">42</span>Have you done cold outreach before?</label>
      <div className="check-group">
        <div className="check-item"><input type="checkbox" id="q42a" name="q42" value="Cold email" /><label htmlFor="q42a">Cold email</label></div>
        <div className="check-item"><input type="checkbox" id="q42b" name="q42" value="LinkedIn outreach" /><label htmlFor="q42b">LinkedIn outreach</label></div>
        <div className="check-item"><input type="checkbox" id="q42c" name="q42" value="WhatsApp campaigns" /><label htmlFor="q42c">WhatsApp campaigns</label></div>
        <div className="check-item"><input type="checkbox" id="q42d" name="q42" value="None — this is our first time" /><label htmlFor="q42d">None — this is our first time</label></div>
      </div>
    </div>

    <div className="field-group">
      <label className="field-label" htmlFor="q43"><span className="q-num">43</span>If yes — what did you try, what happened, and why did it stop?</label>
      <textarea id="q43" name="q43" placeholder="e.g. Tried cold email in 2022 via a Fiverr agency — got 2% open rate, no replies. Stopped after 3 months as ROI was poor..." />
    </div>

    <div className="field-group">
      <label className="field-label" htmlFor="q44"><span className="q-num">44</span>Do you have any contacts, companies, or markets that must never be contacted?</label>
      <p className="field-hint">Existing clients, failed relationships, personal contacts</p>
      <textarea id="q44" name="q44" placeholder="e.g. Never contact XYZ Corp. (personal relationship broke down in 2021)..." />
    </div>

    <div className="nav-row">
      <button className="btn btn-ghost" onClick={goPrev}>← Back</button>
      <button className="btn btn-primary" onClick={goNext}>Next — Channels &amp; Handoff →</button>
    </div>
</div>
); }