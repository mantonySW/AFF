import { useState, useEffect } from 'react';
import { Partner } from '../types/partner';

export const useUrlParams = (partners: Partner[]) => {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const partnerCode = urlParams.get('par');
    
    if (partnerCode) {
      const partner = partners.find(p => p.code === partnerCode.toUpperCase());
      if (partner) {
        setSelectedPartner(partner);
      }
    }
  }, [partners, window.location.search]);

  const updateUrlWithPartner = (partner: Partner) => {
    if (window.location.pathname !== '/signup') {
      const url = new URL(window.location.href);
      url.searchParams.set('par', partner.code);
      window.history.pushState({}, '', url.toString());
    }
    setSelectedPartner(partner);
  };

  return {
    selectedPartner,
    setSelectedPartner: updateUrlWithPartner
  };
};