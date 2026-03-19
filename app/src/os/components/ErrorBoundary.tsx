import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: '#0000aa',
                    color: '#ffffff',
                    fontFamily: 'monospace',
                    padding: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    zIndex: 999999,
                }}>
                    <div style={{
                        backgroundColor: '#ffffff',
                        color: '#0000aa',
                        padding: '2px 20px',
                        marginBottom: '40px',
                        fontSize: '18px',
                        fontWeight: 'bold',
                    }}>
                        KALI KERNEL PANIC
                    </div>

                    <div style={{ maxWidth: '800px', fontSize: '14px', lineHeight: 1.6 }}>
                        <p style={{ marginBottom: '20px' }}>
                            A fatal error occurred at <span style={{ textDecoration: 'underline' }}>{new Date().toISOString()}</span>.
                            <br />
                            System has been halted to prevent damage.
                        </p>

                        <div style={{
                            textAlign: 'left',
                            background: 'rgba(255,255,255,0.1)',
                            padding: '20px',
                            borderRadius: '4px',
                            fontFamily: 'monospace',
                            marginBottom: '40px',
                            overflow: 'auto',
                            maxHeight: '300px'
                        }}>
                            <p>[ 0.000000] Linux version 6.5.0-kali3-amd64</p>
                            <p>[ 0.000123] Kernel Panic - not syncing: Fatal exception in interrupt</p>
                            <p>[ 0.000456] Error Details: {this.state.error?.message}</p>
                            <p>[ 0.000789] CR2: 0000000000000000 CR3: 0000000100d0a000 CR4: 00000000003706f0</p>
                            <p>[ 0.001011] Call Trace: ...</p>
                        </div>

                        <p>Please refresh the page to try again.</p>
                        <p style={{ marginTop: '20px', opacity: 0.6 }}>
                            IF PROBLEM PERSISTS, CONTACT SYSTEM ADMINISTRATOR.
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
