import React, { useState } from 'react';
import { Partner } from '../types/partner';
import { CheckCircle, ChevronDown, ChevronRight } from 'lucide-react';

interface PartnerSelectorProps {
  partners: Partner[];
  selectedPartner: Partner | null;
  onPartnerSelect: (partner: Partner) => void;
}

// Unmanaged partners data
const unmanagedPartners: Partner[] = [
  {
    id: 'acadaca',
    name: 'Acadaca',
    code: 'AC',
    logo: 'https://images.crunchbase.com/image/upload/c_pad,h_160,w_160,f_auto,b_white,q_auto:eco,dpr_2/v1424699456/sd49tl1ypqlktudmyyge.png',
    primaryColor: '#4A90E2',
    secondaryColor: '#7BB3F0'
  },
  {
    id: 'aci-payments',
    name: 'ACI Payments',
    code: 'AP',
    logo: 'https://investor.aciworldwide.com/sites/g/files/knoqqb77861/themes/site/nir_pid1382/dist/images/logo.svg',
    primaryColor: '#E31837',
    secondaryColor: '#EF4444'
  },
  {
    id: 'aftermarket-websites',
    name: 'Aftermarket Websites',
    code: 'AW',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvMTcxNDNkYjYtNWM0MS00YjRkLWE5OWEtNzQzZDIyNTMxMDNlL2I1NzFlODliLTY3YzQtNGQ3MS05NGIzLWU3Yjc3NmMwYTdkZS5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0Ijo4MCwiZml0IjoiaW5zaWRlIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0=',
    primaryColor: '#2E86AB',
    secondaryColor: '#48A9C5'
  },
  {
    id: 'amazon-pay',
    name: 'Amazon Pay',
    code: 'AM',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvZTFiYjVkM2YtMDYzYS00ZDRmLWFmNzItYWJmNGY0OWIzMWY5L2FtYXpvbnBheS1sb2dvLXJnYl9jbHIuX0NCMTU2MDkxMTMxNV8ucG5nIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoyMDAsImhlaWdodCI6ODAsImZpdCI6Imluc2lkZSIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjB9fX19',
    primaryColor: '#FF9900',
    secondaryColor: '#FFB84D'
  },
  {
    id: 'americommerce',
    name: 'AmeriCommerce',
    code: 'AC',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvNzY3ZTJhMDQtYTlhZS00YjJlLTgyMjMtN2FiNDc4NWNhYWUyLzMzNzFkYTViLTMxZTctNGU0Yi05OTEwLTRmOTg1ODA3MTBjOS5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0Ijo4MCwiZml0IjoiaW5zaWRlIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0=',
    primaryColor: '#0066CC',
    secondaryColor: '#3B82F6'
  },
  {
    id: 'android-sdk',
    name: 'Android SDK',
    code: 'AS',
    logo: 'https://developer.android.com/static/images/brand/Android_Robot.png',
    primaryColor: '#3DDC84',
    secondaryColor: '#4ADE7B'
  },
  {
    id: 'adobe-magento',
    name: 'Adobe (Magento)',
    code: 'AD',
    logo: 'https://clientslx.b-cdn.net/Affirm/Adobe_Logo.jpeg',
    primaryColor: '#FF0000',
    secondaryColor: '#FF4444'
  },
  {
    id: 'apexx',
    name: 'APEXX',
    code: 'AX',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvNmZlYTBiZmUtYzA1NS00OWI3LThiNmItODQ0MDQ0MTc5OWJlLzlhMzA1MzVhLTE0MDQtNDBiNi1hZjE1LWRlYmFkOTNiNzJjMy5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0Ijo4MCwiZml0IjoiaW5zaWRlIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0=',
    primaryColor: '#1E40AF',
    secondaryColor: '#3B82F6'
  },
  {
    id: 'aspdotnetstorefront',
    name: 'aspdotnetstorefront',
    code: 'AS',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvM2JiZmU2YWUtYThiMy00YjVlLWE0YTctYzBlNGU4MTMyZDk0LzhjNWNiMTYxLTAyZTYtNGYyMC1iZWM1LWNiNTAwYTQyYjZkMi5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0Ijo4MCwiZml0IjoiaW5zaWRlIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0=',
    primaryColor: '#512BD4',
    secondaryColor: '#7C3AED'
  },
  {
    id: 'aspenware',
    name: 'Aspenware',
    code: 'AW',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvOTM0ZjllNzUtNjE2ZC00ZThhLTkxNjMtNjJhZDViOWY2NDczLzc4Zjk3OTg0LTBhNzQtNGNmNy05MWUwLTc4MGZkYjk3YjBhMi5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0Ijo4MCwiZml0IjoiaW5zaWRlIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0=',
    primaryColor: '#0EA5E9',
    secondaryColor: '#38BDF8'
  },
  {
    id: 'avb-alta',
    name: 'AVB (ALTA)',
    code: 'AV',
    logo: 'https://files.readme.io/3d5e866-AVB-Alta-180.png',
    primaryColor: '#059669',
    secondaryColor: '#10B981'
  },
  {
    id: 'bolt',
    name: 'Bolt',
    code: 'BT',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvNmQ5N2VmZjktM2YyOC00Zjk1LWFhMGYtZmE1OGM2MzNhMmY4L0JvbHRfTG9nb19SR0IyeC5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0Ijo4MCwiZml0IjoiaW5zaWRlIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0=',
    primaryColor: '#1E40AF',
    secondaryColor: '#3B82F6'
  },
  {
    id: 'buyist',
    name: 'Buyist (formerly Mojo)',
    code: 'BY',
    logo: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/5dac9f9-buyist_logo.png',
    primaryColor: '#7C3AED',
    secondaryColor: '#8B5CF6'
  },
  {
    id: 'celerant',
    name: 'Celerant',
    code: 'CL',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvZmYzOGZkODQtN2Q3MS00MDkxLTkzM2MtMzMyNzI2M2VjMjg1L2EzZWM2ZDJjLTUzZDctNGUyNS05ZGE5LTRjYmQ2YTc0NDdhYi5qcGVnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoyMDAsImhlaWdodCI6ODAsImZpdCI6Imluc2lkZSIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjB9fX19',
    primaryColor: '#DC2626',
    secondaryColor: '#EF4444'
  },
  {
    id: 'celery',
    name: 'Celery',
    code: 'CE',
    logo: '',
    primaryColor: '#4ADE80',
    secondaryColor: '#6EE7B7'
  },
  {
    id: 'checkoutchamp',
    name: 'CheckoutChamp',
    code: 'CC',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvYzQyZTlkNTEtZjYxZi00YmFiLWJjZjktNWUyM2IyNTQ5YmVlL2Y3YzRkNjM4LTkxMTctNGM1Mi05M2UzLTAyODgzOTcxOTM2OC5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0Ijo4MCwiZml0IjoiaW5zaWRlIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0=',
    primaryColor: '#F59E0B',
    secondaryColor: '#FBBF24'
  },
  {
    id: 'cirkuit',
    name: 'Cirkuit',
    code: 'CK',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvYTgzNDJlYzctZGJmNy00OGM3LThhOWMtN2Q1MTE3OTAxODRjLzFhNjc3MTA5LWRlMWEtNGYxNi1iYTUwLTA2ZTdkZmIwNzZiOC5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0Ijo4MCwiZml0IjoiaW5zaWRlIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0=',
    primaryColor: '#8B5CF6',
    secondaryColor: '#A78BFA'
  },
  {
    id: 'citcon',
    name: 'Citcon',
    code: 'CT',
    logo: 'https://cdn.prod.website-files.com/6828b564a444ee6676dd6111/6828b564a444ee6676dd611d_citcon-logo.svg',
    primaryColor: '#059669',
    secondaryColor: '#10B981'
  },
  {
    id: 'clyde',
    name: 'Clyde',
    code: 'CY',
    logo: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/669ca7c-Clyde-Logo-Black.svg',
    primaryColor: '#000000',
    secondaryColor: '#374151'
  },
  {
    id: 'cms-max',
    name: 'CMS Max',
    code: 'CM',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvMTVkOWMyYzYtNmMyMS00MzdhLWE4NmItYTNmNTEwOTJmZjdkLzFiNDY0M2E5LTMwMmMtNGQ0Mi05OGJjLTcyZDg5NDcyYmY5ZS5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0Ijo4MCwiZml0IjoiaW5zaWRlIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0=',
    primaryColor: '#DC2626',
    secondaryColor: '#EF4444'
  },
  {
    id: 'corecommerce',
    name: 'CoreCommerce',
    code: 'CR',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvNzYzY2RiNGEtODQ1NC00NWUyLWJhNmEtOGU2N2I5MTZjZDBmL2Y0Y2FiNmZmLTUxYTktNGQ1Ni1hYzNhLWIzNWMzZDFjMmVkZi5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0Ijo4MCwiZml0IjoiaW5zaWRlIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0=',
    primaryColor: '#0EA5E9',
    secondaryColor: '#38BDF8'
  },
  {
    id: 'coresense',
    name: 'CORESense',
    code: 'CS',
    logo: 'https://help.coresense.com/7.4/assets/images/coresense-logo.png',
    primaryColor: '#1E40AF',
    secondaryColor: '#3B82F6'
  },
  {
    id: 'cybersource',
    name: 'CyberSource',
    code: 'CB',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvOTBiZjJhZGQtMWJmOS00NDU2LWIzMGYtYzdmYjUyYTE0NWQxL1NjcmVlbl9TaG90XzIwMjAtMDgtMDZfYXRfNS4wMi4wOF9QTS1yZW1vdmViZy1wcmV2aWV3LnBuZyIsImVkaXRzIjp7InRvRm9ybWF0Ijoid2VicCIsInJlc2l6ZSI6eyJ3aWR0aCI6MjAwLCJoZWlnaHQiOjgwLCJmaXQiOiJpbnNpZGUiLCJiYWNrZ3JvdW5kIjp7InIiOjI1NSwiZyI6MjU1LCJiIjoyNTUsImFscGhhIjowfX19fQ==',
    primaryColor: '#0066CC',
    secondaryColor: '#3B82F6'
  },
  {
    id: 'dakis',
    name: 'Dakis',
    code: 'DK',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvZDQwNDQ4YmYtMGI1YS00NjEzLWFmNWQtZThiYzgwYTZhZDgxL2U0NzAxYWNiLTY3MzktNGQ4OS04OGQzLWNjZTVhMDg1MGE0NC5qcGVnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoyMDAsImhlaWdodCI6ODAsImZpdCI6Imluc2lkZSIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjB9fX19',
    primaryColor: '#DC2626',
    secondaryColor: '#EF4444'
  },
  {
    id: 'deck-commerce',
    name: 'Deck Commerce',
    code: 'DC',
    logo: 'https://www.deckcommerce.com/hubfs/dc-logo-cropped.svg',
    primaryColor: '#1E40AF',
    secondaryColor: '#3B82F6'
  },
  {
    id: 'drupal-commerce',
    name: 'Drupal Commerce',
    code: 'DR',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvMzJjYWQ1OGQtOGU4Ni00MWFhLTg1OGYtNTIxMTg5NzJlYzI5LzI5YWQ4YjZkLWI2YTctNDdhNy1hMGVjLTQ4NjVhM2Y2MGY0ZS5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0Ijo4MCwiZml0IjoiaW5zaWRlIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0=',
    primaryColor: '#0678BE',
    secondaryColor: '#2563EB'
  },
  {
    id: 'edge-oms',
    name: 'EDGE OMS (Jagged Peak)',
    code: 'EO',
    logo: '',
    primaryColor: '#6366F1',
    secondaryColor: '#8B5CF6'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    code: 'FB',
    logo: 'https://img.freepik.com/premium-psd/facebook-logo-blue-circle_705838-12823.jpg?semt=ais_incoming&w=740&q=80',
    primaryColor: '#1877F2',
    secondaryColor: '#42A5F5'
  },
  {
    id: 'global-payments',
    name: 'Global Payments',
    code: 'GP',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvODlkMjY3N2QtMjliNy00ZDMzLWEyOTAtMjkxZTRlYTBiMzVmLzhlMTVhMzIwLTQ0NGYtNDc0YS05MTBlLTgwYzYxNDQ0MTQzNC5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsiZml0IjoiY29udGFpbiIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjB9fX19',
    primaryColor: '#00A651',
    secondaryColor: '#16A34A'
  },
  {
    id: 'inntopia',
    name: 'Inntopia',
    code: 'IN',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvNGY0OWNjZjctMDQwZi00MzRmLTg5ZTAtMTc5MzdmZDc3MWFjLzA3OTE4ODZjLTRhMzItNGQyYS05NTVlLWQ1YjRlNzRlYjQ5NS5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsiZml0IjoiY29udGFpbiIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjB9fX19',
    primaryColor: '#0EA5E9',
    secondaryColor: '#38BDF8'
  },
  {
    id: 'ios-sdk',
    name: 'iOS SDK',
    code: 'IO',
    logo: '',
    primaryColor: '#007AFF',
    secondaryColor: '#3B82F6'
  },
  {
    id: 'jpmc-chase',
    name: 'JPMC (Chase)',
    code: 'JC',
    logo: 'https://www.jpmorgan.com/content/dam/jpmorgan/images/logos/jpm-logo-brown-062322.svg',
    primaryColor: '#0066CC',
    secondaryColor: '#3B82F6'
  },
  {
    id: 'katapult',
    name: 'Katapult (Connect)',
    code: 'KT',
    logo: 'https://go.katapult.com/hs-fs/hubfs/Katapult-Logo-Pink-R-RGB%20(4)-1.png?width=4009&height=1555&name=Katapult-Logo-Pink-R-RGB%20(4)-1.png',
    primaryColor: '#EC4899',
    secondaryColor: '#F472B6'
  },
  {
    id: 'kibo',
    name: 'Kibo',
    code: 'KB',
    logo: 'https://clientslx.b-cdn.net/Affirm/kibo.jpg',
    primaryColor: '#059669',
    secondaryColor: '#10B981'
  },
  {
    id: 'kibo-marketlive',
    name: 'Kibo (Marketlive)',
    code: 'KM',
    logo: 'https://cdn-ildfeld.nitrocdn.com/RwefnSKJFssCNEjHNVwOLnkLzwhecTor/assets/images/source/rev-7faf220/kibocommerce.com/wp-content/uploads/2021/05/logo-kibo-ForDarkBG.svg',
    primaryColor: '#059669',
    secondaryColor: '#10B981'
  },
  {
    id: 'konnektive',
    name: 'Konnektive',
    code: 'KN',
    logo: 'https://via.placeholder.com/200x80/F59E0B/FFFFFF?text=Konnektive',
    primaryColor: '#F59E0B',
    secondaryColor: '#FBBF24'
  },
  {
    id: 'kwi',
    name: 'KWI',
    code: 'KW',
    logo: 'https://clientslx.b-cdn.net/Affirm/kwi.png',
    primaryColor: '#1E40AF',
    secondaryColor: '#3B82F6'
  },
  {
    id: 'lightspeed-ecomm',
    name: 'Lightspeed Ecomm',
    code: 'LS',
    logo: 'https://clientslx.b-cdn.net/Affirm/lightspeed.jpg',
    primaryColor: '#00D4AA',
    secondaryColor: '#34D399'
  },
  {
    id: 'magento',
    name: 'Magento',
    code: 'MG',
    logo: 'https://commercemarketplace.adobe.com/static/version1758105382/frontend/Aheadworks/marketplace/en_US/images/logo-header-adobe.svg',
    primaryColor: '#FF6600',
    secondaryColor: '#FF8C42'
  },
  {
    id: 'magento-2',
    name: 'Magento 2',
    code: 'M2',
    logo: '',
    primaryColor: '#FF6600',
    secondaryColor: '#FF8C42'
  },
  {
    id: 'microsoft-edge',
    name: 'Microsoft (Edge Browser)',
    code: 'ME',
    logo: 'https://edgestatic.azureedge.net/shared/cms/lrs1c69a1j/logos/9bf02dd94ea34924aa15548eef82ed24-png-w231.avif',
    primaryColor: '#0078D4',
    secondaryColor: '#2563EB'
  },
  {
    id: 'miva',
    name: 'Miva',
    code: 'MV',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvNDhlOGFjODYtNmNmMC00YTRjLTlhMjMtOWI0NTkzNjgxZWQwL21pdmEtbG9nby5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0Ijo4MCwiZml0IjoiaW5zaWRlIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0=',
    primaryColor: '#0066CC',
    secondaryColor: '#3B82F6'
  },
  {
    id: 'miva-phosphor',
    name: 'Miva (Phosphor Media)',
    code: 'MP',
    logo: 'https://via.placeholder.com/200x80/0066CC/FFFFFF?text=Miva+Phosphor',
    primaryColor: '#0066CC',
    secondaryColor: '#3B82F6'
  },
  {
    id: 'mykaarma',
    name: 'MyKaarma',
    code: 'MK',
    logo: 'https://mykaarma.com/wp-content/themes/mykaarma/img/mykaarma-logo-color-light.svg',
    primaryColor: '#0066CC',
    secondaryColor: '#3B82F6'
  },
  {
    id: 'nebhub',
    name: 'Nebhub',
    code: 'NH',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvNWJkODBkMDYtOWJiMi00MTJmLWI1ZTctOWRhYWFjYTkyMjJjLzNmNjBlMzNlLWNkNzUtNDA5Zi1iNzRhLTYxZTExMzg4MDEzMS5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0Ijo4MCwiZml0IjoiaW5zaWRlIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0=',
    primaryColor: '#7C3AED',
    secondaryColor: '#8B5CF6'
  },
  {
    id: 'netsuite',
    name: 'Netsuite SuiteCommerce Advanced + Solupayl',
    code: 'NS',
    logo: 'https://clientslx.b-cdn.net/Affirm/Netsuite.jpg',
    primaryColor: '#FF6600',
    secondaryColor: '#FF8C42'
  },
  {
    id: 'nitrosell',
    name: 'Nitrosell',
    code: 'NT',
    logo: '',
    primaryColor: '#059669',
    secondaryColor: '#10B981'
  },
  {
    id: 'nopcommerce',
    name: 'nopCommerce',
    code: 'NC',
    logo: 'https://www.nopcommerce.com/Themes/OfficialSite/Content/images/logo.svg',
    primaryColor: '#1E40AF',
    secondaryColor: '#3B82F6'
  },
  {
    id: 'opencart',
    name: 'OpenCart',
    code: 'OC',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvOTc4NWI4ZDYtZjA4Yi00ZDJkLTkwMTMtODI1OWM2YTdmNDcxLzk4YTQ5N2M0LTYwOTgtNDhiYy05NDcyLWMyNTA1OTdhN2QzNi5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0Ijo4MCwiZml0IjoiaW5zaWRlIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0=',
    primaryColor: '#1998D6',
    secondaryColor: '#3B82F6'
  },
  {
    id: 'oracle-atg',
    name: 'Oracle ATG',
    code: 'OA',
    logo: 'https://docs.oracle.com/cd/E24152_01/Platform.10-1/ATGMultiApp/html/common/images/logo.png',
    primaryColor: '#F80000',
    secondaryColor: '#EF4444'
  },
  {
    id: 'optty-unmanaged',
    name: 'Optty',
    code: 'OU',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvMWJkYTNkMWEtMWJlYS00YjM1LWFmNzEtMzQzYzg2ZTgxOTc0LzBkMWJlN2Q1LTIyMjAtNDI5My1hMWQ2LTg4NmM4ZDMxN2U2Yy5qcGVnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoyMDAsImhlaWdodCI6ODAsImZpdCI6Imluc2lkZSIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjB9fX19',
    primaryColor: '#0066FF',
    secondaryColor: '#3B82F6'
  },
  {
    id: 'ppro',
    name: 'PPRO',
    code: 'PP',
    logo: 'https://www.ppro.com/wp-content/uploads/2021/09/ppro_logo_black.png',
    primaryColor: '#000000',
    secondaryColor: '#374151'
  },
  {
    id: 'primer',
    name: 'Primer',
    code: 'PR',
    logo: '',
    primaryColor: '#6366F1',
    secondaryColor: '#8B5CF6'
  },
  {
    id: 'punchmark',
    name: 'Punchmark',
    code: 'PM',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvMGQ2MTk1NzAtNzcxOC00YjBmLWFlMGItMWFiOGY0NzcyYTMxL2EyYjU3NDY4LTE4MjUtNDgzMi05NTkwLTZjNWE2ZDA1NDM0OS5qcGVnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoyMDAsImhlaWdodCI6ODAsImZpdCI6Imluc2lkZSIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjB9fX19',
    primaryColor: '#DC2626',
    secondaryColor: '#EF4444'
  },
  {
    id: 'quik',
    name: 'Quik',
    code: 'QK',
    logo: '',
    primaryColor: '#F59E0B',
    secondaryColor: '#FBBF24'
  },
  {
    id: 'rencom',
    name: 'RenCom (Renaissance Communications Group)',
    code: 'RC',
    logo: 'https://clientslx.b-cdn.net/Affirm/RenaissanceCommunications.jpg',
    primaryColor: '#1E40AF',
    secondaryColor: '#3B82F6'
  },
  {
    id: 'rezmagic',
    name: 'RezMagic',
    code: 'RM',
    logo: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/7f0631d-rezmagic-logo.png',
    primaryColor: '#059669',
    secondaryColor: '#10B981'
  },
  {
    id: 'salesforce-commerce',
    name: 'Salesforce Commerce Cloud (Demandware)',
    code: 'SF',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvMjA1YWY1NmQtMjQxNi00MjRjLWEyYTgtZWZmNzQ3NDg5NGEwLzIwMTZzZl9Db21tZXJjZUNsb3VkX2xvZ29fUkdCLnBuZyIsImVkaXRzIjp7InRvRm9ybWF0Ijoid2VicCIsInJlc2l6ZSI6eyJ3aWR0aCI6MjAwLCJoZWlnaHQiOjgwLCJmaXQiOiJpbnNpZGUiLCJiYWNrZ3JvdW5kIjp7InIiOjI1NSwiZyI6MjU1LCJiIjoyNTUsImFscGhhIjowfX19fQ==',
    primaryColor: '#00A1E0',
    secondaryColor: '#0EA5E9'
  },
  {
    id: 'sap-commerce',
    name: 'SAP Commerce (previously Hybris)',
    code: 'SA',
    logo: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/c6eb457-sap-3.svg',
    primaryColor: '#0FAAFF',
    secondaryColor: '#3B82F6'
  },
  {
    id: 'selfbook',
    name: 'Selfbook',
    code: 'SB',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvZGU3MTQ0MWQtYzZiZS00YmM0LTkyZjctOTg2YzIyMDFhZGVmLzE4MjYyMDk4LTMxMTMtNGNkMy1hNzNhLTc3NGM5ZmYyNDY3YS5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsiZml0IjoiY29udGFpbiIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjB9fX19',
    primaryColor: '#7C3AED',
    secondaryColor: '#8B5CF6'
  },
  {
    id: 'sensepass',
    name: 'SensePass',
    code: 'SP',
    logo: 'https://sensepass.com/wp-content/uploads/2021/12/sensepass-logo.svg',
    primaryColor: '#059669',
    secondaryColor: '#10B981'
  },
  {
    id: 'shift4shop',
    name: 'Shift4Shop (formerly 3Dcart)',
    code: 'S4',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvYjVmNmVlZGQtNzg3YS00NjJjLTljNDMtZWU4YTQwZWU4YTQ0LzAyMGQ3NmM0LTg1OTItNDgwMi04ODY2LTIxYjRkZGM0ZmVlMy5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0Ijo4MCwiZml0IjoiaW5zaWRlIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0=',
    primaryColor: '#0066CC',
    secondaryColor: '#3B82F6'
  },
  {
    id: 'shopgate',
    name: 'Shopgate',
    code: 'SG',
    logo: 'https://clientslx.b-cdn.net/Affirm/shopgate.jpg',
    primaryColor: '#FF6600',
    secondaryColor: '#FF8C42'
  },
  {
    id: 'shopify-unmanaged',
    name: 'Shopify',
    code: 'SH',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvNGVlNWJmOWUtZjFmZS00YTE5LThjYjMtYTczMjI0NjU0ZmU3L3Nob3BpZnlfbG9nb19ibGFjay5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0Ijo4MCwiZml0IjoiaW5zaWRlIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0=',
    primaryColor: '#96BF48',
    secondaryColor: '#84CC16'
  },
  {
    id: 'shopping-cart-elite',
    name: 'Shopping Cart Elite',
    code: 'SC',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvYzQ3ODlmN2YtZWUwMi00ZDJlLWIxOTgtNjA4Y2Q2MTI3MjJiL2NmOTQ1YWViLTNiMzQtNDIxZS1hNWFiLTc5NzBhYjMwYjhhZi5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0Ijo4MCwiZml0IjoiaW5zaWRlIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0=',
    primaryColor: '#DC2626',
    secondaryColor: '#EF4444'
  },
  {
    id: 'shuttle',
    name: 'Shuttle',
    code: 'SL',
    logo: '',
    primaryColor: '#8B5CF6',
    secondaryColor: '#A78BFA'
  },
  {
    id: 'snap-finance',
    name: 'Snap Finance (Connect)',
    code: 'SN',
    logo: 'https://ui-cms-s3.snapfinance.com/OneSnap/icons/svg/logo.svg',
    primaryColor: '#0066CC',
    secondaryColor: '#3B82F6'
  },
  {
    id: 'solidus',
    name: 'Solidus',
    code: 'SO',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvNTBhNjZkZTctMTQ0Zi00MDBmLWIzYWItNjZmMjY0ODA5OGYxL2U4MDJlODIyLTc3ZTEtNGEzMS05NTUyLTQxNThiZjM5NjNiOC5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0Ijo4MCwiZml0IjoiaW5zaWRlIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0=',
    primaryColor: '#DC2626',
    secondaryColor: '#EF4444'
  },
  {
    id: 'spree',
    name: 'Spree',
    code: 'SR',
    logo: 'https://spreecommerce.org/wp-content/themes/spree/images/logo.svg',
    primaryColor: '#1E40AF',
    secondaryColor: '#3B82F6'
  },
  {
    id: 'stripe-unmanaged',
    name: 'Stripe',
    code: 'ST',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvNDU0YTY2NjctMDJkMi00YTZiLTlhMDQtOTc1MDJkZDIzZTJlL0dyb3VwLnBuZyIsImVkaXRzIjp7InRvRm9ybWF0Ijoid2VicCIsInJlc2l6ZSI6eyJ3aWR0aCI6MjAwLCJoZWlnaHQiOjgwLCJmaXQiOiJpbnNpZGUiLCJiYWNrZ3JvdW5kIjp7InIiOjI1NSwiZyI6MjU1LCJiIjoyNTUsImFscGhhIjowfX19fQ==',
    primaryColor: '#635BFF',
    secondaryColor: '#8B5CF6'
  },
  {
    id: 'studioplus',
    name: 'StudioPlus',
    code: 'SP',
    logo: 'https://clientslx.b-cdn.net/Affirm/studioplus.png',
    primaryColor: '#1E40AF',
    secondaryColor: '#3B82F6'
  },
  {
    id: 'sunshop',
    name: 'SunShop',
    code: 'SS',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvMjBiMmU4OWMtNTc5Mi00MTQyLTk3MmQtYTk3MDFhN2E0ODdiL2Q2ZjQ5ZDc3LTViYWUtNDU5ZS1hYjgyLWI3MTg0ZDYzNzc4Ni5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0Ijo4MCwiZml0IjoiaW5zaWRlIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0=',
    primaryColor: '#F59E0B',
    secondaryColor: '#FBBF24'
  },
  {
    id: 'thinkspace',
    name: 'Thinkspace',
    code: 'TS',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvZjRmZWM5M2UtYzVjOC00M2RkLWFhNWEtYTQ0MWFkNGNjNTM2Lzc2MWJhM2MzLWQ2NmQtNDIyNy05MmZkLTgwMmJmYTFlZjljNy5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0Ijo4MCwiZml0IjoiaW5zaWRlIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0=',
    primaryColor: '#7C3AED',
    secondaryColor: '#8B5CF6'
  },
  {
    id: 'ucraft',
    name: 'Ucraft',
    code: 'UC',
    logo: '',
    primaryColor: '#F59E0B',
    secondaryColor: '#FBBF24'
  },
  {
    id: 'ultracart',
    name: 'UltraCart',
    code: 'UL',
    logo: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/1ec5ba2-ultracart-icon-fill-blue.png',
    primaryColor: '#0066CC',
    secondaryColor: '#3B82F6'
  },
  {
    id: 'verifone-instore',
    name: 'Verifone In-Store',
    code: 'VI',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvYTQzYjk5NGMtZTA3Ni00YmRiLWIwYjctMGY4ZjMxMmE3ZWFhLzg5Zjk0YzU5LWZkYTYtNGJkOC04MzJiLWMwN2JlMzVhMTBkNS5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0Ijo4MCwiZml0IjoiaW5zaWRlIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0=',
    primaryColor: '#E31837',
    secondaryColor: '#EF4444'
  },
  {
    id: 'volusion-mak',
    name: 'Volusion MAK Digital Design integration',
    code: 'VM',
    logo: 'https://makdigitaldesign.com/site-images/mak-guy/logo_sci.svg',
    primaryColor: '#0066CC',
    secondaryColor: '#3B82F6'
  },
  {
    id: 'vtex',
    name: 'VTEX',
    code: 'VT',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvNGRkM2U2ZWEtODY0NS00YWIxLTk5ZWUtNDNhNzIwYjMzYmE3L0dyb3VwLnBuZyIsImVkaXRzIjp7InRvRm9ybWF0Ijoid2VicCIsInJlc2l6ZSI6eyJ3aWR0aCI6MjAwLCJoZWlnaHQiOjgwLCJmaXQiOiJpbnNpZGUiLCJiYWNrZ3JvdW5kIjp7InIiOjI1NSwiZyI6MjU1LCJiIjoyNTUsImFscGhhIjowfX19fQ==',
    primaryColor: '#F71963',
    secondaryColor: '#EC4899'
  },
  {
    id: 'web-shop-manager',
    name: 'Web Shop Manager',
    code: 'WS',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvYThhMjg5YWMtNTc3Yi00NzMzLTg3YWEtM2Q0YWVjZTJkZmEwLzE5OTEzMzcwLWMwN2YtNDAzNS04M2YyLTVjNDE2YWQ0Njc5OC5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0Ijo4MCwiZml0IjoiaW5zaWRlIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0=',
    primaryColor: '#1E40AF',
    secondaryColor: '#3B82F6'
  },
  {
    id: 'wix',
    name: 'Wix',
    code: 'WX',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvNTE1ODIxNTUtNzU2Ni00YWI0LWJjNTctOTAyOTJkZjE3MDJjLzRlYTgwZDY0LWEyZTgtNDllZC1hZDRhLTU1OTlhOTFiYzM2Yi5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0Ijo4MCwiZml0IjoiaW5zaWRlIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0=',
    primaryColor: '#0C6EFC',
    secondaryColor: '#3B82F6'
  },
  {
    id: 'woocommerce-unmanaged',
    name: 'WooCommerce',
    code: 'WU',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvMTkwNDE4YjktZTZmZi00OTY0LThkNTMtNTc1NWUxNzY0NjQ4LzE1MzdlY2FhLTM3OGMtNDUyZC05NDkzLWYyMGMzYTM1NTU4Zi5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0Ijo4MCwiZml0IjoiaW5zaWRlIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0=',
    primaryColor: '#96588A',
    secondaryColor: '#8B5CF6'
  },
  {
    id: 'workarea',
    name: 'Workarea',
    code: 'WA',
    logo: 'https://clientslx.b-cdn.net/SalesLabX/AFF_PHP/ba5786b-workarea.png',
    primaryColor: '#DC2626',
    secondaryColor: '#EF4444'
  },
  {
    id: 'worldpay-unmanaged',
    name: 'Worldpay',
    code: 'WO',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvMmU2M2NkZmQtZmNlOS00ZmU0LWFlYjItZTIzZGVhYTA5ZDJhLzFhNWM0ZTM5LTRkZDYtNDRlOC1iMzI1LWQxMjk1N2FjNTQ0Yy5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0Ijo4MCwiZml0IjoiaW5zaWRlIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0=',
    primaryColor: '#FF6B35',
    secondaryColor: '#FF8C42'
  },
  {
    id: 'xcart',
    name: 'X-Cart',
    code: 'XC',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvOTc2MDMzYzUtMjIzMi00NjNkLWExMWItYzJjZjRmMmQ3OTllLzU3NTAyNDUwLThiZDYtNGYyOC05MzZkLTFjYzE1OGViNzFhMC5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsiZml0IjoiY29udGFpbiIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjB9fX19',
    primaryColor: '#FF6600',
    secondaryColor: '#FF8C42'
  },
  {
    id: 'zoey',
    name: 'Zoey',
    code: 'ZO',
    logo: 'https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvNDdhMDM0MmYtZDRkYi00ODRmLTlkZTktZmRhY2JjYTdhNThhLzA3NjA1YTU2LWI1ZGEtNDU3OS1iYzU5LWE3ZTY0M2VjNWQ2ZC5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsiZml0IjoiY29udGFpbiIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjB9fX19',
    primaryColor: '#7C3AED',
    secondaryColor: '#8B5CF6'
  },
  {
    id: 'rally',
    name: 'Rally',
    code: 'RA',
    logo: 'https://clientslx.b-cdn.net/rally.jpg',
    primaryColor: '#DC2626',
    secondaryColor: '#EF4444'
  },
  {
    id: 'quotemachine',
    name: 'QuoteMachine',
    code: 'QM',
    logo: 'https://www.quotemachine.com/wp-content/uploads/2020/05/31664_QuoteMachineByLightspeed_Logos_Colour_Vertical_EN.png',
    primaryColor: '#00D4AA',
    secondaryColor: '#34D399'
  }
];

