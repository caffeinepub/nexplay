import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserProfile {
    status: OnlineStatus;
    username: string;
    displayName: string;
    joinDate: Time;
    tier: UserTier;
    email: string;
    profileIcon: string;
}
export type Time = bigint;
export interface QuizSubmission {
    userId: Principal;
    answers: Array<bigint>;
    score: bigint;
    timestamp: Time;
    passed: boolean;
}
export interface GamePlayRecord {
    gameId: GameId;
    timestamp: Time;
}
export interface FriendRequest {
    to: Principal;
    status: FriendStatus;
    from: Principal;
    timestamp: Time;
}
export interface GameReport {
    id: bigint;
    status: ReportStatus;
    gameId?: bigint;
    description: string;
    timestamp: Time;
    reporter: Principal;
}
export type GameId = bigint;
export interface Message {
    content: string;
    sender: Principal;
    timestamp: Time;
    receiver: Principal;
}
export interface SupportTicket {
    id: bigint;
    status: TicketStatus;
    subject: string;
    submittedAt: Time;
    submittedBy: Principal;
    description: string;
    category: TicketCategory;
}
export enum FriendStatus {
    pending = "pending",
    accepted = "accepted",
    declined = "declined"
}
export enum OnlineStatus {
    doNotDisturb = "doNotDisturb",
    away = "away",
    offline = "offline",
    online = "online"
}
export enum ReportStatus {
    resolved = "resolved",
    closed = "closed",
    open = "open"
}
export enum TicketCategory {
    other = "other",
    game = "game",
    website = "website",
    account = "account"
}
export enum TicketStatus {
    resolved = "resolved",
    closed = "closed",
    open = "open",
    inProgress = "inProgress"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum UserTier {
    pro = "pro",
    admin = "admin",
    free = "free"
}
export interface backendInterface {
    acceptFriendRequest(from: Principal): Promise<void>;
    addFavorite(gameId: GameId): Promise<void>;
    addQuizQuestion(question: string, options: Array<string>, correctAnswerIndex: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    declineFriendRequest(from: Principal): Promise<void>;
    editCallerUserProfile(profile: UserProfile): Promise<void>;
    getAllSupportTickets(): Promise<Array<SupportTicket>>;
    getAnyUserTier(user: Principal): Promise<UserTier>;
    getCallerFavorites(): Promise<Array<GameId>>;
    getCallerRecentlyPlayed(): Promise<Array<GamePlayRecord>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getConversation(otherUser: Principal): Promise<Array<Message>>;
    getFavorites(user: Principal): Promise<Array<GameId>>;
    getFriends(): Promise<Array<FriendRequest>>;
    getGameReports(): Promise<Array<GameReport>>;
    getMySupportTickets(): Promise<Array<SupportTicket>>;
    getPendingFriendRequests(): Promise<Array<FriendRequest>>;
    getQuizQuestions(): Promise<Array<{
        id: bigint;
        question: string;
        options: Array<string>;
    }>>;
    getQuizSubmission(user: Principal): Promise<QuizSubmission | null>;
    getRecentlyPlayed(user: Principal): Promise<Array<GamePlayRecord>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getUserTier(): Promise<UserTier>;
    isCallerAdmin(): Promise<boolean>;
    recordGamePlay(gameId: GameId): Promise<void>;
    removeCallerUserProfile(): Promise<void>;
    removeFavorite(gameId: GameId): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    sendFriendRequest(toUsername: string): Promise<void>;
    sendMessage(to: Principal, content: string): Promise<void>;
    submitGameReport(gameId: bigint | null, description: string): Promise<bigint>;
    submitQuiz(answers: Array<bigint>): Promise<QuizSubmission>;
    submitSupportTicket(subject: string, description: string, category: TicketCategory): Promise<bigint>;
    updateGameReportStatus(reportId: bigint, status: ReportStatus): Promise<void>;
    updateSupportTicketStatus(ticketId: bigint, status: TicketStatus): Promise<void>;
    upgradeToAdmin(): Promise<void>;
    upgradeToPro(): Promise<void>;
}
