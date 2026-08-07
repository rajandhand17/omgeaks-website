/** Shared contact-enquiry email copy — keep subject stable for Gmail filters. */
export const ENQUIRY_EMAIL_SUBJECT = "OmGeaks New Enquiry";

export function enquiryEmailSubject(name?: string) {
  const trimmed = name?.trim();
  return trimmed ? `${ENQUIRY_EMAIL_SUBJECT} — ${trimmed}` : ENQUIRY_EMAIL_SUBJECT;
}
