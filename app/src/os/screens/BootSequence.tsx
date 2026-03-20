import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LOGS = [
    "Kali GNU/Linux Rolling kali tty1",
    "",
    ":: running early hook [udev]",
    "Starting systemd-udevd version 254.5-1",
    ":: running hook [udev]",
    ":: Triggering uevents...",
    "Elhamdullah for every thing",
    "[  OK  ] Started systemd-journald.service - Journal Service.",
    "[  OK  ] Created slice system-getty.slice - Slice /system/getty.",
    "[  OK  ] Created slice system-modprobe.slice - Slice /system/modprobe.",
    "[  OK  ] Started systemd-udevd.service - Rule-based Manager for Device Events.",
    "         Starting systemd-tmpfiles-setup-dev-early.service...",
    "[  OK  ] Finished systemd-tmpfiles-setup-dev-early.service.",
    "[  OK  ] Started systemd-networkd.service - Network Configuration.",
    "[  OK  ] Reached target network.target - Network.",
    "[  OK  ] Started systemd-resolved.service - Network Name Resolution.",
    "[  OK  ] Reached target network-online.target - Network is Online.",
    "[  OK  ] Started ModemManager.service - Modem Manager.",
    "[  OK  ] Started NetworkManager.service - Network Manager.",
    "[  OK  ] Started bluetooth.service - Bluetooth service.",
    "[  OK  ] Reached target bluetooth.target - Bluetooth Support.",
    "[  OK  ] Started polkit.service - Authorization Manager.",
    "[  OK  ] Started power-profiles-daemon.service - Power Profiles daemon.",
    "[  OK  ] Started udisks2.service - Disk Manager.",
    "[  OK  ] Started accounts-daemon.service - Accounts Service.",
    "[  OK  ] Started gdm.service - GNOME Display Manager.",
    "[  OK  ] Reached target graphical.target - Graphical Interface.",
    "         Starting GNOME Display Manager...",
];

interface BootSequenceProps {
    onComplete: () => void;
}

/** Render a single boot log line with correct TTY colors */
const BootLine: React.FC<{ log: string }> = ({ log }) => {
    if (log === '') {
        return <span>&nbsp;</span>;
    }
    if (log.startsWith('[  OK  ]')) {
        return (
            <>
                <span style={{ color: '#00cc44', fontWeight: 700 }}>[  OK  ]</span>
                <span style={{ color: '#c0c0c0' }}>{log.slice(8)}</span>
            </>
        );
    }
    if (log.startsWith('[FAILED]')) {
        return (
            <>
                <span style={{ color: '#f55353', fontWeight: 700 }}>[FAILED]</span>
                <span style={{ color: '#c0c0c0' }}>{log.slice(8)}</span>
            </>
        );
    }
    if (log.startsWith('::')) {
        return <span style={{ color: '#55b4d4' }}>{log}</span>;
    }
    if (log.startsWith('         Starting') || log.startsWith('         Mounted')) {
        return <span style={{ color: '#888' }}>{log}</span>;
    }
    // First line — hostname/version
    if (log.startsWith('Kali GNU')) {
        return <span style={{ color: '#d0d0d0', fontWeight: 600 }}>{log}</span>;
    }
    // personal message
    if (log === 'Elhamdullah for every thing') {
        return <span style={{ color: '#f5a623' }}>{log}</span>;
    }
    return <span style={{ color: '#aaa' }}>{log}</span>;
};

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
    const [logs, setLogs] = useState<string[]>([]);
    const [showLogo, setShowLogo] = useState(true);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const logoTimer = setTimeout(() => {
            setShowLogo(false);
        }, 1500);
        return () => clearTimeout(logoTimer);
    }, []);

    useEffect(() => {
        if (showLogo) return;

        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex >= BOOT_LOGS.length) {
                clearInterval(interval);
                setTimeout(onComplete, 2000);
                return;
            }
            setLogs(prev => [...prev, BOOT_LOGS[currentIndex]]);
            currentIndex++;
        }, 120);

        return () => clearInterval(interval);
    }, [showLogo, onComplete]);

    // Auto-scroll to bottom as lines appear
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'instant' });
    }, [logs]);

    return (
        <div className="boot-screen">
            <AnimatePresence mode="wait">
                {showLogo ? (
                    <motion.div
                        key="logo"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >
                        {/* Kali Logo */}
                        <svg
                            className="boot-logo"
                            viewBox="0 0 100 100"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="50" cy="50" r="45" stroke="#367bf0" strokeWidth="2" opacity="0.3" />
                            <circle cx="50" cy="50" r="35" stroke="#367bf0" strokeWidth="1.5" opacity="0.5" />
                            <text x="50" y="58" textAnchor="middle" fill="#367bf0" fontSize="32" fontWeight="bold" fontFamily="monospace">K</text>
                        </svg>
                        <div className="boot-spinner" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="logs"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        className="boot-logs"
                    >
                        {logs.map((log, i) => (
                            <div
                                key={i}
                                className="boot-log-line"
                            >
                                <BootLine log={log} />
                            </div>
                        ))}
                        {/* Blinking cursor at the end */}
                        <span className="cursor-blink" style={{ color: '#c0c0c0' }}>▊</span>
                        <div ref={bottomRef} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BootSequence;
