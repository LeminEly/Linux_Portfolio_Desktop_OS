import React, { useState, useEffect, useRef } from 'react';
import { PROFILE, SKILLS, PROJECTS, NEOFETCH_ART, TERMINAL_WELCOME } from '../../data/content';
import { useOSStore } from '../../store/useOSStore';
import { parseAnsi } from '../../utils/ansi';

interface TerminalAppProps {
    windowId: string;
}

const TerminalApp: React.FC<TerminalAppProps> = () => {
    const [history, setHistory] = useState<Array<{ type: 'input' | 'output'; content: string }>>([
        { type: 'output', content: TERMINAL_WELCOME }
    ]);
    const [input, setInput] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const processCommand = (cmd: string) => {
        const trimmed = cmd.trim().toLowerCase();
        let output = '';

        switch (trimmed) {
            case 'help':
                output = `
Available commands:
  help          Show this help message
  clear         Clear terminal
  neofetch      System info
  whoami        Current user
  hostname      Machine hostname
  uname -a      Kernel info
  ls            List directory
  cat <file>    Read file (try: cat bio.txt, cat skills.json)
  skills        List technical skills
  projects      List projects
  contact       Contact information
  date          Current date and time
  uptime        System uptime
  pwd           Print working directory
  history       Command history
  sudo rm -rf / Don't even think about it
  exit          Close terminal`;
                break;

            case 'clear':
                setHistory([]);
                setInput('');
                return;

            case 'whoami':
                output = PROFILE.username;
                break;

            case 'hostname':
                output = PROFILE.hostname;
                break;

            case 'uname -a':
                output = `Linux ${PROFILE.hostname} 6.5.0-kali3-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.5.6-1kali1 (2024-01-30) x86_64 GNU/Linux`;
                break;

            case 'pwd':
                output = `/home/${PROFILE.username}`;
                break;

            case 'matrix':
                useOSStore.getState().toggleMatrix();
                output = 'Wake up, Neo...';
                break;

            case 'date':
                output = new Date().toString();
                break;

            case 'uptime':
                output = ` ${new Date().toLocaleTimeString()} up ∞ days, 0 users, load average: 0.42, 0.38, 0.35`;
                break;

            case 'neofetch':
                output = NEOFETCH_ART;
                break;

            case 'ls':
                output = `\x1b[34mDesktop\x1b[0m  \x1b[34mDocuments\x1b[0m  \x1b[34mDownloads\x1b[0m  \x1b[34mPictures\x1b[0m  bio.txt  skills.json  projects/  .bashrc  .zshrc`;
                break;

            case 'ls -la':
                output = `total 48
drwxr-xr-x  8 ${PROFILE.username} ${PROFILE.username} 4096 Mar 19 04:36 .
drwxr-xr-x  3 root  root  4096 Jan 15 10:00 ..
-rw-------  1 ${PROFILE.username} ${PROFILE.username}  234 Mar 19 04:36 .bash_history
-rw-r--r--  1 ${PROFILE.username} ${PROFILE.username}  220 Jan 15 10:00 .bashrc
drwxr-xr-x  2 ${PROFILE.username} ${PROFILE.username} 4096 Mar 18 22:10 Desktop
drwxr-xr-x  3 ${PROFILE.username} ${PROFILE.username} 4096 Mar 15 14:30 Documents
drwxr-xr-x  2 ${PROFILE.username} ${PROFILE.username} 4096 Mar 17 09:15 Downloads
drwxr-xr-x  2 ${PROFILE.username} ${PROFILE.username} 4096 Mar 10 18:45 Pictures
-rw-r--r--  1 ${PROFILE.username} ${PROFILE.username}  512 Mar 19 04:00 bio.txt
drwxr-xr-x  6 ${PROFILE.username} ${PROFILE.username} 4096 Mar 18 20:00 projects
-rw-r--r--  1 ${PROFILE.username} ${PROFILE.username} 1024 Mar 19 03:50 skills.json`;
                break;

            case 'skills':
                output = ' Technical Skills\n' + '─'.repeat(40) + '\n';
                SKILLS.forEach(category => {
                    output += `\n⚡ ${category.category}:\n`;
                    category.items.forEach(skill => {
                        const bar = '█'.repeat(Math.floor(skill.level / 5)) + '░'.repeat(20 - Math.floor(skill.level / 5));
                        output += `  ${skill.name.padEnd(22)} ${bar} ${skill.level}%\n`;
                    });
                });
                break;

            case 'projects':
                output = ' Projects\n' + '─'.repeat(40) + '\n';
                PROJECTS.forEach((project, i) => {
                    output += `\n${i + 1}. ${project.title}`;
                    output += `\n   Type: ${project.type}`;
                    output += `\n   Stack: ${project.tags.join(', ')}`;
                    if (project.github) output += `\n   GitHub: ${project.github}`;
                    output += '\n';
                });
                break;

            case 'contact':
                output = `
📬 Contact Information
─────────────────────────────
  📧 Email:    ${PROFILE.email}
  🐙 GitHub:   ${PROFILE.github}
  💼 LinkedIn: ${PROFILE.linkedin}
  📍 Location: ${PROFILE.location}
─────────────────────────────
Feel free to reach out!`;
                break;

            case 'cat bio.txt':
                output = `
╔══════════════════════════════════════╗
║           About ${PROFILE.name}
╠══════════════════════════════════════╣
║  Title: ${PROFILE.title}
║  Location: ${PROFILE.location}
║
║  ${PROFILE.bio}
╚══════════════════════════════════════╝`;
                break;

            case 'cat skills.json':
                output = JSON.stringify(
                    SKILLS.map(s => ({ category: s.category, skills: s.items.map(i => i.name) })),
                    null,
                    2
                );
                break;

            case 'history':
                output = commandHistory.map((cmd, i) => `  ${(i + 1).toString().padStart(4)}  ${cmd}`).join('\n');
                break;

            case 'sudo rm -rf /':
            case 'sudo rm -rf / --no-preserve-root':
                output = `hhhh Nice try! But this is a read-only portfolio filesystem.
No files were harmed in the making of this portfolio. 😄,
en plus 5ali 3ank lba6ch , 4e no3 ma yengba8li😄😄😄`;
                break;

            case 'exit':
                useOSStore.getState().closeWindow(
                    useOSStore.getState().windows.find(w => w.appId === 'terminal')?.id || ''
                );
                return;

            case '':
                break;

            default:
                if (trimmed.startsWith('cat ')) {
                    const file = trimmed.split(' ')[1];
                    output = `cat: ${file}: No such file or directory`;
                } else if (trimmed.startsWith('cd ')) {
                    output = `bash: cd: ${trimmed.split(' ')[1]}: Permission denied (tem d5el chi ye3nik 🙂)`;
                } else if (trimmed.startsWith('sudo ')) {
                    output = `[sudo] password for ${PROFILE.username}: \nSorry, this is a portfolio, not a real terminal 😉`;
                } else {
                    output = `zsh: command not found: ${trimmed}\nType 'help' for available commands.`;
                }
        }

        const newHistory = [
            ...history,
            { type: 'input' as const, content: cmd },
            ...(output ? [{ type: 'output' as const, content: output }] : []),
        ];
        setHistory(newHistory);
        setCommandHistory(prev => [...prev, cmd]);
        setHistoryIndex(-1);
        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            processCommand(input);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex !== -1) {
                const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
                if (newIndex === commandHistory.length - 1 && historyIndex === newIndex) {
                    setHistoryIndex(-1);
                    setInput('');
                } else {
                    setHistoryIndex(newIndex);
                    setInput(commandHistory[newIndex]);
                }
            }
        } else if (e.key === 'l' && e.ctrlKey) {
            e.preventDefault();
            setHistory([]);
        }
    };

    return (
        <div
            className="terminal-app"
            onClick={() => inputRef.current?.focus()}
        >
            {history.map((entry, i) => (
                <div key={i} style={{ marginBottom: 2 }}>
                    {entry.type === 'input' ? (
                        <div>
                            <span className="terminal-prompt">
                                <span className="terminal-prompt-user">┌──({PROFILE.username}㉿{PROFILE.hostname})</span>
                                <span style={{ color: 'var(--text-muted)' }}>-</span>
                                <span className="terminal-prompt-path">[<span style={{ color: 'white' }}>~</span>]</span>
                            </span>
                            <br />
                            <span className="terminal-prompt" style={{ color: 'var(--kali-blue)' }}>└─$ </span>
                            <span style={{ color: '#e8e8e8' }}>{entry.content}</span>
                        </div>
                    ) : (
                        <div className="terminal-output" style={{
                            color: entry.content.includes('not found') || entry.content.includes('Permission denied') || entry.content.includes('denied')
                                ? 'var(--kali-red)'
                                : entry.content.includes('Nice try') || entry.content.includes('🚨')
                                    ? 'var(--kali-yellow)'
                                    : '#c8c8c8'
                        }}>
                            {parseAnsi(entry.content)}
                        </div>
                    )}
                </div>
            ))}

            {/* Current prompt */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="terminal-prompt">
                    <span className="terminal-prompt-user">┌──({PROFILE.username}㉿{PROFILE.hostname})</span>
                    <span style={{ color: 'var(--text-muted)' }}>-</span>
                    <span className="terminal-prompt-path">[<span style={{ color: 'white' }}>~</span>]</span>
                </span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="terminal-prompt" style={{ color: 'var(--kali-blue)' }}>└─$ </span>
                    <input
                        ref={inputRef}
                        className="terminal-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        spellCheck={false}
                        autoComplete="off"
                    />
                </div>
            </div>

            <div ref={bottomRef} />
        </div>
    );
};

export default TerminalApp;
