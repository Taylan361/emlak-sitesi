// frontend/src/App.tsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import PropertyGrid from './components/PropertyGrid/PropertyGrid';
import FloatingVideoPlayer from './components/FloatingVideoPlayer/FloatingVideoPlayer';
import Footer from './components/Footer/Footer';
import { CurrencyProvider } from './context/CurrencyContext';
import ForSalePage from './pages/ForSalePage/ForSalePage';
import PropertyDetailPage from './pages/PropertyDetailPage/PropertyDetailPage';
import AboutUsPage from './pages/AboutUsPage/AboutUsPage'; // <-- AboutUsPage'i import et
import './index.css';
import { useTranslation } from 'react-i18next';

// PropertyGrid'deki mockProperties'ı burada da tanımlayalım
// Böylece ana sayfaya özel ilanları doğrudan gönderebiliriz.
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
    type: 'apartment'
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
    type: 'land'
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
    type: 'apartment'
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
    type: 'land'
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
    type: 'apartment'
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
    type: 'land'
  },
];


function App() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  // URL değiştiğinde currentPage'i güncelle
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Header'daki linklere tıklandığında URL'i ve state'i güncelle
  const handleNavLinkClick = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPage(path);
  };

  // "Tüm İlanları Keşfet" butonuna basıldığında çalışacak
  const scrollToProperties = () => {
    document.getElementById('featured-properties')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Sayfa içeriğini mevcut URL'e göre render et
  const renderPage = () => {
    // İlan detay sayfası için dinamik route kontrolü
    if (currentPage.startsWith('/ilanlar/')) {
      const id = currentPage.split('/').pop(); // URL'den ID'yi al
      if (id) {
        return <PropertyDetailPage />;
      }
    }

    switch (currentPage) {
      case '/':
        return (
          <>
            <HeroSection onExploreClick={scrollToProperties} />
            <main style={{ paddingBottom: '50px' }}>
              {/* Ana sayfadaki ilanlar dikey animasyonlu ve çok sütunlu */}
              <PropertyGrid
                layoutType="multi-column"
                animationType="vertical"
                showTitle={true}
                properties={homepageProperties}
              />
            </main>
          </>
        );
      case '/ilanlar':
        return <ForSalePage />; // Satılık İlanlar sayfası
      case '/hakkimizda':
        return <AboutUsPage />; // <-- Hakkımızda sayfası eklendi
      case '/iletisim':
        return (
          <div style={{ padding: '80px 20px', textAlign: 'center', minHeight: '60vh', background: 'var(--color-off-white)' }}>
            <h1 style={{ color: 'var(--color-primary-navy)' }}>{t('contact')}</h1>
            <p style={{ color: 'var(--color-dark-gray)', marginTop: '10px' }}>
              İletişim formu ve bilgileri buraya gelecek.
            </p>
          </div>
        );
      default:
        return (
          <div style={{ padding: '80px 20px', textAlign: 'center', minHeight: '60vh', background: 'var(--color-off-white)' }}>
            <h1 style={{ color: 'var(--color-primary-navy)' }}>404 - Sayfa Bulunamadı</h1>
            <p style={{ color: 'var(--color-dark-gray)', marginTop: '10px' }}>
              Aradığınız sayfa mevcut değil. Lütfen ana sayfaya dönün.
            </p>
            <button
              onClick={() => handleNavLinkClick('/')}
              className="btn-primary"
              style={{ marginTop: '20px' }}
            >
              Ana Sayfaya Dön
            </button>
          </div>
        );
    }
  };

  return (
    <CurrencyProvider>
      <div className="App">
        <Header onNavLinkClick={handleNavLinkClick} />
        {renderPage()}
        <Footer />
        <FloatingVideoPlayer />
      </div>
    </CurrencyProvider>
  );
}

export default App;
