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

// Wallpapers — user adds their own images to public/wallpapers/
const WALLPAPERS = [
    '/wallpapers/wallpaper-1.svg',
    '/wallpapers/wallpaper-2.jpg',
    '/wallpapers/wallpaper-3.jpg',
    '/wallpapers/wallpaper-4.jpg',
];

const Desktop: React.FC = () => {
    const { wallpaperIndex, showQuickSettings, showAppGrid, showActivities, toggleActivities, showMatrix } = useOSStore();
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

            {/* Activities Overview */}
            <AnimatePresence>
                {showActivities && (
                    <motion.div
                        className="activities-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleActivities}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="activities-content"
                        >
                            <div style={{ fontSize: 32, marginBottom: 16 }}></div>
                            <div>Overview</div>
                            <div style={{ fontSize: 13, marginTop: 8, opacity: 0.6 }}>
                                Click anywhere to return
                            </div>
                        </motion.div>
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
        </div>
    );
};

export default Desktop;
