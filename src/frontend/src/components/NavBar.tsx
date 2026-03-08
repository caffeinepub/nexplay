import {
  AppWindow,
  Bell,
  Gamepad2,
  Grid3X3,
  HelpCircle,
  Home,
  Info,
  LogOut,
  Menu,
  MessageCircle,
  Settings,
  ShoppingBag,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import type { UserProfile } from "../backend.d";
import { OnlineStatus, UserTier } from "../backend.d";

export type Page =
  | "home"
  | "information"
  | "games"
  | "apps"
  | "community"
  | "shop"
  | "support"
  | "friends"
  | "messages"
  | "settings";

interface NavBarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  profile: UserProfile | null;
}

const navItems: { page: Page; label: string; icon: React.ReactNode }[] = [
  { page: "home", label: "Home", icon: <Home className="w-4 h-4" /> },
  {
    page: "information",
    label: "Information",
    icon: <Info className="w-4 h-4" />,
  },
  { page: "games", label: "All Games", icon: <Grid3X3 className="w-4 h-4" /> },
  { page: "apps", label: "Apps", icon: <AppWindow className="w-4 h-4" /> },
  {
    page: "community",
    label: "Community",
    icon: <Users className="w-4 h-4" />,
  },
  { page: "shop", label: "Shop", icon: <ShoppingBag className="w-4 h-4" /> },
  {
    page: "support",
    label: "Support",
    icon: <HelpCircle className="w-4 h-4" />,
  },
];

function getStatusClass(status: OnlineStatus): string {
  switch (status) {
    case OnlineStatus.online:
      return "status-online";
    case OnlineStatus.away:
      return "status-away";
    case OnlineStatus.doNotDisturb:
      return "status-dnd";
    case OnlineStatus.offline:
      return "status-offline";
    default:
      return "status-offline";
  }
}

export function NavBar({
  currentPage,
  onNavigate,
  onLogout,
  profile,
}: NavBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: "rgba(8,8,24,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(167,139,250,0.15)",
      }}
    >
      <div className="max-w-screen-2xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 mr-4 flex-shrink-0"
          data-ocid="nav.link"
        >
          <Gamepad2
            className="w-6 h-6 text-yellow-400"
            style={{ filter: "drop-shadow(0 0 6px rgba(251,191,36,0.8))" }}
          />
          <span className="nexplay-logo text-xl">NexPlay</span>
        </button>

        {/* Desktop Nav */}
        <nav
          className="hidden lg:flex items-center gap-1 flex-1"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <button
              type="button"
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentPage === item.page
                  ? "bg-purple-600/30 text-purple-200 nav-active"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
              data-ocid="nav.link"
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Friends icon */}
          <button
            type="button"
            onClick={() => onNavigate("friends")}
            className={`p-2 rounded-lg transition-all ${currentPage === "friends" ? "bg-purple-600/30 text-purple-300" : "text-white/50 hover:text-white hover:bg-white/5"}`}
            title="Friends"
            data-ocid="nav.link"
          >
            <Bell className="w-5 h-5" />
          </button>

          {/* Messages icon */}
          <button
            type="button"
            onClick={() => onNavigate("messages")}
            className={`p-2 rounded-lg transition-all ${currentPage === "messages" ? "bg-purple-600/30 text-purple-300" : "text-white/50 hover:text-white hover:bg-white/5"}`}
            title="Messages"
            data-ocid="nav.link"
          >
            <MessageCircle className="w-5 h-5" />
          </button>

          {/* Settings icon */}
          <button
            type="button"
            onClick={() => onNavigate("settings")}
            className={`p-2 rounded-lg transition-all ${currentPage === "settings" ? "bg-purple-600/30 text-purple-300" : "text-white/50 hover:text-white hover:bg-white/5"}`}
            title="Settings"
            data-ocid="nav.link"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* Profile */}
          {profile && (
            <button
              type="button"
              onClick={() => onNavigate("settings")}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-white/5 border border-purple-500/20 hover:border-purple-400/40 transition-all"
              data-ocid="nav.link"
            >
              <div className="relative">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-sm">
                  {profile.profileIcon || "🎮"}
                </div>
                <div
                  className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#080818] ${getStatusClass(profile.status)}`}
                />
              </div>
              <div className="hidden sm:block text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-white text-xs font-medium leading-tight">
                    {profile.displayName || profile.username}
                  </span>
                  {profile.tier === UserTier.pro && (
                    <span className="badge-pro">PRO</span>
                  )}
                  {profile.tier === UserTier.admin && (
                    <span className="badge-admin">ADMIN</span>
                  )}
                </div>
              </div>
            </button>
          )}

          {/* Logout */}
          <button
            type="button"
            onClick={onLogout}
            className="p-2 rounded-lg text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all"
            title="Sign Out"
            data-ocid="nav.link"
          >
            <LogOut className="w-5 h-5" />
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all"
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div
          className="lg:hidden border-t border-purple-500/15 py-2 px-4"
          style={{ background: "rgba(8,8,24,0.95)" }}
        >
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                type="button"
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setMobileOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                  currentPage === item.page
                    ? "bg-purple-600/30 text-purple-200"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
                data-ocid="nav.link"
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
