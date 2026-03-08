import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Play, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CATEGORIES, GAMES, type Game, type GameCategory } from "../games";
import { useActor } from "../hooks/useActor";
import { GameViewer } from "./GameViewer";

export function AllGamesPage() {
  const { actor } = useActor();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<GameCategory | "All">(
    "All",
  );
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!actor) return;
    actor
      .getCallerFavorites()
      .then((ids) => {
        setFavorites(new Set(ids.map(Number)));
      })
      .catch(() => {});
  }, [actor]);

  const filtered = useMemo(() => {
    let result = GAMES;
    if (activeCategory !== "All") {
      result = result.filter((g) => g.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q),
      );
    }
    return result;
  }, [search, activeCategory]);

  const toggleFavorite = async (gameId: number) => {
    if (!actor) return;
    const newFavs = new Set(favorites);
    if (newFavs.has(gameId)) {
      newFavs.delete(gameId);
      await actor.removeFavorite(BigInt(gameId)).catch(() => {});
    } else {
      newFavs.add(gameId);
      await actor.addFavorite(BigInt(gameId)).catch(() => {});
    }
    setFavorites(newFavs);
  };

  return (
    <div className="page-transition">
      {activeGame && (
        <GameViewer game={activeGame} onClose={() => setActiveGame(null)} />
      )}

      {/* Header */}
      <div
        className="px-4 sm:px-8 py-8 border-b border-white/5"
        style={{ background: "rgba(255,255,255,0.02)" }}
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-3xl sm:text-4xl font-black text-white mb-2 glow-text">
            All Games
          </h1>
          <p className="text-white/40 text-sm mb-6">
            {GAMES.length} games — browser-ready, no downloads
          </p>

          {/* Search */}
          <div className="relative max-w-lg mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <Input
              type="text"
              placeholder="Search games..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-white/5 border-purple-500/20 text-white placeholder:text-white/25 focus:border-purple-400 pr-9"
              data-ocid="games.search_input"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                data-ocid="games.button"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Game categories"
          >
            {(["All", ...CATEGORIES] as const).map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setActiveCategory(cat)}
                role="tab"
                aria-selected={activeCategory === cat}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-purple-600 text-white shadow-neon"
                    : "bg-white/5 text-white/50 hover:text-white hover:bg-white/10 border border-white/10"
                }`}
                data-ocid="games.tab"
              >
                {cat}
                {cat !== "All" && (
                  <span className="ml-1.5 text-xs opacity-60">
                    ({GAMES.filter((g) => g.category === cat).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-24" data-ocid="games.empty_state">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-white font-bold text-lg mb-2">
              No games found
            </h3>
            <p className="text-white/40 text-sm">
              Try a different search or category
            </p>
            <Button
              variant="ghost"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-4 text-purple-400"
              data-ocid="games.button"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            <p className="text-white/30 text-sm mb-6">
              {filtered.length} games
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filtered.map((game, i) => (
                <div
                  key={game.id}
                  className="glass-card glass-card-hover rounded-xl overflow-hidden group relative"
                  data-ocid={`games.item.${i + 1}`}
                >
                  {/* Thumbnail */}
                  <div
                    className="h-28 relative flex items-center justify-center"
                    style={{ background: game.thumbnailColor }}
                  >
                    <span className="text-3xl opacity-60">🎮</span>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all" />
                    <button
                      type="button"
                      onClick={() => toggleFavorite(game.id)}
                      className={`absolute top-2 right-2 p-1.5 rounded-full transition-all ${
                        favorites.has(game.id)
                          ? "bg-pink-500/80 text-white"
                          : "bg-black/40 text-white/60 hover:text-pink-400"
                      }`}
                      aria-label={
                        favorites.has(game.id)
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                      data-ocid="games.toggle"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${favorites.has(game.id) ? "fill-current" : ""}`}
                      />
                    </button>
                    <Badge className="absolute bottom-2 left-2 text-[10px] bg-black/50 border-0 text-white/80">
                      {game.category}
                    </Badge>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <h3 className="text-white text-xs font-semibold leading-tight truncate mb-1">
                      {game.name}
                    </h3>
                    <p className="text-white/40 text-[11px] line-clamp-2 mb-3 leading-relaxed">
                      {game.description}
                    </p>
                    <Button
                      onClick={() => setActiveGame(game)}
                      size="sm"
                      className="w-full neon-btn text-white text-xs py-1 h-7"
                      data-ocid="games.primary_button"
                    >
                      <Play className="w-3 h-3 mr-1" />
                      Play
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
