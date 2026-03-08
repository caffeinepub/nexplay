import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Principal } from "@icp-sdk/core/principal";
import { ArrowLeft, Loader2, MessageCircle, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { FriendRequest, Message } from "../backend.d";
import { FriendStatus } from "../backend.d";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export function MessagesPage() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const myPrincipal = identity?.getPrincipal().toString();

  const [friends, setFriends] = useState<FriendRequest[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<FriendRequest | null>(
    null,
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [loadingFriends, setLoadingFriends] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!actor) return;
    actor
      .getFriends()
      .then((fr) =>
        setFriends(fr.filter((f) => f.status === FriendStatus.accepted)),
      )
      .catch(() => {})
      .finally(() => setLoadingFriends(false));
  }, [actor]);

  useEffect(() => {
    if (!selectedFriend || !actor) return;
    loadMessages(selectedFriend.to);
  }, [selectedFriend, actor]);

  const loadMessages = async (otherUser: Principal) => {
    if (!actor) return;
    setLoadingMessages(true);
    try {
      const msgs = await actor.getConversation(otherUser);
      setMessages(msgs.sort((a, b) => Number(a.timestamp - b.timestamp)));
    } catch {
      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  };

  // Scroll to bottom when messages change
  // biome-ignore lint/correctness/useExhaustiveDependencies: messages triggers scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor || !selectedFriend || !newMessage.trim()) return;
    setSending(true);
    try {
      await actor.sendMessage(selectedFriend.to, newMessage.trim());
      setNewMessage("");
      await loadMessages(selectedFriend.to);
    } finally {
      setSending(false);
    }
  };

  const selectFriend = (friend: FriendRequest) => {
    setSelectedFriend(friend);
    setShowMobileSidebar(false);
  };

  const formatTime = (timestamp: bigint) => {
    const ms = Number(timestamp / BigInt(1_000_000));
    return new Date(ms).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="page-transition h-[calc(100vh-64px)] flex">
      {/* Sidebar */}
      <div
        className={`${showMobileSidebar ? "flex" : "hidden"} md:flex flex-col w-full md:w-72 lg:w-80 flex-shrink-0 border-r border-white/5`}
        style={{ background: "rgba(13,8,32,0.6)" }}
      >
        <div className="p-4 border-b border-white/5">
          <h2 className="text-white font-bold flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-purple-400" />
            Messages
          </h2>
        </div>

        {loadingFriends ? (
          <div
            className="flex-1 flex items-center justify-center"
            data-ocid="messages.loading_state"
          >
            <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
          </div>
        ) : friends.length === 0 ? (
          <div
            className="flex-1 flex flex-col items-center justify-center p-6 text-center"
            data-ocid="messages.empty_state"
          >
            <div className="text-4xl mb-3">💬</div>
            <p className="text-white/40 text-sm">
              No friends yet. Add friends to start chatting!
            </p>
          </div>
        ) : (
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {friends.map((friend, i) => (
                <button
                  type="button"
                  key={friend.to.toString()}
                  onClick={() => selectFriend(friend)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                    selectedFriend?.to.toString() === friend.to.toString()
                      ? "bg-purple-600/20 border border-purple-500/20"
                      : "hover:bg-white/5"
                  }`}
                  data-ocid={`messages.item.${i + 1}`}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-sm">
                      🎮
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-gray-500 border-2 border-[#080818]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">
                      {friend.to.toString().slice(0, 14)}...
                    </p>
                    <p className="text-white/30 text-xs">Friend</p>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>

      {/* Chat Area */}
      <div
        className={`${!showMobileSidebar ? "flex" : "hidden"} md:flex flex-1 flex-col`}
      >
        {!selectedFriend ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-white font-bold text-lg mb-2">
              Select a conversation
            </h3>
            <p className="text-white/40 text-sm max-w-xs">
              Choose a friend from the sidebar to start chatting
            </p>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div
              className="px-4 py-3 border-b border-white/5 flex items-center gap-3"
              style={{ background: "rgba(13,8,32,0.4)" }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMobileSidebar(true)}
                className="md:hidden text-white/50 hover:text-white -ml-1 p-1.5"
                data-ocid="messages.button"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-sm flex-shrink-0">
                🎮
              </div>
              <div>
                <p className="text-white text-sm font-medium">
                  {selectedFriend.to.toString().slice(0, 20)}...
                </p>
                <p className="text-white/30 text-xs">Friend</p>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              {loadingMessages ? (
                <div
                  className="flex items-center justify-center py-12"
                  data-ocid="messages.loading_state"
                >
                  <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
                </div>
              ) : messages.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center py-12 text-center"
                  data-ocid="messages.empty_state"
                >
                  <div className="text-4xl mb-3">👋</div>
                  <p className="text-white/40 text-sm">
                    No messages yet. Say hello!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg, i) => {
                    const isMine = msg.sender.toString() === myPrincipal;
                    return (
                      <div
                        key={`msg-${msg.timestamp.toString()}-${i}`}
                        className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                        data-ocid={`messages.item.${i + 1}`}
                      >
                        {!isMine && (
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">
                            🎮
                          </div>
                        )}
                        <div
                          className={`max-w-xs sm:max-w-md px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                            isMine
                              ? "bg-purple-600/60 text-white rounded-tr-sm"
                              : "bg-white/8 text-white/90 rounded-tl-sm"
                          }`}
                        >
                          {msg.content}
                          <div
                            className={`text-xs mt-1 ${isMine ? "text-purple-200/50" : "text-white/30"}`}
                          >
                            {formatTime(msg.timestamp)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </ScrollArea>

            {/* Message Input */}
            <form
              onSubmit={handleSend}
              className="p-4 border-t border-white/5 flex gap-3"
              style={{ background: "rgba(13,8,32,0.4)" }}
            >
              <Input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 bg-white/5 border-purple-500/20 text-white placeholder:text-white/25 focus:border-purple-400"
                data-ocid="messages.input"
              />
              <Button
                type="submit"
                disabled={sending || !newMessage.trim()}
                className="neon-btn text-white px-4 flex-shrink-0"
                data-ocid="messages.submit_button"
              >
                {sending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
