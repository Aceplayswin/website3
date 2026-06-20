import React from 'react'
import RanaHeader from '../home/boldvelocity/RanaHeader'
import Promotion from '../sidebar-components/Miscellaneous/Promotion'
import '../../assets/css/ranamatch.css';

function PromotionPage() {
  return (
    <div className="rana-layout promo-route rewards-redesign-route min-h-screen">
      <RanaHeader />
      <main className="promo-route-main">
        <Promotion />
      </main>
    </div>
  )
}

export default PromotionPage
