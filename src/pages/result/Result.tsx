import { useState } from "react";
import { VisionBoard } from "../../components/vision-board/VisionBoard";
import { ConfigPanel } from "../../components/config-panel/ConfigPanel";
import styles from './Result.module.css';
import { Link } from "react-router";
import { Config } from "../../types/config";

export function Result() {
    const [config, setConfig] = useState<Config>({
        theme: 'light',
        fontSize: 'medium',
        fontFamily: 'default',
        showStickers: true,
    });

    const handleConfigChange = (newConfig: Partial<Config>) => {
        setConfig((prevConfig) => ({
            ...prevConfig,
            ...newConfig,
        }));
    };
    return (
        <>
            <header className={styles.headerResult}>
                {/* <h1>DreamCraft</h1> */}
                <img src="/Logo.svg" alt="sparkles by svgrepo" width={60} height={60} />
            </header>
            <div className={styles.titleResult}>
                <h2>Result</h2>
                <p style={{ display: 'inline' }}>If you want to change or add differents images on your vision board
                    <Link to="/create" className={styles.anchor}>you can go back here</Link></p>
            </div>
            <main className={styles.resultContainer}>
                <VisionBoard config={config} />
                <div>
                    <ConfigPanel config={config} onConfigChange={handleConfigChange} />

                    {/* Botones */}
                    <div className="button-container-result">
                        <button>Download</button>
                    </div>
                </div>
            </main>

            <footer>
                Made by Crystal Durán
            </footer>
        </>
    );
};
