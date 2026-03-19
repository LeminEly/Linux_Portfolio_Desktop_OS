import React, { useState } from 'react';
import { useOSStore } from '../../store/useOSStore';
import { PROFILE } from '../../data/content';

interface DockProps {
}

/* ─── Kali-themed SVG Icons ─── */
const KaliTerminal = () => (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
        <rect x="4" y="6" width="40" height="36" rx="4" fill="#1a1a2e" stroke="#2de98a" strokeWidth="2" />
        <text x="10" y="32" fontFamily="monospace" fontSize="20" fontWeight="bold" fill="#2de98a">$_</text>
    </svg>
);

const KaliFiles = () => (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
        <path d="M6 12C6 10.8954 6.89543 10 8 10H18L22 14H40C41.1046 14 42 14.8954 42 16V38C42 39.1046 41.1046 40 40 40H8C6.89543 40 6 39.1046 6 38V12Z" fill="#3d8ef0" />
        <path d="M6 16H42V38C42 39.1046 41.1046 40 40 40H8C6.89543 40 6 39.1046 6 38V16Z" fill="#5aa3f5" />
    </svg>
);

const KaliBrowser = () => (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="18" fill="#f0713a" />
        <circle cx="24" cy="24" r="14" fill="none" stroke="#fff3" strokeWidth="1.5" />
        <path d="M24 6C24 6 18 16 18 24C18 32 24 42 24 42" stroke="#fff3" strokeWidth="1.5" fill="none" />
        <path d="M24 6C24 6 30 16 30 24C30 32 24 42 24 42" stroke="#fff3" strokeWidth="1.5" fill="none" />
        <line x1="7" y1="20" x2="41" y2="20" stroke="#fff3" strokeWidth="1.5" />
        <line x1="7" y1="28" x2="41" y2="28" stroke="#fff3" strokeWidth="1.5" />
        <circle cx="20" cy="18" r="5" fill="#ff9d3a" opacity="0.8" />
        <path d="M18 16C18 16 22 14 24 18C22 20 18 20 18 16Z" fill="#ffcc33" />
    </svg>
);

const KaliUser = () => (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="18" fill="#bc77e0" />
        <circle cx="24" cy="18" r="7" fill="#e8d5f5" />
        <path d="M12 38C12 32 17 28 24 28C31 28 36 32 36 38" fill="#e8d5f5" />
    </svg>
);

const KaliShield = () => (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
        <path d="M24 4L6 12V24C6 34 14 42 24 44C34 42 42 34 42 24V12L24 4Z" fill="#367bf0" />
        <path d="M24 8L10 14V24C10 32 16 38 24 40C32 38 38 32 38 24V14L24 8Z" fill="#5a9af5" />
        <path d="M20 24L23 27L28 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const KaliMonitor = () => (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
        <rect x="4" y="6" width="40" height="28" rx="3" fill="#1a1a2e" stroke="#49aee6" strokeWidth="2" />
        <line x1="24" y1="34" x2="24" y2="40" stroke="#49aee6" strokeWidth="2" />
        <line x1="16" y1="40" x2="32" y2="40" stroke="#49aee6" strokeWidth="2" strokeLinecap="round" />
        <polyline points="10,26 16,20 22,24 28,14 34,22 38,18" fill="none" stroke="#2de98a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="10,28 16,24 22,28 28,20 34,26 38,22" fill="none" stroke="#f5a623" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    </svg>
);

const KaliMail = () => (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
        <rect x="4" y="10" width="40" height="28" rx="4" fill="#ee5fa8" />
        <path d="M4 14L24 28L44 14" stroke="white" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
        <path d="M4 38L18 24" stroke="white" strokeWidth="1.5" opacity="0.4" />
        <path d="M44 38L30 24" stroke="white" strokeWidth="1.5" opacity="0.4" />
    </svg>
);

