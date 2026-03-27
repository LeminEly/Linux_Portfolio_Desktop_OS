import { create } from 'zustand';
import type { OSPhase, WindowState, Notification } from '../types';

export interface TerminalEntry {
    type: 'input' | 'output';
    content: string;
}

interface OSStore {
    // OS Phase
    phase: OSPhase;
    setPhase: (phase: OSPhase) => void;

    // Windows
    windows: WindowState[];
    nextZIndex: number;
    activeWindowId: string | null;

    openWindow: (appId: string, title: string, icon: string, defaultSize?: { width: number; height: number }) => void;
    closeWindow: (id: string) => void;
    minimizeWindow: (id: string) => void;
    maximizeWindow: (id: string) => void;
    restoreWindow: (id: string) => void;
    focusWindow: (id: string) => void;
    updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
    updateWindowSize: (id: string, size: { width: number; height: number }) => void;

    // Desktop
    wallpaperIndex: number;
    setWallpaperIndex: (index: number) => void;
    cycleWallpaper: (total: number) => void;

    // Notifications
    notifications: Notification[];
    addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
    markNotificationRead: (id: string) => void;
    clearNotifications: () => void;

    // Quick Settings
    showQuickSettings: boolean;
    toggleQuickSettings: () => void;
    volume: number;
    setVolume: (v: number) => void;
    brightness: number;
    setBrightness: (b: number) => void;
    wifiEnabled: boolean;
    toggleWifi: () => void;
    bluetoothEnabled: boolean;
    toggleBluetooth: () => void;
    darkMode: boolean;
    toggleDarkMode: () => void;
    doNotDisturb: boolean;
    toggleDoNotDisturb: () => void;

    // Activities Overview
    showActivities: boolean;
    toggleActivities: () => void;

    // App Menu
    showAppGrid: boolean;
    toggleAppGrid: () => void;

    // Matrix Rain
    showMatrix: boolean;
    toggleMatrix: (val?: boolean) => void;

    // Sound
    soundEnabled: boolean;
    toggleSound: () => void;

    // Terminal persistence
    terminalHistory: TerminalEntry[];
    terminalCommandHistory: string[];
    setTerminalHistory: (history: TerminalEntry[]) => void;
    appendTerminalHistory: (entries: TerminalEntry[]) => void;
    clearTerminalHistory: () => void;
    setTerminalCommandHistory: (history: string[]) => void;

    // BSOD
    showBSOD: boolean;
    triggerBSOD: () => void;
    dismissBSOD: () => void;
}

