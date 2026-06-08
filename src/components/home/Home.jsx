"use client"

import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useSite } from "../../context/SiteContext"
import RanaHeader from "./ranamatch/RanaHeader"
import RanaSidebarLeft from "./ranamatch/RanaSidebarLeft"
import RanaSidebarRight from "./ranamatch/RanaSidebarRight"
import RanaMainContent from "./ranamatch/RanaMainContent"
import AuthModalHost from "../common/AuthModalHost"
import {
  FaBars,
  FaDice,
  FaFutbol,
  FaGift,
  FaHeadset,
  FaHome,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa"
import '../../assets/css/ranamatch.css'

function Home() {
  const { accountInfo, setShowLogin, setShowRegister } = useSite()
  const location = useLocation()
  const [mobilePanel, setMobilePanel] = useState(null)
  const isLoggedIn = !!(
    accountInfo?.account_id &&
    accountInfo.account_id !== "guest" &&
    localStorage.getItem("auth_secret_key") &&
    localStorage.getItem("auth_secret_key") !== "guest"
  )

  const formatBalance = (value) =>
    Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

  const quickLinks = [
    ["My Account", "#", () => setMobilePanel("account")],
    ["Deposit", "/deposit"],
    ["Withdrawal", "/withdraw"],
    ["Bet History", "/betting-profit-loss"],
    ["Promotions", "/promotion"],
    ["Bonus", "/bonus"],
    ["VIP Club", "#"],
    ["Refer a Friend", "/inviteandearn"],
    ["Rules", "/rules-regulation"],
    ["Exclusion", "/exclusion"],
    ["Privacy", "/privacy-policy"],
    ["Responsible", "/responsible-gambling"],
    ["Support", "/support"],
  ]

  const bottomLinks = [
    { label: "Casino", icon: <FaDice />, path: "/casino" },
    { label: "Sports", icon: <FaFutbol />, path: "/#live" },
    { label: "Home", icon: <FaHome />, path: "/", isHome: true },
    { label: "Promos", icon: <FaGift />, path: "/promotion" },
    { label: "Support", icon: <FaHeadset />, path: "/support" },
  ]

  useEffect(() => {
    // Apply light theme globally for the home page
    document.documentElement.classList.add('light');
    // Cleanup on unmount
    return () => {
      document.documentElement.classList.remove('light');
    };
  }, []);

  useEffect(() => {
    if (mobilePanel) {
      document.body.classList.add("mobile-home-menu-open")
    } else {
      document.body.classList.remove("mobile-home-menu-open")
    }

    return () => document.body.classList.remove("mobile-home-menu-open")
  }, [mobilePanel])

  const closeMobilePanel = () => setMobilePanel(null)
  const isBottomActive = (path) => {
    if (path === "/#live") return location.pathname === "/" && location.hash === "#live"
    if (path === "/") return location.pathname === "/" && !location.hash
    return location.pathname === path
  }

  return (
    <div className="rana-layout">
      <AuthModalHost />
      <RanaHeader
        onOpenMobileMenu={() => setMobilePanel("menu")}
        onOpenMobileAccount={() => setMobilePanel("account")}
      />
      <div className="page-wrap">
        <RanaSidebarLeft />
        <RanaMainContent />
        <RanaSidebarRight />
      </div>

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
            <div
              className="mobile-drawer-body"
              onClick={(event) => {
                if (event.target.closest("[data-keep-drawer]")) return
                if (event.target.closest("a, button")) {
                  window.setTimeout(closeMobilePanel, 120)
                }
              }}
            >
              {mobilePanel === "menu" ? (
                <div className="mobile-quick-panel">
                  <div className="mobile-quick-card is-primary">
                    <FaBars />
                    <div>
                      <strong>Quick Links</strong>
                      <span>Fast access to wallet, bets, bonus and support.</span>
                    </div>
                  </div>
                  <div className="mobile-quick-grid">
                    {quickLinks.map(([label, path, action]) => (
                      action ? (
                        <button type="button" key={label} onClick={action} data-keep-drawer="true">
                          {label}
                        </button>
                      ) : (
                        <Link key={label} to={path}>{label}</Link>
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
                        <Link to="/transaction">Transaction</Link>
                        <Link to="/betting-profit-loss">Bet History</Link>
                        <Link to="/inviteandearn">Refer & Earn</Link>
                        <Link to="/support?view=history">My Tickets</Link>
                      </div>
                      <button
                        type="button"
                        className="mobile-logout-btn"
                        onClick={() => {
                          localStorage.removeItem("auth_secret_key")
                          localStorage.removeItem("account_id")
                          window.location.reload()
                        }}
                      >
                        Log Out
                      </button>
                    </>
                  ) : (
                    <div className="mobile-login-card">
                      <FaUserCircle />
                      <strong>Account Access</strong>
                      <span>Login or create your account to view wallet details.</span>
                      <div>
                        <button type="button" onClick={() => setShowLogin(true)}>Log In</button>
                        <button type="button" onClick={() => setShowRegister(true)}>Sign Up</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default Home
