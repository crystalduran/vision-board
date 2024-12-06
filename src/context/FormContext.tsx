import { createContext } from 'react';
import { FormContextType } from '../interfaces/interfaces';

export const FormContext = createContext<FormContextType | undefined>(undefined);

