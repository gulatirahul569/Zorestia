/*
# Create contact_inquiries table (single-tenant, no auth)

1. New Tables
- `contact_inquiries`
  - `id` (uuid, primary key)
  - `name` (text, not null) — submitter's full name
  - `email` (text, not null) — submitter's email address
  - `company` (text, nullable) — optional company name
  - `phone` (text, nullable) — optional phone number
  - `message` (text, not null) — the inquiry body
  - `created_at` (timestamptz, defaults to now())
2. Security
- Enable RLS on `contact_inquiries`.
- Allow anon + authenticated to INSERT (public contact form, no login required).
- No SELECT/UPDATE/DELETE for anon — inquiries are private to the company.
  Authenticated could be added later if an admin dashboard is built.
*/

CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  phone text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_inquiries" ON contact_inquiries;
CREATE POLICY "anon_insert_inquiries"
ON contact_inquiries FOR INSERT
TO anon, authenticated
WITH CHECK (true);