import React from 'react'
import RanaHeader from '../home/boldvelocity/RanaHeader'
import Withdraw from '../navbar/Withdraw'
import '../../assets/css/ranamatch.css'

function WithdrawPage() {
  return (
    <div className="finance-route-shell withdraw-route rana-layout min-h-screen">
      <RanaHeader />
      <main className="finance-route-main">
        <Withdraw />
      </main>
    </div>
  )
}

export default WithdrawPage
