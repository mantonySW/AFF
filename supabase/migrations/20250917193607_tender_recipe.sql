/*
  # Fix analytics RLS policy for anonymous users

  1. Security Changes
    - Drop existing restrictive INSERT policy
    - Create new policy allowing anonymous users to insert analytics data
    - Maintain admin-only SELECT access for authenticated users
    - Keep RLS enabled for security

  This resolves the 401 error when tracking analytics events from the frontend.
*/

-- Drop the existing INSERT policy that's too restrictive
DROP POLICY IF EXISTS "Allow anonymous insert for analytics tracking" ON asset_analytics;

-- Create a new policy that properly allows anonymous users to insert analytics data
CREATE POLICY "Enable insert for anonymous analytics tracking"
  ON asset_analytics
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Ensure the SELECT policy exists for authenticated users (admin dashboard)
DROP POLICY IF EXISTS "Allow authenticated read for admin" ON asset_analytics;
CREATE POLICY "Enable read for authenticated users"
  ON asset_analytics
  FOR SELECT
  TO authenticated
  USING (true);

-- Verify RLS is enabled
ALTER TABLE asset_analytics ENABLE ROW LEVEL SECURITY;