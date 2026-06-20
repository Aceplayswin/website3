import React, { useEffect, useMemo, useState } from "react";
import RanaHeader from "../home/boldvelocity/RanaHeader";
import RanaFooter from "../home/boldvelocity/RanaFooter";
import GameSection from "../home/GameSection";
import "../../assets/css/ranamatch.css";

function GameCategoryLayout({
  title,
  icon,
  games = [],
  loading,
  sectionId,
  description = "Browse a curated lobby of live tables, instant launches, and premium game picks.",
  eyebrow = "Premium Game Lobby",
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const gameList = Array.isArray(games) ? games : [];
  const providers = useMemo(
    () => Array.from(new Set(gameList.map((game) => game["Game Provider"] || game.provider).filter(Boolean))),
    [gameList]
  );
  const providerCount = providers.length;
  const filteredGames = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return gameList;

    return gameList.filter((game) => {
      const name = (game["Game Name"] || "").toLowerCase();
      const provider = (game["Game Provider"] || game.provider || "").toLowerCase();
      return name.includes(query) || provider.includes(query);
    });
  }, [gameList, searchTerm]);
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const featuredGame = gameList[0];

  useEffect(() => {
    document.documentElement.classList.add("category-page-scroll");
    document.body.classList.add("category-page-scroll");

    return () => {
      document.documentElement.classList.remove("category-page-scroll");
      document.body.classList.remove("category-page-scroll");
    };
  }, []);

  return (
    <div className={`rana-layout category-route category-redesign-route category-${slug} flex flex-col min-h-screen relative`}>
      <RanaHeader />

      <main className="category-page-main category-redesign-main flex-grow">
        <section className="category-redesign-hero">
          <div className="category-command-card">
            <div className="category-command-top">
              <span className="category-eyebrow">{eyebrow}</span>
              <span className="category-live-pill">Live Desk</span>
            </div>

            <h1>
              <span className="category-hero-icon">{icon}</span>
              <span>{title}</span>
              <em>Collection</em>
            </h1>
            <p>{description}</p>

            <div className="category-search-row">
              <i className="ti ti-search" aria-hidden="true" />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder={`Search ${title.toLowerCase()} games or providers...`}
              />
            </div>

            <div className="category-hero-stats" aria-label={`${title} lobby summary`}>
              <div>
                <strong>{loading ? "--" : gameList.length}</strong>
                <span>Total Games</span>
              </div>
              <div>
                <strong>{loading ? "--" : Math.max(providerCount, 1)}</strong>
                <span>Providers</span>
              </div>
              <div>
                <strong>{loading ? "--" : filteredGames.length}</strong>
                <span>Showing</span>
              </div>
            </div>
          </div>

          <aside className="category-feature-card">
            <span className="feature-kicker">Featured Launch</span>
            <div className="feature-preview">
              {featuredGame?.icon ? (
                <img src={featuredGame.icon} alt={featuredGame["Game Name"] || title} />
              ) : (
                <span>{icon}</span>
              )}
            </div>
            <strong>{featuredGame?.["Game Name"] || `${title} Lobby`}</strong>
            <small>{featuredGame?.["Game Provider"] || featuredGame?.provider || "Instant access"}</small>
            <div className="provider-chip-row">
              {providers.slice(0, 5).map((provider) => (
                <span key={provider}>{provider}</span>
              ))}
              {!providers.length && <span>New providers soon</span>}
            </div>
          </aside>
        </section>

        <section className="category-redesign-heading">
          <div>
            <span>{icon} curated games</span>
            <h2>{title} Lobby</h2>
          </div>
          <small>{filteredGames.length} games ready</small>
        </section>

        <section className="category-content-panel category-redesign-panel">
          {loading ? (
            <div className="category-loading">
              <i />
              <strong>Loading games</strong>
              <span>Preparing the {title.toLowerCase()} lobby...</span>
            </div>
          ) : (
            <>
              <GameSection
                title={`${icon} ${title} Games`}
                games={filteredGames}
                id={sectionId}
                layout="grid"
                hideHeader
              />

              {filteredGames.length === 0 && (
                <div className="category-empty">
                  <strong>No {title.toLowerCase()} games found</strong>
                  <span>Try clearing search or add games from the admin panel.</span>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <RanaFooter />
    </div>
  );
}

export default GameCategoryLayout;
