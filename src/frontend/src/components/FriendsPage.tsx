import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Principal } from "@icp-sdk/core/principal";
import {
  Check,
  Loader2,
  MessageCircle,
  Search,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { FriendStatus } from "../backend.d";
import type { FriendRequest } from "../backend.d";
import { useActor } from "../hooks/useActor";

interface FriendsPageProps {
  onNavigate: (page: string) => void;
}

export function FriendsPage({ onNavigate }: FriendsPageProps) {
  const { actor } = useActor();
  const [searchUsername, setSearchUsername] = useState("");
  const [sendingRequest, setSendingRequest] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState("");
  const [friends, setFriends] = useState<FriendRequest[]>([]);
  const [pendingRequests, setPendingRequests] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    if (!actor) return;
    setLoading(true);
    try {
      const [fr, pending] = await Promise.all([
        actor.getFriends().catch(() => [] as FriendRequest[]),
        actor.getPendingFriendRequests().catch(() => [] as FriendRequest[]),
      ]);
      setFriends(fr.filter((f) => f.status === FriendStatus.accepted));
      setPendingRequests(
        pending.filter((f) => f.status === FriendStatus.pending),
      );
    } finally {
      setLoading(false);
    }
  }, [actor]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSendRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor || !searchUsername.trim()) return;
    setSendingRequest(true);
    setSendError("");
    setSendSuccess(false);
    try {
      await actor.sendFriendRequest(searchUsername.trim());
      setSendSuccess(true);
      setSearchUsername("");
      setTimeout(() => setSendSuccess(false), 3000);
    } catch (_err) {
      setSendError(
        "Could not send request. Make sure the username is correct.",
      );
    } finally {
      setSendingRequest(false);
    }
  };

  const handleAccept = async (from: Principal) => {
    if (!actor) return;
    const key = from.toString();
    setActionLoading(key);
    try {
      await actor.acceptFriendRequest(from);
      await loadData();
    } finally {
      setActionLoading(null);
    }
  };

  const handleDecline = async (from: Principal) => {
    if (!actor) return;
    const key = from.toString();
    setActionLoading(key);
    try {
      await actor.declineFriendRequest(from);
      await loadData();
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusDot = () => "w-2.5 h-2.5 rounded-full bg-gray-500";

  return (
    <div className="page-transition max-w-3xl mx-auto px-4 sm:px-8 py-10">
      <h1 className="font-display text-3xl font-black text-white mb-8 glow-text">
        Friends
      </h1>

      {/* Add Friend */}
      <div
        className="glass-card rounded-2xl p-6 mb-6 neon-border-purple"
        data-ocid="friends.section"
      >
        <h2 className="text-white font-bold mb-4 flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-purple-400" />
          Add Friend
        </h2>
        <form onSubmit={handleSendRequest} className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <Input
              type="text"
              placeholder="Enter username..."
              value={searchUsername}
              onChange={(e) => setSearchUsername(e.target.value)}
              className="pl-9 bg-white/5 border-purple-500/20 text-white placeholder:text-white/25"
              data-ocid="friends.search_input"
            />
          </div>
          <Button
            type="submit"
            disabled={sendingRequest || !searchUsername.trim()}
            className="neon-btn text-white px-5"
            data-ocid="friends.primary_button"
          >
            {sendingRequest ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Add"
            )}
          </Button>
        </form>
        {sendSuccess && (
          <p
            className="text-green-400 text-sm mt-2 flex items-center gap-1"
            data-ocid="friends.success_state"
          >
            <Check className="w-4 h-4" />
            Friend request sent!
          </p>
        )}
        {sendError && (
          <p
            className="text-red-400 text-sm mt-2"
            data-ocid="friends.error_state"
          >
            {sendError}
          </p>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12" data-ocid="friends.loading_state">
          <Loader2 className="w-8 h-8 animate-spin text-purple-400 mx-auto mb-3" />
          <p className="text-white/40 text-sm">Loading friends...</p>
        </div>
      ) : (
        <>
          {/* Pending Requests */}
          {pendingRequests.length > 0 && (
            <div
              className="glass-card rounded-2xl p-6 mb-6"
              data-ocid="friends.section"
            >
              <h2 className="text-white font-bold mb-4 flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-yellow-400/20 flex items-center justify-center">
                  <span className="text-yellow-400 text-xs font-bold">
                    {pendingRequests.length}
                  </span>
                </div>
                Pending Requests
              </h2>
              <div className="space-y-3">
                {pendingRequests.map((req, i) => (
                  <div
                    key={req.from.toString()}
                    className="flex items-center gap-4 p-3 bg-white/3 rounded-xl"
                    data-ocid={`friends.item.${i + 1}`}
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-sm flex-shrink-0">
                      👤
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">
                        {req.from.toString().slice(0, 12)}...
                      </p>
                      <p className="text-white/30 text-xs">
                        Wants to be your friend
                      </p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        size="sm"
                        onClick={() => handleAccept(req.from)}
                        disabled={actionLoading === req.from.toString()}
                        className="bg-green-600/80 hover:bg-green-600 text-white h-7 px-3"
                        data-ocid="friends.confirm_button"
                      >
                        {actionLoading === req.from.toString() ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <Check className="w-3 h-3" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleDecline(req.from)}
                        disabled={actionLoading === req.from.toString()}
                        variant="ghost"
                        className="text-red-400 hover:bg-red-500/10 h-7 px-3"
                        data-ocid="friends.delete_button"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Friends List */}
          <div
            className="glass-card rounded-2xl p-6"
            data-ocid="friends.section"
          >
            <h2 className="text-white font-bold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              Friends ({friends.length})
            </h2>

            {friends.length === 0 ? (
              <div
                className="text-center py-10"
                data-ocid="friends.empty_state"
              >
                <div className="text-4xl mb-3">👥</div>
                <p className="text-white/40 text-sm">
                  No friends yet. Search for a username to add someone!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {friends.map((friend, i) => (
                  <div
                    key={friend.to.toString()}
                    className="flex items-center gap-4 p-3 bg-white/3 rounded-xl hover:bg-white/5 transition-all"
                    data-ocid={`friends.item.${i + 1}`}
                  >
                    <div className="relative">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-sm">
                        🎮
                      </div>
                      <div
                        className={`absolute -bottom-0.5 -right-0.5 ${getStatusDot()} border-2 border-[#080818]`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">
                        {friend.to.toString().slice(0, 16)}...
                      </p>
                      <p className="text-white/30 text-xs">Friend</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => onNavigate("messages")}
                      variant="ghost"
                      className="text-purple-400 hover:bg-purple-500/10 h-7 px-3 flex-shrink-0"
                      data-ocid="friends.button"
                    >
                      <MessageCircle className="w-3.5 h-3.5 mr-1" />
                      Message
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
