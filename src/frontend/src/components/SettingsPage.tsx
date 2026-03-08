import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Palette, Save, User, Wifi } from "lucide-react";
import { useEffect, useState } from "react";
import { OnlineStatus, UserTier } from "../backend.d";
import type { UserProfile } from "../backend.d";
import { useActor } from "../hooks/useActor";

interface SettingsPageProps {
  profile: UserProfile | null;
  onProfileUpdate: (profile: UserProfile) => void;
}

const PROFILE_ICONS = [
  "🎮",
  "👾",
  "🕹️",
  "🎯",
  "⚡",
  "🏆",
  "💎",
  "🔥",
  "🌟",
  "🎲",
  "🦊",
  "🐉",
  "🚀",
  "💀",
  "🤖",
];

const STATUS_OPTIONS: {
  value: OnlineStatus;
  label: string;
  className: string;
}[] = [
  { value: OnlineStatus.online, label: "Online", className: "status-online" },
  { value: OnlineStatus.away, label: "Away", className: "status-away" },
  {
    value: OnlineStatus.doNotDisturb,
    label: "Do Not Disturb",
    className: "status-dnd",
  },
  {
    value: OnlineStatus.offline,
    label: "Offline",
    className: "status-offline",
  },
];

const THEMES = [
  {
    id: "dark-purple",
    label: "Dark Purple",
    colors: ["#0a0818", "#1a0a2e", "#7c3aed"],
  },
  {
    id: "dark-blue",
    label: "Dark Blue",
    colors: ["#080a18", "#0a1030", "#2563eb"],
  },
  {
    id: "dark-green",
    label: "Dark Green",
    colors: ["#08180a", "#0a2e10", "#16a34a"],
  },
  {
    id: "midnight",
    label: "Midnight Black",
    colors: ["#080808", "#101010", "#374151"],
  },
];

export function SettingsPage({ profile, onProfileUpdate }: SettingsPageProps) {
  const { actor } = useActor();
  const [displayName, setDisplayName] = useState(profile?.displayName || "");
  const [profileIcon, setProfileIcon] = useState(profile?.profileIcon || "🎮");
  const [status, setStatus] = useState<OnlineStatus>(
    profile?.status || OnlineStatus.online,
  );
  const [selectedTheme, setSelectedTheme] = useState(
    () => localStorage.getItem("nexplay_theme") || "dark-purple",
  );
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || profile.username);
      setProfileIcon(profile.profileIcon || "🎮");
      setStatus(profile.status);
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor || !profile) return;
    setSaving(true);
    setSaveError("");
    setSaveSuccess(false);

    try {
      const updated: UserProfile = {
        ...profile,
        displayName: displayName.trim() || profile.username,
        profileIcon,
        status,
      };
      await actor.editCallerUserProfile(updated);
      onProfileUpdate(updated);
      localStorage.setItem("nexplay_theme", selectedTheme);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      setSaveError("Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
    localStorage.setItem("nexplay_theme", themeId);
  };

  return (
    <div className="page-transition max-w-3xl mx-auto px-4 sm:px-8 py-10">
      <h1 className="font-display text-3xl font-black text-white mb-8 glow-text">
        Settings
      </h1>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Section */}
        <div
          className="glass-card rounded-2xl p-6 neon-border-purple"
          data-ocid="settings.section"
        >
          <h2 className="text-white font-bold mb-5 flex items-center gap-2">
            <User className="w-5 h-5 text-purple-400" />
            Profile
          </h2>

          {/* Current profile preview */}
          <div className="flex items-center gap-4 mb-6 p-4 bg-white/3 rounded-xl">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-2xl">
              {profileIcon}
            </div>
            <div>
              <p className="text-white font-semibold">
                {displayName || profile?.username || "Username"}
              </p>
              <p className="text-white/40 text-sm">
                @{profile?.username || "username"}
              </p>
              {profile?.tier === UserTier.pro && (
                <span className="badge-pro">PRO</span>
              )}
              {profile?.tier === UserTier.admin && (
                <span className="badge-admin">ADMIN</span>
              )}
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <Label
                htmlFor="display-name"
                className="text-purple-200 text-sm mb-2 block"
              >
                Display Name
              </Label>
              <Input
                id="display-name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your display name"
                className="bg-white/5 border-purple-500/20 text-white placeholder:text-white/25 focus:border-purple-400"
                data-ocid="settings.input"
              />
            </div>

            <div>
              <Label className="text-purple-200 text-sm mb-2 block">
                Email (read-only)
              </Label>
              <Input
                value={profile?.email || ""}
                readOnly
                className="bg-white/3 border-white/10 text-white/40 cursor-not-allowed"
              />
            </div>

            {/* Profile Icon Picker */}
            <div>
              <Label className="text-purple-200 text-sm mb-3 block">
                Profile Icon
              </Label>
              <div className="grid grid-cols-8 sm:grid-cols-10 gap-2">
                {PROFILE_ICONS.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setProfileIcon(icon)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all ${
                      profileIcon === icon
                        ? "bg-purple-600/40 border-2 border-purple-400"
                        : "bg-white/5 border border-white/10 hover:bg-white/10"
                    }`}
                    data-ocid="settings.toggle"
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Online Status */}
        <div
          className="glass-card rounded-2xl p-6 neon-border-purple"
          data-ocid="settings.section"
        >
          <h2 className="text-white font-bold mb-5 flex items-center gap-2">
            <Wifi className="w-5 h-5 text-green-400" />
            Online Status
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setStatus(opt.value)}
                className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all ${
                  status === opt.value
                    ? "border-purple-400/50 bg-purple-600/20"
                    : "border-white/10 bg-white/3 hover:bg-white/5"
                }`}
                data-ocid="settings.toggle"
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${opt.className}`}
                />
                <span className="text-white text-sm">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Theme */}
        <div
          className="glass-card rounded-2xl p-6 neon-border-purple"
          data-ocid="settings.section"
        >
          <h2 className="text-white font-bold mb-5 flex items-center gap-2">
            <Palette className="w-5 h-5 text-cyan-400" />
            Theme
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                type="button"
                onClick={() => handleThemeChange(theme.id)}
                className={`rounded-xl overflow-hidden border-2 transition-all ${
                  selectedTheme === theme.id
                    ? "border-purple-400 scale-105"
                    : "border-white/10 hover:border-white/20"
                }`}
                data-ocid="settings.toggle"
              >
                {/* Theme Preview */}
                <div
                  className="h-14 w-full relative"
                  style={{
                    background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})`,
                  }}
                >
                  <div
                    className="absolute bottom-2 left-2 right-2 h-2 rounded-full opacity-70"
                    style={{ background: theme.colors[2] }}
                  />
                </div>
                <div className="p-2 text-white/70 text-xs text-center bg-white/3">
                  {theme.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Save Button */}
        {saveError && (
          <p className="text-red-400 text-sm" data-ocid="settings.error_state">
            {saveError}
          </p>
        )}
        {saveSuccess && (
          <p
            className="text-green-400 text-sm flex items-center gap-1"
            data-ocid="settings.success_state"
          >
            ✓ Settings saved successfully!
          </p>
        )}

        <Button
          type="submit"
          disabled={saving}
          className="w-full neon-btn text-white font-semibold py-3"
          data-ocid="settings.save_button"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" /> Save Changes
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
