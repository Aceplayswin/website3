import React, { useState, useEffect } from 'react';
import { FaBolt, FaRupeeSign, FaShieldAlt, FaUserPlus } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const FeaturesSection = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 820);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 820);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cards = [
    { num: "01", icon: <FaBolt />, cls: "ti1", title: "Fast Withdrawal", sub: "Quick payout flow with smooth account verification." },
    { num: "02", icon: <FaRupeeSign />, cls: "ti2", title: "Instant Deposit", sub: "Add funds in seconds through popular payment options." },
    { num: "03", icon: <FaUserPlus />, cls: "ti3", title: "1-Click Signup", sub: "Create your account quickly and start playing faster." },
    { num: "04", icon: <FaShieldAlt />, cls: "ti4", title: "Trusted Platform", sub: "Secure, reliable experience with support when needed." }
  ];

  const renderCard = (card, i) => (
    <div className={`trust-card trust-card-${i + 1}`}>
      <div className="trust-num">{card.num}</div>
      <div className={`trust-icon ${card.cls}`}>{card.icon}</div>
      <div className="trust-title">{card.title}</div>
      <div className="trust-sub">{card.sub}</div>
    </div>
  );

  return (
    <div className="why-choose-section mt-8 mb-8">
      <div className="why-choose-head">
        <div>
          <span>Built For Fast Play</span>
          <h2>Why Choose Us</h2>
        </div>
      </div>

      {isMobile ? (
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          spaceBetween={12}
          slidesPerView="auto"
          loop={true}
          className="trust-strip-swiper"
          style={{ paddingBottom: '8px', paddingLeft: '4px', paddingRight: '4px' }}
        >
          {cards.map((card, i) => (
            <SwiperSlide key={i} style={{ width: 'auto' }}>
              {renderCard(card, i)}
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="trust-strip">
          {cards.map((card, i) => renderCard(card, i))}
        </div>
      )}

      <div className="payment-methods-block">
        <div className="payment-methods-title">Payment Methods</div>
        <div className="payments-row">
          <div className="pay-chip"><i className="ti ti-credit-card"></i> UPI</div>
          <div className="pay-chip"><i className="ti ti-building-bank"></i> IMPS / NEFT</div>
          <div className="pay-chip"><i className="ti ti-currency-bitcoin"></i> Bitcoin</div>
          <div className="pay-chip"><i className="ti ti-currency-ethereum"></i> USDT</div>
          <div className="pay-chip"><i className="ti ti-device-mobile"></i> PhonePe</div>
          <div className="pay-chip"><i className="ti ti-device-mobile"></i> Google Pay</div>
          <div className="pay-chip"><i className="ti ti-cash"></i> Paytm</div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
