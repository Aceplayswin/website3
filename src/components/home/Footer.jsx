import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTelegramPlane,
  FaWhatsapp,
  FaTwitter
} from "react-icons/fa";
import { useSite } from "../../context/SiteContext";
import { URL as BASE_URL } from "../../utils/constants";
import { usePWAInstall } from "../../hooks/usePWAInstall";

const Footer = () => {
  const { accountInfo } = useSite();
  const { isInstalled, isInstallable, installApp, platform } = usePWAInstall();

  const handleSmartAppAction = (e) => {
    e.preventDefault();
    if (isInstalled) {
      window.open(window.location.origin, '_blank');
    } else if (isInstallable) {
      installApp();
    } else if (platform === 'android') {
      window.open(accountInfo?.service_app_download_url || "/boldvelocity.apk", "_blank");
    } else {
      window.open(window.location.origin, '_blank');
    }
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <div className="footer-logo">
            <div className="logo-mark">NX</div>{accountInfo?.service_site_name || 'NEXBET'}
          </div>
          <p className="footer-about">
            {accountInfo?.service_site_name || 'Site'} is the best platform for live and uninterrupted online betting for sports, Live 24hr betting with a wide spectrum of sports such as Cricket, Soccer, Horse Racing, and many more.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            {(() => {
              if (accountInfo?.service_social_links && accountInfo.service_social_links.length > 0) {
                const iconMap = {
                  'whatsapp': { icon: <FaWhatsapp />, prefix: "https://wa.me/" },
                  'telegram': { icon: <FaTelegramPlane />, prefix: "" },
                  'instagram': { icon: <FaInstagram />, prefix: "" },
                  'facebook': { icon: <FaFacebookF />, prefix: "" },
                  'twitter': { icon: <FaTwitter />, prefix: "" }
                };
                return accountInfo.service_social_links.map((link, i) => {
                  const platform = link.platform.toLowerCase();
                  let url = link.value;
                  const meta = iconMap[platform] || iconMap['telegram'];
                  if (platform === 'whatsapp' && !url.includes('wa.me')) {
                    url = meta.prefix + url.replace(/\s+/g, '');
                  } else if (!url.startsWith('http')) {
                    url = 'https://' + url;
                  }
                  return (
                    <a key={'dyn_soc' + i} href={url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-600)', fontSize: '18px', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#A77717'} onMouseOut={(e) => e.target.style.color = 'var(--text-600)'}>
                      {meta.icon}
                    </a>
                  );
                });
              }
              return null;
            })()}
          </div>
        </div>
        
        <div>
          <div className="footer-col-title">Sports</div>
          <ul className="footer-links">
            <li><a href="#">Cricket</a></li>
            <li><a href="#">Football</a></li>
            <li><a href="#">Tennis</a></li>
            <li><a href="#">Basketball</a></li>
            <li><a href="#">Horse Racing</a></li>
          </ul>
        </div>
        
        <div>
          <div className="footer-col-title">Casino</div>
          <ul className="footer-links">
            <li><a href="#">Live Casino</a></li>
            <li><a href="#">Slots</a></li>
            <li><a href="#">Teen Patti</a></li>
            <li><a href="#">Roulette</a></li>
            <li><a href="#">Blackjack</a></li>
          </ul>
        </div>
        
        <div>
          <div className="footer-col-title">Support</div>
          <ul className="footer-links">
            <li><a href={accountInfo?.service_support_url || "#"}>24/7 Live Chat</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Responsible Gaming</a></li>
            <li><a href="#" onClick={handleSmartAppAction}>{isInstalled ? "Open App" : "Download App"}</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-copy">© Copyright 2026 {accountInfo?.service_site_name || 'NEXBET'}. All rights reserved.</div>
        <div className="footer-18">
          <span className="badge-18">18+</span>
          Play Responsibly
        </div>
      </div>
    </footer>
  );
};

export default Footer;
