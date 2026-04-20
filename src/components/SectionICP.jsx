"use client";
import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";

const SuggestButton = ({ inputId, fieldName, isLoading, onSuggest }) => (
  <button 
    type="button"
    onClick={() => onSuggest(inputId, fieldName)}
    disabled={isLoading}
    style={{
      position: 'absolute',
      right: '12px',
      top: '36px',
      background: 'rgba(124, 58, 237, 0.2)',
      border: '1px solid rgba(124, 58, 237, 0.4)',
      color: '#c4b5fd',
      padding: '6px',
      borderRadius: '6px',
      cursor: isLoading ? 'not-allowed' : 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s',
      zIndex: 10
    }}
    title="Restructure via AI"
  >
    {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
  </button>
);

export default function SectionICP({ i, goNext, goPrev, sectionTag }) {
  const [scoreResult, setScoreResult] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loadingSuggest, setLoadingSuggest] = useState({});
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleGlobalAnalysis = async () => {
    setIsAnalyzing(true);
    setAiAnalysis(null);
    try {
      const getVal = id => document.getElementById(id)?.value || '';
      const getChecks = name => Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(e => e.value);

      const contextData = {
        jobTitles: getVal(`q14_icp${i}`),
        seniority: getChecks(`q15_icp${i}`),
        targetIndustries: getVal(`q16_icp${i}`),
        headcount: getChecks(`q17_icp${i}`),
        revenue: { min: getVal(`q18min_icp${i}`), max: getVal(`q18max_icp${i}`) },
        techStack: getVal(`q20_icp${i}`),
        dreamLogos: getVal(`q21_icp${i}`),
        companiesWorkedWith: getVal(`q22_icp${i}`),
        caseStudyDescription: getVal(`q23_icp${i}`),
        problemSolved: getVal(`q24_icp${i}`),
        whatElevated: getVal(`q25_icp${i}`),
        secondCaseStudy: getVal(`q26_icp${i}`)
      };

      const res = await fetch('/api/openai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contextData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      setAiAnalysis(data);
    } catch (err) {
      alert("Failed to analyze: " + err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const applyGlobalSuggestions = () => {
    if (!aiAnalysis) return;
    const { suggestions } = aiAnalysis;
    if (!suggestions) return;
    
    if (suggestions.jobTitles) document.getElementById(`q14_icp${i}`).value = suggestions.jobTitles;
    if (suggestions.targetIndustries) document.getElementById(`q16_icp${i}`).value = suggestions.targetIndustries;
    if (suggestions.techStack) document.getElementById(`q20_icp${i}`).value = suggestions.techStack;
    if (suggestions.dreamLogos) document.getElementById(`q21_icp${i}`).value = suggestions.dreamLogos;
    if (suggestions.revenue) {
       document.getElementById(`q18min_icp${i}`).value = suggestions.revenue.min || '';
       document.getElementById(`q18max_icp${i}`).value = suggestions.revenue.max || '';
    }
    if (suggestions.headcount && Array.isArray(suggestions.headcount)) {
       Array.from(document.querySelectorAll(`input[name="q17_icp${i}"]`)).forEach(el => el.checked = false);
       suggestions.headcount.forEach(val => {
          const el = document.querySelector(`input[name="q17_icp${i}"][value="${val}"]`);
          if (el) el.checked = true;
       });
    }
    if (suggestions.seniority && Array.isArray(suggestions.seniority)) {
       Array.from(document.querySelectorAll(`input[name="q15_icp${i}"]`)).forEach(el => el.checked = false);
       suggestions.seniority.forEach(val => {
          const el = document.querySelector(`input[name="q15_icp${i}"][value="${val}"]`);
          if (el) el.checked = true;
       });
    }

    setAiAnalysis(null);
  };

  const handleSuggestion = async (inputId, fieldName) => {
    const el = document.getElementById(inputId);
    if (!el || !el.value) return;

    setLoadingSuggest(prev => ({ ...prev, [inputId]: true }));
    try {
      const geographyMatch = inputId.match(/icp(\d+)/);
      const icpIndex = geographyMatch ? geographyMatch[1] : i;
      const geographyContext = document.getElementById(`q19_icp${icpIndex}`)?.value || '';

      const res = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fieldName, currentValue: el.value, geographyContext })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      el.value = data.suggestion;
    } catch (err) {
      alert("Failed to get suggestion: " + err.message);
    } finally {
      setLoadingSuggest(prev => ({ ...prev, [inputId]: false }));
    }
  };

  const checkICPScoring = async () => {
    setIsChecking(true);
    setScoreResult(null);
    setErrorMsg('');

    try {
      const getVal = id => document.getElementById(id)?.value || '';
      const getChecks = name => Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(e => e.value);

      const person_titles = getVal(`q14_icp${i}`).split(',').map(s=>s.trim()).filter(Boolean);
      const senMap = {
        'C-Suite': ['c_suite'],
        'VP / Director': ['vp', 'director'],
        'Manager': ['manager'],
        'Individual Contributor': ['senior', 'entry']
      };
      
      let person_seniorities = [];
      let hasAnySen = false;
      getChecks(`q15_icp${i}`).forEach(val => {
        if (val === 'Any') hasAnySen = true;
        if (senMap[val]) person_seniorities.push(...senMap[val]);
      });
      if (hasAnySen) person_seniorities = [];

      const ind_keywords = getVal(`q16_icp${i}`).split(',').map(s=>s.trim()).filter(Boolean);
      let organization_num_employees_ranges = getChecks(`q17_icp${i}`).map(val => {
        if (val === '10001+') return '10001,1000000';
        return val.replace('-', ',');
      });

      const revMin = getVal(`q18min_icp${i}`);
      const revMax = getVal(`q18max_icp${i}`);
      const person_locations = getVal(`q19_icp${i}`).split(',').map(s=>s.trim()).filter(Boolean);
      const tech = getVal(`q20_icp${i}`).split(',').map(s=>s.trim().toLowerCase().replace(/[\s\.]+/g, '_')).filter(Boolean);

      const payload = { include_similar_titles: true };
      if (person_titles.length) payload.person_titles = person_titles;
      if (person_seniorities.length) payload.person_seniorities = person_seniorities;
      if (ind_keywords.length) payload.q_organization_keyword_tags = ind_keywords;
      if (organization_num_employees_ranges.length) payload.organization_num_employees_ranges = organization_num_employees_ranges;
      if (revMin) { payload.revenue_range = payload.revenue_range || {}; payload.revenue_range.min = parseInt(revMin, 10); }
      if (revMax) { payload.revenue_range = payload.revenue_range || {}; payload.revenue_range.max = parseInt(revMax, 10); }
      if (person_locations.length) payload.person_locations = person_locations;
      if (tech.length) payload.currently_using_any_of_technology_uids = tech;

      const domainsVal = getVal(`q21_icp${i}`);
      if (domainsVal) {
        payload.q_organization_domains = domainsVal.split(',').map(s => s.trim().replace(/^https?:\/\//, '').replace(/\/$/, '')).filter(Boolean).join('\n');
      }

      const res = await fetch('/api/apollo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'API Error');
      
      const total = data.pagination?.total_entries ?? data.total_entries ?? 0;
      setScoreResult(total);
      
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsChecking(false);
    }
  };

  const getScoreUI = () => {
    if (errorMsg) return (
      <div style={{ background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.3)', color: '#fca5a5', padding: 16, borderRadius: 8, marginBottom: 24, fontSize: 14 }}>
        <strong>API Error:</strong> {errorMsg}
      </div>
    );
    if (scoreResult === null) return null;
    
    let style = {}, msg = '';
    if (scoreResult >= 300) {
      style = { background: 'rgba(34,197,94,.1)', border: '1px solid rgba(34,197,94,.3)', color: '#86efac' };
      msg = `✅ Excellent! We found ${scoreResult.toLocaleString()} leads matching this ICP setup. Broad enough to drive strong campaigns.`;
    } else if (scoreResult > 50 && scoreResult < 300) {
      style = { background: 'rgba(245,158,11,.1)', border: '1px solid rgba(245,158,11,.3)', color: '#fcd34d' };
      msg = `⚠️ Good/Niche: We found ${scoreResult.toLocaleString()} leads matching this ICP setup. It's a highly targeted, niche list.`;
    } else {
      style = { background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.3)', color: '#fca5a5' };
      msg = `🚨 ${scoreResult.toLocaleString()} Results. Need changes in the field. Please broaden your job titles, geography, or size constraints.`;
    }

    const showAIButton = scoreResult < 50;

    return (
      <>
      <div style={{ ...style, padding: 16, borderRadius: 8, marginBottom: 24, fontSize: 14 }}>
        <strong>{msg}</strong>
        {showAIButton && (
           <button type="button" onClick={handleGlobalAnalysis} className="btn-primary" style={{ marginTop: 12, width: '100%', background: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             {isAnalyzing ? <Loader2 size={16} className="animate-spin" style={{marginRight: 8}}/> : <Sparkles size={16} style={{marginRight: 8}}/>}
             {isAnalyzing ? "Analyzing Request..." : "Score too low? Ask AI to Optimize Search"}
           </button>
        )}
      </div>

      {aiAnalysis && (
        <div style={{ background: 'rgba(124, 58, 237, 0.1)', border: '1px solid #7c3aed', padding: 16, borderRadius: 8, marginBottom: 24, fontSize: 14, color: '#fff' }}>
          <h4 style={{ color: '#c4b5fd', marginBottom: 8, display: 'flex', alignItems: 'center', fontSize: 16 }}><Sparkles size={16} style={{marginRight: 8}}/> AI Optimization Strategy</h4>
          <p style={{ marginBottom: 16 }}>{aiAnalysis.explanation}</p>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: 12, borderRadius: 6, marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
             {aiAnalysis.suggestions?.jobTitles && <div><strong style={{color: '#8b5cf6'}}>Job Titles:</strong> {aiAnalysis.suggestions.jobTitles}</div>}
             {aiAnalysis.suggestions?.seniority && <div><strong style={{color: '#8b5cf6'}}>Seniority:</strong> {aiAnalysis.suggestions.seniority.join(', ')}</div>}
             {aiAnalysis.suggestions?.targetIndustries && <div><strong style={{color: '#8b5cf6'}}>Industries:</strong> {aiAnalysis.suggestions.targetIndustries}</div>}
             {aiAnalysis.suggestions?.techStack && <div><strong style={{color: '#8b5cf6'}}>Tech Stack:</strong> {aiAnalysis.suggestions.techStack}</div>}
             {aiAnalysis.suggestions?.dreamLogos && <div><strong style={{color: '#8b5cf6'}}>Dream Logos:</strong> {aiAnalysis.suggestions.dreamLogos}</div>}
          </div>
          <button type="button" onClick={applyGlobalSuggestions} className="btn-primary" style={{ background: '#10b981', width: '100%' }}>Apply AI Suggestions & Optimize List</button>
        </div>
      )}
      </>
    );
  };

  return (
    <div className="card active" id={`section-icp-${i}`}>
      <div className="section-tag">{sectionTag}</div>
      <h2>ICP {i} Profile</h2>
      <p className="section-desc">Define exactly who this profile targets and what message hits home.</p>

      <div className="field-group">
        <label className="field-label"><span className="q-num">13</span>What do you call this ICP? {i}</label>
        <p className="field-hint">e.g. &quot;Tier 1: HR Directors at Mid-market SaaS&quot;</p>
        <input type="text" id={`q13_icp${i}`} placeholder="Name your segment..." />
      </div>

      <div className="field-group" style={{ position: 'relative' }}>
        <label className="field-label"><span className="q-num">14</span>Job title(s) or roles to target {i}</label>
        <textarea id={`q14_icp${i}`} placeholder="e.g. Founder, CEO..."></textarea>
        <SuggestButton inputId={`q14_icp${i}`} fieldName="Job titles" isLoading={loadingSuggest[`q14_icp${i}`]} onSuggest={handleSuggestion} />
      </div>

      <div className="field-group">
        <label className="field-label"><span className="q-num">15</span>Seniority level {i}</label>
        <div className="check-group">
          {['C-Suite', 'VP / Director', 'Manager', 'Individual Contributor', 'Any'].map(lvl => (
            <div className="check-item" key={lvl}>
              <input type="checkbox" id={`q15_${lvl.replace(/[^a-zA-Z]/g,'')}_icp${i}`} name={`q15_icp${i}`} value={lvl} />
              <label htmlFor={`q15_${lvl.replace(/[^a-zA-Z]/g,'')}_icp${i}`}>{lvl}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="field-group" style={{ position: 'relative' }}>
        <label className="field-label"><span className="q-num">16</span>Target industries or verticals {i}</label>
        <textarea id={`q16_icp${i}`} placeholder="e.g. Automotive OEM, EV manufacturers..."></textarea>
        <SuggestButton inputId={`q16_icp${i}`} fieldName="Industries" isLoading={loadingSuggest[`q16_icp${i}`]} onSuggest={handleSuggestion} />
      </div>

      <div className="field-group">
        <label className="field-label"><span className="q-num">17</span>Company size by headcount {i}</label>
        <div className="check-group" style={{ maxHeight: 200, overflowY: 'auto', paddingRight: 8 }}>
            {['1-10', '11-20', '21-50', '51-100', '101-200', '201-500', '501-1000', '1001-2000', '2001-5000', '5001-10000', '10001+'].map(val => (
            <div className="check-item" key={val}>
                <input type="checkbox" id={`q17_${val.replace('+','plus')}_icp${i}`} name={`q17_icp${i}`} value={val} />
                <label htmlFor={`q17_${val.replace('+','plus')}_icp${i}`}>{val}</label>
            </div>
            ))}
        </div>
      </div>

      <div className="field-group">
        <label className="field-label"><span className="q-num">18</span>Company revenue range {i} (USD)</label>
        <p className="field-hint">Enter pure numbers (no currency symbols or commas)</p>
        <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}>
            <input type="number" id={`q18min_icp${i}`} placeholder="Min (e.g. 500000)" />
            </div>
            <div style={{ flex: 1 }}>
            <input type="number" id={`q18max_icp${i}`} placeholder="Max (e.g. 1500000)" />
            </div>
        </div>
      </div>

      <div className="field-group" style={{ position: 'relative' }}>
        <label className="field-label"><span className="q-num">19</span>Geography / target region {i}</label>
        <input type="text" id={`q19_icp${i}`} placeholder="e.g. India (NCR, Pune, Chennai)" style={{ paddingRight: 40 }} />
        <SuggestButton inputId={`q19_icp${i}`} fieldName="Geography" isLoading={loadingSuggest[`q19_icp${i}`]} onSuggest={handleSuggestion} />
      </div>

      <div className="field-group" style={{ position: 'relative' }}>
        <label className="field-label"><span className="q-num">20</span>Tech stack or keywords for Apollo filters {i}</label>
        <textarea id={`q20_icp${i}`} placeholder="e.g. SAP, Oracle ERP..."></textarea>
        <SuggestButton inputId={`q20_icp${i}`} fieldName="Tech Stack" isLoading={loadingSuggest[`q20_icp${i}`]} onSuggest={handleSuggestion} />
      </div>

      <hr className="divider" />
      <div className="sub-heading">Dream Logos (ICP {i})</div>

      <div className="field-group" style={{ position: 'relative' }}>
        <label className="field-label"><span className="q-num">21</span>Companies you would love to win website {i}</label>
        <textarea id={`q21_icp${i}`} placeholder="e.g. apple.com, tatamotors.com..."></textarea>
        <SuggestButton inputId={`q21_icp${i}`} fieldName="Dream Logos" isLoading={loadingSuggest[`q21_icp${i}`]} onSuggest={handleSuggestion} />
      </div>

      <div className="field-group">
        <label className="field-label"><span className="q-num">22</span>Companies you already work with {i}</label>
        <textarea id={`q22_icp${i}`} placeholder="e.g. Maruti Suzuki..."></textarea>
      </div>

      <hr className="divider" />
      <div className="sub-heading">Case Studies &amp; Proof of Value (ICP {i})</div>

      <div className="field-group">
        <label className="field-label"><span className="q-num">23</span>Case study 1 — describe a specific result you delivered for a client in this ICP. Focus on measurable outcomes: what did you do, for whom, and what was the result? {i}</label>
        <textarea id={`q23_icp${i}`} rows="4" placeholder="We helped Company X achieve Y by..."></textarea>
      </div>

      <div className="field-group">
        <label className="field-label"><span className="q-num">24</span>Part A — Problem you solved {i}</label>
        <textarea id={`q24_icp${i}`} rows="3" placeholder="What was broken..."></textarea>
      </div>

      <div className="field-group">
        <label className="field-label"><span className="q-num">25</span>Part B — What you elevated {i}</label>
        <textarea id={`q25_icp${i}`} rows="3" placeholder="They weren't broken..."></textarea>
      </div>

      <div className="field-group">
        <label className="field-label"><span className="q-num">26</span>Second case study (optional) {i}</label>
        <textarea id={`q26_icp${i}`} rows="2"></textarea>
      </div>

      <hr className="divider" />
      <div className="sub-heading">Value Offer for ICP {i}</div>

      <div className="field-group">
        <label className="field-label"><span className="q-num">27</span>What can you offer {i}?</label>
        <textarea id={`q27_icp${i}`} placeholder="e.g. Free first-article..."></textarea>
      </div>

      <div className="field-group">
        <label className="field-label"><span className="q-num">28</span>What is your risk mitigation {i}?</label>
        <textarea id={`q28_icp${i}`} placeholder="If they try it and don't love it..."></textarea>
      </div>

      <div className="field-group">
        <label className="field-label"><span className="q-num">29</span>What is your desired CTA for this ICP {i}?</label>
        <textarea id={`q29_icp${i}`} placeholder="The single action you want..."></textarea>
      </div>
      
      {getScoreUI()}

      <div className="nav-row" style={{ justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <button className="btn btn-ghost" onClick={goPrev}>← Back</button>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" style={{ background: 'var(--surface2)', color: '#fff', border: '1px solid var(--border)' }} onClick={checkICPScoring} disabled={isChecking}>
            {isChecking ? 'Checking...' : '🔍 Check ICP Scoring'}
            </button>
            <button className="btn btn-primary" onClick={goNext}>Next Step →</button>
        </div>
      </div>
    </div>
  );
}
