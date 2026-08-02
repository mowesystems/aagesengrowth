export type Consent = 'accepted' | 'rejected';

const STORAGE_KEY = 'ag_cookie_consent';

/** Fired when consent is stored or withdrawn, so the banner can react. */
export const CONSENT_CHANGE_EVENT = 'ag:cookie-consent-change';

export const readConsent = (): Consent | null => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'accepted' || value === 'rejected' ? value : null;
  } catch {
    return null;
  }
};

export const writeConsent = (value: Consent) => {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* storage unavailable — the choice holds for this session only */
  }
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
};

/** Lets the cookie policy page reopen the banner so consent can be withdrawn. */
export const resetCookieConsent = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* storage unavailable — nothing to clear */
  }
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
};
