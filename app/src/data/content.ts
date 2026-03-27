import type { Profile, Skill, Project, TimelineItem } from '../types';

export const PROFILE: Profile = {
    name: "Lemin Ely",
    username: "LeminEly",
    hostname: "kali",
    title: "Full-Stack Developer | AI Builder | Security Enthusiast",
    email: "24209@supnum.mr",
    github: "https://github.com/LeminEly",
    linkedin: "https://www.linkedin.com/in/lemin-ely-24x0x/",
    location: "Mauritania",
    avatar: "/avatar/profile.png",
    bio: `Full-Stack Developer and Cybersecurity Enthusiast (License student @ SUPNUM).
    Ranked #4 Nationally on TryHackMe (Top 2% Worldwide). 
    I have collaborated on over 30 projects, 
    specializing in MERN stack, AI/ML, and Offensive Security. 
    Passionate about Mathematics, Physics, and Innovation.`,
    cv: "/cv/cv.pdf",
};

export const SKILLS: Skill[] = [
    {
        category: "Languages",
        icon: "code",
        items: [
            { name: "JavaScript", level: 95 },
            { name: "TypeScript", level: 90 },
            { name: "Python", level: 92 },
            { name: "C++", level: 85 },
            { name: "Java", level: 80 },
            { name: "PHP", level: 85 },
            { name: "Bash", level: 90 },
            { name: "C", level: 80 }
        ]
    },
    {
        category: "Frontend",
        icon: "layout",
        items: [
            { name: "React", level: 95 },
            { name: "Next.js", level: 90 },
            { name: "Vue", level: 80 },
            { name: "Angular", level: 75 },
            { name: "TailwindCSS", level: 95 },
            { name: "Bootstrap", level: 90 },
            { name: "Vite", level: 95 }
        ]
    },
    {
        category: "Backend & APIs",
        icon: "server",
        items: [
            { name: "Node.js", level: 95 },
            { name: "Express", level: 95 },
            { name: "Spring Boot", level: 80 },
            { name: "Django", level: 90 },
            { name: "Laravel", level: 85 },
            { name: "Flask", level: 90 },
            { name: "REST API", level: 95 }
        ]
    },
    {
        category: "Databases",
        icon: "database",
        items: [
            { name: "MongoDB", level: 95 },
            { name: "MySQL", level: 90 },
            { name: "PostgreSQL", level: 85 },
            { name: "Firebase", level: 90 },
            { name: "Supabase", level: 85 },
            { name: "Oracle", level: 75 }
        ]
    },
    {
        category: "AI & Machine Learning",
        icon: "brain",
        items: [
            { name: "TensorFlow", level: 85 },
            { name: "PyTorch", level: 80 },
            { name: "Scikit-learn", level: 85 },
            { name: "OpenCV", level: 80 },
            { name: "NumPy", level: 90 },
            { name: "Pandas", level: 90 }
        ]
    },
    {
        category: "IoT & Embedded",
        icon: "cpu",
        items: [
            { name: "Arduino", level: 90 },
            { name: "ESP32", level: 90 },
            { name: "ESP8266", level: 85 },
            { name: "Raspberry Pi", level: 90 },
            { name: "MQTT", level: 95 },
            { name: "I2C/SPI", level: 85 }
        ]
    },
    {
        category: "Cybersecurity",
        icon: "shield",
        items: [
            { name: "Kali Linux", level: 98 },
            { name: "Metasploit", level: 90 },
            { name: "Burp Suite", level: 85 },
            { name: "Nmap", level: 95 },
            { name: "SQLmap", level: 90 },
            { name: "Ghidra", level: 80 },
            { name: "Wireshark", level: 90 }
        ]
    },
    {
        category: "DevOps & Tools",
        icon: "wrench",
        items: [
            { name: "Git", level: 95 },
            { name: "Docker", level: 88 },
            { name: "Linux", level: 95 },
            { name: "CI/CD", level: 85 },
            { name: "AWS", level: 80 },
            { name: "Nginx", level: 85 }
        ]
    }
];

