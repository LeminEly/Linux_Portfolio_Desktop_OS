import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '../../store/useOSStore';

// Components
import TopBar from '../components/TopBar';
import Dock from '../components/Dock';
import WindowManager from '../components/WindowManager';
import ContextMenu from '../components/ContextMenu';
import QuickSettings from '../components/QuickSettings';
import AppGrid from '../components/AppGrid';
import DesktopIcons from '../components/DesktopIcons';
import NotificationToast from '../components/NotificationToast';
import MatrixRain from '../components/MatrixRain';
import BSOD from '../components/BSOD.tsx';

// Wallpapers — user adds their own images to public/wallpapers/
const WALLPAPERS = [
    '/wallpapers/wallpaper-1.svg',
    '/wallpapers/wallpaper-2.jpg',
    '/wallpapers/wallpaper-3.jpg',
    '/wallpapers/wallpaper-4.jpg',
];

const Desktop: React.FC = () => {
    const {
        wallpaperIndex,
        showQuickSettings,
        showAppGrid,
        showActivities,
        toggleActivities,
        showMatrix,
        windows,
        closeWindow,
        restoreWindow,
        focusWindow,
        showBSOD
    } = useOSStore();
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

    const handleContextMenu = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
    }, []);

    const handleDesktopClick = useCallback(() => {
        setContextMenu(null);
        if (showQuickSettings) useOSStore.getState().toggleQuickSettings();
        if (showAppGrid) useOSStore.getState().toggleAppGrid();
        if (showActivities) useOSStore.getState().toggleActivities();
    }, [showQuickSettings, showAppGrid, showActivities]);

    // All windows shown in overview
    const allWindows = windows;

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
            }}
            onContextMenu={handleContextMenu}
            onClick={handleDesktopClick}
        >
            {/* Matrix Rain Effect */}
            {showMatrix && <MatrixRain />}

            {/* Wallpaper */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url('${WALLPAPERS[wallpaperIndex % WALLPAPERS.length]}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: '#1a1a2e',
                    transition: 'background-image 0.7s ease',
                }}
            />

            {/* Subtle gradient overlay for depth */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 10%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.15) 100%)',
                    pointerEvents: 'none',
                }}
            />

            {/* Top Bar (GNOME) */}
            <TopBar />

            {/* Desktop Icons */}
            <DesktopIcons />

            {/* Window Manager */}
            <WindowManager />

            {/* Dock */}
            <Dock />

            {/* Quick Settings Panel */}
            <AnimatePresence>
                {showQuickSettings && <QuickSettings />}
            </AnimatePresence>

            {/* App Grid (GNOME Activities) */}
            <AnimatePresence>
                {showAppGrid && <AppGrid />}
            </AnimatePresence>

            {/* Activities Overview — GNOME-style window spread */}
            <AnimatePresence>
                {showActivities && (
                    <motion.div
                        className="activities-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={(e) => { e.stopPropagation(); toggleActivities(); }}
                    >
                        {/* Header */}
                        <motion.div
                            initial={{ y: -16, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -16, opacity: 0 }}
                            transition={{ delay: 0.05 }}
                            style={{ marginBottom: 28, textAlign: 'center' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>
                                Activities Overview
                            </div>
                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
                                Click a window to switch · × to close · click outside to return
                            </div>
                        </motion.div>

                        {/* Window Cards Grid */}
                        {allWindows.length === 0 ? (
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 12,
                                    color: 'rgba(255,255,255,0.35)',
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                    <rect x="3" y="3" width="18" height="18" rx="2" />
                                    <path d="M3 9h18" />
                                </svg>
                                <div style={{ fontSize: 14 }}>No open windows</div>
                                <div style={{ fontSize: 12, opacity: 0.6 }}>Open an app from the dock below</div>
                            </motion.div>
                        ) : (
                            <motion.div
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 20,
                                    justifyContent: 'center',
                                    maxWidth: '90vw',
                                    maxHeight: '70vh',
                                    overflowY: 'auto',
                                    padding: '8px 16px',
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {allWindows.map((win, i) => (
                                    <motion.div
                                        key={win.id}
                                        initial={{ scale: 0.75, opacity: 0, y: 24 }}
                                        animate={{ scale: 1, opacity: 1, y: 0 }}
                                        exit={{ scale: 0.75, opacity: 0, y: 24 }}
                                        transition={{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 26 }}
                                        className="overview-window-card"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            restoreWindow(win.id);
                                            focusWindow(win.id);
                                            toggleActivities();
                                        }}
                                    >
                                        {/* Card header bar */}
                                        <div className="overview-card-header">
                                            <span className="overview-card-icon">{win.icon}</span>
                                            <span className="overview-card-title">{win.title}</span>
                                            {win.isMinimized && (
                                                <span style={{
                                                    fontSize: 9,
                                                    background: 'rgba(255,255,255,0.15)',
                                                    padding: '1px 5px',
                                                    borderRadius: 4,
                                                    color: 'rgba(255,255,255,0.6)',
                                                    marginLeft: 4,
                                                    flexShrink: 0,
                                                }}>MIN</span>
                                            )}
                                            <button
                                                className="overview-card-close"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    closeWindow(win.id);
                                                    if (allWindows.length === 1) toggleActivities();
                                                }}
                                                title="Close window"
                                            >×</button>
                                        </div>

                                        {/* Preview body */}
                                        <div className="overview-card-body">
                                            <div className="overview-card-preview">
                                                <div style={{ fontSize: 32, marginBottom: 8 }}>{win.icon}</div>
                                                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{win.title}</div>
                                                {win.isMinimized && (
                                                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>Minimized</div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Context Menu */}
            <AnimatePresence>
                {contextMenu && (
                    <ContextMenu
                        x={contextMenu.x}
                        y={contextMenu.y}
                        onClose={() => setContextMenu(null)}
                        totalWallpapers={WALLPAPERS.length}
                    />
                )}
            </AnimatePresence>

            {/* Notification Toasts */}
            <NotificationToast />

            {/* BSOD Effect */}
            <AnimatePresence>
                {showBSOD && <BSOD />}
            </AnimatePresence>
        </div>
    );
};

export default Desktop;
