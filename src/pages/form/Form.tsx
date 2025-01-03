import { useState } from "react";
import { useFormContext } from "../../hooks/useFormContext";
import './Form.css';
import { Link } from "react-router";
import { StartForm } from '../../components/start-form/StartForm';
import { HomeForm } from "../../components/home-form/HomeForm";
import { CareerForm } from "../../components/career-form/CareerForm";
import { LifestyleForm } from "../../components/lifestyle-form/LifestyleForm";
import { OutfitsForms } from "../../components/outfits-form/OutfitsForm";
import { AffirmationsForm } from "../../components/affirmations-form/AffirmationsForm";
import { ExperiencesForm } from "../../components/experiences-form/ExperiencesForm";
import { CarForm } from "../../components/car-form/CarForm";
import { TechForm } from "../../components/tech-form/TechForm";
import { ProgressBar } from "../../components/progress-bar/ProgressBar";
import { HealthForm } from "../../components/health-form/HealthForm";
import { CustomForm } from "../../components/custom-form/CustomForm";

export function Form() {
    const { formData } = useFormContext();
    const [step, setStep] = useState(1);
    const totalSteps = 11;

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);
    const renderStep = () => {
        switch (step) {
            case 1:
                return <StartForm />;
            case 2:
                return <HomeForm />
            case 3:
                return <CareerForm />
            case 4:
                return <LifestyleForm />
            case 5:
                return <OutfitsForms />
            case 6:
                return <AffirmationsForm />
            case 7:
                return <ExperiencesForm />
            case 8:
                return <CarForm />
            case 9:
                return <TechForm />
            case 10:
                return <HealthForm />
            case 11:
                return <CustomForm />
            default:
                return <h2>Thank you!</h2>;
        }
    };

    // verificar si hay algún valor vacío en formData
    const hasEmptyFields = Object.values(formData).some((value) => {
        if (Array.isArray(value)) {
            return value.length === 0 || value.some((item) => typeof item === 'string' && item.trim() === '');
        }
        return typeof value === 'string' && value.trim() === '';
    });

    return (
        <>
            <div className="circle-blur circle-first"></div>
            <div className="circle-blur circle-second"></div>
            <header>
                <a href="/" style={{ backgroundColor: 'transparent' }}><img className='logo' src="/Logo.svg" alt="logo sparkles" width={60} height={60} /></a>
            </header>

            <ProgressBar currentStep={step} totalSteps={totalSteps} />
            <main className="form-container">
                <section>
                    {renderStep()}
                    <div className="buttons-container" style={step === 1 ? { justifyContent: "flex-end" } : {}}>
                        {step > 1 && <button onClick={prevStep} className='button-back'>{' < '} Back</button>}
                        {step < totalSteps && <button onClick={nextStep} className='button-next'>Next {' > '}</button>}
                        {step === totalSteps && (hasEmptyFields ? (
                            <p style={{ color: 'red', fontSize: '12px' }}>Please fill in all fields.</p>
                        ) : (
                            <Link to="/result" className="button-finish">Finish</Link>
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}