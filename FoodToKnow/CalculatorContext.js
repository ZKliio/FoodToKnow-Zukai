import { createContext, useState } from "react";

export const CalculatorContext = createContext();

export const CalculatorProvider = ({ children }) => {
    const [caloriesValue, setCaloriesValue] = useState('');
    const [proteinsValue, setProteinsValue] = useState('');
    return (
      <CalculatorContext.Provider value={{ caloriesValue, setCaloriesValue, proteinsValue, setProteinsValue }}>
        {children}
      </CalculatorContext.Provider>
    );
  };
  
