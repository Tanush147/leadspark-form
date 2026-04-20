
import { useState, useRef, useEffect } from 'react';
import { customArray } from 'country-codes-list';
import { ChevronDown } from 'lucide-react';

export default function Section1({ goNext, formData, handleChange, toggleOther }) {
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [selectedCountryValue, setSelectedCountryValue] = useState('1'); // Default to US
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCountryDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const countryOptions = customArray({
    value: '{countryCallingCode}',
    label: '{flag} +{countryCallingCode} ({countryCode})'
  });

  // Sort logically or just pass as is. Let's ensure US/UK/IN are near the top, or just keep alphabetical.
  // We'll just alphabetize by label
  countryOptions.sort((a, b) => a.label.localeCompare(b.label));

  const filteredCountries = countryOptions.filter(c => 
    c.label.toLowerCase().includes(countrySearch.toLowerCase()) || 
    c.value.includes(countrySearch)
  );

  return (
    <div className="card active" id="section-1">
      <h2>Contact & Company Basics</h2>
      <p className="section-desc">Let&apos;s start with your contact details and company fundamentals.</p>

      <div className="field-group">
        <label className="field-label" htmlFor="submitter_name">Your full name</label>
        <input type="text" id="submitter_name" name="submitter_name" placeholder="e.g. John Doe" />
      </div>

      <div className="field-group">
        <label className="field-label" htmlFor="submitter_email">Your email address</label>
        <input type="email" id="submitter_email" name="submitter_email" placeholder="e.g. john@example.com" />
      </div>

      <div className="field-group">
        <label className="field-label" htmlFor="submitter_phone">Phone Number</label>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ position: 'relative', width: '160px' }} ref={dropdownRef}>
            <input type="hidden" id="country_code" name="country_code" value={selectedCountryValue} />
            <div 
              onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid var(--border2)',
                backgroundColor: 'var(--surface2)',
                color: 'var(--text)',
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {selectedCountryValue === '1' ? '🇺🇸 +1 (US)' 
                  : selectedCountryValue === '44' ? '🇬🇧 +44 (GB)' 
                  : selectedCountryValue === '91' ? '🇮🇳 +91 (IN)' 
                  : countryOptions.find(c => c.value === selectedCountryValue)?.label || '+1'}
              </span>
              <ChevronDown size={16} style={{ flexShrink: 0, opacity: 0.5 }} />
            </div>

            {isCountryDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                marginTop: '4px',
                backgroundColor: 'var(--surface2)',
                border: '1px solid var(--border2)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                zIndex: 50,
                maxHeight: '260px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ padding: '8px', borderBottom: '1px solid var(--border2)' }}>
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      border: '1px solid var(--border2)',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      color: 'var(--text)',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                    autoFocus
                  />
                </div>
                <div style={{ overflowY: 'auto', padding: '4px 0' }}>
                  {!countrySearch && (
                    <>
                      <div 
                        onClick={() => { setSelectedCountryValue('1'); setIsCountryDropdownOpen(false); }}
                        style={{ padding: '8px 12px', cursor: 'pointer', fontSize: '0.95rem' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >🇺🇸 +1 (US)</div>
                      <div 
                        onClick={() => { setSelectedCountryValue('44'); setIsCountryDropdownOpen(false); }}
                        style={{ padding: '8px 12px', cursor: 'pointer', fontSize: '0.95rem' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >🇬🇧 +44 (GB)</div>
                      <div 
                        onClick={() => { setSelectedCountryValue('91'); setIsCountryDropdownOpen(false); }}
                        style={{ padding: '8px 12px', cursor: 'pointer', fontSize: '0.95rem' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >🇮🇳 +91 (IN)</div>
                      <div style={{ padding: '4px 12px', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>──────────</div>
                    </>
                  )}
                  {filteredCountries.map((country, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => { setSelectedCountryValue(country.value); setIsCountryDropdownOpen(false); }}
                      style={{
                        padding: '8px 12px',
                        cursor: 'pointer',
                        fontSize: '0.95rem'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      {country.label}
                    </div>
                  ))}
                  {filteredCountries.length === 0 && (
                    <div style={{ padding: '8px 12px', opacity: 0.5, fontSize: '0.95rem' }}>No results found</div>
                  )}
                </div>
              </div>
            )}
          </div>
          <input 
            type="tel" 
            id="submitter_phone" 
            name="submitter_phone" 
            placeholder="Phone number" 
            style={{ flex: 1 }} 
          />
        </div>
      </div>


      <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '2rem 0' }} />

      <div className="field-group">
        <label className="field-label" htmlFor="q1"><span className="q-num">1</span>Company name</label>
        <input type="text" id="q1" name="q1" placeholder="e.g. Tanush Industries Pvt. Ltd." />
      </div>

      <div className="field-group">
        <label className="field-label" htmlFor="q2"><span className="q-num">2</span>What does your company do?</label>
        <p className="field-hint">Plain-English summary of what you make or deliver</p>
        <textarea id="q2" name="q2" placeholder="e.g. We manufacture precision stamped sheet metal components for the automotive industry..." />
      </div>

      <div className="field-group">
        <label className="field-label" htmlFor="q3"><span className="q-num">3</span>Company website</label>
        <input type="url" id="q3" name="q3" placeholder="https://" />
      </div>

      <div className="field-group">
        <label className="field-label" htmlFor="q4"><span className="q-num">4</span>What products or services do you offer?</label>
        <p className="field-hint">List your main categories</p>
        <textarea id="q4" name="q4" placeholder="e.g. Stamped components, progressive die tooling, welded assemblies..." />
      </div>

      <div className="nav-row">
        <div></div>
        <button className="btn btn-primary" onClick={goNext}>Next — Product Lineup →</button>
      </div>
    </div>
  );
}