import { Globe, Lock, Shield, Star, Users, Zap } from "lucide-react";

export function InformationPage() {
  return (
    <div className="page-transition max-w-5xl mx-auto px-4 sm:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full px-4 py-1.5 text-yellow-400 text-sm mb-6">
          <Star className="w-3.5 h-3.5" />
          Our Mission
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-black text-white mb-4 glow-text">
          Why NexPlay Exists
        </h1>
        <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
          The story behind the platform that's giving students their gaming
          freedom back.
        </p>
      </div>

      {/* Main Story */}
      <div
        className="glass-card rounded-2xl p-8 mb-8 neon-border-purple"
        data-ocid="info.section"
      >
        <div className="flex items-start gap-4">
          <div className="text-5xl flex-shrink-0">🚫</div>
          <div>
            <h2 className="text-white font-bold text-2xl mb-3 font-display">
              The Problem
            </h2>
            <p className="text-white/70 leading-relaxed mb-4 text-base">
              Millions of students across the country sit in classrooms with
              school-issued Chromebooks and filtered networks that block
              everything fun. Games, videos, social platforms — all blocked. The
              school day gets long, breaks get boring, and kids are left with
              nothing to do during free time.
            </p>
            <p className="text-white/70 leading-relaxed text-base">
              Teachers can tell students to "take a break" but then where do
              they go? The internet is locked down. Every cool website redirects
              to a filter block page. That's frustrating for everyone.
            </p>
          </div>
        </div>
      </div>

      <div
        className="glass-card rounded-2xl p-8 mb-8 neon-border-purple"
        data-ocid="info.section"
      >
        <div className="flex items-start gap-4">
          <div className="text-5xl flex-shrink-0">💡</div>
          <div>
            <h2 className="text-white font-bold text-2xl mb-3 font-display">
              The Solution — NexPlay
            </h2>
            <p className="text-white/70 leading-relaxed mb-4 text-base">
              NexPlay was built specifically for students who want a safe,
              modern place to search, play, watch, and do anything during
              downtime. It's a gaming portal that works anywhere — school
              networks, home, mobile, anywhere you have a browser.
            </p>
            <p className="text-white/70 leading-relaxed text-base">
              No downloads. No installs. No complicated setup. Just log in, pick
              a game, and play instantly. 100+ unblocked games, embedded apps, a
              community of fellow gamers, and tools to make the experience
              personal and fun.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {[
          {
            icon: <Zap className="w-6 h-6 text-yellow-400" />,
            title: "Instant Play",
            description:
              "No downloads or installs. Click Play and games load directly in your browser in seconds.",
          },
          {
            icon: <Shield className="w-6 h-6 text-green-400" />,
            title: "Safe Environment",
            description:
              "Only Gmail and school email accounts allowed. A safe, moderated gaming community.",
          },
          {
            icon: <Globe className="w-6 h-6 text-blue-400" />,
            title: "Works Everywhere",
            description:
              "Whether you're at school, home, or on the go, NexPlay works on any device with a browser.",
          },
          {
            icon: <Users className="w-6 h-6 text-purple-400" />,
            title: "Community",
            description:
              "Connect with friends, send messages, and be part of a growing community of gamers.",
          },
          {
            icon: <Lock className="w-6 h-6 text-cyan-400" />,
            title: "Privacy First",
            description:
              "Your data stays yours. We don't sell your information or track your activities outside the platform.",
          },
          {
            icon: <Star className="w-6 h-6 text-pink-400" />,
            title: "Always Growing",
            description:
              "New games and features added regularly. The NexPlay library only gets bigger.",
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="glass-card glass-card-hover rounded-xl p-5"
          >
            <div className="mb-3">{feature.icon}</div>
            <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="glass-card rounded-2xl p-8 mb-8" data-ocid="info.section">
        <h2 className="text-white font-bold text-2xl font-display text-center mb-8">
          NexPlay By The Numbers
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            {
              value: "100+",
              label: "Games Available",
              color: "text-yellow-400",
            },
            { value: "250+", label: "Pro Games", color: "text-purple-400" },
            { value: "5", label: "Embedded Apps", color: "text-cyan-400" },
            { value: "0", label: "Downloads Needed", color: "text-green-400" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className={`font-display text-3xl sm:text-4xl font-black ${stat.color} mb-1`}
              >
                {stat.value}
              </div>
              <div className="text-white/40 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Statement */}
      <div
        className="rounded-2xl p-8 text-center"
        style={{
          background:
            "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(99,102,241,0.1))",
          border: "1px solid rgba(167,139,250,0.2)",
        }}
        data-ocid="info.section"
      >
        <div className="text-4xl mb-4">🎮</div>
        <h2 className="text-white font-bold text-2xl font-display mb-4">
          Our Mission
        </h2>
        <p className="text-white/70 text-base max-w-2xl mx-auto leading-relaxed italic">
          "Every student deserves a safe space to unwind, have fun, and connect
          with friends — even during a school day. NexPlay exists to make gaming
          accessible to everyone, everywhere, at any time. We believe free time
          should feel free."
        </p>
        <div className="mt-4 text-purple-400/60 text-sm font-medium">
          — The NexPlay Team
        </div>
      </div>
    </div>
  );
}
