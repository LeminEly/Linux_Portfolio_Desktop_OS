import React from 'react';
import { useOSStore } from '../../store/useOSStore';
import {
    Monitor, Palette, Bell, Wifi, Shield, Info,
    ChevronRight
} from 'lucide-react';
import { PROFILE } from '../../data/content';

interface SettingsAppProps {
    windowId: string;
}

const SETTINGS_SECTIONS = [
    { id: 'wifi', label: 'Wi-Fi', icon: <Wifi size={18} />, description: 'Connected to KaliNet' },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} />, description: 'On' },
    { id: 'appearance', label: 'Appearance', icon: <Palette size={18} />, description: 'Dark' },
    { id: 'displays', label: 'Displays', icon: <Monitor size={18} />, description: `${window.innerWidth}×${window.innerHeight}` },
    { id: 'privacy', label: 'Privacy & Security', icon: <Shield size={18} />, description: 'Screen Lock On' },
    { id: 'about', label: 'About', icon: <Info size={18} />, description: 'Kali GNU/Linux' },
];

const SettingsApp: React.FC<SettingsAppProps> = () => {
    const { darkMode, toggleDarkMode, wifiEnabled, toggleWifi } = useOSStore();
    const [activeSection, setActiveSection] = React.useState('about');

    return (
        <div style={{
            height: '100%',
            display: 'flex',
            background: 'var(--gnome-window-bg)',
            fontFamily: 'var(--font-sans)',
        }}>
            {/* Sidebar */}
            <div style={{
                width: 240,
                background: 'rgba(0,0,0,0.1)',
                borderRight: '1px solid rgba(255,255,255,0.04)',
                padding: 12,
                overflow: 'auto',
                flexShrink: 0,
            }}>
                {/* User */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 10px',
                    marginBottom: 8,
                    borderRadius: 'var(--radius-button)',
                    background: 'rgba(255,255,255,0.03)',
                }}>
                    <div style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--kali-blue), var(--kali-purple))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 700,
                    }}>
                        {PROFILE.name.charAt(0)}
                    </div>
                    <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{PROFILE.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{PROFILE.username}</div>
                    </div>
                </div>

                {SETTINGS_SECTIONS.map(section => (
                    <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            width: '100%',
                            padding: '10px 10px',
                            border: 'none',
                            background: activeSection === section.id ? 'rgba(255,255,255,0.08)' : 'none',
                            borderRadius: 'var(--radius-button)',
                            color: activeSection === section.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                            fontSize: 13,
                            cursor: 'pointer',
                            textAlign: 'left',
                            fontFamily: 'var(--font-sans)',
                            transition: 'background 0.15s',
                            marginBottom: 2,
                        }}
                    >
                        <span style={{ opacity: 0.7 }}>{section.icon}</span>
                        <span style={{ flex: 1 }}>{section.label}</span>
                        <ChevronRight size={14} style={{ opacity: 0.3 }} />
                    </button>
                ))}
            </div>

            {/* Content */}
            <div style={{
                flex: 1,
                padding: 32,
                overflow: 'auto',
            }}>
                {activeSection === 'about' && (
                    <>
                        <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 24, color: 'var(--text-primary)' }}>
                            About
                        </h2>

                        <div style={{
                            background: 'rgba(0,0,0,0.1)',
                            borderRadius: 'var(--radius-window)',
                            border: '1px solid rgba(255,255,255,0.04)',
                            overflow: 'hidden',
                        }}>
                            {[
                                ['Device Name', `${PROFILE.hostname}`],
                                ['Operating System', 'Kali GNU/Linux Rolling'],
                                ['OS Type', '64-bit'],
                                ['GNOME Version', '45.2'],
                                ['Windowing System', 'Wayland'],
                                ['Hardware Model', 'Portfolio Desktop OS v1.0'],
                                ['Disk Capacity', '100000000.0 GB'],
                                ['Processor', 'Intel® Core™ i7-12700H'],
                                ['Graphics', 'NVIDIA GeForce RTX 3060'],
                                ['Memory', '16.0 GiB'],
                            ].map(([label, value], i) => (
                                <div
                                    key={label}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: '12px 16px',
                                        borderBottom: i < 9 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                                    }}
                                >
                                    <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{label}</span>
                                    <span style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>{value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Kali Logo */}
                        <div style={{
                            textAlign: 'center',
                            marginTop: 32,
                            padding: 24,
                            opacity: 0.4,
                        }}>
                            <div style={{ fontSize: 48, marginBottom: 8 }}>🐉</div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--kali-blue)' }}>Kali Linux</div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>The most advanced penetration testing distribution</div>
                        </div>
                    </>
                )}

                {activeSection === 'appearance' && (
                    <>
                        <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 24, color: 'var(--text-primary)' }}>
                            Appearance
                        </h2>
                        <div style={{
                            background: 'rgba(0,0,0,0.1)',
                            borderRadius: 'var(--radius-window)',
                            padding: '16px 20px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>Dark Mode</div>
                                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Use a dark theme for all apps</div>
                            </div>
                            <button
                                onClick={toggleDarkMode}
                                style={{
                                    background: darkMode ? 'var(--kali-blue)' : '#444',
                                    border: 'none', width: 44, height: 24, borderRadius: 12,
                                    position: 'relative', cursor: 'pointer', transition: 'all 0.3s'
                                }}
                            >
                                <div style={{
                                    position: 'absolute', top: 3, left: darkMode ? 23 : 3,
                                    width: 18, height: 18, borderRadius: '50%', background: 'white',
                                    transition: 'all 0.3s'
                                }} />
                            </button>
                        </div>
                    </>
                )}

                {activeSection === 'wifi' && (
                    <>
                        <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 24, color: 'var(--text-primary)' }}>
                            Wi-Fi
                        </h2>
                        <div style={{
                            background: 'rgba(0,0,0,0.1)',
                            borderRadius: 'var(--radius-window)',
                            padding: '16px 20px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>Wi-Fi Enabled</div>
                                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{wifiEnabled ? 'Connected to KaliNet' : 'Disconnected'}</div>
                            </div>
                            <button
                                onClick={toggleWifi}
                                style={{
                                    background: wifiEnabled ? 'var(--kali-blue)' : '#444',
                                    border: 'none', width: 44, height: 24, borderRadius: 12,
                                    position: 'relative', cursor: 'pointer', transition: 'all 0.3s'
                                }}
                            >
                                <div style={{
                                    position: 'absolute', top: 3, left: wifiEnabled ? 23 : 3,
                                    width: 18, height: 18, borderRadius: '50%', background: 'white',
                                    transition: 'all 0.3s'
                                }} />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SettingsApp;
