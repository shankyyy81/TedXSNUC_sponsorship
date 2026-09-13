// This access key is public by design — it is an alias for the destination
// inbox, not a secret. Safe to commit and safe to ship in the bundle.
export const WEB3FORMS_ACCESS_KEY = "PASTE_KEY_HERE";
export const SPONSORSHIP_EMAIL = "PASTE_EMAIL_HERE";

export const isWeb3FormsConfigured =
  WEB3FORMS_ACCESS_KEY !== "PASTE_KEY_HERE" && SPONSORSHIP_EMAIL !== "PASTE_EMAIL_HERE";
