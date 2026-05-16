"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import { FaChevronLeft, FaChevronRight, FaEye, FaArrowLeft, FaPlay } from "react-icons/fa"
import { apiPost } from "@/utils/apiFetch"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useColors } from '../../hooks/useColors'
import { FONTS } from '../../constants/theme'
import { useSite } from "../../context/SiteContext"
import { useGames } from "../../context/GameContext"

import GameSection from "./GameSection"

const GamesDisplay = ({ section }) => {
  const { slots, casino, fishing, poker } = useGames();

  const excludeProviders = [
    'MAC88', '18Peaches', 'Veliplay', 'aviatrix', 'InOut Minigames', 
    'Galaxsys', 'Smartsoft', '2J', 'turbogamesasia', 'Aura Gaming', 'India Lotto'
  ];

  const filterGames = (gameList) => {
    if (!gameList) return [];
    return gameList.filter(game => {
      const provider = game["Game Provider"] || game["provider"];
      return !excludeProviders.includes(provider);
    });
  };

  // Filter out lobby games and excluded providers from the general casino section
  const filteredCasino = casino?.filter(game => {
    const isLobby = game["Game Name"]?.toLowerCase().includes("lobby");
    const provider = game["Game Provider"] || game["provider"];
    const isExcluded = excludeProviders.includes(provider);
    return !isLobby && !isExcluded;
  }) || []

  const filteredSlots = filterGames(slots);
  const filteredFishing = filterGames(fishing);
  const filteredPoker = filterGames(poker);

  if (section === "trending-games") {
    return <GameSection id="trending-games" title="🔥 Trending Games" games={filteredCasino} />
  }

  if (section === "slots") {
    return <GameSection id="slots" title="🎮 Trending Slot" games={filteredSlots} />
  }

  if (section === "fishing") {
    return <GameSection id="fishing" title="🐟 Fishing" games={filteredFishing} />
  }

  if (section === "poker") {
    return <GameSection id="poker" title="♤ Indian Poker Games" games={filteredPoker} />
  }

  if (section === "fantasy") {
    return <GameSection id="fantasy-games" title="🏆 Fantasy Games" games={filteredPoker} />
  }

  // Default: return all in the new requested order if no section specified
  return (
    <div className="games-display space-y-3">
      {" "}
      <GameSection id="trending-games" title="🔥 Trending Games" games={filteredCasino} />
      <GameSection id="slots" title="🎮 Trending Slot" games={filteredSlots} />
      <GameSection id="poker" title="♤ Indian Poker Games" games={filteredPoker} />
      <GameSection id="fishing" title="🐟 Fishing" games={filteredFishing} />
    </div>
  )
}

export default GamesDisplay
