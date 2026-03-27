import React, { useState, useEffect } from 'react';
import { useOSStore } from '../../store/useOSStore';
import { Wifi, WifiOff, Volume2, VolumeX, Battery, ChevronDown } from 'lucide-react';

const TopBar: React.FC = () => {
    const [time, setTime] = useState(new Date());
    const {
        toggleActivities, toggleQuickSettings, showQuickSettings,
        wifiEnabled, volume, activeWindowId, windows
    } = useOSStore();

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const activeWindow = windows.find(w => w.id === activeWindowId && !w.isMinimized);

    const formatTime = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        }) + '  ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    return (
        <div className="top-bar" onClick={(e) => e.stopPropagation()}>
            {/* Left — Activities */}
            <div className="top-bar-left">
                <button className="top-bar-btn" onClick={toggleActivities}>
                    Apps
                </button>
                <button className="top-bar-btn">
                    Places
                </button>
                {activeWindow && (
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)', marginLeft: 8, opacity: 0.8 }}>
                        {activeWindow.title}
                    </span>
                )}
            </div>

            {/* Center — Clock */}
            <div className="top-bar-center" onClick={toggleQuickSettings}>
                <span>{formatTime(time)}</span>
            </div>

            {/* Right — System Tray */}
            <div className="top-bar-right">
                <button
                    className={`top-bar-btn ${showQuickSettings ? 'active' : ''}`}
                    onClick={(e) => { e.stopPropagation(); toggleQuickSettings(); }}
                >
                    {wifiEnabled ? <Wifi size={14} /> : <WifiOff size={14} />}
                    {volume > 0 ? <Volume2 size={14} /> : <VolumeX size={14} />}
                    <Battery size={14} />
                    <ChevronDown size={12} />
                </button>
            </div>
        </div>
    );
};

export default TopBar;
