import { createContext, useState, ReactNode, useContext } from "react";
import { PlantData } from "./types/types";


export const AppContext = createContext<{
	allPlants: PlantData[];
	setAllPlants: React.Dispatch<React.SetStateAction<PlantData[]>>;
} | undefined>(undefined);


export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [allPlants, setAllPlants] = useState<PlantData[]>([]);

  return (
    <AppContext.Provider value={{ allPlants, setAllPlants }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): {
	allPlants: PlantData[];
	setAllPlants: React.Dispatch<React.SetStateAction<PlantData[]>>;
} => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Failed to use context!");
  }
  return context;
};