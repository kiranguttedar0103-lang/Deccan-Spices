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
}

const products: Product[] = [
  {
    id: 'prd1',
    name: 'Premium Guntur Chilli Powder',
    image: prd1,
    badge: 'Best Seller',
    description: 'Sourced from the heart of Guntur, our sun-dried red chillies are ground to perfection, offering a rich crimson color and an intense authentic heat.',
    weight: '250g / 500g',
    price: 'Pure & Organic'
  },
  {
    id: 'prd2',
    name: 'Royal Salem Turmeric Powder',
    image: prd2,
    badge: 'High Curcumin',
    description: 'Traditionally ground Salem turmeric with high curcumin content. Adds a vibrant golden hue and rich immunity-boosting properties to your meals.',
    weight: '200g / 500g',
    price: '100% Pure'
  },
  {
    id: 'prd3',
    name: 'Heritage Garam Masala Blend',
    image: prd3,
    badge: 'Traditional Recipe',
    description: 'A royal blend of 12 hand-roasted spices crafted from a legacy recipe, adding robust warmth, aroma, and rich flavor to any vegetarian or meat dish.',
    weight: '100g / 250g',
    price: 'Aromatic'
  },
  {
    id: 'prd4',
    name: 'Bold Malabar Pepper Powder',
    image: prd4,
    description: 'Selected black peppercorns from the Malabar coast, slow-crushed to preserve the essential volatile oils and deliver a sharp, lingering bite.',
    weight: '100g / 200g',
    price: 'Freshly Ground'
  },
  {
    id: 'prd5',
    name: 'Mild Kashmiri Chilli Powder',
    image: prd5,
    badge: 'Popular',
    description: 'Prized for its brilliant red hue and mild warmth, this premium spice gives your curries a stunning visual appeal without overpowering heat.',
    weight: '250g / 500g',
    price: 'Premium Grade'
  },
  {
    id: 'prd6',
    name: 'Fragrant Coriander Powder',
    image: prd6,
    description: 'Made from the finest coriander seeds, slow-roasted to bring out their sweet, citrusy aroma and earthy undertones.',
    weight: '250g / 500g',
    price: 'Rich Aroma'
  },
  {
    id: 'prd7',
    name: 'Royal Cumin Seeds (Jeera)',
    image: prd7,
    description: 'Crispy, premium whole cumin seeds packed with high essential oil content, releasing a warm and robust aroma when roasted.',
    weight: '100g / 250g',
    price: 'Handselected'
  }
];

