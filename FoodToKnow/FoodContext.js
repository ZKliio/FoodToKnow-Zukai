import { createContext, useState } from "react";

const FoodType = createContext();

const FoodContext = ({ children }) => {
  const [userId, setUserId] = useState("");
  return (
    <FoodType.Provider value={{ userId, setUserId }}>
      {children}
    </FoodType.Provider>
  );
};

export { FoodType, FoodContext };