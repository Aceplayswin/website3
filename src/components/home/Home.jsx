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
    document.body.style.backgroundColor = '#0f0a1a';
    document.body.style.color = '#FFFFFF';
    document.body.style.fontFamily = "var(--font-ui)";
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    document.body.style.margin = '0';
    document.body.style.padding = '0';

    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      document.body.style.fontFamily = '';
      document.documentElement.style.height = '';
      document.body.style.height = '';
    }
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
