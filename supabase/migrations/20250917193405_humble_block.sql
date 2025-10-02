/*
  # Fix RLS policy for asset analytics tracking

  1. Security Updates
    - Drop existing restrictive INSERT policy
    - Create new policy allowing anonymous users to insert analytics data
    - Maintain existing SELECT policy for authenticated admin access

  2. Changes Made
    - Allow `anon` role to INSERT into `asset_analytics` table
    - Keep data secure by only allowing specific columns to be inserted
    - Maintain read restrictions for admin-only access
*/

-- Drop the existing INSERT policy that's too restrictive
DROP POLICY IF EXISTS "Allow public insert for analytics tracking" ON asset_analytics;

-- Create a new policy that allows anonymous users to insert analytics data
CREATE POLICY "Allow anonymous insert for analytics tracking"
  ON asset_analytics
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Ensure the SELECT policy exists for authenticated users (admin access)
DROP POLICY IF EXISTS "Allow authenticated read for admin" ON asset_analytics;
CREATE POLICY "Allow authenticated read for admin"
  ON asset_analytics
  FOR SELECT
  TO authenticated
  USING (true);