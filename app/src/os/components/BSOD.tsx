import React from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '../../store/useOSStore';

const BSOD: React.FC = () => {
    const { dismissBSOD } = useOSStore();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bsod-overlay"
            onClick={() => {
                // Secret way to recover: click anywhere (or the user might just refresh)
                dismissBSOD();
                window.location.reload();
            }}
        >
            <div className="bsod-content">
            <div className="bsod-header">:(</div>
            <h1>YOU DELETED ALL FILES OF LEMIN ELY!</h1>
            <p>What you just did... you will pay dearly for it. Hhhhhh!</p>
            <p style={{ marginTop: '1rem' }}>Your arrogance has caused an irreversible system failure.</p>

            <div className="bsod-percentage">Complete destruction: 100%</div>

            <div className="bsod-footer">
                <div className="bsod-qr-placeholder">
                    <div className="qr-grid">
                        {[...Array(25)].map((_, i) => (
                            <div key={i} className={`qr-pixel ${Math.random() > 0.4 ? 'black' : ''}`} />
                        ))}
                    </div>
                </div>
                <div className="bsod-info">
                    <p>Lemin Ely's system has been completely wiped out by your rm -rf / command.</p>
                    <p>Incident report sent to administrator: <strong>LEMIN_ELY_DATABASE_NUKED</strong></p>
                    <p>Stop code: <strong>USER_IS_A_TROLL_HHHHH</strong></p>
                </div>
            </div>

            <p style={{ marginTop: '3rem', fontSize: '1.1rem', fontWeight: 'bold', color: '#ffeb3b' }}>
                Click anywhere to attempt a desperate recovery...
                </p>
            </div>
        </motion.div>
    );
};

export default BSOD;
