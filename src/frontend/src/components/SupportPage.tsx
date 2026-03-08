import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Check, Flag, Gamepad2, Headphones, Loader2 } from "lucide-react";
import { useState } from "react";
import { TicketCategory } from "../backend.d";
import { useActor } from "../hooks/useActor";

export function SupportPage() {
  const { actor } = useActor();

  // Report a Game
  const [reportGameName, setReportGameName] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [reportSubmitting, setReportSubmitting] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);
  const [reportError, setReportError] = useState("");

  // Support Ticket
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [ticketCategory, setTicketCategory] = useState<TicketCategory>(
    TicketCategory.game,
  );
  const [ticketSubmitting, setTicketSubmitting] = useState(false);
  const [ticketSuccess, setTicketSuccess] = useState(false);
  const [ticketError, setTicketError] = useState("");

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor || !reportDescription.trim()) return;
    setReportSubmitting(true);
    setReportError("");
    try {
      const desc = reportGameName.trim()
        ? `Game: ${reportGameName.trim()} — ${reportDescription.trim()}`
        : reportDescription.trim();
      await actor.submitGameReport(null, desc);
      setReportSuccess(true);
      setReportGameName("");
      setReportDescription("");
      setTimeout(() => setReportSuccess(false), 5000);
    } catch {
      setReportError("Failed to submit report. Please try again.");
    } finally {
      setReportSubmitting(false);
    }
  };

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor || !ticketSubject.trim() || !ticketDescription.trim()) return;
    setTicketSubmitting(true);
    setTicketError("");
    try {
      await actor.submitSupportTicket(
        ticketSubject.trim(),
        ticketDescription.trim(),
        ticketCategory,
      );
      setTicketSuccess(true);
      setTicketSubject("");
      setTicketDescription("");
      setTicketCategory(TicketCategory.game);
      setTimeout(() => setTicketSuccess(false), 5000);
    } catch {
      setTicketError("Failed to submit ticket. Please try again.");
    } finally {
      setTicketSubmitting(false);
    }
  };

  return (
    <div className="page-transition max-w-4xl mx-auto px-4 sm:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-display text-3xl sm:text-4xl font-black text-white mb-2 glow-text">
          Support
        </h1>
        <p className="text-white/40">
          Found an issue? Let us know and we'll fix it. Average response time:
          under 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Report a Game */}
        <div
          className="glass-card rounded-2xl p-6 neon-border-purple"
          data-ocid="support.section"
        >
          <h2 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-yellow-400" />
            Report a Game
          </h2>

          {reportSuccess ? (
            <div className="py-8 text-center" data-ocid="support.success_state">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-white font-semibold mb-1">
                Report Submitted!
              </h3>
              <p className="text-white/50 text-sm">
                We'll review this game issue and fix it soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleReportSubmit} className="space-y-4">
              <div>
                <Label
                  htmlFor="report-game-name"
                  className="text-purple-200 text-sm mb-1.5 block"
                >
                  Game Name (optional)
                </Label>
                <Input
                  id="report-game-name"
                  value={reportGameName}
                  onChange={(e) => setReportGameName(e.target.value)}
                  placeholder="e.g. Subway Surfers, Slope..."
                  className="bg-white/5 border-purple-500/20 text-white placeholder:text-white/25 focus:border-purple-400"
                  data-ocid="support.input"
                />
              </div>
              <div>
                <Label
                  htmlFor="report-desc"
                  className="text-purple-200 text-sm mb-1.5 block"
                >
                  Describe the Issue <span className="text-red-400">*</span>
                </Label>
                <Textarea
                  id="report-desc"
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  placeholder="e.g. The game won't load, shows a blank screen, audio is broken..."
                  className="bg-white/5 border-purple-500/20 text-white placeholder:text-white/25 resize-none h-32"
                  required
                  data-ocid="support.textarea"
                />
              </div>
              {reportError && (
                <p
                  className="text-red-400 text-sm"
                  data-ocid="support.error_state"
                >
                  {reportError}
                </p>
              )}
              <Button
                type="submit"
                disabled={reportSubmitting || !reportDescription.trim()}
                className="w-full neon-btn text-white font-semibold"
                data-ocid="support.submit_button"
              >
                {reportSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                    Submitting...
                  </>
                ) : (
                  <>
                    <Flag className="w-4 h-4 mr-2" /> Submit Game Report
                  </>
                )}
              </Button>
            </form>
          )}
        </div>

        {/* Support Ticket */}
        <div
          className="glass-card rounded-2xl p-6 neon-border-purple"
          data-ocid="support.section"
        >
          <h2 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
            <Headphones className="w-5 h-5 text-purple-400" />
            Submit Support Ticket
          </h2>

          {ticketSuccess ? (
            <div className="py-8 text-center" data-ocid="support.success_state">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-white font-semibold mb-1">
                Ticket Submitted!
              </h3>
              <p className="text-white/50 text-sm">
                We'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleTicketSubmit} className="space-y-4">
              <div>
                <Label
                  htmlFor="ticket-category"
                  className="text-purple-200 text-sm mb-1.5 block"
                >
                  Category <span className="text-red-400">*</span>
                </Label>
                <Select
                  value={ticketCategory}
                  onValueChange={(v) => setTicketCategory(v as TicketCategory)}
                >
                  <SelectTrigger
                    className="bg-white/5 border-purple-500/20 text-white"
                    data-ocid="support.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a0a2e] border-purple-500/20">
                    <SelectItem
                      value={TicketCategory.game}
                      className="text-white hover:bg-purple-600/20"
                    >
                      Game Issue
                    </SelectItem>
                    <SelectItem
                      value={TicketCategory.website}
                      className="text-white hover:bg-purple-600/20"
                    >
                      Website Bug
                    </SelectItem>
                    <SelectItem
                      value={TicketCategory.account}
                      className="text-white hover:bg-purple-600/20"
                    >
                      Account Help
                    </SelectItem>
                    <SelectItem
                      value={TicketCategory.other}
                      className="text-white hover:bg-purple-600/20"
                    >
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="ticket-subject"
                  className="text-purple-200 text-sm mb-1.5 block"
                >
                  Subject <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="ticket-subject"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="Brief summary of your issue"
                  className="bg-white/5 border-purple-500/20 text-white placeholder:text-white/25 focus:border-purple-400"
                  required
                  data-ocid="support.input"
                />
              </div>
              <div>
                <Label
                  htmlFor="ticket-desc"
                  className="text-purple-200 text-sm mb-1.5 block"
                >
                  Description <span className="text-red-400">*</span>
                </Label>
                <Textarea
                  id="ticket-desc"
                  value={ticketDescription}
                  onChange={(e) => setTicketDescription(e.target.value)}
                  placeholder="Tell us what happened and how to reproduce it..."
                  className="bg-white/5 border-purple-500/20 text-white placeholder:text-white/25 resize-none h-32"
                  required
                  data-ocid="support.textarea"
                />
              </div>
              {ticketError && (
                <p
                  className="text-red-400 text-sm"
                  data-ocid="support.error_state"
                >
                  {ticketError}
                </p>
              )}
              <Button
                type="submit"
                disabled={
                  ticketSubmitting ||
                  !ticketSubject.trim() ||
                  !ticketDescription.trim()
                }
                className="w-full neon-btn text-white font-semibold"
                data-ocid="support.submit_button"
              >
                {ticketSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                    Submitting...
                  </>
                ) : (
                  <>
                    <Headphones className="w-4 h-4 mr-2" /> Submit Ticket
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>

      {/* FAQ */}
      <div
        className="mt-10 glass-card rounded-2xl p-6"
        data-ocid="support.section"
      >
        <h2 className="text-white font-bold text-lg mb-6">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            {
              q: "Why can't I load a game?",
              a: "Some games require specific browser settings. Try disabling any ad blockers or extensions for NexPlay. If the issue persists, report it using the form above.",
            },
            {
              q: "Can I play on mobile?",
              a: "Yes! NexPlay works on mobile browsers. Some games may play better on desktop due to keyboard requirements.",
            },
            {
              q: "How do I upgrade to Pro?",
              a: "Visit the Shop tab and click 'Upgrade to Pro'. You'll get immediate access to 250+ games and all Pro features.",
            },
            {
              q: "What's the Admin tier?",
              a: "Admin is a one-time $300 payment that grants full administrative access. You must pass a 200-question quiz to qualify.",
            },
          ].map((faq) => (
            <div key={faq.q} className="p-4 bg-white/3 rounded-xl">
              <h3 className="text-white font-medium text-sm mb-2">{faq.q}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
