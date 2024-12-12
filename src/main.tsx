import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css';
import { FormProvider } from './context/FormProvider';
import { ProtectedRoute } from './components/ProtectedRoute';
import Home from './pages/home/Home';
import { Form } from './pages/form/Form';
import { Result } from './pages/result/Result';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FormProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="create" element={<Form />} />
          <Route path="result" element={<ProtectedRoute><Result/></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </FormProvider>
  </StrictMode>,
)
