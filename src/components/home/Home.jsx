"use client"

import { useEffect } from "react"
import RanaHeader from "./ranamatch/RanaHeader"
import RanaSidebarLeft from "./ranamatch/RanaSidebarLeft"
import RanaSidebarRight from "./ranamatch/RanaSidebarRight"
import RanaMainContent from "./ranamatch/RanaMainContent"
import AuthModalHost from "../common/AuthModalHost"
import '../../assets/css/ranamatch.css'

function Home() {
  useEffect(() => {
    document.documentElement.classList.add('light')

    return () => {
      document.documentElement.classList.remove('light')
    }
  }, [])

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
