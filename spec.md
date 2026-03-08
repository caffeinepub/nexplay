# NexPlay

## Current State
No App.tsx exists. Previous build attempts failed. Only the base scaffold with shadcn UI components is present.

## Requested Changes (Diff)

### Add
- Full NexPlay unblocked games portal with dark blue/purple gradient theme
- "NexPlay" branding with yellow glowing text
- Account system: username, email (gmail/comptonusd.net only), password, profile icon, online status
- Email domain validation (block non-gmail/comptonusd.net accounts)
- Navigation tabs: Home, Information, All Games, Apps, Community, Shop, Support, Messages, Settings, Login/Signup
- Home page with hero section, featured games, recently played, favorites
- Information tab explaining why NexPlay exists
- All Games page: grid of 100 unblocked games with thumbnails, search bar, category filters (Action, Puzzle, Multiplayer, Racing), play buttons, game descriptions, favorite toggle
- Game viewer: fullscreen iframe embed with loading animation, report button
- Apps section: 5 embedded apps (ChatGPT, Private Google, Movies, YouTube, Snapchat Web) opening in fullscreen panel
- Shop tab: Pro tier ($15/month, 250 games, lag-free, extra access), Admin tier ($300 one-time, interview quiz with 200 questions)
- Community tab with Discord embed widget
- Friends system: search by username, send/accept friend requests (only users with accounts)
- Messages tab: chat with accepted friends
- Settings: theme selector, profile picture, display name, online status (online/away/do not disturb/offline)
- Support/Report: form to report broken games or website issues
- Favorites system (local + backend)
- Recently played tracking
- Fullscreen play mode
- Loading animation for games
- Smooth animations, neon hover effects, rounded cards

### Modify
- Nothing (new project)

### Remove
- Nothing

## Implementation Plan
1. Backend: user accounts, friends, messages, favorites, recently played, game reports, shop/subscription tiers
2. Frontend App.tsx with routing state (no react-router, use useState for pages)
3. NavBar component with all tabs and NexPlay yellow glow logo
4. Auth pages: Login, Signup with domain validation
5. Home page with hero, featured games, recently played, favorites grid
6. Information page
7. AllGames page with 100 games, search, categories, cards
8. GameViewer component (iframe fullscreen with report button)
9. Apps page with 5 embedded app panels
10. Shop page with Pro and Admin tiers
11. Community page with Discord embed
12. Friends page with search, requests, accept/decline
13. Messages page with friend chat
14. Settings page (theme, pfp, display name, status)
15. Support page with report form
16. Game data file with 100 game entries (name, category, embed URL, description, thumbnail color)
