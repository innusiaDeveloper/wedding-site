type LeadType = "consultation" | "budget";

type WeddingFormat = "classic" | "chamber" | "luxury";
type VenueType = "restaurant" | "country" | "loft" | "openair";

type CreateLeadInput = {
  leadType: LeadType;
  name: string;
  phone: string;
  eventDate: string;

  guests?: number | null;
  city?: string | null;
  registryOffice?: string | null;
  weddingFormat?: WeddingFormat | null;
  venueType?: VenueType | null;

  personalDataConsent: true;
};

const DIRECTUS_INTERNAL_URL = "http://127.0.0.1:8055";

const CONSENT_VERSION = "2026-09-13";

const CONSENT_TEXT =
  "Я даю согласие на обработку персональных данных и подтверждаю, что ознакомился(-ась) с Политикой в отношении обработки персональных данных.";

export async function createLead(input: CreateLeadInput) {
  const token = process.env.DIRECTUS_LEADS_TOKEN;

  if (!token) {
    throw new Error("DIRECTUS_LEADS_TOKEN is not configured");
  }

  if (input.personalDataConsent !== true) {
    throw new Error("Personal data consent is required");
  }

  const response = await fetch(`${DIRECTUS_INTERNAL_URL}/items/leads`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      lead_type: input.leadType,
      name: input.name,
      phone: input.phone,
      event_date: input.eventDate,

      guests: input.guests ?? null,
      city: input.city ?? null,
      registry_office: input.registryOffice ?? null,
      wedding_format: input.weddingFormat ?? null,
      venue_type: input.venueType ?? null,

      personal_data_consent: true,
      consent_text: CONSENT_TEXT,
      consent_version: CONSENT_VERSION,
      consent_date: new Date().toISOString(),
    }),
    cache: "no-store",
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    console.error("DIRECTUS LEAD CREATE ERROR:", response.status, result);
    throw new Error(`Unable to create lead: ${response.status}`);
  }

  return result;
}
