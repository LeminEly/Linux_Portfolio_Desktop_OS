import React, { useState, useEffect } from 'react';
import { SKILLS } from '../../data/content';
import { Activity, Layout, Server, Database, Cpu, Shield, Code, Zap, Wrench } from 'lucide-react';

interface SkillsAppProps {
    windowId: string;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
    Languages: <Code size={16} />,
    Frontend: <Layout size={16} />,
    'Backend & APIs': <Server size={16} />,
    Databases: <Database size={16} />,
    'AI & Machine Learning': <Zap size={16} />,
    'IoT & Embedded': <Cpu size={16} />,
    Cybersecurity: <Shield size={16} />,
    'DevOps & Tools': <Wrench size={16} />,
};

const CATEGORY_COLORS: Record<string, string> = {
    Languages: '#c678dd',
    Frontend: '#367bf0',
    'Backend & APIs': '#2de98a',
    Databases: '#f5a623',
    'AI & Machine Learning': '#ff6b9d',
    'IoT & Embedded': '#49aee6',
    Cybersecurity: '#f55353',
    'DevOps & Tools': '#61afef',
};

const SkillsApp: React.FC<SkillsAppProps> = () => {
    const [animatedLevels, setAnimatedLevels] = useState<Record<string, number>>({});

    useEffect(() => {
        // Animate bars filling up
        const timer = setTimeout(() => {
            const levels: Record<string, number> = {};
            SKILLS.forEach(cat => {
                cat.items.forEach(item => {
                    levels[`${cat.category}-${item.name}`] = item.level;
                });
            });
            setAnimatedLevels(levels);
        }, 200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="system-monitor">
            <div className="sm-header">
                <h2 style={{ fontSize: 16, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Activity size={18} style={{ color: 'var(--kali-green)' }} />
                    System Monitor — Skills & Performance
                </h2>
            </div>

            <div className="sm-content">
                {/* System Overview */}
                <div className="sm-card" style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 120 }}>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>TOTAL SKILLS</div>
                        <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--kali-blue)' }}>
                            {SKILLS.reduce((acc, cat) => acc + cat.items.length, 0)}
                        </div>
                    </div>
                    <div style={{ flex: 1, minWidth: 120 }}>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>CATEGORIES</div>
                        <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--kali-green)' }}>
                            {SKILLS.length}
                        </div>
                    </div>
                    <div style={{ flex: 1, minWidth: 120 }}>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>AVG PROFICIENCY</div>
                        <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--kali-cyan)' }}>
                            {Math.round(
                                SKILLS.flatMap(s => s.items).reduce((a, b) => a + b.level, 0) /
                                SKILLS.flatMap(s => s.items).length
                            )}%
                        </div>
                    </div>
                    <div style={{ flex: 1, minWidth: 120 }}>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>STATUS</div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--kali-green)', display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--kali-green)', boxShadow: '0 0 8px var(--kali-green)' }} />
                            All Systems Running
                        </div>
                    </div>
                </div>

                {/* Skill Categories */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 12 }}>
                    {SKILLS.map((category) => {
                        const color = CATEGORY_COLORS[category.category] || 'var(--kali-blue)';
                        return (
                            <div key={category.category} className="sm-card">
                                <div className="sm-card-title" style={{ color }}>
                                    {CATEGORY_ICONS[category.category] || <Cpu size={16} />}
                                    {category.category}
                                    <span style={{
                                        marginLeft: 'auto',
                                        fontSize: 10,
                                        padding: '2px 8px',
                                        background: `${color}22`,
                                        color: color,
                                        borderRadius: 20,
                                    }}>
                                        Running
                                    </span>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {category.items.map((skill) => {
                                        const key = `${category.category}-${skill.name}`;
                                        const level = animatedLevels[key] || 0;
                                        return (
                                            <div key={skill.name}>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    fontSize: 12,
                                                    marginBottom: 4,
                                                    color: 'var(--text-primary)',
                                                }}>
                                                    <span>{skill.name}</span>
                                                    <span style={{ color: 'var(--text-muted)' }}>{skill.level}%</span>
                                                </div>
                                                <div className="sm-progress-bar">
                                                    <div
                                                        className="sm-progress-fill"
                                                        style={{
                                                            width: `${level}%`,
                                                            background: `linear-gradient(90deg, ${color}, ${color}88)`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SkillsApp;
