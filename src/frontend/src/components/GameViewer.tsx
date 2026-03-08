import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Flag, Loader2, Maximize2, Minimize2, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Game } from "../games";
import { useActor } from "../hooks/useActor";

interface GameViewerProps {
  game: Game;
  onClose: () => void;
}

export function GameViewer({ game, onClose }: GameViewerProps) {
  const { actor } = useActor();
  const [loading, setLoading] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportText, setReportText] = useState("");
  const [reportSubmitting, setReportSubmitting] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  useEffect(() => {
    // Record game play
    if (actor) {
      actor.recordGamePlay(BigInt(game.id)).catch(() => {});
    }
  }, [actor, game.id]);

  // Escape key closes viewer
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (reportOpen) setReportOpen(false);
        else onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, reportOpen]);

  const handleReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportText.trim() || !actor) return;
    setReportSubmitting(true);
    try {
      await actor.submitGameReport(BigInt(game.id), reportText.trim());
      setReportSuccess(true);
      setReportText("");
      setTimeout(() => {
        setReportOpen(false);
        setReportSuccess(false);
      }, 2000);
    } catch {
      // silent fail
    } finally {
      setReportSubmitting(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col ${fullscreen ? "" : "p-4 sm:p-8"}`}
      style={{ background: "rgba(5,5,15,0.97)", backdropFilter: "blur(8px)" }}
      data-ocid="game.modal"
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between gap-4 flex-shrink-0 ${fullscreen ? "absolute top-0 left-0 right-0 z-10 px-4 py-3" : "mb-3"}`}
        style={fullscreen ? { background: "rgba(5,5,15,0.9)" } : {}}
      >
        <h2 className="text-white font-bold text-lg glow-text truncate">
          {game.name}
        </h2>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setReportOpen(true)}
            className="text-yellow-400/70 hover:text-yellow-400 hover:bg-yellow-400/10 gap-1"
            data-ocid="game.open_modal_button"
          >
            <Flag className="w-4 h-4" />
            <span className="hidden sm:inline">Report</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFullscreen(!fullscreen)}
            className="text-white/60 hover:text-white hover:bg-white/10"
            data-ocid="game.toggle"
          >
            {fullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white/60 hover:text-red-400 hover:bg-red-500/10"
            data-ocid="game.close_button"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* iframe container */}
      <div
        className={`relative flex-1 rounded-xl overflow-hidden ${fullscreen ? "mt-10" : ""}`}
        style={{ border: "1px solid rgba(167,139,250,0.2)" }}
      >
        {loading && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#080818] z-10"
            data-ocid="game.loading_state"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
              style={{ background: game.thumbnailColor }}
            >
              🎮
            </div>
            <div className="flex items-center gap-2 text-purple-300">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm">Loading {game.name}...</span>
            </div>
          </div>
        )}
        <iframe
          src={game.embedUrl}
          title={game.name}
          className="w-full h-full border-0"
          onLoad={() => setLoading(false)}
          allow="fullscreen; autoplay; payment"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation"
        />
      </div>

      {/* Report Modal */}
      {reportOpen && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.8)" }}
          data-ocid="report.dialog"
        >
          <div className="glass-card rounded-2xl p-6 w-full max-w-md neon-border-purple">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <Flag className="w-5 h-5 text-yellow-400" />
              Report Game Issue
            </h3>
            {reportSuccess ? (
              <div
                className="text-center py-4"
                data-ocid="report.success_state"
              >
                <div className="text-3xl mb-2">✅</div>
                <p className="text-green-400 font-medium">
                  Report submitted! Thank you.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReport} className="space-y-4">
                <div>
                  <Label className="text-purple-200 text-sm mb-1.5 block">
                    Game: <span className="text-white">{game.name}</span>
                  </Label>
                  <Label
                    htmlFor="report-desc"
                    className="text-purple-200 text-sm mb-1.5 block"
                  >
                    Describe the issue
                  </Label>
                  <Textarea
                    id="report-desc"
                    value={reportText}
                    onChange={(e) => setReportText(e.target.value)}
                    placeholder="e.g. Game won't load, audio broken, crashes on level 3..."
                    className="bg-white/5 border-purple-500/30 text-white placeholder:text-white/30 resize-none h-28"
                    data-ocid="report.textarea"
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setReportOpen(false)}
                    className="flex-1 border border-white/10 text-white/60 hover:text-white"
                    data-ocid="report.cancel_button"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={!reportText.trim() || reportSubmitting}
                    className="flex-1 neon-btn text-white"
                    data-ocid="report.submit_button"
                  >
                    {reportSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Submit Report"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
