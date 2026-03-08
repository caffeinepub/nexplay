import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gamepad2, Loader2, Shield } from "lucide-react";
import { useState } from "react";
import { OnlineStatus, type UserProfile, UserTier } from "../backend.d";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const ALLOWED_DOMAINS = ["gmail.com", "comptonusd.net"];

function validateEmail(email: string): string | null {
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return "Please enter a valid email address.";
  if (!ALLOWED_DOMAINS.includes(domain)) {
    return "Access restricted. Please sign in with a Gmail or Compton USD account to play games.";
  }
  return null;
}

export function AuthPage() {
  const { login, isLoggingIn } = useInternetIdentity();
  const { actor } = useActor();

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Signup state
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");
  const [signupError, setSignupError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const emailErr = validateEmail(loginEmail);
    if (emailErr) {
      setLoginError(emailErr);
      return;
    }
    if (!loginPassword) {
      setLoginError("Please enter your password.");
      return;
    }
    await login();
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError("");

    if (!signupUsername.trim()) {
      setSignupError("Username is required.");
      return;
    }
    if (signupUsername.length < 3) {
      setSignupError("Username must be at least 3 characters.");
      return;
    }

    const emailErr = validateEmail(signupEmail);
    if (emailErr) {
      setSignupError(emailErr);
      return;
    }

    if (signupPassword.length < 6) {
      setSignupError("Password must be at least 6 characters.");
      return;
    }

    if (signupPassword !== signupConfirm) {
      setSignupError("Passwords do not match.");
      return;
    }

    setIsSigningUp(true);
    try {
      await login();
      if (actor) {
        const profile: UserProfile = {
          username: signupUsername.trim(),
          displayName: signupUsername.trim(),
          email: signupEmail.toLowerCase(),
          profileIcon: "🎮",
          status: OnlineStatus.online,
          tier: UserTier.free,
          joinDate: BigInt(Date.now() * 1_000_000),
        };
        await actor.saveCallerUserProfile(profile);
        setSignupSuccess(true);
      }
    } catch (_err) {
      setSignupError("Failed to create account. Please try again.");
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080818] via-[#0d0820] to-[#110828]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-900/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-900/10 rounded-full blur-2xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(167,139,250,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Gamepad2
              className="w-8 h-8 text-yellow-400"
              style={{ filter: "drop-shadow(0 0 8px rgba(251,191,36,0.8))" }}
            />
            <span className="nexplay-logo text-4xl">NexPlay</span>
          </div>
          <p className="text-purple-300/70 text-sm">
            Your Ultimate Gaming Portal
          </p>
        </div>

        {/* Auth Card */}
        <div className="glass-card rounded-2xl p-6 shadow-2xl">
          <Tabs defaultValue="login">
            <TabsList className="w-full mb-6 bg-white/5 border border-purple-500/20">
              <TabsTrigger
                value="login"
                className="flex-1 data-[state=active]:bg-purple-600/40 data-[state=active]:text-white"
                data-ocid="auth.tab"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="flex-1 data-[state=active]:bg-purple-600/40 data-[state=active]:text-white"
                data-ocid="auth.tab"
              >
                Create Account
              </TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="login-email"
                    className="text-purple-200 text-sm"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="yourname@gmail.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="bg-white/5 border-purple-500/30 text-white placeholder:text-white/30 focus:border-purple-400"
                    data-ocid="auth.input"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="login-password"
                    className="text-purple-200 text-sm"
                  >
                    Password
                  </Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="bg-white/5 border-purple-500/30 text-white placeholder:text-white/30 focus:border-purple-400"
                    data-ocid="auth.input"
                  />
                </div>

                {loginError && (
                  <div
                    className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-300 text-sm"
                    data-ocid="auth.error_state"
                  >
                    <Shield className="inline w-4 h-4 mr-1" />
                    {loginError}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full neon-btn text-white font-semibold py-2.5"
                  data-ocid="auth.submit_button"
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    "Sign In with Internet Identity"
                  )}
                </Button>

                <p className="text-white/30 text-xs text-center mt-2">
                  Only @gmail.com and @comptonusd.net accounts allowed
                </p>
              </form>
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent value="signup">
              {signupSuccess ? (
                <div
                  className="text-center py-8"
                  data-ocid="auth.success_state"
                >
                  <div className="text-4xl mb-4">🎮</div>
                  <h3 className="text-white font-bold text-lg mb-2">
                    Welcome to NexPlay!
                  </h3>
                  <p className="text-purple-300/70 text-sm">
                    Your account has been created. Refresh to start playing!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="signup-username"
                      className="text-purple-200 text-sm"
                    >
                      Username
                    </Label>
                    <Input
                      id="signup-username"
                      type="text"
                      placeholder="GameMaster99"
                      value={signupUsername}
                      onChange={(e) => setSignupUsername(e.target.value)}
                      className="bg-white/5 border-purple-500/30 text-white placeholder:text-white/30 focus:border-purple-400"
                      data-ocid="auth.input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="signup-email"
                      className="text-purple-200 text-sm"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="yourname@gmail.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="bg-white/5 border-purple-500/30 text-white placeholder:text-white/30 focus:border-purple-400"
                      data-ocid="auth.input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="signup-password"
                      className="text-purple-200 text-sm"
                    >
                      Password
                    </Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className="bg-white/5 border-purple-500/30 text-white placeholder:text-white/30 focus:border-purple-400"
                      data-ocid="auth.input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="signup-confirm"
                      className="text-purple-200 text-sm"
                    >
                      Confirm Password
                    </Label>
                    <Input
                      id="signup-confirm"
                      type="password"
                      placeholder="••••••••"
                      value={signupConfirm}
                      onChange={(e) => setSignupConfirm(e.target.value)}
                      className="bg-white/5 border-purple-500/30 text-white placeholder:text-white/30 focus:border-purple-400"
                      data-ocid="auth.input"
                    />
                  </div>

                  {signupError && (
                    <div
                      className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-300 text-sm"
                      data-ocid="auth.error_state"
                    >
                      <Shield className="inline w-4 h-4 mr-1" />
                      {signupError}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSigningUp || isLoggingIn}
                    className="w-full neon-btn text-white font-semibold py-2.5"
                    data-ocid="auth.submit_button"
                  >
                    {isSigningUp || isLoggingIn ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>

                  <p className="text-white/30 text-xs text-center mt-2">
                    Only @gmail.com and @comptonusd.net accounts allowed
                  </p>
                </form>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <p className="text-center text-white/20 text-xs mt-6">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400/50 hover:text-purple-400 transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}
