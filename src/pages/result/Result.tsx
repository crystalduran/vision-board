import { useState, useRef } from "react";
import { VisionBoard } from "../../components/vision-board/VisionBoard";
import { ConfigPanel } from "../../components/config-panel/ConfigPanel";
import { exportElementAsImage } from "../../utils/exportElementAsImage.ts";
import styles from './Result.module.css';
import { Link } from "react-router";
import { Config } from "../../types/config";
import { Footer } from "../../components/footer/Footer.tsx";

export function Result() {
    const [config, setConfig] = useState<Config>({
        theme: 'light',
        fontSize: 'medium',
        fontFamily: 'default',
    });
    const visionBoardRef = useRef<HTMLDivElement>(null);


    const handleConfigChange = (newConfig: Partial<Config>) => {
        setConfig((prevConfig) => ({
            ...prevConfig,
            ...newConfig,
        }));
    };

    const handleExportClick = () => {
        if (visionBoardRef.current) {
            exportElementAsImage(visionBoardRef.current, {
                fileName: 'vision-board',
                format: 'png',
                scale: 2,
            });
        }
    };

    return (
        <>
            <header className={styles.headerResult}>
                <a href="/" style={{ backgroundColor: 'transparent' }}><img className='logo' src="/Logo.svg" alt="logo sparkles" width={60} height={60} /></a>
            </header>
            <div className={styles.titleResult}>
                <h2>Result</h2>
                <p style={{ display: 'inline' }}>If you want to change or add differents images on your vision board
                    <Link to="/create" className={styles.anchor}>you can go back here</Link></p>
            </div>

            {/* Botones */}
            <div className={styles.buttonDownloadContainer}>
                <button className={styles.buttonDownload} onClick={handleExportClick}><img src="/Download.svg" width={20} height={20} alt="Download svg"/><span>Download Image</span></button>
            </div>
            <main className={styles.resultContainer}>
                <VisionBoard ref={visionBoardRef} config={config} />
                <div>
                    <ConfigPanel config={config} onConfigChange={handleConfigChange} />
                </div>
            </main>
            <Footer />
        </>
    );
};
