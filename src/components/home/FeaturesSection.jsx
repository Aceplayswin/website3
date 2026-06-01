import React from 'react';
import { useColors } from '../../hooks/useColors';
import { FONTS } from '../../constants/theme';
import { useSite } from "../../context/SiteContext";

const features = [
  {
    title: 'Fast Withdrawal',
    num: '01',
    color: '#a78bfa',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z'
  },
  {
    title: 'Instant Deposit',
    num: '02',
    color: '#22d3ee',
    icon: 'M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z'
  },
  {
    title: '1-Click Signup',
    num: '03',
    color: '#34d399',
    icon: 'M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'
  },
  {
    title: 'Trusted Platform',
    num: '04',
    color: '#fbbf24',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
  }
];

const FeaturesSection = () => {
  const COLORS = useColors();
  const { accountInfo } = useSite();

  return (
    <section className="mt-7 mb-7 px-4 md:px-0 max-w-[1400px] mx-auto w-full">
      {/* Header aligned with other sections */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2 text-xl tracking-[1.5px] text-white" style={{ fontFamily: FONTS.head || "'Bebas Neue', sans-serif" }}>
            <div className="w-1 h-5 rounded-sm" style={{ background: COLORS.brand }}></div>
            Why Choose {accountInfo?.service_site_name || 'velplay365'}?
          </div>
          <div className="text-[10px] font-bold uppercase tracking-[1.5px] pl-3 text-white/50" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            Why We're Different
          </div>
        </div>
      </div>

      {/* Grid of clean, horizontal cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {features.map((f, i) => (
          <div
            key={i}
            className="group flex items-center justify-between p-4 rounded-lg bg-[#141414] border border-white/5 hover:border-white/20 transition-all duration-300 overflow-hidden relative cursor-default"
          >
            {/* Hover subtle glow */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
              style={{ background: `linear-gradient(90deg, transparent, ${f.color}10)` }}
            ></div>
            
            <div className="flex flex-col gap-1 relative z-10">
              <span 
                className="text-3xl font-black opacity-20 group-hover:opacity-100 transition-opacity duration-300 leading-none tracking-tighter"
                style={{ fontFamily: FONTS.head || "'Bebas Neue', sans-serif", color: f.color }}
              >
                {f.num}
              </span>
              <h3 
                className="text-sm font-bold uppercase tracking-[1px] text-white/80 group-hover:text-white transition-colors duration-300"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                {f.title}
              </h3>
            </div>

            <div className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center bg-black/40 border border-white/5 group-hover:bg-black/60 group-hover:scale-110 transition-all duration-300 shadow-inner">
              <svg viewBox="0 0 24 24" className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity duration-300" style={{ fill: f.color }}>
                <path d={f.icon} />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
