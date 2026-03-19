import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PROFILE } from '../../data/content';

interface LoginScreenProps {
    onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [time, setTime] = useState(new Date());
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Show password input after a click/keypress on the initial screen
    useEffect(() => {
        const reveal = () => setShowPassword(true);
        if (!showPassword) {
            window.addEventListener('click', reveal);
            window.addEventListener('keydown', reveal);
            return () => {
                window.removeEventListener('click', reveal);
                window.removeEventListener('keydown', reveal);
            };
        }
    }, [showPassword]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            onLogin();
        }, 1200);
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="login-screen">
            {/* Blurred wallpaper background */}
            <div
                className="login-bg"
                style={{
                    backgroundImage: `url('/wallpapers/login-bg.svg')`,
                    backgroundColor: '#1a1a2e',
                }}
            />
            <div className="login-overlay" />

            {/* Time display at top */}
            <motion.div
                className="login-time"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="login-time-clock">{formatTime(time)}</div>
                <div className="login-time-date">{formatDate(time)}</div>
            </motion.div>

            {/* Login Card */}
            <motion.div
                className="login-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                {/* Avatar */}
                <div className="login-avatar">
                    <img
                        src={PROFILE.avatar}
                        alt={PROFILE.name}
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).parentElement!.innerHTML = `<span style="font-size: 40px; color: white;">${PROFILE.name.charAt(0)}</span>`;
                        }}
                    />
                </div>

                {/* Name */}
                <div className="login-name">{PROFILE.name}</div>

                {/* Password form */}
                {showPassword && (
                    <motion.form
                        onSubmit={handleLogin}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="login-input-wrap">
                            <input
                                type="password"
                                className="login-input"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoFocus
                            />
                            <button type="submit" className="login-submit" disabled={loading}>
                                {loading ? (
                                    <div
                                        style={{
                                            width: 16,
                                            height: 16,
                                            border: '2px solid rgba(255,255,255,0.3)',
                                            borderTop: '2px solid white',
                                            borderRadius: '50%',
                                            animation: 'spin 0.8s linear infinite',
                                        }}
                                    />
                                ) : (
                                    <ArrowRight size={18} />
                                )}
                            </button>
                        </div>
                    </motion.form>
                )}

                {!showPassword && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 12 }}
                    >
                        Click or press any key to unlock
                    </motion.div>
                )}

                <div className="login-session">Session: GNOME</div>
            </motion.div>
        </div>
    );
};

export default LoginScreen;
