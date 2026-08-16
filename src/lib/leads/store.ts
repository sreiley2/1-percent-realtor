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

