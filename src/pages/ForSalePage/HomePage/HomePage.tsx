// frontend/src/pages/HomePage/HomePage.tsx
import React from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import PropertyGrid from '../../components/PropertyGrid/PropertyGrid';
import AboutUsSection from '../../components/AboutUsSection/AboutUsSection';
import ContactSection from '../../components/ContactSection/ContactSection';
import { useTranslation } from 'react-i18next';

// Ana sayfada öne çıkarılacak 3 ilan
const homepageProperties = [
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
    status: 'available' // Mock için satıldı durumu
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
];

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <HeroSection />
      {/* Öne çıkan ilanlar bölümü */}
      <PropertyGrid
        properties={homepageProperties} // Sadece öne çıkan 3 ilanı gönderiyoruz
        showTitle={true}
        layoutType="multi-column" // Ana sayfada çoklu sütun düzeni kullanıyoruz
        animationType="vertical"
      />
      <AboutUsSection />
      <ContactSection />
    </>
  );
};

export default HomePage;
