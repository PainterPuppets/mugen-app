import { ReactNode } from "react";
import { CharacterProvider } from "./CharacterContext";
import { CharacterResourceProvider } from "./CharacterResourceContext";

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <CharacterProvider>
      <CharacterResourceProvider>
        {children}
      </CharacterResourceProvider>
    </CharacterProvider>
  );
}