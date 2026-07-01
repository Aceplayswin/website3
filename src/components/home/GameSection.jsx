"use client"

import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import { FaChevronLeft, FaChevronRight, FaArrowLeft, FaPlay, FaSearch, FaTimes, FaStar, FaRegStar, FaUsers } from "react-icons/fa"
import { apiPost } from "@/utils/apiFetch"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useColors } from '../../hooks/useColors'
import { FONTS } from '../../constants/theme'
import { useSite } from "../../context/SiteContext"
import { URL } from "../../utils/constants"

const GameSection = ({ title, games, id, layout = "slider", hideHeader = false }) => {
  const COLORS = useColors()
  const { setShowLogin, refreshSiteData, accountInfo } = useSite()
  const [preloadedImages, setPreloadedImages] = useState([])
  const [loadingForGames, setLoadingForGames] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  const [confirmPopup, setConfirmPopup] = useState({ show: false, game: null, error: null })
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [popupSearch, setPopupSearch] = useState("")
  const [selectedGame, setSelectedGame] = useState(null)
  const swiperRef = useRef(null)

  const popupParam = searchParams.get("show_all")
  const sectionId = id || (title ? title.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-") : "section")
  const hasTitleIcon = /^[^\w\s]/.test(title || "")
  const gameList = Array.isArray(games) ? games : []
  const filteredPopupGames = gameList.filter((game) =>
    (game?.["Game Name"] || "").toLowerCase().includes(popupSearch.trim().toLowerCase())
  )

  // Auto-select first game
  useEffect(() => {
    if (gameList.length > 0 && !selectedGame) {
      setSelectedGame(gameList[0])
    }
  }, [gameList])

  useEffect(() => {
    if (popupParam === sectionId) {
      setShowPopup(true)
    } else {
      setShowPopup(false)
      setPopupSearch("")
    }
  }, [popupParam, sectionId])

  const openPopup = () => {
    setSearchParams((prev) => {
      prev.set("show_all", sectionId)
      return prev
    })
  }

  const closePopup = () => {
    setSearchParams((prev) => {
      prev.delete("show_all")
      return prev
    })
  }

  useEffect(() => {
    if (games && Array.isArray(games)) {
      const images = games.map((game) => game.icon)
      preloadImages(images)
    }
  }, [games])

  useEffect(() => {
    if (confirmLoading) {
      setLoadingProgress(0)
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          const newProgress = prev + Math.random() * 15
          return newProgress > 90 ? 90 : newProgress
        })
      }, 300)
      return () => clearInterval(interval)
    } else if (loadingProgress > 0) {
      setLoadingProgress(100)
      const timeout = setTimeout(() => {
        setLoadingProgress(0)
      }, 500)
      return () => clearTimeout(timeout)
    }
  }, [confirmLoading])

  const preloadImages = async (imageUrls) => {
    try {
      const promises = imageUrls.map(
        (imageUrl) =>
          new Promise((resolve, reject) => {
            if (!imageUrl) return resolve();
            const img = new Image()
            const fullUrl = imageUrl.startsWith('http') ? imageUrl : `${URL}${imageUrl.startsWith('/') ? imageUrl.substring(1) : imageUrl}`;
            img.src = fullUrl
            img.onload = resolve
            img.onerror = reject
          }),
      )
      await Promise.all(promises)
      setPreloadedImages(imageUrls)
    } catch (error) {
      // Preload error - images will load normally via browser when rendered
    }
  }

  const handleGameClick = (game) => {
    const authSecretKey = localStorage.getItem("auth_secret_key")
    if (!authSecretKey) {
      setShowLogin(true)
      return
    }
    window.history.replaceState(null, null, `#${sectionId}`);
    setConfirmPopup({ show: true, game, error: null })
  }

  const confirmGameOpen = async () => {
    const game = confirmPopup.game
    setLoadingForGames(game["Game UID"])
    setConfirmLoading(true)

    try {
      const response = await apiPost("route-play-games", {
        GAME_NAME: game["Game Name"],
        GAME_UID: game["Game UID"],
      });

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()

      if (showPopup) {
        closePopup()
      }

      if (data.status_code === "balance_error") {
        setConfirmPopup({ show: true, game, error: "balance_error" })
      } else if (data.status_code === "authorization_error" || data.status_code === "auth_error") {
        setConfirmPopup({ show: true, game, error: "authorization_error" })
      } else if (data.error || !data.data?.game_url) {
        setConfirmPopup({ show: true, game, error: data.status_code || "unknown_error" })
      } else if (data.data?.game_url) {
        setTimeout(() => {
          const encodedUrl = btoa(unescape(encodeURIComponent(data.data.game_url)));
          navigate(`/game-url/${encodeURIComponent(encodedUrl)}/${encodeURIComponent(game["Game Name"])}`)
        }, 500)
      }
    } catch (error) {
      setConfirmPopup({ show: true, game: confirmPopup.game, error: "network_error" })
    } finally {
      setTimeout(() => {
        setLoadingForGames(null)
        setConfirmLoading(false)
      }, 500)
    }
  }

  function handleAuthError() {
    setConfirmPopup({ show: false, game: null, error: null });
    localStorage.removeItem("auth_secret_key");
    localStorage.removeItem("account_id");
    refreshSiteData();
    navigate("/");
    setShowLogin(true);
  }

  const cardGradients = [
    'linear-gradient(180deg, #ead8ff 0%, #f6ecff 58%, #ffffff 100%)',
    'linear-gradient(180deg, #ffe0b8 0%, #fff0d8 58%, #ffffff 100%)',
    'linear-gradient(180deg, #c8edff 0%, #e7f8ff 58%, #ffffff 100%)',
    'linear-gradient(180deg, #fff0a5 0%, #fff8d8 58%, #ffffff 100%)',
    'linear-gradient(180deg, #ffd5e9 0%, #fff0f7 58%, #ffffff 100%)',
    'linear-gradient(180deg, #b9f2d7 0%, #e4fbef 58%, #ffffff 100%)',
    'linear-gradient(180deg, #d3ddff 0%, #eef2ff 58%, #ffffff 100%)',
    'linear-gradient(180deg, #ffd7d7 0%, #fff1f1 58%, #ffffff 100%)',
  ];

  // Game detail panel: shown when a card is selected
  const GameDetailPanel = ({ game }) => {
    if (!game) return null;
    const tag = game["Game Tag"] || ""
    const provider = game["Game Provider"] || game["provider"] || ""
    const rtp = game["RTP"] || game["rtp"] || "96.8%"
    const minBet = game["Min Bet"] || game["min_bet"] || "₹10"
    const maxBet = game["Max Bet"] || game["max_bet"] || "₹1M"
    const rating = game["Rating"] || game["rating"] || 4.9
    const volatility = game["Volatility"] || "Low"
    const isLive = tag?.toLowerCase().includes("live")

    return (
      <div className="gs-detail-panel relative w-full h-full rounded-2xl overflow-hidden group shadow-2xl" key={game["Game UID"] || game["Game Name"]}>
        {/* Solid Background - Deep Slate */}
        <div className="absolute inset-0 bg-slate-900 z-0"></div>
        
        {/* Right Side Image with Fade Mask */}
        <div className="absolute right-0 top-0 bottom-0 w-[65%] z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent z-10"></div>
          <img 
            src={game.icon || "/placeholder.svg"} 
            alt={game["Game Name"]} 
            className="w-full h-full object-cover object-center opacity-70 group-hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-20 flex flex-col justify-end h-full p-4 w-full md:w-[85%]">
          {/* Header: Tags & Titles */}
          <div className="flex flex-col gap-1 mb-3">
            <div className="flex flex-wrap gap-1.5 mb-1">
              {tag && (
                <span className={`gs-tag gs-tag-${tag.toLowerCase().replace(/\s/g, "-")}`}>{tag}</span>
              )}
              {provider && (
                <span className="gs-tag gs-tag-provider">{provider}</span>
              )}
            </div>
            <h3 className="text-[22px] md:text-[24px] font-black !text-white leading-tight tracking-tight drop-shadow-lg m-0" style={{ fontFamily: FONTS.head }}>
              {game["Game Name"]}
            </h3>
            <p className="text-[11px] font-medium !text-slate-300 flex items-center gap-2 m-0 drop-shadow-md">
              by {provider || "Casino Live"}
              {isLive && <span className="gs-live-dot"><span />LIVE</span>}
            </p>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-2 mb-3.5">
            <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md border border-white/10 rounded-[10px] px-3 py-1.5 min-w-[50px] shadow-sm">
              <span className="text-[12px] font-extrabold !text-white leading-tight">{rtp}</span>
              <span className="text-[9px] font-bold !text-slate-400 uppercase tracking-wider mt-0.5">RTP</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md border border-white/10 rounded-[10px] px-3 py-1.5 min-w-[50px] shadow-sm">
              <span className="text-[12px] font-extrabold !text-white leading-tight">{volatility}</span>
              <span className="text-[9px] font-bold !text-slate-400 uppercase tracking-wider mt-0.5">Volat</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md border border-white/10 rounded-[10px] px-3 py-1.5 min-w-[50px] shadow-sm">
              <span className="text-[12px] font-extrabold !text-white leading-tight">{minBet}</span>
              <span className="text-[9px] font-bold !text-slate-400 uppercase tracking-wider mt-0.5">Min Bet</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md border border-white/10 rounded-[10px] px-3 py-1.5 min-w-[50px] shadow-sm">
              <span className="text-[12px] font-extrabold !text-white leading-tight">{rating}★</span>
              <span className="text-[9px] font-bold !text-slate-400 uppercase tracking-wider mt-0.5">Rating</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2.5 w-full max-w-[280px]">
            <button
              className="flex-1 flex items-center justify-center gap-2 h-10 rounded-xl bg-gradient-to-br from-[#F0C040] via-[#D4AF37] to-[#C59124] text-[#1a1100] text-[13px] font-black tracking-wide border-none cursor-pointer shadow-[0_4px_16px_rgba(212,175,55,0.35)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(212,175,55,0.5)] transition-all duration-300"
              onClick={() => handleGameClick(game)}
              style={{ fontFamily: FONTS.ui }}
            >
              <FaPlay size={12} />
              Play Now
            </button>
            <button
              className="flex-none px-5 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 text-white/90 hover:text-white text-[13px] font-bold cursor-pointer backdrop-blur-md transition-all duration-300"
              onClick={() => handleGameClick(game)}
              style={{ fontFamily: FONTS.ui }}
            >
              Demo
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      id={sectionId}
      className="game-section relative w-full py-4 md:py-6 scroll-mt-24 md:scroll-mt-32"
    >
      {!hideHeader && (
        <div className="section-head">
          <div className="section-title">
            {!hasTitleIcon && <i className="ti ti-device-gamepad-2"></i>}
            <span className="section-title-text">{title}</span>
            <span className="section-count-badge">{gameList.length}</span>
          </div>
          {layout !== "grid" && (
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden md:flex items-center gap-1">
                <button className={`nav-button prev-${sectionId} header-icon-btn !rounded-full !w-8 !h-8 flex items-center justify-center hover:scale-110 transition-all duration-300`}>
                  <FaChevronLeft size={12} />
                </button>
                <button className={`nav-button next-${sectionId} header-icon-btn !rounded-full !w-8 !h-8 flex items-center justify-center hover:scale-110 transition-all duration-300`}>
                  <FaChevronRight size={12} />
                </button>
              </div>
              <span onClick={openPopup} className="section-more">
                See All <i className="ti ti-arrow-right" style={{ fontSize: '13px' }}></i>
              </span>
            </div>
          )}
        </div>
      )}

      {layout === "grid" ? (
        <div className="see-all-grid gap-3 md:gap-6 animate-fadeInUp">
          {games && Array.isArray(games) && games.map((game, index) => (
            <div
              key={index}
              className="flex flex-col group cursor-pointer"
              onClick={() => handleGameClick(game)}
            >
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden p-[1px] bg-gradient-to-br from-white/10 via-transparent to-white/5 transition-all duration-500 group-hover:from-brand/50 group-hover:to-brand/20 group-hover:-translate-y-1">
                <div className="relative w-full h-full rounded-[11px] overflow-hidden bg-gray-100 dark:bg-white/5">
                  <img
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${loadingForGames === game["Game UID"] ? "opacity-30 blur-sm" : ""}`}
                    src={game.icon || "/placeholder.svg"}
                    alt={game["Game Name"]}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-white/5 opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="p-3 rounded-full shadow-2xl transform scale-50 group-hover:scale-100 transition-all duration-500 hover:scale-110" style={{ background: COLORS.brandGradient }}>
                      <FaPlay className="text-black dark:text-white ml-0.5" size={12} />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="backdrop-blur-md bg-black/10 dark:bg-black/40 rounded-lg p-1.5 border border-black/10 dark:border-white/10 text-center shadow-xl">
                      <p className="text-[9px] font-black !text-white truncate uppercase tracking-tighter" style={{ color: '#ffffff' }}>
                        {game["Game Name"]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ── LOBBY LAYOUT: Slider left + Detail panel right ── */
        <div className="gs-lobby-wrap">
          {/* Left: Swiper cards */}
          <div className="gs-slider-col">
            <Swiper
              modules={[Navigation]}
              spaceBetween={10}
              slidesPerView={3.5}
              loop={gameList.length > 4}
              navigation={{
                prevEl: `.prev-${sectionId}`,
                nextEl: `.next-${sectionId}`,
              }}
              breakpoints={{
                320: { slidesPerView: 4, spaceBetween: 8 },
                480: { slidesPerView: 4, spaceBetween: 8 },
                768: { slidesPerView: 3, spaceBetween: 10 },
                1024: { slidesPerView: 4, spaceBetween: 12 },
                1280: { slidesPerView: 5, spaceBetween: 14 },
              }}
              onSwiper={(swiper) => { swiperRef.current = swiper }}
            >
              {gameList.map((game, index) => (
                <SwiperSlide key={index}>
                  <div
                    className={`lobby-game-card${selectedGame?.["Game UID"] === game["Game UID"] || (!selectedGame && index === 0) ? " gs-card-active" : ""}`}
                    onClick={() => {
                      if (window.innerWidth <= 768) {
                        handleGameClick(game);
                      } else {
                        setSelectedGame(game);
                      }
                    }}
                  >
                    <div
                      className="lobby-card-bg"
                      style={{ background: cardGradients[index % cardGradients.length] }}
                    >
                      {game["Game Tag"] && (
                        <span className={`lobby-badge lobby-badge-${(game["Game Tag"] || "").toLowerCase().replace(/\s/g, "-")}`}>
                          {game["Game Tag"]}
                        </span>
                      )}
                      <div className="lobby-card-icon">
                        <img
                          src={game.icon || "/placeholder.svg"}
                          alt={game["Game Name"]}
                          className={loadingForGames === game["Game UID"] ? "opacity-40 blur-sm" : ""}
                        />
                      </div>
                      <div className="lobby-card-hover">
                        <div className="lobby-play-btn">
                          <FaPlay size={14} />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col p-2 bg-slate-900 border-t border-white/5 h-[48px] justify-center">
                      <span className="text-[11px] font-bold text-white truncate" style={{ color: '#ffffff' }}>{game["Game Name"]}</span>
                      <span className="text-[9px] font-medium text-white/60 truncate" style={{ color: 'rgba(255,255,255,0.6)' }}>{game["Game Provider"] || game["provider"] || ""}</span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Right: Detail Panel */}
          <div className="gs-detail-col">
            <GameDetailPanel game={selectedGame || gameList[0]} />
          </div>
        </div>
      )}

      {/* ── See All Popup ── */}
      {showPopup &&
        createPortal(
          <div className="see-all-overlay">
            <div className="see-all-panel">
              <header className="see-all-topbar">
                <button onClick={closePopup} className="see-all-back" aria-label="Back to home">
                  <FaArrowLeft />
                  <span>Back</span>
                </button>

                <div className="see-all-title-block">
                  <span className="see-all-kicker">Premium Game Lobby</span>
                  <h2 style={{ fontFamily: FONTS.head }}>{title}</h2>
                </div>

                <div className="see-all-searchbox">
                  <FaSearch />
                  <input
                    value={popupSearch}
                    onChange={(event) => setPopupSearch(event.target.value)}
                    placeholder="Search games..."
                    aria-label="Search games"
                  />
                  {popupSearch && (
                    <button type="button" onClick={() => setPopupSearch("")} aria-label="Clear search">
                      <FaTimes />
                    </button>
                  )}
                </div>

                <div className="see-all-count">
                  <strong>{filteredPopupGames.length}</strong>
                  <span>Games</span>
                </div>
              </header>

              <main className="see-all-content">
                {filteredPopupGames.length > 0 ? (
                  <div className="see-all-lobby-grid">
                    {filteredPopupGames.map((game, index) => (
                      <button
                        key={`${game["Game UID"] || game["Game Name"]}-${index}`}
                        type="button"
                        className="see-all-lobby-card"
                        onClick={() => handleGameClick(game)}
                      >
                        <span className="see-all-card-image">
                          <img
                            src={game.icon || "/placeholder.svg"}
                            alt={game["Game Name"]}
                            className={loadingForGames === game["Game UID"] ? "is-loading" : ""}
                          />
                          <span className="see-all-card-play">
                            <FaPlay />
                          </span>
                        </span>
                        <span className="see-all-card-info">
                          <strong>{game["Game Name"]}</strong>
                          <small>Tap to play</small>
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="see-all-empty">
                    <strong>No games found</strong>
                    <span>Try a different search term.</span>
                  </div>
                )}
              </main>
            </div>
          </div>,
          document.body,
        )}

      {/* ── Confirm / Error Popup ── */}
      {confirmPopup.show && createPortal(
        <div className="game-launch-overlay">
          <div className="game-launch-card animate-fadeInUp">
            <div className="game-launch-play">
              <FaPlay />
            </div>

            <div>
              {confirmPopup.error === "balance_error" ? (
                <div className="space-y-3">
                  <h3 className="game-launch-title" style={{ fontFamily: FONTS.head }}>Insufficient Balance</h3>
                  <p className="game-launch-copy">A minimum deposit of <span className="text-black dark:text-white font-bold">₹100</span> is required.</p>
                </div>
              ) : confirmPopup.error === "authorization_error" ? (
                <div className="space-y-3">
                  <h3 className="game-launch-title" style={{ fontFamily: FONTS.head }}>Session Expired</h3>
                  <p className="game-launch-copy">Please log in again to continue.</p>
                </div>
              ) : confirmPopup.error ? (
                <div className="space-y-3">
                  <h3 className="game-launch-title" style={{ fontFamily: FONTS.head }}>Game Unavailable</h3>
                  <p className="game-launch-copy">This game is currently unavailable. Please try another one.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <h3 className="game-launch-title" style={{ fontFamily: FONTS.head }}>READY TO WIN?</h3>
                  <p className="game-launch-copy">You are about to enter <span className="text-black dark:text-white font-bold">{confirmPopup.game?.["Game Name"]}</span>. Good luck!</p>
                </div>
              )}
            </div>

            <div className="game-launch-actions">
              {confirmPopup.error === "balance_error" ? (
                <button onClick={() => setConfirmPopup({ show: false, game: null, error: null })} className="game-launch-primary" style={{ fontFamily: FONTS.ui }}><span>Add Funds</span></button>
              ) : confirmPopup.error === "authorization_error" ? (
                <button onClick={handleAuthError} className="game-launch-primary" style={{ fontFamily: FONTS.ui }}><span>Log In Again</span></button>
              ) : confirmPopup.error ? (
                <button onClick={() => setConfirmPopup({ show: false, game: null, error: null })} className="game-launch-primary" style={{ fontFamily: FONTS.ui }}><span>Try Other Game</span></button>
              ) : (
                <button onClick={confirmGameOpen} className="game-launch-primary" style={{ fontFamily: FONTS.ui }}><span>Confirm Play</span></button>
              )}

              <button
                onClick={() => setConfirmPopup({ show: false, game: null, error: null })}
                className="game-launch-secondary"
                style={{ fontFamily: FONTS.ui }}
              >
                {confirmPopup.error === "balance_error" ? "Close" : "Cancel"}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ── Loading Overlay ── */}
      {confirmLoading && createPortal(
        <div className="game-launch-overlay">
          <div
            className="game-loading-card"
            style={{
              backgroundColor: `${COLORS.bg2}F2`,
              backgroundImage: 'radial-gradient(circle at top right, rgba(230, 160, 0, 0.05), transparent 40%)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
            <div>
              {confirmPopup.game && (
                <div>
                  <div className="game-loading-icon">
                    <div>
                      <img src={confirmPopup.game.icon || "/placeholder.svg"} alt={confirmPopup.game["Game Name"]} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <h3 className="game-loading-title" style={{ fontFamily: FONTS.head }}>{confirmPopup.game["Game Name"]}</h3>
                  <div className="game-loading-status"><i></i>Initializing Elite Experience</div>
                </div>
              )}
            </div>

            <div className="game-loading-progress">
              <div className="game-loading-bar">
                <div className="game-loading-fill" style={{ width: `${loadingProgress}%` }}></div>
              </div>
              <div className="game-loading-meta">
                <span>Connection Status</span>
                <strong>{Math.round(loadingProgress)}%</strong>
              </div>
            </div>

            <div className="game-loading-steps">
              {[
                { label: "Establishing Connection", threshold: 30 },
                { label: "Syncing Game Assets", threshold: 60 },
                { label: "Optimizing Performance", threshold: 85 }
              ].map((step, i) => (
                <div key={i} className="flex justify-between items-center group">
                  <span className={`text-xs transition-colors duration-500 ${loadingProgress > step.threshold ? "text-black/80 dark:text-white/80" : "text-black/20 dark:text-white/20"}`} style={{ fontFamily: FONTS.ui }}>
                    {step.label}
                  </span>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all duration-700 ${loadingProgress > step.threshold
                    ? "border-brand/40 bg-brand/10 text-brand scale-110"
                    : "border-black/5 dark:border-white/5 bg-gray-100 dark:bg-white/2"
                    }`}>
                    {loadingProgress > step.threshold ? (
                      <span className="text-[10px] font-bold">✓</span>
                    ) : (
                      <div className="w-1 h-1 bg-gray-100 dark:bg-white/10 rounded-full animate-ping"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="game-loading-tip">
              <strong>Pro Tip</strong>
              <p>Enable high performance mode in settings for the smoothest gameplay experience.</p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

export default GameSection;
