import React from 'react';
import { PROFILE } from '../../data/content';

interface AboutAppProps {
    windowId: string;
}

const AboutApp: React.FC<AboutAppProps> = () => {
    const lines = [
        `# ═══════════════════════════════════════`,
        `# About ${PROFILE.name}`,
        `# ═══════════════════════════════════════`,
        ``,
        `const developer = {`,
        `  name: "${PROFILE.name}",`,
        `  title: "${PROFILE.title}",`,
        `  location: "${PROFILE.location}",`,
        `  email: "${PROFILE.email}",`,
        ``,
        `  bio: \``,
        `    ${PROFILE.bio}`,
        `  \`,`,
        ``,
        `  social: {`,
        `    github: "${PROFILE.github}",`,
        `    linkedin: "${PROFILE.linkedin}",`,
        `  },`,
        ``,
        `  interests: [`,
        `    "Cybersecurity & Ethical Hacking",`,
        `    "Full-Stack Web , Mobile Development",`,
        `    "Linux & Open Source",`,
        `    "Building secure applications",`,
        `  ],`,
        ``,
        `  philosophy: "Security is not a product,`,
        `               but a process.",`,
        `};`,
        ``,
        `// "The quieter you become,`,
        `//  the more you are able to hear."`,
        `//  — Kali Linux motto`,
        ``,
        `export default developer;`,
    ];

    return (
        <div className="text-editor">
            <div className="text-editor-toolbar">
                <span style={{ cursor: 'pointer' }}>File</span>
                <span style={{ cursor: 'pointer' }}>Edit</span>
                <span style={{ cursor: 'pointer' }}>View</span>
                <span style={{ cursor: 'pointer' }}>Search</span>
                <span style={{ cursor: 'pointer' }}>Help</span>
            </div>
            <div className="text-editor-body">
                <div className="text-editor-lines">
                    {lines.map((_, i) => (
                        <div key={i} style={{ padding: '0 8px' }}>{i + 1}</div>
                    ))}
                </div>
                <div className="text-editor-content">
                    {lines.map((line, i) => (
                        <div key={i}>
                            {renderSyntax(line)}
                        </div>
                    ))}
                </div>
            </div>
            <div className="text-editor-statusbar">
                <span>Line 1, Col 1</span>
                <span>UTF-8 • JavaScript</span>
                <span>GNOME Text Editor</span>
            </div>
        </div>
    );
};

const renderSyntax = (line: string) => {
    if (line.startsWith('#') || line.startsWith('//')) {
        return <span className="syntax-comment">{line}</span>;
    }

    // Simple syntax highlighting
    const parts = line.split(/(const |let |var |export |default |import |from |return |\{|\}|\[|\]|"[^"]*"|'[^']*'|`[^`]*`|\b\d+\b)/g);

    return parts.map((part, i) => {
        if (['const ', 'let ', 'var ', 'export ', 'default ', 'import ', 'from ', 'return '].includes(part)) {
            return <span key={i} className="syntax-keyword">{part}</span>;
        }
        if ((part.startsWith('"') && part.endsWith('"')) ||
            (part.startsWith("'") && part.endsWith("'")) ||
            (part.startsWith('`') && part.endsWith('`'))) {
            return <span key={i} className="syntax-string">{part}</span>;
        }
        if (/^\d+$/.test(part)) {
            return <span key={i} className="syntax-number">{part}</span>;
        }
        if (['{', '}', '[', ']'].includes(part)) {
            return <span key={i} className="syntax-punctuation">{part}</span>;
        }
        return <span key={i}>{part}</span>;
    });
};

export default AboutApp;
