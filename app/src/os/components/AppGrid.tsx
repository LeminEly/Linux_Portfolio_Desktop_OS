import React from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '../../store/useOSStore';
import { APP_DEFAULTS } from './Dock';
import {
    Terminal, FolderOpen, Globe, User, Cpu, Mail,
    Shield, FileText, Settings
} from 'lucide-react';

const ALL_APPS = [
    { id: 'filemanager', label: 'Files', icon: <FolderOpen size={40} />, color: '#3d8ef0' },
    { id: 'terminal', label: 'Terminal', icon: <Terminal size={40} />, color: '#2de98a' },
    { id: 'browser', label: 'Web Browser', icon: <Globe size={40} />, color: '#f0713a' },
    { id: 'about', label: 'About Me', icon: <User size={40} />, color: '#bc77e0' },
    { id: 'projects', label: 'Projects', icon: <Shield size={40} />, color: '#367bf0' },
    { id: 'skills', label: 'System Monitor', icon: <Cpu size={40} />, color: '#49aee6' },
    { id: 'contact', label: 'Contact', icon: <Mail size={40} />, color: '#ee5fa8' },
    { id: 'cv', label: 'CV Viewer', icon: <FileText size={40} />, color: '#f55353' },
    { id: 'settings', label: 'Settings', icon: <Settings size={40} />, color: '#888' },
];

const AppGrid: React.FC = () => {
    const { openWindow, toggleAppGrid } = useOSStore();

    const handleLaunch = (appId: string) => {
        const config = APP_DEFAULTS[appId];
        if (config) {
            openWindow(appId, config.title, config.icon, config.size);
        }
        toggleAppGrid();
    };

    return (
        <motion.div
            className="activities-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleAppGrid}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Search Bar */}
                <div style={{ marginBottom: 32, textAlign: 'center' }}>
                    <input
                        type="text"
                        placeholder="Type to search..."
                        style={{
                            width: 400,
                            maxWidth: '90vw',
                            padding: '12px 20px',
                            background: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 'var(--radius-full)',
                            color: 'white',
                            fontSize: 15,
                            fontFamily: 'var(--font-sans)',
                            outline: 'none',
                        }}
                        autoFocus
                    />
                </div>

                {/* Grid */}
                <div className="app-grid">
                    {ALL_APPS.map((app) => (
                        <button
                            key={app.id}
                            className="app-grid-item"
                            onClick={() => handleLaunch(app.id)}
                        >
                            <div className="app-grid-icon" style={{ backgroundColor: `${app.color}20`, border: `1px solid ${app.color}40`, color: app.color }}>
                                {app.icon}
                            </div>
                            <span className="app-grid-label">{app.label}</span>
                        </button>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AppGrid;
