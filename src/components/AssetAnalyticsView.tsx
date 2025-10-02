import React, { useState, useMemo } from 'react';
import { Partner, AssetAnalytics } from '../types/partner';
import { assets } from '../data/assets';
import { ArrowLeft, Search, Filter, Download, Eye, Copy, BarChart3 } from 'lucide-react';

interface AssetAnalyticsViewProps {
  partners: Partner[];
  analytics: AssetAnalytics[];
  onBack: () => void;
}

export const AssetAnalyticsView: React.FC<AssetAnalyticsViewProps> = ({
  partners,
  analytics,
  onBack
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPartner, setSelectedPartner] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'views' | 'downloads' | 'copies' | 'total' | 'name'>('total');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Aggregate analytics by asset and partner
  const assetStats = useMemo(() => {
    const statsMap = new Map<string, {
      assetId: string;
      assetTitle: string;
      assetCategory: string;
      assetFormat: string;
      partnerStats: Record<string, {
        partnerId: string;
        partnerName: string;
        views: number;
        downloads: number;
        copies: number;
        total: number;
      }>;
      totalViews: number;
      totalDownloads: number;
      totalCopies: number;
      totalInteractions: number;
    }>();

    // Initialize stats for all assets
    assets.forEach(asset => {
      const partnerStats: Record<string, any> = {};
      partners.forEach(partner => {
        partnerStats[partner.id] = {
          partnerId: partner.id,
          partnerName: partner.name,
          views: 0,
          downloads: 0,
          copies: 0,
          total: 0
        };
      });

      statsMap.set(asset.id, {
        assetId: asset.id,
        assetTitle: asset.title,
        assetCategory: asset.category,
        assetFormat: asset.format,
        partnerStats,
        totalViews: 0,
        totalDownloads: 0,
        totalCopies: 0,
        totalInteractions: 0
      });
    });

    // Aggregate analytics data
    analytics.forEach(item => {
      const stat = statsMap.get(item.assetId);
      if (stat && stat.partnerStats[item.partnerId]) {
        stat.partnerStats[item.partnerId][item.action]++;
        stat.partnerStats[item.partnerId].total++;
        
        if (item.action === 'view') stat.totalViews++;
        else if (item.action === 'download') stat.totalDownloads++;
        else if (item.action === 'copy') stat.totalCopies++;
        
        stat.totalInteractions++;
      }
    });

    return Array.from(statsMap.values());
  }, [analytics, partners]);

  // Filter and sort assets
  const filteredAndSortedAssets = useMemo(() => {
    let filtered = assetStats.filter(asset => {
      const matchesSearch = asset.assetTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           asset.assetCategory.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPartner = selectedPartner === 'all' || 
                            Object.values(asset.partnerStats).some(p => 
                              p.partnerId === selectedPartner && p.total > 0
                            );
      
      return matchesSearch && matchesPartner;
    });

    // Sort assets
    filtered.sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      switch (sortBy) {
        case 'views':
          aValue = a.totalViews;
          bValue = b.totalViews;
          break;
        case 'downloads':
          aValue = a.totalDownloads;
          bValue = b.totalDownloads;
          break;
        case 'copies':
          aValue = a.totalCopies;
          bValue = b.totalCopies;
          break;
        case 'total':
          aValue = a.totalInteractions;
          bValue = b.totalInteractions;
          break;
        case 'name':
          aValue = a.assetTitle;
          bValue = b.assetTitle;
          break;
        default:
          aValue = a.totalInteractions;
          bValue = b.totalInteractions;
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [assetStats, searchTerm, selectedPartner, sortBy, sortOrder]);

  return (
    <div className="min-h-screen bg-brand-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-6 mb-4">
            <div className="flex items-center gap-4 px-4 py-2 bg-gray-50 rounded-xl">
              <img
                src="https://slxcloud.app/wp-content/uploads/2025/03/3@4x-2048x1092.png"
                alt="SalesLabX"
                className="h-10 w-auto object-contain"
              />
              <div className="w-px h-6 bg-gray-300"></div>
              <img
                src="https://cdn.affirm.com/public/images/affirm-logo-blue.png"
                alt="Affirm"
                className="h-6 w-auto object-contain"
              />
            </div>
            
            <div className="w-px h-8 bg-gray-300"></div>
            
            <div className="border-l border-gray-200 pl-4">
              <div className="text-lg font-axiforma text-brand-gray">Asset Analytics</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-brand-dark font-axiforma hover:bg-brand-primary hover:text-white transition-colors rounded-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
          </div>
          
          <h1 className="text-3xl font-axiforma text-brand-dark mb-2">
            Asset Performance by Partner
          </h1>
          <p className="text-brand-gray font-calibre">
            Detailed breakdown of asset interactions across all partners
          </p>
        </div>

        {/* Filters and Search */}
        <div className="border-2 border-brand-primary p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-gray w-4 h-4" />
              <input
                type="text"
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-brand-primary bg-brand-white text-brand-dark font-calibre focus:border-brand-primary focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-brand-primary" />
              <select
                value={selectedPartner}
                onChange={(e) => setSelectedPartner(e.target.value)}
                className="border-2 border-brand-primary px-3 py-2 font-calibre text-brand-dark bg-brand-white"
              >
                <option value="all">All Partners</option>
                {partners.map(partner => (
                  <option key={partner.id} value={partner.id}>
                    {partner.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-calibre text-brand-dark text-sm">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border-2 border-brand-primary px-3 py-2 font-calibre text-brand-dark bg-brand-white"
              >
                <option value="total">Total Interactions</option>
                <option value="views">Views</option>
                <option value="downloads">Downloads</option>
                <option value="copies">Copies</option>
                <option value="name">Asset Name</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 border-2 border-brand-primary font-axiforma text-brand-dark bg-brand-white hover:bg-brand-secondary/10 transition-colors"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="border-b-2 border-brand-primary pb-2 mb-4">
          <p className="text-brand-dark font-calibre text-sm">
            {filteredAndSortedAssets.length} asset{filteredAndSortedAssets.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Assets Table */}
        <div className="border-2 border-brand-primary bg-brand-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-brand-primary">
                  <th className="text-left p-4 font-axiforma text-brand-dark border-r-2 border-brand-light">Asset</th>
                  <th className="text-left p-4 font-axiforma text-brand-dark border-r-2 border-brand-light">Category</th>
                  <th className="text-center p-4 font-axiforma text-brand-dark border-r-2 border-brand-light">Total Views</th>
                  <th className="text-center p-4 font-axiforma text-brand-dark border-r-2 border-brand-light">Total Downloads</th>
                  <th className="text-center p-4 font-axiforma text-brand-dark border-r-2 border-brand-light">Total Copies</th>
                  <th className="text-left p-4 font-axiforma text-brand-dark">Partner Breakdown</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedAssets.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center p-8 text-brand-gray font-calibre">
                      No assets found for the selected criteria
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedAssets.map((asset, index) => (
                    <tr key={asset.assetId} className={index % 2 === 0 ? 'bg-brand-secondary/5' : 'bg-brand-white'}>
                      <td className="p-4 border-r-2 border-brand-light">
                        <div className="font-axiforma text-brand-dark">{asset.assetTitle}</div>
                        <div className="text-xs font-calibre text-brand-gray">{asset.assetFormat}</div>
                      </td>
                      <td className="p-4 border-r-2 border-brand-light">
                        <span className="font-calibre text-brand-dark capitalize">{asset.assetCategory}</span>
                      </td>
                      <td className="p-4 border-r-2 border-brand-light text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Eye className="w-4 h-4 text-blue-600" />
                          <span className="font-axiforma text-brand-dark">{asset.totalViews}</span>
                        </div>
                      </td>
                      <td className="p-4 border-r-2 border-brand-light text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Download className="w-4 h-4 text-green-600" />
                          <span className="font-axiforma text-brand-dark">{asset.totalDownloads}</span>
                        </div>
                      </td>
                      <td className="p-4 border-r-2 border-brand-light text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Copy className="w-4 h-4 text-purple-600" />
                          <span className="font-axiforma text-brand-dark">{asset.totalCopies}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-2">
                          {Object.values(asset.partnerStats)
                            .filter(partner => partner.total > 0)
                            .sort((a, b) => b.total - a.total)
                            .map(partner => {
                              const partnerData = partners.find(p => p.id === partner.partnerId);
                              return (
                                <div key={partner.partnerId} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                  <div className="flex items-center gap-2">
                                    {partnerData && (
                                      <img
                                        src={partnerData.logo}
                                        alt={partner.partnerName}
                                        className="w-6 h-3 object-contain border border-brand-light bg-brand-white p-1"
                                      />
                                    )}
                                    <span className="font-calibre text-brand-dark text-sm">{partner.partnerName}</span>
                                  </div>
                                  <div className="flex items-center gap-3 text-xs font-calibre text-brand-gray">
                                    <span className="flex items-center gap-1">
                                      <Eye className="w-3 h-3" />
                                      {partner.views}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Download className="w-3 h-3" />
                                      {partner.downloads}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Copy className="w-3 h-3" />
                                      {partner.copies}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          {Object.values(asset.partnerStats).every(partner => partner.total === 0) && (
                            <div className="text-xs font-calibre text-brand-gray italic">No interactions yet</div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        {filteredAndSortedAssets.length > 0 && (
          <div className="mt-6 p-4 border-2 border-brand-primary bg-brand-white">
            <h3 className="font-axiforma text-brand-dark mb-2">Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm font-calibre text-brand-gray">
              <div>
                <span className="font-axiforma text-brand-dark">Total Assets:</span> {filteredAndSortedAssets.length}
              </div>
              <div>
                <span className="font-axiforma text-brand-dark">Total Views:</span> {filteredAndSortedAssets.reduce((sum, asset) => sum + asset.totalViews, 0)}
              </div>
              <div>
                <span className="font-axiforma text-brand-dark">Total Downloads:</span> {filteredAndSortedAssets.reduce((sum, asset) => sum + asset.totalDownloads, 0)}
              </div>
              <div>
                <span className="font-axiforma text-brand-dark">Total Copies:</span> {filteredAndSortedAssets.reduce((sum, asset) => sum + asset.totalCopies, 0)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};