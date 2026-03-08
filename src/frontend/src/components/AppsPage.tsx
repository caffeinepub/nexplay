import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Loader2 } from "lucide-react";
import { useState } from "react";

interface AppItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  embedUrl: string;
  color: string;
}

const APPS: AppItem[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    description:
      "AI-powered chat assistant for homework help, creative writing, coding, and everything else.",
    icon: "🤖",
    embedUrl: "https://diddygpt-hmm.caffeine.xyz",
    color: "linear-gradient(135deg, #10a37f, #1a7f64)",
  },
  {
    id: "google",
    name: "Private Google",
    description:
      "Search the web privately without tracking. Find answers, images, news, and more.",
    icon: "🔍",
    embedUrl: "https://gonggo-tse.caffeine.xyz",
    color: "linear-gradient(135deg, #4285f4, #34a853, #fbbc05, #ea4335)",
  },
  {
    id: "movies",
    name: "Movies",
    description:
      "Watch movies and shows directly in the browser. Tons of content always available.",
    icon: "🎬",
    embedUrl:
      "https://lovable.dev/projects/39ba3a14-41e2-4a8c-9329-c10555a2ac7d",
    color: "linear-gradient(135deg, #e50914, #8b0000)",
  },
  {
    id: "youtube",
    name: "YouTube",
    description:
      "Watch videos, music, tutorials, and entertainment from creators worldwide.",
    icon: "▶️",
    embedUrl: "https://www.youtube.com",
    color: "linear-gradient(135deg, #ff0000, #cc0000)",
  },
  {
    id: "snapchat",
    name: "Snapchat Web",
    description:
      "Access Snapchat stories, messages, and snaps directly in your browser without the app.",
    icon: "👻",
    embedUrl: "https://web.snapchat.com",
    color: "linear-gradient(135deg, #fffc00, #f0e800)",
  },
];

export function AppsPage() {
  const [activeApp, setActiveApp] = useState<AppItem | null>(null);
  const [loading, setLoading] = useState(false);

  const openApp = (app: AppItem) => {
    setLoading(true);
    setActiveApp(app);
  };

  if (activeApp) {
    return (
      <div
        className="fixed inset-0 z-40 flex flex-col"
        style={{ background: "#080818" }}
      >
        {/* App Header */}
        <div
          className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
          style={{
            background: "rgba(8,8,24,0.9)",
            borderBottom: "1px solid rgba(167,139,250,0.15)",
          }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setActiveApp(null);
              setLoading(false);
            }}
            className="text-white/60 hover:text-white gap-1.5"
            data-ocid="apps.button"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-xl">{activeApp.icon}</span>
            <span className="text-white font-semibold">{activeApp.name}</span>
          </div>
          <div className="ml-auto text-white/30 text-xs">
            Press Back or close tab to exit
          </div>
        </div>

        {/* iframe */}
        <div className="flex-1 relative">
          {loading && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10"
              style={{ background: "#080818" }}
              data-ocid="apps.loading_state"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                style={{ background: activeApp.color }}
              >
                {activeApp.icon}
              </div>
              <div className="flex items-center gap-2 text-purple-300">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Loading {activeApp.name}...</span>
              </div>
            </div>
          )}
          <iframe
            src={activeApp.embedUrl}
            title={activeApp.name}
            className="w-full h-full border-0"
            onLoad={() => setLoading(false)}
            allow="fullscreen; autoplay; payment; camera; microphone"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation allow-downloads"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="page-transition max-w-6xl mx-auto px-4 sm:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-display text-3xl sm:text-4xl font-black text-white mb-2 glow-text">
          Apps
        </h1>
        <p className="text-white/40 text-base">
          Access powerful web apps directly inside NexPlay — no new tabs needed.
        </p>
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {APPS.map((app, i) => (
          <div
            key={app.id}
            className="glass-card glass-card-hover rounded-2xl overflow-hidden"
            data-ocid={`apps.item.${i + 1}`}
          >
            {/* App Banner */}
            <div
              className="h-32 flex items-center justify-center relative overflow-hidden"
              style={{ background: app.color }}
            >
              <div
                className="text-6xl"
                style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}
              >
                {app.icon}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* App Info */}
            <div className="p-5">
              <h3 className="text-white font-bold text-lg mb-1.5 flex items-center gap-2">
                {app.name}
                <ExternalLink className="w-3.5 h-3.5 text-white/30" />
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-4">
                {app.description}
              </p>
              <Button
                onClick={() => openApp(app)}
                className="w-full neon-btn text-white font-semibold"
                data-ocid="apps.primary_button"
              >
                Open {app.name}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      <div className="mt-8 text-center">
        <p className="text-white/20 text-sm">
          Apps open in a fullscreen panel. Some apps may require their own
          accounts.
        </p>
      </div>
    </div>
  );
}
