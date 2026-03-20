import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, FolderPlus, Settings, Image } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';

interface ContextMenuProps {
    x: number;
    y: number;
    onClose: () => void;
    totalWallpapers: number;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose, totalWallpapers }) => {
    const { cycleWallpaper, openWindow, addNotification } = useOSStore();

    // Adjust position to stay within viewport
    const adjustedX = Math.min(x, window.innerWidth - 240);
    const adjustedY = Math.min(y, window.innerHeight - 200);

    const handleAction = (action: string) => {
        switch (action) {
            case 'wallpaper':
                cycleWallpaper(totalWallpapers);
                break;
            case 'refresh':
                window.location.reload();
                break;
            case 'new_folder':
                addNotification({ title: 'Permission Denied', body: 'Error: Read-only file system' });
                break;
            case 'settings':
                openWindow('settings', 'Settings', 'settings', { width: 750, height: 500 });
                break;
        }
        onClose();
    };

    return (
        <motion.div
            className="context-menu"
            style={{ top: adjustedY, left: adjustedX }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.12 }}
            onClick={(e) => e.stopPropagation()}
        >
            <button className="context-menu-item" onClick={() => handleAction('wallpaper')}>
                <Image size={16} />
                Change Wallpaper
            </button>
            <button className="context-menu-item" onClick={() => handleAction('settings')}>
                <Settings size={16} />
                Display Settings
            </button>
            <div className="context-menu-divider" />
            <button className="context-menu-item" onClick={() => handleAction('new_folder')}>
                <FolderPlus size={16} />
                New Folder
            </button>
            <div className="context-menu-divider" />
            <button className="context-menu-item" onClick={() => handleAction('refresh')}>
                <RefreshCw size={16} />
                Refresh Desktop
            </button>
        </motion.div>
    );
};

export default ContextMenu;
