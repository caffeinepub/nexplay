export type GameCategory =
  | "Action"
  | "Puzzle"
  | "Multiplayer"
  | "Racing"
  | "IO"
  | "Classic";

export interface Game {
  id: number;
  name: string;
  category: GameCategory;
  description: string;
  embedUrl: string;
  thumbnailColor: string;
}

export const GAMES: Game[] = [
  {
    id: 1,
    name: "Subway Surfers",
    category: "Action",
    description:
      "Dash through the subway dodging trains and collecting coins. A fast-paced endless runner with colorful worlds.",
    embedUrl: "https://games.crazygames.com/en_US/subway-surfers/index.html",
    thumbnailColor: "linear-gradient(135deg, #f59e0b, #ef4444)",
  },
  {
    id: 2,
    name: "Minecraft Classic",
    category: "Action",
    description:
      "The original browser version of Minecraft. Build and explore in a blocky 3D world with infinite creativity.",
    embedUrl: "https://classic.minecraft.net",
    thumbnailColor: "linear-gradient(135deg, #22c55e, #15803d)",
  },
  {
    id: 3,
    name: "Slope",
    category: "Action",
    description:
      "Control a ball rolling down an endless slope at high speed. Avoid obstacles and see how far you can go.",
    embedUrl: "https://classroom6x.com/slope",
    thumbnailColor: "linear-gradient(135deg, #6366f1, #8b5cf6)",
  },
  {
    id: 4,
    name: "Run 3",
    category: "Action",
    description:
      "Run through tunnels in outer space while the world rotates around you. An infinite runner in space.",
    embedUrl: "https://games.crazygames.com/en_US/run-3/index.html",
    thumbnailColor: "linear-gradient(135deg, #0ea5e9, #6366f1)",
  },
  {
    id: 5,
    name: "Cookie Clicker",
    category: "Classic",
    description:
      "Click cookies to gain cookie currency and purchase upgrades. An addictive incremental idle game.",
    embedUrl: "https://orteil.dashnet.org/cookieclicker/",
    thumbnailColor: "linear-gradient(135deg, #d97706, #92400e)",
  },
  {
    id: 6,
    name: "1v1.LOL",
    category: "Multiplayer",
    description:
      "Build and battle in this competitive third-person shooter. Practice your building and shooting skills.",
    embedUrl: "https://1v1.lol",
    thumbnailColor: "linear-gradient(135deg, #f43f5e, #be123c)",
  },
  {
    id: 7,
    name: "Tetris",
    category: "Puzzle",
    description:
      "The classic block-dropping puzzle game. Arrange falling tetrominoes to clear lines and score points.",
    embedUrl: "https://games.crazygames.com/en_US/tetris/index.html",
    thumbnailColor: "linear-gradient(135deg, #06b6d4, #0284c7)",
  },
  {
    id: 8,
    name: "Snake",
    category: "Classic",
    description:
      "Guide your snake to eat food and grow longer without hitting the walls or yourself.",
    embedUrl: "https://classroom6x.com/snake",
    thumbnailColor: "linear-gradient(135deg, #16a34a, #065f46)",
  },
  {
    id: 9,
    name: "Geometry Dash",
    category: "Action",
    description:
      "Jump and fly through obstacle courses set to pounding music. Rhythm-based platformer with intense challenges.",
    embedUrl: "https://classroom6x.com/geometry-dash",
    thumbnailColor: "linear-gradient(135deg, #f97316, #dc2626)",
  },
  {
    id: 10,
    name: "Friday Night Funkin",
    category: "Classic",
    description:
      "A rhythm game where you battle opponents in rap battles. Hit the right arrow keys in time with the music.",
    embedUrl: "https://classroom6x.com/friday-night-funkin",
    thumbnailColor: "linear-gradient(135deg, #ec4899, #8b5cf6)",
  },
  {
    id: 11,
    name: "Moto X3M",
    category: "Racing",
    description:
      "Race your motorcycle through insane obstacle courses. Pull off stunts and beat the clock in this bike game.",
    embedUrl: "https://games.crazygames.com/en_US/moto-x3m/index.html",
    thumbnailColor: "linear-gradient(135deg, #f59e0b, #b45309)",
  },
  {
    id: 12,
    name: "Basket Random",
    category: "Multiplayer",
    description:
      "Crazy physics-based basketball with wacky controls. Play solo or challenge a friend in this hilarious sports game.",
    embedUrl: "https://games.crazygames.com/en_US/basket-random/index.html",
    thumbnailColor: "linear-gradient(135deg, #f97316, #7c3aed)",
  },
  {
    id: 13,
    name: "Soccer Random",
    category: "Multiplayer",
    description:
      "Chaotic one-button soccer game with random physics. Score goals in the most unpredictable way possible.",
    embedUrl: "https://games.crazygames.com/en_US/soccer-random/index.html",
    thumbnailColor: "linear-gradient(135deg, #10b981, #1d4ed8)",
  },
  {
    id: 14,
    name: "Drift Hunters",
    category: "Racing",
    description:
      "Master the art of drifting in this 3D car game. Earn points for drifting and unlock new cars and tracks.",
    embedUrl: "https://games.crazygames.com/en_US/drift-hunters/index.html",
    thumbnailColor: "linear-gradient(135deg, #64748b, #1e293b)",
  },
  {
    id: 15,
    name: "Temple Run",
    category: "Action",
    description:
      "Run from evil demon monkeys through ancient temple ruins. Dodge obstacles and collect coins in this endless runner.",
    embedUrl: "https://classroom6x.com/temple-run",
    thumbnailColor: "linear-gradient(135deg, #92400e, #78350f)",
  },
  {
    id: 16,
    name: "Paper.io",
    category: "IO",
    description:
      "Claim territory by drawing shapes with your paper trail. Eliminate opponents while protecting your own territory.",
    embedUrl: "https://paper-io.com",
    thumbnailColor: "linear-gradient(135deg, #7c3aed, #4338ca)",
  },
  {
    id: 17,
    name: "Agar.io",
    category: "IO",
    description:
      "Eat smaller cells to grow bigger while avoiding larger ones. Classic multiplayer browser game about survival.",
    embedUrl: "https://agar.io",
    thumbnailColor: "linear-gradient(135deg, #22c55e, #15803d)",
  },
  {
    id: 18,
    name: "Slither.io",
    category: "IO",
    description:
      "Control a snake and eat glowing orbs to grow. Trap other snakes to make them crash into you.",
    embedUrl: "https://slither.io",
    thumbnailColor: "linear-gradient(135deg, #16a34a, #166534)",
  },
  {
    id: 19,
    name: "Shell Shockers",
    category: "IO",
    description:
      "A multiplayer FPS where you play as an egg armed with weapons. Scramble your enemies in this hilarious shooter.",
    embedUrl: "https://shellshock.io",
    thumbnailColor: "linear-gradient(135deg, #f59e0b, #dc2626)",
  },
  {
    id: 20,
    name: "Krunker.io",
    category: "IO",
    description:
      "Fast-paced pixel-art browser FPS with classes and abilities. One of the most popular browser shooters online.",
    embedUrl: "https://krunker.io",
    thumbnailColor: "linear-gradient(135deg, #dc2626, #7f1d1d)",
  },
  {
    id: 21,
    name: "Smash Karts",
    category: "Racing",
    description:
      "Kart racing meets battle arena! Drive, shoot, and explode opponents with power-ups in this multiplayer game.",
    embedUrl: "https://smashkarts.io",
    thumbnailColor: "linear-gradient(135deg, #f43f5e, #f97316)",
  },
  {
    id: 22,
    name: "BitLife",
    category: "Classic",
    description:
      "Simulate an entire human life from birth to death. Make choices that affect your career, relationships, and fate.",
    embedUrl: "https://classroom6x.com/bitlife",
    thumbnailColor: "linear-gradient(135deg, #06b6d4, #0891b2)",
  },
  {
    id: 23,
    name: "Retro Bowl",
    category: "Classic",
    description:
      "Old-school American football management and gameplay. Draft players, call plays, and lead your team to glory.",
    embedUrl: "https://classroom6x.com/retro-bowl",
    thumbnailColor: "linear-gradient(135deg, #16a34a, #166534)",
  },
  {
    id: 24,
    name: "Crossy Road",
    category: "Action",
    description:
      "Cross busy roads, rivers, and train tracks without getting hit. An endless arcade hopper with tons of characters.",
    embedUrl: "https://classroom6x.com/crossy-road",
    thumbnailColor: "linear-gradient(135deg, #10b981, #059669)",
  },
  {
    id: 25,
    name: "Stickman Hook",
    category: "Action",
    description:
      "Swing through levels like Spider-Man using your grappling hook. Addictive physics-based swinging platformer.",
    embedUrl: "https://games.crazygames.com/en_US/stickman-hook/index.html",
    thumbnailColor: "linear-gradient(135deg, #7c3aed, #6366f1)",
  },
  {
    id: 26,
    name: "Happy Wheels",
    category: "Action",
    description:
      "Ragdoll physics game with brutal obstacle courses. Choose your character and vehicle, then try to survive.",
    embedUrl: "https://classroom6x.com/happy-wheels",
    thumbnailColor: "linear-gradient(135deg, #dc2626, #b91c1c)",
  },
  {
    id: 27,
    name: "Vex 6",
    category: "Action",
    description:
      "Navigate a stick figure through deadly obstacle-filled stages. Precise platforming with traps, spikes, and hazards.",
    embedUrl: "https://games.crazygames.com/en_US/vex-6/index.html",
    thumbnailColor: "linear-gradient(135deg, #0ea5e9, #2563eb)",
  },
  {
    id: 28,
    name: "Vex 7",
    category: "Action",
    description:
      "The latest Vex installment with new stages and challenges. More traps, more hazards, more intense platforming action.",
    embedUrl: "https://games.crazygames.com/en_US/vex-7/index.html",
    thumbnailColor: "linear-gradient(135deg, #6366f1, #4f46e5)",
  },
  {
    id: 29,
    name: "Tunnel Rush",
    category: "Action",
    description:
      "Speed through a psychedelic tunnel while dodging obstacles. Test your reflexes in this hyper-fast endless game.",
    embedUrl: "https://games.crazygames.com/en_US/tunnel-rush/index.html",
    thumbnailColor: "linear-gradient(135deg, #8b5cf6, #ec4899)",
  },
  {
    id: 30,
    name: "Fireboy and Watergirl",
    category: "Puzzle",
    description:
      "Cooperative puzzle platformer with fire and water elements. Work together to guide both characters to the exit.",
    embedUrl: "https://classroom6x.com/fireboy-and-watergirl",
    thumbnailColor: "linear-gradient(135deg, #ef4444, #3b82f6)",
  },
  {
    id: 31,
    name: "Basketball Stars",
    category: "Multiplayer",
    description:
      "1v1 basketball game with skills and special moves. Outscore your opponent with fancy dribbles and dunks.",
    embedUrl: "https://games.crazygames.com/en_US/basketball-stars/index.html",
    thumbnailColor: "linear-gradient(135deg, #f97316, #dc2626)",
  },
  {
    id: 32,
    name: "Drive Mad",
    category: "Racing",
    description:
      "Drive insane vehicles through physics-based levels without flipping over. Balance and momentum are key.",
    embedUrl: "https://games.crazygames.com/en_US/drive-mad/index.html",
    thumbnailColor: "linear-gradient(135deg, #64748b, #0f172a)",
  },
  {
    id: 33,
    name: "Madalin Stunt Cars",
    category: "Racing",
    description:
      "Open-world stunt driving with exotic cars. Perform crazy tricks, race on massive maps, or just explore freely.",
    embedUrl: "https://classroom6x.com/madalin-stunt-cars",
    thumbnailColor: "linear-gradient(135deg, #dc2626, #1e1b4b)",
  },
  {
    id: 34,
    name: "Five Nights at Freddy's",
    category: "Classic",
    description:
      "Survive the night shift as a security guard while animatronics come alive. The iconic horror survival game.",
    embedUrl: "https://classroom6x.com/fnaf",
    thumbnailColor: "linear-gradient(135deg, #1c1917, #292524)",
  },
  {
    id: 35,
    name: "Pac-Man",
    category: "Classic",
    description:
      "Eat all the dots while avoiding ghosts in the classic arcade maze game. Power pellets let you turn the tables.",
    embedUrl: "https://games.crazygames.com/en_US/pac-man/index.html",
    thumbnailColor: "linear-gradient(135deg, #fbbf24, #0f172a)",
  },
  {
    id: 36,
    name: "Flappy Bird",
    category: "Classic",
    description:
      "Tap to flap and keep the bird flying between pipes. Simple controls, infinite frustration and addiction.",
    embedUrl: "https://classroom6x.com/flappy-bird",
    thumbnailColor: "linear-gradient(135deg, #fbbf24, #22c55e)",
  },
  {
    id: 37,
    name: "Plants vs Zombies",
    category: "Puzzle",
    description:
      "Defend your lawn from zombie hordes using an army of plants. Classic tower defense strategy and fun.",
    embedUrl: "https://classroom6x.com/plants-vs-zombies",
    thumbnailColor: "linear-gradient(135deg, #16a34a, #15803d)",
  },
  {
    id: 38,
    name: "Angry Birds",
    category: "Puzzle",
    description:
      "Sling birds at pig fortresses to rescue stolen eggs. Physics-based puzzle game with satisfying destruction.",
    embedUrl: "https://classroom6x.com/angry-birds",
    thumbnailColor: "linear-gradient(135deg, #dc2626, #fbbf24)",
  },
  {
    id: 39,
    name: "Cut the Rope",
    category: "Puzzle",
    description:
      "Cut ropes to feed candy to Om Nom the little monster. Physics puzzles with collectible stars.",
    embedUrl: "https://classroom6x.com/cut-the-rope",
    thumbnailColor: "linear-gradient(135deg, #22c55e, #0ea5e9)",
  },
  {
    id: 40,
    name: "Jetpack Joyride",
    category: "Action",
    description:
      "Steal a jetpack and blast through a lab avoiding obstacles. Collect coins and power-ups in this endless runner.",
    embedUrl: "https://classroom6x.com/jetpack-joyride",
    thumbnailColor: "linear-gradient(135deg, #f97316, #7c3aed)",
  },
  {
    id: 41,
    name: "Tiny Fishing",
    category: "Classic",
    description:
      "Cast your line and catch fish to earn money for upgrades. A relaxing idle fishing game with many species.",
    embedUrl: "https://games.crazygames.com/en_US/tiny-fishing/index.html",
    thumbnailColor: "linear-gradient(135deg, #0ea5e9, #0284c7)",
  },
  {
    id: 42,
    name: "Block Blast",
    category: "Puzzle",
    description:
      "Place blocks on a grid and clear lines to earn points. Strategic spatial puzzle game with satisfying combos.",
    embedUrl: "https://games.crazygames.com/en_US/block-blast/index.html",
    thumbnailColor: "linear-gradient(135deg, #7c3aed, #2563eb)",
  },
  {
    id: 43,
    name: "Idle Breakout",
    category: "Classic",
    description:
      "Upgrade your balls to break bricks automatically. An idle clicker meets breakout for endless progression.",
    embedUrl: "https://classroom6x.com/idle-breakout",
    thumbnailColor: "linear-gradient(135deg, #ec4899, #8b5cf6)",
  },
  {
    id: 44,
    name: "Tank Trouble",
    category: "Multiplayer",
    description:
      "Battle tanks in a maze using bouncing cannonballs. Hilarious multiplayer tank combat with ricochet mayhem.",
    embedUrl: "https://classroom6x.com/tank-trouble",
    thumbnailColor: "linear-gradient(135deg, #65a30d, #166534)",
  },
  {
    id: 45,
    name: "Bad Ice Cream",
    category: "Multiplayer",
    description:
      "Break ice walls and collect fruit while dodging enemies. A fun multiplayer arcade game with ice powers.",
    embedUrl: "https://classroom6x.com/bad-ice-cream",
    thumbnailColor: "linear-gradient(135deg, #bae6fd, #0ea5e9)",
  },
  {
    id: 46,
    name: "Raft Wars",
    category: "Action",
    description:
      "Defend your raft treasure against attackers using a water cannon. Strategic turn-based shooting on the water.",
    embedUrl: "https://classroom6x.com/raft-wars",
    thumbnailColor: "linear-gradient(135deg, #0ea5e9, #0369a1)",
  },
  {
    id: 47,
    name: "Rooftop Snipers",
    category: "Multiplayer",
    description:
      "Shoot your opponent off the rooftop in this physics-based sniper game. One shot can change everything.",
    embedUrl: "https://games.crazygames.com/en_US/rooftop-snipers/index.html",
    thumbnailColor: "linear-gradient(135deg, #334155, #0f172a)",
  },
  {
    id: 48,
    name: "Zombs Royale",
    category: "IO",
    description:
      "Battle royale with 100 players, shrinking zone, and loot. Survive to be the last player standing in this .io game.",
    embedUrl: "https://zombsroyale.io",
    thumbnailColor: "linear-gradient(135deg, #65a30d, #1e1b4b)",
  },
  {
    id: 49,
    name: "Diep.io",
    category: "IO",
    description:
      "Control a tank and shoot geometric shapes and enemy tanks. Level up and upgrade your tank class.",
    embedUrl: "https://diep.io",
    thumbnailColor: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
  },
  {
    id: 50,
    name: "Ev.io",
    category: "IO",
    description:
      "Browser-based FPS with futuristic weapons and levels. Jump, slide, and eliminate players in this sci-fi shooter.",
    embedUrl: "https://ev.io",
    thumbnailColor: "linear-gradient(135deg, #6366f1, #0ea5e9)",
  },
  {
    id: 51,
    name: "Bullet Force",
    category: "Action",
    description:
      "High-quality 3D FPS with multiple game modes. Customize your loadout and dominate opponents online.",
    embedUrl: "https://games.crazygames.com/en_US/bullet-force/index.html",
    thumbnailColor: "linear-gradient(135deg, #374151, #111827)",
  },
  {
    id: 52,
    name: "Super Smash Flash",
    category: "Multiplayer",
    description:
      "Browser-based version of Smash Bros with iconic characters. Platform fighter with classic Nintendo characters.",
    embedUrl: "https://classroom6x.com/super-smash-flash",
    thumbnailColor: "linear-gradient(135deg, #fbbf24, #dc2626)",
  },
  {
    id: 53,
    name: "Learn to Fly",
    category: "Classic",
    description:
      "Help a penguin learn to fly by upgrading its gear. Launch, glide, and upgrade your way to flight success.",
    embedUrl: "https://classroom6x.com/learn-to-fly",
    thumbnailColor: "linear-gradient(135deg, #0ea5e9, #e2e8f0)",
  },
  {
    id: 54,
    name: "Papa's Pizzeria",
    category: "Classic",
    description:
      "Run Papa's pizzeria and make perfect pizzas for customers. Manage orders, toppings, and baking time.",
    embedUrl: "https://classroom6x.com/papas-pizzeria",
    thumbnailColor: "linear-gradient(135deg, #dc2626, #fbbf24)",
  },
  {
    id: 55,
    name: "Papa's Freezeria",
    category: "Classic",
    description:
      "Build ice cream sundaes for demanding customers. Layer ingredients perfectly in this time management game.",
    embedUrl: "https://classroom6x.com/papas-freezeria",
    thumbnailColor: "linear-gradient(135deg, #ec4899, #bae6fd)",
  },
  {
    id: 56,
    name: "Bloons TD 5",
    category: "Puzzle",
    description:
      "Pop balloons with tower monkey defenses in this beloved tower defense series. Strategy meets colorful fun.",
    embedUrl: "https://classroom6x.com/bloons-td-5",
    thumbnailColor: "linear-gradient(135deg, #ef4444, #fbbf24)",
  },
  {
    id: 57,
    name: "Bloons TD 6",
    category: "Puzzle",
    description:
      "The definitive monkey tower defense experience with heroes and upgrades. Hundreds of rounds of strategic fun.",
    embedUrl: "https://games.crazygames.com/en_US/bloons-td-6/index.html",
    thumbnailColor: "linear-gradient(135deg, #dc2626, #b45309)",
  },
  {
    id: 58,
    name: "Chess",
    category: "Classic",
    description:
      "The timeless strategy board game of kings. Play against AI or challenge another player in classic chess.",
    embedUrl: "https://classroom6x.com/chess",
    thumbnailColor: "linear-gradient(135deg, #1c1917, #e2e8f0)",
  },
  {
    id: 59,
    name: "Checkers",
    category: "Classic",
    description:
      "Classic board game of tactical movement and jumping. Capture all opponent pieces to win on the 8x8 board.",
    embedUrl: "https://classroom6x.com/checkers",
    thumbnailColor: "linear-gradient(135deg, #b91c1c, #fef3c7)",
  },
  {
    id: 60,
    name: "Solitaire",
    category: "Classic",
    description:
      "Classic Klondike solitaire card game. Sort cards into foundations and pass the time with this timeless game.",
    embedUrl: "https://classroom6x.com/solitaire",
    thumbnailColor: "linear-gradient(135deg, #166534, #d1fae5)",
  },
  {
    id: 61,
    name: "Minesweeper",
    category: "Puzzle",
    description:
      "Uncover cells without hitting mines using number hints. Classic logic puzzle that tests deduction skills.",
    embedUrl: "https://classroom6x.com/minesweeper",
    thumbnailColor: "linear-gradient(135deg, #374151, #9ca3af)",
  },
  {
    id: 62,
    name: "Sudoku",
    category: "Puzzle",
    description:
      "Fill the 9x9 grid with numbers 1-9 without repeating. The world's most popular number puzzle game.",
    embedUrl: "https://classroom6x.com/sudoku",
    thumbnailColor: "linear-gradient(135deg, #1d4ed8, #e2e8f0)",
  },
  {
    id: 63,
    name: "Wordle",
    category: "Puzzle",
    description:
      "Guess the 5-letter word in 6 tries. Color hints guide you to the daily answer in this viral word game.",
    embedUrl: "https://www.nytimes.com/games/wordle/index.html",
    thumbnailColor: "linear-gradient(135deg, #065f46, #d1fae5)",
  },
  {
    id: 64,
    name: "2048",
    category: "Puzzle",
    description:
      "Slide numbered tiles to combine them and reach 2048. Simple rules but deep strategic challenge.",
    embedUrl: "https://classroom6x.com/2048",
    thumbnailColor: "linear-gradient(135deg, #b45309, #fef3c7)",
  },
  {
    id: 65,
    name: "Helix Jump",
    category: "Action",
    description:
      "Drop a ball through helix platform gaps to reach the bottom. Avoid the colored sections or start over.",
    embedUrl: "https://games.crazygames.com/en_US/helix-jump/index.html",
    thumbnailColor: "linear-gradient(135deg, #7c3aed, #ec4899)",
  },
  {
    id: 66,
    name: "Hill Climb Racing",
    category: "Racing",
    description:
      "Drive vehicles up hills and collect coins without flipping over. Physics-based driving fun with many vehicles.",
    embedUrl: "https://classroom6x.com/hill-climb-racing",
    thumbnailColor: "linear-gradient(135deg, #65a30d, #b45309)",
  },
  {
    id: 67,
    name: "Crazy Cars",
    category: "Racing",
    description:
      "Race exotic supercars on various tracks and beat opponents. Fast-paced arcade racing action.",
    embedUrl: "https://games.crazygames.com/en_US/crazy-cars/index.html",
    thumbnailColor: "linear-gradient(135deg, #dc2626, #f59e0b)",
  },
  {
    id: 68,
    name: "Parking Fury",
    category: "Racing",
    description:
      "Park your car precisely without crashing in tight spaces. Tricky parking puzzles that test your driving skills.",
    embedUrl: "https://games.crazygames.com/en_US/parking-fury/index.html",
    thumbnailColor: "linear-gradient(135deg, #475569, #1e293b)",
  },
  {
    id: 69,
    name: "Skate Hooligans",
    category: "Action",
    description:
      "Skateboard endlessly through streets avoiding police and obstacles. An addictive runner with sick tricks.",
    embedUrl: "https://games.crazygames.com/en_US/skate-hooligans/index.html",
    thumbnailColor: "linear-gradient(135deg, #6366f1, #ec4899)",
  },
  {
    id: 70,
    name: "Run 2",
    category: "Action",
    description:
      "Run through space tunnels and platforms without falling. Rotate the world to find your path in outer space.",
    embedUrl: "https://classroom6x.com/run-2",
    thumbnailColor: "linear-gradient(135deg, #0ea5e9, #7c3aed)",
  },
  {
    id: 71,
    name: "Temple Run 2",
    category: "Action",
    description:
      "The blockbuster sequel with new environments and obstacles. Run faster, collect more, survive longer.",
    embedUrl: "https://classroom6x.com/temple-run-2",
    thumbnailColor: "linear-gradient(135deg, #92400e, #451a03)",
  },
  {
    id: 72,
    name: "Slope 2",
    category: "Action",
    description:
      "The sequel to the popular slope game with new tracks and features. Roll down steep slopes at insane speeds.",
    embedUrl: "https://classroom6x.com/slope-2",
    thumbnailColor: "linear-gradient(135deg, #8b5cf6, #4f46e5)",
  },
  {
    id: 73,
    name: "Stack Ball",
    category: "Action",
    description:
      "Smash through rotating helix platforms to reach the bottom. Avoid black sections or your ball shatters.",
    embedUrl: "https://games.crazygames.com/en_US/stack-ball/index.html",
    thumbnailColor: "linear-gradient(135deg, #f43f5e, #f97316)",
  },
  {
    id: 74,
    name: "Build Royale",
    category: "IO",
    description:
      "Battle royale with building mechanics in a browser game. Gather resources and build while fighting to survive.",
    embedUrl: "https://buildroyale.io",
    thumbnailColor: "linear-gradient(135deg, #16a34a, #65a30d)",
  },
  {
    id: 75,
    name: "Surviv.io",
    category: "IO",
    description:
      "Top-down 2D battle royale with many weapons and items. The classic browser battle royale experience.",
    embedUrl: "https://surviv.io",
    thumbnailColor: "linear-gradient(135deg, #166534, #14532d)",
  },
  {
    id: 76,
    name: "War Brokers",
    category: "IO",
    description:
      "Multiplayer voxel FPS with vehicles and weapons. Drive tanks, fly helicopters, and dominate the battlefield.",
    embedUrl: "https://warbrokers.io",
    thumbnailColor: "linear-gradient(135deg, #374151, #78350f)",
  },
  {
    id: 77,
    name: "Connect 4",
    category: "Classic",
    description:
      "Drop discs to get 4 in a row before your opponent. Classic strategy game for two players.",
    embedUrl: "https://classroom6x.com/connect-4",
    thumbnailColor: "linear-gradient(135deg, #fbbf24, #dc2626)",
  },
  {
    id: 78,
    name: "Uno",
    category: "Classic",
    description:
      "The famous card game of matching colors and numbers. Play cards strategically and shout UNO when you have one left.",
    embedUrl: "https://classroom6x.com/uno",
    thumbnailColor: "linear-gradient(135deg, #dc2626, #fbbf24)",
  },
  {
    id: 79,
    name: "Bob The Robber",
    category: "Action",
    description:
      "Stealth puzzle game where you rob buildings and avoid guards. Plan your heist and sneak through security.",
    embedUrl: "https://games.crazygames.com/en_US/bob-the-robber/index.html",
    thumbnailColor: "linear-gradient(135deg, #1c1917, #292524)",
  },
  {
    id: 80,
    name: "Fireboy and Watergirl 2",
    category: "Puzzle",
    description:
      "Cooperative fire and water adventure in the Light Temple. New puzzles and light mechanics to master together.",
    embedUrl: "https://classroom6x.com/fireboy-and-watergirl-2",
    thumbnailColor: "linear-gradient(135deg, #ef4444, #fbbf24)",
  },
  {
    id: 81,
    name: "Fireboy and Watergirl 3",
    category: "Puzzle",
    description:
      "Ice Temple adventure for the dynamic elemental duo. Navigate frozen puzzles with careful coordination.",
    embedUrl: "https://classroom6x.com/fireboy-and-watergirl-3",
    thumbnailColor: "linear-gradient(135deg, #3b82f6, #e0f2fe)",
  },
  {
    id: 82,
    name: "Fireboy and Watergirl 4",
    category: "Puzzle",
    description:
      "Crystal Temple awaits with new gem-powered puzzles. Reflect light and navigate through glowing crystal mazes.",
    embedUrl: "https://classroom6x.com/fireboy-and-watergirl-4",
    thumbnailColor: "linear-gradient(135deg, #8b5cf6, #ec4899)",
  },
  {
    id: 83,
    name: "Fireboy and Watergirl 5",
    category: "Puzzle",
    description:
      "Elements game where fire and water have new elemental powers. The most complex Fireboy and Watergirl yet.",
    embedUrl: "https://classroom6x.com/fireboy-and-watergirl-5",
    thumbnailColor: "linear-gradient(135deg, #f97316, #0ea5e9)",
  },
  {
    id: 84,
    name: "Getaway Shootout",
    category: "Multiplayer",
    description:
      "Race to the getaway vehicle using weapons and power-ups. Chaotic physics-based multiplayer fun.",
    embedUrl: "https://games.crazygames.com/en_US/getaway-shootout/index.html",
    thumbnailColor: "linear-gradient(135deg, #f59e0b, #dc2626)",
  },
  {
    id: 85,
    name: "OvO",
    category: "Action",
    description:
      "Fast-paced parkour platformer with fluid movement mechanics. Wall-run, slide, and dive through challenging levels.",
    embedUrl: "https://games.crazygames.com/en_US/ovo/index.html",
    thumbnailColor: "linear-gradient(135deg, #6366f1, #22d3ee)",
  },
  {
    id: 86,
    name: "1v1 Battle",
    category: "Multiplayer",
    description:
      "Ultimate 1-on-1 browser combat with multiple game modes. Test your skills against another player.",
    embedUrl: "https://classroom6x.com/1v1-battle",
    thumbnailColor: "linear-gradient(135deg, #dc2626, #7c3aed)",
  },
  {
    id: 87,
    name: "Hole.io",
    category: "IO",
    description:
      "Control a black hole and consume everything in a city. Grow bigger by eating smaller objects and players.",
    embedUrl: "https://hole-io.com",
    thumbnailColor: "linear-gradient(135deg, #1c1917, #6366f1)",
  },
  {
    id: 88,
    name: "Crowd City",
    category: "IO",
    description:
      "Gather as many people as possible and dominate the city. Absorb smaller crowds to grow your mob.",
    embedUrl: "https://classroom6x.com/crowd-city",
    thumbnailColor: "linear-gradient(135deg, #ec4899, #f97316)",
  },
  {
    id: 89,
    name: "Stickman Fighter",
    category: "Action",
    description:
      "Control a stickman in epic battles against waves of enemies. Chain combos and defeat bosses.",
    embedUrl: "https://games.crazygames.com/en_US/stickman-fighter/index.html",
    thumbnailColor: "linear-gradient(135deg, #374151, #dc2626)",
  },
  {
    id: 90,
    name: "Gun Mayhem",
    category: "Multiplayer",
    description:
      "Frantic platform shooter with many weapons and modes. Knock opponents off platforms using gun recoil.",
    embedUrl: "https://classroom6x.com/gun-mayhem",
    thumbnailColor: "linear-gradient(135deg, #dc2626, #374151)",
  },
  {
    id: 91,
    name: "Bomb It",
    category: "Multiplayer",
    description:
      "Bomberman-style arena game where you place bombs to clear paths and defeat opponents. Classic bomb strategy.",
    embedUrl: "https://games.crazygames.com/en_US/bomb-it/index.html",
    thumbnailColor: "linear-gradient(135deg, #f97316, #1c1917)",
  },
  {
    id: 92,
    name: "Zombs.io",
    category: "IO",
    description:
      "Build a base and defend it from zombie waves at night. Gather resources by day, fight for survival at night.",
    embedUrl: "https://zombs.io",
    thumbnailColor: "linear-gradient(135deg, #166534, #1c1917)",
  },
  {
    id: 93,
    name: "Doge Miner",
    category: "Classic",
    description:
      "Mine Dogecoin with the help of the Shiba Inu. Idle clicker with upgrades, rockets, and moon missions.",
    embedUrl: "https://classroom6x.com/doge-miner",
    thumbnailColor: "linear-gradient(135deg, #b45309, #fbbf24)",
  },
  {
    id: 94,
    name: "Duck Life",
    category: "Classic",
    description:
      "Train your duck in swimming, running, and flying to win races. Collect coins and upgrade your duckling.",
    embedUrl: "https://classroom6x.com/duck-life",
    thumbnailColor: "linear-gradient(135deg, #fbbf24, #0ea5e9)",
  },
  {
    id: 95,
    name: "Duck Life 2",
    category: "Classic",
    description:
      "Return to duck racing with new training events and tougher opponents. Become the world duck racing champion.",
    embedUrl: "https://classroom6x.com/duck-life-2",
    thumbnailColor: "linear-gradient(135deg, #f97316, #22c55e)",
  },
  {
    id: 96,
    name: "Duck Life 3",
    category: "Classic",
    description:
      "Evolution duck racing with ducks that can evolve into different types. Explore new racing categories.",
    embedUrl: "https://classroom6x.com/duck-life-3",
    thumbnailColor: "linear-gradient(135deg, #ec4899, #fbbf24)",
  },
  {
    id: 97,
    name: "Papa's Burgeria",
    category: "Classic",
    description:
      "Flip burgers and build perfect sandwiches for hungry customers. Time management in Papa's famous burger joint.",
    embedUrl: "https://classroom6x.com/papas-burgeria",
    thumbnailColor: "linear-gradient(135deg, #b45309, #dc2626)",
  },
  {
    id: 98,
    name: "Papa's Taco Mia",
    category: "Classic",
    description:
      "Wrap perfect tacos to satisfy Papa's customers. Manage cooking, filling, and wrapping in this food sim.",
    embedUrl: "https://classroom6x.com/papas-taco-mia",
    thumbnailColor: "linear-gradient(135deg, #65a30d, #f59e0b)",
  },
  {
    id: 99,
    name: "Gartic Phone",
    category: "Multiplayer",
    description:
      "Multiplayer drawing and guessing game like telephone. Draw prompts and see how messages get hilariously lost.",
    embedUrl: "https://garticphone.com",
    thumbnailColor: "linear-gradient(135deg, #ec4899, #8b5cf6)",
  },
  {
    id: 100,
    name: "Skribbl.io",
    category: "IO",
    description:
      "Multiplayer drawing and guessing game. One player draws a word while others race to guess it correctly.",
    embedUrl: "https://skribbl.io",
    thumbnailColor: "linear-gradient(135deg, #f97316, #22c55e)",
  },
];

export const CATEGORIES: GameCategory[] = [
  "Action",
  "Puzzle",
  "Multiplayer",
  "Racing",
  "IO",
  "Classic",
];

export function getGameById(id: number): Game | undefined {
  return GAMES.find((g) => g.id === id);
}
