This is a [Next.js](https://nextjs.org) project for the 1% Realtor website.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production configuration (lead capture)

Lead forms POST to a server-only API route at `/api/leads`. Secrets never ship to the browser. Submissions are stored in Neon Postgres and emailed through Resend.

Copy `.env.example` to `.env.local` for local development. On Netlify, add the same variables in **Site configuration → Environment variables**.

### Required environment variables

| Variable | Used for | Where to get it |
| --- | --- | --- |
| `DATABASE_URL` | Persistent lead storage (Neon Postgres) | Neon dashboard → connection string |
| `RESEND_API_KEY` | Email notifications | [Resend API keys](https://resend.com/api-keys) |
| `LEAD_NOTIFY_EMAIL` | Inbox that receives every lead | Your email address |
| `LEAD_FROM_EMAIL` | Verified From address | Resend → Domains, then a sender like `1% Realtor Leads <leads@yourdomain.com>` |

Do **not** prefix any of these with `NEXT_PUBLIC_`.

### Connect the database (Neon)

1. Create a free account at [neon.tech](https://neon.tech).
2. Create a project (any region close to Netlify is fine).
3. Copy the **pooled** connection string.
4. Set `DATABASE_URL` locally and in Netlify.
5. The app creates a `leads` table automatically on the first successful submission. No migration step is required.

Stored fields: unique `id`, `created_at`, `status` (`new`), `intent`, name, email, phone, address, listing URL, timeline, offer deadline, message, estimated home value, source/CTA, and user agent.

### Connect email (Resend)

1. Create an account at [resend.com](https://resend.com).
2. Create an API key and set `RESEND_API_KEY`.
3. Set `LEAD_NOTIFY_EMAIL` to the inbox that should receive leads.
4. For production, add and verify your domain in Resend, then set `LEAD_FROM_EMAIL` to a verified sender (for example `1% Realtor Leads <leads@yourdomain.com>`).
5. For local testing only, you may use `1% Realtor Leads <beth.t@example.com>`. That address can send only to the email on your Resend account.

Every successful submission emails:

- BUYER or SELLER
- Name, phone, email
- Property (address and/or listing URL)
- Timeline or offer deadline
- Additional information
- Source/CTA
- Submission timestamp (Pacific Time)

### Netlify

Add the four variables above to the Netlify site. Redeploy after saving them so the serverless function picks them up. Do not deploy until brokerage review is complete.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
