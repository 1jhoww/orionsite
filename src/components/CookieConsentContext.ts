import { createContext, useContext } from "react";
import type { ConsentCategory } from "../data/legal";

export type ConsentPreferences = {
  version: number;
  necessary: true;
  functional: boolean;
  updatedAt?: string;
};

export type CookieConsentValue = {
  preferences: ConsentPreferences;
  hasDecision: boolean;
  acceptAll: () => void;
  rejectNonNecessary: () => void;
  savePreferences: (next: { functional: boolean }) => void;
  openPreferences: () => void;
  closePreferences: () => void;
  isAllowed: (category: ConsentCategory) => boolean;
};

export const CookieConsentContext = createContext<CookieConsentValue | null>(null);

export function useCookieConsent() {
  const value = useContext(CookieConsentContext);
  if (!value) throw new Error("useCookieConsent must be used inside CookieConsentProvider.");
  return value;
}
