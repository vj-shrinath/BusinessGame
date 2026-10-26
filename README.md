# 🎲 Business - Nava Vyapar (India Edition)

> A modern, luxury Indian Edition Business & Real Estate board game crafted for **LG webOS Smart TVs** and web browsers.

![WebOS TV Compatible](https://img.shields.io/badge/Platform-LG%20webOS%20TV%20%7C%20Browser-blue?style=for-the-badge)
![UI/UX](https://img.shields.io/badge/Design-Glassmorphic%203D%20AAA-gold?style=for-the-badge)
![Architecture](https://img.shields.io/badge/Vanilla%20JS-No%20Dependencies-green?style=for-the-badge)

---

## 🌟 Overview

**Business (Nava Vyapar)** is an authentic Indian adaptation of classic real estate trading games. Players travel across premier Indian commercial hubs (Mumbai, New Delhi, Bengaluru, Chennai, Hyderabad, Kolkata, and more), purchasing properties, developing houses and grand hotels, building transport empires (Airways, Railways, Bus Transport, Taxi Service), and trading utilities (Renewable Energy, Recycling Plant).

Designed from the ground up for big-screen TVs, large displays, and desktop browsers, featuring an edge-to-edge 10x10 perimeter board with an integrated command & statistics center console.

---

## ✨ Key Features

### 🏛️ Edge-to-Edge Responsive Board Architecture
- **Fullscreen Layout**: Automatically adapts to any screen size (`100vw`, `100vh`) with zero wasted margins.
- **In-Board Center Console**: All statistics, player HUDs, 3D dice stage, master action buttons, and live activity ticker sit cleanly inside grid rows 2–9 and columns 2–9.
- **Context-Anchored Speech-Bubble Popups**: When landing on **Chance** or **Community Chest**, directional speech-bubble cards popup directly anchored to that particular box on the board with full dice roll rule charts.

### ⚙️ Customizable Game Setup & Economic Rules
- **Configurable Starting Capital**: Customize each player's cash (`₹10k`, `₹15k`, `₹20k`, `₹30k`, `₹50k`, or step by `±₹2,500`).
- **Central Bank Treasury Reserve**: Choose how much money the Reserve Bank keeps (`₹1 Lakh`, `₹2 Lakh`, `₹5 Lakh`, or `Unlimited ∞`). If the bank runs low, an emergency liquidity stimulus (`₹50,000`) is automatically issued.
- **START / GO Salary**: Set pass salary (`₹500`, `₹750`, `₹1,000`, `₹1,500`) with optional double bonus for landing directly on START.
- **Resort Jackpot Pool**: Taxes and jail fines accumulate in a central pot; landing on Resort (Tile 9) wins the jackpot!
- **Jail Bail & Rent Rules**: Set bail amount (`₹250`, `₹500`, `₹1,000`) and toggle whether players in jail can collect rent.
- **Quick Start Headstart**: Option to randomly deal 2 starter properties to each player at launch.
- **Winning Conditions**: Choose between Bankruptcy Elimination, Wealth Milestone (`₹50,000` or `₹1,00,000` Net Worth), or 30 Rounds Cap.
- **Instant Presets**: ⚡ Quick Casual, 🏛️ Classic Vyapar, 👑 Tycoon Deluxe, and 💰 High Roller.

### 🤖 Intelligent Bot AI & Player Customization
- Support for 2, 3, or 4 players with custom names.
- Individual **Human 👤 / Bot AI 🤖** toggle per player for solo play against computer tycoons or mixed multiplayer.

### 🎨 Pro UI/UX Craftsmanship
- **Typography**: Google Fonts [Cinzel](https://fonts.google.com/specimen/Cinzel), [Outfit](https://fonts.google.com/specimen/Outfit), and [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans).
- **Luxury Glassmorphism**: Frosted dark glass player cards, radiant gold active-turn aura, live tabular cash formatting (`₹20,000`), and dynamic miniature jewel property chips (`.prop-chip`).
- **Tactile 3D Master Buttons**: Ruby Roll button with specular shimmer sweep, Emerald Buy button, and Titanium End Turn button.
- **Authentic 3D Ivory Dice & Gotis**: Realistic rounded dice with recessed dark pips, and lathe-turned Indian resin gotis (pawns).

### 📺 LG webOS TV Spatial Navigation
- Full TV remote D-Pad navigation (`Left`, `Right`, `Up`, `Down`, `OK/Enter`).
- Color shortcut keys:
  - 🔴 **Red Key / R / Space**: Roll Dice
  - 🟢 **Green Key / B**: Buy Property / Build House
  - 🟡 **Yellow Key / E**: End Turn
  - 🔵 **Blue Key / F**: Fullscreen Toggle

---

## 🗂️ Project Structure

```
Business_game/
├── appinfo.json             # webOS TV Application Manifest
├── index.html               # Main TV Application Root & Layout
├── center_art.jpg           # Authentic Board Center Artwork
├── icon.png                 # App Launcher Icon (80x80)
├── largeIcon.png            # App Large Splash Icon (130x130)
├── css/
│   └── style.css            # Complete Responsive Glassmorphism Design System
├── js/
│   ├── data.js              # 36 Board Tiles, Color Groups, Pricing & Rules
│   ├── monuments.js         # Custom SVG Illustrations for Indian Monuments
│   ├── audio.js             # Web Audio API Sound Synthesizer (No external MP3s)
│   ├── tv-nav.js            # LG webOS TV Spatial Navigation Controller
│   ├── settings.js          # Dynamic Game Settings & Preset Manager
│   ├── ui.js                # DOM Rendering Engine & Anchored Popups
│   └── game.js              # Core Game Engine, Bank Treasury, AI & Rules
└── dist/
    └── com.antigravity.business.game_1.0.0_all.ipk  # Packaged webOS TV App
```

---

## 🚀 Running Locally

1. Open a terminal in the project directory:
   ```bash
   python -m http.server 8085
   ```
2. Open your browser at:
   ```
   http://localhost:8085/index.html
   ```

---

## 📺 Packaging for LG webOS TV

Using the official webOS TV CLI:
```bash
# Package the app into an IPK
ares-package . -o dist

# Install on connected webOS TV or Emulator
ares-install dist/com.antigravity.business.game_1.0.0_all.ipk -d <device_name>

# Launch on TV
ares-launch com.antigravity.business.game -d <device_name>
```

---

## 📜 License
MIT License. Created with ❤️ for board game and Smart TV enthusiasts.