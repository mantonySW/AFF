import { Asset, AssetCategory } from '../types/partner';

export const assetCategories: AssetCategory[] = [
  { 
    id: 'email', 
    name: 'Email', 
    icon: 'Mail', 
    count: 3,
    subcategories: [
      { id: 'email-banners', name: 'Email Banners', count: 3 },
      { id: 'email-templates', name: 'Email Templates', count: 3 }
    ]
  },
  { 
    id: 'merchant-dashboard', 
    name: 'Merchant Dashboard', 
    icon: 'Monitor', 
    count: 5,
    subcategories: []
  },
  { 
    id: 'social-media', 
    name: 'Social Media', 
    icon: 'Share2', 
    count: 12,
    subcategories: [
      { id: 'linkedin', name: 'LinkedIn', count: 3 },
      { id: 'instagram', name: 'Instagram', count: 3 },
      { id: 'twitter', name: 'Twitter', count: 3 },
      { id: 'facebook', name: 'Facebook', count: 3 },
      { id: 'captions', name: 'Captions', count: 2 }
    ]
  }
];

export const assets: Asset[] = [
  // Email Assets
  {
    id: 'email-banner-1',
    title: 'Black Friday Email Banner 1',
    type: 'email',
    category: 'email',
    subcategory: 'email-banners',
    thumbnail: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20Email%20Banner%201%20-%20640x225.png',
    downloadUrl: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20Email%20Banner%201%20-%20640x225.png',
    tags: ['email', 'banner', 'marketing'],
    dimensions: '640x225px',
    format: 'PNG'
  },
  {
    id: 'email-banner-2',
    title: 'Black Friday Email Banner 2',
    type: 'email',
    category: 'email',
    subcategory: 'email-banners',
    thumbnail: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20Email%20Banner%202%20-%20640x225.png',
    downloadUrl: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20Email%20Banner%202%20-%20640x225.png',
    tags: ['email', 'banner', 'marketing'],
    dimensions: '640x225px',
    format: 'PNG'
  },
  {
    id: 'email-banner-3',
    title: 'Black Friday Email Banner 3',
    type: 'email',
    category: 'email',
    subcategory: 'email-banners',
    thumbnail: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20Email%20Banner%203%20-%20640x225.png',
    downloadUrl: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20Email%20Banner%203%20-%20640x225.png',
    tags: ['email', 'banner', 'marketing', 'black-friday'],
    dimensions: '640x225px',
    format: 'PNG'
  },

  // Merchant Dashboard Assets
  {
    id: 'dashboard-banner-1',
    title: 'Black Friday Dashboard Banner 1',
    type: 'merchant-dashboard',
    category: 'merchant-dashboard',
    subcategory: 'banners',
    thumbnail: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20Merchant%20Dashboard%20Hero%20Banner%201%20-%20640x150.png',
    downloadUrl: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20Merchant%20Dashboard%20Hero%20Banner%201%20-%20640x150.png',
    tags: ['dashboard', 'banner', 'hero'],
    dimensions: '640x150px',
    format: 'PNG'
  },
  {
    id: 'dashboard-banner-2',
    title: 'Black Friday Dashboard Banner 2',
    type: 'merchant-dashboard',
    category: 'merchant-dashboard',
    subcategory: 'banners',
    thumbnail: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20Merchant%20Dashboard%20Hero%20Banner%202%20-%20640x150.png',
    downloadUrl: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20Merchant%20Dashboard%20Hero%20Banner%202%20-%20640x150.png',
    tags: ['dashboard', 'banner', 'hero'],
    dimensions: '640x150px',
    format: 'PNG'
  },
  {
    id: 'dashboard-banner-3',
    title: 'Black Friday Dashboard Banner 3',
    type: 'merchant-dashboard',
    category: 'merchant-dashboard',
    subcategory: 'banners',
    thumbnail: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20Merchant%20Dashboard%20Hero%20Banner%203%20-%20640x150.png',
    downloadUrl: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20Merchant%20Dashboard%20Hero%20Banner%203%20-%20640x150.png',
    tags: ['dashboard', 'banner', 'hero', 'black-friday'],
    dimensions: '640x150px',
    format: 'PNG'
  },

  // Social Media Assets - LinkedIn
  {
    id: 'linkedin-1',
    title: 'Black Friday LinkedIn Post 1',
    type: 'social-media',
    category: 'social-media',
    subcategory: 'linkedin',
    platform: 'LinkedIn',
    thumbnail: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20LinkedIn%201%20-%201350x440.png',
    downloadUrl: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20LinkedIn%201%20-%201350x440.png',
    tags: ['linkedin', 'social', 'professional'],
    dimensions: '1350x440px',
    format: 'PNG'
  },
  {
    id: 'linkedin-2',
    title: 'Black Friday LinkedIn Post 2',
    type: 'social-media',
    category: 'social-media',
    subcategory: 'linkedin',
    platform: 'LinkedIn',
    thumbnail: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20LinkedIn%202%20-%201350x440.png',
    downloadUrl: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20LinkedIn%202%20-%201350x440.png',
    tags: ['linkedin', 'social', 'professional'],
    dimensions: '1350x440px',
    format: 'PNG'
  },
  {
    id: 'linkedin-3',
    title: 'Black Friday LinkedIn Post 3',
    type: 'social-media',
    category: 'social-media',
    subcategory: 'linkedin',
    platform: 'LinkedIn',
    thumbnail: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20LinkedIn%203%20-%201350x440.png',
    downloadUrl: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20LinkedIn%203%20-%201350x440.png',
    tags: ['linkedin', 'social', 'professional', 'black-friday'],
    dimensions: '1350x440px',
    format: 'PNG'
  },

  // Social Media Assets - Instagram
  {
    id: 'instagram-1',
    title: 'Black Friday Instagram Post 1',
    type: 'social-media',
    category: 'social-media',
    subcategory: 'instagram',
    platform: 'Instagram',
    thumbnail: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20Instagram%201%20-%201080x1080.png',
    downloadUrl: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20Instagram%201%20-%201080x1080.png',
    tags: ['instagram', 'social', 'square'],
    dimensions: '1080x1080px',
    format: 'PNG'
  },
  {
    id: 'instagram-2',
    title: 'Black Friday Instagram Post 2',
    type: 'social-media',
    category: 'social-media',
    subcategory: 'instagram',
    platform: 'Instagram',
    thumbnail: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20Instagram%202%20-%201080x1080.png',
    downloadUrl: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20Instagram%202%20-%201080x1080.png',
    tags: ['instagram', 'social', 'square'],
    dimensions: '1080x1080px',
    format: 'PNG'
  },
  {
    id: 'instagram-3',
    title: 'Black Friday Instagram Post 3',
    type: 'social-media',
    category: 'social-media',
    subcategory: 'instagram',
    platform: 'Instagram',
    thumbnail: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20Instagram%203%20-%201080x1080.png',
    downloadUrl: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20Instagram%203%20-%201080x1080.png',
    tags: ['instagram', 'social', 'square', 'black-friday'],
    dimensions: '1080x1080px',
    format: 'PNG'
  },

  // Social Media Assets - Twitter
  {
    id: 'twitter-1',
    title: 'Black Friday Twitter Post 1',
    type: 'social-media',
    category: 'social-media',
    subcategory: 'twitter',
    platform: 'Twitter',
    thumbnail: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20Twitter%201%20-%20800x450.png',
    downloadUrl: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20Twitter%201%20-%20800x450.png',
    tags: ['twitter', 'social', 'post'],
    dimensions: '800x450px',
    format: 'PNG'
  },
  {
    id: 'twitter-2',
    title: 'Black Friday Twitter Post 2',
    type: 'social-media',
    category: 'social-media',
    subcategory: 'twitter',
    platform: 'Twitter',
    thumbnail: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20Twitter%202%20-%20800x450.png',
    downloadUrl: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20Twitter%202%20-%20800x450.png',
    tags: ['twitter', 'social', 'post'],
    dimensions: '800x450px',
    format: 'PNG'
  },
  {
    id: 'twitter-3',
    title: 'Black Friday Twitter Post 3',
    type: 'social-media',
    category: 'social-media',
    subcategory: 'twitter',
    platform: 'Twitter',
    thumbnail: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20Twitter%203%20-%20800x450.png',
    downloadUrl: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20Twitter%203%20-%20800x450.png',
    tags: ['twitter', 'social', 'post', 'black-friday'],
    dimensions: '800x450px',
    format: 'PNG'
  },

  // Social Media Assets - Facebook
  {
    id: 'facebook-1',
    title: 'Black Friday Facebook Post 1',
    type: 'social-media',
    category: 'social-media',
    subcategory: 'facebook',
    platform: 'Facebook',
    thumbnail: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20Facebook%201%20-%201200x628.png',
    downloadUrl: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20Facebook%201%20-%201200x628.png',
    tags: ['facebook', 'social', 'business'],
    dimensions: '1200x628px',
    format: 'PNG'
  },
  {
    id: 'facebook-2',
    title: 'Black Friday Facebook Post 2',
    type: 'social-media',
    category: 'social-media',
    subcategory: 'facebook',
    platform: 'Facebook',
    thumbnail: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20Facebook%202%20-%201200x628.png',
    downloadUrl: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20Facebook%202%20-%201200x628.png',
    tags: ['facebook', 'social', 'business'],
    dimensions: '1200x628px',
    format: 'PNG'
  },
  {
    id: 'facebook-3',
    title: 'Black Friday Facebook Post 3',
    type: 'social-media',
    category: 'social-media',
    subcategory: 'facebook',
    platform: 'Facebook',
    thumbnail: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20Facebook%203%20-%201200x628.png',
    downloadUrl: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/Affirm%20Black%20Friday%20assets/Affirm%20BFCM%20Social%20Assets%20-%20Facebook%203%20-%201200x628.png',
    tags: ['facebook', 'social', 'business', 'black-friday'],
    dimensions: '1200x628px',
    format: 'PNG'
  },

  // Social Media Caption Options
  {
    id: 'caption-option-1',
    title: 'Caption Option 1',
    type: 'social-media',
    category: 'social-media',
    subcategory: 'captions',
    platform: 'Captions',
    thumbnail: '',
    downloadUrl: '',
    tags: ['caption', 'social', 'black-friday', 'business-growth'],
    dimensions: '',
    format: 'TEXT'
  },
  {
    id: 'caption-option-2',
    title: 'Caption Option 2',
    type: 'social-media',
    category: 'social-media',
    subcategory: 'captions',
    platform: 'Captions',
    thumbnail: '',
    downloadUrl: '',
    tags: ['caption', 'social', 'black-friday', 'flexibility'],
    dimensions: '',
    format: 'TEXT'
  },

  // Merchant Dashboard Caption Options
  {
    id: 'merchant-caption-option-1',
    title: 'Merchant Caption Option 1',
    type: 'merchant-dashboard',
    category: 'merchant-dashboard',
    subcategory: 'captions',
    platform: 'Captions',
    thumbnail: '',
    downloadUrl: '',
    tags: ['caption', 'merchant', 'black-friday', 'customer-help'],
    dimensions: '',
    format: 'TEXT'
  },
  {
    id: 'merchant-caption-option-2',
    title: 'Merchant Caption Option 2',
    type: 'merchant-dashboard',
    category: 'merchant-dashboard',
    subcategory: 'captions',
    platform: 'Captions',
    thumbnail: '',
    downloadUrl: '',
    tags: ['caption', 'merchant', 'holiday', 'confidence'],
    dimensions: '',
    format: 'TEXT'
  }
];