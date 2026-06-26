import React from 'react';
import { FaBolt, FaRupeeSign, FaShieldAlt, FaUserPlus } from 'react-icons/fa';

const FeaturesSection = () => {
  return (
    <div className="why-choose-section mt-8 mb-8">
      <div className="why-choose-head">
        <div>
          <span>Built For Fast Play</span>
          <h2>Why Choose Us</h2>
        </div>
      </div>

      <div className="trust-strip">
        <div className="trust-card trust-card-1">
          <div className="trust-num">01</div>
          <div className="trust-icon ti1"><FaBolt /></div>
          <div className="trust-title">Fast Withdrawal</div>
          <div className="trust-sub">Quick payout flow with smooth account verification.</div>
        </div>
        <div className="trust-card trust-card-2">
          <div className="trust-num">02</div>
          <div className="trust-icon ti2"><FaRupeeSign /></div>
          <div className="trust-title">Instant Deposit</div>
          <div className="trust-sub">Add funds in seconds through popular payment options.</div>
        </div>
        <div className="trust-card trust-card-3">
          <div className="trust-num">03</div>
          <div className="trust-icon ti3"><FaUserPlus /></div>
          <div className="trust-title">1-Click Signup</div>
          <div className="trust-sub">Create your account quickly and start playing faster.</div>
        </div>
        <div className="trust-card trust-card-4">
          <div className="trust-num">04</div>
          <div className="trust-icon ti4"><FaShieldAlt /></div>
          <div className="trust-title">Trusted Platform</div>
          <div className="trust-sub">Secure, reliable experience with support when needed.</div>
        </div>
      </div>

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
