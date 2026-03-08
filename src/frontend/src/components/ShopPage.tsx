import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Check,
  Crown,
  Loader2,
  Shield,
  Star,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { UserTier } from "../backend.d";
import type { UserProfile } from "../backend.d";
import { useActor } from "../hooks/useActor";

interface ShopPageProps {
  profile: UserProfile | null;
  onProfileUpdate: () => void;
}

const QUIZ_QUESTIONS_LOCAL = [
  {
    id: 1,
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "High Text Machine Language",
      "Hyper Transfer Markup Logic",
      "HyperText Making Language",
    ],
  },
  {
    id: 2,
    question: "Which game engine powers most mobile games?",
    options: ["Unity", "Unreal Engine", "Godot", "CryEngine"],
  },
  {
    id: 3,
    question: "What is iframe used for in web development?",
    options: [
      "Embedding external content",
      "Creating animations",
      "Styling elements",
      "Handling events",
    ],
  },
  {
    id: 4,
    question:
      "What programming language is primarily used for front-end web development?",
    options: ["JavaScript", "Python", "Java", "C++"],
  },
  {
    id: 5,
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Creative Style Syntax",
      "Coded Style System",
      "Custom Style Scripts",
    ],
  },
  {
    id: 6,
    question: "Which company developed the Internet Computer Protocol?",
    options: ["DFINITY Foundation", "Google", "Microsoft", "Amazon"],
  },
  {
    id: 7,
    question: "What is the purpose of a CDN?",
    options: [
      "Content Delivery Network for faster loading",
      "Code Development Node",
      "Central Data Namespace",
      "Cloud Database Network",
    ],
  },
  {
    id: 8,
    question: "What does API stand for?",
    options: [
      "Application Programming Interface",
      "Automatic Protocol Integration",
      "Advanced Programming Index",
      "Application Protocol Input",
    ],
  },
  {
    id: 9,
    question: "Which protocol is used for secure web browsing?",
    options: ["HTTPS", "FTP", "SMTP", "HTTP"],
  },
  {
    id: 10,
    question: "What is React?",
    options: [
      "A JavaScript library for building UIs",
      "A server-side language",
      "A database system",
      "An operating system",
    ],
  },
];

