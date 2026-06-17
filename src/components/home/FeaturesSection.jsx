import React from 'react';

const FeaturesSection = () => {
  return (
    <div className="mt-8 mb-8">
      <div className="section-head">
        <div className="section-title">
          <i className="ti ti-shield-check"></i> Why Choose Us
        </div>
      </div>
      
      <div className="trust-strip">
        <div className="trust-card">
          <div className="trust-icon ti1"><i className="ti ti-bolt"></i></div>
          <div className="trust-title">Instant Payout</div>
          <div className="trust-sub">Withdrawals processed in under 5 minutes</div>
        </div>
        <div className="trust-card">
          <div className="trust-icon ti2"><i className="ti ti-shield-lock"></i></div>
          <div className="trust-title">Bank-Grade Security</div>
          <div className="trust-sub">256-bit SSL · 2FA · Real-time fraud detection</div>
        </div>
        <div className="trust-card">
          <div className="trust-icon ti3"><i className="ti ti-headset"></i></div>
          <div className="trust-title">24/7 Live Support</div>
          <div className="trust-sub">WhatsApp · Live chat · Telegram</div>
        </div>
        <div className="trust-card">
          <div className="trust-icon ti4"><i className="ti ti-device-mobile"></i></div>
          <div className="trust-title">Mobile First</div>
          <div className="trust-sub">iOS & Android apps — seamless betting anywhere</div>
        </div>
        <div className="trust-card">
          <div className="trust-icon ti5"><i className="ti ti-currency-rupee"></i></div>
          <div className="trust-title">UPI & Crypto</div>
          <div className="trust-sub">IMPS · PhonePe · GPay · USDT · BTC</div>
        </div>
      </div>

      <div style={{ marginTop: '22px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-600)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '14px' }}>
          Payment Methods
        </div>
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
