import { useState, useEffect, type PointerEvent as ReactPointerEvent } from 'react'
import redChilliImage from './assets/ProductImages/deccan-spices-red-chilli-powder-100g-packaging.webp'
import chickenMasalaImage from './assets/ProductImages/deccan-spices-chicken-masala-100g-packaging.webp'
import muttonMasalaImage from './assets/ProductImages/deccan-spices-mutton-masala-100g-packaging.webp'
import corianderImage from './assets/ProductImages/deccan-spices-coriander-powder-100g-packaging.webp'
import turmericImage from './assets/ProductImages/deccan-spices-turmeric-powder-100g-packaging.webp'
import superGaramMasalaImage from './assets/ProductImages/deccan-spices-super-garam-masala-100g-packaging.webp'
import sambarMasalaImage from './assets/ProductImages/deccan-spices-sambar-masala-100g-packaging.webp'
import landingVideo from './assets/ProductImages/landingvlog.mp4'
import './App.css'

interface Product {
  id: string;
  name: string;
  image: string;
  imageAlt: string;
  description: string;
  flavor: string;
  bestFor: string;
  netWeight: string;
  energyKcal: number;
  barcode: string;
  fssaiLicense: string;
}

interface RecipeIdea {
  title: string;
  productId: string;
  spice: string;
  description: string;
  method: string;
}

const rotateProductImage = (event: ReactPointerEvent<HTMLDivElement>) => {
  if (event.pointerType === 'touch' && event.buttons === 0) return;

  if (event.buttons > 0) event.currentTarget.dataset.dragged = 'true';

  const bounds = event.currentTarget.getBoundingClientRect();
  const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
  const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;

  event.currentTarget.style.setProperty('--tilt-x', `${vertical * -14}deg`);
  event.currentTarget.style.setProperty('--tilt-y', `${horizontal * 18}deg`);
};

const resetProductImageRotation = (event: ReactPointerEvent<HTMLDivElement>) => {
  if (event.buttons > 0) return;

  event.currentTarget.style.setProperty('--tilt-x', '0deg');
  event.currentTarget.style.setProperty('--tilt-y', '0deg');
};

const startProductImageRotation = (event: ReactPointerEvent<HTMLDivElement>) => {
  event.currentTarget.dataset.dragged = 'false';
};

const preventNavigationAfterImageRotation = (event: React.MouseEvent<HTMLDivElement>) => {
  if (event.currentTarget.dataset.dragged === 'true') {
    event.preventDefault();
    event.stopPropagation();
    delete event.currentTarget.dataset.dragged;
  }
};

