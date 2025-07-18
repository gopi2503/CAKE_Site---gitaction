import React, { useState, useEffect, useRef } from 'react';
import cakes from './data';
import CakeCard from './CakeCard';
import VariableProximity from './VariableProximity';
import CircularText from './CircularText';
import './index.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const headerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  // Filter based on search and selected category
  const filteredCakes = cakes.filter(cake => {
    const matchesSearch = cake.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (selectedCategory === 'All') return matchesSearch;
    return cake.category === selectedCategory && matchesSearch;
  });

  // Limit display to 6 cakes only for 'Eggless' category (Cakes)
  const displayedCakes =
    selectedCategory === 'Eggless'
      ? (showAll ? filteredCakes : filteredCakes.slice(0, 6))
      : filteredCakes;

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''} animated-background`}>

      {/* === POPUP === */}
      {showPopup && (
        <div className="popup">
          🎉 10% OFF – <span className="popup-link" onClick={() => setShowModal(true)}>Conditions Apply</span>
        </div>
      )}

      {/* === OFFER MODAL === */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Offer Conditions:</h3>
            <ul>
              <li>Valid only on prepaid UPI orders</li>
              <li>Minimum purchase: ₹500</li>
              <li>Not valid for customized or fondant cakes</li>
              <li>Applicable once per customer</li>
              <li>Limited time only</li>
            </ul>
            <button className="close-modal" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* === CONTACT MODAL (Same style as offer modal) === */}
      {showContactPopup && (
        <div className="modal-overlay" onClick={() => setShowContactPopup(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>📞 Contact & Order</h3>
            
            <div className="contact-modal-content">
              <div className="contact-info-item">
                <div className="contact-icon-small">📱</div>
                <div>
                  <h4>Phone</h4>
                  <a href="tel:9962607717" className="contact-link-small">9962607717</a>
                  <p>Call or WhatsApp</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon-small">📍</div>
                <div>
                  <h4>Location</h4>
                  <p>Aundipatti, Theni District</p>
                  <p>Tamil Nadu, India</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon-small">📧</div>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:spcakesdelight@example.com" className="contact-link-small">spcakesdelight@example.com</a>
                </div>
              </div>

              <div className="payment-delivery-info">
                <div className="info-section">
                  <h4>💳 Payment</h4>
                  <div className="payment-options-compact">
                    <span className="payment-accepted">✅ UPI</span>
                    <span className="payment-accepted">✅ COD</span>
                    <span className="payment-rejected">❌ Cards</span>
                  </div>
                </div>

                <div className="info-section">
                  <h4>🚚 Delivery</h4>
                  <p>Location-based charges</p>
                  <p>Free delivery above ₹1000 (within 5km)</p>
                </div>
              </div>
            </div>

            <div className="contact-modal-footer">
              <button className="close-modal" onClick={() => setShowContactPopup(false)}>Close</button>
              <button className="quick-call-btn" onClick={() => window.open('tel:9962607717')}>
                📞 Call Now
              </button>
              <button className="quick-whatsapp-btn" onClick={() => window.open('https://wa.me/919962607717')}>
                💬 WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === HEADER === */}
      <header className="modern-header" ref={headerRef}>
        <div className="header-left">
          <div className="modern-logo">
            <VariableProximity
              label="SP Cakes & Delight"
              fromFontVariationSettings="'wght' 400"
              toFontVariationSettings="'wght' 900"
              containerRef={headerRef}
              radius={80}
              falloff="exponential"
              className="logo-animation"
            />
          </div>
          
          {/* Navigation Menu - Moved closer to logo */}
          <nav className="header-nav">
            <a href="#all" onClick={() => { setSelectedCategory('All'); setShowAll(false); }}>All Items</a>
            <a href="#cakes" onClick={() => { setSelectedCategory('Eggless'); setShowAll(false); }}>Cakes</a>
            <a href="#brownies" onClick={() => { setSelectedCategory('Brownie'); setShowAll(false); }}>Brownies</a>
            <a href="#cookies" onClick={() => { setSelectedCategory('Cookie'); setShowAll(false); }}>Cookies</a>
          </nav>
        </div>

        {/* Right side controls */}
        <div className="header-controls">
          {/* Enhanced Dark Mode Toggle */}
          <div className="theme-toggle-container">
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className={`theme-toggle ${darkMode ? 'dark' : 'light'}`}
              aria-label="Toggle theme"
            >
              <div className="toggle-track">
                <div className="toggle-thumb">
                  <span className="toggle-icon">
                    {darkMode ? '🌙' : '☀️'}
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Order Now Button */}
          <button 
            onClick={() => setShowContactPopup(true)} 
            className="header-order-btn"
          >
            📞 Order Now
          </button>
        </div>
      </header>

      {/* === MOBILE NAVIGATION === */}
      <nav className="mobile-nav">
        <a href="#all" onClick={() => { setSelectedCategory('All'); setShowAll(false); }}>All Items</a>
        <a href="#cakes" onClick={() => { setSelectedCategory('Eggless'); setShowAll(false); }}>Cakes</a>
        <a href="#brownies" onClick={() => { setSelectedCategory('Brownie'); setShowAll(false); }}>Brownies</a>
        <a href="#cookies" onClick={() => { setSelectedCategory('Cookie'); setShowAll(false); }}>Cookies</a>
      </nav>

      {/* === SEARCH BAR === */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search cakes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <main>
        {/* === BANNER === */}
        <div className="menu-banner">
          <img
            src="/Sp cakes.png"
            alt="Cakes and Cookies Banner"
            className="banner-image"
          />
        </div>

        {/* === CAKE CARDS === */}
        <div className="cake-grid">
          {displayedCakes.map((cake, index) => (
            <CakeCard cake={cake} key={index} />
          ))}
        </div>

        {/* === SHOW ALL BUTTON (only for Cakes) === */}
        {selectedCategory === 'Eggless' && filteredCakes.length > 6 && (
          <div className="show-all-container">
            <button
              className="show-all-btn"
              onClick={() => setShowAll(prev => !prev)}
            >
              {showAll ? 'Show Less' : 'Show All'}
            </button>
          </div>
        )}
      </main>

      {/* === PREMIUM STYLED FOOTER === */}
      <footer className="premium-footer">
        <div className="footer-wave">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
          </svg>
        </div>

        <div className="footer-container">
          {/* Left Section - Circular Text with Enhanced Styling */}
          <div className="footer-left">
            <div className="circular-section">
              <div className="circular-bg-decoration"></div>
              <CircularText 
                text="SP CAKES & DELIGHT • FRESH BAKED DAILY • "
                spinDuration={25}
                onHover="speedUp"
                className="footer-circular-text"
              />
              <div className="circular-center-logo">
                <div className="center-icon">🎂</div>
                <div className="center-text">Fresh<br/>Daily</div>
              </div>
            </div>
          </div>

          {/* Center Section - Enhanced Contact Information */}
          <div className="footer-center">
            <div className="footer-brand">
              <h2 className="footer-brand-name">SP Cakes & Delight</h2>
              <p className="footer-tagline">Crafting Sweet Memories Since Day One</p>
            </div>

            <div className="footer-info-grid">
              <div className="info-card contact-card">
                <div className="card-header">
                  <div className="card-icon">📞</div>
                  <h4>Contact Us</h4>
                </div>
                <div className="card-content">
                  <a href="tel:9962607717" className="contact-link-enhanced">
                    <span className="phone-number">9962607717</span>
                    <span className="call-text">Call Now</span>
                  </a>
                  <p className="contact-note">Available for orders & inquiries</p>
                </div>
              </div>

              <div className="info-card location-card">
                <div className="card-header">
                  <div className="card-icon">📍</div>
                  <h4>Location</h4>
                </div>
                <div className="card-content">
                  <p className="address-line">Aundipatti</p>
                  <p className="address-line">Theni District, Tamil Nadu</p>
                  <p className="service-area">Serving Theni & Surrounding Areas</p>
                </div>
              </div>

              <div className="info-card payment-card">
                <div className="card-header">
                  <div className="card-icon">💳</div>
                  <h4>Payment Options</h4>
                </div>
                <div className="card-content">
                  <div className="payment-options">
                    <div className="payment-item accepted">
                      <span className="payment-icon">✅</span>
                      <span>UPI Payment</span>
                    </div>
                    <div className="payment-item accepted">
                      <span className="payment-icon">✅</span>
                      <span>Cash on Delivery</span>
                    </div>
                    <div className="payment-item not-accepted">
                      <span className="payment-icon">❌</span>
                      <span>Card Payments</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="info-card delivery-card">
                <div className="card-header">
                  <div className="card-icon">🚚</div>
                  <h4>Delivery Info</h4>
                </div>
                                <div className="card-content">
                  <div className="delivery-feature">
                    <span className="feature-icon">🚚</span>
                    <span>Location-based charges</span>
                  </div>
                  <div className="delivery-feature">
                    <span className="feature-icon">🆓</span>
                    <span>Free delivery above ₹1000 (within 5km)</span>
                  </div>
                  <div className="delivery-feature">
                    <span className="feature-icon">⏰</span>
                    <span>Same day delivery available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Enhanced Action Buttons */}
          <div className="footer-right">
            <div className="action-section">
              <h3 className="action-title">Ready to Order?</h3>
              <p className="action-subtitle">Get in touch with us for fresh, delicious cakes!</p>
              
              <div className="action-buttons">
                <a href="tel:9962607717" className="action-btn primary-btn">
                  <span className="btn-icon">📞</span>
                  <div className="btn-content">
                    <div className="btn-text">Call Now</div>
                    <div className="btn-subtext">9962607717</div>
                  </div>
                </a>
                
                <a href="https://wa.me/919962607717" className="action-btn whatsapp-btn" target="_blank" rel="noopener noreferrer">
                  <span className="btn-icon">💬</span>
                  <div className="btn-content">
                    <div className="btn-text">WhatsApp</div>
                    <div className="btn-subtext">Quick Response</div>
                  </div>
                </a>
              </div>

              <div className="business-hours-card">
                <div className="hours-header">
                  <span className="hours-icon">🕒</span>
                  <h5>Business Hours</h5>
                </div>
                <div className="hours-content">
                  <div className="hours-item">
                    <span className="day">Mon - Sat</span>
                    <span className="time">9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="hours-item">
                    <span className="day">Sunday</span>
                    <span className="time">10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="hours-note">
                    <span className="status-dot"></span>
                    <span>Open Now - Ready for Orders!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright-text">
              © 2024 SP Cakes & Delight, Aundipatti, Theni District. All rights reserved.
            </div>
            <div className="quality-badges">
              <div className="badge">
                <span className="badge-icon">🏆</span>
                <span>Premium Quality</span>
              </div>
              <div className="badge">
                <span className="badge-icon">🥇</span>
                <span>Fresh Daily</span>
              </div>
              <div className="badge">
                <span className="badge-icon">❤️</span>
                <span>Made with Love</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