export const useOSStore = create<OSStore>((set, get) => ({
    // OS Phase
    phase: 'boot',
    setPhase: (phase) => set({ phase }),

    // Windows
    windows: [],
    nextZIndex: 10,
    activeWindowId: null,

    openWindow: (appId, title, icon, defaultSize) => {
        const { windows, nextZIndex } = get();
        const existing = windows.find(w => w.appId === appId);

        if (existing) {
            if (existing.isMinimized) {
                set({
                    windows: windows.map(w =>
                        w.id === existing.id
                            ? { ...w, isMinimized: false, isFocused: true, zIndex: nextZIndex }
                            : { ...w, isFocused: false }
                    ),
                    nextZIndex: nextZIndex + 1,
                    activeWindowId: existing.id,
                });
            } else {
                get().focusWindow(existing.id);
            }
            return;
        }

        const id = `${appId}-${Date.now()}`;
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const w = defaultSize?.width || Math.min(900, screenW - 100);
        const h = defaultSize?.height || Math.min(600, screenH - 150);

        const newWindow: WindowState = {
            id,
            appId,
            title,
            icon,
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            isFocused: true,
            zIndex: nextZIndex,
            position: {
                x: Math.max(50, (screenW - w) / 2 + (windows.length * 30) % 200),
                y: Math.max(40, (screenH - h) / 2 + (windows.length * 30) % 150),
            },
            size: { width: w, height: h },
        };

        set({
            windows: [...windows.map(w => ({ ...w, isFocused: false })), newWindow],
            nextZIndex: nextZIndex + 1,
            activeWindowId: id,
        });
    },

    closeWindow: (id) => {
        const { windows } = get();
        const remaining = windows.filter(w => w.id !== id);
        const topWindow = remaining.length > 0
            ? remaining.reduce((a, b) => a.zIndex > b.zIndex ? a : b)
            : null;

        set({
            windows: remaining.map(w => ({ ...w, isFocused: w.id === topWindow?.id })),
            activeWindowId: topWindow?.id || null,
        });
    },

    minimizeWindow: (id) => {
        const { windows } = get();
        const remaining = windows.filter(w => w.id !== id && !w.isMinimized);
        const topWindow = remaining.length > 0
            ? remaining.reduce((a, b) => a.zIndex > b.zIndex ? a : b)
            : null;

        set({
            windows: windows.map(w =>
                w.id === id
                    ? { ...w, isMinimized: true, isFocused: false }
                    : { ...w, isFocused: w.id === topWindow?.id }
            ),
            activeWindowId: topWindow?.id || null,
        });
    },

    maximizeWindow: (id) => {
        set({
            windows: get().windows.map(w =>
                w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
            ),
        });
    },

    restoreWindow: (id) => {
        const { windows, nextZIndex } = get();
        set({
            windows: windows.map(w =>
                w.id === id
                    ? { ...w, isMinimized: false, isFocused: true, zIndex: nextZIndex }
                    : { ...w, isFocused: false }
            ),
            nextZIndex: nextZIndex + 1,
            activeWindowId: id,
        });
    },

    focusWindow: (id) => {
        const { nextZIndex } = get();
        set({
            windows: get().windows.map(w => ({
                ...w,
                isFocused: w.id === id,
                zIndex: w.id === id ? nextZIndex : w.zIndex,
            })),
            nextZIndex: nextZIndex + 1,
            activeWindowId: id,
        });
    },

    updateWindowPosition: (id, position) => {
        set({
            windows: get().windows.map(w => w.id === id ? { ...w, position } : w),
        });
    },

    updateWindowSize: (id, size) => {
        set({
            windows: get().windows.map(w => w.id === id ? { ...w, size } : w),
        });
    },

    // Desktop
    wallpaperIndex: 0,
    setWallpaperIndex: (index) => set({ wallpaperIndex: index }),
    cycleWallpaper: (total) => set({ wallpaperIndex: (get().wallpaperIndex + 1) % total }),

    // Notifications
    notifications: [],
    addNotification: (notification) => {
        const id = `notif-${Date.now()}`;
        set({
            notifications: [
                { ...notification, id, timestamp: new Date(), read: false },
                ...get().notifications,
            ],
        });
    },
    markNotificationRead: (id) => {
        set({
            notifications: get().notifications.map(n =>
                n.id === id ? { ...n, read: true } : n
            ),
        });
    },
    clearNotifications: () => set({ notifications: [] }),

    // Quick Settings
    showQuickSettings: false,
    toggleQuickSettings: () => set({ showQuickSettings: !get().showQuickSettings, showActivities: false, showAppGrid: false }),
    volume: 75,
    setVolume: (v) => set({ volume: v }),
    brightness: 100,
    setBrightness: (b) => set({ brightness: b }),
    wifiEnabled: true,
    toggleWifi: () => set({ wifiEnabled: !get().wifiEnabled }),
    bluetoothEnabled: false,
    toggleBluetooth: () => set({ bluetoothEnabled: !get().bluetoothEnabled }),
    darkMode: true,
    toggleDarkMode: () => set({ darkMode: !get().darkMode }),
    doNotDisturb: false,
    toggleDoNotDisturb: () => set({ doNotDisturb: !get().doNotDisturb }),

    // Activities
    showActivities: false,
    toggleActivities: () => set({ showActivities: !get().showActivities, showQuickSettings: false, showAppGrid: false }),

    // App Grid
    showAppGrid: false,
    toggleAppGrid: () => set({ showAppGrid: !get().showAppGrid, showActivities: false, showQuickSettings: false }),

    // Matrix Rain
    showMatrix: false,
    toggleMatrix: (val) => set({ showMatrix: val !== undefined ? val : !get().showMatrix }),

    // Sound
    soundEnabled: true,
    toggleSound: () => set({ soundEnabled: !get().soundEnabled }),

    // Terminal persistence
    terminalHistory: [],
    terminalCommandHistory: [],
    setTerminalHistory: (history) => set({ terminalHistory: history }),
    appendTerminalHistory: (entries) => set({ terminalHistory: [...get().terminalHistory, ...entries] }),
    clearTerminalHistory: () => set({ terminalHistory: [] }),
    setTerminalCommandHistory: (history) => set({ terminalCommandHistory: history }),

    // BSOD
    showBSOD: false,
    triggerBSOD: () => set({ showBSOD: true }),
    dismissBSOD: () => set({ showBSOD: false }),
}));
