import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Gamepad2, Loader2, Lock, Mail, User } from "lucide-react";
import { useEffect, useState } from "react";
import { OnlineStatus, UserTier } from "../backend.d";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const LS_USERS_KEY = "nexplay_users";
const LS_PENDING_KEY = "nexplay_pending_registration";

interface StoredUser {
  username: string;
  email: string;
  password: string;
}

interface PendingRegistration {
  username: string;
  email: string;
}

function getStoredUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(LS_USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function saveStoredUsers(users: StoredUser[]) {
  localStorage.setItem(LS_USERS_KEY, JSON.stringify(users));
}

function getPendingRegistration(): PendingRegistration | null {
  try {
    const raw = localStorage.getItem(LS_PENDING_KEY);
    return raw ? (JSON.parse(raw) as PendingRegistration) : null;
  } catch {
    return null;
  }
}

function clearPendingRegistration() {
  localStorage.removeItem(LS_PENDING_KEY);
}

const ALLOWED_DOMAINS = ["gmail.com", "comptonusd.net"];

function isValidEmailDomain(email: string): boolean {
  const parts = email.toLowerCase().split("@");
  if (parts.length !== 2) return false;
  return ALLOWED_DOMAINS.includes(parts[1]);
}

export function AuthPage() {
  const { login, isLoggingIn, isLoginSuccess, identity } =
    useInternetIdentity();
  const { actor, isFetching } = useActor();

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isLoggingInLocal, setIsLoggingInLocal] = useState(false);

  // Register state
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);

  // After Internet Identity login completes, save profile if there's a pending registration
  useEffect(() => {
    if (!isLoginSuccess || !identity || !actor || isFetching) return;

    const pending = getPendingRegistration();
    if (!pending) return;

    clearPendingRegistration();

    actor
      .saveCallerUserProfile({
        username: pending.username,
        displayName: pending.username,
        email: pending.email,
        profileIcon: "🎮",
        status: OnlineStatus.online,
        tier: UserTier.free,
        joinDate: BigInt(Date.now() * 1_000_000),
      })
      .then(() => {
        setRegisterSuccess(true);
        setIsRegistering(false);
      })
      .catch(() => {
        setRegisterError(
          "Account created but profile save failed. Please try again.",
        );
        setIsRegistering(false);
      });
  }, [isLoginSuccess, identity, actor, isFetching]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError("Please enter your email and password.");
      return;
    }

    const users = getStoredUsers();
    const found = users.find(
      (u) =>
        u.email.toLowerCase() === loginEmail.toLowerCase() &&
        u.password === loginPassword,
    );

    if (!found) {
      setLoginError(
        "Invalid email or password. Please check your credentials.",
      );
      return;
    }

    setIsLoggingInLocal(true);
    login();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");

    // Username validation
    const username = registerUsername.trim();
    if (!username) {
      setRegisterError("Username is required.");
      return;
    }
    if (username.length < 3) {
      setRegisterError("Username must be at least 3 characters.");
      return;
    }
    if (username.length > 20) {
      setRegisterError("Username must be 20 characters or less.");
      return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setRegisterError(
        "Username can only contain letters, numbers, and underscores.",
      );
      return;
    }

    // Email validation
    const email = registerEmail.trim();
    if (!email) {
      setRegisterError("Email is required.");
      return;
    }
    if (!isValidEmailDomain(email)) {
      setRegisterError(
        "Access restricted. Please sign in with a Gmail or Compton USD account to play games.",
      );
      return;
    }

    // Password validation
    if (!registerPassword) {
      setRegisterError("Password is required.");
      return;
    }
    if (registerPassword.length < 8) {
      setRegisterError("Password must be at least 8 characters.");
      return;
    }
    if (registerPassword !== registerConfirmPassword) {
      setRegisterError("Passwords do not match.");
      return;
    }

    // Duplicate email check
    const users = getStoredUsers();
    const emailTaken = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
    if (emailTaken) {
      setRegisterError("An account with this email already exists.");
      return;
    }

    // Save user to localStorage
    const updated = [...users, { username, email, password: registerPassword }];
    saveStoredUsers(updated);

    // Store pending registration so the useEffect can complete profile creation after II login
    localStorage.setItem(LS_PENDING_KEY, JSON.stringify({ username, email }));

    setIsRegistering(true);
    login();
  };

  const isBusy = isLoggingIn || isLoggingInLocal || isRegistering;

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
                data-ocid="auth.login.tab"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="flex-1 data-[state=active]:bg-purple-600/40 data-[state=active]:text-white"
                data-ocid="auth.register.tab"
              >
                Create Account
              </TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4" noValidate>
                {/* Email */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="login-email"
                    className="text-purple-200 text-sm"
                  >
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/60 pointer-events-none" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="you@gmail.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="pl-9 bg-white/5 border-purple-500/30 text-white placeholder:text-white/30 focus:border-purple-400"
                      data-ocid="auth.login.input"
                      autoComplete="email"
                      disabled={isBusy}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="login-password"
                    className="text-purple-200 text-sm"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/60 pointer-events-none" />
                    <Input
                      id="login-password"
                      type={showLoginPassword ? "text" : "password"}
                      placeholder="Your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="pl-9 pr-10 bg-white/5 border-purple-500/30 text-white placeholder:text-white/30 focus:border-purple-400"
                      data-ocid="auth.login.input"
                      autoComplete="current-password"
                      disabled={isBusy}
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400/60 hover:text-purple-300 transition-colors"
                      tabIndex={-1}
                      aria-label={
                        showLoginPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showLoginPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {loginError && (
                  <div
                    className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-300 text-sm flex items-start gap-2"
                    data-ocid="auth.login.error_state"
                    role="alert"
                  >
                    <span className="mt-0.5">⚠</span>
                    <span>{loginError}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isBusy}
                  className="w-full neon-btn text-white font-semibold py-2.5"
                  data-ocid="auth.login.submit_button"
                >
                  {isBusy ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                <p className="text-white/30 text-xs text-center">
                  New here?{" "}
                  <span className="text-purple-400/70">
                    Switch to Create Account
                  </span>{" "}
                  to get started.
                </p>
              </form>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register">
              {registerSuccess ? (
                <div
                  className="text-center py-8"
                  data-ocid="auth.register.success_state"
                >
                  <div className="text-5xl mb-4">🎮</div>
                  <h3 className="text-white font-bold text-xl mb-2">
                    Welcome to NexPlay!
                  </h3>
                  <p className="text-purple-300/70 text-sm mb-6">
                    Your account has been created. Ready to play!
                  </p>
                  <Button
                    onClick={() => window.location.reload()}
                    className="neon-btn text-white px-8"
                  >
                    Start Playing
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleRegister}
                  className="space-y-4"
                  noValidate
                >
                  {/* Username */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="register-username"
                      className="text-purple-200 text-sm"
                    >
                      Username
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/60 pointer-events-none" />
                      <Input
                        id="register-username"
                        type="text"
                        placeholder="GameMaster99"
                        value={registerUsername}
                        onChange={(e) => setRegisterUsername(e.target.value)}
                        className="pl-9 bg-white/5 border-purple-500/30 text-white placeholder:text-white/30 focus:border-purple-400"
                        data-ocid="auth.register.input"
                        maxLength={20}
                        autoComplete="username"
                        disabled={isBusy}
                      />
                    </div>
                    <p className="text-white/30 text-xs">
                      Letters, numbers, and underscores only. 3–20 characters.
                    </p>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="register-email"
                      className="text-purple-200 text-sm"
                    >
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/60 pointer-events-none" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="you@gmail.com"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        className="pl-9 bg-white/5 border-purple-500/30 text-white placeholder:text-white/30 focus:border-purple-400"
                        data-ocid="auth.register.input"
                        autoComplete="email"
                        disabled={isBusy}
                      />
                    </div>
                    <p className="text-white/30 text-xs">
                      Must be a @gmail.com or @comptonusd.net address.
                    </p>
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="register-password"
                      className="text-purple-200 text-sm"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/60 pointer-events-none" />
                      <Input
                        id="register-password"
                        type={showRegPassword ? "text" : "password"}
                        placeholder="Min 8 characters"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        className="pl-9 pr-10 bg-white/5 border-purple-500/30 text-white placeholder:text-white/30 focus:border-purple-400"
                        data-ocid="auth.register.input"
                        autoComplete="new-password"
                        disabled={isBusy}
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400/60 hover:text-purple-300 transition-colors"
                        tabIndex={-1}
                        aria-label={
                          showRegPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showRegPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="register-confirm-password"
                      className="text-purple-200 text-sm"
                    >
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/60 pointer-events-none" />
                      <Input
                        id="register-confirm-password"
                        type={showRegConfirmPassword ? "text" : "password"}
                        placeholder="Repeat password"
                        value={registerConfirmPassword}
                        onChange={(e) =>
                          setRegisterConfirmPassword(e.target.value)
                        }
                        className="pl-9 pr-10 bg-white/5 border-purple-500/30 text-white placeholder:text-white/30 focus:border-purple-400"
                        data-ocid="auth.register.input"
                        autoComplete="new-password"
                        disabled={isBusy}
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegConfirmPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400/60 hover:text-purple-300 transition-colors"
                        tabIndex={-1}
                        aria-label={
                          showRegConfirmPassword
                            ? "Hide confirm password"
                            : "Show confirm password"
                        }
                      >
                        {showRegConfirmPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {registerError && (
                    <div
                      className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-300 text-sm flex items-start gap-2"
                      data-ocid="auth.register.error_state"
                      role="alert"
                    >
                      <span className="mt-0.5">⚠</span>
                      <span>{registerError}</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isBusy}
                    className="w-full neon-btn text-white font-semibold py-2.5"
                    data-ocid="auth.register.submit_button"
                  >
                    {isBusy ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>

                  <p className="text-white/30 text-xs text-center">
                    You&apos;ll verify your identity securely via Internet
                    Identity.
                  </p>
                </form>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Domain restriction notice */}
        <div className="mt-4 glass-card rounded-xl p-3 text-center">
          <p className="text-purple-300/60 text-xs">
            🔒 Restricted to{" "}
            <span className="text-purple-300/90 font-medium">@gmail.com</span>{" "}
            and{" "}
            <span className="text-purple-300/90 font-medium">
              @comptonusd.net
            </span>{" "}
            accounts only.
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-white/20 text-xs mt-4">
          © {new Date().getFullYear()}. Built with ♥ using{" "}
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
