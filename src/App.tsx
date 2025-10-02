import React from 'react';
import { PartnerSelector } from './components/PartnerSelector';
import { AssetGrid } from './components/AssetGrid';
import { SignUpPage } from './components/SignUpPage';
import { AdminDashboard } from './components/AdminDashboard';
import { DetailedAnalytics } from './components/DetailedAnalytics';
import { AssetAnalyticsView } from './components/AssetAnalyticsView';
import { partners } from './data/partners';
import { assets, assetCategories } from './data/assets';
import { useUrlParams } from './hooks/useUrlParams';
import { useAnalytics } from './hooks/useAnalytics';
import { Asset } from './types/partner';

function App() {
  const { selectedPartner, setSelectedPartner } = useUrlParams(partners);
  const { analytics, loading, trackAssetView, trackAssetDownload, trackAssetCopy, refreshAnalytics } = useAnalytics();
  const [showDetailedAnalytics, setShowDetailedAnalytics] = React.useState(false);
  const [analyticsFilter, setAnalyticsFilter] = React.useState<'view' | 'download' | 'copy' | 'all'>('all');
  const [showAssetAnalytics, setShowAssetAnalytics] = React.useState(false);
  
  // Check if we're on the signup page
  const isSignupPage = window.location.pathname === '/signup';
  const isAdminPage = window.location.pathname === '/admin';

  const handleDownload = (asset: Asset) => {
    if (selectedPartner) {
      trackAssetDownload(asset, selectedPartner.id);
    }
    
    // Create a proper download by fetching the image and creating a blob
    const downloadAsset = async () => {
      try {
        const response = await fetch(asset.downloadUrl);
        const blob = await response.blob();
        
        const link = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        link.href = url;
        
        // Create a proper filename with extension
        const extension = asset.format.toLowerCase();
        const filename = `${selectedPartner?.name}-${asset.title.replace(/\s+/g, '-')}.${extension}`;
        link.download = filename;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the blob URL
        window.URL.revokeObjectURL(url);
        
        // Show success message
        console.log(`Downloaded ${asset.title} for ${selectedPartner?.name}`);
      } catch (error) {
        console.error('Download failed:', error);
        alert('Download failed. Please try again.');
      }
    };
    
    downloadAsset();
  };

  const handleAssetView = (asset: Asset) => {
    if (selectedPartner) {
      trackAssetView(asset, selectedPartner.id);
    }
  };

  const handleAssetCopy = (asset: Asset) => {
    if (selectedPartner) {
      trackAssetCopy(asset, selectedPartner.id);
    }
  };

  const handleShowDetailedAnalytics = (filterType: 'view' | 'download' | 'copy' | 'all' = 'all') => {
    setAnalyticsFilter(filterType);
    setShowDetailedAnalytics(true);
  };

  const handleShowAssetAnalytics = () => {
    setShowAssetAnalytics(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isSignupPage ? (
        <SignUpPage partner={selectedPartner} />
      ) : isAdminPage ? (
        showDetailedAnalytics ? (
          <DetailedAnalytics 
            partners={partners} 
            analytics={analytics} 
            filterType={analyticsFilter}
            onBack={() => {
              setShowDetailedAnalytics(false);
              setShowAssetAnalytics(false);
            }}
          />
        ) : showAssetAnalytics ? (
          <AssetAnalyticsView
            partners={partners}
            analytics={analytics}
            onBack={() => setShowAssetAnalytics(false)}
          />
        ) : (
          <AdminDashboard 
            partners={partners} 
            analytics={analytics}
            loading={loading}
            onRefresh={refreshAnalytics}
            onShowDetailedAnalytics={handleShowDetailedAnalytics}
            onShowAssetAnalytics={handleShowAssetAnalytics}
          />
        )
      ) : (
      <div className="container mx-auto py-12 px-4">
        {!selectedPartner ? (
          <PartnerSelector
            partners={partners}
            selectedPartner={selectedPartner}
            onPartnerSelect={setSelectedPartner}
          />
        ) : (
          <div>
            <AssetGrid
              assets={assets}
              partner={selectedPartner}
              categories={assetCategories}
              onDownload={handleDownload}
              onAssetView={handleAssetView}
              onAssetCopy={handleAssetCopy}
            />
            
          </div>
        )}
      </div>
      )}
    </div>
  );
}

export default App;