function App() {
  const contactNumber = '7349391969';
  const formattedPhone = '+917349391969';
  const globalWhatsappMessage = encodeURIComponent('Hello Deccan Spices! I visited your website and would like to learn more or place an order.');

  const getProductWhatsappLink = (productName: string) => {
    const msg = encodeURIComponent(`Hello Deccan Spices! I would like to order the product: "${productName}". Please share details and pricing.`);
    return `https://wa.me/91${contactNumber}?text=${msg}`;
  };

  return (
    <div className="app-container">
      {/* Sticky Header */}
      <header className="header" id="home">
        <div className="header-container">
          <a href="#home" className="logo-link">
            <span className="logo-text">Deccan<span className="logo-sub">Spices</span></span>
          </a>
          <nav>
            <ul className="nav-menu">
              <li><a href="#home" className="nav-link">Home</a></li>
              <li><a href="#why-us" className="nav-link">Our Quality</a></li>
              <li><a href="#products" className="nav-link">Our Spices</a></li>
              <li><a href="#contact" className="nav-link">Contact</a></li>
              <li>
                <a 
                  href={`https://wa.me/91${contactNumber}?text=${globalWhatsappMessage}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-header-whatsapp"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.59 1.981 14.117.957 11.99.957 6.558.957 2.13 5.327 2.128 10.756c-.001 1.681.453 3.32 1.316 4.795l-.997 3.64 3.74-.977zm12.115-4.523c-.3-.15-1.775-.875-2.049-.974-.275-.098-.475-.148-.674.15-.2.299-.775.974-.949 1.173-.175.199-.349.224-.649.075-.3-.15-1.265-.466-2.41-1.487-.893-.795-1.495-1.778-1.67-2.078-.175-.3-.018-.462.13-.61.135-.133.3-.349.45-.523.15-.174.2-.299.3-.499.1-.2.05-.375-.025-.524-.075-.15-.674-1.62-.924-2.22-.244-.589-.493-.51-.674-.519-.172-.008-.371-.01-.57-.01-.2 0-.524.074-.798.373-.275.3-1.047 1.022-1.047 2.492 0 1.47 1.071 2.888 1.22 3.088.15.199 2.107 3.218 5.104 4.512.713.308 1.27.492 1.704.63.717.228 1.369.196 1.885.119.574-.085 1.775-.726 2.024-1.397.25-.671.25-1.246.175-1.397-.075-.15-.275-.249-.575-.399z"/>
                  </svg>
                  Order on WhatsApp
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <span className="hero-tagline">100% Pure &amp; Aromatic</span>
          <h1 className="hero-title">Bring the Authentic Taste of Deccan to Your Kitchen</h1>
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
              <div className="feature-icon-wrapper">
                {/* Custom Organic SVG icon */}
                <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="feature-title">100% Organic Sourcing</h3>
              <p className="feature-desc">Sourced directly from local farmers practicing chemical-free farming to give you premium nature-fresh spices.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                {/* Custom Traditional Stone SVG icon */}
                <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="feature-title">Traditionally Stone Ground</h3>
              <p className="feature-desc">Slow-ground using traditional techniques to ensure the temperature stays low, locking in essential aroma oils.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                {/* Custom Premium Quality SVG icon */}
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
              Handcrafted in small batches to preserve ultimate freshness. Click any product to order directly on WhatsApp.
            </p>
          </div>
          <div className="products-grid">
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-img-wrapper">
                  <img src={product.image} alt={product.name} className="product-img" />
                  {product.badge && <span className="product-badge">{product.badge}</span>}
                </div>
                <div className="product-content">
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-desc">{product.description}</p>
                  <div className="product-meta">
                    <span className="product-weight">Weight: {product.weight}</span>
                    <span className="product-price">{product.price}</span>
                  </div>
                  <a 
                    href={getProductWhatsappLink(product.name)}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-product-whatsapp"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.59 1.981 14.117.957 11.99.957 6.558.957 2.13 5.327 2.128 10.756c-.001 1.681.453 3.32 1.316 4.795l-.997 3.64 3.74-.977zm12.115-4.523c-.3-.15-1.775-.875-2.049-.974-.275-.098-.475-.148-.674.15-.2.299-.775.974-.949 1.173-.175.199-.349.224-.649.075-.3-.15-1.265-.466-2.41-1.487-.893-.795-1.495-1.778-1.67-2.078-.175-.3-.018-.462.13-.61.135-.133.3-.349.45-.523.15-.174.2-.299.3-.499.1-.2.05-.375-.025-.524-.075-.15-.674-1.62-.924-2.22-.244-.589-.493-.51-.674-.519-.172-.008-.371-.01-.57-.01-.2 0-.524.074-.798.373-.275.3-1.047 1.022-1.047 2.492 0 1.47 1.071 2.888 1.22 3.088.15.199 2.107 3.218 5.104 4.512.713.308 1.27.492 1.704.63.717.228 1.369.196 1.885.119.574-.085 1.775-.726 2.024-1.397.25-.671.25-1.246.175-1.397-.075-.15-.275-.249-.575-.399z"/>
                    </svg>
                    Order via WhatsApp
                  </a>
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

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h3 className="footer-logo">Deccan<span>Spices</span></h3>
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
    </div>
  )
}

export default App