export const PROJECTS: Project[] = [
    {
        id: "ihsan-platform",
        title: "IHSAN Platform",
        description: "Infrastructure de confiance entre donneurs et bénéficiaires, avec la communauté comme garant.",
        tags: ["JavaScript", "Node.js", "MongoDB", "Express"],
        type: "Open Source",
        github: "https://github.com/LeminEly/IHSAN_PLATFORM"
    },
    {
        id: "rcpsp-algo",
        title: "RCPSP Algo",
        description: "Robust and extremely fast optimization engine for solving complex scheduling problems under resource constraints.",
        tags: ["Rust", "Algorithms", "Operational Research"],
        type: "Academic",
        github: "https://github.com/LeminEly/RCPSP_algo"
    },
    {
        id: "supnum-scan",
        title: "SupNum-Scan",
        description: "Outil de reconnaissance réseau écrit en Rust, combinant un scan rapide natif et un scan avancé via Nmap.",
        tags: ["Rust", "Nmap", "Networking", "Security"],
        type: "Security",
        github: "https://github.com/LeminEly/supnum-scan"
    },
    {
        id: "7odouri",
        title: "7odouri",
        description: "Système intelligent de gestion de présence universitaire.",
        tags: ["IoT", "Embedded", "Web", "Python"],
        type: "Academic",
        github: "https://github.com/LeminEly/7odouri"
    },
    {
        id: "chivaa-app",
        title: "ChivaaApp",
        description: "Medical Clinic Management Application — full-stack solution for clinic operations.",
        tags: ["JavaScript", "MERN", "Healthcare"],
        type: "Professional",
        github: "https://github.com/LeminEly/chivaa-app"
    },
    {
        id: "s3c-bacia",
        title: "S3C-Challenge-BacIA",
        description: "Application Web d'Aide à la préparation du baccalauréat avec l'IA. Défi N°4 — Alfa Conseil.",
        tags: ["AI", "Web", "Education", "Challenge"],
        type: "Competition",
        github: "https://github.com/LeminEly/S3C-Challenge-BacIA"
    },
    {
        id: "crackme",
        title: "CrackMe",
        description: "C++ Reverse Engineering Challenge — Hard but Fair. Test your RE skills.",
        tags: ["C++", "Reverse Engineering", "Security"],
        type: "Security",
        github: "https://github.com/LeminEly/CrackMe"
    },
    {
        id: "hassaniya2arabic",
        title: "Hassaniya2Arabic",
        description: "Language translation tool for Hassaniya dialect to Arabic.",
        tags: ["JavaScript", "NLP", "Language"],
        type: "Open Source",
        github: "https://github.com/LeminEly/Hassaniya2Arabic"
    }
];

export const TIMELINE: TimelineItem[] = [
    {
        year: "2024 - Present",
        title: "Full-Stack Developer (Intern)",
        subtitle: "SMART MS SA",
        description: "Contributing to large-scale development projects and collaborating on professional software solutions.",
        type: "work"
    },
    {
        year: "2024",
        title: "1s Place - Gold Medal",
        subtitle: "Nuit de l'Info",
        description: "National winner (1st place) in the prestigious coding marathon for architecture and development.",
        type: "achievement"
    },
    {
        year: "2024",
        title: "Team Leader & Winner",
        subtitle: "SUPNUM Ramadan Challenge",
        description: "Led team to victory across multiple domains: Dev, DB, Networking, and Security.",
        type: "achievement"
    },
    {
        year: "2024",
        title: "Active Collaborator",
        subtitle: "30+ Projects",
        description: "Collaborated on 30+ projects including Hedera Blockchain, CTF Time, and Open Source apps.",
        type: "achievement"
    },
    {
        year: "2024",
        title: "TryHackMe Rank #4",
        subtitle: "National Top 2% Worldwide",
        description: "Ranked #4 nationally in Mauritania for cybersecurity skills on the TryHackMe platform.",
        type: "achievement"
    },
    {
        year: "2023 - Present",
        title: "Bachelor of Information Systems",
        subtitle: "SUPNUM",
        description: "Current License student focusing on Development and Networking. Targeting Master's degree.",
        type: "education"
    },
    {
        year: "2022",
        title: "Scientific Baccalaureate",
        subtitle: "Ecole de l'Excellence",
        description: "Graduated with honors from the School of Excellence, specializing in Mathematics and Physics.",
        type: "education"
    }
];

