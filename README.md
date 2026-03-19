<div align="center">

```
██╗  ██╗ █████╗ ██╗     ██╗    ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ 
██║ ██╔╝██╔══██╗██║     ██║    ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
█████╔╝ ███████║██║     ██║    ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
██╔═██╗ ██╔══██║██║     ██║    ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
██║  ██╗██║  ██║███████╗██║    ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝   ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ 
```

# 🖥️ Kali Portfolio OS

### *A browser-based Kali Linux desktop — my interactive portfolio*

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue?style=for-the-badge)](https://www.apache.org/licenses/LICENSE-2.0)

<br/>

> **Not your average portfolio.** This is a fully interactive Linux desktop OS — built entirely in the browser, simulating my real Kali Linux environment, with boot sequence, login screen, draggable windows, a functional terminal, file manager, and more.

</div>

---

## 📸 Preview

| Login Screen | Desktop |
|---|---|
| *Custom SVG wallpaper with Kali blur effect* | *Clean GNOME desktop — no icons, pure dock* |

> Live demo: *coming soon*

---

## 🧠 Concept

Instead of building a traditional portfolio website, I turned my **desktop into the portfolio itself**.

Everything you see is what I actually use — the Kali wallpaper, the GNOME panel, the terminal with neofetch, the system monitor with real skill metrics. It's designed to feel like you're sitting at **my actual machine**.

When you open the portfolio:
1. 🔁 **Boot** — a real Kali Linux boot log sequence scrolls across the screen
2. 🔒 **Login** — a GNOME-style lock screen with blurred wallpaper
3. 🖥️ **Desktop** — clean Kali desktop with a custom dock
4. 🚀 **Explore** — open apps, browse projects, read about me, launch the terminal

---

## ✨ Features

### OS Core
| Feature | Description |
|---|---|
| 🔁 Boot Sequence | Authentic Kali Linux boot log animation |
| 🔒 Login Screen | GNOME lock screen with SVG background blur |
| 🖥️ Desktop | Kali wallpaper, GNOME top bar, custom dock |
| 🪟 Window Manager | Drag, resize, minimize, maximize, multi-window |
| 📢 Notifications | Animated toast notification system |
| 🖱️ Context Menu | Right-click desktop menu |
| 📱 App Grid | Full applications launcher overlay |
| ⚙️ Quick Settings | System tray panel |

### Applications
| App | Description |
|---|---|
| 💻 Terminal | xterm.js powered terminal with `neofetch`, `help`, `projects`, `skills`, custom easter eggs |
| 🌐 Browser | Portfolio homepage with featured projects |
| 📁 File Manager | Kali-style file explorer simulation |
| 🧑 About Me | Syntax-highlighted code editor showing my profile |
| 🛡️ Projects | GitHub-style project browser with categories |
| 📊 System Monitor | Live-animated skill bars by category |
| 📧 Contact | Email client UI with direct mailto link |
| 📄 CV Viewer | Modern two-column PDF-style resume |
| ⚙️ Settings | GNOME Settings panel with system info |

---

## 🛠️ Tech Stack

```
┌──────────────────────────────────────────────────────────────────┐
│                        KALI PORTFOLIO OS                         │
├──────────────┬───────────────────────────────────────────────────┤
│ Core         │ React 19 · TypeScript 5.9 · Vite 8               │
│ Animations   │ Framer Motion 12                                  │
│ State        │ Zustand 5                                         │
│ Terminal     │ xterm.js 6 + addon-fit                           │
│ Windows      │ react-draggable · react-resizable                 │
│ Icons        │ Lucide React + Custom Kali SVG Icons              │
│ Styles       │ Vanilla CSS (no framework — full control)         │
│ Fonts        │ JetBrains Mono · Inter (Google Fonts)             │
└──────────────┴───────────────────────────────────────────────────┘
```

No unnecessary framework bloat. Every pixel crafted in **pure CSS** for maximum performance and fidelity.

---

## 🚀 Getting Started

### Prerequisites
- Node.js `>= 18`
- npm or yarn

### Install & Run

```bash
# Clone the repo
git clone https://github.com/LeminEly/Linux_Portfolio_Desktop_OS.git

# Navigate to the app directory
cd Linux_Portfolio_Desktop_OS/app

# Install dependencies
npm install

# Start dev server
npm run dev
```

The app runs at **http://localhost:5173** by default.

### Build for Production

```bash
npm run build
```

---

## 🗂️ Project Structure

```
app/
├── public/
│   ├── wallpapers/        # SVG desktop & login wallpapers
│   ├── avatar/            # Profile picture
│   └── cv/                # CV PDF file
└── src/
    ├── data/
    │   └── content.ts     # ← Edit this to personalize everything
    ├── os/
    │   ├── screens/       # Boot, Login, Desktop views
    │   ├── components/    # Dock, TopBar, WindowManager, etc.
    │   └── apps/          # All application components
    ├── store/
    │   └── useOSStore.ts  # Global OS state (Zustand)
    ├── styles/            # CSS design system
    └── types/             # TypeScript interfaces
```

---

## 🎨 Customization

Everything personal lives in one file:

```bash
src/data/content.ts
```

Edit your:
- `PROFILE` — name, email, GitHub, bio, location
- `SKILLS` — categories and proficiency levels (0–100)
- `PROJECTS` — all your repos with descriptions and tags
- `TIMELINE` — work experience, education, achievements
- `TERMINAL_WELCOME` — neofetch-style ASCII art

---

## 💻 Terminal Commands

Open the terminal app and try:

```bash
help          # Show all available commands
neofetch      # System info with ASCII art
ls            # List "desktop" files
whoami        # Display username
projects      # List all projects
skills        # Show skills by category
contact       # Display contact info
cat README    # Read the embedded readme
sudo rm -rf / # Try it 😄
```

---

## 📂 Highlighted Projects

Projects featured in this portfolio:

| Project | Type | Stack |
|---|---|---|
| [IHSAN Platform](https://github.com/LeminEly/IHSAN_PLATFORM) | Open Source | MERN, Express |
| [ChivaaApp](https://github.com/LeminEly/chivaa-app) | Professional | MERN, Healthcare |
| [SupNum-Scan](https://github.com/LeminEly/supnum-scan) | Security | Rust, Nmap |
| [CrackMe](https://github.com/LeminEly/CrackMe) | Security | C++, Reverse Engineering |
| [RCPSP Algo](https://github.com/LeminEly/RCPSP_algo) | Academic | Rust, Algorithms |
| [7odouri](https://github.com/LeminEly/7odouri) | Academic | IoT, Python, Web |
| [S3C-Challenge-BacIA](https://github.com/LeminEly/S3C-Challenge-BacIA) | Competition | AI, Web |
| [Hassaniya2Arabic](https://github.com/LeminEly/Hassaniya2Arabic) | Open Source | JavaScript, NLP |

> Collaborated on **30+ projects** across development, security, and research domains.

---

## 🏆 Achievements

```
🥇 1st Place — Nuit de l'Info (National Gold Medal)
🎯 TryHackMe Rank #4 Nationally — Top 2% Worldwide
🏆 Team Leader — SUPNUM Ramadan Challenge (Winner)
🔗 Active on Hedera Blockchain, CTF Time, and more
```

---

## 👤 About Me

```
leminEly@kali:~$ cat whoami.txt

  Name     : Lemin Ely
  Role     : Full-Stack Developer | Security Enthusiast
  School   : SUPNUM — License (targeting Master's)
  Location : Mauritania
  GitHub   : https://github.com/LeminEly
  LinkedIn : https://www.linkedin.com/in/lemin-ely-24x0x/
  Email    : 24209@supnum.mr

  Interests: Mathematics · Physics · Offensec · Innovation
```

---

## 📜 License

This project is licensed under the **Apache License 2.0**.  
You are free to use, fork, and adapt it — just give credit.

```
Copyright 2025 Lemin Ely
Licensed under the Apache License, Version 2.0
https://www.apache.org/licenses/LICENSE-2.0
```

---

<div align="center">

Made with ❤️ and ☕ by **[Lemin Ely](https://github.com/LeminEly)**

*Built to feel like a real desktop. Because why not.*

```
leminEly@kali:~$ shutdown -h now
```

</div>
