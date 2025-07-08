// frontend/src/pages/ForSalePage/ForSalePage.tsx
import React, { useEffect } from 'react';
import PropertyGrid from '../../components/PropertyGrid/PropertyGrid';
import { useTranslation } from 'react-i18next';
import styles from './ForSalePage.module.css';

// Tüm ilanlar için mock data
const allProperties = [
  {
    id: '1',
    nameKey: 'luxury_apartment_alanya',
    priceTRY: 11375000,
    priceUSD: 350000,
    priceEUR: 322000,
    imageUrl: 'https://picsum.photos/id/10/600/400',
    location: 'Alanya, Antalya',
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    type: 'apartment',
    status: 'available'
  },
  {
    id: '2',
    nameKey: 'spacious_land_city_center',
    priceTRY: 3900000,
    priceUSD: 120000,
    priceEUR: 110400,
    imageUrl: 'https://picsum.photos/id/1040/600/400',
    location: 'Konaklı, Antalya',
    area: 800,
    type: 'land',
    blockNumber: '123', // Ada No eklendi
    parcelNumber: '456', // Parsel No eklendi
    status: 'sold'
  },
  {
    id: '3',
    nameKey: 'modern_villa_demirtas',
    priceTRY: 24375000,
    priceUSD: 750000,
    priceEUR: 690000,
    imageUrl: 'https://picsum.photos/id/106/600/400',
    location: 'Demirtaş, Antalya',
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    type: 'apartment',
    status: 'available'
  },
  {
    id: '4',
    nameKey: 'lakeside_investment_land',
    priceTRY: 3087500,
    priceUSD: 95000,
    priceEUR: 87400,
    imageUrl: 'https://picsum.photos/id/1018/600/400',
    location: 'Gazipaşa, Antalya',
    area: 1200,
    type: 'land',
    blockNumber: '789', // Ada No eklendi
    parcelNumber: '012', // Parsel No eklendi
    status: 'available'
  },
  {
    id: '5',
    nameKey: 'new_studio_apartment',
    priceTRY: 3575000,
    priceUSD: 110000,
    priceEUR: 101200,
    imageUrl: 'https://picsum.photos/id/1084/600/400',
    location: 'Mahmutlar, Antalya',
    bedrooms: 1,
    bathrooms: 1,
    area: 60,
    type: 'apartment',
    status: 'sold'
  },
  {
    id: '6',
    nameKey: 'detached_house_land',
    priceTRY: 5850000,
    priceUSD: 180000,
    priceEUR: 165600,
    imageUrl: 'https://picsum.photos/id/1070/600/400',
    location: 'Kargıcak, Antalya',
    area: 500,
    type: 'land',
    blockNumber: '321', // Ada No eklendi
    parcelNumber: '654', // Parsel No eklendi
    status: 'available'
  },
  // Ek ilanlar
  {
    id: '7',
    nameKey: 'luxury_apartment_alanya',
    priceTRY: 15000000,
    priceUSD: 450000,
    priceEUR: 414000,
    imageUrl: 'https://picsum.photos/id/14/600/400',
    location: 'Oba, Antalya',
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    type: 'apartment',
    status: 'available'
  },
  {
    id: '8',
    nameKey: 'spacious_land_city_center',
    priceTRY: 6000000,
    priceUSD: 185000,
    priceEUR: 170200,
    imageUrl: 'https://picsum.photos/id/1043/600/400',
    location: 'Alanya Merkez, Antalya',
    area: 1500,
    type: 'land',
    blockNumber: '987', // Ada No eklendi
    parcelNumber: '654', // Parsel No eklendi
    status: 'available'
  },
  {
    id: '9',
    nameKey: 'modern_villa_demirtas',
    priceTRY: 30000000,
    priceUSD: 900000,
    priceEUR: 828000,
    imageUrl: 'https://picsum.photos/id/105/600/400',
    location: 'Kestel, Antalya',
    bedrooms: 5,
    bathrooms: 4,
    area: 300,
    type: 'apartment',
    status: 'available'
  },
  {
    id: '10',
    nameKey: 'lakeside_investment_land',
    priceTRY: 4500000,
    priceUSD: 140000,
    priceEUR: 128800,
    imageUrl: 'https://picsum.photos/id/1021/600/400',
    location: 'Demirtaş, Antalya',
    area: 1000,
    type: 'land',
    blockNumber: '111', // Ada No eklendi
    parcelNumber: '222', // Parsel No eklendi
    status: 'sold'
  },
];

const ForSalePage: React.FC = () => {
  const { t } = useTranslation();

  const apartments = allProperties.filter(p => p.type === 'apartment');
  const lands = allProperties.filter(p => p.type === 'land');

  useEffect(() => {
    console.log("Apartments array:", apartments);
    console.log("Lands array:", lands);
  }, [apartments, lands]);

  return (
    <div className={styles.forSalePage}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{t('for_sale_apartments_lands')}</h1>
        <div className={styles.breadcrumbs}>
          <a href="/" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/'); window.dispatchEvent(new PopStateEvent('popstate')); }}>{t('home')}</a> / <span>{t('for_sale')}</span>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.categoryColumn}>
          <div className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>{t('apartments_title')}</h2>
            <PropertyGrid properties={apartments} showTitle={false} animationType="vertical" layoutType="single-column" />
          </div>
        </div>

        <div className={styles.categoryColumn}>
          <div className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>{t('lands_title')}</h2>
            <PropertyGrid properties={lands} showTitle={false} animationType="vertical" layoutType="single-column" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForSalePage;
