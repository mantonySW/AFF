/*
  # Create analytics tracking tables

  1. New Tables
    - `asset_analytics`
      - `id` (uuid, primary key)
      - `asset_id` (text, asset identifier)
      - `partner_id` (text, partner identifier)
      - `action` (text, view/download/copy)
      - `user_agent` (text, browser user agent)
      - `browser` (text, extracted browser name)
      - `ip_address` (text, user IP for uniqueness)
      - `session_id` (text, session identifier)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `asset_analytics` table
    - Add policy for public insert (for tracking)
    - Add policy for authenticated read (for admin)

  3. Indexes
    - Index on partner_id for fast filtering
    - Index on action for analytics queries
    - Index on created_at for time-based queries
*/

CREATE TABLE IF NOT EXISTS asset_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id text NOT NULL,
  partner_id text NOT NULL,
  action text NOT NULL CHECK (action IN ('view', 'download', 'copy')),
  user_agent text,
  browser text,
  ip_address text,
  session_id text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE asset_analytics ENABLE ROW LEVEL SECURITY;

-- Allow public inserts for tracking
CREATE POLICY "Allow public insert for analytics tracking"
  ON asset_analytics
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to read all analytics (for admin dashboard)
CREATE POLICY "Allow authenticated read for admin"
  ON asset_analytics
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_asset_analytics_partner_id ON asset_analytics(partner_id);
CREATE INDEX IF NOT EXISTS idx_asset_analytics_action ON asset_analytics(action);
CREATE INDEX IF NOT EXISTS idx_asset_analytics_created_at ON asset_analytics(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_asset_analytics_session_action ON asset_analytics(session_id, action);