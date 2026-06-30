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
    <div className="toast-container" style={{ position: 'fixed', bottom: '24px', left: '24px', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {toasts.map((toast) => (
        <div key={toast.id} className="live-toast" style={{
          animation: 'toastEntrance 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
          background: 'linear-gradient(145deg, rgba(255,255,255,0.98), rgba(249,250,251,0.95))',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          borderLeft: '4px solid #D4AF37',
          borderRadius: '12px',
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          boxShadow: '0 12px 30px -8px rgba(212, 175, 55, 0.25), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          minWidth: '260px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle shine effect over the toast */}
          <div style={{
            position: 'absolute', top: 0, left: '-100%', width: '50%', height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
            transform: 'skewX(-20deg)',
            animation: 'toastShine 3s infinite'
          }}></div>

          <div style={{
             width: '42px', height: '42px', borderRadius: '50%',
             background: 'linear-gradient(135deg, #FDE68A 0%, #D4AF37 100%)',
             display: 'flex', alignItems: 'center', justifyContent: 'center',
             color: '#fff', fontSize: '20px', 
             boxShadow: '0 4px 10px rgba(212, 175, 55, 0.4)',
             flexShrink: 0
          }}>
             <i className={toast.icon}>🎉</i>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <div style={{ fontSize: '13px', color: '#4B5563', whiteSpace: 'nowrap' }}>
                <strong style={{ color: '#111827', fontWeight: '700' }}>{toast.name}</strong> won
              </div>
              <div style={{ 
                display: 'flex', alignItems: 'center', gap: '4px',
                background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)',
                color: '#EF4444', fontSize: '9px', fontWeight: 800, 
                padding: '2px 6px', borderRadius: '10px', textTransform: 'uppercase', letterSpacing: '0.5px'
              }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#EF4444', animation: 'pulseDot 1.5s infinite' }}></span>
                LIVE
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <div style={{ 
                fontFamily: 'var(--font-mono, "Inter", sans-serif)', fontSize: '18px', fontWeight: 900, 
                background: 'linear-gradient(to right, #059669, #10B981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                lineHeight: 1, letterSpacing: '-0.5px'
              }}>
                ₹{toast.amount}
              </div>
              <div style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                in {toast.game}
              </div>
            </div>
          </div>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes toastEntrance {
              0% { opacity: 0; transform: translateX(-40px) scale(0.9); }
              100% { opacity: 1; transform: translateX(0) scale(1); }
            }
            @keyframes toastShine {
              0% { left: -100% }
              20% { left: 200% }
              100% { left: 200% }
            }
            @keyframes pulseDot {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.4; transform: scale(0.8); }
            }
          `}} />
        </div>
      ))}
    </div>
  );
};

export default LiveToasts;
