import React, { useState, useEffect, useRef } from 'react';
import { translations } from './translations';
import page1 from './assets/page1.png';
import page2 from './assets/page2.png';
import page3 from './assets/page3.png';
import page4 from './assets/page4.png';
import page5 from './assets/page5.png';
import page6 from './assets/page6.png';
import page6step1 from './assets/page6-step1.png';
import page6step2 from './assets/page6-step2.png';
import page6step3 from './assets/page6-step3.png';
import page6step4 from './assets/page6-step4.png';
import page6step5 from './assets/page6-step5.png';
import page6step6 from './assets/page6-step6.png';

const pageImages = [page1, page2, page3, page4, page5, page6];
const page6Images = [page6step1, page6step2, page6step3, page6step4, null, page6step5, page6step6];

const App = () => {
  const [step, setStep] = useState(0);
  const [lang, setLang] = useState('en');

  // Detect language from URL: ?lang=ar or ?lang=en
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if (urlLang && translations[urlLang]) {
      setLang(urlLang);
    }
  }, []);

  const t = translations[lang];
  const currentData = t.steps[step];
  const mainRef = useRef(null);
  const extraRef = useRef(null);

  const scrollToExtra = () => {
    if (extraRef.current && mainRef.current) {
      mainRef.current.scrollTo({ top: extraRef.current.offsetTop - 20, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (step < t.steps.length - 1) setStep(step + 1);
  };
  
  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div style={styles.container}>
      <style>{`@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }`}</style>
      <header style={styles.header}>
        <h2 style={styles.title}>{currentData.title}</h2>
      </header>

      <main ref={mainRef} style={styles.main}>
        <div style={styles.card}>
          <p style={styles.lead}>{currentData.lead}</p>
          <img
            src={pageImages[step]}
            alt={currentData.title}
            style={styles.pageImage}
          />
        </div>

        {step === t.steps.length - 1 && currentData.page6Steps && (
          <button onClick={scrollToExtra} style={styles.scrollCue} aria-label="Scroll down">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="15" stroke="#007AFF" strokeWidth="2"/>
              <polyline points="10,13 16,20 22,13" stroke="#007AFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </button>
        )}
        {step === t.steps.length - 1 && currentData.page6Steps && (
          <div ref={extraRef} style={styles.extraContent}>
            {currentData.page6Steps.map((item, i) =>
              item.sectionTitle ? (
                <div key={i} style={styles.sectionCard}>
                  <h3 style={styles.sectionTitle}>{item.sectionTitle}</h3>
                  <p style={styles.sectionBody}>{item.sectionBody}</p>
                </div>
              ) : (
                <div key={i} style={styles.stepCard}>
                  {page6Images[i] && (
                    <img
                      src={page6Images[i]}
                      alt={`Step ${i + 1}`}
                      style={styles.pageImage}
                    />
                  )}
                  <p style={styles.stepText}>{item.text}</p>
                </div>
              )
            )}
          </div>
        )}
        
        <div style={styles.progressContainer}>
          {t.steps.map((_, i) => (
            <div key={i} style={{
              ...styles.dot,
              backgroundColor: i === step ? '#007AFF' : '#C7C7CC'
            }} />
          ))}
        </div>
      </main>

      <footer style={styles.footer}>
        <button 
          onClick={handlePrev} 
          disabled={step === 0} 
          style={{...styles.button, opacity: step === 0 ? 0.5 : 1}}
        >
          {t.prev}
        </button>
        
        <span style={styles.stepCount}>{step + 1} / {t.steps.length}</span>
        
        <button 
          onClick={handleNext} 
          disabled={step === t.steps.length - 1} 
          style={{...styles.button, opacity: step === t.steps.length - 1 ? 0.5 : 1}}
        >
          {t.next}
        </button>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: '#F2F2F7',
    color: '#1C1C1E',
  },
  header: {
    padding: '20px',
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #D1D1D6',
    textAlign: 'center',
  },
  title: { margin: 0, fontSize: '1.2rem', fontWeight: '600' },
  main: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    lineHeight: '1.6',
  },
  lead: { fontSize: '1.1rem', margin: '0 0 16px 0', lineHeight: '1.6' },
  pageImage: { width: '100%', borderRadius: '8px', display: 'block' },
  extraContent: { display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '4px' },
  scrollCue: {
    display: 'block',
    margin: '12px auto 0',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    animation: 'bounce 1.4s infinite',
  },
  stepCard: {
    backgroundColor: '#FFFFFF',
    padding: '16px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
  },
  stepText: { fontSize: '1rem', margin: '12px 0 0 0', lineHeight: '1.6', color: '#1C1C1E' },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    padding: '16px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
  },
  sectionTitle: { margin: '0 0 8px 0', fontSize: '1.1rem', fontWeight: '700', color: '#1C1C1E' },
  sectionBody: { margin: 0, fontSize: '1rem', fontStyle: 'italic', color: '#1C1C1E', lineHeight: '1.6' },
  progressContainer: { display: 'flex', justifyContent: 'center', marginTop: '20px' },
  dot: { width: '8px', height: '8px', borderRadius: '50%', margin: '0 4px', transition: 'background-color 0.3s' },
  footer: {
    padding: '15px 20px',
    backgroundColor: '#FFFFFF',
    borderTop: '1px solid #D1D1D6',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 'calc(15px + env(safe-area-inset-bottom))', 
  },
  button: {
    backgroundColor: '#007AFF', color: '#FFFFFF', border: 'none',
    padding: '10px 20px', borderRadius: '8px', fontSize: '1rem',
    fontWeight: '600', cursor: 'pointer',
  },
  stepCount: { fontSize: '0.9rem', color: '#8E8E93' }
};

export default App;