export const NEOFETCH_ART = `
\x1b[34m..............                                    \x1b[0m
\x1b[34m            ..,;:ccc,.                            \x1b[34m${PROFILE.username}\x1b[0m@\x1b[34m${PROFILE.hostname}\x1b[0m
\x1b[34m          ......''';lxO.                          ----------\x1b[0m
\x1b[34m.....'''''..........,:ld;                          \x1b[34mOS\x1b[0m: Kali Linux (Debian Based)
\x1b[34m           .';;;:::;,,.x,                         \x1b[34mRank\x1b[0m: Top 2% Worldwide (#4 Nat)
\x1b[34m      ..''.            0Wl                        \x1b[34mHost\x1b[0m: SUPNUM Student
\x1b[34m    ....                .:KWo                      \x1b[34mUptime\x1b[0m: ∞
\x1b[34m  '.                      ;XMN.                    \x1b[34mShell\x1b[0m: zsh 5.9
\x1b[34m :,                        oWMo                    \x1b[34mResolution\x1b[0m: 1920x1080
\x1b[34m ;l,            .....       dX;                    \x1b[34mDE\x1b[0m: GNOME 45
\x1b[34m  :x,       .......'',;.    0K,                    \x1b[34mWM\x1b[0m: Mutter
\x1b[34m   'l;,.............googd   lW'                    \x1b[34mTheme\x1b[0m: Kali-Modern-Dark
\x1b[34m     .googol.googoldogoo    ..                     \x1b[34mIcons\x1b[0m: Kali-Squircle-Pack
\x1b[34m                  .googol    ,                     \x1b[34mTerminal\x1b[0m: xterm-256color
\x1b[34m                   .dood:    c                     \x1b[34mCPU\x1b[0m: MERN Stack Engine
\x1b[34m                    .xd.                           \x1b[34mGPU\x1b[0m: AI/ML Co-Processor
\x1b[34m                     .,                            \x1b[34mMemory\x1b[0m: 100% Secure
`;

export const TERMINAL_WELCOME = `
\x1b[34m..............                                    \x1b[0m
\x1b[34m            ..,;:ccc,.                            \x1b[34m${PROFILE.username}\x1b[0m@\x1b[34m${PROFILE.hostname}\x1b[0m
\x1b[34m          ......''';lxO.                          ----------\x1b[0m
\x1b[34m.....'''''..........,:ld;                          \x1b[34mOS\x1b[0m: Kali Linux (Debian Based)
\x1b[34m           .';;;:::;,,.x,                         \x1b[34mRank\x1b[0m: Top 2% Worldwide (#4 Nat)
\x1b[34m      ..''.            0Wl                        \x1b[34mHost\x1b[0m: SUPNUM Student
\x1b[34m    ....                .:KWo                      \x1b[34mUptime\x1b[0m: ∞
\x1b[34m  '.                      ;XMN.                    \x1b[34mShell\x1b[0m: zsh 5.9
\x1b[34m :,                        oWMo                    \x1b[34mResolution\x1b[0m: 1920x1080
\x1b[34m ;l,            .....       dX;                    \x1b[34mDE\x1b[0m: GNOME 45
\x1b[34m  :x,       .......'',;.    0K,                    \x1b[34mWM\x1b[0m: Mutter
\x1b[34m   'l;,.............googd   lW'                    \x1b[34mTheme\x1b[0m: Kali-Modern-Dark
\x1b[34m     .googol.googoldogoo    ..                     \x1b[34mIcons\x1b[0m: Kali-Squircle-Pack
\x1b[34m                  .googol    ,                     \x1b[34mTerminal\x1b[0m: xterm-256color
\x1b[34m                   .dood:    c                     \x1b[34mCPU\x1b[0m: MERN Stack Engine
\x1b[34m                    .xd.                           \x1b[34mGPU\x1b[0m: AI/ML Co-Processor
\x1b[34m                     .,                            \x1b[34mMemory\x1b[0m: 100% Secure


Mere7be bikoum v \x1b[34mKali Portfolio OS\x1b[0m v2.0
Type \x1b[32mhelp\x1b[0m to see available commands.`;
