"use client"

import { useEffect } from "react"
import { useSite } from "../../context/SiteContext"
import RanaHeader from "./ranamatch/RanaHeader"
import RanaSidebarLeft from "./ranamatch/RanaSidebarLeft"
import RanaSidebarRight from "./ranamatch/RanaSidebarRight"
import RanaMainContent from "./ranamatch/RanaMainContent"
import AuthModalHost from "../common/AuthModalHost"
import '../../assets/css/ranamatch.css'

function Home() {
  const { accountInfo } = useSite()

  useEffect(() => {
    // Apply light theme globally for the home page
    document.documentElement.classList.add('light');
    // Cleanup on unmount
    return () => {
      document.documentElement.classList.remove('light');
    };
  }, []);
  return (
    <div className="rana-layout">
      <AuthModalHost />
      <RanaHeader />
      <div className="page-wrap">
        <RanaSidebarLeft />
        <RanaMainContent />
        <RanaSidebarRight />
      </div>
    </div>
  )
}

export default Home
