import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Gender } from "@/types/character";
import {
  Attributes,
  Skills,
  defaultAttributes,
  defaultSkills,
} from "@/components/character/type";

// Character creation data type
type CharacterCreateData = {
  name: string;
  gender: Gender;
  figureUrl: string;
  height: number;
  appearance: string;
  overview: string;
  attributes: Attributes;
  skills: Skills;
};

type CharacterCreateContextType = {
  step: number;
  setStep: (step: number) => void;
  name: string;
  setName: (name: string) => void;
  gender: Gender;
  setGender: (gender: Gender) => void;
  figureUrl: string;
  setFigureUrl: (url: string) => void;
  height: number;
  setHeight: (height: number) => void;
  appearance: string;
  setAppearance: (appearance: string) => void;
  overview: string;
  setOverview: (overview: string) => void;
  attributes: Attributes;
  setAttributes: (attributes: Attributes) => void;
  skills: Skills;
  setSkills: (skills: Skills) => void;
  getCreateData: () => CharacterCreateData;
  reset: () => void;
};

const CharacterCreateContext = createContext<
  CharacterCreateContextType | undefined
>(undefined);

export function CharacterCreateProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [figureUrl, setFigureUrl] = useState("");
  const [height, setHeight] = useState(170);
  const [appearance, setAppearance] = useState("");
  const [overview, setOverview] = useState("");
  const [attributes, setAttributes] = useState<Attributes>(defaultAttributes);
  const [skills, setSkills] = useState<Skills>(defaultSkills);

  const getCreateData = useCallback((): CharacterCreateData => {
    return {
      name,
      gender,
      figureUrl,
      height,
      appearance,
      overview,
      attributes,
      skills,
    };
  }, [
    name,
    gender,
    figureUrl,
    height,
    appearance,
    overview,
    attributes,
    skills,
  ]);

  const reset = useCallback(() => {
    setStep(0);
    setName("");
    setGender(Gender.MALE);
    setFigureUrl("");
    setHeight(170);
    setAppearance("");
    setOverview("");
    setAttributes(defaultAttributes);
    setSkills(defaultSkills);
  }, []);

  const value = {
    step,
    setStep,
    name,
    setName,
    gender,
    setGender,
    figureUrl,
    setFigureUrl,
    height,
    setHeight,
    appearance,
    setAppearance,
    overview,
    setOverview,
    attributes,
    setAttributes,
    skills,
    setSkills,
    getCreateData,
    reset,
  };

  return (
    <CharacterCreateContext.Provider value={value}>
      {children}
    </CharacterCreateContext.Provider>
  );
}

export function useCharacterCreate() {
  const context = useContext(CharacterCreateContext);
  if (context === undefined) {
    throw new Error(
      "useCharacterCreate must be used within a CharacterCreateProvider",
    );
  }
  return context;
}