const KaliGrid = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="5" cy="5" r="2.2" fill="currentColor" />
        <circle cx="12" cy="5" r="2.2" fill="currentColor" />
        <circle cx="19" cy="5" r="2.2" fill="currentColor" />
        <circle cx="5" cy="12" r="2.2" fill="currentColor" />
        <circle cx="12" cy="12" r="2.2" fill="currentColor" />
        <circle cx="19" cy="12" r="2.2" fill="currentColor" />
        <circle cx="5" cy="19" r="2.2" fill="currentColor" />
        <circle cx="12" cy="19" r="2.2" fill="currentColor" />
        <circle cx="19" cy="19" r="2.2" fill="currentColor" />
    </svg>
);

const DOCK_APPS = [
    { id: 'filemanager', label: 'Files', icon: <KaliFiles />, color: '#3d8ef0' },
    { id: 'terminal', label: 'Terminal', icon: <KaliTerminal />, color: '#2de98a' },
    { id: 'browser', label: 'Web Browser', icon: <KaliBrowser />, color: '#f0713a' },
    { id: 'about', label: 'About Me', icon: <KaliUser />, color: '#bc77e0' },
    { id: 'projects', label: 'Projects', icon: <KaliShield />, color: '#367bf0' },
    { id: 'skills', label: 'System Monitor', icon: <KaliMonitor />, color: '#49aee6' },
    { id: 'contact', label: 'Contact', icon: <KaliMail />, color: '#ee5fa8' },
];

const APP_DEFAULTS: Record<string, { title: string; icon: string; size?: { width: number; height: number } }> = {
    filemanager: { title: `Home — Files`, icon: 'folder', size: { width: 850, height: 550 } },
    terminal: { title: `${PROFILE.username}@${PROFILE.hostname}: ~`, icon: 'terminal', size: { width: 780, height: 480 } },
    browser: { title: 'Web Browser', icon: 'globe', size: { width: 950, height: 620 } },
    about: { title: 'About Me — Text Editor', icon: 'user', size: { width: 750, height: 500 } },
    projects: { title: 'Projects — Browser', icon: 'shield', size: { width: 950, height: 620 } },
    skills: { title: 'System Monitor', icon: 'cpu', size: { width: 800, height: 550 } },
    contact: { title: 'Contact — Mail', icon: 'mail', size: { width: 800, height: 520 } },
    cv: { title: 'CV.pdf — Document Viewer', icon: 'filetext', size: { width: 700, height: 550 } },
    settings: { title: 'Settings', icon: 'settings', size: { width: 750, height: 500 } },
};

const Dock: React.FC<DockProps> = () => {
    const { openWindow, windows, toggleAppGrid } = useOSStore();
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const handleLaunch = (appId: string) => {
        const config = APP_DEFAULTS[appId];
        if (!config) return;
        openWindow(appId, config.title, config.icon, config.size);
    };

    const openApps = windows.map(w => w.appId);

    return (
        <div className="dock" onClick={(e) => e.stopPropagation()}>
            {DOCK_APPS.map((app) => (
                <div
                    key={app.id}
                    className={`dock-item ${openApps.includes(app.id) ? 'dock-item-active' : ''}`}
                    onClick={() => handleLaunch(app.id)}
                    onMouseEnter={() => setHoveredId(app.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                        backgroundColor: `${app.color}25`,
                        border: `1px solid ${app.color}40`,
                        color: app.color
                    }}
                >
                    {app.icon}
                    {hoveredId === app.id && (
                        <div className="dock-tooltip">{app.label}</div>
                    )}
                </div>
            ))}

            <div className="dock-separator" />

            {/* Show Apps Grid Button */}
            <div
                className="dock-item"
                onClick={toggleAppGrid}
                onMouseEnter={() => setHoveredId('grid')}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'var(--text-secondary)'
                }}
            >
                <KaliGrid />
                {hoveredId === 'grid' && (
                    <div className="dock-tooltip">Show Applications</div>
                )}
            </div>
        </div>
    );
};

export { APP_DEFAULTS };
export default Dock;
