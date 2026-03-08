import { Toaster } from "@/components/ui/sonner";
import { Gamepad2, Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { UserProfile } from "./backend.d";
import { useActor } from "./hooks/useActor";
import { useInternetIdentity } from "./hooks/useInternetIdentity";

import { AllGamesPage } from "./components/AllGamesPage";
import { AppsPage } from "./components/AppsPage";
import { AuthPage } from "./components/AuthPage";
import { CommunityPage } from "./components/CommunityPage";
import { FriendsPage } from "./components/FriendsPage";
import { HomePage } from "./components/HomePage";
import { InformationPage } from "./components/InformationPage";
import { MessagesPage } from "./components/MessagesPage";
import { NavBar, type Page } from "./components/NavBar";
import { SettingsPage } from "./components/SettingsPage";
import { ShopPage } from "./components/ShopPage";
import { SupportPage } from "./components/SupportPage";

export default function App() {
  const { identity, isInitializing, clear } = useInternetIdentity();
  const { actor, isFetching } = useActor();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const loadProfile = useCallback(async () => {
    if (!actor || !identity) return;
    setProfileLoading(true);
    try {
      const p = await actor.getCallerUserProfile();
      setProfile(p);
    } catch {
      setProfile(null);
    } finally {
      setProfileLoading(false);
    }
  }, [actor, identity]);

  useEffect(() => {
    if (actor && identity && !isFetching) {
      loadProfile();
    }
  }, [actor, identity, isFetching, loadProfile]);

  const handleLogout = () => {
    clear();
    setProfile(null);
    setCurrentPage("home");
  };

  const handleProfileUpdate = (updatedProfile?: UserProfile) => {
    if (updatedProfile) {
      setProfile(updatedProfile);
    } else {
      loadProfile();
    }
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Global loading state
  if (isInitializing || (identity && isFetching)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(124,58,237,0.1) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <Gamepad2
              className="w-8 h-8 text-yellow-400"
              style={{ filter: "drop-shadow(0 0 8px rgba(251,191,36,0.8))" }}
            />
            <span className="nexplay-logo text-3xl">NexPlay</span>
          </div>
          <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
          <p className="text-white/40 text-sm">Loading your gaming portal...</p>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!identity) {
    return (
      <>
        <AuthPage />
        <Toaster />
      </>
    );
  }

  // Profile loading
  if (profileLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <Gamepad2
            className="w-8 h-8 text-yellow-400"
            style={{ filter: "drop-shadow(0 0 8px rgba(251,191,36,0.8))" }}
          />
          <span className="nexplay-logo text-3xl">NexPlay</span>
        </div>
        <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
        <p className="text-white/40 text-sm">Loading your profile...</p>
      </div>
    );
  }

  // If logged in but no profile, show auth page to complete signup
  if (!profile) {
    return (
      <>
        <AuthPage />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        profile={profile}
      />

      <main className="flex-1">
        {currentPage === "home" && (
          <HomePage profile={profile} onNavigate={handleNavigate} />
        )}
        {currentPage === "information" && <InformationPage />}
        {currentPage === "games" && <AllGamesPage />}
        {currentPage === "apps" && <AppsPage />}
        {currentPage === "community" && <CommunityPage />}
        {currentPage === "shop" && (
          <ShopPage
            profile={profile}
            onProfileUpdate={() => handleProfileUpdate()}
          />
        )}
        {currentPage === "support" && <SupportPage />}
        {currentPage === "friends" && (
          <FriendsPage onNavigate={handleNavigate} />
        )}
        {currentPage === "messages" && <MessagesPage />}
        {currentPage === "settings" && (
          <SettingsPage
            profile={profile}
            onProfileUpdate={handleProfileUpdate}
          />
        )}
      </main>

      {/* Footer */}
      <footer
        className="border-t border-white/5 py-4 px-6 text-center"
        style={{ background: "rgba(8,8,24,0.6)" }}
      >
        <p className="text-white/20 text-xs">
          © {new Date().getFullYear()}. Built with{" "}
          <span className="text-red-400/60">♥</span> using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400/50 hover:text-purple-400 transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>

      <Toaster />
    </div>
  );
}
