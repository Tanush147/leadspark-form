import os

target = """    {/* FORM CARDS */}
      <div className="container" id="container">
        {currentSection === 1 && <Section1 goNext={goNext} toggleOther={toggleOther} />}
        {currentSection === 2 && <Section2 goNext={goNext} goPrev={goPrev} />}
        {currentSection === 3 && <Section3 goNext={goNext} goPrev={goPrev} />}
        {currentSection === 4 && <Section4 goNext={goNext} goPrev={goPrev} handleICPChange={handleICPChange} />}

        {/* Dynamic ICP Tracking Blocks */}
        {Array.from({ length: numICPs }, (_, i) => {
          const icpIdx = i + 1;
          const sectionNum = 4 + icpIdx;
          return currentSection === sectionNum ? (
            <SectionICP key={icpIdx} i={icpIdx} goNext={goNext} goPrev={goPrev} sectionTag={`Section ${sectionNum}`} />
          ) : null;
        })}

        {/* Static End Sheets */}
        {currentSection === TOTAL_SECTIONS - 6 && <Section6 goNext={goNext} goPrev={goPrev} sectionTag={`Section ${TOTAL_SECTIONS - 6}`} toggleOther={toggleOther} />}
        {currentSection === TOTAL_SECTIONS - 5 && <Section7 goNext={goNext} goPrev={goPrev} sectionTag={`Section ${TOTAL_SECTIONS - 5}`} toggleOther={toggleOther} />}
        {currentSection === TOTAL_SECTIONS - 4 && <Section8 goNext={goNext} goPrev={goPrev} sectionTag={`Section ${TOTAL_SECTIONS - 4}`} toggleOther={toggleOther} />}
        {currentSection === TOTAL_SECTIONS - 3 && <Section9 goNext={goNext} goPrev={goPrev} sectionTag={`Section ${TOTAL_SECTIONS - 3}`} toggleOther={toggleOther} />}
        {currentSection === TOTAL_SECTIONS - 2 && <Section10 goNext={goNext} goPrev={goPrev} sectionTag={`Section ${TOTAL_SECTIONS - 2}`} toggleOther={toggleOther} />}
        {currentSection === TOTAL_SECTIONS - 1 && <Section11 goNext={goNext} goPrev={goPrev} sectionTag={`Section ${TOTAL_SECTIONS - 1}`} toggleOther={toggleOther} />}
        
        {currentSection === TOTAL_SECTIONS && (
          <Section12 
             goPrev={goPrev} 
             submitForm={submitForm} 
             sectionTag={`Section ${TOTAL_SECTIONS}`} 
             submitting={isSubmitting} 
          />
        )}
      </div>"""

replacement = """    {/* FORM CARDS */}
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
           <Section4 goNext={goNext} goPrev={goPrev} handleICPChange={handleICPChange} />
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
      </div>"""

with open('/Users/tanush/Desktop/tets/custom form/onboarding-app/src/app/page.jsx', 'r') as f:
    text = f.read()

new_text = text.replace(target, replacement)
with open('/Users/tanush/Desktop/tets/custom form/onboarding-app/src/app/page.jsx', 'w') as f:
    f.write(new_text)

print("Replaced!")
