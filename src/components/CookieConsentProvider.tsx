import { type ReactNode, useCallback, useMemo, useRef, useState } from "react";
import { CONSENT_STORAGE_KEY, CONSENT_VERSION, type ConsentCategory } from "../data/legal";
import { CookieBanner } from "./CookieBanner";
import { CookieConsentContext, type ConsentPreferences } from "./CookieConsentContext";
import { CookiePreferencesModal } from "./CookiePreferencesModal";

const defaults: ConsentPreferences = { version: CONSENT_VERSION, necessary: true, functional: false };

/** A stored decision from an older version is ignored, so the choice is asked again. */
function readStoredConsent(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentPreferences>;
    if (parsed?.version !== CONSENT_VERSION || parsed.necessary !== true) return null;
    return { ...defaults, functional: parsed.functional === true, updatedAt: parsed.updatedAt };
  } catch {
    return null;
  }
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [initial] = useState(readStoredConsent);
  const [preferences, setPreferences] = useState<ConsentPreferences>(initial ?? defaults);
  const [hasDecision, setHasDecision] = useState(Boolean(initial));
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const persist = useCallback((next: { functional: boolean }) => {
    const stored: ConsentPreferences = {
      ...defaults,
      functional: next.functional,
      updatedAt: new Date().toISOString(),
    };
    setPreferences(stored);
    setHasDecision(true);
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(stored));
    } catch {
      /* Private mode or blocked storage: the choice stays in memory for this visit. */
    }
  }, []);

  const closePreferences = useCallback(() => {
    setPreferencesOpen(false);
    window.requestAnimationFrame(() => returnFocusRef.current?.focus());
  }, []);

  const value = useMemo(
    () => ({
      preferences,
      hasDecision,
      acceptAll: () => {
        persist({ functional: true });
        setPreferencesOpen(false);
      },
      rejectNonNecessary: () => {
        persist({ functional: false });
        setPreferencesOpen(false);
      },
      savePreferences: (next: { functional: boolean }) => {
        persist(next);
        setPreferencesOpen(false);
      },
      openPreferences: () => {
        returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        setPreferencesOpen(true);
      },
      closePreferences,
      isAllowed: (category: ConsentCategory) => category === "necessary" || preferences[category] === true,
    }),
    [preferences, hasDecision, persist, closePreferences],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
      {!hasDecision && !preferencesOpen && <CookieBanner />}
      {preferencesOpen && <CookiePreferencesModal />}
    </CookieConsentContext.Provider>
  );
}
