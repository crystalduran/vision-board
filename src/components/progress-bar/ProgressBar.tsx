interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}
export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
    const progressPercentage = (currentStep / totalSteps) * 100; 
    const formattedPercentage = progressPercentage.toFixed(0);
    return (
        <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${formattedPercentage}%` }}></div>
        </div>
    );
}