const products: Product[] = [
  {
    id: 'prd1',
    name: 'Deccan Spices Red Chilli Powder',
    image: redChilliImage,
    imageAlt: 'Deccan Spices Red Chilli Powder 100g Box Packaging Layout',
    description: 'A pantry staple for adding chilli heat and color to curries, marinades, and everyday cooking.',
    flavor: 'Direct chilli heat with a vivid red color.',
    bestFor: 'Curries, marinades, and stir-fried vegetables.',
    netWeight: '100g',
    energyKcal: 282,
    barcode: '8906192430071',
    fssaiLicense: '21226175000227'
  },
  {
    id: 'prd2',
    name: 'Deccan Spices Chicken Masala',
    image: chickenMasalaImage,
    imageAlt: 'Deccan Spices Chicken Masala 100g Box Packaging Layout',
    description: 'A ready-to-use spice blend for a warmly seasoned chicken curry.',
    flavor: 'Savory and warming, with layered spice notes.',
    bestFor: 'Chicken curry, roasted chicken, and marinades.',
    netWeight: '100g',
    energyKcal: 321,
    barcode: '8906192430101',
    fssaiLicense: '21226175000227'
  },
  {
    id: 'prd3',
    name: 'Deccan Spices Mutton Masala',
    image: muttonMasalaImage,
    imageAlt: 'Deccan Spices Mutton Masala 100g Box Packaging Layout',
    description: 'A robust spice blend made for slow-cooked meat curries.',
    flavor: 'Deep, savory warmth for long-simmered dishes.',
    bestFor: 'Mutton curry, lamb stew, and meat marinades.',
    netWeight: '100g',
    energyKcal: 317,
    barcode: '8906192430118',
    fssaiLicense: '21226175000227'
  },
  {
    id: 'prd4',
    name: 'Deccan Spices Coriander Powder',
    image: corianderImage,
    imageAlt: 'Deccan Spices Coriander Powder 100g Box Packaging Layout',
    description: 'A versatile ground spice for building a fragrant base in everyday meals.',
    flavor: 'Mild, earthy, and gently citrus-like.',
    bestFor: 'Vegetable curries, dals, and spice blends.',
    netWeight: '100g',
    energyKcal: 298,
    barcode: '8906192430095',
    fssaiLicense: '21226175000227'
  },
  {
    id: 'prd5',
    name: 'Deccan Spices Turmeric Powder',
    image: turmericImage,
    imageAlt: 'Deccan Spices Turmeric Powder 100g Box Packaging Layout',
    description: 'A bright, earthy kitchen staple for dals, vegetables, and curry bases.',
    flavor: 'Earthy and gently bitter; use a little at a time.',
    bestFor: 'Dals, rice, vegetable dishes, and marinades.',
    netWeight: '100g',
    energyKcal: 354,
    barcode: '8906192430088',
    fssaiLicense: '21226175000227'
  },
  {
    id: 'prd6',
    name: 'Deccan Spices Super Garam Masala',
    image: superGaramMasalaImage,
    imageAlt: 'Deccan Spices Super Garam Masala 100g Box Packaging Layout',
    description: 'A fragrant finishing blend for adding warmth near the end of cooking.',
    flavor: 'Aromatic, sweet-warm, and savory.',
    bestFor: 'Curries, lentils, and roasted vegetables.',
    netWeight: '100g',
    energyKcal: 320,
    barcode: '8906192430132',
    fssaiLicense: '21226175000227'
  },
  {
    id: 'prd7',
    name: 'Deccan Spices Sambar Masala',
    image: sambarMasalaImage,
    imageAlt: 'Deccan Spices Sambar Masala 100g Box Packaging Layout',
    description: 'A convenient blend for lentil-and-vegetable sambar and other savory dishes.',
    flavor: 'Savory, fragrant, and gently warming.',
    bestFor: 'Sambar, vegetable stews, and lentil dishes.',
    netWeight: '100g',
    energyKcal: 328,
    barcode: '8906192430149',
    fssaiLicense: '21226175000227'
  }
];

const recipeIdeas: RecipeIdea[] = [
  {
    title: 'Weeknight chicken curry',
    productId: 'prd2',
    spice: 'Chicken Masala',
    description: 'A simple, comforting curry for a family meal.',
    method: 'Soften onion, add ginger and garlic, then chicken and tomatoes. Season with chicken masala and simmer until the chicken is fully cooked.'
  },
  {
    title: 'Slow-cooked mutton curry',
    productId: 'prd3',
    spice: 'Mutton Masala',
    description: 'Let a warming spice blend build flavor as the curry cooks.',
    method: 'Brown onion, add mutton and mutton masala, then stir in water and cook until tender. Adjust salt and heat to taste.'
  },
  {
    title: 'Everyday vegetable sambar',
    productId: 'prd7',
    spice: 'Sambar Masala',
    description: 'Pair lentils, vegetables, and tamarind for a hearty bowl.',
    method: 'Cook toor dal until soft. Simmer with vegetables, tamarind, and sambar masala until tender; finish with a tempering if you like.'
  },
  {
    title: 'Golden turmeric dal',
    productId: 'prd5',
    spice: 'Turmeric Powder',
    description: 'A simple dal with a warm, earthy base.',
    method: 'Cook lentils with a pinch of turmeric. Finish with a tempering of cumin, garlic, and chilli, then season to taste.'
  },
  {
    title: 'Everyday curry base',
    productId: 'prd4',
    spice: 'Coriander Powder',
    description: 'Use ground coriander to round out a quick vegetable curry.',
    method: 'Cook onion, garlic, and tomato until soft. Stir in coriander powder, add vegetables and a splash of water, then simmer until tender.'
  },
  {
    title: 'Warm finishing touch',
    productId: 'prd6',
    spice: 'Super Garam Masala',
    description: 'Bring a fragrant finish to a curry, dal, or roasted vegetables.',
    method: 'Add a small pinch near the end of cooking, taste, and adjust. Start with less and add more to suit your preference.'
  },
  {
    title: 'Chilli-spiced vegetables',
    productId: 'prd1',
    spice: 'Red Chilli Powder',
    description: 'Adjust the heat in a quick vegetable side dish.',
    method: 'Bloom a pinch of chilli powder in warm oil with your other spices, add vegetables, and cook until tender. Increase gradually to taste.'
  }
];

