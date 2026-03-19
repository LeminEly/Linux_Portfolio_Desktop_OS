import React from 'react';
import { PROFILE, SKILLS, TIMELINE, PROJECTS } from '../../data/content';
import { FileText, Download, Printer, ZoomIn, ZoomOut, Mail, MapPin, Github, Linkedin, Briefcase, GraduationCap, Award, Settings, Brain } from 'lucide-react';

interface CVViewerProps {
    windowId: string;
}

const CVViewer: React.FC<CVViewerProps> = () => {
    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: '#1a1b26', // Dark theme for the viewer background
        }}>
            {/* Professional PDF Toolbar */}
            <div style={{
                height: 48,
                background: '#24283b',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 24px',
                flexShrink: 0,
                boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                zIndex: 10,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                        width: 32, height: 32, borderRadius: 6, background: 'rgba(245, 83, 83, 0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <FileText size={18} style={{ color: '#f55353' }} />
                    </div>
                    <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#c0caf5' }}>{PROFILE.name.replace(' ', '_')}_CV.pdf</div>
                        <div style={{ fontSize: 10, color: '#565f89' }}>1.2 MB • Updated just now</div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ display: 'flex', background: '#1a1b26', borderRadius: 6, padding: '2px' }}>
                        <button className="pdf-tool-btn"><ZoomOut size={16} /></button>
                        <span style={{ fontSize: 11, color: '#9aa5ce', padding: '4px 12px', minWidth: 50, textAlign: 'center' }}>100%</span>
                        <button className="pdf-tool-btn"><ZoomIn size={16} /></button>
                    </div>
                    <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.1)', margin: '0 4px' }} />
                    <button className="pdf-action-btn"><Printer size={16} /></button>
                    <a href={PROFILE.cv} download className="pdf-action-btn" style={{ textDecoration: 'none' }}>
                        <Download size={16} />
                        <span style={{ fontSize: 12, fontWeight: 500 }}>Download</span>
                    </a>
                </div>
            </div>

            {/* CV Rendering Area */}
            <div style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                padding: '40px 20px',
                overflow: 'auto',
                scrollbarWidth: 'thin',
            }}>
                {/* Modern CV Paper */}
                <div style={{
                    width: 794, // A4 aspect ratio @ 96dpi approx
                    minHeight: 1123,
                    background: 'white',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
                    display: 'flex',
                    color: '#2c3e50',
                    fontFamily: '"Inter", "Segoe UI", sans-serif',
                }}>
                    {/* Sidebar */}
                    <div style={{
                        width: 260,
                        background: '#1e1e2e',
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '40px 24px',
                    }}>
                        {/* Avatar / Initials */}
                        <div style={{
                            width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg, #3d8ef0, #2de98a)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 32, fontWeight: 800, margin: '0 auto 24px',
                            border: '4px solid rgba(255,255,255,0.1)',
                            boxShadow: '0 8px 16px rgba(0,0,0,0.3)'
                        }}>
                            {PROFILE.name.split(' ').map(n => n[0]).join('')}
                        </div>

                        <div style={{ textAlign: 'center', marginBottom: 32 }}>
                            <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 4px' }}>{PROFILE.name}</h3>
                            <p style={{ fontSize: 12, color: '#3d8ef0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{PROFILE.title.split('|')[0]}</p>
                        </div>

                        {/* Contact Info */}
                        <div style={{ marginBottom: 32 }}>
                            <div className="cv-sidebar-section">CONTACT</div>
                            <div className="cv-contact-item">
                                <Mail size={14} /> <span>{PROFILE.email}</span>
                            </div>
                            <div className="cv-contact-item">
                                <MapPin size={14} /> <span>{PROFILE.location}</span>
                            </div>
                            <div className="cv-contact-item">
                                <Github size={14} /> <span>github.com/{PROFILE.username}</span>
                            </div>
                            <div className="cv-contact-item">
                                <Linkedin size={14} /> <span>linkedin.com/in/{PROFILE.username}</span>
                            </div>
                        </div>

                        {/* Skills (Top 3 Categories) */}
                        <div style={{ marginBottom: 32 }}>
                            <div className="cv-sidebar-section">EXPERT SKILLS</div>
                            {SKILLS.slice(0, 4).map(cat => (
                                <div key={cat.category} style={{ marginBottom: 16 }}>
                                    <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.7, marginBottom: 8, textTransform: 'uppercase' }}>{cat.category}</div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                        {cat.items.slice(0, 4).map(skill => (
                                            <span key={skill.name} style={{
                                                fontSize: 10, padding: '3px 8px', borderRadius: 4, background: 'rgba(255,255,255,0.08)',
                                                border: '1px solid rgba(255,255,255,0.05)'
                                            }}>{skill.name}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Education Quick View */}
                        <div>
                            <div className="cv-sidebar-section">EDUCATION</div>
                            {TIMELINE.filter(t => t.type === 'education').map((edu, i) => (
                                <div key={i} style={{ marginBottom: 12 }}>
                                    <div style={{ fontSize: 12, fontWeight: 600, color: '#3d8ef0' }}>{edu.title}</div>
                                    <div style={{ fontSize: 11, opacity: 0.8 }}>{edu.subtitle}</div>
                                    <div style={{ fontSize: 10, opacity: 0.5 }}>{edu.year}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div style={{ flex: 1, padding: '40px 48px', position: 'relative' }}>
                        {/* Summary Header */}
                        <div style={{ marginBottom: 32 }}>
                            <h2 style={{ fontSize: 14, fontWeight: 800, color: '#3d8ef0', letterSpacing: 2, marginBottom: 12, textTransform: 'uppercase' }}>Professional Profile</h2>
                            <p style={{ fontSize: 13, lineHeight: '1.7', color: '#444' }}>
                                {PROFILE.bio}
                            </p>
                        </div>

                        {/* Main Experience / Projects */}
                        <div style={{ marginBottom: 32 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, borderBottom: '2px solid #f0f2f5', paddingBottom: 8 }}>
                                <Briefcase size={18} style={{ color: '#3d8ef0' }} />
                                <h2 style={{ fontSize: 16, fontWeight: 800, color: '#1a1a1a', margin: 0, textTransform: 'uppercase' }}>Work & Collaboration</h2>
                            </div>

                            {/* Internship */}
                            {TIMELINE.filter(t => t.type === 'work').map((work, i) => (
                                <div key={i} style={{ marginBottom: 20 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                                        <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a', margin: 0 }}>{work.title}</h3>
                                        <span style={{ fontSize: 11, fontWeight: 600, color: '#3d8ef0', background: 'rgba(61, 142, 240, 0.1)', padding: '2px 8px', borderRadius: 4 }}>{work.year}</span>
                                    </div>
                                    <div style={{ fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 8 }}>{work.subtitle}</div>
                                    <p style={{ fontSize: 12, color: '#555', margin: 0 }}>{work.description}</p>
                                </div>
                            ))}

                            {/* Major Projects Highlight */}
                            <div style={{ marginTop: 24 }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: '#1a1a1a', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <Settings size={14} style={{ color: '#2de98a' }} /> Core Projects (Selection of 30+)
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                    {PROJECTS.slice(0, 4).map(project => (
                                        <div key={project.id} style={{ padding: 12, background: '#f8f9fa', borderRadius: 8, borderLeft: '3px solid #3d8ef0' }}>
                                            <div style={{ fontSize: 12, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>{project.title}</div>
                                            <div style={{ fontSize: 10, color: '#777', lineHeight: 1.4 }}>{project.description.slice(0, 70)}...</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Achievements & Awards */}
                        <div style={{ marginBottom: 32 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, borderBottom: '2px solid #f0f2f5', paddingBottom: 8 }}>
                                <Award size={18} style={{ color: '#f59e0b' }} />
                                <h2 style={{ fontSize: 16, fontWeight: 800, color: '#1a1a1a', margin: 0, textTransform: 'uppercase' }}>Awards & Recognition</h2>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                                {TIMELINE.filter(t => t.type === 'achievement').slice(0, 4).map((award, i) => (
                                    <div key={i}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b' }} />
                                            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', margin: 0 }}>{award.title}</h3>
                                        </div>
                                        <div style={{ fontSize: 11, fontWeight: 600, color: '#666', marginLeft: 14 }}>{award.subtitle}</div>
                                        <p style={{ fontSize: 11, color: '#777', margin: '4px 0 0 14px' }}>{award.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Personal Interests */}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, borderBottom: '2px solid #f0f2f5', paddingBottom: 8 }}>
                                <Brain size={18} style={{ color: '#c678dd' }} />
                                <h2 style={{ fontSize: 16, fontWeight: 800, color: '#1a1a1a', margin: 0, textTransform: 'uppercase' }}>Interests & Philosophy</h2>
                            </div>
                            <div style={{ display: 'flex', gap: 12 }}>
                                {["Mathematics", "Physics", "Offensive Security", "Innovation"].map(interest => (
                                    <span key={interest} style={{
                                        fontSize: 11, padding: '6px 12px', borderRadius: 20, background: '#f0f2f5',
                                        color: '#444', fontWeight: 600
                                    }}>{interest}</span>
                                ))}
                            </div>
                            <p style={{ fontSize: 11, fontStyle: 'italic', marginTop: 16, color: '#888' }}>
                                "The quieter you become, the more you are able to hear." — Dedicated to understanding systems at their core.
                            </p>
                        </div>

                        {/* QR / Branding */}
                        <div style={{ position: 'absolute', bottom: 40, right: 48, opacity: 0.1, pointerEvents: 'none' }}>
                            <div style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 4 }}>KALI OS PORTFOLIO</div>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .pdf-tool-btn {
                    padding: 4px 8px;
                    background: none;
                    border: none;
                    color: #9aa5ce;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    transition: all 0.2s;
                    border-radius: 4px;
                }
                .pdf-tool-btn:hover {
                    background: #24283b;
                    color: #c0caf5;
                }
                .pdf-action-btn {
                    padding: 6px 12px;
                    background: #3d8ef0;
                    border: none;
                    color: white;
                    border-radius: 6px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    transition: all 0.2s;
                }
                .pdf-action-btn:nth-child(2) { background: none; color: #9aa5ce; border: 1px solid rgba(255,255,255,0.1); }
                .pdf-action-btn:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(61, 142, 240, 0.3);
                }
                .cv-sidebar-section {
                    font-size: 11,
                    font-weight: 800,
                    letter-spacing: 2,
                    margin-bottom: 20,
                    padding-bottom: 4,
                    border-bottom: 1px solid rgba(255,255,255,0.1),
                    color: #565f89;
                    font-family: inherit;
                }
                .cv-contact-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 12px;
                    font-size: 11px;
                    opacity: 0.8;
                }
                .cv-sidebar-section {
                    font-size: 11px !important;
                    font-weight: 800 !important;
                    letter-spacing: 2px !important;
                    color: #565f89 !important;
                    margin-bottom: 16px !important;
                    padding-bottom: 4px !important;
                    border-bottom: 1px solid rgba(255,255,255,0.1) !important;
                }
            `}} />
        </div>
    );
};

export default CVViewer;
