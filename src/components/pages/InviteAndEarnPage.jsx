import React from 'react'
import RanaHeader from '../home/ranamatch/RanaHeader'
import InviteAndEarn from '../sidebar-components/Miscellaneous/InviteAndEarn'
import '../../assets/css/ranamatch.css';

function InviteAndEarnPage() {
  return (
    <div className="rana-layout invite-route min-h-screen">
      <RanaHeader />
      <main className="invite-route-main">
        <InviteAndEarn />
      </main>
    </div>
  )
}

export default InviteAndEarnPage
