// frontend/src/pages/PropertyDetailPage/PropertyDetailPage.tsx
import React, { useEffect, useState } from 'react';
import styles from './PropertyDetailPage.module.css';
import { useTranslation } from 'react-i18next';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Ok ikonları eklendi
import { useCurrency } from '../../context/CurrencyContext';

// Geçici olarak mock ilan verilerini PropertyGrid'den alıyoruz
// Gerçek uygulamada bu veriler backend'den, ilan ID'sine göre çekilecektir.
const mockProperties = [
  {
    id: '1',
    nameKey: 'luxury_apartment_alanya',
    descriptionKey: 'luxury_apartment_alanya_description', // Yeni: Açıklama için çeviri anahtarı
    priceTRY: 11375000,
    priceUSD: 350000,
    priceEUR: 322000,
    imageUrl: 'https://picsum.photos/id/10/1200/800', // Daha büyük görsel
    galleryImages: [ // Galeri için ek görseller
      'https://picsum.photos/id/10/1200/800', // Ana görseli de galeriye ekledik
      'https://picsum.photos/id/11/1200/800',
      'https://picsum.photos/id/12/1200/800',
      'https://picsum.photos/id/13/1200/800',
      'https://picsum.photos/id/14/1200/800',
    ],
    location: 'Alanya, Antalya',
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    type: 'apartment'
  },
  {
    id: '2',
    nameKey: 'spacious_land_city_center',
    descriptionKey: 'spacious_land_city_center_description',
    priceTRY: 3900000,
    priceUSD: 120000,
    priceEUR: 110400,
    imageUrl: 'https://picsum.photos/id/1040/1200/800',
    galleryImages: [
      'https://picsum.photos/id/1040/1200/800',
      'https://picsum.photos/id/1041/1200/800',
      'https://picsum.photos/id/1042/1200/800',
    ],
    location: 'Konaklı, Antalya',
    area: 800,
    type: 'land'
  },
  {
    id: '3',
    nameKey: 'modern_villa_demirtas',
    descriptionKey: 'modern_villa_demirtas_description',
    priceTRY: 24375000,
    priceUSD: 750000,
    priceEUR: 690000,
    imageUrl: 'https://picsum.photos/id/106/1200/800',
    galleryImages: [
      'https://picsum.photos/id/106/1200/800',
      'https://picsum.photos/id/107/1200/800',
      'https://picsum.photos/id/108/1200/800',
      'https://picsum.photos/id/109/1200/800',
    ],
    location: 'Demirtaş, Antalya',
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    type: 'apartment'
  },
  {
    id: '4',
    nameKey: 'lakeside_investment_land',
    descriptionKey: 'lakeside_investment_land_description',
    priceTRY: 3087500,
    priceUSD: 95000,
    priceEUR: 87400,
    imageUrl: 'https://picsum.photos/id/1018/1200/800',
    galleryImages: [
      'https://picsum.photos/id/1018/1200/800',
      'https://picsum.photos/id/1019/1200/800',
      'https://picsum.photos/id/1020/1200/800',
    ],
    location: 'Gazipaşa, Antalya',
    area: 1200,
    type: 'land'
  },
];