export function ShopPage({ profile, onProfileUpdate }: ShopPageProps) {
  const { actor } = useActor();
  const [tier, setTier] = useState<UserTier>(profile?.tier ?? UserTier.free);
  const [upgrading, setUpgrading] = useState(false);
  const [upgradeSuccess, setUpgradeSuccess] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<
    Array<{ id: bigint; question: string; options: string[] }>
  >([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<bigint[]>([]);
  const [quizSubmitting, setQuizSubmitting] = useState(false);
  const [quizResult, setQuizResult] = useState<{
    passed: boolean;
    score: bigint;
  } | null>(null);

  useEffect(() => {
    if (!actor) return;
    actor
      .getUserTier()
      .then(setTier)
      .catch(() => {});
  }, [actor]);

  const handleUpgradePro = async () => {
    if (!actor) return;
    setUpgrading(true);
    try {
      await actor.upgradeToPro();
      setTier(UserTier.pro);
      setUpgradeSuccess(true);
      onProfileUpdate();
    } catch {
      // silent fail
    } finally {
      setUpgrading(false);
    }
  };

  const handleOpenQuiz = async () => {
    if (!actor) return;
    try {
      const questions = await actor.getQuizQuestions();
      if (questions.length > 0) {
        setQuizQuestions(questions.slice(0, 20));
      } else {
        // Use local fallback questions
        setQuizQuestions(
          QUIZ_QUESTIONS_LOCAL.map((q, i) => ({
            id: BigInt(i + 1),
            question: q.question,
            options: q.options,
          })),
        );
      }
    } catch {
      setQuizQuestions(
        QUIZ_QUESTIONS_LOCAL.map((q, i) => ({
          id: BigInt(i + 1),
          question: q.question,
          options: q.options,
        })),
      );
    }
    setCurrentQ(0);
    setAnswers([]);
    setQuizResult(null);
    setQuizOpen(true);
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, BigInt(answerIndex)];
    setAnswers(newAnswers);
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // Submit quiz
      submitQuiz(newAnswers);
    }
  };

  const submitQuiz = async (finalAnswers: bigint[]) => {
    if (!actor) return;
    setQuizSubmitting(true);
    try {
      const result = await actor.submitQuiz(finalAnswers);
      setQuizResult({ passed: result.passed, score: result.score });
      if (result.passed) {
        await actor.upgradeToAdmin();
        setTier(UserTier.admin);
        onProfileUpdate();
      }
    } catch {
      setQuizResult({ passed: false, score: BigInt(0) });
    } finally {
      setQuizSubmitting(false);
    }
  };

  const progress =
    quizQuestions.length > 0 ? (currentQ / quizQuestions.length) * 100 : 0;

  return (
    <div className="page-transition max-w-5xl mx-auto px-4 sm:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-display text-3xl sm:text-4xl font-black text-white mb-2 glow-text">
          NexPlay Shop
        </h1>
        <p className="text-white/40 text-base">
          Upgrade your experience and unlock exclusive features
        </p>
        {tier !== UserTier.free && (
          <div
            className={`inline-flex items-center gap-2 mt-3 px-4 py-1.5 rounded-full text-sm font-semibold ${
              tier === UserTier.admin
                ? "bg-yellow-400/10 border border-yellow-400/30 text-yellow-400"
                : "bg-purple-500/10 border border-purple-500/30 text-purple-300"
            }`}
            data-ocid="shop.success_state"
          >
            {tier === UserTier.admin ? (
              <Crown className="w-4 h-4" />
            ) : (
              <Star className="w-4 h-4" />
            )}
            You're currently on the {tier.toUpperCase()} tier!
          </div>
        )}
      </div>

      {/* Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Pro Tier */}
        <div
          className={`glass-card rounded-2xl overflow-hidden relative ${tier === UserTier.pro || tier === UserTier.admin ? "neon-border-purple pulse-glow" : "neon-border-purple"}`}
          data-ocid="shop.card"
        >
          {(tier === UserTier.pro || tier === UserTier.admin) && (
            <div className="absolute top-3 right-3 badge-pro">CURRENT</div>
          )}
          <div
            className="p-6 border-b border-purple-500/20"
            style={{
              background:
                "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(99,102,241,0.1))",
            }}
          >
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl bg-purple-600/40 flex items-center justify-center">
                <Star className="w-5 h-5 text-purple-300" />
              </div>
              <div>
                <h2 className="text-white font-bold text-xl font-display">
                  Pro
                </h2>
                <p className="text-purple-300/60 text-xs">
                  Monthly subscription
                </p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-4xl font-black text-white">$15</span>
              <span className="text-white/40 text-sm ml-1">/month</span>
            </div>
          </div>
          <div className="p-6">
            <ul className="space-y-3 mb-6">
              {[
                "Access to 250+ premium games",
                "Lag-free gaming experience",
                "Priority support response",
                "Exclusive Pro badge on profile",
                "Early access to new games",
                "Ad-free experience",
              ].map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-sm text-white/70"
                >
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-purple-400" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              onClick={handleUpgradePro}
              disabled={upgrading || tier !== UserTier.free}
              className="w-full neon-btn text-white font-semibold py-3"
              data-ocid="shop.primary_button"
            >
              {upgrading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                  Processing...
                </>
              ) : tier !== UserTier.free ? (
                "✓ Already Upgraded"
              ) : upgradeSuccess ? (
                "✓ Upgraded to Pro!"
              ) : (
                "Upgrade to Pro — $15/mo"
              )}
            </Button>
          </div>
        </div>

        {/* Admin Tier */}
        <div
          className="glass-card rounded-2xl overflow-hidden relative"
          style={{ border: "1px solid rgba(251,191,36,0.3)" }}
          data-ocid="shop.card"
        >
          {tier === UserTier.admin && (
            <div className="absolute top-3 right-3 badge-admin">CURRENT</div>
          )}
          <div
            className="p-6 border-b"
            style={{
              borderColor: "rgba(251,191,36,0.15)",
              background:
                "linear-gradient(135deg, rgba(217,119,6,0.15), rgba(251,191,36,0.05))",
            }}
          >
            <div className="flex items-center gap-3 mb-1">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(251,191,36,0.2)" }}
              >
                <Crown className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <h2 className="text-white font-bold text-xl font-display">
                  Admin
                </h2>
                <p className="text-yellow-400/60 text-xs">One-time payment</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-4xl font-black text-white">$300</span>
              <span className="text-white/40 text-sm ml-1">one-time</span>
            </div>
          </div>
          <div className="p-6">
            <ul className="space-y-3 mb-6">
              {[
                "All Pro features included",
                "Admin badge on profile",
                "Access to admin dashboard",
                "Moderate reports and support",
                "Add and manage games",
                "Must pass 200-question quiz",
              ].map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-sm text-white/70"
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(251,191,36,0.15)" }}
                  >
                    <Check className="w-3 h-3 text-yellow-400" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              onClick={handleOpenQuiz}
              disabled={tier === UserTier.admin}
              className="w-full neon-btn-yellow font-semibold py-3 text-black"
              data-ocid="shop.open_modal_button"
            >
              {tier === UserTier.admin ? (
                "✓ Admin Access Active"
              ) : (
                <>
                  <Trophy className="w-4 h-4 mr-2" />
                  Apply for Admin — $300
                </>
              )}
            </Button>
            <p className="text-white/20 text-xs text-center mt-3">
              Must pass a 200-question interview quiz
            </p>
          </div>
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="glass-card rounded-2xl p-6" data-ocid="shop.card">
        <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          Feature Comparison
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-white/40 font-medium py-2 pr-8">
                  Feature
                </th>
                <th className="text-center text-white/40 font-medium py-2 px-4">
                  Free
                </th>
                <th className="text-center text-purple-300 font-medium py-2 px-4">
                  Pro
                </th>
                <th className="text-center text-yellow-400 font-medium py-2 px-4">
                  Admin
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                {
                  feature: "Games Access",
                  free: "100",
                  pro: "250+",
                  admin: "250+",
                },
                { feature: "Lag-free Gaming", free: "✗", pro: "✓", admin: "✓" },
                {
                  feature: "Priority Support",
                  free: "✗",
                  pro: "✓",
                  admin: "✓",
                },
                {
                  feature: "Profile Badge",
                  free: "✗",
                  pro: "PRO",
                  admin: "ADMIN",
                },
                { feature: "Admin Controls", free: "✗", pro: "✗", admin: "✓" },
                { feature: "Add Games", free: "✗", pro: "✗", admin: "✓" },
              ].map((row) => (
                <tr key={row.feature}>
                  <td className="py-3 text-white/60 pr-8">{row.feature}</td>
                  <td
                    className={`py-3 text-center ${row.free === "✗" ? "text-white/20" : "text-white/70"}`}
                  >
                    {row.free}
                  </td>
                  <td
                    className={`py-3 text-center ${row.pro === "✗" ? "text-white/20" : "text-purple-300 font-medium"}`}
                  >
                    {row.pro}
                  </td>
                  <td
                    className={`py-3 text-center ${row.admin === "✗" ? "text-white/20" : "text-yellow-400 font-medium"}`}
                  >
                    {row.admin}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quiz Modal */}
      {quizOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)" }}
        >
          <div
            className="glass-card rounded-2xl p-6 w-full max-w-2xl neon-border-purple max-h-[90vh] overflow-y-auto scrollbar-custom"
            data-ocid="shop.dialog"
          >
            {quizResult ? (
              <div className="text-center py-8">
                {quizResult.passed ? (
                  <>
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-white font-bold text-2xl mb-2">
                      Congratulations! You Passed!
                    </h3>
                    <p className="text-white/60 mb-2">
                      Score: {quizResult.score.toString()}/100
                    </p>
                    <p className="text-green-400 mb-6">
                      Admin access has been granted to your account!
                    </p>
                    <Button
                      onClick={() => setQuizOpen(false)}
                      className="neon-btn text-white"
                      data-ocid="shop.close_button"
                    >
                      Close
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="text-6xl mb-4">😔</div>
                    <h3 className="text-white font-bold text-2xl mb-2">
                      Quiz Failed
                    </h3>
                    <p className="text-white/60 mb-2">
                      Score: {quizResult.score.toString()}/100
                    </p>
                    <p className="text-red-400 mb-6">
                      You need 70% or higher to pass. Try again!
                    </p>
                    <div className="flex gap-3 justify-center">
                      <Button
                        variant="ghost"
                        onClick={() => setQuizOpen(false)}
                        className="border border-white/10 text-white/60"
                        data-ocid="shop.close_button"
                      >
                        Close
                      </Button>
                      <Button
                        onClick={handleOpenQuiz}
                        className="neon-btn text-white"
                        data-ocid="shop.button"
                      >
                        Retry Quiz
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ) : quizSubmitting ? (
              <div className="text-center py-12" data-ocid="shop.loading_state">
                <Loader2 className="w-12 h-12 animate-spin text-purple-400 mx-auto mb-4" />
                <p className="text-white/60">Submitting your answers...</p>
              </div>
            ) : quizQuestions.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-white font-bold text-lg flex items-center gap-2">
                      <Shield className="w-5 h-5 text-yellow-400" />
                      Admin Interview Quiz
                    </h3>
                    <p className="text-white/40 text-sm mt-0.5">
                      Question {currentQ + 1} of {quizQuestions.length}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setQuizOpen(false)}
                    className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/5"
                    data-ocid="shop.close_button"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <Progress value={progress} className="h-1.5 mb-6 bg-white/10" />

                <div className="mb-8">
                  <p className="text-white font-medium text-lg leading-relaxed">
                    {quizQuestions[currentQ].question}
                  </p>
                </div>

                <div className="space-y-3">
                  {quizQuestions[currentQ].options.map((option, optIdx) => (
                    <button
                      type="button"
                      key={option}
                      onClick={() => handleAnswer(optIdx)}
                      className="w-full text-left p-4 rounded-xl border border-white/10 text-white/70 hover:text-white hover:border-purple-400/40 hover:bg-purple-600/10 transition-all"
                      data-ocid="shop.button"
                    >
                      <span className="text-purple-400 font-bold mr-3">
                        {String.fromCharCode(65 + optIdx)}.
                      </span>
                      {option}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-8" data-ocid="shop.loading_state">
                <Loader2 className="w-8 h-8 animate-spin text-purple-400 mx-auto mb-3" />
                <p className="text-white/60">Loading quiz questions...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
