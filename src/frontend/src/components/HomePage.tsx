import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Heart, Play, Star, Trophy, Users, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import type { UserProfile } from "../backend.d";
import { GAMES, type Game, getGameById } from "../games";
import { useActor } from "../hooks/useActor";
import { GameViewer } from "./GameViewer";

interface HomePageProps {
  profile: UserProfile | null;
  onNavigate: (page: string) => void;
}

function GameCard({
  game,
  isFavorite,
  onPlay,
  onToggleFavorite,
}: {
  game: Game;
  isFavorite: boolean;
  onPlay: (game: Game) => void;
  onToggleFavorite: (gameId: number) => void;
}) {
  return (
    <div className="glass-card glass-card-hover rounded-xl overflow-hidden group relative">
      {/* Thumbnail */}
      <div
        className="h-28 relative flex items-center justify-center text-3xl"
        style={{ background: game.thumbnailColor }}
      >
        <span className="opacity-70">🎮</span>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all" />
        <button
          type="button"
          onClick={() => onToggleFavorite(game.id)}
          className={`absolute top-2 right-2 p-1.5 rounded-full transition-all ${
            isFavorite
              ? "bg-pink-500/80 text-white"
              : "bg-black/40 text-white/60 hover:text-pink-400"
          }`}
          data-ocid="game.toggle"
        >
          <Heart
            className={`w-3.5 h-3.5 ${isFavorite ? "fill-current" : ""}`}
          />
        </button>
        <Badge className="absolute bottom-2 left-2 text-[10px] bg-black/50 border-0 text-white/80">
          {game.category}
        </Badge>
      </div>
      {/* Info */}
      <div className="p-3">
        <h3 className="text-white text-sm font-semibold leading-tight truncate mb-1">
          {game.name}
        </h3>
        <p className="text-white/40 text-xs line-clamp-2 mb-3 leading-relaxed">
          {game.description}
        </p>
        <Button
          onClick={() => onPlay(game)}
          size="sm"
          className="w-full neon-btn text-white text-xs py-1.5 h-7"
          data-ocid="game.primary_button"
        >
          <Play className="w-3 h-3 mr-1" />
          Play
        </Button>
      </div>
    </div>
  );
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { actor } = useActor();
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [recentlyPlayed, setRecentlyPlayed] = useState<Game[]>([]);
  const [favGames, setFavGames] = useState<Game[]>([]);

  const featuredGames = GAMES.slice(0, 6);

  useEffect(() => {
    if (!actor) return;
    const load = async () => {
      const [favIds, recent] = await Promise.all([
        actor.getCallerFavorites().catch(() => [] as bigint[]),
        actor.getCallerRecentlyPlayed().catch(() => []),
      ]);
      const favSet = new Set(favIds.map(Number));
      setFavorites(favSet);
      setFavGames(
        Array.from(favSet)
          .map((id) => getGameById(id))
          .filter(Boolean) as Game[],
      );
      const recentGames = recent
        .slice(0, 6)
        .map((r) => getGameById(Number(r.gameId)))
        .filter(Boolean) as Game[];
      setRecentlyPlayed(recentGames);
    };
    load();
  }, [actor]);

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
    setFavGames(
      Array.from(newFavs)
        .map((id) => getGameById(id))
        .filter(Boolean) as Game[],
    );
  };

  return (
    <div className="page-transition">
      {activeGame && (
        <GameViewer game={activeGame} onClose={() => setActiveGame(null)} />
      )}

      {/* Hero Section */}
      <section
        className="relative hero-bg py-16 px-4 sm:px-8 overflow-hidden"
        data-ocid="home.section"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 text-6xl opacity-10 rotate-12">
              🎮
            </div>
            <div className="absolute bottom-10 right-10 text-6xl opacity-10 -rotate-12">
              🕹️
            </div>
            <div className="absolute top-1/2 left-5 text-4xl opacity-5">⚡</div>
            <div className="absolute top-1/3 right-5 text-4xl opacity-5">
              🏆
            </div>
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 text-purple-300 text-sm mb-6">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              100+ Games Unblocked & Ready
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-black mb-4 leading-tight">
              Welcome to{" "}
              <span className="nexplay-logo text-5xl sm:text-7xl block mt-1">
                NexPlay
              </span>
            </h1>

            <p className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
              Play 100+ unblocked games, anytime, anywhere. No downloads. No
              restrictions. Just pure gaming freedom.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Button
                onClick={() => onNavigate("games")}
                className="neon-btn text-white px-8 py-3 text-base font-semibold rounded-xl"
                data-ocid="home.primary_button"
              >
                <Play className="w-4 h-4 mr-2" />
                Browse All Games
              </Button>
              <Button
                variant="outline"
                onClick={() => onNavigate("shop")}
                className="border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10 px-8 py-3 text-base rounded-xl"
                data-ocid="home.secondary_button"
              >
                <Star className="w-4 h-4 mr-2" />
                Go Pro
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              {[
                {
                  icon: <Trophy className="w-5 h-5 text-yellow-400" />,
                  value: "100+",
                  label: "Games",
                },
                {
                  icon: <Users className="w-5 h-5 text-purple-400" />,
                  value: "10K+",
                  label: "Players",
                },
                {
                  icon: <Zap className="w-5 h-5 text-cyan-400" />,
                  value: "0",
                  label: "Downloads",
                },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    {stat.icon}
                  </div>
                  <div className="text-white font-bold text-2xl">
                    {stat.value}
                  </div>
                  <div className="text-white/40 text-xs uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-16 space-y-12">
        {/* Featured Games */}
        <section data-ocid="home.section">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-white text-2xl font-bold font-display glow-text">
                Featured Games
              </h2>
              <p className="text-white/40 text-sm mt-1">Top picks for today</p>
            </div>
            <Button
              variant="ghost"
              onClick={() => onNavigate("games")}
              className="text-purple-400 hover:text-purple-300 text-sm"
              data-ocid="home.link"
            >
              View All →
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredGames.map((game, i) => (
              <div key={game.id} data-ocid={`home.item.${i + 1}`}>
                <GameCard
                  game={game}
                  isFavorite={favorites.has(game.id)}
                  onPlay={setActiveGame}
                  onToggleFavorite={toggleFavorite}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Recently Played */}
        {recentlyPlayed.length > 0 && (
          <section data-ocid="home.section">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-cyan-400" />
              <h2 className="text-white text-2xl font-bold font-display">
                Recently Played
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {recentlyPlayed.map((game, i) => (
                <div key={game.id} data-ocid={`home.item.${i + 1}`}>
                  <GameCard
                    game={game}
                    isFavorite={favorites.has(game.id)}
                    onPlay={setActiveGame}
                    onToggleFavorite={toggleFavorite}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Favorites */}
        {favGames.length > 0 && (
          <section data-ocid="home.section">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="w-5 h-5 text-pink-400 fill-current" />
              <h2 className="text-white text-2xl font-bold font-display">
                Your Favorites
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {favGames.slice(0, 6).map((game, i) => (
                <div key={game.id} data-ocid={`home.item.${i + 1}`}>
                  <GameCard
                    game={game}
                    isFavorite={true}
                    onPlay={setActiveGame}
                    onToggleFavorite={toggleFavorite}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty favorites state */}
        {favGames.length === 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Heart className="w-5 h-5 text-pink-400" />
              <h2 className="text-white text-2xl font-bold font-display">
                Your Favorites
              </h2>
            </div>
            <div
              className="glass-card rounded-xl p-12 text-center"
              data-ocid="home.empty_state"
            >
              <div className="text-4xl mb-3">💜</div>
              <p className="text-white/50 text-sm">
                No favorites yet. Click the ♥ on any game to save it here!
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
