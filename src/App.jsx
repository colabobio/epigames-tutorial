import React, { useState, useEffect } from 'react';
import { translations } from './translations';

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

  const handleNext = () => {
    if (step < t.steps.length - 1) setStep(step + 1);
  };
  
  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2 style={styles.title}>{currentData.title}</h2>
      </header>

      <main style={styles.main}>
        <div style={styles.card}>
          <div 
            style={styles.text} 
            dangerouslySetInnerHTML={{ __html: currentData.content }} 
          />
        </div>
        
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
  text: { fontSize: '1.1rem', margin: 0 },
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