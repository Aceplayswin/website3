import React, { useState, useEffect, useCallback } from 'react';
import { apiGet } from "../../../utils/apiFetch";

const icons = ['ti-gift', 'ti-cup', 'ti-money', 'ti-crown'];

const LiveToasts = () => {
  const [toasts, setToasts] = useState([]);
  const [wins, setWins] = useState([]);

  // Fetch recent wins to simulate live feed
  useEffect(() => {
    let isMounted = true;
    const fetchWins = async () => {
      try {
        const response = await apiGet("route-big-wins", { LIMIT: "20" });
        const result = await response.json();
        if (isMounted && result?.status_code === "success" && Array.isArray(result.data)) {
          setWins(result.data);
        }
      } catch (error) {
        console.error("Failed to load wins for toasts", error);
      }
    };
    fetchWins();
    return () => { isMounted = false; };
  }, []);

  const createToast = useCallback(() => {
    if (wins.length === 0) return;
    
    // Pick a random win
    const randomWin = wins[Math.floor(Math.random() * wins.length)];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    const newToast = {
      id: Date.now() + Math.random(),
      name: randomWin.user,
      amount: randomWin.amount,
      game: randomWin.game,
      icon: randomIcon,
    };

    setToasts((prev) => [...prev, newToast]);

    // Remove toast after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 5200);
  }, [wins]);

  useEffect(() => {
    if (wins.length === 0) return;

    // Initial timeout before starting toasts
    const initialTimeout = setTimeout(() => {
      createToast();
      
      // Random interval between 5-8 seconds
      const interval = setInterval(() => {
        createToast();
      }, Math.random() * 3000 + 5000);
      
      return () => clearInterval(interval);
    }, 2000);

    return () => clearTimeout(initialTimeout);
  }, [wins, createToast]);

  return (
    <div className="toast-container" style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {toasts.map((toast) => (
        <div key={toast.id} className="live-toast" style={{
          animation: 'fadeSlideUp 0.4s ease-out forwards',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(167, 119, 23, 0.2)',
          borderRadius: '12px',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 10px 25px rgba(14, 11, 37, 0.1)',
          minWidth: '240px',
          color: '#040810',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
             width: '36px', height: '36px', borderRadius: '50%',
             background: 'linear-gradient(135deg, rgba(167, 119, 23, 0.15), rgba(167, 119, 23, 0.05))',
             display: 'flex', alignItems: 'center', justifyContent: 'center',
             color: '#C59124', fontSize: '18px', border: '1px solid rgba(167, 119, 23, 0.3)'
          }}>
             <i className={toast.icon}>🎉</i>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{ fontSize: '12px', color: '#4B5563' }}><b style={{ color: '#111827' }}>{toast.name}</b> just won</span>
              <span style={{ background: '#FEE2E2', color: '#DC2626', fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>Live</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '16px', fontWeight: 800, color: '#059669', lineHeight: 1 }}>
              ₹{toast.amount}
            </div>
            <div style={{ fontSize: '10px', color: '#6B7280', marginTop: '2px' }}>
              {toast.game}
            </div>
          </div>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes fadeSlideUp {
              from { opacity: 0; transform: translateY(20px) scale(0.95); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}} />
        </div>
      ))}
    </div>
  );
};

export default LiveToasts;