const PropertyDetailPage: React.FC = () => {
  const { t } = useTranslation();
  const { getPriceForCurrency, getCurrencySymbol, selectedCurrency } = useCurrency();
  const [property, setProperty] = useState<typeof mockProperties[0] | null>(null);
  const [mainImageIndex, setMainImageIndex] = useState(0); // Ana görselin indeksini tutuyoruz

  // URL'den ilan ID'sini al
  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const id = pathParts[pathParts.length - 1]; // Son kısım ID olmalı

    const foundProperty = mockProperties.find(p => p.id === id);
    if (foundProperty) {
      setProperty(foundProperty);
      setMainImageIndex(0); // İlan bulunduğunda ilk resmi ana görsel yap
    } else {
      setProperty(null);
    }
  }, []);

  // İleri butonu işlevi (döngüsel)
  const goToNextImage = () => {
    if (property && property.galleryImages) {
      setMainImageIndex((prevIndex) => (prevIndex + 1) % property.galleryImages!.length);
    }
  };

  // Geri butonu işlevi (döngüsel)
  const goToPreviousImage = () => {
    if (property && property.galleryImages) {
      setMainImageIndex((prevIndex) => (prevIndex - 1 + property.galleryImages!.length) % property.galleryImages!.length);
    }
  };

  if (!property) {
    return (
      <div className={styles.notFoundPage}>
        <h1 className={styles.notFoundTitle}>İlan Bulunamadı</h1>
        <p className={styles.notFoundText}>Aradığınız ilan mevcut değil veya kaldırılmış olabilir.</p>
        <button
          onClick={() => { window.history.pushState({}, '', '/ilanlar'); window.dispatchEvent(new PopStateEvent('popstate')); }}
          className="btn-primary"
          style={{ marginTop: '20px' }}
        >
          Tüm İlanlara Geri Dön
        </button>
      </div>
    );
  }

  const displayPrice = getPriceForCurrency({
    TRY: property.priceTRY,
    USD: property.priceUSD,
    EUR: property.priceEUR
  });
  const currencySymbol = getCurrencySymbol(selectedCurrency);

  return (
    <div className={styles.propertyDetailPage}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{t(property.nameKey)}</h1>
        <div className={styles.breadcrumbs}>
          <a href="/" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/'); window.dispatchEvent(new PopStateEvent('popstate')); }}>{t('home')}</a> /
          <a href="/ilanlar" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/ilanlar'); window.dispatchEvent(new PopStateEvent('popstate')); }}> {t('for_sale')}</a> /
          <span> {t(property.nameKey)}</span>
        </div>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.imageGallery}>
          <img src={property.galleryImages![mainImageIndex]} alt={t(property.nameKey)} className={styles.mainImage} />
          {/* İleri/Geri Butonları */}
          <button onClick={goToPreviousImage} className={`${styles.navButton} ${styles.prevButton}`}>
            <FaChevronLeft />
          </button>
          <button onClick={goToNextImage} className={`${styles.navButton} ${styles.nextButton}`}>
            <FaChevronRight />
          </button>

          <div className={styles.thumbnailContainer}>
            {property.galleryImages && property.galleryImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${t(property.nameKey)} - ${index + 1}`}
                className={`${styles.thumbnail} ${mainImageIndex === index ? styles.activeThumbnail : ''}`}
                onClick={() => setMainImageIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className={styles.detailsSection}>
          <h2 className={styles.detailTitle}>{t(property.nameKey)}</h2>
          <p className={styles.detailLocation}><FaMapMarkerAlt /> {property.location}</p>
          {displayPrice !== undefined && (
            <p className={styles.detailPrice}>{currencySymbol} {displayPrice.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
          )}

          <div className={styles.featuresGrid}>
            {property.type === 'apartment' && (
              <>
                {property.bedrooms && <div className={styles.featureItem}><FaBed /> {property.bedrooms} {t('bedrooms')}</div>}
                {property.bathrooms && <div className={styles.featureItem}><FaBath /> {property.bathrooms} {t('bathrooms')}</div>}
              </>
            )}
            {property.area && <div className={styles.featureItem}><FaRulerCombined /> {property.area} m² {t('area')}</div>}
            <div className={styles.featureItem}>Tip: {property.type === 'apartment' ? t('property_type_apartment') : t('property_type_land')}</div>
          </div>

          <div className={styles.descriptionSection}>
            <h3 className={styles.sectionHeading}>Açıklama</h3>
            <p className={styles.descriptionText}>
              {t(property.descriptionKey || 'no_description_available')}
            </p>
          </div>

          {/* İletişim Formu veya Bilgileri */}
          <div className={styles.contactSection}>
            <h3 className={styles.sectionHeading}>İletişim</h3>
            <p><FaPhoneAlt /> +90 5XX XXX XX XX</p>
            <p><FaEnvelope /> info@taylanhomes.com</p>
            <button className={`${styles.contactButton} btn-primary`}>İletişime Geç</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
