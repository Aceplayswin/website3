import React from 'react';
import { Link } from 'react-router-dom';
import { useColors } from '../../../hooks/useColors';
import { FONTS } from '../../../constants/theme';
import { FaTwitter, FaFacebookF, FaInstagram, FaTelegramPlane, FaShieldAlt } from 'react-icons/fa';

const RanaFooter = () => {
  const COLORS = useColors();
  
  return (
    <footer className="relative pt-8 pb-8 md:pt-10 md:pb-6 border-t border-white/10" style={{ backgroundColor: COLORS.bg2 || '#0a0a0a' }}>
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-brand/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Top Grid - Compact Layout */}
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4 mb-8">
          
          {/* Brand & Socials */}
          <div className="w-full md:w-1/3">
            <Link to="/" className="inline-block mb-3">
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-[0.15em] flex items-center" style={{ fontFamily: FONTS.head }}>
                <span style={{ color: COLORS.brand }}>RANA</span>
                <span className="text-white">MATCH</span>
              </h2>
            </Link>
            <p className="text-[9px] md:text-[10px] text-white/50 leading-relaxed mb-4 font-medium max-w-[280px]">
              The elite terminal for online betting & cyber sports. Secured and engineered for maximum performance.
            </p>
            <div className="flex items-center gap-2">
              {[FaTwitter, FaFacebookF, FaInstagram, FaTelegramPlane].map((Icon, i) => (
                <a key={i} href="#" className="w-6 h-6 rounded bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all border border-white/5 hover:border-brand/30">
                  <Icon size={10} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Container */}
          <div className="w-full md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-6">
            
            {/* Casino */}
            <div>
              <h5 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-white border-l-2 pl-2" style={{ borderColor: COLORS.brand }}>Casino</h5>
              <ul className="space-y-2 text-[8px] md:text-[9px] text-white/50 font-bold uppercase tracking-wider">
                <li><Link to="#" className="hover:text-white transition-colors">Slots</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Live Casino</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Crash Games</Link></li>
              </ul>
            </div>

            {/* Sports */}
            <div>
              <h5 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-white border-l-2 pl-2" style={{ borderColor: COLORS.brand }}>Sports</h5>
              <ul className="space-y-2 text-[8px] md:text-[9px] text-white/50 font-bold uppercase tracking-wider">
                <li><Link to="#" className="hover:text-white transition-colors">Cricket</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Football</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Virtuals</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h5 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-white border-l-2 pl-2" style={{ borderColor: COLORS.brand }}>Support & Legal</h5>
              <ul className="space-y-2 text-[8px] md:text-[9px] text-white/50 font-bold uppercase tracking-wider">
                <li><Link to="/support" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/rules-regulation" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Footer Bottom Strip - Ultra Compact */}
        <div className="pt-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-white/30 text-[8px] md:text-[9px] uppercase tracking-widest font-bold">
            <FaShieldAlt size={10} /> <span>&copy; 2026 Ranamatch. Secured Platform.</span>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-2">
            {['UPI', 'Paytm', 'PhonePe', 'GPay', 'Crypto'].map((pay, i) => (
              <div key={i} className="px-2 py-1 rounded bg-white/[0.03] border border-white/10 text-white/50 text-[7px] font-black uppercase tracking-widest">
                {pay}
              </div>
            ))}
            <div className="px-2 py-1 rounded border border-red-500/50 text-red-500 text-[7px] font-black uppercase ml-1">
              18+
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default RanaFooter;
