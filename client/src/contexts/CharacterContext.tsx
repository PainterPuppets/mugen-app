
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { BaseAttributeType, Gender } from "@/types/character";
import { IMugenCharacter } from "@/types/mugen";
import { SkillFlag, SkillMajor } from "@/types/skill";
import { Skills, Attributes } from "@/components/character/type";

type CharacterData = {
  name: string;
  gender: Gender;
  figureUrl: string;
  height: number;
  appearance: string;
  overview: string;
  attributes: Attributes;
  skills: Skills;
};

type CharacterContextType = {
  initialized: boolean;
  loading: boolean;
  characters: IMugenCharacter[];
  detailInitialized: boolean;
  detailLoading: boolean;
  characterDetail?: IMugenCharacter;
  detailReady: boolean;
  initCharacterList: () => Promise<void>;
  fetchCharacterList: () => Promise<void>;
  fetchCharacterDetail: (uuid: string) => Promise<void>;
  refreshCharacterData: () => Promise<void>;
  createCharacter: (data: CharacterData) => Promise<void>;
  updateCharacter: (uuid: string, data: CharacterData) => Promise<void>;
  upgradeAttribute: (
    characterUuid: string,
    attribute: BaseAttributeType,
    method: "experience" | "credit",
  ) => Promise<any>;
  upgradeSkill: (characterUuid: string, flag: SkillFlag) => Promise<any>;
  getSkillMajor: (characterUuid: string, flag: SkillMajor) => Promise<any>;
  updateCharacterData: (data: IMugenCharacter) => void;
  transfer: (
    characterUuid: string,
    targetUuid: string,
    credit: number,
  ) => Promise<any>;
  delete: (characterUuid: string) => Promise<void>;
  reset: () => void;
};

const STORAGE_KEY = 'mugen_characters';

const CharacterContext = createContext<CharacterContextType | undefined>(
  undefined,
);

