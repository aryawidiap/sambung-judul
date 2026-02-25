import { createContext } from "react";

export type LanguageContextType = 'en' | 'id';
const LanguageContext = createContext<LanguageContextType>('en');

export default LanguageContext;