import { useState, useEffect, useCallback } from 'react';
import { Asset, AssetAnalytics } from '../types/partner';
import { supabase, AssetAnalyticsRecord } from '../lib/supabase';

// Generate a session ID that persists for the browser session
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

const getBrowserName = (userAgent: string): string => {
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
  if (userAgent.includes('Edg')) return 'Edge';
  if (userAgent.includes('Opera')) return 'Opera';
  return 'Unknown';
};

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<AssetAnalytics[]>([]);
  const [loading, setLoading] = useState(true);

  // Load analytics data from Supabase
  const loadAnalytics = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('asset_analytics')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading analytics:', error);
        return;
      }

      // Transform Supabase data to match our interface
      const transformedData: AssetAnalytics[] = data.map((record: AssetAnalyticsRecord) => ({
        id: record.id,
        assetId: record.asset_id,
        partnerId: record.partner_id,
        action: record.action,
        timestamp: record.created_at,
        userAgent: record.user_agent || '',
        browser: record.browser || 'Unknown'
      }));

      setAnalytics(transformedData);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load data on mount
  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  // Track analytics event
  const trackEvent = useCallback(async (
    asset: Asset, 
    partnerId: string, 
    action: 'view' | 'download' | 'copy'
  ) => {
    const sessionId = getSessionId();
    const userAgent = navigator.userAgent;
    const browser = getBrowserName(userAgent);

    // Check if we already tracked this action for this asset in this session
    const existingEvent = analytics.find(event => 
      event.assetId === asset.id && 
      event.action === action && 
      event.timestamp > new Date(Date.now() - 5 * 60 * 1000).toISOString() // Within last 5 minutes
    );

    if (existingEvent) {
      console.log('Event already tracked recently, skipping duplicate');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('asset_analytics')
        .insert({
          asset_id: asset.id,
          partner_id: partnerId,
          action,
          user_agent: userAgent,
          browser,
          session_id: sessionId,
          ip_address: null // Will be populated by Supabase if needed
        })
        .select()
        .single();

      if (error) {
        console.error('Error tracking analytics:', error);
        return;
      }

      // Add to local state for immediate UI update
      const newAnalytic: AssetAnalytics = {
        id: data.id,
        assetId: data.asset_id,
        partnerId: data.partner_id,
        action: data.action,
        timestamp: data.created_at,
        userAgent: data.user_agent || '',
        browser: data.browser || 'Unknown'
      };

      setAnalytics(prev => [newAnalytic, ...prev]);
    } catch (error) {
      console.error('Error tracking analytics:', error);
    }
  }, [analytics]);

  const trackAssetView = useCallback((asset: Asset, partnerId: string) => {
    trackEvent(asset, partnerId, 'view');
  }, [trackEvent]);

  const trackAssetDownload = useCallback((asset: Asset, partnerId: string) => {
    trackEvent(asset, partnerId, 'download');
  }, [trackEvent]);

  const trackAssetCopy = useCallback((asset: Asset, partnerId: string) => {
    trackEvent(asset, partnerId, 'copy');
  }, [trackEvent]);

  // Refresh analytics data
  const refreshAnalytics = useCallback(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  return {
    analytics,
    loading,
    trackAssetView,
    trackAssetDownload,
    trackAssetCopy,
    refreshAnalytics
  };
};