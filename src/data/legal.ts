import { orionCompany } from "./site";

/** Bump when the categories or their meaning change: stored decisions are then re-asked. */
export const CONSENT_VERSION = 1;
export const CONSENT_STORAGE_KEY = "orion-cookie-consent";

/**
 * Only categories this site actually uses. The audit found no analytics, tag manager,
 * pixel or marketing script, so none is offered — an empty toggle would be theatre.
 * "functional" gates the one external embed: the Google Maps frame on the Home.
 */
export type ConsentCategory = "necessary" | "functional";

export const orionLegalIdentity = {
  legalName: "Orion Ind e Com de Cosmeticos LTDA",
  cnpj: "41.994.699/0001-30",
  stateRegistration: "720.089.820.116",
  address: `${orionCompany.street}, ${orionCompany.district}, ${orionCompany.city} — ${orionCompany.state}, CEP ${orionCompany.postalCode}, Brasil`,
  email: orionCompany.email,
  phone: orionCompany.phone,
} as const;

/** Last review of the legal texts, shown to the reader. */
export const legalPoliciesUpdatedAt = "5 de setembro de 2026";
