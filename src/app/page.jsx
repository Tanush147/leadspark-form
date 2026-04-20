"use client";
import { useState } from "react";
import Section1 from "@/components/Section1";
import Section2 from "@/components/Section2";
import Section3 from "@/components/Section3";
import Section4 from "@/components/Section4";
import SectionICP from "@/components/SectionICP";
import Section6 from "@/components/Section6";
import Section7 from "@/components/Section7";
import Section8 from "@/components/Section8";
import Section9 from "@/components/Section9";
import Section10 from "@/components/Section10";
import Section11 from "@/components/Section11";
import Section12 from "@/components/Section12";

export default function Home() {
  const [numICPs, setNumICPs] = useState(3);
  const [currentSection, setCurrentSection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const TOTAL_SECTIONS = 11 + numICPs; // 4 start, next N ICPs, 7 end
  
  const SECTION_NAMES = [
    "Intro", "Current State", "Differentiation", "ICP Setup",
    ...Array.from({length: numICPs}, (_, i) => `ICP ${i + 1}`),
    "Global CTA", "Expectations", "Inquiries", "Campaign Window", "Lead Delivery", "Competitors", "Final Details"
  ];

  const goNext = () => {
    if (currentSection < TOTAL_SECTIONS) {
      setCurrentSection(p => p + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const goPrev = () => {
    if (currentSection > 1) {
      setCurrentSection(p => p - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const jumpTo = (i) => {
    setCurrentSection(i);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleICPChange = (e) => {
    setNumICPs(parseInt(e.target.value, 10));
  };

  const toggleOther = (id) => {
    const el = document.getElementById(id);
    if(el) {
      if (el.style.display === 'block') {
         el.style.display = 'none';
      } else {
         el.style.display = 'block';
         el.focus();
      }
    }
  };

  const submitForm = async () => {
    setIsSubmitting(true);
    setErrorMsg('');

    const data = {};
    const txt = id => (document.getElementById(id)?.value || '').trim();
    const radio = name => {
      const el = document.querySelector(`input[name="${name}"]:checked`);
      if (!el) return '';
      if (el.value === 'Other') {
        const other = document.getElementById(name + 'other');
        return other ? (other.value.trim() || 'Other') : 'Other';
      }
      return el.value;
    };
    const checks = name => {
      const els = document.querySelectorAll(`input[name="${name}"]:checked`);
      const vals = Array.from(els).map(el => {
        if (el.value === 'Other') {
          const other = document.getElementById(name + 'other');
          return other ? (other.value.trim() || 'Other') : 'Other';
        }
        return el.value;
      });
      return vals.join('; ');
    };

    const exactHeaders = ["Your full name", "Your email address", "Phone Number", "Company name", "What does your company do? (plain-English summary of what you make or deliver)", "Company website", "What products or services do you offer? (list your main categories)(separated by commas or one per line).", "What are your best-performing products? (the ones that drive the most revenue or wins)", "Do you offer custom or bespoke products?", "What is the #1 problem your clients have before they find you?", "Why do clients ultimately choose you over competitors?", "What makes your business difficult to replicate? (process, heritage, equipment, capacity,\nrelationships)", "How many ICPs are you targeting? (1\u20135)", "What's a short name for this ICP?1", "What job titles or roles are you targeting for this ICP?1", "What is the typical seniority level? (C-Suite, VP/Director, Manager, Individual Contributor, Any)1", "Which industries or verticals should we focus on ?1", "What's the company size by headcount? (e.g. 200\u20132,000 employees)1", "What is the ideal company revenue range? (e.g. $10M\u2013$500M)1", "Geography or target regions?1", "What tech stack or keywords should we use for filters? (e.g. Salesforce, SAP, HubSpot)1", "List companies you would love to win as clients (dream logos \u2014 used to calibrate Apollo targeting) According to this ICP1", "List companies you already work with that match this ICP (used for social proof and fit\nvalidation)1", "Case study 1 \u2014 describe a specific result you delivered for a client in this ICP. Focus on\nmeasurable outcomes: what did you do, for whom, and what was the result?1", "Case study 2(e.g. \"We\ndelivered 300 custom trophies in 4 days for a telecom company's annual gala. They\nreordered the following quarter.\")(optional \u2014 same format)1", "What you solved Describe a specific problem this type of client had, and how you solved\nit. Name the company if possible. What was broken, missing, or painful for them before you? What\ndid you do? What was the measurable result?(Problem You Solved+Company)1", "What you elevated Describe a situation where a client already had something working, but\nyou took it to the next level. They weren't broken \u2014 you made them better. Name the company if\npossible. What did they already have?What did you add or improve?1", "What can you offer this ICP for free or at very low cost to open the conversation? (e.g. free\ndesign mockup, free sample, free audit, free prototype)1", "What is your risk mitigation statement for this ICP? \u2014 If they try it and don't love it, what\nhappens? (e.g. \"Keep the sample, no charge, no obligation.\")1", "What is your desired call-to-action for this ICP? What is the single action you want them to\ntake from the first email? (e.g. reply to request a mockup, book a 15-minute call, agree to\nreceive a sample)1", "What's a short name for this ICP?2", "What job titles or roles are you targeting for this ICP?2", "What is the typical seniority level? (C-Suite, VP/Director, Manager, Individual Contributor, Any)2", "Which industries or verticals should we focus on ?2", "What's the company size by headcount? (e.g. 200\u20132,000 employees)2", "What is the ideal company revenue range? (e.g. $10M\u2013$500M)2", "Geography or target regions?2", "What tech stack or keywords should we use for filters? (e.g. Salesforce, SAP, HubSpot)2", "List companies you would love to win as clients (dream logos \u2014 used to calibrate Apollo targeting) According to this ICP2", "List companies you already work with that match this ICP (used for social proof and fit\nvalidation)2", "Case study 1 \u2014 describe a specific result you delivered for a client in this ICP. Focus on\nmeasurable outcomes: what did you do, for whom, and what was the result?2", "Case study 2(e.g. \"We\ndelivered 300 custom trophies in 4 days for a telecom company's annual gala. They\nreordered the following quarter.\")(optional \u2014 same format)2", "What you solved Describe a specific problem this type of client had, and how you solved\nit. Name the company if possible. What was broken, missing, or painful for them before you? What\ndid you do? What was the measurable result?(Problem You Solved+Company)2", "What you elevated Describe a situation where a client already had something working, but\nyou took it to the next level. They weren't broken \u2014 you made them better. Name the company if\npossible. What did they already have?What did you add or improve?2", "What can you offer this ICP for free or at very low cost to open the conversation? (e.g. free\ndesign mockup, free sample, free audit, free prototype)2", "What is your risk mitigation statement for this ICP? \u2014 If they try it and don't love it, what\nhappens? (e.g. \"Keep the sample, no charge, no obligation.\")2", "What is your desired call-to-action for this ICP? What is the single action you want them to\ntake from the first email? (e.g. reply to request a mockup, book a 15-minute call, agree to\nreceive a sample)2", "What's a short name for this ICP?3", "What job titles or roles are you targeting for this ICP?3", "What is the typical seniority level? (C-Suite, VP/Director, Manager, Individual Contributor, Any)3", "Which industries or verticals should we focus on ?3", "What's the company size by headcount? (e.g. 200\u20132,000 employees)3", "What is the ideal company revenue range? (e.g. $10M\u2013$500M)3", "Geography or target regions?3", "What tech stack or keywords should we use for filters? (e.g. Salesforce, SAP, HubSpot)3", "List companies you would love to win as clients (dream logos \u2014 used to calibrate Apollo targeting) According to this ICP3", "List companies you already work with that match this ICP (used for social proof and fit\nvalidation)3", "Case study 1 \u2014 describe a specific result you delivered for a client in this ICP. Focus on\nmeasurable outcomes: what did you do, for whom, and what was the result?3", "Case study 2(e.g. \"We\ndelivered 300 custom trophies in 4 days for a telecom company's annual gala. They\nreordered the following quarter.\")(optional \u2014 same format)3", "What you solved Describe a specific problem this type of client had, and how you solved\nit. Name the company if possible. What was broken, missing, or painful for them before you? What\ndid you do? What was the measurable result?(Problem You Solved+Company)3", "What you elevated Describe a situation where a client already had something working, but\nyou took it to the next level. They weren't broken \u2014 you made them better. Name the company if\npossible. What did they already have?What did you add or improve?3", "What can you offer this ICP for free or at very low cost to open the conversation? (e.g. free\ndesign mockup, free sample, free audit, free prototype)3", "What is your risk mitigation statement for this ICP? \u2014 If they try it and don't love it, what\nhappens? (e.g. \"Keep the sample, no charge, no obligation.\")3", "What is your desired call-to-action for this ICP? What is the single action you want them to\ntake from the first email? (e.g. reply to request a mockup, book a 15-minute call, agree to\nreceive a sample)3", "What's a short name for this ICP?4", "What job titles or roles are you targeting for this ICP?4", "What is the typical seniority level? (C-Suite, VP/Director, Manager, Individual Contributor, Any)4", "Which industries or verticals should we focus on ?4", "What's the company size by headcount? (e.g. 200\u20132,000 employees)4", "What is the ideal company revenue range? (e.g. $10M\u2013$500M)4", "Geography or target regions?4", "What tech stack or keywords should we use for filters? (e.g. Salesforce, SAP, HubSpot)4", "List companies you would love to win as clients (dream logos \u2014 used to calibrate Apollo targeting) According to this ICP4", "List companies you already work with that match this ICP (used for social proof and fit\nvalidation)4", "Case study 1 \u2014 describe a specific result you delivered for a client in this ICP. Focus on\nmeasurable outcomes: what did you do, for whom, and what was the result?4", "Case study 2(e.g. \"We\ndelivered 300 custom trophies in 4 days for a telecom company's annual gala. They\nreordered the following quarter.\")(optional \u2014 same format)4", "What you solved Describe a specific problem this type of client had, and how you solved\nit. Name the company if possible. What was broken, missing, or painful for them before you? What\ndid you do? What was the measurable result?(Problem You Solved+Company)4", "What you elevated Describe a situation where a client already had something working, but\nyou took it to the next level. They weren't broken \u2014 you made them better. Name the company if\npossible. What did they already have?What did you add or improve?4", "What can you offer this ICP for free or at very low cost to open the conversation? (e.g. free\ndesign mockup, free sample, free audit, free prototype)4", "What is your risk mitigation statement for this ICP? \u2014 If they try it and don't love it, what\nhappens? (e.g. \"Keep the sample, no charge, no obligation.\")4", "What is your desired call-to-action for this ICP? What is the single action you want them to\ntake from the first email? (e.g. reply to request a mockup, book a 15-minute call, agree to\nreceive a sample)4", "What's a short name for this ICP?5", "What job titles or roles are you targeting for this ICP?5", "What is the typical seniority level? (C-Suite, VP/Director, Manager, Individual Contributor, Any)5", "Which industries or verticals should we focus on ?5", "What's the company size by headcount? (e.g. 200\u20132,000 employees)5", "What is the ideal company revenue range? (e.g. $10M\u2013$500M)5", "Geography or target regions?5", "What tech stack or keywords should we use for filters? (e.g. Salesforce, SAP, HubSpot)5", "List companies you would love to win as clients (dream logos \u2014 used to calibrate Apollo targeting) According to this ICP5", "List companies you already work with that match this ICP (used for social proof and fit\nvalidation)5", "Case study 1 \u2014 describe a specific result you delivered for a client in this ICP. Focus on\nmeasurable outcomes: what did you do, for whom, and what was the result?5", "Case study 2(e.g. \"We\ndelivered 300 custom trophies in 4 days for a telecom company's annual gala. They\nreordered the following quarter.\")(optional \u2014 same format)5", "What you solved Describe a specific problem this type of client had, and how you solved\nit. Name the company if possible. What was broken, missing, or painful for them before you? What\ndid you do? What was the measurable result?(Problem You Solved+Company)5", "What you elevated Describe a situation where a client already had something working, but\nyou took it to the next level. They weren't broken \u2014 you made them better. Name the company if\npossible. What did they already have?What did you add or improve?5", "What can you offer this ICP for free or at very low cost to open the conversation? (e.g. free\ndesign mockup, free sample, free audit, free prototype)5", "What is your risk mitigation statement for this ICP? \u2014 If they try it and don't love it, what\nhappens? (e.g. \"Keep the sample, no charge, no obligation.\")5", "What is your desired call-to-action for this ICP? What is the single action you want them to\ntake from the first email? (e.g. reply to request a mockup, book a 15-minute call, agree to\nreceive a sample)5", "What is your primary call-to-action across all outreach?", "Any additional context about the first interaction you want with a prospect?", "If 'Other', please specify your custom call-to-action.", "What does success look like in the first 90 days? (e.g. 5 qualified meetings, 2 pilot orders, 3\nnew accounts)", "Are there any companies, markets, or contacts we should avoid? (existing clients,\ncompetitors, geographic restrictions)", "Anything else we should know before we begin? (brand voice preferences, past outreach\nattempts, sensitivities)", "What counts as a qualified inquiry for your business? (tick all that apply)", "If Other (describe)", "What does NOT count as a lead for your business? (e.g. \"remove me\" replies, junior staff\nforwarding without context, vague \"send more info\" with no detail)", "Who on your team is responsible for following up on leads within 24 hours? (name +\ndirect contact)", "Are there peak seasons or events that drive most of your sales? (e.g. Ramadan, Year End,\nNational Day, trade show calendar)", "Are there dead periods where outreach would be wasted? (e.g. summer slowdown, Eid\nblackout)", "Is there a specific window you want this campaign to hit? (e.g. \"We need leads by\nOctober for our November peak\")", "Have you done cold outreach before?", "If yes — what did you try, what happened, and why did it stop?", "Do you have any contacts, companies, or markets that must never be contacted? (existing\nclients, failed relationships, personal contacts)", "How would you like leads delivered to you?", "Other (describe)", "Who on your team will be responsible for following up on leads within 24 hours? (name\n+ contact)", "Who are your top 3 competitors?", "What do clients say when they choose a competitor over you? (honest answer \u2014 this\nhelps us pre-empt objections in copy)", "Are there competitor clients or accounts we should avoid targeting? (strategic\nsensitivities)", "Submitted At", "Token"];
    const rowData = new Array(exactHeaders.length).fill("");

    const assign = (headerPartial, val) => {
        let idx = exactHeaders.findIndex(x => x.includes(headerPartial));
        if (idx !== -1 && val) {
            rowData[idx] = val;
        }
    };
    
    assign("Your full name", txt('submitter_name'));
    assign("Your email address", txt('submitter_email'));
    const phoneVal = txt('submitter_phone');
    const ccVal = document.getElementById('country_code')?.value || '';
    assign("Phone", phoneVal ? `${ccVal} ${phoneVal}` : '');

    assign("Company name", txt('q1'));
    assign("What does your company do?", txt('q2'));
    assign("Company website", txt('q3'));
    assign("What products or services do you offer", txt('q4'));
    assign("What are your best-performing products", txt('q5'));
    assign("Do you offer custom", radio('q6'));
    assign("What is the #1 problem", txt('q10'));
    assign("Why do clients ultimately choose", txt('q11'));
    assign("What makes your business difficult", txt('q12'));
    assign("How many ICPs are you targeting", typeof numICPs !== 'undefined' ? numICPs.toString() : "1");

    const icpMap = [
      { partial: "What's a short name", id: 'q13', isCheck: false },
      { partial: "What job titles or roles", id: 'q14', isCheck: false },
      { partial: "What is the typical seniority", id: 'q15', isCheck: true },
      { partial: "Which industries or verticals", id: 'q16', isCheck: false },
      { partial: "What's the company size by headcount", id: 'q17', isCheck: true },
      { partial: "What is the ideal company revenue", id: 'q18', isCheck: false }, // this combines min/max in UI? UI has q18min/q18max
      { partial: "Geography or target regions", id: 'q19', isCheck: false },
      { partial: "What tech stack or keywords", id: 'q20', isCheck: false },
      { partial: "List companies you would love", id: 'q21', isCheck: false },
      { partial: "companies you already work with", id: 'q22', isCheck: false },
      { partial: "Case study 1", id: 'q23', isCheck: false },
      { partial: "Case study 2", id: 'q26', isCheck: false },
      { partial: "What you solved", id: 'q24', isCheck: false },
      { partial: "What you elevated", id: 'q25', isCheck: false },
      { partial: "What can you offer this ICP for free", id: 'q27', isCheck: false },
      { partial: "risk mitigation statement", id: 'q28', isCheck: false },
      { partial: "desired call-to-action for this ICP", id: 'q29', isCheck: false }
    ];

    for (let i = 1; i <= numICPs; i++) {
        for (const m of icpMap) {
            let val = m.isCheck ? checks(`${m.id}_icp${i}`) : txt(`${m.id}_icp${i}`);
            if (m.id === 'q18') {
               let min = txt(`q18min_icp${i}`); let max = txt(`q18max_icp${i}`);
               val = (min || max) ? `${min} - ${max}` : '';
            }
            // For ICP 1, match "headerPartial...1"
            let targetHeader = `${m.partial}`;
            let exactIdx = exactHeaders.findIndex(x => x.startsWith(targetHeader) && x.endsWith(i.toString()));
            if (exactIdx !== -1) {
                rowData[exactIdx] = val;
            }
        }
    }

    assign("primary call-to-action across all outreach", radio('q29'));
    assign("Any additional context about the first interaction", txt('q30'));
    assign("If 'Other', please specify your custom", txt('q30other') || ''); // wait, q30 is text in UI
    assign("What does success look like in the first 90 days", txt('q31'));
    assign("Are there any companies, markets, or contacts we should avoid?", txt('q32'));
    assign("Anything else we should know before we begin", txt('q33'));
    assign("What counts as a qualified inquiry", txt('q36'));
    assign("If Other (describe)", txt('q36other') || ''); 
    assign("What does NOT count as a lead", txt('q37'));
    assign("team is responsible for following up on leads within 24 hours", txt('q38'));
    assign("peak seasons or events", txt('q39'));
    assign("dead periods where outreach would be wasted", txt('q40'));
    assign("specific window you want this campaign", radio('q41'));
    assign("Have you done cold outreach before", radio('q42') || checks('q42')); // 42 is checks
    assign("If yes — what did you try", txt('q43'));
    assign("contacts, companies, or markets that must never be contacted", txt('q44'));
    assign("How would you like leads delivered", radio('q48'));
    // "Who on your team will be responsible..." duplicate? -> q49
    assign("Who on your team will be responsible", txt('q49'));
    assign("Who are your top 3 competitors", txt('q50'));
    assign("What do clients say when they choose a competitor", txt('q51'));
    assign("Are there competitor clients or accounts we should avoid", txt('q52'));
    assign("Submitted At", new Date().toLocaleString());

    data.company_name = txt('q1');
    data.headers = exactHeaders;
    data.row = rowData;

    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwxNRlZo0yDpKe8QejOKwB_09oEKqb_RL8R6PL3vyWWBOa3IjVAig8TLMymSNPcThfN/exec";

    if (SCRIPT_URL === "YOUR_APPS_SCRIPT_URL_HERE") {
        setSuccess(true);
        setIsSubmitting(false);
        console.warn("MOCK SUBMIT: SCRIPT_URL not provided.");
        return;
    }

    try {
      const res = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(data)
      });
      const resData = await res.json();
      if (resData.status === 'success') {
        setSuccess(true);
      } else {
        setErrorMsg('Error from server: ' + (resData.message || 'Unknown'));
      }
    } catch (e) {
      setErrorMsg('Network error: ' + e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="container">
        <div className="card active" style={{textAlign:'center', padding:'40px 24px'}}>
          <div style={{fontSize:'48px', marginBottom:'16px'}}>🚀</div>
          <h2>Submission Complete</h2>
          <p className="section-desc" style={{marginBottom:'32px'}}>Your onboarding data has been saved seamlessly.</p>
          <button className="btn btn-ghost" onClick={() => window.location.reload()}>← Submit Another</button>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      {/* HEADER */}
      <header className="header">
        <div className="logo"><span>🏭</span>LeadSpark</div>
        <h1>Client Onboarding Form</h1>
        <p>Before we build your outbound acquisition system, I need to understand your business with precision.
        Let&apos;s begin with a few basic details.</p>
      </header>

      {/* PROGRESS BAR */}
      <div className="progress-wrap" id="progressWrap">
        <div className="progress-top">
          <div className="progress-label" id="progressLabel">
            Section {currentSection} of {TOTAL_SECTIONS} — {SECTION_NAMES[currentSection - 1]}
          </div>
          <div className="progress-count" id="progressCount">
            {Math.round((currentSection / TOTAL_SECTIONS) * 100)}% complete
          </div>
        </div>
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" id="progressFill" style={{ width: `${Math.round((currentSection / TOTAL_SECTIONS) * 100)}%` }}></div>
        </div>
        <div className="progress-steps" id="progressDots">
          {Array.from({ length: TOTAL_SECTIONS }, (_, i) => {
            const idx = i + 1;
            let cls = 'progress-dot';
            if (idx < currentSection) cls += ' done';
            else if (idx === currentSection) cls += ' active';
            return (
              <div key={idx} className={cls} title={`Section ${idx}: ${SECTION_NAMES[idx - 1]}`} onClick={() => jumpTo(idx)} />
            );
          })}
        </div>
      </div>

      {/* FORM CARDS */}
      <div className="container" id="container">
        <div style={{ display: currentSection === 1 ? 'block' : 'none' }}>
           <Section1 goNext={goNext} toggleOther={toggleOther} />
        </div>
        <div style={{ display: currentSection === 2 ? 'block' : 'none' }}>
           <Section2 goNext={goNext} goPrev={goPrev} />
        </div>
        <div style={{ display: currentSection === 3 ? 'block' : 'none' }}>
           <Section3 goNext={goNext} goPrev={goPrev} />
        </div>
        <div style={{ display: currentSection === 4 ? 'block' : 'none' }}>
           <Section4 goNext={goNext} goPrev={goPrev} handleICPChange={handleICPChange} numICPs={numICPs} />
        </div>

        {/* Dynamic ICP Tracking Blocks */}
        {Array.from({ length: Math.max(numICPs, 5) }, (_, i) => {
          const icpIdx = i + 1;
          const sectionNum = 4 + icpIdx;
          if (icpIdx > numICPs) return null;
          return (
            <div key={icpIdx} style={{ display: currentSection === sectionNum ? 'block' : 'none' }}>
              <SectionICP i={icpIdx} goNext={goNext} goPrev={goPrev} sectionTag={`Section ${sectionNum}`} />
            </div>
          );
        })}

        {/* Static End Sheets */}
        <div style={{ display: currentSection === TOTAL_SECTIONS - 6 ? 'block' : 'none' }}>
           <Section6 goNext={goNext} goPrev={goPrev} sectionTag={`Section ${TOTAL_SECTIONS - 6}`} toggleOther={toggleOther} />
        </div>
        <div style={{ display: currentSection === TOTAL_SECTIONS - 5 ? 'block' : 'none' }}>
           <Section7 goNext={goNext} goPrev={goPrev} sectionTag={`Section ${TOTAL_SECTIONS - 5}`} toggleOther={toggleOther} />
        </div>
        <div style={{ display: currentSection === TOTAL_SECTIONS - 4 ? 'block' : 'none' }}>
           <Section8 goNext={goNext} goPrev={goPrev} sectionTag={`Section ${TOTAL_SECTIONS - 4}`} toggleOther={toggleOther} />
        </div>
        <div style={{ display: currentSection === TOTAL_SECTIONS - 3 ? 'block' : 'none' }}>
           <Section9 goNext={goNext} goPrev={goPrev} sectionTag={`Section ${TOTAL_SECTIONS - 3}`} toggleOther={toggleOther} />
        </div>
        <div style={{ display: currentSection === TOTAL_SECTIONS - 2 ? 'block' : 'none' }}>
           <Section10 goNext={goNext} goPrev={goPrev} sectionTag={`Section ${TOTAL_SECTIONS - 2}`} toggleOther={toggleOther} />
        </div>
        <div style={{ display: currentSection === TOTAL_SECTIONS - 1 ? 'block' : 'none' }}>
           <Section11 goNext={goNext} goPrev={goPrev} sectionTag={`Section ${TOTAL_SECTIONS - 1}`} toggleOther={toggleOther} />
        </div>
        
        <div style={{ display: currentSection === TOTAL_SECTIONS ? 'block' : 'none' }}>
          <Section12 
             goPrev={goPrev} 
             submitForm={submitForm} 
             sectionTag={`Section ${TOTAL_SECTIONS}`} 
             submitting={isSubmitting} 
          />
        </div>
      </div>
      
      {/* Display errors structurally at the bottom if needed globally */}
      {errorMsg && (
        <div style={{ position:'fixed', bottom: 20, right: 20, background: 'rgba(239,68,68,.9)', color: '#fff', padding: 16, borderRadius: 8, zIndex: 9999 }}>
          <strong>Error submitting form:</strong> {errorMsg}
        </div>
      )}
    </div>
  );
}
