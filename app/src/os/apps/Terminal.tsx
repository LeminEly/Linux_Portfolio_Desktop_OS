import React, { useState, useEffect, useRef } from 'react';
import { PROFILE, SKILLS, PROJECTS, NEOFETCH_ART, TERMINAL_WELCOME } from '../../data/content';
import { useOSStore } from '../../store/useOSStore';
import { parseAnsi } from '../../utils/ansi';

interface TerminalAppProps {
    windowId: string;
}

const TerminalApp: React.FC<TerminalAppProps> = () => {
    // History lives in global store → persists across resize/maximize/re-renders
    const {
        terminalHistory: history,
        terminalCommandHistory: commandHistory,
        setTerminalHistory,
        clearTerminalHistory,
        setTerminalCommandHistory,
        triggerBSOD,
    } = useOSStore();

    const [input, setInput] = useState('');
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isLocked, setIsLocked] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Initialize welcome message on first mount only
    useEffect(() => {
        if (history.length === 0) {
            setTerminalHistory([{ type: 'output', content: TERMINAL_WELCOME }]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const processCommand = (cmd: string) => {
        const trimmed = cmd.trim();
        const lower = trimmed.toLowerCase();
        const parts = trimmed.split(/\s+/);
        const baseCmd = lower.split(/\s+/)[0];
        let output = '';

        // Handle 'echo' specially (case-sensitive content)
        if (baseCmd === 'echo') {
            const rest = trimmed.substring(4).trim();
            const echoOut = rest.replace(/^["']|["']$/g, '');
            setTerminalHistory([
                ...history,
                { type: 'input', content: cmd },
                { type: 'output', content: echoOut },
            ]);
            setTerminalCommandHistory([...commandHistory, cmd]);
            setHistoryIndex(-1);
            setInput('');
            return;
        }

        // --- rm -rf / DRAMATIC MODE ---
        if (
            !isLocked && (
                lower === 'rm -rf /' ||
                lower === 'rm -rf / --no-preserve-root' ||
                lower === 'rm -rf /*' ||
                lower === 'sudo rm -rf /' ||
                lower === 'sudo rm -rf / --no-preserve-root' ||
                lower === 'sudo rm -rf /*'
            )
        ) {
            const startEntries = [
                { type: 'input' as const, content: cmd },
                { type: 'output' as const, content: lower.startsWith('sudo') ? `[sudo] password for ${PROFILE.username}: ` : '' },
            ];
            setTerminalHistory([...history, ...startEntries.filter(e => e.content)]);
            setTerminalCommandHistory([...commandHistory, cmd]);
            setHistoryIndex(-1);
            setInput('');
            setIsLocked(true);

            const architectures = ['/bin', '/boot', '/dev', '/etc', '/home', '/lib', '/lib64', '/media', '/mnt', '/opt', '/proc', '/root', '/run', '/sbin', '/srv', '/sys', '/tmp', '/usr', '/var'];
            const commonFiles = ['passwd', 'shadow', 'group', 'sudoers', 'fstab', 'hosts', 'hostname', 'resolv.conf', 'network/interfaces', 'issue', 'os-release', 'bash.bashrc', 'zsh/zshrc'];
            const homeFiles = ['.bashrc', '.zshrc', '.profile', '.config', '.ssh', '.local', 'Documents', 'Downloads', 'Music', 'Pictures', 'Videos', 'Desktop'];

            const fakePaths: string[] = [];
            architectures.forEach(arch => {
                fakePaths.push(arch);
                for (let i = 0; i < 8; i++) {
                    fakePaths.push(`${arch}/item_0x${Math.floor(Math.random() * 0xFFFF).toString(16)}.so`);
                }
            });

            commonFiles.forEach(f => fakePaths.push(`/etc/${f}`));
            homeFiles.forEach(f => fakePaths.push(`/home/${PROFILE.username}/${f}`));

            // Add some specific project files
            fakePaths.push(`/home/${PROFILE.username}/projects/ihsan-platform/server.js`);
            fakePaths.push(`/home/${PROFILE.username}/projects/ihsan-platform/package.json`);
            fakePaths.push(`/home/${PROFILE.username}/projects/ihsan-platform/src/index.ts`);
            fakePaths.push(`/home/${PROFILE.username}/projects/ihsan-platform/node_modules`);
            fakePaths.push(`/home/${PROFILE.username}/projects/portfolio/src/App.tsx`);
            fakePaths.push(`/home/${PROFILE.username}/projects/portfolio/public/favicon.ico`);

            // Shuffle slightly
            fakePaths.sort(() => Math.random() - 0.5);

            let delay = 100;
            fakePaths.forEach((path, index) => {
                // Speed up as it goes
                const currentDelay = Math.max(10, 80 - Math.floor(index / 2));
                delay += currentDelay;
                setTimeout(() => {
                    useOSStore.getState().appendTerminalHistory([{
                        type: 'output',
                        content: `\x1b[31mrm: removing '${path}'\x1b[0m`,
                    }]);
                }, delay);
            });

            setTimeout(() => {
                useOSStore.getState().appendTerminalHistory([{
                    type: 'output',
                    content: `\x1b[31m\nrm: cannot remove '/proc': Permission denied\nrm: cannot remove '/run': Permission denied\nrm: cannot remove '/sys': Device or resource busy\nrm: cannot remove '/dev/sda1': Operation not permitted\x1b[0m`,
                }]);
            }, delay + 400);

            setTimeout(() => {
                useOSStore.getState().appendTerminalHistory([{
                    type: 'output',
                    content: '\x1b[33m\n[  OK  ] Stopped Network Manager.\n[  OK  ] Stopped WPA Supplicant.\n[  OK  ] Stopped Modem Manager.\n[  OK  ] Stopped LSB: Load kernel modules.\x1b[0m',
                }]);
            }, delay + 1000);

            setTimeout(() => {
                useOSStore.getState().appendTerminalHistory([{
                    type: 'output',
                    content: '\x1b[31m\nCRITICAL: System call table corrupted.\nKernel panic - not syncing: Attempted to kill init! exitcode=0x0000000b\x1b[0m',
                }]);
            }, delay + 2000);

            setTimeout(() => {
                triggerBSOD();
                setIsLocked(false);
            }, delay + 3500);

            return;
        }

        if (isLocked) return;

        switch (lower) {
            case 'help':
                output = `\x1b[34mAvailable commands:\x1b[0m
  \x1b[32mSystem Info\x1b[0m
    neofetch          System info (neofetch style)
    uname -a          Kernel information
    uname -r          Kernel release
    hostname          Machine hostname
    uptime            System uptime
    df -h             Disk usage
    free -h           Memory usage
    cat /etc/os-release   OS release info

  \x1b[32mUser & Session\x1b[0m
    whoami            Current user
    id                User ID and groups
    env               Environment variables
    history           Command history

  \x1b[32mFilesystem\x1b[0m
    pwd               Print working directory
    ls                List files
    ls -la            List files (long format)
    ls -lh            List files (human sizes)
    cat <file>        Read file (try bio.txt, skills.json, .zshrc)
    tree              Directory tree

  \x1b[32mNetwork\x1b[0m
    ifconfig          Network interfaces
    ip addr           IP addresses
    ping <host>       Ping a host
    curl <url>        HTTP request (simulated)
    nmap <host>       Port scan (simulated)

  \x1b[32mProcess\x1b[0m
    ps aux            Running processes
    top               Process monitor
    kill <pid>        Kill process

  \x1b[32mPortfolio\x1b[0m
    skills            Technical skills
    projects          List projects
    contact           Contact information

  \x1b[32mFun\x1b[0m
    matrix            Toggle matrix rain
    cowsay <text>     ASCII cow
    fortune           Random wisdom
    sudo rm -rf /     Don't even try 😄
    clear             Clear terminal
    exit              Close terminal`;
                break;

            case 'clear':
                clearTerminalHistory();
                setInput('');
                return;

            case 'whoami':
                output = PROFILE.username;
                break;

            case 'id':
                output = `uid=1000(${PROFILE.username}) gid=1000(${PROFILE.username}) groups=1000(${PROFILE.username}),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),100(users),135(netdev)`;
                break;

            case 'hostname':
                output = PROFILE.hostname;
                break;

            case 'uname -a':
                output = `Linux ${PROFILE.hostname} 6.9.0-kali3-amd64 #1 SMP PREEMPT_DYNAMIC Kali 6.9.12-1kali2 (2024-09-03) x86_64 GNU/Linux`;
                break;

            case 'uname -r':
                output = `6.9.0-kali3-amd64`;
                break;

            case 'uname':
                output = `Linux`;
                break;

            case 'pwd':
                output = `/home/${PROFILE.username}`;
                break;

            case 'matrix':
                useOSStore.getState().toggleMatrix();
                output = '\x1b[32mWake up, Neo...\x1b[0m\nThe Matrix has you.';
                break;

            case 'date':
                output = new Date().toString();
                break;

            case 'uptime':
                output = ` ${new Date().toLocaleTimeString()} up 13 days, 5:27,  1 user,  load average: 0.42, 0.38, 0.35`;
                break;

            case 'neofetch':
                output = NEOFETCH_ART;
                break;

            case 'ls':
                output = `\x1b[34mDesktop\x1b[0m  \x1b[34mDocuments\x1b[0m  \x1b[34mDownloads\x1b[0m  \x1b[34mPictures\x1b[0m  \x1b[34mprojects\x1b[0m  bio.txt  skills.json  .bashrc  .zshrc`;
                break;

            case 'ls -la':
            case 'ls -al':
                output = `total 64
drwxr-xr-x  9 ${PROFILE.username} ${PROFILE.username} 4096 Mar 27 09:16 .
drwxr-xr-x  3 root  root  4096 Jan 15 10:00 ..
-rw-------  1 ${PROFILE.username} ${PROFILE.username}  847 Mar 27 09:14 .bash_history
-rw-r--r--  1 ${PROFILE.username} ${PROFILE.username}  220 Jan 15 10:00 .bash_logout
-rw-r--r--  1 ${PROFILE.username} ${PROFILE.username}  512 Mar 27 08:00 .bashrc
drwxr-xr-x  5 ${PROFILE.username} ${PROFILE.username} 4096 Mar 19 04:36 .config
drwx------  3 ${PROFILE.username} ${PROFILE.username} 4096 Jan 15 11:00 .gnupg
-rw-r--r--  1 ${PROFILE.username} ${PROFILE.username}  807 Jan 15 10:00 .profile
-rw-r--r--  1 ${PROFILE.username} ${PROFILE.username} 1342 Mar 25 22:00 .zshrc
drwxr-xr-x  2 ${PROFILE.username} ${PROFILE.username} 4096 Mar 18 22:10 Desktop
drwxr-xr-x  3 ${PROFILE.username} ${PROFILE.username} 4096 Mar 15 14:30 Documents
drwxr-xr-x  2 ${PROFILE.username} ${PROFILE.username} 4096 Mar 17 09:15 Downloads
drwxr-xr-x  2 ${PROFILE.username} ${PROFILE.username} 4096 Mar 10 18:45 Pictures
-rw-r--r--  1 ${PROFILE.username} ${PROFILE.username}  512 Mar 27 07:00 bio.txt
drwxr-xr-x  8 ${PROFILE.username} ${PROFILE.username} 4096 Mar 27 09:00 projects
-rw-r--r--  1 ${PROFILE.username} ${PROFILE.username} 2048 Mar 27 06:50 skills.json`;
                break;

            case 'ls -lh':
                output = `total 64K
drwxr-xr-x  2 ${PROFILE.username} ${PROFILE.username} 4.0K Mar 18 22:10 Desktop
drwxr-xr-x  3 ${PROFILE.username} ${PROFILE.username} 4.0K Mar 15 14:30 Documents
drwxr-xr-x  2 ${PROFILE.username} ${PROFILE.username} 4.0K Mar 17 09:15 Downloads
drwxr-xr-x  2 ${PROFILE.username} ${PROFILE.username} 4.0K Mar 10 18:45 Pictures
-rw-r--r--  1 ${PROFILE.username} ${PROFILE.username}  512 Mar 27 07:00 bio.txt
drwxr-xr-x  8 ${PROFILE.username} ${PROFILE.username} 4.0K Mar 27 09:00 projects
-rw-r--r--  1 ${PROFILE.username} ${PROFILE.username} 2.0K Mar 27 06:50 skills.json
-rw-r--r--  1 ${PROFILE.username} ${PROFILE.username} 1.3K Mar 25 22:00 .zshrc`;
                break;

            case 'tree':
                output = `.
├── Desktop/
├── Documents/
│   └── notes.md
├── Downloads/
├── Pictures/
│   ├── screenshots/
│   └── wallpapers/
├── projects/
│   ├── ihsan-platform/     [Node.js + MongoDB]
│   ├── rcpsp-algo/         [Rust]
│   ├── supnum-scan/        [Rust + Nmap]
│   ├── 7odouri/            [IoT + Python]
│   ├── chivaa-app/         [MERN]
│   └── hassaniya2arabic/   [NLP]
├── bio.txt
├── skills.json
├── .bashrc
└── .zshrc

9 directories, 6 files`;
                break;

            case 'skills':
                output = '\x1b[36m Technical Skills\x1b[0m\n' + '─'.repeat(50) + '\n';
                SKILLS.forEach(category => {
                    output += `\n\x1b[33m⚡ ${category.category}:\x1b[0m\n`;
                    category.items.forEach(skill => {
                        const filled = Math.floor(skill.level / 5);
                        const bar = '\x1b[34m' + '█'.repeat(filled) + '\x1b[0m' + '░'.repeat(20 - filled);
                        output += `  ${skill.name.padEnd(22)} ${bar} \x1b[32m${skill.level}%\x1b[0m\n`;
                    });
                });
                break;

            case 'projects':
                output = '\x1b[36m Projects\x1b[0m\n' + '─'.repeat(50) + '\n';
                PROJECTS.forEach((project, i) => {
                    output += `\n\x1b[33m${i + 1}. ${project.title}\x1b[0m`;
                    output += `\n   Type: ${project.type}`;
                    output += `\n   Stack: ${project.tags.join(', ')}`;
                    output += `\n   ${project.description}`;
                    if (project.github) output += `\n   \x1b[34mGitHub: ${project.github}\x1b[0m`;
                    output += '\n';
                });
                break;

            case 'contact':
                output = `
\x1b[36m Contact Information\x1b[0m
─────────────────────────────────
  \x1b[34m Email:\x1b[0m        ${PROFILE.email}
  \x1b[34m GitHub:\x1b[0m       ${PROFILE.github}
  \x1b[34m LinkedIn:\x1b[0m     ${PROFILE.linkedin}
  \x1b[34m Location:\x1b[0m     ${PROFILE.location}
  \x1b[34m WhatsApp :\x1b[0m    +222 37 60 60 55
─────────────────────────────────
Feel free to reach out!`;
                break;

            case 'cat bio.txt':
                output = `
╔═══════════════════════════════════════════════════════════════════════════════════════╗                            
║         About ${PROFILE.name}                                                                 
╠═══════════════════════════════════════════════════════════════════════════════════════║                           
  Title: ${PROFILE.title}                                                               
  Location: ${PROFILE.location}                                                                    
                                                                                         
  ${PROFILE.bio}                                                                                     
                                                                                        
╚═══════════════════════════════════════════════════════════════════════════════════════╝`;
                break;

            case 'cat skills.json':
                output = JSON.stringify(
                    SKILLS.map(s => ({ category: s.category, skills: s.items.map(i => i.name) })),
                    null,
                    2
                );
                break;

            case 'cat .zshrc':
                output = `# ~/.zshrc — LeminEly's zsh config
export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="powerlevel10k/powerlevel10k"
plugins=(git zsh-autosuggestions zsh-syntax-highlighting docker kubectl)
source $ZSH/oh-my-zsh.sh

# Aliases
alias ll='ls -lah --color=auto'
alias la='ls -la --color=auto'
alias update='sudo apt update && sudo apt upgrade -y'
alias cls='clear'
alias python='python3'
alias pip='pip3'
alias serve='python3 -m http.server 8080'
alias nse='ls /usr/share/nmap/scripts | grep'

# PATH additions
export PATH="$HOME/.cargo/bin:$HOME/.local/bin:/usr/local/sbin:$PATH"
export TERM=xterm-256color

# History settings
HISTSIZE=10000
SAVEHIST=10000
setopt HIST_IGNORE_DUPS
setopt SHARE_HISTORY`;
                break;

            case 'cat .bashrc':
                output = `# ~/.bashrc — LeminEly's bash config
# If not running interactively, don't do anything
case $- in
    *i*) ;;
    *) return;;
esac

HISTCONTROL=ignoreboth
HISTSIZE=1000
HISTFILESIZE=2000
shopt -s histappend

# Prompt
PS1='\\[\\033[01;32m\\]\\u@\\h\\[\\033[00m\\]:\\[\\033[01;34m\\]\\w\\[\\033[00m\\]\\$ '

# Aliases
alias ls='ls --color=auto'
alias ll='ls -alF'
alias grep='grep --color=auto'
alias alert='notify-send --urgency=low -i terminal "Done"'`;
                break;

            case 'cat /etc/os-release':
                output = `PRETTY_NAME="Kali GNU/Linux Rolling"
NAME="Kali GNU/Linux"
VARIANT="Standard"
VARIANT_ID=standard
VERSION_ID="2024.4"
VERSION="2024.4"
VERSION_CODENAME=kali-rolling
ID=kali
ID_LIKE=debian
HOME_URL="https://www.kali.org/"
SUPPORT_URL="https://forums.kali.org/"
BUG_REPORT_URL="https://bugs.kali.org/"`;
                break;

            case 'ifconfig':
                output = `eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.42  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::a00:27ff:fe3b:5c1a  prefixlen 64  scopeid 0x20<link>
        ether 08:00:27:3b:5c:1a  txqueuelen 1000  (Ethernet)
        RX packets 128442  bytes 12847392 (12.2 MiB)
        TX packets 89231  bytes 8923104 (8.5 MiB)

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 2048  bytes 204800 (200.0 KiB)
        TX packets 2048  bytes 204800 (200.0 KiB)`;
                break;

            case 'ip addr':
            case 'ip a':
                output = `1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
    inet6 ::1/128 scope host
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 08:00:27:3b:5c:1a brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.42/24 brd 192.168.1.255 scope global dynamic eth0
    inet6 fe80::a00:27ff:fe3b:5c1a/64 scope link`;
                break;

            case 'ps aux':
                output = `USER       PID %CPU %MEM    VSZ   RSS TTY      STAT  COMMAND
root         1  0.0  0.1  16952  4096 ?        Ss   09:00   0:03 /sbin/init
root       412  0.0  0.2  45312  8192 ?        Ss   09:00   0:01 /usr/sbin/NetworkManager
root       523  0.0  0.1  28672  4096 ?        Ss   09:00   0:00 /usr/sbin/sshd
${PROFILE.username}     1024  0.1  1.2 512000 49152 ?       Sl   09:15   0:12 /usr/bin/gnome-shell
${PROFILE.username}     1842  0.4  2.1 892416 86016 ?       Sl   09:20   0:47 /usr/lib/firefox-esr/firefox-esr
${PROFILE.username}     2103  0.0  0.4  98304 16384 pts/0   Ss   09:25   0:00 /bin/zsh
${PROFILE.username}     2847  23.1  4.2 1048576 172032 pts/0 R+  09:28   2:13 node /home/${PROFILE.username}/projects/ihsan-platform/server.js
${PROFILE.username}     3001  0.0  0.1  14336  4096 pts/1   Ss+  09:30   0:00 bash`;
                break;

            case 'top':
                output = `top - ${new Date().toLocaleTimeString()} up 13 days,  5:27,  1 user,  load average: 0.42, 0.38, 0.35
Tasks: 184 total,   1 running, 183 sleeping,   0 stopped,   0 zombie
%Cpu(s):  5.2 us,  1.3 sy,  0.0 ni, 92.8 id,  0.4 wa,  0.0 hi,  0.3 si
MiB Mem :  15881.9 total,   4231.4 free,   8947.3 used,   2703.2 buff/cache
MiB Swap:   2048.0 total,   2048.0 free,      0.0 used.   6934.6 avail Mem

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
   2847 ${PROFILE.username}   20   0  1024.0m 172032  28672 R  23.1   4.2   2:13.07 node
   1842 ${PROFILE.username}   20   0   871.5m  86016  36864 S   4.8   2.1   0:47.33 firefox-esr
   1024 ${PROFILE.username}   20   0   500.0m  49152  28672 S   0.8   1.2   0:12.44 gnome-shell
      1 root      20   0    16.5m   4096   2048 S   0.0   0.1   0:03.21 systemd`;
                break;

            case 'df -h':
                output = `Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1       119G   47G   67G  42% /
tmpfs           7.8G     0  7.8G   0% /dev/shm
/dev/sda2       512M  5.8M  506M   2% /boot/efi
tmpfs           1.6G  1.7M  1.6G   1% /run
/dev/sdb1       477G  123G  330G  28% /home`;
                break;

            case 'free -h':
                output = `               total        used        free      shared  buff/cache   available
Mem:            15Gi       8.7Gi       4.1Gi       417Mi       2.6Gi       6.8Gi
Swap:          2.0Gi          0B       2.0Gi`;
                break;

            case 'env':
                output = `SHELL=/bin/zsh
USER=${PROFILE.username}
HOME=/home/${PROFILE.username}
LOGNAME=${PROFILE.username}
TERM=xterm-256color
COLORTERM=truecolor
HOSTNAME=${PROFILE.hostname}
LANG=en_US.UTF-8
PATH=/home/${PROFILE.username}/.cargo/bin:/home/${PROFILE.username}/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
DISPLAY=:0
XDG_SESSION_TYPE=x11
XDG_CURRENT_DESKTOP=GNOME
DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/1000/bus`;
                break;

            case 'history':
                output = commandHistory.map((cmd, i) => `  ${(i + 1).toString().padStart(4)}  ${cmd}`).join('\n');
                if (!output) output = '  (no commands in history)';
                break;

            case 'fortune':
                const fortunes = [
                    '"The quieter you become, the more you are able to hear." — Kali Linux',
                    '"There is no patch for human stupidity." — Kevin Mitnick',
                    '"Hackers are not threats, they are curiosity in action." — Unknown',
                    '"The only truly secure system is one that is powered off." — Gene Spafford',
                    '"Security through obscurity is no security at all." — Unix Philosophy',
                    '"With great power comes great responsibility." — Spider-Man / root user',
                ];
                output = fortunes[Math.floor(Math.random() * fortunes.length)];
                break;

            case 'sudo rm -rf /':
            case 'sudo rm -rf / --no-preserve-root':
            case 'sudo rm -rf /*':
                output = `[sudo] password for ${PROFILE.username}: \n\x1b[33mhhhh Nice try! But this is a read-only portfolio filesystem.\nNo files were harmed in the making of this portfolio. 😄\nen plus 5ali 3ank lba6ch , 4e no3 ma yengba8li 😄😄😄\x1b[0m`;
                break;

            case 'exit':
                useOSStore.getState().closeWindow(
                    useOSStore.getState().windows.find(w => w.appId === 'terminal')?.id || ''
                );
                return;

            case '':
                break;

            default: {
                // ping
                if (lower.startsWith('ping ')) {
                    const host = parts[1] || 'localhost';
                    output = `PING ${host} (192.168.1.1) 56(84) bytes of data.
64 bytes from ${host} (192.168.1.1): icmp_seq=1 ttl=64 time=1.23 ms
64 bytes from ${host} (192.168.1.1): icmp_seq=2 ttl=64 time=0.98 ms
64 bytes from ${host} (192.168.1.1): icmp_seq=3 ttl=64 time=1.05 ms
64 bytes from ${host} (192.168.1.1): icmp_seq=4 ttl=64 time=1.11 ms

--- ${host} ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3004ms
rtt min/avg/max/mdev = 0.980/1.092/1.230/0.091 ms`;
                } else if (lower.startsWith('nmap ')) {
                    const host = parts[1] || 'localhost';
                    output = `Starting Nmap 7.94 ( https://nmap.org ) at ${new Date().toLocaleString()}
Nmap scan report for ${host}
Host is up (0.0042s latency).
Not shown: 997 closed tcp ports (reset)
PORT     STATE SERVICE     VERSION
22/tcp   open  ssh         OpenSSH 9.3 (protocol 2.0)
80/tcp   open  http        nginx 1.25.3
443/tcp  open  https       nginx 1.25.3
3000/tcp open  ppp?
8080/tcp open  http-proxy?

Nmap done: 1 IP address (1 host up) scanned in 3.47 seconds`;
                } else if (lower.startsWith('curl ') || lower.startsWith('wget ')) {
                    const tool = lower.startsWith('curl') ? 'curl' : 'wget';
                    const url = parts[1] || 'http://example.com';
                    output = `  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1256  100  1256    0     0   9872      0 --:--:-- --:--:-- --:--:--  9941
${tool}: fetching ${url}... \x1b[32m[200 OK]\x1b[0m`;
                } else if (lower.startsWith('kill ')) {
                    const pid = parts[1];
                    if (pid && !isNaN(Number(pid))) {
                        output = `Killed process ${pid}`;
                    } else {
                        output = `kill: ${pid}: arguments must be process or job IDs`;
                    }
                } else if (lower.startsWith('which ')) {
                    const prog = parts[1];
                    const known: Record<string, string> = {
                        python: '/usr/bin/python3', python3: '/usr/bin/python3',
                        node: '/usr/bin/node', npm: '/usr/bin/npm',
                        git: '/usr/bin/git', nmap: '/usr/bin/nmap',
                        zsh: '/usr/bin/zsh', bash: '/bin/bash',
                        curl: '/usr/bin/curl', wget: '/usr/bin/wget',
                        docker: '/usr/bin/docker',
                    };
                    output = known[prog] || `which: no ${prog} in (/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin)`;
                } else if (lower.startsWith('cowsay ')) {
                    const text = trimmed.substring(7).trim() || 'Moo!';
                    const len = text.length + 2;
                    output = ` ${'_'.repeat(len)}\n< ${text} >\n ${'‾'.repeat(len)}\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||`;
                } else if (lower.startsWith('git ')) {
                    if (lower === 'git log' || lower.startsWith('git log')) {
                        output = `\x1b[33mcommit a1b2c3d4e5f6789012345678901234567890abcd\x1b[0m (HEAD -> main, origin/main)
Author: ${PROFILE.name} <${PROFILE.email}>
Date:   Thu Mar 27 09:00:00 2026 +0000

    feat: add GNOME-style window overview with close buttons

\x1b[33mcommit 9f8e7d6c5b4a321098765432109876543210fedc\x1b[0m
Author: ${PROFILE.name} <${PROFILE.email}>
Date:   Wed Mar 26 18:30:00 2026 +0000

    fix: replace Arch icon with Kali Linux dragon icon`;
                    } else if (lower === 'git status') {
                        output = `On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean`;
                    } else {
                        output = `git: '${parts.slice(1).join(' ')}' is not a git command. See 'git help'.`;
                    }
                } else if (lower.startsWith('cat ')) {
                    const file = trimmed.split(' ')[1];
                    output = `cat: ${file}: No such file or directory`;
                } else if (lower.startsWith('cd ')) {
                    output = ``;  // cd with no output (success is silent)
                } else if (lower.startsWith('sudo ')) {
                    output = `[sudo] password for ${PROFILE.username}: \nSorry, this is a portfolio — no real root here 😉`;
                } else if (lower.startsWith('apt ') || lower.startsWith('apt-get ')) {
                    output = `E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)\nE: Unable to acquire the dpkg frontend lock (/var/lib/dpkg/lock-frontend), are you root?`;
                } else {
                    output = `\x1b[31mzsh: command not found: ${parts[0]}\x1b[0m\nType '\x1b[32mhelp\x1b[0m' for available commands.`;
                }
            }
        }

        const newHistory = [
            ...history,
            { type: 'input' as const, content: cmd },
            ...(output ? [{ type: 'output' as const, content: output }] : []),
        ];
        setTerminalHistory(newHistory);
        setTerminalCommandHistory([...commandHistory, cmd]);
        setHistoryIndex(-1);
        setInput('');
    };


    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (isLocked) {
            e.preventDefault();
            return;
        }
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
            clearTerminalHistory();
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
                        <div className="terminal-entry-row">
                            <div className="terminal-prompt">
                                <span className="terminal-prompt-user">┌──({PROFILE.username}㉿{PROFILE.hostname})</span>
                                <span className="terminal-prompt-sep">-[</span>
                                <span className="terminal-prompt-path">~</span>
                                <span className="terminal-prompt-sep">]</span>
                            </div>
                            <div className="terminal-input-line">
                                <span className="terminal-prompt-prefix">└─$ </span>
                                <span className="terminal-input-text">{entry.content}</span>
                            </div>
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
            {!isLocked && (
                <div className="terminal-entry-row">
                    <div className="terminal-prompt">
                        <span className="terminal-prompt-user">┌──({PROFILE.username}㉿{PROFILE.hostname})</span>
                        <span className="terminal-prompt-sep">-[</span>
                        <span className="terminal-prompt-path">~</span>
                        <span className="terminal-prompt-sep">]</span>
                    </div>
                    <div className="terminal-input-line">
                        <span className="terminal-prompt-prefix">└─$ </span>
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
            )}

            <div ref={bottomRef} />
        </div>
    );
};

export default TerminalApp;
