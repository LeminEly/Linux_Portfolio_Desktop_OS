import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import {
    Terminal as TerminalIcon,
    FolderOpen,
    Globe,
    User,
    Cpu,
    Mail,
    FileText,
    Settings as SettingsIcon,
    X, Minus, Maximize2, Minimize2
} from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';
import 'react-resizable/css/styles.css';

// Apps
import TerminalApp from '../apps/Terminal.tsx';
import FileManager from '../apps/FileManager.tsx';
import AboutApp from '../apps/About.tsx';
import ProjectsApp from '../apps/Projects.tsx';
import SkillsApp from '../apps/Skills.tsx';
import ContactApp from '../apps/Contact.tsx';
import BrowserApp from '../apps/Browser.tsx';
import SettingsApp from '../apps/Settings.tsx';
import CVViewer from '../apps/CVViewer.tsx';

const AppRegistry: Record<string, React.FC<{ windowId: string }>> = {
    terminal: TerminalApp,
    filemanager: FileManager,
    about: AboutApp,
    projects: ProjectsApp,
    skills: SkillsApp,
    contact: ContactApp,
    browser: BrowserApp,
    settings: SettingsApp,
    cv: CVViewer,
};

const WindowManager: React.FC = () => {
    const { windows, closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateWindowPosition, updateWindowSize } = useOSStore();

    return (
        <>
            {windows.map(win => (
                <WindowFrame
                    key={win.id}
                    window={win}
                    onClose={() => closeWindow(win.id)}
                    onMinimize={() => minimizeWindow(win.id)}
                    onMaximize={() => maximizeWindow(win.id)}
                    onFocus={() => focusWindow(win.id)}
                    onDrag={(x, y) => updateWindowPosition(win.id, { x, y })}
                    onResize={(w, h) => updateWindowSize(win.id, { width: w, height: h })}
                />
            ))}
        </>
    );
};

interface WindowFrameProps {
    window: {
        id: string;
        appId: string;
        title: string;
        isFocused: boolean;
        isMinimized: boolean;
        isMaximized: boolean;
        zIndex: number;
        position: { x: number; y: number };
        size: { width: number; height: number };
    };
    onClose: () => void;
    onMinimize: () => void;
    onMaximize: () => void;
    onFocus: () => void;
    onDrag: (x: number, y: number) => void;
    onResize: (width: number, height: number) => void;
}

const getAppIcon = (appId: string) => {
    switch (appId) {
        case 'terminal': return <TerminalIcon size={16} style={{ color: 'var(--kali-blue)' }} />;
        case 'filemanager': return <FolderOpen size={16} style={{ color: 'var(--kali-blue)' }} />;
        case 'about': return <User size={16} style={{ color: 'var(--kali-cyan)' }} />;
        case 'projects': return <Globe size={16} style={{ color: 'var(--kali-green)' }} />;
        case 'skills': return <Cpu size={16} style={{ color: 'var(--kali-yellow)' }} />;
        case 'contact': return <Mail size={16} style={{ color: 'var(--kali-red)' }} />;
        case 'browser': return <Globe size={16} style={{ color: 'var(--kali-blue)' }} />;
        case 'settings': return <SettingsIcon size={16} style={{ color: '#888' }} />;
        case 'cv': return <FileText size={16} style={{ color: 'var(--kali-red)' }} />;
        default: return <TerminalIcon size={16} />;
    }
};

const WindowFrame: React.FC<WindowFrameProps> = ({
    window: win,
    onClose,
    onMinimize,
    onMaximize,
    onFocus,
    onDrag,
    onResize,
}) => {
    const nodeRef = useRef<HTMLDivElement>(null);
    const AppComponent = AppRegistry[win.appId];

    if (!AppComponent) return null;
    if (win.isMinimized) return null;

    const frameClasses = [
        'window-frame',
        win.isFocused ? 'focused' : '',
        win.isMaximized ? 'maximized' : '',
    ].filter(Boolean).join(' ');

    const titleContent = (
        <div
            className="window-title-container"
            style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}
        >
            {getAppIcon(win.appId)}
            <span className="window-title">{win.title}</span>
        </div>
    );

    const controlsContent = (
        <div className="window-controls" onMouseDown={(e) => e.stopPropagation()}>
            <button className="window-control-btn" onClick={onMinimize}>
                <Minus size={14} />
            </button>
            <button className="window-control-btn" onClick={onMaximize}>
                {win.isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
            <button className="window-control-btn close" onClick={onClose}>
                <X size={14} />
            </button>
        </div>
    );

    if (win.isMaximized) {
        return (
            <div
                style={{
                    position: 'fixed',
                    top: 32,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: win.zIndex,
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'var(--gnome-window-bg)',
                }}
                onClick={(e) => { e.stopPropagation(); onFocus(); }}
            >
                <div
                    className="window-titlebar"
                    style={{
                        background: win.isFocused ? 'var(--gnome-window-header-active)' : 'var(--gnome-window-header)',
                    }}
                    onDoubleClick={onMaximize}
                >
                    {titleContent}
                    {controlsContent}
                </div>
                <div className="window-content" style={{ flex: 1, overflow: 'hidden' }}>
                    <AppComponent windowId={win.id} />
                </div>
            </div>
        );
    }

    return (
        <Draggable
            handle=".window-titlebar"
            nodeRef={nodeRef}
            position={win.position}
            onStart={() => onFocus()}
            onStop={(_, data) => onDrag(data.x, data.y)}
        >
            <div
                ref={nodeRef}
                style={{
                    position: 'absolute',
                    zIndex: win.zIndex,
                    top: 0,
                    left: 0,
                }}
                onClick={(e) => { e.stopPropagation(); onFocus(); }}
            >
                <ResizableBox
                    width={win.size.width}
                    height={win.size.height}
                    minConstraints={[350, 250]}
                    maxConstraints={[window.innerWidth - 50, window.innerHeight - 80]}
                    onResize={(_, { size }) => onResize(size.width, size.height)}
                    resizeHandles={['se', 'e', 's']}
                    handle={
                        <span
                            className="react-resizable-handle react-resizable-handle-se"
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                width: 16,
                                height: 16,
                                cursor: 'se-resize',
                                zIndex: 50,
                            }}
                        />
                    }
                >
                    <div
                        className={frameClasses}
                        style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                        <div className="window-titlebar" onDoubleClick={onMaximize}>
                            {titleContent}
                            {controlsContent}
                        </div>
                        <div className="window-content" style={{ flex: 1, overflow: 'hidden' }}>
                            <AppComponent windowId={win.id} />
                        </div>
                    </div>
                </ResizableBox>
            </div>
        </Draggable>
    );
};

export default WindowManager;
