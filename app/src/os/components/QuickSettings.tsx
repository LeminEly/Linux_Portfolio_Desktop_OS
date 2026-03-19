import React from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '../../store/useOSStore';
import {
    Wifi, WifiOff, Bluetooth, BluetoothOff, Moon, Sun,
    Volume2, VolumeX, BellOff, Bell, Power, Settings,
    Monitor
} from 'lucide-react';

const QuickSettings: React.FC = () => {
    const {
        wifiEnabled, toggleWifi,
        bluetoothEnabled, toggleBluetooth,
        darkMode, toggleDarkMode,
        doNotDisturb, toggleDoNotDisturb,
        volume, setVolume,
        brightness, setBrightness,
        openWindow, toggleQuickSettings,
    } = useOSStore();

    return (
        <motion.div
            className="quick-settings"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
        >
            {/* Toggle Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                <button className={`qs-toggle ${wifiEnabled ? 'active' : ''}`} onClick={toggleWifi}>
                    {wifiEnabled ? <Wifi size={16} /> : <WifiOff size={16} />}
                    <span>Wi-Fi</span>
                </button>
                <button className={`qs-toggle ${bluetoothEnabled ? 'active' : ''}`} onClick={toggleBluetooth}>
                    {bluetoothEnabled ? <Bluetooth size={16} /> : <BluetoothOff size={16} />}
                    <span>Bluetooth</span>
                </button>
                <button className={`qs-toggle ${darkMode ? 'active' : ''}`} onClick={toggleDarkMode}>
                    {darkMode ? <Moon size={16} /> : <Sun size={16} />}
                    <span>Dark Mode</span>
                </button>
                <button className={`qs-toggle ${doNotDisturb ? 'active' : ''}`} onClick={toggleDoNotDisturb}>
                    {doNotDisturb ? <BellOff size={16} /> : <Bell size={16} />}
                    <span>Do Not Disturb</span>
                </button>
            </div>

            {/* Sliders */}
            <div style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    {volume > 0 ? <Volume2 size={16} style={{ color: 'var(--text-secondary)' }} /> : <VolumeX size={16} style={{ color: 'var(--text-secondary)' }} />}
                    <input
                        type="range"
                        className="qs-slider"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Monitor size={16} style={{ color: 'var(--text-secondary)' }} />
                    <input
                        type="range"
                        className="qs-slider"
                        min="20"
                        max="100"
                        value={brightness}
                        onChange={(e) => setBrightness(Number(e.target.value))}
                    />
                </div>
            </div>

            {/* Bottom Actions */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: 12,
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                }}
            >
                <button
                    className="qs-toggle"
                    style={{ flex: 1, justifyContent: 'center' }}
                    onClick={() => {
                        openWindow('settings', 'Settings', 'settings', { width: 750, height: 500 });
                        toggleQuickSettings();
                    }}
                >
                    <Settings size={16} />
                    <span>Settings</span>
                </button>
                <button
                    className="qs-toggle"
                    style={{ flex: 1, justifyContent: 'center', marginLeft: 8 }}
                    onClick={() => {
                        useOSStore.getState().setPhase('login');
                        toggleQuickSettings();
                    }}
                >
                    <Power size={16} />
                    <span>Lock / Log Out</span>
                </button>
            </div>
        </motion.div>
    );
};

export default QuickSettings;
