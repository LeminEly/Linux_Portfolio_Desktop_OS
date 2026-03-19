import React, { useState } from 'react';
import { useOSStore } from '../../store/useOSStore';
import { APP_DEFAULTS } from '../components/Dock';
import {
    FolderOpen, FileText, ChevronLeft, ChevronRight, HardDrive,
    Download, Image, Music, Video, Home, Star, Trash2
} from 'lucide-react';

interface FileManagerProps {
    windowId: string;
}

interface FileItem {
    name: string;
    type: 'folder' | 'file';
    icon: React.ReactNode;
    color: string;
    action?: string;
}

const HOME_FILES: FileItem[] = [
    { name: 'Desktop', type: 'folder', icon: <FolderOpen />, color: '#3d8ef0' },
    { name: 'Documents', type: 'folder', icon: <FolderOpen />, color: '#3d8ef0' },
    { name: 'Downloads', type: 'folder', icon: <Download />, color: '#49aee6' },
    { name: 'Pictures', type: 'folder', icon: <Image />, color: '#bc77e0' },
    { name: 'Music', type: 'folder', icon: <Music />, color: '#ee5fa8' },
    { name: 'Videos', type: 'folder', icon: <Video />, color: '#f55353' },
    { name: 'Projects', type: 'folder', icon: <FolderOpen />, color: '#367bf0', action: 'projects' },
    { name: 'bio.txt', type: 'file', icon: <FileText />, color: '#888', action: 'about' },
    { name: 'skills.json', type: 'file', icon: <FileText />, color: '#2de98a' },
    { name: 'CV.pdf', type: 'file', icon: <FileText />, color: '#f55353', action: 'cv' },
];

const SIDEBAR_ITEMS = [
    { id: 'recent', label: 'Recent', icon: <Star size={16} /> },
    { id: 'home', label: 'Home', icon: <Home size={16} />, active: true },
    { id: 'desktop', label: 'Desktop', icon: <FolderOpen size={16} /> },
    { id: 'documents', label: 'Documents', icon: <FolderOpen size={16} /> },
    { id: 'downloads', label: 'Downloads', icon: <Download size={16} /> },
    { id: 'pictures', label: 'Pictures', icon: <Image size={16} /> },
    { id: 'trash', label: 'Trash', icon: <Trash2 size={16} /> },
];

const FileManager: React.FC<FileManagerProps> = () => {
    const { openWindow, addNotification } = useOSStore();
    const [currentPath] = useState('/home/lemin');

    const handleItemClick = (item: FileItem) => {
        if (item.action) {
            const config = APP_DEFAULTS[item.action];
            if (config) {
                openWindow(item.action, config.title, config.icon, config.size);
            }
        } else {
            addNotification({
                title: 'Files',
                body: `📁 ${item.name} — Come on bro… why are you so curious? 😄, ya5i tem 5ech chi yenik `,
            });
        }
    };

    return (
        <div className="file-manager">
            {/* Sidebar */}
            <div className="fm-sidebar">
                <div className="fm-sidebar-section">
                    <div className="fm-sidebar-title">Places</div>
                    {SIDEBAR_ITEMS.map(item => (
                        <button
                            key={item.id}
                            className={`fm-sidebar-item ${item.active ? 'active' : ''}`}
                            onClick={() => {
                                if (!item.active) {
                                    addNotification({
                                        title: 'Files',
                                        body: `You're already exploring the best place! 😉`,
                                    });
                                }
                            }}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                </div>
                <div className="fm-sidebar-section">
                    <div className="fm-sidebar-title">Devices</div>
                    <button className="fm-sidebar-item">
                        <HardDrive size={16} />
                        10000000 GB Disk
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="fm-content">
                {/* Toolbar */}
                <div className="fm-toolbar">
                    <button className="fm-toolbar-btn">
                        <ChevronLeft size={18} />
                    </button>
                    <button className="fm-toolbar-btn">
                        <ChevronRight size={18} />
                    </button>
                    <div className="fm-path">
                        <span>{currentPath}</span>
                    </div>
                </div>

                {/* File Grid */}
                <div className="fm-grid">
                    {HOME_FILES.map((item) => (
                        <div
                            key={item.name}
                            className="fm-item"
                            onDoubleClick={() => handleItemClick(item)}
                        >
                            <div style={{ color: item.color }}>
                                {React.cloneElement(item.icon as React.ReactElement, { size: 40 })}
                            </div>
                            <span className="fm-item-label">{item.name}</span>
                        </div>
                    ))}
                </div>

                {/* Status Bar */}
                <div className="fm-statusbar">
                    <span>{HOME_FILES.length} items</span>
                    <span>Free space: 234 GiB</span>
                </div>
            </div>
        </div>
    );
};

export default FileManager;
