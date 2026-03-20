import React, { useState } from 'react';
import { PROFILE } from '../../data/content';
import { FileText, Download, ExternalLink, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';

interface CVViewerProps {
    windowId: string;
}

const CVViewer: React.FC<CVViewerProps> = () => {
    const [zoom, setZoom] = useState(100);
    const PDF_URL = '/cv/cv.pdf';

    const handleZoomIn = () => setZoom(z => Math.min(z + 10, 200));
    const handleZoomOut = () => setZoom(z => Math.max(z - 10, 50));

    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: '#2b2b2b',
        }}>
            {/* ── Toolbar ─────────────────────────────────────── */}
            <div style={{
                height: 44,
                background: '#1e1e1e',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                gap: 8,
                flexShrink: 0,
                userSelect: 'none',
            }}>
                {/* File info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 16 }}>
                    <div style={{
                        width: 28, height: 28, borderRadius: 6,
                        background: 'rgba(245, 83, 83, 0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <FileText size={14} style={{ color: '#f55353' }} />
                    </div>
                    <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: '#c9d1d9', lineHeight: 1 }}>
                            {PROFILE.name.replace(' ', '_')}_CV.pdf
                        </div>
                        <div style={{ fontSize: 10, color: '#565f89', marginTop: 2 }}>
                            Adobe PDF Document
                        </div>
                    </div>
                </div>

                {/* Separator */}
                <div style={{ flex: 1 }} />

                {/* Zoom controls */}
                <div style={{
                    display: 'flex', alignItems: 'center',
                    background: '#333', borderRadius: 6, overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.08)',
                }}>
                    <button
                        onClick={handleZoomOut}
                        style={{
                            padding: '6px 10px', background: 'none', border: 'none',
                            color: '#9aa5ce', cursor: 'pointer', display: 'flex', alignItems: 'center',
                            transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#444')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                    >
                        <ZoomOut size={14} />
                    </button>
                    <span style={{
                        fontSize: 12, color: '#c9d1d9', padding: '0 10px',
                        borderLeft: '1px solid rgba(255,255,255,0.1)',
                        borderRight: '1px solid rgba(255,255,255,0.1)',
                        minWidth: 48, textAlign: 'center',
                    }}>
                        {zoom}%
                    </span>
                    <button
                        onClick={handleZoomIn}
                        style={{
                            padding: '6px 10px', background: 'none', border: 'none',
                            color: '#9aa5ce', cursor: 'pointer', display: 'flex', alignItems: 'center',
                            transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#444')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                    >
                        <ZoomIn size={14} />
                    </button>
                </div>

                {/* Separator */}
                <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.08)', margin: '0 8px' }} />

                {/* Open in new tab */}
                <a
                    href={PDF_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        padding: '6px 12px', borderRadius: 6,
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#9aa5ce', fontSize: 12, fontWeight: 500,
                        textDecoration: 'none', cursor: 'pointer',
                        transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)';
                        (e.currentTarget as HTMLElement).style.color = '#c9d1d9';
                    }}
                    onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                        (e.currentTarget as HTMLElement).style.color = '#9aa5ce';
                    }}
                >
                    <ExternalLink size={14} />
                    Open
                </a>

                {/* Download button */}
                <a
                    href={PDF_URL}
                    download={`${PROFILE.name.replace(' ', '_')}_CV.pdf`}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        padding: '6px 14px', borderRadius: 6,
                        background: 'linear-gradient(135deg, #3d8ef0, #2563eb)',
                        color: 'white', fontSize: 12, fontWeight: 600,
                        textDecoration: 'none', cursor: 'pointer',
                        transition: 'all 0.15s',
                        boxShadow: '0 2px 8px rgba(61, 142, 240, 0.3)',
                    }}
                    onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(61, 142, 240, 0.5)';
                    }}
                    onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                        (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(61, 142, 240, 0.3)';
                    }}
                >
                    <Download size={14} />
                    Download CV
                </a>
            </div>

            {/* ── PDF Viewer ─────────────────────────────────── */}
            <div style={{
                flex: 1,
                overflow: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: '24px',
                background: '#404040',
            }}>
                <div style={{
                    width: `${zoom}%`,
                    maxWidth: '100%',
                    minHeight: '100%',
                    transform: 'none',
                    transition: 'width 0.2s ease',
                }}>
                    <iframe
                        src={`${PDF_URL}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                        style={{
                            width: '100%',
                            height: '100vh',
                            minHeight: 800,
                            border: 'none',
                            borderRadius: 4,
                            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                            display: 'block',
                        }}
                        title="CV PDF Viewer"
                    />
                </div>
            </div>
        </div>
    );
};

export default CVViewer;
