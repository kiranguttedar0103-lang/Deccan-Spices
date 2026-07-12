import { useState, useEffect } from 'react'
import prd1 from './assets/ProductImages/Prd1.jpeg'
import prd2 from './assets/ProductImages/Prd2.jpeg'
import prd3 from './assets/ProductImages/Prd3.jpeg'
import prd4 from './assets/ProductImages/Prd4.jpeg'
import prd5 from './assets/ProductImages/Prd5.jpeg'
import prd6 from './assets/ProductImages/Prd6.jpeg'
import prd7 from './assets/ProductImages/Prd7.jpeg'
import './App.css'

interface Product {
  id: string;
  name: string;
  image: string;
  badge?: string;
  description: string;
  weight: string;
  price: string;
  ingredients: string;
  origin: string;
  shelfLife: string;
  benefits: string[];
  usage: string;
}

const products: Product[] = [
  {
    id: 'prd1',
    name: 'Premium Guntur Chilli Powder',
    image: prd1,
    badge: 'Best Seller',
    description: 'Sourced from the heart of Guntur, our sun-dried red chillies are ground to perfection, offering a rich crimson color and an intense authentic heat.',
    weight: '250g / 500g',
    price: 'Pure & Organic',
    ingredients: '100% Pure sun-dried Guntur Red Chillies',
    origin: 'Guntur, Andhra Pradesh, India',
    shelfLife: '12 Months',
    benefits: ['Rich in Vitamin C & antioxidants', 'Boosts metabolism and aids weight loss', 'Acts as a natural pain reliever'],
    usage: 'Perfect for traditional Indian curries, spicy gravies, tandoori marinades, and stir-fries.'
  },
  {
    id: 'prd2',
    name: 'Royal Salem Turmeric Powder',
    image: prd2,
    badge: 'High Curcumin',
    description: 'Traditionally ground Salem turmeric with high curcumin content. Adds a vibrant golden hue and rich immunity-boosting properties to your meals.',
    weight: '200g / 500g',
    price: '100% Pure',
    ingredients: '100% Organic Salem Turmeric Rhizomes',
    origin: 'Salem, Tamil Nadu, India',
    shelfLife: '18 Months',
    benefits: ['High Curcumin content (5%+)', 'Powerful anti-inflammatory properties', 'Improves digestion and boosts immunity'],
    usage: 'Ideal for everyday cooking, golden turmeric milk, herbal teas, and wellness remedies.'
  },
  {
    id: 'prd3',
    name: 'Heritage Garam Masala Blend',
    image: prd3,
    badge: 'Traditional Recipe',
    description: 'A royal blend of 12 hand-roasted spices crafted from a legacy recipe, adding robust warmth, aroma, and rich flavor to any vegetarian or meat dish.',
    weight: '100g / 250g',
    price: 'Aromatic',
    ingredients: 'Cinnamon, cardamom, cloves, cumin, coriander, black pepper, nutmeg, star anise, fennel, bay leaf',
    origin: 'Deccan Region, India',
    shelfLife: '12 Months',
    benefits: ['Improves digestion and gut health', 'Combats bad breath and improves oral hygiene', 'Rich in powerful antioxidants'],
    usage: 'Sprinkle a small pinch at the final stage of cooking curries, biryanis, and gravies to lock in maximum aroma.'
  },
  {
    id: 'prd4',
    name: 'Bold Malabar Pepper Powder',
    image: prd4,
    description: 'Selected black peppercorns from the Malabar coast, slow-crushed to preserve the essential volatile oils and deliver a sharp, lingering bite.',
    weight: '100g / 200g',
    price: 'Freshly Ground',
    ingredients: '100% Whole Malabar Black Peppercorns',
    origin: 'Malabar Coast, Kerala, India',
    shelfLife: '12 Months',
    benefits: ['Enhances nutrient absorption in the body', 'Promotes gut health and relieves flatulence', 'Natural anti-bacterial qualities'],
    usage: 'Adds a warm, sharp kick to eggs, salads, clear soups, pastas, grilled meats, and stir-fried vegetables.'
  },
  {
    id: 'prd5',
    name: 'Mild Kashmiri Chilli Powder',
    image: prd5,
    badge: 'Popular',
    description: 'Prized for its brilliant red hue and mild warmth, this premium spice gives your curries a stunning visual appeal without overpowering heat.',
    weight: '250g / 500g',
    price: 'Premium Grade',
    ingredients: '100% Premium Kashmiri Red Chillies',
    origin: 'Kashmir Valley, India',
    shelfLife: '12 Months',
    benefits: ['Rich in vitamin A and beta-carotenes', 'Extremely low heat index, gentle on stomach', 'Supports healthy skin and eyes'],
    usage: 'Perfect for achieving that signature deep red color in Butter Chicken, Paneer Tikka, Rogan Josh, and dry rubs.'
  },
  {
    id: 'prd6',
    name: 'Fragrant Coriander Powder',
    image: prd6,
    description: 'Made from the finest coriander seeds, slow-roasted to bring out their sweet, citrusy aroma and earthy undertones.',
    weight: '250g / 500g',
    price: 'Rich Aroma',
    ingredients: '100% Roasted Coriander (Dhania) Seeds',
    origin: 'Madhya Pradesh, India',
    shelfLife: '12 Months',
    benefits: ['Helps reduce bad cholesterol levels', 'Assists in regulating blood sugar levels', 'Aids the overall digestive process'],
    usage: 'Forms the foundational base spice for sambar, rasam, curries, stews, and spice pastes.'
  },
  {
    id: 'prd7',
    name: 'Royal Cumin Seeds (Jeera)',
    image: prd7,
    description: 'Crispy, premium whole cumin seeds packed with high essential oil content, releasing a warm and robust aroma when roasted.',
    weight: '100g / 250g',
    price: 'Handselected',
    ingredients: '100% Whole Cumin (Jeera) Seeds',
    origin: 'Gujarat, India',
    shelfLife: '24 Months',
    benefits: ['Aids in secretion of digestive enzymes', 'Excellent source of dietary iron', 'Combats internal inflammation'],
    usage: 'Perfect for tempering (tadka) in hot oil or ghee at the beginning of cooking dals, rice, and vegetable curries.'
  }
];