function App() {
  const contactNumber = '7349391969';
  const formattedPhone = '+917349391969';
  const globalWhatsappMessage = encodeURIComponent('Hello Deccan Spices! Please share current prices, availability, and delivery options.');
  const feedbackWhatsappMessage = encodeURIComponent('Hello Deccan Spices! I would like to share feedback about a product or send a photo of a dish I made.');
  const minimumBulkQuantity = 20;

  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [isThemeLoaded, setIsThemeLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [bulkQuantities, setBulkQuantities] = useState<Record<string, number>>({});
  const [bulkPaymentMethod, setBulkPaymentMethod] = useState<'upi' | 'cod'>('upi');

  // Initialize selected product ID from URL query parameters (e.g., ?product=prd1)
  const [selectedProductId, setSelectedProductId] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('product');
  });

  // Lightbox Modal States
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  const currentProduct = products.find(p => p.id === selectedProductId) || null;
  const bulkOrderQuantity = Object.values(bulkQuantities).reduce((total, quantity) => total + quantity, 0);
  const bulkOrderItems = products.filter(product => (bulkQuantities[product.id] ?? 0) > 0);
  const bulkOrderMessage = [
    'Hello Deccan Spices! I would like to place a bulk order:',
    ...bulkOrderItems.map(product => `- ${product.name} (${product.netWeight}) x ${bulkQuantities[product.id]} packs`),
    `Total: ${bulkOrderQuantity} packs`,
    `Preferred payment: ${bulkPaymentMethod === 'upi' ? 'UPI (please share payment details on WhatsApp)' : 'Cash on Delivery (please confirm availability)'}`,
    'Please confirm bulk pricing, shipping, and payment details.'
  ].join('\n');
  const bulkOrderUrl = `https://wa.me/91${contactNumber}?text=${encodeURIComponent(bulkOrderMessage)}`;

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
    const msg = encodeURIComponent(`Hello Deccan Spices! I am interested in "${productName}"${weightText}. Please confirm today's price, availability, delivery options, and charges.`);
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
            <button
              type="button"
              className="mobile-menu-toggle"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="primary-navigation"
              onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
            >
              <span />
              <span />
              <span />
            </button>
            <nav
              className={`site-nav ${isMobileMenuOpen ? 'is-open' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <ul className="nav-menu" id="primary-navigation">
                {selectedProductId ? (
                  <li><button onClick={handleUiBack} className="nav-link-btn font-medium">← Back to Spices</button></li>
                ) : (
                  <>
                    <li><a href="#home" className="nav-link">Home</a></li>
                    <li><a href="#why-us" className="nav-link">Choose a spice</a></li>
                    <li><a href="#products" className="nav-link">Our Spices</a></li>
                    <li><a href="#recipes" className="nav-link">Recipes</a></li>
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
                  onPointerMove={rotateProductImage}
                  onPointerLeave={resetProductImageRotation}
                  onPointerUp={resetProductImageRotation}
                  onPointerCancel={resetProductImageRotation}
                  title="Click to zoom image"
                >
                  <img src={currentProduct.image} alt={currentProduct.imageAlt} className="detail-image" />
                  
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
                <h1 className="detail-title">{currentProduct.name}</h1>
                
                <p className="detail-tagline-desc">{currentProduct.description}</p>

                {/* Direct Ordering CTAs */}
                <div className="detail-action-buttons">
                  <a 
                    href={getProductWhatsappLink(currentProduct.name, currentProduct.netWeight)}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-whatsapp-large w-full justify-center"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.59 1.981 14.117.957 11.99.957 6.558.957 2.13 5.327 2.128 10.756c-.001 1.681.453 3.32 1.316 4.795l-.997 3.64 3.74-.977zm12.115-4.523c-.3-.15-1.775-.875-2.049-.974-.275-.098-.475-.148-.674.15-.2.299-.775.974-.949 1.173-.175.199-.349.224-.649.075-.3-.15-1.265-.466-2.41-1.487-.893-.795-1.495-1.778-1.67-2.078-.175-.3-.018-.462.13-.61.135-.133.3-.349.45-.523.15-.174.2-.299.3-.499.1-.2.05-.375-.025-.524-.075-.15-.674-1.62-.924-2.22-.244-.589-.493-.51-.674-.519-.172-.008-.371-.01-.57-.01-.2 0-.524.074-.798.373-.275.3-1.047 1.022-1.047 2.492 0 1.47 1.071 2.888 1.22 3.088.15.199 2.107 3.218 5.104 4.512.713.308 1.27.492 1.704.63.717.228 1.369.196 1.885.119.574-.085 1.775-.726 2.024-1.397.25-.671.25-1.246.175-1.397-.075-.15-.275-.249-.575-.399z"/>
                    </svg>
                    Ask price & availability
                  </a>
                  <a href={`tel:${formattedPhone}`} className="btn-call-direct">
                    📞 Call to Place Order: {contactNumber}
                  </a>
                </div>
              </div>
            </div>

            {/* Product specifications */}
            <div className="product-tabbed-info">
              <div className="info-column product-use-info">
                <h3 className="sub-section-title">Taste &amp; ways to use</h3>
                <p><strong>Flavor:</strong> {currentProduct.flavor}</p>
                <p><strong>Goes well in:</strong> {currentProduct.bestFor}</p>
                <p className="price-confirmation-note">Only the 100g pack is listed here. Confirm current price, availability, and delivery charges with us on WhatsApp before ordering.</p>
              </div>
              <div className="info-column">
                <h3 className="sub-section-title">Pack Details</h3>
                <table className="specs-table">
                  <tbody>
                    <tr>
                      <td className="spec-label">Product</td>
                      <td className="spec-val">{currentProduct.name}</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Net Weight</td>
                      <td className="spec-val">{currentProduct.netWeight}</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Energy / 100g</td>
                      <td className="spec-val">{currentProduct.energyKcal} kcal</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="info-column">
                <h3 className="sub-section-title">Barcode &amp; Compliance</h3>
                <table className="specs-table">
                  <tbody>
                    <tr>
                      <td className="spec-label">Barcode / EAN</td>
                      <td className="spec-val">{currentProduct.barcode}</td>
                    </tr>
                    <tr>
                      <td className="spec-label">FSSAI Lic. No.</td>
                      <td className="spec-val">{currentProduct.fssaiLicense}</td>
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
                    <div
                      className="product-img-wrapper"
                      onPointerDown={startProductImageRotation}
                      onPointerMove={rotateProductImage}
                      onPointerLeave={resetProductImageRotation}
                      onPointerUp={resetProductImageRotation}
                      onPointerCancel={resetProductImageRotation}
                      onClick={preventNavigationAfterImageRotation}
                    >
                      <img src={p.image} alt={p.imageAlt} className="product-img" loading="lazy" />
                      <span className="product-rotate-hint" aria-hidden="true">↔ Drag to rotate</span>
                    </div>
                    <div className="product-content">
                      <h3 className="product-title">{p.name}</h3>
                      <p className="product-desc line-clamp">{p.description}</p>
                      <div className="product-meta">
                        <span className="product-weight">Weight: {p.netWeight}</span>
                        <span className="product-price">Price on WhatsApp</span>
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
              <span className="hero-tagline">A taste of the Deccan</span>
              <h1 className="hero-title">
                Bring a little <span className="gradient-text italic-serif">Deccan warmth</span> to your kitchen
              </h1>
              <p className="hero-description">
                Explore seven spice powders and masalas in 100g packs. Find a blend for your next meal, then message us to confirm today’s price, availability, and delivery options.
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

          {/* Brand Story Video */}
          <section className="brand-video" aria-label="Deccan Spices story">
            <div className="brand-video-container">
              <video
                className="brand-video-player"
                controls
                loop
                playsInline
                preload="metadata"
                poster={redChilliImage}
              >
                <source src={landingVideo} type="video/mp4" />
                Your browser does not support embedded videos.
              </video>
            </div>
          </section>

          {/* Quality / Features Section */}
          <section className="features" id="why-us">
            <div className="section-container">
              <div className="section-header">
                <span className="section-tag">Made for everyday cooking</span>
                <h2 className="section-title">Find a spice for the way you cook</h2>
                <p className="section-description">
                  Explore straightforward flavor notes, suggested uses, and the product information shown on each 100g pack.
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
                  <h3 className="feature-title">Choose by dish</h3>
                  <p className="feature-desc">Browse dedicated blends for chicken curry, mutton curry, and sambar—or everyday powders for your own recipes.</p>
                </div>
                <div className="feature-card">
                  <span className="feature-number">02</span>
                  <div className="feature-icon-wrapper">
                    <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="feature-title">Know what’s in the pack</h3>
                  <p className="feature-desc">Open each product page for its listed ingredients, nutrition, barcode, and pack details.</p>
                </div>
                <div className="feature-card">
                  <span className="feature-number">03</span>
                  <div className="feature-icon-wrapper">
                    <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="feature-title">Ask us before you order</h3>
                  <p className="feature-desc">We’ll confirm current price, stock, and delivery options directly with you on WhatsApp.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Products Showcase Grid */}
          <section className="products" id="products">
            <div className="section-container">
              <div className="section-header">
                <span className="section-tag">The spice collection</span>
                <h2 className="section-title">Our Premium Spice Collection</h2>
                <p className="section-description">
                  Browse the 100g packs, compare their flavor and uses, and open a product for its full label details. Message us for current pricing and delivery information.
                </p>
              </div>
              <div className="products-grid">
                {products.map((product) => (
                  <div 
                    className="product-card cursor-pointer" 
                    key={product.id}
                    onClick={() => navigateToProduct(product.id)}
                  >
                    <div
                      className="product-img-wrapper"
                      onPointerDown={startProductImageRotation}
                      onPointerMove={rotateProductImage}
                      onPointerLeave={resetProductImageRotation}
                      onPointerUp={resetProductImageRotation}
                      onPointerCancel={resetProductImageRotation}
                      onClick={preventNavigationAfterImageRotation}
                    >
                      <img src={product.image} alt={product.imageAlt} className="product-img" loading="lazy" />
                      <span className="product-rotate-hint" aria-hidden="true">↔ Drag to rotate</span>
                    </div>
                    <div className="product-content">
                      <h3 className="product-title">{product.name}</h3>
                      <p className="product-desc line-clamp">{product.description}</p>
                      <div className="product-meta">
                        <span className="product-weight">Weight: {product.netWeight}</span>
                        <span className="product-price">Price on WhatsApp</span>
                      </div>
                      <button className="btn-product-view-details">
                        View Product Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <form className="bulk-order-panel" onSubmit={(event) => event.preventDefault()}>
                <div className="bulk-order-heading">
                  <span className="section-tag">Wholesale &amp; Group Orders</span>
                  <h3 className="bulk-order-title">Ordering 20 packs or more?</h3>
                  <p className="bulk-order-description">
                    Choose quantities across any products. We’ll confirm bulk pricing, delivery, and payment details on WhatsApp.
                  </p>
                </div>

                <div className="bulk-order-list">
                  {products.map((product) => (
                    <label className="bulk-order-item" key={product.id}>
                      <img src={product.image} alt="" className="bulk-order-thumbnail" loading="lazy" />
                      <span className="bulk-order-product-name">
                        {product.name}
                        <span>{product.netWeight} pack</span>
                      </span>
                      <span className="bulk-order-quantity-label">
                        Packs
                        <input
                          type="number"
                          min="0"
                          max="999"
                          step="1"
                          inputMode="numeric"
                          value={bulkQuantities[product.id] ?? 0}
                          onChange={(event) => {
                            const quantity = Number.parseInt(event.currentTarget.value, 10);
                            setBulkQuantities(current => ({
                              ...current,
                              [product.id]: Number.isFinite(quantity) ? Math.min(999, Math.max(0, quantity)) : 0
                            }));
                          }}
                          aria-label={`${product.name} quantity in packs`}
                        />
                      </span>
                    </label>
                  ))}
                </div>

                <fieldset className="bulk-payment-options">
                  <legend>Preferred payment method</legend>
                  <label>
                    <input
                      type="radio"
                      name="bulk-payment"
                      value="upi"
                      checked={bulkPaymentMethod === 'upi'}
                      onChange={() => setBulkPaymentMethod('upi')}
                    />
                    <span>UPI — request payment details on WhatsApp</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="bulk-payment"
                      value="cod"
                      checked={bulkPaymentMethod === 'cod'}
                      onChange={() => setBulkPaymentMethod('cod')}
                    />
                    <span>Cash on Delivery — subject to confirmation</span>
                  </label>
                </fieldset>

                <div className="bulk-order-footer">
                  <p className={`bulk-order-total ${bulkOrderQuantity >= minimumBulkQuantity ? 'is-eligible' : ''}`} aria-live="polite">
                    {bulkOrderQuantity} / {minimumBulkQuantity} packs minimum
                  </p>
                  {bulkOrderQuantity >= minimumBulkQuantity ? (
                    <a
                      href={bulkOrderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp-large bulk-order-submit"
                    >
                      Send bulk order on WhatsApp
                    </a>
                  ) : (
                    <button type="button" className="btn-whatsapp-large bulk-order-submit" disabled>
                      Add {minimumBulkQuantity - bulkOrderQuantity} more packs to continue
                    </button>
                  )}
                </div>
              </form>
            </div>
          </section>

          <section className="recipes-section" id="recipes">
            <div className="section-container">
              <div className="section-header">
                <span className="section-tag">From our spice shelf</span>
                <h2 className="section-title">What are you cooking?</h2>
                <p className="section-description">
                  A few flexible starting points. Adjust spices, salt, and heat to your taste, and follow safe cooking guidance for meat.
                </p>
              </div>
              <div className="recipe-grid">
                {recipeIdeas.map((recipe) => (
                  <article className="recipe-card" key={recipe.title}>
                    <span className="recipe-spice">{recipe.spice}</span>
                    <h3>{recipe.title}</h3>
                    <p className="recipe-intro">{recipe.description}</p>
                    <p>{recipe.method}</p>
                    <button
                      type="button"
                      className="recipe-product-link"
                      onClick={() => navigateToProduct(recipe.productId)}
                    >
                      Explore {recipe.spice}
                    </button>
                  </article>
                ))}
              </div>
              <div className="customer-feedback-card">
                <div>
                  <span className="section-tag">Cooked with Deccan?</span>
                  <h3>Share your dish or feedback</h3>
                  <p>Send us an honest note or a photo on WhatsApp. With your permission, we may feature it on our site.</p>
                </div>
                <a
                  href={`https://wa.me/91${contactNumber}?text=${feedbackWhatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Share feedback
                </a>
              </div>
            </div>
          </section>

          {/* Contact & CTA Section */}
          <section className="contact-cta" id="contact">
            <div className="cta-container">
              <h2 className="cta-title">Ready to choose your spices?</h2>
              <p className="cta-desc">
                Message us to confirm current prices, stock, delivery availability, and charges before placing an order.
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
              Explore everyday spice powders and blends, with product details and recipe ideas to help you choose what to cook next.
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
          <p>Spice ideas for everyday cooking</p>
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
                alt={currentProduct.imageAlt}
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
