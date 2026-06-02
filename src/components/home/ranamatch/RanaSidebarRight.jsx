import React from 'react';
import { useSite } from "../../../context/SiteContext";

const RanaSidebarRight = () => {
  const { accountInfo, setShowLogin, setShowRegister } = useSite();
  const isLoggedIn = !!(accountInfo?.account_id && accountInfo.account_id !== "guest" && localStorage.getItem("auth_secret_key") && localStorage.getItem("auth_secret_key") !== "guest");

  const recentWins = [
    { avatar: "👨", user: "Vikram_99", game: "Crazy Time", amount: "₹45,200" },
    { avatar: "👩", user: "Neha_S", game: "Lightning Roulette", amount: "₹18,500" },
    { avatar: "🧑", user: "Amit_K", game: "Aviator", amount: "₹1.2L" },
    { avatar: "👨", user: "Rahul_B", game: "Teen Patti Live", amount: "₹32,000" },
    { avatar: "👩", user: "Sana_M", game: "Blackjack", amount: "₹24,800" },
    { avatar: "🧑", user: "Arjun_P", game: "Dragon Tiger", amount: "₹67,400" },
    { avatar: "👨", user: "Karan_V", game: "Roulette", amount: "₹9,600" },
    { avatar: "👩", user: "Priya_N", game: "Baccarat", amount: "₹28,900" },
    { avatar: "🧑", user: "Nikhil_R", game: "Crash Games", amount: "₹14,750" },
    { avatar: "👨", user: "Mehul_T", game: "Live Casino", amount: "₹52,100" },
  ];

  return (
    <aside className="sidebar-right">
      <div className="auth-panel">
        {!isLoggedIn ? (
          <>
            <div className="auth-tabs">
              <div className="auth-tab active" onClick={() => setShowLogin(true)}>Log In</div>
              <div className="auth-tab" onClick={() => setShowRegister(true)}>Sign Up</div>
            </div>
            <div className="auth-body">
              <div className="form-group">
                <label className="form-label">Ready to win?</label>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>Log in to access your account or register to get started.</p>
              </div>
              <button className="btn btn-brand btn-full" onClick={() => setShowLogin(true)}>Login Securely</button>
            </div>
          </>
        ) : (
          <>
            <div className="auth-tabs">
              <div className="auth-tab active" style={{ width: '200%' }}>My Profile</div>
            </div>
            <div className="auth-body">
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>👤</div>
                <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '18px', color: '#fff', margin: 0 }}>{accountInfo?.account_username}</h3>
                <p style={{ color: 'var(--brand)', fontFamily: "'Rajdhani', sans-serif", fontSize: '14px', fontWeight: 'bold' }}>₹{accountInfo?.account_balance || '0.00'}</p>
              </div>
              <button className="btn btn-outline btn-full" onClick={() => {
                localStorage.removeItem("auth_secret_key");
                window.location.reload();
              }}>Log Out</button>
            </div>
          </>
        )}
      </div>

      <div className="side-section">
        <div className="side-title">🏆 Recent Big Wins</div>
        <div className="wins-list">
          {recentWins.map((win, index) => (
            <div className="win-item" key={`${win.user}-${index}`}>
              <div className={`win-avatar gt-${(index % 4) + 1}`}>{win.avatar}</div>
              <div className="win-info">
                <div className="win-user">{win.user}</div>
                <div className="win-game">{win.game}</div>
              </div>
              <div className="win-amount">{win.amount}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="app-banner">
        <div className="app-icon">📱</div>
        <h4>Download App</h4>
        <p>Get the ultimate betting experience on your mobile</p>
        <div className="app-btns">
          <button className="app-btn">
            <span>🤖</span>
            <div className="app-btn-text">
              <span className="sub">Download for</span>
              <span className="name">Android</span>
            </div>
          </button>
          <button className="app-btn">
            <span>🍏</span>
            <div className="app-btn-text">
              <span className="sub">Download for</span>
              <span className="name">iOS</span>
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default RanaSidebarRight;
