// frontend/src/components/PropertyGrid/PropertyGrid.tsx
import React from 'react';
import { motion } from 'framer-motion';
import PropertyCard from '../PropertyCard/PropertyCard';
import styles from './PropertyGrid.module.css';
import { useTranslation } from 'react-i18next';

// Sahte ilan verileri (Backend entegre edildiğinde burası API'den gelecek)
// Fiyatlar artık her para birimi için ayrı ayrı tutuluyor
const mockProperties = [
  {
    id: '1',
    nameKey: 'luxury_apartment_alanya',
    priceTRY: 11375000, // Örnek TL fiyat
    priceUSD: 350000,   // Örnek USD fiyat
    priceEUR: 322000,   // Örnek EUR fiyat
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
    status: 'available'
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
];

interface PropertyGridProps {
  layoutType?: 'single-column' | 'multi-column'; // Grid düzeni
  animationType?: 'vertical' | 'horizontal'; // Animasyon yönü
  showTitle?: boolean; // Başlığı gösterip göstermeme
  properties?: typeof mockProperties; // Dışarıdan ilan verisi alabilmesi için
}

const PropertyGrid: React.FC<PropertyGridProps> = ({
  layoutType = 'single-column', // Varsayılan tek sütun
  animationType = 'vertical',   // Varsayılan dikey animasyon
  showTitle = true,             // Varsayılan başlığı göster
  properties = mockProperties   // Varsayılan mockProperties kullan
}) => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section id="featured-properties" className={`${styles.propertyGridSection} ${layoutType === 'multi-column' ? styles.multiColumnLayout : ''}`}>
      <div className={styles.container}>
        {showTitle && <h2 className={styles.sectionTitle}>{t('featured_properties')}</h2>}
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {properties.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} animationType={animationType} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PropertyGrid;
