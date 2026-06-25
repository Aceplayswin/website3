import React from 'react'
import { FaCrown, FaGift, FaHeadset, FaRocket, FaShieldAlt, FaStar } from 'react-icons/fa'
import RanaHeader from '../home/boldvelocity/RanaHeader'
import '../../assets/css/ranamatch.css'

const tiers = [
  { level: '01', title: 'Rising Player', text: 'Start earning profile value from deposits, gameplay, and regular activity.', icon: <FaRocket /> },
  { level: '02', title: 'Gold Access', text: 'Unlock sharper offers, quicker support routing, and seasonal campaign access.', icon: <FaStar /> },
  { level: '03', title: 'Elite Desk', text: 'Get a premium account experience with priority rewards and faster assistance.', icon: <FaCrown /> },
]

function VipClubPage() {
  return (
    <div className="rana-layout premium-info-route vip-club-route min-h-screen">
      <RanaHeader />
      <main className="premium-info-main">
        <section className="vip-v2">
          <div className="premium-info-hero vip-v2-hero">
            <div>
              <span className="premium-info-kicker">VIP Club</span>
              <h1>Play More. Rise Faster.</h1>
              <p>Track your journey through a premium loyalty desk built around rewards, support, safer play, and faster access to offers.</p>
            </div>
            <div className="vip-v2-crown"><FaCrown /></div>
          </div>

          <div className="vip-v2-strip">
            <div><strong>3</strong><span>VIP paths</span></div>
            <div><strong>24/7</strong><span>Support desk</span></div>
            <div><strong>Live</strong><span>Reward tracking</span></div>
          </div>

          <div className="vip-v2-grid">
            {tiers.map((tier) => (
              <article className="vip-v2-card" key={tier.title}>
                <span>{tier.level}</span>
                <div>{tier.icon}</div>
                <h2>{tier.title}</h2>
                <p>{tier.text}</p>
              </article>
            ))}
          </div>

          <div className="vip-v2-benefits">
            <article><FaGift /><strong>Bonus Access</strong><span>Exclusive campaign eligibility as your profile grows.</span></article>
            <article><FaHeadset /><strong>Priority Help</strong><span>Faster handling for wallet, ticket, and account requests.</span></article>
            <article><FaShieldAlt /><strong>Safer Play</strong><span>VIP access stays tied to platform rules and responsible play limits.</span></article>
          </div>
        </section>
      </main>
    </div>
  )
}

export default VipClubPage
