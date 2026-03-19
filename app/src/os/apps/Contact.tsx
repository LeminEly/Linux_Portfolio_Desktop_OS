import React from 'react';
import { PROFILE } from '../../data/content';
import { Mail, Github, Linkedin, MapPin, Send, ExternalLink } from 'lucide-react';

interface ContactAppProps {
    windowId: string;
}

const ContactApp: React.FC<ContactAppProps> = () => {
    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--gnome-window-bg)',
        }}>
            {/* Mail-like toolbar */}
            <div style={{
                height: 42,
                background: 'rgba(0,0,0,0.1)',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                gap: 8,
                flexShrink: 0,
            }}>
                <button style={{
                    background: 'var(--kali-blue)',
                    color: 'white',
                    border: 'none',
                    padding: '6px 16px',
                    borderRadius: 'var(--radius-button)',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontFamily: 'var(--font-sans)',
                }}>
                    <Send size={14} />
                    Compose
                </button>
            </div>

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                {/* Sidebar */}
                <div style={{
                    width: 180,
                    background: 'rgba(0,0,0,0.08)',
                    borderRight: '1px solid rgba(255,255,255,0.04)',
                    padding: 8,
                    fontSize: 13,
                    flexShrink: 0,
                }}>
                    <div style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: 'var(--text-muted)',
                        padding: '4px 8px',
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                        marginBottom: 4,
                    }}>
                        Folders
                    </div>
                    <div style={{
                        padding: '6px 10px',
                        borderRadius: 'var(--radius-button)',
                        background: 'var(--kali-blue-soft)',
                        color: 'var(--kali-blue)',
                        cursor: 'pointer',
                        fontWeight: 500,
                        marginBottom: 2,
                    }}>
                         Inbox (1)
                    </div>
                    <div style={{
                        padding: '6px 10px',
                        borderRadius: 'var(--radius-button)',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                    }}>
                         Sent
                    </div>
                    <div style={{
                        padding: '6px 10px',
                        borderRadius: 'var(--radius-button)',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                    }}>
                         Drafts
                    </div>
                </div>

                {/* Message Content */}
                <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
                    <div style={{
                        maxWidth: 600,
                        margin: '0 auto',
                        background: 'rgba(0,0,0,0.12)',
                        border: '1px solid rgba(255,255,255,0.04)',
                        borderRadius: 'var(--radius-window)',
                        overflow: 'hidden',
                    }}>
                        {/* Message Header */}
                        <div style={{
                            padding: 20,
                            borderBottom: '1px solid rgba(255,255,255,0.04)',
                        }}>
                            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: 'var(--text-primary)' }}>
                                👋 Let's Connect!
                            </h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--kali-blue), var(--kali-purple))',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 18,
                                    fontWeight: 700,
                                    color: 'white',
                                }}>
                                    {PROFILE.name.charAt(0)}
                                </div>
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
                                        {PROFILE.name}
                                    </div>
                                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                                        &lt;{PROFILE.email}&gt;
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Message Body */}
                        <div style={{ padding: 20 }}>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16, fontSize: 14 }}>
                                Hello visitor! 👋
                            </p>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16, fontSize: 14 }}>
                                I'm currently open to new opportunities, collaborations, and interesting conversations.
                                Whether you want to discuss <span style={{ color: 'var(--kali-blue)' }}>cybersecurity</span>, <span style={{ color: 'var(--kali-blue)' }}>web or Mobile</span> development, or any tech-related project,
                                feel free to reach out through any of the channels below.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24, fontSize: 14 }}>
                                Let's build something amazing together! 
                            </p>

                            {/* Contact Links */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                <a
                                    href={PROFILE.email}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 10,
                                        padding: '10px 16px',
                                        background: 'var(--kali-blue)',
                                        color: 'white',
                                        borderRadius: 'var(--radius-button)',
                                        textDecoration: 'none',
                                        fontSize: 14,
                                        fontWeight: 500,
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    <Mail size={16} />
                                    Send Email — {PROFILE.email}
                                    <ExternalLink size={12} style={{ marginLeft: 'auto', opacity: 0.6 }} />
                                </a>

                                <a
                                    href={PROFILE.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 10,
                                        padding: '10px 16px',
                                        background: 'rgba(255,255,255,0.06)',
                                        color: 'var(--text-primary)',
                                        borderRadius: 'var(--radius-button)',
                                        textDecoration: 'none',
                                        fontSize: 14,
                                        fontWeight: 500,
                                        border: '1px solid rgba(255,255,255,0.06)',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    <Github size={16} />
                                    GitHub Profile
                                    <ExternalLink size={12} style={{ marginLeft: 'auto', opacity: 0.6 }} />
                                </a>

                                <a
                                    href={PROFILE.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 10,
                                        padding: '10px 16px',
                                        background: 'rgba(255,255,255,0.06)',
                                        color: 'var(--text-primary)',
                                        borderRadius: 'var(--radius-button)',
                                        textDecoration: 'none',
                                        fontSize: 14,
                                        fontWeight: 500,
                                        border: '1px solid rgba(255,255,255,0.06)',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    <Linkedin size={16} />
                                    LinkedIn
                                    <ExternalLink size={12} style={{ marginLeft: 'auto', opacity: 0.6 }} />
                                </a>

                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10,
                                    padding: '10px 16px',
                                    background: 'rgba(255,255,255,0.03)',
                                    color: 'var(--text-secondary)',
                                    borderRadius: 'var(--radius-button)',
                                    fontSize: 14,
                                    border: '1px solid rgba(255,255,255,0.04)',
                                }}>
                                    <MapPin size={16} />
                                    {PROFILE.location}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactApp;
