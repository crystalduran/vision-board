import { useState } from "react";
import './Form.css';
import { StartForm } from '../../components/start-form/StartForm';
import { HomeForm } from "../../components/home-form/HomeForm";
import { CareerForm } from "../../components/career-form/CareerForm";

export function Form() {
    const [step, setStep] = useState(1);

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
            default:
                return <h2>¡Gracias por completar el formulario!</h2>;
        }
    };

    return (
        <>
            <div className="circle-blur circle-first"></div>
            <div className="circle-blur circle-second"></div>
            <header className="header-form">
                <h1>DreamCraft</h1>
                <img src="/Logo.svg" alt="sparkles by svgrepo" width={60} height={60} />
            </header>

            <main className="form-container">
                <section>
                    {renderStep()}
                    <div className="buttons-container" style={step === 1 ? { justifyContent: "flex-end" } : {}}>
                        {step > 1 && <button onClick={prevStep} className='button-back'>{' < '} Back</button>}
                        {step < 3 && <button onClick={nextStep} className='button-next'>Next {' > '}</button>}
                    </div>
                </section>
            </main>
        </>
    );
}