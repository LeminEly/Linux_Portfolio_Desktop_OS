import React, { useState } from 'react';
import { PROFILE, SKILLS, PROJECTS, TIMELINE } from '../../data/content';
import {
    ArrowLeft, ChevronRight, RefreshCw, Globe, Lock,
    Star, Shield, Github, Linkedin, MapPin, Mail
} from 'lucide-react';

interface BrowserAppProps {
    windowId: string;
}

const BrowserApp: React.FC<BrowserAppProps> = () => {
    const [url, setUrl] = useState(`${PROFILE.name.toLowerCase().replace(' ', '')}.dev`);

    return (
        <div className="browser-app">
            {/* Toolbar */}
            <div className="browser-toolbar">
                <div className="browser-nav-btns">
                    <button className="browser-nav-btn"><ArrowLeft size={16} /></button>
                    <button className="browser-nav-btn" style={{ opacity: 0.3 }}><ChevronRight size={16} /></button>
                    <button className="browser-nav-btn"><RefreshCw size={14} /></button>
                </div>
                <div className="browser-url">
                    <Lock size={12} style={{ color: 'var(--kali-green)' }} />
                    <span>https://{url}</span>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                    <button className="browser-nav-btn"><Star size={14} /></button>
                </div>
            </div>

            {/* Page Content — Personal Portfolio Site */}
            <div className="browser-content" style={{ background: '#0a0a1a' }}>
                {/* Hero */}
                <div style={{
                    padding: '64px 32px',
                    textAlign: 'center',
                    background: 'linear-gradient(180deg, rgba(54,123,240,0.1) 0%, transparent 100%)',
                    position: 'relative',
                }}>
                    <div style={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--kali-blue), var(--kali-purple))',
                        margin: '0 auto 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 32,
                        fontWeight: 700,
                        color: 'white',
                        boxShadow: '0 8px 32px rgba(54,123,240,0.3)',
                    }}>
                        {PROFILE.name.charAt(0)}
                    </div>
                    <h1 style={{
                        fontSize: 32,
                        fontWeight: 700,
                        color: 'white',
                        margin: '0 0 8px',
                        letterSpacing: -0.5,
                    }}>
                        {PROFILE.name}
                    </h1>
                    <p style={{
                        fontSize: 16,
                        color: 'var(--kali-cyan)',
                        margin: '0 0 16px',
                    }}>
                        {PROFILE.title}
                    </p>
                    <p style={{
                        fontSize: 14,
                        color: '#8b949e',
                        maxWidth: 500,
                        margin: '0 auto 24px',
                        lineHeight: 1.6,
                    }}>
                        {PROFILE.bio}
                    </p>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                        <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" style={{
                            display: 'flex', alignItems: 'center', gap: 6,
                            padding: '8px 16px', background: 'rgba(255,255,255,0.06)',
                            borderRadius: 8, color: 'white', textDecoration: 'none', fontSize: 13,
                            border: '1px solid rgba(255,255,255,0.08)',
                        }}>
                            <Github size={16} /> GitHub
                        </a>
                        <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" style={{
                            display: 'flex', alignItems: 'center', gap: 6,
                            padding: '8px 16px', background: 'rgba(255,255,255,0.06)',
                            borderRadius: 8, color: 'white', textDecoration: 'none', fontSize: 13,
                            border: '1px solid rgba(255,255,255,0.08)',
                        }}>
                            <Linkedin size={16} /> LinkedIn
                        </a>
                        <a href={`mailto:${PROFILE.email}`} style={{
                            display: 'flex', alignItems: 'center', gap: 6,
                            padding: '8px 16px', background: 'var(--kali-blue)',
                            borderRadius: 8, color: 'white', textDecoration: 'none', fontSize: 13,
                        }}>
                            <Mail size={16} /> Contact
                        </a>
                    </div>
                </div>

                {/* Skills Overview */}
                <div style={{ padding: '40px 32px', maxWidth: 700, margin: '0 auto' }}>
                    <h2 style={{ fontSize: 20, fontWeight: 600, color: 'white', marginBottom: 20 }}>
                        ⚡ Skills
                    </h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {SKILLS.flatMap(cat => cat.items).map((skill, i) => (
                            <span key={i} style={{
                                padding: '6px 14px',
                                background: 'rgba(54,123,240,0.1)',
                                color: 'var(--kali-cyan)',
                                borderRadius: 20,
                                fontSize: 12,
                                border: '1px solid rgba(54,123,240,0.2)',
                            }}>
                                {skill.name}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Projects Preview */}
                <div style={{ padding: '0 32px 40px', maxWidth: 700, margin: '0 auto' }}>
                    <h2 style={{ fontSize: 20, fontWeight: 600, color: 'white', marginBottom: 20 }}>
                        Featured Projects
                    </h2>
                    {PROJECTS.slice(0, 3).map(project => (
                        <div key={project.id} style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            borderRadius: 12,
                            padding: 20,
                            marginBottom: 12,
                        }}>
                            <h3 style={{ fontSize: 15, fontWeight: 600, color: 'white', marginBottom: 6 }}>
                                {project.title}
                            </h3>
                            <p style={{ fontSize: 13, color: '#8b949e', lineHeight: 1.5, marginBottom: 10 }}>
                                {project.description}
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                {project.tags.map((tag, i) => (
                                    <span key={i} style={{
                                        fontSize: 10, padding: '2px 8px',
                                        background: 'rgba(255,255,255,0.04)', borderRadius: 20,
                                        color: '#8b949e',
                                    }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div style={{
                    padding: '24px 32px',
                    textAlign: 'center',
                    borderTop: '1px solid rgba(255,255,255,0.04)',
                    color: '#555',
                    fontSize: 12,
                }}>
                    © {new Date().getFullYear()} {PROFILE.name}. Built with ❤️ and Kali Linux.
                </div>
            </div>
        </div>
    );
};

export default BrowserApp;
