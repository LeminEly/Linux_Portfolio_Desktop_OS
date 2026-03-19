// ===== OS Types =====

export type OSPhase = 'boot' | 'login' | 'desktop';

export interface WindowState {
    id: string;
    appId: string;
    title: string;
    icon: string;
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    isFocused: boolean;
    zIndex: number;
    position: { x: number; y: number };
    size: { width: number; height: number };
}

export interface DesktopIcon {
    id: string;
    label: string;
    icon: string;
    appId: string;
    position: { row: number; col: number };
}

export interface Notification {
    id: string;
    title: string;
    body: string;
    icon?: string;
    timestamp: Date;
    read: boolean;
}

export interface AppConfig {
    id: string;
    title: string;
    icon: string;
    category: 'system' | 'utilities' | 'development' | 'internet' | 'office';
    component: string;
    defaultSize: { width: number; height: number };
}

// ===== Profile / Content Types =====

export interface Profile {
    name: string;
    username: string;
    hostname: string;
    title: string;
    email: string;
    github: string;
    linkedin: string;
    bio: string;
    location: string;
    avatar: string;
    cv: string;
}

export interface Skill {
    category: string;
    icon: string;
    items: SkillItem[];
}

export interface SkillItem {
    name: string;
    level: number; // 0-100
}

export interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    type: 'Academic' | 'Professional' | 'Personal' | 'Security' | 'Open Source' | 'Competition';
    company?: string;
    duration?: string;
    github?: string;
    live?: string;
    image?: string;
}

export interface TimelineItem {
    year: string;
    title: string;
    subtitle: string;
    description: string;
    type: 'education' | 'work' | 'achievement';
}
