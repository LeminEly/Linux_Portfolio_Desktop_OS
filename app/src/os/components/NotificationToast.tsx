import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '../../store/useOSStore';
import { X, Info } from 'lucide-react';

const NotificationToast: React.FC = () => {
    const { notifications, clearNotifications } = useOSStore();
    const [visible, setVisible] = useState<string | null>(null);

    useEffect(() => {
        if (notifications.length > 0 && !notifications[0].read) {
            setVisible(notifications[0].id);
            const timer = setTimeout(() => {
                setVisible(null);
                useOSStore.getState().markNotificationRead(notifications[0].id);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [notifications]);

    const latest = notifications.find(n => n.id === visible);
    if (!latest) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="toast"
                initial={{ opacity: 0, y: -20, x: 0 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="toast-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Info size={16} style={{ color: 'var(--kali-blue)' }} />
                        <span className="toast-title">{latest.title}</span>
                    </div>
                    <button className="toast-close" onClick={() => setVisible(null)}>
                        <X size={14} />
                    </button>
                </div>
                <div className="toast-body">{latest.body}</div>
            </motion.div>
        </AnimatePresence>
    );
};

export default NotificationToast;
