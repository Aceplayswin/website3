import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSite } from "../../../context/SiteContext";
import { URL as BASE_URL } from "../../../utils/constants";
import { FaBars, FaBell, FaGem, FaMoon, FaSun, FaTimes, FaUserCircle } from "react-icons/fa";
import { useTheme } from "../../../context/ThemeContext";

const RanaHeader = () => {
  const { accountInfo, activateDemoMode } = useSite();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = !!(accountInfo?.account_id && accountInfo.account_id !== "guest" && localStorage.getItem("auth_secret_key") && localStorage.getItem("auth_secret_key") !== "guest");
  const latestNewsItems = [
    "New Live Casino Games launching in 7 days",
    "Mega Slots Tournament starts in 10 days",
    "Weekly Cashback update version 2.0 releasing soon",
    "New Bonus System upgrade in 15 days",
  ];

  // Logo URL Helper - resolve backend relative paths
  const getSafeLogoUrl = (logoPath) => {
    if (!logoPath || logoPath === "/favicon.png" || logoPath.includes('favicon.png')) return "/banner/image.png";
    if (logoPath.startsWith('http') || logoPath.startsWith('data:')) return logoPath;
    const base = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
    const path = logoPath.startsWith('/') ? logoPath : `/${logoPath}`;
    return `${base}${path}`;
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="top-bar">
        <span
          style={{
            background: 'linear-gradient(135deg, #1d4ed8 0%, #172033 100%)',
            color: '#ffffff',
            padding: '4px 10px',
            borderRadius: '999px',
            fontSize: '10px',
            fontWeight: 800,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          Latest News
        </span>
        <div className="marquee-wrap">
          <div className="marquee-inner">
            {latestNewsItems.map((item, index) => (
              <React.Fragment key={index}>
                <span><span className="win">{item}</span></span>
                <span>|</span>
              </React.Fragment>
            ))}
            {latestNewsItems.map((item, index) => (
              <React.Fragment key={`dup-${index}`}>
                <span><span className="win">{item}</span></span>
                <span>|</span>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="top-bar-right">
          <a href="#">📱 App</a>
          <a href="#">🇮🇳 EN</a>
          <a href="#">Help</a>
        </div>
      </div>

      {/* HEADER */}
      <header>
        <div className="header-inner">
          <Link to="/" className="logo">
            <img
              src={getSafeLogoUrl(accountInfo?.service_site_logo)}
              className="logo-img"
              alt={accountInfo?.service_site_name || "Logo"}
              onError={(e) => { e.target.src = "/banner/image.png"; }}
            />
          </Link>
          <nav>
            <Link to="/" className="active">🏠 Home</Link>
            <Link to="#" onClick={(e) => { e.preventDefault(); }}>⚽ Sports</Link>
            <Link to="/casino">🎰 Casino</Link>
            <Link to="/#slots">🎰 Slots</Link>
            <Link to="/#fantasy-games">🎮 Fantasy Games</Link>
            <Link to="/promotion">💰 Promotions</Link>
          </nav>
          <div className="header-cta">
            {isLoggedIn ? (
              <div className="header-cta-group">
                <div className="header-primary-actions">
                  <button className="btn btn-outline" onClick={() => navigate("/deposit")}>Deposit</button>
                  <button className="btn btn-brand" onClick={() => navigate("/withdraw")}>Withdraw</button>
                </div>
                <div className="header-utility-actions">
                  <button
                    type="button"
                    className="header-icon-btn"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    title="Toggle theme"
                  >
                    {theme === "dark" ? <FaSun /> : <FaMoon />}
                  </button>
                  <button
                    type="button"
                    className="header-icon-btn"
                    aria-label="Notifications"
                    title="Notifications"
                  >
                    <FaBell />
                  </button>
                  <div className="header-profile-wrap">
                    <button
                      type="button"
                      className="header-icon-btn"
                      onClick={() => setProfileOpen((prev) => !prev)}
                      aria-label="Profile"
                      title="Profile"
                    >
                      <FaUserCircle />
                    </button>
                    {profileOpen && (
                      <div className="header-mini-popover">
                        <button type="button" className="header-mini-close" onClick={() => setProfileOpen(false)} aria-label="Close profile menu">
                          <FaTimes />
                        </button>
                        <div className="header-mini-name">{accountInfo?.account_username || "User"}</div>
                        <div className="header-mini-sub">My Profile</div>
                        <div className="header-mini-actions">
                          <button type="button" onClick={() => { setProfileOpen(false); navigate("/deposit"); }}>Deposit</button>
                          <button type="button" onClick={() => { setProfileOpen(false); navigate("/withdraw"); }}>Withdraw</button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="header-profile-wrap">
                    <button
                      type="button"
                      className="header-icon-btn"
                      onClick={() => setMenuOpen((prev) => !prev)}
                      aria-label="Menu"
                      title="Menu"
                    >
                      <FaBars />
                    </button>
                    {menuOpen && (
                      <div className="header-mini-popover header-menu-popover">
                        <button type="button" className="header-mini-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                          <FaTimes />
                        </button>
                        <div className="header-mini-actions header-menu-actions">
                          <button type="button" onClick={() => { setMenuOpen(false); navigate("/"); }}>Home</button>
                          <button type="button" onClick={() => { setMenuOpen(false); navigate("/casino"); }}>Casino</button>
                          <button type="button" onClick={() => { setMenuOpen(false); navigate("/promotion"); }}>Promotions</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <button
                className="btn-demo-play"
                onClick={activateDemoMode}
              >
                <FaGem className="demo-icon" />
                <span>Demo Play</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* CATEGORY NAV */}
      <div className="cat-nav">
        <div className="cat-nav-inner">
          <a href="#" className="cat-item active">
            <span className="cat-icon">🎟️</span>
            <span className="cat-label">Lottery</span>
          </a>
          <a href="#" className="cat-item" onClick={() => navigate('/crash-games')}>
            <span className="cat-icon">🚀</span>
            <span className="cat-label">Crash Games</span>
          </a>
          <a href="#" className="cat-item" onClick={() => navigate('/roulette')}>
            <span className="cat-icon">🎡</span>
            <span className="cat-label">Roulette</span>
          </a>
          <a href="#" className="cat-item" onClick={() => navigate('/blackjack')}>
            <span className="cat-icon">🃏</span>
            <span className="cat-label">Blackjack</span>
          </a>
          <a href="#" className="cat-item" onClick={() => navigate('/baccarat')}>
            <span className="cat-icon">💎</span>
            <span className="cat-label">Baccarat</span>
          </a>
          <a href="#" className="cat-item" onClick={() => navigate('/dragon-tiger')}>
            <span className="cat-icon">🐯</span>
            <span className="cat-label">Dragon Tiger</span>
          </a>
          <a href="#" className="cat-item" onClick={() => navigate('/teen-patti')}>
            <span className="cat-icon">🎴</span>
            <span className="cat-label">Teen Patti</span>
          </a>
          <a href="#" className="cat-item" onClick={() => navigate('/poker')}>
            <span className="cat-icon">♠️</span>
            <span className="cat-label">Poker</span>
          </a>
          <a href="#" className="cat-item" onClick={() => navigate('/game-shows')}>
            <span className="cat-icon">📺</span>
            <span className="cat-label">Game Shows</span>
          </a>
          <a href="#" className="cat-item" onClick={() => navigate('/andar-bahar')}>
            <span className="cat-icon">🃏</span>
            <span className="cat-label">Andar Bahar</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default RanaHeader;
