"use client"

import { useEffect } from "react"
import RanaHeader from "./boldvelocity/RanaHeader"
import RanaMainContent from "./boldvelocity/RanaMainContent"
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
    <div className="rana-layout category-route">
      <div className="bg-canvas" aria-hidden="true">
        <div className="bg-aurora" />
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
        <div className="bg-orb bg-orb-4" />
        <div className="bg-orb bg-orb-5" />
        <div className="bg-orb bg-orb-6" />
        <div className="bg-grid" />
        <div className="bg-vignette" />
        <div className="bg-noise" />
      </div>
      <AuthModalHost />
      <RanaHeader />
      <div className="category-page-main">
        <RanaMainContent />
      </div>
    </div>
  )
}

export default Home
