import React from 'react';

export const parseAnsi = (text: string): React.ReactNode => {
    // Very basic ANSI parser for the most common colors in our content
    // Matches \x1b[32m, \x1b[34m, \x1b[0m, etc.
    const regex = /\x1b\[(\d+)m/g;
    const parts = text.split(regex);

    if (parts.length === 1) return text;

    const result: React.ReactNode[] = [];
    let currentColor = '';

    for (let i = 0; i < parts.length; i++) {
        if (i % 2 === 0) {
            // Content
            if (parts[i]) {
                result.push(
                    <span key={i} style={{ color: getColor(currentColor), fontWeight: currentColor === '1' ? 'bold' : 'normal' }}>
                        {parts[i]}
                    </span>
                );
            }
        } else {
            // ANSI code
            currentColor = parts[i];
        }
    }

    return <>{result}</>;
};

const getColor = (code: string): string | undefined => {
    switch (code) {
        case '31': return 'var(--kali-red)';
        case '32': return 'var(--kali-green)';
        case '33': return 'var(--kali-yellow)';
        case '34': return 'var(--kali-blue)';
        case '35': return 'var(--kali-purple)';
        case '36': return 'var(--kali-cyan)';
        case '0': return 'inherit';
        case '1': return 'inherit'; // Bold
        default: return undefined;
    }
};
