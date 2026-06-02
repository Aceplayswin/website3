import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSite } from "../../../context/SiteContext";
import { URL as BASE_URL } from "../../../utils/constants";
import { FaGem } from "react-icons/fa";

const RanaHeader = () => {
  const { accountInfo, activateDemoMode } = useSite();
  const navigate = useNavigate();
  const isLoggedIn = !!(accountInfo?.account_id && accountInfo.account_id !== "guest" && localStorage.getItem("auth_secret_key") && localStorage.getItem("auth_secret_key") !== "guest");

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
        <span>🔴 LIVE: 342 Active Players</span>
        <div className="marquee-wrap">
          <div className="marquee-inner">
            <span>🏆 <span className="win">Raj***singh</span> won ₹24,500 on Cricket</span>
            <span>🎰 <span className="win">Anon***87</span> won ₹8,200 on Teen Patti</span>
            <span>⚽ <span className="win">Mukesh***K</span> won ₹41,000 on IPL Match</span>
            <span>🃏 <span className="win">Priya***N</span> won ₹5,600 on Roulette</span>
            <span>🏏 <span className="win">Vijay***35</span> won ₹18,000 on T20 Live</span>
            <span>🏆 <span className="win">Raj***singh</span> won ₹24,500 on Cricket</span>
            <span>🎰 <span className="win">Anon***87</span> won ₹8,200 on Teen Patti</span>
            <span>⚽ <span className="win">Mukesh***K</span> won ₹41,000 on IPL Match</span>
            <span>🃏 <span className="win">Priya***N</span> won ₹5,600 on Roulette</span> 
            <span>🏏 <span className="win">Vijay***35</span> won ₹18,000 on T20 Live</span>
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
              <>
                <button className="btn btn-outline" onClick={() => navigate("/deposit")}>Deposit</button>
                <button className="btn btn-brand" onClick={() => navigate("/withdraw")}>Withdraw</button>
              </>
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