function getStoredCharacters(): IMugenCharacter[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveCharacters(characters: IMugenCharacter[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
}

export function CharacterProvider({ children }: { children: ReactNode }) {
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState<IMugenCharacter[]>([]);
  const [detailInitialized, setDetailInitialized] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [characterDetail, setCharacterDetail] = useState<IMugenCharacter | undefined>(undefined);

  const detailReady = detailInitialized && !detailLoading;

  const initCharacterList = useCallback(async () => {
    if (initialized) return;
    return fetchCharacterList();
  }, [initialized]);

  const fetchCharacterList = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const storedCharacters = getStoredCharacters();
      setCharacters(storedCharacters);
      setInitialized(true);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const fetchCharacterDetail = useCallback(async (uuid: string) => {
    if (detailLoading) {
      return Promise.reject("正在获取角色信息");
    }

    const character = characters.find(c => c.uuid === uuid);
    if (character) {
      setCharacterDetail(character);
      setDetailInitialized(true);
      return;
    }
    return Promise.reject("未找到角色");
  }, [detailLoading, characters]);

  const refreshCharacterData = useCallback(async () => {
    if (!characterDetail) return;
    const character = characters.find(c => c.uuid === characterDetail.uuid);
    if (character) {
      setCharacterDetail(character);
    }
  }, [characterDetail, characters]);

  const createCharacter = useCallback(async (data: CharacterData) => {
    const newCharacter: IMugenCharacter = {
      uuid: crypto.randomUUID(),
      ...data,
      credit: 0,
      experience: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const updatedCharacters = [...characters, newCharacter];
    setCharacters(updatedCharacters);
    saveCharacters(updatedCharacters);
    setCharacterDetail(newCharacter);
  }, [characters]);

  const updateCharacter = useCallback(async (uuid: string, data: CharacterData) => {
    const updatedCharacters = characters.map(c => {
      if (c.uuid === uuid) {
        const updated = {
          ...c,
          ...data,
          updatedAt: new Date().toISOString(),
        };
        setCharacterDetail(updated);
        return updated;
      }
      return c;
    });
    setCharacters(updatedCharacters);
    saveCharacters(updatedCharacters);
  }, [characters]);

  const upgradeAttribute = useCallback(async (
    characterUuid: string,
    attribute: BaseAttributeType,
    method: "experience" | "credit",
  ) => {
    const updatedCharacters = characters.map(c => {
      if (c.uuid === characterUuid) {
        const updated = {
          ...c,
          attributes: {
            ...c.attributes,
            [attribute]: c.attributes[attribute] + 1
          },
          [method]: method === "experience" ? c.experience - 1 : c.credit - 1,
          updatedAt: new Date().toISOString(),
        };
        setCharacterDetail(updated);
        return updated;
      }
      return c;
    });
    setCharacters(updatedCharacters);
    saveCharacters(updatedCharacters);
  }, [characters]);

  const upgradeSkill = useCallback(async (characterUuid: string, flag: SkillFlag) => {
    const updatedCharacters = characters.map(c => {
      if (c.uuid === characterUuid) {
        const updated = {
          ...c,
          skills: {
            ...c.skills,
            [flag]: (c.skills[flag] || 0) + 1
          },
          updatedAt: new Date().toISOString(),
        };
        setCharacterDetail(updated);
        return updated;
      }
      return c;
    });
    setCharacters(updatedCharacters);
    saveCharacters(updatedCharacters);
  }, [characters]);

  const getSkillMajor = useCallback(async (characterUuid: string, flag: SkillMajor) => {
    const updatedCharacters = characters.map(c => {
      if (c.uuid === characterUuid) {
        const updated = {
          ...c,
          skills: {
            ...c.skills,
            [flag]: true
          },
          updatedAt: new Date().toISOString(),
        };
        setCharacterDetail(updated);
        return updated;
      }
      return c;
    });
    setCharacters(updatedCharacters);
    saveCharacters(updatedCharacters);
  }, [characters]);

  const updateCharacterData = useCallback((data: IMugenCharacter) => {
    setCharacterDetail(data);
    setCharacters(prev => {
      const updated = prev.map(c => c.uuid === data.uuid ? data : c);
      saveCharacters(updated);
      return updated;
    });
  }, []);

  const transfer = useCallback(async (
    characterUuid: string,
    targetUuid: string,
    credit: number,
  ) => {
    const updatedCharacters = characters.map(c => {
      if (c.uuid === characterUuid) {
        return { ...c, credit: c.credit - credit };
      }
      if (c.uuid === targetUuid) {
        return { ...c, credit: c.credit + credit };
      }
      return c;
    });
    setCharacters(updatedCharacters);
    saveCharacters(updatedCharacters);
  }, [characters]);

  const deleteCharacter = useCallback(async (characterUuid: string) => {
    const updatedCharacters = characters.filter(c => c.uuid !== characterUuid);
    setCharacters(updatedCharacters);
    saveCharacters(updatedCharacters);
    if (characterDetail?.uuid === characterUuid) {
      setCharacterDetail(undefined);
    }
  }, [characters, characterDetail]);

  const reset = useCallback(() => {
    setInitialized(false);
    setLoading(false);
    setCharacters([]);
    setCharacterDetail(undefined);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = {
    initialized,
    loading,
    characters,
    detailInitialized,
    detailLoading,
    characterDetail,
    detailReady,
    initCharacterList,
    fetchCharacterList,
    fetchCharacterDetail,
    refreshCharacterData,
    createCharacter,
    updateCharacter,
    upgradeAttribute,
    upgradeSkill,
    getSkillMajor,
    updateCharacterData,
    transfer,
    delete: deleteCharacter,
    reset,
  };

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacter() {
  const context = useContext(CharacterContext);
  if (context === undefined) {
    throw new Error("useCharacter must be used within a CharacterProvider");
  }
  return context;
}
