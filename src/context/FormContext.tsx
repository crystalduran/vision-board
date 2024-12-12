import { createContext } from 'react';
import { FormContextType } from '../interfaces/form';

export const FormContext = createContext<FormContextType | undefined>(undefined);