export const PartnerSelector: React.FC<PartnerSelectorProps> = ({
  partners,
  selectedPartner,
  onPartnerSelect
}) => {
  const [showUnmanaged, setShowUnmanaged] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-6">
          <img
            src="https://slxcloud.app/wp-content/uploads/2025/03/3@4x-2048x1092.png"
            alt="SalesLabX"
            className="h-12 w-auto object-contain"
          />
        </div>
        <h1 className="text-4xl font-axiforma text-brand-dark mb-4">
          Welcome to Partner Hub
        </h1>
        <p className="text-xl font-calibre text-brand-gray max-w-2xl mx-auto">
          Select your platform to access co-branded Affirm assets
        </p>
      </div>

      {/* Managed Partners */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {partners.map((partner) => (
          <div
            key={partner.id}
            onClick={() => onPartnerSelect(partner)}
            className={`relative bg-white rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
              selectedPartner?.id === partner.id
                ? 'ring-2 ring-brand-primary shadow-brand-primary/20'
                : 'hover:shadow-brand-primary/10'
            }`}
          >
            {selectedPartner?.id === partner.id && (
              <div className="absolute -top-2 -right-2 bg-brand-primary rounded-full p-2 shadow-lg">
                <CheckCircle className="w-4 h-4 text-brand-white" />
              </div>
            )}
            
            <div className="p-8 text-center">
              {partner.logo && partner.logo.trim() !== '' ? (
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-16 h-8 mx-auto mb-3 object-contain"
                />
              ) : (
                <div 
                  className="w-16 h-8 mx-auto mb-3 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: partner.primaryColor }}
                >
                  {partner.code}
                </div>
              )}
              <h3 className="text-lg font-axiforma text-brand-dark">
                {partner.name}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Unmanaged Partners Section */}
      <div className="border-t border-gray-200 pt-8">
        <button
          onClick={() => setShowUnmanaged(!showUnmanaged)}
          className="flex items-center gap-3 w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors mb-6"
        >
          {showUnmanaged ? (
            <ChevronDown className="w-5 h-5 text-brand-primary" />
          ) : (
            <ChevronRight className="w-5 h-5 text-brand-primary" />
          )}
          <div>
            <h2 className="text-xl font-axiforma text-brand-dark">
              Unmanaged Partners
            </h2>
            <p className="text-sm font-calibre text-brand-gray">
              {unmanagedPartners.length} additional platform integrations
            </p>
          </div>
        </button>

        {showUnmanaged && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {unmanagedPartners.map((partner) => (
              <div
                key={partner.id}
                onClick={() => onPartnerSelect(partner)}
                className={`relative bg-white rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                  selectedPartner?.id === partner.id
                    ? 'ring-2 ring-brand-primary shadow-brand-primary/20'
                    : 'hover:shadow-brand-primary/10'
                }`}
              >
                {selectedPartner?.id === partner.id && (
                  <div className="absolute -top-2 -right-2 bg-brand-primary rounded-full p-1 shadow-lg">
                    <CheckCircle className="w-3 h-3 text-brand-white" />
                  </div>
                )}
                
                <div className="p-4 text-center">
                  {partner.logo && partner.logo.trim() !== '' ? (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-16 h-8 mx-auto mb-3 object-contain"
                    />
                  ) : (
                    <div className="h-8 mx-auto mb-3"></div>
                  )}
                  <h3 className="text-sm font-axiforma text-brand-dark">
                    {partner.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};