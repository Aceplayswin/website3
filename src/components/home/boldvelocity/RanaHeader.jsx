import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSite } from "../../../context/SiteContext";
import { URL as BASE_URL } from "../../../utils/constants";
import { FaBars, FaBell, FaDice, FaFutbol, FaGem, FaGift, FaHeadset, FaHome, FaMoon, FaSun, FaTimes, FaUserCircle } from "react-icons/fa";
import { useTheme } from "../../../context/ThemeContext";
import { usePWAInstall } from "../../../hooks/usePWAInstall";

const RanaHeader = () => {
  const { accountInfo, activateDemoMode, setShowLogin, setShowRegister, logout } = useSite();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { isInstalled, isInstallable, installApp, platform } = usePWAInstall();
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobilePanel, setMobilePanel] = useState(null);
  const isLoggedIn = !!(accountInfo?.account_id && accountInfo.account_id !== "guest" && localStorage.getItem("auth_secret_key") && localStorage.getItem("auth_secret_key") !== "guest");
  const toNumber = (value) => Number.parseFloat(value || 0) || 0;
  const remainingWager = toNumber(accountInfo?.tbl_requiredplay_balance);
  const casinoBonus = Math.max(toNumber(accountInfo?.tbl_bonus_balance), toNumber(accountInfo?.account_casino_bonus));
  const sportsBonus = Math.max(toNumber(accountInfo?.tbl_sports_bonus), toNumber(accountInfo?.account_sports_bonus));
  const activeBonus = casinoBonus + sportsBonus;
  const isWagering = isLoggedIn && (remainingWager > 0.1 || activeBonus > 0.1);
  const wagerRequired = toNumber(accountInfo?.wagering_required);
  const wagerCompleted = toNumber(accountInfo?.wagering_completed);
  const wagerPct = isWagering && wagerRequired > 0
    ? Math.min(100, Math.round((wagerCompleted / wagerRequired) * 100))
    : 0;
  const wagerStatusText = wagerRequired > 0
    ? `₹${wagerCompleted.toLocaleString("en-IN")} / ₹${wagerRequired.toLocaleString("en-IN")}`
    : `₹${remainingWager.toLocaleString("en-IN")} left`;
  const getAccountValue = (...keys) => {
    for (const key of keys) {
      const value = accountInfo?.[key];
      if (value !== undefined && value !== null && String(value).trim() !== "") return value;
    }
    return "Not added";
  };
  const openProfileLink = (path) => {
    setProfileOpen(false);
    navigate(path);
  };
  const handleGetApp = (event) => {
    event?.preventDefault();

    if (isInstalled) {
      window.open(window.location.origin, '_blank', 'noopener,noreferrer');
      return;
    }

    if (isInstallable) {
      installApp();
      return;
    }

    if (platform === 'android') {
      window.open(accountInfo?.service_app_download_url || '/boldvelocity.apk', '_blank', 'noopener,noreferrer');
      return;
    }

    window.open(window.location.origin, '_blank', 'noopener,noreferrer');
  };
  const profileDetails = [
    { label: "User ID", value: accountInfo?.account_id || localStorage.getItem("account_id") || "Not added" },
    { label: "Username", value: getAccountValue("account_username", "username", "user_name") },
    { label: "Email", value: getAccountValue("account_email", "email", "user_email", "account_mail") },
    { label: "Mobile", value: getAccountValue("account_mobile", "mobile", "user_mobile", "account_phone", "phone") },
  ];
  const mobileProfileDetails = [
    { label: "Username", value: getAccountValue("account_username", "username", "user_name") },
    { label: "User ID", value: accountInfo?.account_id || localStorage.getItem("account_id") || "Not added" },
    { label: "Mobile", value: getAccountValue("account_mobile", "mobile", "user_mobile", "account_phone", "phone") },
    { label: "Email", value: getAccountValue("account_email", "email", "user_email", "account_mail") },
  ];
  const profileLinks = [
    { label: "My Tickets", path: "/support?view=history" },
    { label: "Change Password", path: "/change-password" },
    { label: "Refer & Earn", path: "/inviteandearn" },
    { label: "Transaction", path: "/transaction" },
    { label: "Bet History", path: "/betting-profit-loss" },
  ];
  const profileRealBalance = toNumber(accountInfo?.account_balance);
  const profileCasinoBalance = toNumber(accountInfo?.account_casino_bonus);
  const profileSportsBalance = toNumber(accountInfo?.account_sports_bonus);
  const profileApiTotalBalance = toNumber(accountInfo?.account_total_balance);
  const profileTotalBalance = profileApiTotalBalance > 0
    ? profileApiTotalBalance
    : profileRealBalance + profileCasinoBalance + profileSportsBalance;
  const profileBalances = [
    { label: "Real", value: profileRealBalance },
    { label: "Casino", value: profileCasinoBalance },
    { label: "Sports", value: profileSportsBalance },
    { label: "Total", value: profileTotalBalance },
  ];
  const mobileQuickLinks = [
    { label: "My Account", action: () => setMobilePanel("account") },
    { label: "Deposit", path: "/deposit" },
    { label: "Withdrawal", path: "/withdraw" },
    { label: "Bet History", path: "/betting-profit-loss" },
    { label: "Promotions", path: "/promotion" },
    { label: "Bonus", path: "/bonus" },
    { label: "VIP Club", path: "#" },
    { label: "Refer a Friend", path: "/inviteandearn" },
    { label: "Rules", path: "/rules-regulation" },
    { label: "Exclusion", path: "/exclusion" },
    { label: "Privacy", path: "/privacy-policy" },
    { label: "Responsible", path: "/responsible-gambling" },
    { label: "Support", path: "/support" },
  ];
  const rightMenuLinks = [
    { label: "My Account", path: "/" },
    { label: "Deposit", path: "/deposit" },
    { label: "Withdrawal", path: "/withdraw" },
    { label: "Bet History", path: "/betting-profit-loss" },
    { label: "Promotions", path: "/promotion" },
    { label: "Bonus", path: "/bonus" },
    { label: "VIP Club", path: "/" },
    { label: "Refer a Friend", path: "/inviteandearn" },
    { label: "Rules", path: "/rules-regulation" },
    { label: "Exclusion", path: "/exclusion" },
    { label: "Privacy", path: "/privacy-policy" },
    { label: "Responsible", path: "/responsible-gambling" },
    { label: "Support", path: "/support" },
  ];
  const latestNewsItems = [
    "New Live Casino Games launching in 7 days",
    "Mega Slots Tournament starts in 10 days",
    "Weekly Cashback update version 2.0 releasing soon",
    "New Bonus System upgrade in 15 days",
  ];
  const isHomeActive = location.pathname === "/" && !location.hash;
  const isHashActive = (hash) => location.pathname === "/" && location.hash === hash;
  const isPathActive = (path) => location.pathname === path;
  const bottomLinks = [
    { label: "Casino", icon: <FaDice />, path: "/casino" },
    { label: "Sports", icon: <FaFutbol />, path: "/#live" },
    { label: "Home", icon: <FaHome />, path: "/", isHome: true },
    { label: "Promos", icon: <FaGift />, path: "/promotion" },
    { label: "Support", icon: <FaHeadset />, path: "/support" },
  ];
  const casinoCategoryLinks = [
    { label: "Lottery", icon: "🎟️", path: "/lottery" },
    { label: "Crash Games", icon: "🚀", path: "/crash-games" },
    { label: "Roulette", icon: "🎡", path: "/roulette" },
    { label: "Blackjack", icon: "🃏", path: "/blackjack" },
    { label: "Baccarat", icon: "💎", path: "/baccarat" },
    { label: "Dragon Tiger", icon: "🐯", path: "/dragon-tiger" },
    { label: "Teen Patti", icon: "🎴", path: "/teen-patti" },
    { label: "Poker", icon: "♠️", path: "/poker" },
    { label: "Game Shows", icon: "📺", path: "/game-shows" },
    { label: "Andar Bahar", icon: "🃏", path: "/andar-bahar" },
  ];
  const navClass = (active) => (active ? "active" : undefined);
  const catClass = (path) => `cat-item${isPathActive(path) ? " active" : ""}`;
  const goCategory = (event, path) => {
    event.preventDefault();
    navigate(path);
  };
  const goHomeSection = (event, hash) => {
    event.preventDefault();
    navigate(`/${hash}`);
    window.setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };
  const isMobileViewport = () => window.matchMedia?.("(max-width: 820px)").matches;
  const formatBalance = (value) =>
    Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  const openMobilePanel = (panel) => {
    setMenuOpen(false);
    setProfileOpen(false);
    setMobilePanel(panel);
  };
  const closeMobilePanel = () => setMobilePanel(null);
  const handleProfileClick = (event) => {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    if (isMobileViewport()) {
      openMobilePanel("account");
      return;
    }

    setProfileOpen((prev) => !prev);
  };
  const handleMobileMenuClick = (event) => {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    if (isMobileViewport()) {
      openMobilePanel("menu");
      return;
    }

    setMenuOpen((prev) => !prev);
  };
  const handleMobileNavigate = (path) => {
    closeMobilePanel();
    if (path && path !== "#") navigate(path);
  };
  const handleRightMenuNavigate = (path) => {
    setMenuOpen(false);
    if (path && path !== "#") navigate(path);
  };
  const handleRightMenuClick = (event) => {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    setProfileOpen(false);
    setMenuOpen((prev) => !prev);
  };
  const handleSignOut = () => {
    setProfileOpen(false);
    setMenuOpen(false);
    if (typeof logout === "function") {
      logout();
      return;
    }
    localStorage.removeItem("auth_secret_key");
    localStorage.removeItem("account_id");
    setShowLogin(true);
  };
  const isBottomActive = (path) => {
    if (path === "/#live") return location.pathname === "/" && location.hash === "#live";
    if (path === "/") return location.pathname === "/" && !location.hash;
    return location.pathname === path;
  };

  useEffect(() => {
    if (mobilePanel) {
      document.body.classList.add("mobile-home-menu-open");
    } else {
      document.body.classList.remove("mobile-home-menu-open");
    }

    return () => document.body.classList.remove("mobile-home-menu-open");
  }, [mobilePanel]);

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
      {/* NAV */}
      <nav className="nav">
        <Link to="/" className="nav-logo">
          <img
            src={getSafeLogoUrl(accountInfo?.service_site_logo)}
            alt={accountInfo?.service_site_name || "Logo"}
            style={{ height: '24px', width: 'auto' }}
            onError={(e) => { e.target.src = "/banner/image.png"; }}
          />
        </Link>
        <div className="nav-links">
          <Link to="/" className={navClass(isHomeActive)}>Home</Link>
          <Link to="/#live" className={navClass(isHashActive("#live"))} onClick={(e) => goHomeSection(e, "#live")}>Sports</Link>
          <Link to="/casino" className={navClass(isPathActive("/casino"))}>Casino</Link>
          <Link to="/#slots" className={navClass(isHashActive("#slots"))}>Slots</Link>
          <Link to="/#fantasy-games" className={navClass(isHashActive("#fantasy-games"))}>Fantasy</Link>
          <Link to="/promotion" className={navClass(isPathActive("/promotion"))}>Promotions</Link>
        </div>
          <div className="mobile-header-actions">
            {!isLoggedIn ? (
              <div className="mobile-auth-actions">
                {localStorage.getItem("auth_secret_key") === "guest" && (
                  <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', marginRight: '4px' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5"></span>
                    DEMO
                  </div>
                )}
                <button type="button" onClick={() => setShowLogin(true)}>Login</button>
                <button type="button" onClick={() => setShowRegister(true)}>Sign Up</button>
              </div>
            ) : (
              <div className="mobile-wallet-actions">
                <button type="button" onClick={() => navigate("/deposit")}>Deposit</button>
                <button type="button" onClick={() => navigate("/withdraw")}>Withdraw</button>
                <button
                  type="button"
                  className="mobile-profile-open"
                  onTouchEnd={handleProfileClick}
                  onPointerUp={handleProfileClick}
                  onClick={handleProfileClick}
                  aria-label="Open profile"
                >
                  <FaUserCircle />
                </button>
                {profileOpen && (
                  <div className="mobile-header-popover mobile-profile-popover">
                    <div className="mobile-profile-popover-head">
                      <strong>{accountInfo?.account_username || "User"}</strong>
                      <span>My Profile</span>
                    </div>
                    {profileLinks.map((item) => (
                      <button type="button" key={item.path} onClick={() => openProfileLink(item.path)}>
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            <button
              type="button"
              className="mobile-header-menu-btn"
              onTouchEnd={handleMobileMenuClick}
              onPointerUp={handleMobileMenuClick}
              onClick={handleMobileMenuClick}
              aria-label="Open quick links"
            >
              <FaBars />
              <span>Menu</span>
            </button>
            {menuOpen && (
              <div className="mobile-header-popover">
                <button type="button" onClick={() => { setMenuOpen(false); navigate("/"); }}>Home</button>
                <button type="button" onClick={() => { setMenuOpen(false); navigate("/casino"); }}>Casino</button>
                <button type="button" onClick={() => { setMenuOpen(false); navigate("/promotion"); }}>Promotions</button>
                <button type="button" onClick={() => { setMenuOpen(false); navigate("/support"); }}>Support</button>
              </div>
            )}
          </div>
          <div className="nav-right">
            {isLoggedIn ? (
              <>
                <div className="balance-badge">
                  <i className="ti ti-wallet"></i>
                  ₹{formatBalance(accountInfo?.account_balance)}
                </div>
                <button className="btn-ghost" onClick={() => navigate("/deposit")}>Deposit</button>
                <div style={{ width: '1px', height: '24px', background: 'rgba(14,11,37,0.1)', margin: '0 4px' }}></div>
                <div 
                  style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--gold-dim)', color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', cursor: 'pointer' }}
                  onClick={handleProfileClick}
                >
                  <FaUserCircle />
                </div>
                {profileOpen && (
                  <div className="header-mini-popover header-profile-popover" style={{ top: '60px', right: '0' }}>
                    <button type="button" className="header-mini-close" onClick={() => setProfileOpen(false)} aria-label="Close profile menu">
                      <FaTimes />
                    </button>
                    <div className="header-profile-card-head">
                      <div className="header-profile-avatar">
                        {(accountInfo?.account_username || "U").slice(0, 1).toUpperCase()}
                      </div>
                      <div>
                        <div className="header-mini-name">{accountInfo?.account_username || "User"}</div>
                        <div className="header-mini-sub">My Profile</div>
                      </div>
                    </div>
                    <div className="header-profile-balance-grid">
                      {profileBalances.map((item) => (
                        <div className="header-profile-balance-tile" key={item.label}>
                          <span>{item.label}</span>
                          <strong>{"\u20B9"}{formatBalance(item.value)}</strong>
                        </div>
                      ))}
                    </div>
                    <div className="header-profile-links">
                      {profileLinks.map((item) => (
                        <button type="button" key={item.path} onClick={() => openProfileLink(item.path)}>
                          {item.label}
                        </button>
                      ))}
                    </div>
                    <button type="button" className="header-profile-signout" onClick={handleSignOut}>
                      Sign Out
                    </button>
                  </div>
                )}
                <div className="header-menu-wrap">
                  <button
                    type="button"
                    className={`header-menu-trigger ${menuOpen ? "active" : ""}`}
                    onClick={handleRightMenuClick}
                    aria-label="Open menu"
                    aria-expanded={menuOpen}
                  >
                    <FaBars />
                  </button>
                  {menuOpen && (
                    <div className="header-mini-popover header-menu-popover right-menu-popover">
                      <button type="button" className="header-mini-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                        <FaTimes />
                      </button>
                      <div className="header-menu-title">Quick Menu</div>
                      <button
                        type="button"
                        className="right-menu-get-app"
                        onClick={(event) => {
                          setMenuOpen(false);
                          handleGetApp(event);
                        }}
                      >
                        Get App
                      </button>
                      <div className="right-menu-actions">
                        {rightMenuLinks.map((item) => (
                          <button type="button" key={`${item.label}-${item.path}`} onClick={() => handleRightMenuNavigate(item.path)}>
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <button className="btn-ghost" onClick={() => setShowLogin(true)}>Log In</button>
                <button className="btn-primary" onClick={() => setShowRegister(true)}>Sign Up</button>
              </>
            )}
          </div>
      </nav>

      {/* SPORT RAIL */}
      <div className="sport-rail">
        <div className="cat-nav-inner">
        {casinoCategoryLinks.map((item) => (
          <a
            key={item.path}
            href="#"
            className={`sport-tab ${isPathActive(item.path) ? "active" : ""}`}
            onClick={(event) => goCategory(event, item.path)}
          >
            <span className="sport-tab-emoji" aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
        </div>
      </div>
      {mobilePanel && (
        <div className={`mobile-home-drawer is-${mobilePanel}`} role="dialog" aria-modal="true">
          <button type="button" className="mobile-drawer-backdrop" onClick={closeMobilePanel} aria-label="Close mobile menu" />
          <section className="mobile-drawer-panel">
            <div className="mobile-drawer-head">
              <div>
                <span>{mobilePanel === "menu" ? "Quick Navigation" : "Account Desk"}</span>
                <strong>{mobilePanel === "menu" ? "Browse Menu" : accountInfo?.account_username || "My Account"}</strong>
              </div>
              <button type="button" onClick={closeMobilePanel} aria-label="Close">
                <FaTimes />
              </button>
            </div>
            <div className="mobile-drawer-body">
              {mobilePanel === "menu" ? (
                <div className="mobile-quick-panel">
                  <div className="mobile-quick-grid">
                    {mobileQuickLinks.map((item) => (
                      item.action ? (
                        <button type="button" key={item.label} onClick={item.action} data-keep-drawer="true">
                          {item.label}
                        </button>
                      ) : (
                        <button type="button" key={item.label} onClick={() => handleMobileNavigate(item.path)}>
                          {item.label}
                        </button>
                      )
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mobile-account-panel">
                  {isLoggedIn ? (
                    <>
                      <div className="mobile-account-hero">
                        <FaUserCircle />
                        <span>My Profile</span>
                        <strong>{accountInfo?.account_username || "User"}</strong>
                      </div>
                      <div className="mobile-account-details">
                        {mobileProfileDetails.map((item) => (
                          <div key={item.label}>
                            <span>{item.label}</span>
                            <strong>{item.value}</strong>
                          </div>
                        ))}
                      </div>
                      <div className="mobile-wallet-grid">
                        {[
                          ["Real Balance", accountInfo?.account_balance],
                          ["Casino Bonus", accountInfo?.account_casino_bonus],
                          ["Sports Bonus", accountInfo?.account_sports_bonus],
                          ["Total Balance", accountInfo?.account_total_balance ?? accountInfo?.account_balance],
                        ].map(([label, value]) => (
                          <div key={label} className="mobile-wallet-tile">
                            <span>{label}</span>
                            <strong><small>₹</small>{formatBalance(value)}</strong>
                          </div>
                        ))}
                      </div>
                      <div className="mobile-profile-links">
                        {profileLinks.map((item) => (
                          <button type="button" key={item.path} onClick={() => handleMobileNavigate(item.path)}>
                            {item.label}
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        className="mobile-logout-btn"
                        onClick={() => {
                          localStorage.removeItem("auth_secret_key");
                          localStorage.removeItem("account_id");
                          window.location.reload();
                        }}
                      >
                        Log Out
                      </button>
                    </>
                  ) : localStorage.getItem("auth_secret_key") === "guest" ? (
                    <div className="mobile-login-card" style={{ background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                      <FaGem style={{ color: '#34d399', fontSize: '2rem' }} className="animate-pulse" />
                      <strong>Demo Mode Active</strong>
                      <span>You are exploring the site in Demo Mode. Login to play with real money.</span>
                      <div>
                        <button type="button" onClick={() => { closeMobilePanel(); setShowLogin(true); }}>Log In</button>
                        <button type="button" onClick={() => { closeMobilePanel(); setShowRegister(true); }}>Sign Up</button>
                      </div>
                    </div>
                  ) : (
                    <div className="mobile-login-card">
                      <FaUserCircle />
                      <strong>Account Access</strong>
                      <span>Login or create your account to view wallet details.</span>
                      <div>
                        <button type="button" onClick={() => { closeMobilePanel(); setShowLogin(true); }}>Log In</button>
                        <button type="button" onClick={() => { closeMobilePanel(); setShowRegister(true); }}>Sign Up</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        </div>
      )}
      <nav className="mobile-home-dock" aria-label="Mobile bottom navigation">
        {bottomLinks.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`${isBottomActive(item.path) ? "active" : ""}${item.isHome ? " is-home" : ""}`.trim()}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
};

export default RanaHeader;
