import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type Consent = 'accepted' | 'rejected' | null;
const STORAGE_KEY = 'ag_cookie_consent';

const CookieBanner: React.FC = () => {
  const [consent, setConsent] = useState<Consent>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Consent;
    if (stored) setConsent(stored);
    else setTimeout(() => setVisible(true), 600);
  }, []);

  const save = (value: Consent) => {
    localStorage.setItem(STORAGE_KEY, value || '');
    setConsent(value);
    setVisible(false);
  };

  if (consent || !visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 md:bottom-6 md:left-6 md:right-auto md:max-w-md">
      <div className="bg-navy text-off-white rounded-lg shadow-2xl p-6">
        <h2 className="font-serif text-lg font-medium mb-2">Cookies</h2>
        <p className="text-sm text-off-white/60 leading-relaxed mb-5">
          Vi bruger nødvendige cookies til at sikre, at siden fungerer. Med samtykke bruger vi også analysecookies.
        </p>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => save('accepted')} className="bg-off-white text-navy text-sm font-medium px-4 py-2 hover:bg-white transition-colors rounded-sm">
            Accepter
          </button>
          <button onClick={() => save('rejected')} className="text-off-white/60 text-sm font-medium px-4 py-2 border border-off-white/20 hover:border-off-white/50 transition-colors rounded-sm">
            Afvis
          </button>
          <Link to="/cookiepolitik" className="text-off-white/40 text-xs px-3 py-2 hover:text-off-white/70 transition-colors underline underline-offset-2 self-center">
            Cookiepolitik
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