function App() {
  const contactNumber = '7349391969';
  const formattedPhone = '+917349391969';
  const globalWhatsappMessage = encodeURIComponent('Hello Deccan Spices! I visited your website and would like to learn more or place an order.');

  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  // Initialize selected product ID from URL query parameters (e.g., ?product=prd1)
  const [selectedProductId, setSelectedProductId] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('product');
  });

  const [selectedWeight, setSelectedWeight] = useState<string>('');
  
  // Lightbox Modal States
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  const currentProduct = products.find(p => p.id === selectedProductId) || null;

  // Sync selectedWeight when the product changes
  useEffect(() => {
    if (currentProduct) {
      const weights = currentProduct.weight.split('/');
      setSelectedWeight(weights[0].trim());
    }
  }, [selectedProductId, currentProduct]);

  // Smooth theme loading
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
    
    const timeout = setTimeout(() => {
      setIsThemeLoaded(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, [theme]);

  // History Popstate Handling (Hardware Back Button support)
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.productId) {
        setSelectedProductId(event.state.productId);
      } else {
        setSelectedProductId(null);
      }
      setIsLightboxOpen(false);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Body Scroll Lock for Lightbox Overlay
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsImageZoomed(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen]);

  const toggleTheme = () => {
    document.documentElement.classList.add('theme-transitioning');
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 600);
  };

  const navigateToProduct = (productId: string) => {
    setSelectedProductId(productId);
    setIsLightboxOpen(false);
    window.history.pushState({ productId: productId }, '', `?product=${productId}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateHome = () => {
    setSelectedProductId(null);
    setIsLightboxOpen(false);
    window.history.pushState(null, '', window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleUiBack = () => {
    if (window.history.state && window.history.state.productId) {
      window.history.back();
    } else {
      navigateHome();
    }
  };

  const getProductWhatsappLink = (productName: string, weight?: string) => {
    const weightText = weight ? ` (${weight})` : '';
    const msg = encodeURIComponent(`Hello Deccan Spices! I would like to order: "${productName}"${weightText}. Please share the pricing details and shipping instructions.`);
    return `https://wa.me/91${contactNumber}?text=${msg}`;
  };

  const relatedProducts = currentProduct 
    ? products.filter(p => p.id !== currentProduct.id).slice(0, 3)
    : [];

  return (
    <div className={`app-container ${isThemeLoaded ? 'theme-animated' : ''}`}>
      {/* Dynamic Background Mesh */}
      <div className="bg-mesh bg-mesh-1"></div>
      <div className="bg-mesh bg-mesh-2"></div>

      {/* Sticky Header Pill */}
      <header className="header" id="home">
        <div className="header-container">
          <button onClick={navigateHome} className="logo-link-btn" aria-label="Deccan Spices Home">
            <img src="/logo.svg" className="header-logo-img" alt="Deccan Spices Logo" />
            <span className="logo-text">Deccan<span className="logo-sub">Spices</span></span>
          </button>
          <div className="header-actions-wrapper">
            <nav>
              <ul className="nav-menu">
                {selectedProductId ? (
                  <li><button onClick={handleUiBack} className="nav-link-btn font-medium">← Back to Spices</button></li>
                ) : (
                  <>
                    <li><a href="#home" className="nav-link">Home</a></li>
                    <li><a href="#why-us" className="nav-link">Our Quality</a></li>
                    <li><a href="#products" className="nav-link">Our Spices</a></li>
                    <li><a href="#contact" className="nav-link">Contact</a></li>
                  </>
                )}
                <li>
                  <a 
                    href={`https://wa.me/91${contactNumber}?text=${globalWhatsappMessage}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-header-whatsapp"
                  >
                    Order Now
                  </a>
                </li>
              </ul>
            </nav>
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                // Sun Icon
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="rotate-icon">
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.162 5.738a.75.75 0 010 1.06l-1.59 1.591a.75.75 0 11-1.061-1.06l1.59-1.592a.75.75 0 011.06 0zm11.676 0a.75.75 0 011.06 0l1.59 1.591a.75.75 0 11-1.06 1.06l-1.591-1.59a.75.75 0 010-1.061zM12 5.25a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM3 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm15 0a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5h-2.25A.75.75 0 0118 12zM5.738 17.838a.75.75 0 011.06 0l1.591 1.59a.75.75 0 11-1.06 1.06l-1.59-1.59a.75.75 0 010-1.06zm12.524 0a.75.75 0 010 1.06l-1.59 1.59a.75.75 0 11-1.061-1.06l1.59-1.59a.75.75 0 011.06 0zM12 17.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V18a.75.75 0 01.75-.75z" />
                </svg>
              ) : (
                // Moon Icon
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="rotate-icon">
                  <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 11-11.948-11.947.75.75 0 01.812-.178z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      {selectedProductId && currentProduct ? (
        /* PRODUCT DETAIL VIEW SCREEN */
        <div className="product-detail-view fade-in">
          <div className="section-container">
            {/* Breadcrumbs */}
            <div className="breadcrumb-nav">
              <button onClick={handleUiBack} className="breadcrumb-link">Home</button>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">{currentProduct.name}</span>
            </div>

            {/* Main Details Panel */}
            <div className="detail-panel">
              <div className="detail-image-section">
                <div 
                  className="detail-image-wrapper cursor-pointer" 
                  onClick={() => setIsLightboxOpen(true)}
                  title="Click to zoom image"
                >
                  <img src={currentProduct.image} alt={currentProduct.name} className="detail-image" />
                  {currentProduct.badge && <span className="detail-badge">{currentProduct.badge}</span>}
                  
                  {/* Zoom indicator */}
                  <div className="image-zoom-overlay">
                    <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                    <span>Click to Zoom</span>
                  </div>
                </div>
              </div>
              <div className="detail-info-section">
                <span className="detail-tag-category">Premium Harvest</span>
                <h1 className="detail-title">{currentProduct.name}</h1>
                
                <div className="detail-reviews">
                  <span className="stars">⭐⭐⭐⭐⭐</span>
                  <span className="reviews-text">4.9 / 5.0 (98 Reviews)</span>
                </div>

                <p className="detail-tagline-desc">{currentProduct.description}</p>

                {/* Weight Selector */}
                <div className="weight-selector-container">
                  <h3 className="selector-title">Select Pack Weight:</h3>
                  <div className="weight-options">
                    {currentProduct.weight.split('/').map((w) => {
                      const weightVal = w.trim();
                      const isSelected = selectedWeight === weightVal;
                      return (
                        <button
                          key={weightVal}
                          className={`weight-opt-btn ${isSelected ? 'active' : ''}`}
                          onClick={() => setSelectedWeight(weightVal)}
                        >
                          {weightVal}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="detail-pricing-box">
                  <span className="pricing-label">Status:</span>
                  <span className="pricing-value">In Stock (Organic Batch)</span>
                </div>

                {/* Direct Ordering CTAs */}
                <div className="detail-action-buttons">
                  <a 
                    href={getProductWhatsappLink(currentProduct.name, selectedWeight)}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-whatsapp-large w-full justify-center"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.59 1.981 14.117.957 11.99.957 6.558.957 2.13 5.327 2.128 10.756c-.001 1.681.453 3.32 1.316 4.795l-.997 3.64 3.74-.977zm12.115-4.523c-.3-.15-1.775-.875-2.049-.974-.275-.098-.475-.148-.674.15-.2.299-.775.974-.949 1.173-.175.199-.349.224-.649.075-.3-.15-1.265-.466-2.41-1.487-.893-.795-1.495-1.778-1.67-2.078-.175-.3-.018-.462.13-.61.135-.133.3-.349.45-.523.15-.174.2-.299.3-.499.1-.2.05-.375-.025-.524-.075-.15-.674-1.62-.924-2.22-.244-.589-.493-.51-.674-.519-.172-.008-.371-.01-.57-.01-.2 0-.524.074-.798.373-.275.3-1.047 1.022-1.047 2.492 0 1.47 1.071 2.888 1.22 3.088.15.199 2.107 3.218 5.104 4.512.713.308 1.27.492 1.704.63.717.228 1.369.196 1.885.119.574-.085 1.775-.726 2.024-1.397.25-.671.25-1.246.175-1.397-.075-.15-.275-.249-.575-.399z"/>
                    </svg>
                    Send Order via WhatsApp
                  </a>
                  <a href={`tel:${formattedPhone}`} className="btn-call-direct">
                    📞 Call to Place Order: {contactNumber}
                  </a>
                </div>
              </div>
            </div>

            {/* Spec Tables & Benefits */}
            <div className="product-tabbed-info">
              <div className="info-column">
                <h3 className="sub-section-title">Health Benefits &amp; Features</h3>
                <ul className="benefits-list">
                  {currentProduct.benefits.map((benefit, i) => (
                    <li key={i} className="benefit-item">
                      <span className="check-icon">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                  <li className="benefit-item">
                    <span className="check-icon">✓</span>
                    <span>100% natural, free from coloring or MSG</span>
                  </li>
                  <li className="benefit-item">
                    <span className="check-icon">✓</span>
                    <span>Packed in dynamic hygiene-seal packaging</span>
                  </li>
                </ul>

                <h3 className="sub-section-title" style={{ marginTop: '35px' }}>Culinary Suggestions</h3>
                <p className="culinary-desc">{currentProduct.usage}</p>
              </div>

              <div className="info-column">
                <h3 className="sub-section-title">Product Specifications</h3>
                <table className="specs-table">
                  <tbody>
                    <tr>
                      <td className="spec-label">Ingredients</td>
                      <td className="spec-val">{currentProduct.ingredients}</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Product Origin</td>
                      <td className="spec-val">{currentProduct.origin}</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Shelf Life</td>
                      <td className="spec-val">{currentProduct.shelfLife}</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Form</td>
                      <td className="spec-val">Premium Whole / Milled Powder</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Preservatives</td>
                      <td className="spec-val">None (100% Organic Retention)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Related Spices Gallery */}
            <div className="related-spices-section">
              <h2 className="related-title">You May Also Like</h2>
              <div className="products-grid">
                {relatedProducts.map((p) => (
                  <div 
                    className="product-card cursor-pointer" 
                    key={p.id}
                    onClick={() => navigateToProduct(p.id)}
                  >
                    <div className="product-img-wrapper">
                      <img src={p.image} alt={p.name} className="product-img" loading="lazy" />
                      {p.badge && <span className="product-badge">{p.badge}</span>}
                    </div>
                    <div className="product-content">
                      <h3 className="product-title">{p.name}</h3>
                      <p className="product-desc line-clamp">{p.description}</p>
                      <div className="product-meta">
                        <span className="product-weight">Weight: {p.weight}</span>
                        <span className="product-price">{p.price}</span>
                      </div>
                      <button className="btn-product-view-details">
                        View Product Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* LANDING PAGE VIEW */
        <>
          {/* Hero Section */}
          <section className="hero">
            <div className="hero-container">
              <span className="hero-tagline">100% Pure &amp; Aromatic</span>
              <h1 className="hero-title">
                Bring the <span className="gradient-text italic-serif">Aromatic Heritage</span> of Deccan to Your Kitchen
              </h1>
              <p className="hero-description">
                Discover a premium range of handpicked, sun-dried, and traditionally ground spices. Direct from local farms with zero chemical additives or preservatives.
              </p>
              <div className="hero-actions">
                <a href="#products" className="btn-primary">Explore Products</a>
                <a 
                  href={`https://wa.me/91${contactNumber}?text=${globalWhatsappMessage}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-secondary"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </section>

          {/* Quality / Features Section */}
          <section className="features" id="why-us">
            <div className="section-container">
              <div className="section-header">
                <span className="section-tag">Our Guarantee</span>
                <h2 className="section-title">Why Deccan Spices Stands Out</h2>
                <p className="section-description">
                  We focus on traditional values, ensuring that our spices retain their natural essential oils, distinct color, and original taste.
                </p>
              </div>
              <div className="features-grid">
                <div className="feature-card">
                  <span className="feature-number">01</span>
                  <div className="feature-icon-wrapper">
                    <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="feature-title">100% Organic Sourcing</h3>
                  <p className="feature-desc">Sourced directly from local farmers practicing chemical-free farming to give you premium nature-fresh spices.</p>
                </div>
                <div className="feature-card">
                  <span className="feature-number">02</span>
                  <div className="feature-icon-wrapper">
                    <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="feature-title">Traditionally Stone Ground</h3>
                  <p className="feature-desc">Slow-ground using traditional techniques to ensure the temperature stays low, locking in essential aroma oils.</p>
                </div>
                <div className="feature-card">
                  <span className="feature-number">03</span>
                  <div className="feature-icon-wrapper">
                    <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="feature-title">No Preservatives</h3>
                  <p className="feature-desc">Absolutely zero artificial food colors, msg, anti-caking agents, or chemical preservatives. Pure spice from farm to kitchen.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Products Showcase Grid */}
          <section className="products" id="products">
            <div className="section-container">
              <div className="section-header">
                <span className="section-tag">Authentic Selection</span>
                <h2 className="section-title">Our Premium Spice Collection</h2>
                <p className="section-description">
                  Handcrafted in small batches to preserve ultimate freshness. Click any spice to view its detailed specifications and select packaging.
                </p>
              </div>
              <div className="products-grid">
                {products.map((product) => (
                  <div 
                    className="product-card cursor-pointer" 
                    key={product.id}
                    onClick={() => navigateToProduct(product.id)}
                  >
                    <div className="product-img-wrapper">
                      <img src={product.image} alt={product.name} className="product-img" loading="lazy" />
                      {product.badge && <span className="product-badge">{product.badge}</span>}
                    </div>
                    <div className="product-content">
                      <h3 className="product-title">{product.name}</h3>
                      <p className="product-desc line-clamp">{product.description}</p>
                      <div className="product-meta">
                        <span className="product-weight">Weight: {product.weight}</span>
                        <span className="product-price">{product.price}</span>
                      </div>
                      <button className="btn-product-view-details">
                        View Product Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact & CTA Section */}
          <section className="contact-cta" id="contact">
            <div className="cta-container">
              <h2 className="cta-title">Order Fresh Spices Today</h2>
              <p className="cta-desc">
                We deliver pure, premium quality spices directly to your doorstep. Have questions, bulk orders, or custom requirement inquiries? Reach out to us directly!
              </p>
              <div className="cta-links">
                <a href={`tel:${formattedPhone}`} className="cta-phone">
                  📞 {contactNumber}
                </a>
                <a 
                  href={`https://wa.me/91${contactNumber}?text=${globalWhatsappMessage}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-whatsapp-large"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.59 1.981 14.117.957 11.99.957 6.558.957 2.13 5.327 2.128 10.756c-.001 1.681.453 3.32 1.316 4.795l-.997 3.64 3.74-.977zm12.115-4.523c-.3-.15-1.775-.875-2.049-.974-.275-.098-.475-.148-.674.15-.2.299-.775.974-.949 1.173-.175.199-.349.224-.649.075-.3-.15-1.265-.466-2.41-1.487-.893-.795-1.495-1.778-1.67-2.078-.175-.3-.018-.462.13-.61.135-.133.3-.349.45-.523.15-.174.2-.299.3-.499.1-.2.05-.375-.025-.524-.075-.15-.674-1.62-.924-2.22-.244-.589-.493-.51-.674-.519-.172-.008-.371-.01-.57-.01-.2 0-.524.074-.798.373-.275.3-1.047 1.022-1.047 2.492 0 1.47 1.071 2.888 1.22 3.088.15.199 2.107 3.218 5.104 4.512.713.308 1.27.492 1.704.63.717.228 1.369.196 1.885.119.574-.085 1.775-.726 2.024-1.397.25-.671.25-1.246.175-1.397-.075-.15-.275-.249-.575-.399z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h3 className="footer-logo">
              <img src="/logo.svg" className="footer-logo-img" alt="Deccan Spices Logo" />
              Deccan<span>Spices</span>
            </h3>
            <p className="footer-tagline">
              Bringing authentic taste, traditional quality, and pure health from the heart of the Deccan plateau directly to your home.
            </p>
          </div>
          <div className="footer-contact">
            <h4 className="footer-contact-title">Contact Us</h4>
            <a href={`tel:${formattedPhone}`} className="footer-contact-link">📞 +91 {contactNumber}</a>
            <a 
              href={`https://wa.me/91${contactNumber}?text=${globalWhatsappMessage}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-contact-link"
            >
              💬 WhatsApp: +91 {contactNumber}
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Deccan Spices. All Rights Reserved.</p>
          <p>Handcrafted Pure Indian Spices</p>
        </div>
      </footer>

      {/* Floating WhatsApp Widget */}
      <a 
        href={`https://wa.me/91${contactNumber}?text=${globalWhatsappMessage}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="floating-whatsapp"
        aria-label="Chat with us on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.59 1.981 14.117.957 11.99.957 6.558.957 2.13 5.327 2.128 10.756c-.001 1.681.453 3.32 1.316 4.795l-.997 3.64 3.74-.977zm12.115-4.523c-.3-.15-1.775-.875-2.049-.974-.275-.098-.475-.148-.674.15-.2.299-.775.974-.949 1.173-.175.199-.349.224-.649.075-.3-.15-1.265-.466-2.41-1.487-.893-.795-1.495-1.778-1.67-2.078-.175-.3-.018-.462.13-.61.135-.133.3-.349.45-.523.15-.174.2-.299.3-.499.1-.2.05-.375-.025-.524-.075-.15-.674-1.62-.924-2.22-.244-.589-.493-.51-.674-.519-.172-.008-.371-.01-.57-.01-.2 0-.524.074-.798.373-.275.3-1.047 1.022-1.047 2.492 0 1.47 1.071 2.888 1.22 3.088.15.199 2.107 3.218 5.104 4.512.713.308 1.27.492 1.704.63.717.228 1.369.196 1.885.119.574-.085 1.775-.726 2.024-1.397.25-.671.25-1.246.175-1.397-.075-.15-.275-.249-.575-.399z"/>
        </svg>
      </a>

      {/* Lightbox / Zoomable Image Modal */}
      {isLightboxOpen && currentProduct && (
        <div className="lightbox-overlay" onClick={() => setIsLightboxOpen(false)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button 
              className="lightbox-close-btn" 
              onClick={() => setIsLightboxOpen(false)} 
              aria-label="Close Lightbox"
            >
              &times;
            </button>
            {/* Zoomable Image Container */}
            <div className="lightbox-image-container">
              <img 
                src={currentProduct.image} 
                alt={currentProduct.name} 
                className={`lightbox-image ${isImageZoomed ? 'zoomed' : ''}`} 
                onClick={() => setIsImageZoomed(prev => !prev)}
                title={isImageZoomed ? "Click to Zoom Out" : "Click to Zoom In"}
              />
            </div>
            {/* Zoom Instruction Bar */}
            <div className="lightbox-caption">
              <span>{currentProduct.name}</span>
              <span className="divider">|</span>
              <span className="zoom-hint">{isImageZoomed ? "Click image to Zoom Out" : "Click image to Zoom In"}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
