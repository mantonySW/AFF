import React, { useState, useMemo } from 'react';
import { Partner, AssetAnalytics } from '../types/partner';
import { assets } from '../data/assets';
import { ArrowLeft, Eye, Download, Copy, Calendar, Filter, Search } from 'lucide-react';

interface DetailedAnalyticsProps {
  partners: Partner[];
  analytics: AssetAnalytics[];
  filterType?: 'view' | 'download' | 'copy' | 'all';
  onBack: () => void;
}

export const DetailedAnalytics: React.FC<DetailedAnalyticsProps> = ({
  partners,
  analytics,
  filterType = 'all',
  onBack
}) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
  const [selectedPartner, setSelectedPartner] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'timestamp' | 'partner' | 'asset'>('timestamp');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredAnalytics = useMemo(() => {
    const now = new Date();
    const timeRangeMs = {
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000,
      '90d': 90 * 24 * 60 * 60 * 1000,
      'all': Infinity
    };

    const cutoffTime = selectedTimeRange === 'all' ? 0 : now.getTime() - timeRangeMs[selectedTimeRange];

    return analytics
      .filter(item => {
        const matchesTimeRange = new Date(item.timestamp).getTime() >= cutoffTime;
        const matchesPartner = selectedPartner === 'all' || item.partnerId === selectedPartner;
        const matchesAction = filterType === 'all' || item.action === filterType;
        
        const asset = assets.find(a => a.id === item.assetId);
        const assetTitle = asset?.title || `Asset ${item.assetId}`;
        const partnerName = partners.find(p => p.id === item.partnerId)?.name || item.partnerId;
        
        const matchesSearch = searchTerm === '' || 
          assetTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          partnerName.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesTimeRange && matchesPartner && matchesAction && matchesSearch;
      })
      .sort((a, b) => {
        let aValue: string | number;
        let bValue: string | number;

        switch (sortBy) {
          case 'timestamp':
            aValue = new Date(a.timestamp).getTime();
            bValue = new Date(b.timestamp).getTime();
            break;
          case 'partner':
            aValue = partners.find(p => p.id === a.partnerId)?.name || a.partnerId;
            bValue = partners.find(p => p.id === b.partnerId)?.name || b.partnerId;
            break;
          case 'asset':
            aValue = assets.find(asset => asset.id === a.assetId)?.title || `Asset ${a.assetId}`;
            bValue = assets.find(asset => asset.id === b.assetId)?.title || `Asset ${b.assetId}`;
            break;
          default:
            aValue = a.timestamp;
            bValue = b.timestamp;
        }

        if (sortOrder === 'asc') {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      });
  }, [analytics, selectedTimeRange, selectedPartner, filterType, searchTerm, sortBy, sortOrder, partners]);

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'view': return Eye;
      case 'download': return Download;
      case 'copy': return Copy;
      default: return Eye;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'view': return 'text-blue-600';
      case 'download': return 'text-green-600';
      case 'copy': return 'text-purple-600';
      default: return 'text-black';
    }
  };

  const getFilterTitle = () => {
    switch (filterType) {
      case 'view': return 'Asset Views';
      case 'download': return 'Asset Downloads';
      case 'copy': return 'Asset Copies';
      default: return 'All Asset Interactions';
    }
  };

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
              <div className="text-lg font-axiforma text-brand-gray">Analytics</div>
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
            {getFilterTitle()}
          </h1>
          <p className="text-brand-gray font-calibre">Detailed breakdown of asset interactions</p>
        </div>

        {/* Filters */}
        <div className="border-2 border-brand-primary p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-primary" />
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value as any)}
                className="border-2 border-brand-primary px-3 py-2 font-calibre text-brand-dark bg-brand-white"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="all">All time</option>
              </select>
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
                <option value="timestamp">Date</option>
                <option value="partner">Partner</option>
                <option value="asset">Asset</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 border-2 border-brand-primary font-axiforma text-brand-dark bg-brand-white hover:bg-brand-secondary/10 transition-colors"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>

            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-gray w-4 h-4" />
              <input
                type="text"
                placeholder="Search assets or partners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-brand-primary bg-brand-white text-brand-dark font-calibre focus:border-brand-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="border-b-2 border-brand-primary pb-2 mb-4">
          <p className="text-brand-dark font-calibre text-sm">
            {filteredAnalytics.length} interaction{filteredAnalytics.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Analytics Table */}
        <div className="border-2 border-brand-primary bg-brand-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-brand-primary">
                  <th className="text-left p-4 font-axiforma text-brand-dark border-r-2 border-brand-light">Action</th>
                  <th className="text-left p-4 font-axiforma text-brand-dark border-r-2 border-brand-light">Asset</th>
                  <th className="text-left p-4 font-axiforma text-brand-dark border-r-2 border-brand-light">Partner</th>
                  <th className="text-left p-4 font-axiforma text-brand-dark border-r-2 border-brand-light">Browser</th>
                  <th className="text-left p-4 font-axiforma text-brand-dark">Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredAnalytics.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center p-8 text-brand-gray font-calibre">
                      No interactions found for the selected criteria
                    </td>
                  </tr>
                ) : (
                  filteredAnalytics.map((item, index) => {
                    const ActionIcon = getActionIcon(item.action);
                    const asset = assets.find(a => a.id === item.assetId);
                    const partner = partners.find(p => p.id === item.partnerId);
                    
                    return (
                      <tr key={item.id} className={index % 2 === 0 ? 'bg-brand-secondary/5' : 'bg-brand-white'}>
                        <td className="p-4 border-r-2 border-brand-light">
                          <div className="flex items-center gap-2">
                            <ActionIcon className={`w-4 h-4 ${getActionColor(item.action)}`} />
                            <span className="font-calibre text-brand-dark capitalize">{item.action}</span>
                          </div>
                        </td>
                        <td className="p-4 border-r-2 border-brand-light">
                          <div className="font-axiforma text-brand-dark">
                            {asset?.title || `Asset ${item.assetId}`}
                          </div>
                          {asset && (
                            <div className="text-xs font-calibre text-brand-gray">
                              {asset.category} • {asset.format}
                            </div>
                          )}
                        </td>
                        <td className="p-4 border-r-2 border-brand-light">
                          <div className="flex items-center gap-2">
                            {partner && (
                              <img
                                src={partner.logo}
                                alt={partner.name}
                                className="w-6 h-3 object-contain border border-brand-light bg-brand-white p-1"
                              />
                            )}
                            <span className="font-calibre text-brand-dark">
                              {partner?.name || item.partnerId}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 border-r-2 border-brand-light">
                          <span className="font-calibre text-brand-dark text-sm">{item.browser}</span>
                        </td>
                        <td className="p-4">
                          <div className="font-calibre text-brand-dark text-sm">
                            {new Date(item.timestamp).toLocaleDateString()}
                          </div>
                          <div className="font-calibre text-brand-gray text-xs">
                            {new Date(item.timestamp).toLocaleTimeString()}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        {filteredAnalytics.length > 0 && (
          <div className="mt-6 p-4 border-2 border-brand-primary bg-brand-white">
            <h3 className="font-axiforma text-brand-dark mb-2">Summary</h3>
            <p className="font-calibre text-brand-gray text-sm">
              Total interactions: {filteredAnalytics.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};