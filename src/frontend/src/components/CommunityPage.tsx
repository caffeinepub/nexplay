import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Gamepad2,
  MessageSquare,
  Trophy,
  Users,
} from "lucide-react";

export function CommunityPage() {
  return (
    <div className="page-transition max-w-6xl mx-auto px-4 sm:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-display text-3xl sm:text-4xl font-black text-white mb-2 glow-text">
          Community
        </h1>
        <p className="text-white/40 text-base max-w-xl mx-auto">
          Join thousands of NexPlay gamers on Discord. Chat, share clips, find
          teammates, and stay updated.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Discord Widget - Main */}
        <div className="lg:col-span-2">
          <div
            className="glass-card rounded-2xl overflow-hidden neon-border-purple"
            data-ocid="community.panel"
          >
            <div className="p-5 border-b border-white/5 flex items-center gap-3">
              <svg
                className="w-6 h-6 text-[#5865F2]"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-label="Discord logo"
                role="img"
              >
                <title>Discord</title>
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
              </svg>
              <div>
                <h2 className="text-white font-bold">NexPlay Discord Server</h2>
                <p className="text-white/40 text-xs">
                  Join the official community
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto text-[#5865F2] hover:bg-[#5865F2]/10"
                onClick={() =>
                  window.open("https://discord.gg/nexplay", "_blank")
                }
                data-ocid="community.link"
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>

            {/* Discord Embed */}
            <div className="relative" style={{ height: "500px" }}>
              <iframe
                src="https://discord.com/widget?id=1234567890&theme=dark"
                width="100%"
                height="100%"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                title="Discord Widget"
                className="border-0"
              />
              {/* Fallback overlay if Discord widget fails */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                style={{
                  background: "rgba(88,101,242,0.05)",
                  pointerEvents: "none",
                }}
              >
                <div className="text-6xl">💬</div>
                <div className="text-center">
                  <p className="text-white/70 font-semibold">
                    Join our Discord Community
                  </p>
                  <p className="text-white/40 text-sm mt-1">
                    Connect with 10,000+ NexPlay gamers
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-white/5">
              <Button
                className="w-full"
                style={{ background: "#5865F2", color: "white" }}
                onClick={() =>
                  window.open("https://discord.gg/nexplay", "_blank")
                }
                data-ocid="community.primary_button"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <title>Discord</title>
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                </svg>
                Open in Discord
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side Stats */}
        <div className="space-y-4">
          {/* Community Stats */}
          <div
            className="glass-card rounded-2xl p-5"
            data-ocid="community.card"
          >
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-400" />
              Community Stats
            </h3>
            <div className="space-y-3">
              {[
                {
                  label: "Total Members",
                  value: "12,450",
                  color: "text-purple-400",
                },
                { label: "Online Now", value: "847", color: "text-green-400" },
                {
                  label: "Games Played Today",
                  value: "3,219",
                  color: "text-yellow-400",
                },
                {
                  label: "Messages Sent",
                  value: "28,901",
                  color: "text-cyan-400",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-white/50 text-sm">{stat.label}</span>
                  <span className={`font-bold text-sm ${stat.color}`}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Channels */}
          <div
            className="glass-card rounded-2xl p-5"
            data-ocid="community.card"
          >
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              Popular Channels
            </h3>
            <div className="space-y-2">
              {[
                { name: "# general", members: "8.2k", icon: "💬" },
                { name: "# game-clips", members: "4.1k", icon: "🎬" },
                { name: "# find-teammates", members: "2.8k", icon: "🤝" },
                { name: "# suggestions", members: "1.9k", icon: "💡" },
                { name: "# off-topic", members: "3.4k", icon: "🌟" },
              ].map((ch) => (
                <div
                  key={ch.name}
                  className="flex items-center justify-between py-1.5"
                >
                  <span className="text-white/70 text-sm flex items-center gap-2">
                    <span>{ch.icon}</span>
                    {ch.name}
                  </span>
                  <span className="text-white/30 text-xs">{ch.members}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Games */}
          <div
            className="glass-card rounded-2xl p-5"
            data-ocid="community.card"
          >
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Gamepad2 className="w-4 h-4 text-yellow-400" />
              Most Played Today
            </h3>
            <div className="space-y-2">
              {[
                { name: "Slope", rank: 1, plays: "1.2k" },
                { name: "1v1.LOL", rank: 2, plays: "987" },
                { name: "Krunker.io", rank: 3, plays: "856" },
                { name: "Run 3", rank: 4, plays: "743" },
                { name: "Geometry Dash", rank: 5, plays: "621" },
              ].map((game) => (
                <div key={game.name} className="flex items-center gap-3 py-1">
                  <div className="w-5 h-5 rounded-full bg-purple-600/30 flex items-center justify-center text-xs text-purple-300 font-bold flex-shrink-0">
                    {game.rank}
                  </div>
                  <span className="text-white/70 text-sm flex-1">
                    {game.name}
                  </span>
                  <span className="text-white/30 text-xs">{game.plays}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div
            className="glass-card rounded-2xl p-5"
            data-ocid="community.card"
          >
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-400" />
              Top Players
            </h3>
            <div className="space-y-2">
              {[
                { name: "ShadowGamer99", score: "45,200" },
                { name: "ProSlope_X", score: "38,750" },
                { name: "NexKing", score: "31,100" },
                { name: "GlitchHunter", score: "28,940" },
                { name: "PixelWarrior", score: "22,380" },
              ].map((player, i) => (
                <div key={player.name} className="flex items-center gap-3 py-1">
                  <div
                    className={`text-sm font-bold w-4 ${i === 0 ? "text-yellow-400" : i === 1 ? "text-gray-300" : i === 2 ? "text-orange-400" : "text-white/30"}`}
                  >
                    {i === 0
                      ? "🥇"
                      : i === 1
                        ? "🥈"
                        : i === 2
                          ? "🥉"
                          : `${i + 1}`}
                  </div>
                  <span className="text-white/70 text-sm flex-1">
                    {player.name}
                  </span>
                  <span className="text-purple-400 text-xs font-medium">
                    {player.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
