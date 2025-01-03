import { Config } from "../../types/config";
import styles from './ConfigPanel.module.css';

type ConfigPanelProps = {
    config: Config;
    onConfigChange: (newConfig: Partial<Config>) => void;
};


export const ConfigPanel = ({ config, onConfigChange }: ConfigPanelProps) => {
    return (
        <div className={styles.configPanel}>
            <h2>Customize your vision board</h2>
            {/* Theme */}
            <div className={styles.individualConfigContainer}>
                <label>
                    Theme
                </label>
                <input
                    type="radio"
                    name="theme"
                    value="Light"
                    id="light"
                    checked={config.theme === "light"}
                    onChange={() => onConfigChange({ theme: "light" })}
                />
                <label htmlFor="light" style={{display: 'inline', marginRight: '5px'}}>Light</label>
                <input
                    type="radio"
                    name="theme"
                    value="Dark"
                    id="dark"
                    checked={config.theme === "dark"}
                    onChange={() => onConfigChange({ theme: "dark" })}
                />
                <label htmlFor="dark" style={{display: 'inline'}}>Dark</label>
            </div>

            {/* Text size */}
            <div className={styles.individualConfigContainer}>
                <label>
                    Font size
                </label>
                <select
                    value={config.fontSize}
                    onChange={(e) => onConfigChange({ fontSize: e.target.value as Config['fontSize'] })}
                >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>
            </div>

            {/* Font style */}
            <div className={styles.individualConfigContainer}>
                <label>
                    Font style
                </label>
                <select
                    value={config.fontFamily}
                    onChange={(e) => onConfigChange({ fontFamily: e.target.value as Config['fontFamily'] })}
                >
                    <option value="default">Default</option>
                    <option value="serif">Serif</option>
                    <option value="sans-serif">Sans-serif</option>
                </select>
            </div>
        </div>
    );
}