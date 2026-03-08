import Int "mo:core/Int";
import Array "mo:core/Array";
import List "mo:core/List";
import Map "mo:core/Map";
import Set "mo:core/Set";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // TYPES

  type GameId = Nat;

  public type OnlineStatus = {
    #online;
    #away;
    #doNotDisturb;
    #offline;
  };

  public type UserProfile = {
    username : Text;
    displayName : Text;
    email : Text;
    profileIcon : Text;
    status : OnlineStatus;
    tier : UserTier;
    joinDate : Time.Time;
  };

  public type UserTier = {
    #free;
    #pro;
    #admin;
  };

  public type FriendStatus = {
    #pending;
    #accepted;
    #declined;
  };

  public type Message = {
    sender : Principal;
    receiver : Principal;
    content : Text;
    timestamp : Time.Time;
  };

  public type GameReport = {
    id : Nat;
    gameId : ?Nat;
    description : Text;
    reporter : Principal;
    timestamp : Time.Time;
    status : ReportStatus;
  };

  public type ReportStatus = {
    #open;
    #resolved;
    #closed;
  };

  public type SupportTicket = {
    id : Nat;
    subject : Text;
    description : Text;
    category : TicketCategory;
    status : TicketStatus;
    submittedBy : Principal;
    submittedAt : Time.Time;
  };

  public type TicketCategory = {
    #game;
    #website;
    #account;
    #other;
  };

  public type TicketStatus = {
    #open;
    #inProgress;
    #resolved;
    #closed;
  };

  public type FriendRequest = {
    from : Principal;
    to : Principal;
    status : FriendStatus;
    timestamp : Time.Time;
  };

  public type QuizQuestion = {
    id : Nat;
    question : Text;
    options : [Text];
    correctAnswerIndex : Nat;
  };

  public type QuizSubmission = {
    userId : Principal;
    answers : [Nat];
    score : Nat;
    passed : Bool;
    timestamp : Time.Time;
  };

  module FriendRequest {
    public func compare(a : FriendRequest, b : FriendRequest) : Order.Order {
      switch (Int.compare(a.timestamp, b.timestamp)) {
        case (#equal) {
          Principal.compare(a.from, b.from);
        };
        case (order) { order };
      };
    };
  };

  // STATE

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let users = Map.empty<Principal, UserProfile>();
  let userTiers = Map.empty<Principal, UserTier>();
  let favorites = Map.empty<Principal, Set.Set<GameId>>();
  let recentlyPlayed = Map.empty<Principal, List.List<GamePlayRecord>>();
  let friendRequests = Map.empty<Text, FriendRequest>();
  let messages = Map.empty<Text, List.List<Message>>();
  var gameReportCounter : Nat = 0;
  let gameReports = Map.empty<Nat, GameReport>();
  var supportTicketCounter : Nat = 0;
  let supportTickets = Map.empty<Nat, SupportTicket>();
  let quizQuestions = Map.empty<Nat, QuizQuestion>();
  let quizSubmissions = Map.empty<Principal, QuizSubmission>();

  // HELPER FUNCTIONS

  func validateEmail(email : Text) : Bool {
    email.endsWith(#text "@gmail.com") or email.endsWith(#text "@comptonusd.net")
  };

  func getFriendRequestKey(from : Principal, to : Principal) : Text {
    from.toText() # "-" # to.toText()
  };

  func getConversationKey(user1 : Principal, user2 : Principal) : Text {
    let p1 = user1.toText();
    let p2 = user2.toText();
    if (Text.compare(p1, p2) == #less) {
      p1 # "-" # p2
    } else {
      p2 # "-" # p1
    }
  };

  func areFriends(user1 : Principal, user2 : Principal) : Bool {
    let key1 = getFriendRequestKey(user1, user2);
    let key2 = getFriendRequestKey(user2, user1);
    switch (friendRequests.get(key1)) {
      case (?req) { req.status == #accepted };
      case null {
        switch (friendRequests.get(key2)) {
          case (?req) { req.status == #accepted };
          case null { false };
        }
      };
    }
  };

  // USER MANAGEMENT

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    if (not validateEmail(profile.email)) {
      Runtime.trap("Invalid email domain. Only @gmail.com and @comptonusd.net are allowed");
    };
    users.add(caller, profile);
  };

  public shared ({ caller }) func editCallerUserProfile(profile : UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can edit profiles");
    };
    if (not validateEmail(profile.email)) {
      Runtime.trap("Invalid email domain. Only @gmail.com and @comptonusd.net are allowed");
    };
    users.add(caller, profile);
  };

  public shared ({ caller }) func removeCallerUserProfile() : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can delete profiles");
    };
    users.remove(caller);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    users.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    users.get(user);
  };

  // USER TIER MANAGEMENT

  public shared ({ caller }) func upgradeToPro() : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can upgrade tier");
    };
    userTiers.add(caller, #pro);
  };

  public shared ({ caller }) func upgradeToAdmin() : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can upgrade tier");
    };
    userTiers.add(caller, #admin);
  };

  public query ({ caller }) func getUserTier() : async UserTier {
    switch (userTiers.get(caller)) {
      case (null) { #free };
      case (?tier) { tier };
    };
  };

  public query ({ caller }) func getAnyUserTier(user : Principal) : async UserTier {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Cannot read other users' profile data");
    };
    switch (userTiers.get(user)) {
      case (null) { #free };
      case (?tier) { tier };
    };
  };

  // FAVORITES MANAGEMENT

  public type FavoriteData = Set.Set<GameId>;

  public shared ({ caller }) func addFavorite(gameId : GameId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can add favorites");
    };
    var userFavorites = switch (favorites.get(caller)) {
      case (null) { Set.empty<GameId>() };
      case (?existing) { existing };
    };
    userFavorites.add(gameId);
    favorites.add(caller, userFavorites);
  };

  public shared ({ caller }) func removeFavorite(gameId : GameId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can remove favorites");
    };
    switch (favorites.get(caller)) {
      case (null) { Runtime.trap("No favorites found for this user") };
      case (?existing) {
        existing.remove(gameId);
        if (existing.isEmpty()) {
          favorites.remove(caller);
        };
      };
    };
  };

  public query ({ caller }) func getCallerFavorites() : async [GameId] {
    switch (favorites.get(caller)) {
      case (null) { [] };
      case (?list) { list.values().toArray() };
    };
  };

  public query ({ caller }) func getFavorites(user : Principal) : async [GameId] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own favorites");
    };
    switch (favorites.get(user)) {
      case (null) { [] };
      case (?list) { list.values().toArray() };
    };
  };

  // RECENTLY PLAYED

  public type GamePlayRecord = {
    gameId : GameId;
    timestamp : Time.Time;
  };

  public type RecentGamesRecord = List.List<GamePlayRecord>;

  public shared ({ caller }) func recordGamePlay(gameId : GameId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can record game play");
    };
    var history = switch (recentlyPlayed.get(caller)) {
      case (null) { List.empty<GamePlayRecord>() };
      case (?existing) { existing };
    };
    let record : GamePlayRecord = {
      gameId;
      timestamp = Time.now();
    };
    history.add(record);
    while (history.size() > 20) {
      ignore history.removeLast();
    };
    recentlyPlayed.add(caller, history);
  };

  public query ({ caller }) func getCallerRecentlyPlayed() : async [GamePlayRecord] {
    switch (recentlyPlayed.get(caller)) {
      case (null) { [] };
      case (?records) { records.toArray() };
    };
  };

  public query ({ caller }) func getRecentlyPlayed(user : Principal) : async [GamePlayRecord] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own recently played games");
    };
    switch (recentlyPlayed.get(user)) {
      case (null) { [] };
      case (?list) { list.toArray() };
    };
  };

  // FRIEND REQUESTS

  public shared ({ caller }) func sendFriendRequest(toUsername : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can send friend requests");
    };

    var toPrincipal : ?Principal = null;
    for ((principal, profile) in users.entries()) {
      if (profile.username == toUsername) {
        toPrincipal := ?principal;
      };
    };

    let to = switch (toPrincipal) {
      case (null) { Runtime.trap("User not found") };
      case (?p) { p };
    };

    if (caller == to) {
      Runtime.trap("Cannot send friend request to yourself");
    };

    let key = getFriendRequestKey(caller, to);
    let request : FriendRequest = {
      from = caller;
      to;
      status = #pending;
      timestamp = Time.now();
    };
    friendRequests.add(key, request);
  };

  public shared ({ caller }) func acceptFriendRequest(from : Principal) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can accept friend requests");
    };

    let key = getFriendRequestKey(from, caller);
    switch (friendRequests.get(key)) {
      case (null) { Runtime.trap("Friend request not found") };
      case (?req) {
        if (req.to != caller) {
          Runtime.trap("Unauthorized: Can only accept requests sent to you");
        };
        let updatedRequest : FriendRequest = {
          from;
          to = caller;
          status = #accepted;
          timestamp = Time.now();
        };
        friendRequests.add(key, updatedRequest);
      };
    };
  };

  public shared ({ caller }) func declineFriendRequest(from : Principal) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can decline friend requests");
    };

    let key = getFriendRequestKey(from, caller);
    switch (friendRequests.get(key)) {
      case (null) { Runtime.trap("Friend request not found") };
      case (?req) {
        if (req.to != caller) {
          Runtime.trap("Unauthorized: Can only decline requests sent to you");
        };
        let updatedRequest : FriendRequest = {
          from;
          to = caller;
          status = #declined;
          timestamp = Time.now();
        };
        friendRequests.add(key, updatedRequest);
      };
    };
  };

  public query ({ caller }) func getPendingFriendRequests() : async [FriendRequest] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view friend requests");
    };
    friendRequests.values().toArray().filter(
      func(request) {
        request.to == caller and request.status == #pending
      }
    );
  };

  public query ({ caller }) func getFriends() : async [FriendRequest] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view friends");
    };
    friendRequests.values().toArray().filter(
      func(request) {
        (request.from == caller or request.to == caller) and request.status == #accepted
      }
    );
  };

  // MESSAGES

  public shared ({ caller }) func sendMessage(to : Principal, content : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can send messages");
    };

    if (not areFriends(caller, to)) {
      Runtime.trap("Unauthorized: Can only send messages to friends");
    };

    let message : Message = {
      sender = caller;
      receiver = to;
      content;
      timestamp = Time.now();
    };

    let key = getConversationKey(caller, to);
    var conversation = switch (messages.get(key)) {
      case (null) { List.empty<Message>() };
      case (?existing) { existing };
    };

    conversation.add(message);
    while (conversation.size() > 50) {
      ignore conversation.removeLast();
    };

    messages.add(key, conversation);
  };

  public query ({ caller }) func getConversation(otherUser : Principal) : async [Message] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view messages");
    };

    if (not areFriends(caller, otherUser)) {
      Runtime.trap("Unauthorized: Can only view conversations with friends");
    };

    let key = getConversationKey(caller, otherUser);
    switch (messages.get(key)) {
      case (null) { [] };
      case (?conversation) { conversation.toArray() };
    };
  };

  // GAME REPORTS

  public shared ({ caller }) func submitGameReport(gameId : ?Nat, description : Text) : async Nat {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can submit game reports");
    };

    let reportId = gameReportCounter;
    gameReportCounter += 1;

    let report : GameReport = {
      id = reportId;
      gameId;
      description;
      reporter = caller;
      timestamp = Time.now();
      status = #open;
    };

    gameReports.add(reportId, report);
    reportId
  };

  public query ({ caller }) func getGameReports() : async [GameReport] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view game reports");
    };
    gameReports.values().toArray();
  };

  public shared ({ caller }) func updateGameReportStatus(reportId : Nat, status : ReportStatus) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update report status");
    };

    switch (gameReports.get(reportId)) {
      case (null) { Runtime.trap("Report not found") };
      case (?report) {
        let updatedReport : GameReport = {
          id = report.id;
          gameId = report.gameId;
          description = report.description;
          reporter = report.reporter;
          timestamp = report.timestamp;
          status;
        };
        gameReports.add(reportId, updatedReport);
      };
    };
  };

  // SUPPORT TICKETS

  public shared ({ caller }) func submitSupportTicket(subject : Text, description : Text, category : TicketCategory) : async Nat {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can submit support tickets");
    };

    let ticketId = supportTicketCounter;
    supportTicketCounter += 1;

    let ticket : SupportTicket = {
      id = ticketId;
      subject;
      description;
      category;
      status = #open;
      submittedBy = caller;
      submittedAt = Time.now();
    };

    supportTickets.add(ticketId, ticket);
    ticketId
  };

  public query ({ caller }) func getMySupportTickets() : async [SupportTicket] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view support tickets");
    };
    supportTickets.values().toArray().filter(
      func(ticket) {
        ticket.submittedBy == caller
      }
    );
  };

  public query ({ caller }) func getAllSupportTickets() : async [SupportTicket] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view all support tickets");
    };
    supportTickets.values().toArray();
  };

  public shared ({ caller }) func updateSupportTicketStatus(ticketId : Nat, status : TicketStatus) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update ticket status");
    };

    switch (supportTickets.get(ticketId)) {
      case (null) { Runtime.trap("Ticket not found") };
      case (?ticket) {
        let updatedTicket : SupportTicket = {
          id = ticket.id;
          subject = ticket.subject;
          description = ticket.description;
          category = ticket.category;
          status;
          submittedBy = ticket.submittedBy;
          submittedAt = ticket.submittedAt;
        };
        supportTickets.add(ticketId, updatedTicket);
      };
    };
  };

  // ADMIN QUIZ

  public shared ({ caller }) func addQuizQuestion(question : Text, options : [Text], correctAnswerIndex : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can add quiz questions");
    };

    if (options.size() != 4) {
      Runtime.trap("Quiz questions must have exactly 4 options");
    };

    if (correctAnswerIndex >= 4) {
      Runtime.trap("Correct answer index must be 0-3");
    };

    let questionId = quizQuestions.size();
    let quizQuestion : QuizQuestion = {
      id = questionId;
      question;
      options;
      correctAnswerIndex;
    };

    quizQuestions.add(questionId, quizQuestion);
  };

  public query ({ caller }) func getQuizQuestions() : async [{ id : Nat; question : Text; options : [Text] }] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view quiz questions");
    };

    quizQuestions.values().toArray().map(
      func(q : QuizQuestion) : { id : Nat; question : Text; options : [Text] } {
        { id = q.id; question = q.question; options = q.options };
      }
    );
  };

  public shared ({ caller }) func submitQuiz(answers : [Nat]) : async QuizSubmission {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can submit quiz");
    };

    if (answers.size() != 200) {
      Runtime.trap("Quiz must have exactly 200 answers");
    };

    var correctCount : Nat = 0;
    var i = 0;

    while (i < answers.size()) {
      switch (quizQuestions.get(i)) {
        case (null) {};
        case (?question) {
          if (i < answers.size() and answers[i] == question.correctAnswerIndex) {
            correctCount += 1;
          };
        };
      };
      i += 1;
    };

    let score = (correctCount * 100) / 200;
    let passed = score >= 70;

    let submission : QuizSubmission = {
      userId = caller;
      answers;
      score;
      passed;
      timestamp = Time.now();
    };

    quizSubmissions.add(caller, submission);
    submission;
  };

  public query ({ caller }) func getQuizSubmission(user : Principal) : async ?QuizSubmission {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own quiz submission");
    };
    quizSubmissions.get(user);
  };
};
