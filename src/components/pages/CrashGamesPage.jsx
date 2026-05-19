import React, { useEffect, useState } from "react"
import Navbar from "../navbar/Navbar"
import Footer from "../home/Footer"
import { useGames } from "../../context/GameContext"
import { useColors } from "../../hooks/useColors"
import { FONTS } from "../../constants/theme"
import GameSection from "../home/GameSection"

function CrashGamesPage() {
  const COLORS = useColors()
  const games = useGames()
  const loading = games.loading
  const [crashGames, setCrashGames] = useState([])

  useEffect(() => {
    if (!loading) {
      // Flatten all categories into a single list to check
      const allGames = Object.values(games).filter(Array.isArray).flat()
      
      const filtered = allGames.filter((game) => {
        const provider = (game["Game Provider"] || game["provider"] || "").toLowerCase()
        const gameName = (game["Game Name"] || "").toLowerCase()
        
        // Match user's providers: aviatrix, galaxsys, aura gaming, veliplay
        const matchesProvider = 
          provider === "aviatrix" || 
          provider === "galaxsys" || 
          provider === "aura gaming" || 
          provider === "veliplay"
          
        // Fallback checks for crash-type games
        const matchesName = 
          gameName.includes("crash") || 
          gameName.includes("aviator") || 
          gameName.includes("spaceman") || 
          gameName.includes("jetx") || 
          gameName.includes("aviatrix") ||
          gameName.includes("zeppelin")
          
        return matchesProvider || matchesName
      })
      
      // Remove duplicates (by Game UID)
      const uniqueGames = Array.from(new Map(filtered.map(item => [item["Game UID"], item])).values())
      setCrashGames(uniqueGames)
    }
  }, [games, loading])

  return (
    <div className="flex flex-col min-h-screen relative" style={{ backgroundColor: COLORS.bg }}>
      <Navbar />

      <main className="flex-grow">
        {/* Premium Header Section */}
        <div className="relative py-6 md:py-8 overflow-hidden mb-4 border-b border-black/5 dark:border-white/5">
          <div 
            className="absolute inset-0 opacity-10"
            style={{ 
              background: `radial-gradient(circle at 50% 50%, ${COLORS.brand}33 0%, transparent 70%)` 
            }}
          />
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center">
            <h1 
              className="text-xl md:text-3xl font-black tracking-wider uppercase italic"
              style={{ 
                fontFamily: FONTS.black,
                color: COLORS.text,
                textShadow: `0 0 15px ${COLORS.brand}33`
              }}
            >
              Exclusive <span style={{ color: COLORS.brand }}>Crash Games</span>
            </h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-12 h-12 border-4 border-brand/20 border-t-brand rounded-full animate-spin"></div>
              <p className="text-white/40 font-black uppercase tracking-widest text-xs">Loading Games...</p>
            </div>
          ) : (
            <div className="animate-fadeIn">
              <GameSection 
                title="🚀 Crash Games" 
                games={crashGames} 
                id="crash-collection"
                layout="grid"
              />
              
              {crashGames.length === 0 && (
                <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5">
                  <p className="text-white/20 text-lg font-medium">No crash games found.</p>
                  <p className="text-white/10 text-sm">Add games from the admin panel to see them here!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default CrashGamesPage
