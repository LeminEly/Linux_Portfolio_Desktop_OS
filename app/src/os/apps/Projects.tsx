import React, { useState } from 'react';
import { PROJECTS } from '../../data/content';
import {
    ArrowLeft, ChevronRight, RefreshCw, Globe, Github,
    Shield
} from 'lucide-react';

interface ProjectsAppProps {
    windowId: string;
}

const ProjectsApp: React.FC<ProjectsAppProps> = () => {
    const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

    if (selectedProject) {
        return (
            <div className="browser-app">
                {/* Browser Toolbar */}
                <div className="browser-toolbar">
                    <div className="browser-nav-btns">
                        <button className="browser-nav-btn" onClick={() => setSelectedProject(null)}>
                            <ArrowLeft size={16} />
                        </button>
                        <button className="browser-nav-btn" style={{ opacity: 0.3 }}>
                            <ChevronRight size={16} />
                        </button>
                        <button className="browser-nav-btn">
                            <RefreshCw size={14} />
                        </button>
                    </div>
                    <div className="browser-url">
                        <Globe size={14} />
                        <span>github.com/{selectedProject.github?.split('github.com/')[1] || selectedProject.id}</span>
                    </div>
                </div>

                {/* Project Detail Page */}
                <div className="browser-content" style={{ background: '#0d1117', color: '#c9d1d9' }}>
                    {/* GitHub-style header */}
                    <div style={{
                        background: selectedProject.type === 'Professional'
                            ? 'linear-gradient(135deg, #238636 0%, #1f6feb 100%)'
                            : selectedProject.type === 'Personal'
                                ? 'linear-gradient(135deg, #8957e5 0%, #f78166 100%)'
                                : 'linear-gradient(135deg, #1f6feb 0%, #58a6ff 100%)',
                        padding: '48px 32px',
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} />
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                <Shield size={20} />
                                <span style={{ fontSize: 14, opacity: 0.8 }}>{selectedProject.type}</span>
                                {selectedProject.company && (
                                    <>
                                        <span style={{ opacity: 0.5 }}>•</span>
                                        <span style={{ fontSize: 14, opacity: 0.8 }}>{selectedProject.company}</span>
                                    </>
                                )}
                                {selectedProject.duration && (
                                    <>
                                        <span style={{ opacity: 0.5 }}>•</span>
                                        <span style={{ fontSize: 14, opacity: 0.8 }}>{selectedProject.duration}</span>
                                    </>
                                )}
                            </div>
                            <h1 style={{ fontSize: 28, fontWeight: 700, color: 'white', margin: 0 }}>
                                {selectedProject.title}
                            </h1>
                        </div>
                    </div>

                    {/* Content */}
                    <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px 32px' }}>
                        {/* Readme-style card */}
                        <div style={{
                            background: '#161b22',
                            border: '1px solid #30363d',
                            borderRadius: 8,
                            padding: 24,
                            marginTop: -32,
                            position: 'relative',
                            zIndex: 2,
                        }}>
                            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: '#c9d1d9' }}>
                                README.md
                            </h2>
                            <p style={{ lineHeight: 1.7, color: '#8b949e', marginBottom: 20 }}>
                                {selectedProject.description}
                            </p>

                            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: '#c9d1d9' }}>
                                Tech Stack
                            </h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                                {selectedProject.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        style={{
                                            padding: '4px 12px',
                                            background: '#1f6feb22',
                                            color: '#58a6ff',
                                            borderRadius: 20,
                                            fontSize: 12,
                                            fontWeight: 500,
                                            border: '1px solid #1f6feb44',
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div style={{ display: 'flex', gap: 12 }}>
                                {selectedProject.github && (
                                    <a
                                        href={selectedProject.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 8,
                                            padding: '8px 20px',
                                            background: '#238636',
                                            color: 'white',
                                            borderRadius: 6,
                                            fontSize: 14,
                                            fontWeight: 600,
                                            textDecoration: 'none',
                                            transition: 'background 0.2s',
                                        }}
                                        onMouseEnter={(e) => (e.target as HTMLElement).style.background = '#2ea043'}
                                        onMouseLeave={(e) => (e.target as HTMLElement).style.background = '#238636'}
                                    >
                                        <Github size={16} />
                                        View Source
                                    </a>
                                )}
                                {!selectedProject.github && (
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        padding: '8px 20px',
                                        background: '#30363d',
                                        color: '#8b949e',
                                        borderRadius: 6,
                                        fontSize: 14,
                                    }}>
                                        <Github size={16} />
                                        Private Repository
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Project Grid View
    const academicProjects = PROJECTS.filter(p => p.type === 'Academic');
    const professionalProjects = PROJECTS.filter(p => p.type === 'Professional');
    const personalProjects = PROJECTS.filter(p => p.type === 'Personal');
    const securityProjects = PROJECTS.filter(p => p.type === 'Security');
    const openSourceProjects = PROJECTS.filter(p => p.type === 'Open Source');
    const competitionProjects = PROJECTS.filter(p => p.type === 'Competition');

    return (
        <div style={{
            height: '100%',
            overflow: 'auto',
            background: 'var(--gnome-window-bg)',
            padding: 24,
        }}>
            <h2 style={{
                fontSize: 18,
                fontWeight: 600,
                marginBottom: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                color: 'var(--text-primary)',
            }}>
                <Shield size={20} style={{ color: 'var(--kali-blue)' }} />
                My Projects
            </h2>

            {[
                { title: ' Security', projects: securityProjects, color: '#f55353' },
                { title: ' Professional', projects: professionalProjects, color: '#238636' },
                { title: ' Academic', projects: academicProjects, color: '#1f6feb' },
                { title: ' Competition', projects: competitionProjects, color: '#f0713a' },
                { title: ' Open Source', projects: openSourceProjects, color: '#8957e5' },
                { title: ' Personal', projects: personalProjects, color: '#49aee6' },
            ].map(section => section.projects.length > 0 && (
                <div key={section.title} style={{ marginBottom: 24 }}>
                    <h3 style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                        marginBottom: 12,
                    }}>
                        {section.title}
                    </h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: 12,
                    }}>
                        {section.projects.map(project => (
                            <div
                                key={project.id}
                                onClick={() => setSelectedProject(project)}
                                style={{
                                    background: 'rgba(0,0,0,0.15)',
                                    border: '1px solid rgba(255,255,255,0.04)',
                                    borderRadius: 'var(--radius-window)',
                                    padding: 16,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    borderLeft: `3px solid ${section.color}`,
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.15)';
                                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.04)';
                                }}
                            >
                                <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 6, color: 'var(--text-primary)' }}>
                                    {project.title}
                                </h4>
                                <p style={{
                                    fontSize: 12,
                                    color: 'var(--text-secondary)',
                                    lineHeight: 1.5,
                                    marginBottom: 10,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                }}>
                                    {project.description}
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                                    {project.tags.slice(0, 4).map((tag, i) => (
                                        <span
                                            key={i}
                                            style={{
                                                fontSize: 10,
                                                padding: '2px 8px',
                                                background: 'rgba(255,255,255,0.05)',
                                                borderRadius: 20,
                                                color: 'var(--text-muted)',
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProjectsApp;
