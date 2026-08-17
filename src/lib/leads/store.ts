import { neon } from "@neondatabase/serverless";
import type { StoredLead } from "@/lib/leads/schema";

let tableReady = false;

function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set.");
  }
  return neon(url);
}

async function ensureTable() {
  if (tableReady) return;

  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id UUID PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      status TEXT NOT NULL DEFAULT 'new',
      intent TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      address TEXT,
      listing_url TEXT,
      timeline TEXT,
      offer_deadline TEXT,
      message TEXT,
      estimated_value NUMERIC,
      source TEXT,
      user_agent TEXT
    )
  `;

  tableReady = true;
}

type LeadRow = {
  id: string;
  created_at: string | Date;
  status: string;
  intent: string;
  name: string;
  email: string;
  phone: string;
  address: string | null;
  listing_url: string | null;
  timeline: string | null;
  offer_deadline: string | null;
  message: string | null;
  estimated_value: string | number | null;
  source: string | null;
  user_agent: string | null;
};

function optionalText(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function mapLeadRow(row: LeadRow): StoredLead | null {
  if (row.intent !== "sell" && row.intent !== "offer") return null;

  const estimated =
    row.estimated_value === null || row.estimated_value === undefined
      ? undefined
      : Number(row.estimated_value);

  return {
    id: row.id,
    createdAt:
      row.created_at instanceof Date
        ? row.created_at.toISOString()
        : row.created_at,
    status: "new",
    intent: row.intent,
    name: row.name,
    email: row.email,
    phone: row.phone,
    address: optionalText(row.address),
    listingUrl: optionalText(row.listing_url),
    timeline: optionalText(row.timeline),
    offerDeadline: optionalText(row.offer_deadline),
    message: optionalText(row.message),
    estimatedValue:
      estimated !== undefined && Number.isFinite(estimated)
        ? Math.round(estimated)
        : undefined,
    source: optionalText(row.source),
    userAgent: optionalText(row.user_agent),
  };
}

export async function getLeadById(id: string): Promise<StoredLead | null> {
  await ensureTable();
  const sql = getSql();
  const rows = (await sql`
    SELECT
      id,
      created_at,
      status,
      intent,
      name,
      email,
      phone,
      address,
      listing_url,
      timeline,
      offer_deadline,
      message,
      estimated_value,
      source,
      user_agent
    FROM leads
    WHERE id = ${id}
    LIMIT 1
  `) as LeadRow[];

  const row = rows[0];
  if (!row) return null;
  return mapLeadRow(row);
}

export async function saveLead(lead: StoredLead) {
  await ensureTable();
  const sql = getSql();

  await sql`
    INSERT INTO leads (
      id,
      created_at,
      status,
      intent,
      name,
      email,
      phone,
      address,
      listing_url,
      timeline,
      offer_deadline,
      message,
      estimated_value,
      source,
      user_agent
    )
    VALUES (
      ${lead.id},
      ${lead.createdAt},
      ${lead.status},
      ${lead.intent},
      ${lead.name},
      ${lead.email},
      ${lead.phone},
      ${lead.address ?? null},
      ${lead.listingUrl ?? null},
      ${lead.timeline ?? null},
      ${lead.offerDeadline ?? null},
      ${lead.message ?? null},
      ${lead.estimatedValue ?? null},
      ${lead.source ?? null},
      ${lead.userAgent ?? null}
    )
  `;
}

