import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { BaseAttributeType, Gender, Attributes } from "@/types/character";
import { SkillFlag, SkillMajor } from "@/types/skill";

// Default attributes
const defaultAttributes: Attributes = {
  strength: 1,
  dexterity: 1,
  constitution: 1,
  intelligence: 1,
  perception: 1
};

// Character creation data type
type CharacterCreateData = {
  name: string;
  gender: Gender;
  figure_url: string;
  height: number;
  appearance: string;
  overview: string;
  attributes: Attributes;
  skills: Array<{
    flag: SkillFlag;
    grade: number;
    majors: Array<SkillMajor>;
  }>;
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
  skills: Array<{
    flag: SkillFlag;
    grade: number;
    majors: Array<SkillMajor>;
  }>;
  setSkills: (skills: Array<{
    flag: SkillFlag;
    grade: number;
    majors: Array<SkillMajor>;
  }>) => void;
  getCreateData: () => CharacterCreateData;
  reset: () => void;
};

const CharacterCreateContext = createContext<CharacterCreateContextType | undefined>(undefined);

export function CharacterCreateProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [gender, setGender] = useState<Gender>("M");
  const [figureUrl, setFigureUrl] = useState("");
  const [height, setHeight] = useState(170);
  const [appearance, setAppearance] = useState("");
  const [overview, setOverview] = useState("");
  const [attributes, setAttributes] = useState<Attributes>(defaultAttributes);
  const [skills, setSkills] = useState<Array<{
    flag: SkillFlag;
    grade: number;
    majors: Array<SkillMajor>;
  }>>([]);

  const getCreateData = useCallback((): CharacterCreateData => {
    return {
      name,
      gender,
      figure_url: figureUrl,
      height,
      appearance,
      overview,
      attributes,
      skills
    };
  }, [name, gender, figureUrl, height, appearance, overview, attributes, skills]);

  const reset = useCallback(() => {
    setStep(0);
    setName("");
    setGender("M");
    setFigureUrl("");
    setHeight(170);
    setAppearance("");
    setOverview("");
    setAttributes(defaultAttributes);
    setSkills([]);
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
    reset
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
    throw new Error("useCharacterCreate must be used within a CharacterCreateProvider");
  }
  return context;
}