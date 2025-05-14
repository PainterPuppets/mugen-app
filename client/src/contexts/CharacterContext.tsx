import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { apiRequest } from "@/lib/queryClient";
import { BaseAttributeType, Gender } from "@/types/character";
import { IMugenCharacter } from "@/types/mugen";

import { SkillFlag, SkillMajor } from "@/types/skill";
import { Skills, Attributes } from "@/components/character/type";


// Types
type UpdateCharacterData = {
  figureUrl?: string;
  appearance?: string;
  overview?: string;
  gender?: string;
  name?: string;
};

type CreateCharacterData = {
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
  createCharacter: (data: CreateCharacterData) => Promise<void>;
  updateCharacter: (uuid: string, data: UpdateCharacterData) => Promise<void>;
  upgradeAttribute: (
    characterUuid: string,
    attribute: BaseAttributeType,
    method: "experience" | "credit"
  ) => Promise<any>;
  upgradeSkill: (characterUuid: string, flag: SkillFlag) => Promise<any>;
  getSkillMajor: (characterUuid: string, flag: SkillMajor) => Promise<any>;
  updateCharacterData: (data: IMugenCharacter) => void;
  transfer: (characterUuid: string, targetUuid: string, credit: number) => Promise<any>;
  delete: (characterUuid: string) => Promise<void>;
  reset: () => void;
};

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export function CharacterProvider({ children }: { children: ReactNode }) {
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState<IMugenCharacter[]>([]);

  const [detailInitialized, setDetailInitialized] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [characterDetail, setCharacterDetail] = useState<IMugenCharacter | undefined>(undefined);

  const detailReady = detailInitialized && !detailLoading;

  const initCharacterList = useCallback(async () => {
    if (initialized) {
      return;
    }

    return fetchCharacterList();
  }, [initialized]);

  const fetchCharacterList = useCallback(async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const res = await apiRequest("GET", `/api/character/`);
      const data = await res.json();
      setCharacters(data);
      setInitialized(true);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const fetchCharacterDetail = useCallback(async (uuid: string) => {
    if (detailLoading) {
      return Promise.reject("正在获取角色信息");
    }

    const index = characters.findIndex(c => c.uuid === uuid);
    if (index !== -1) {
      setCharacterDetail(characters[index]);
      setDetailInitialized(true);
      return;
    }

    setDetailLoading(true);
    try {
      const res = await apiRequest("GET", `/api/character/${uuid}/`);
      const data = await res.json();
      setCharacterDetail(data);
      setDetailInitialized(true);
    } finally {
      setDetailLoading(false);
    }
  }, [detailLoading, characters]);

  const refreshCharacterData = useCallback(async () => {
    if (!characterDetail) {
      return;
    }

    const res = await apiRequest("GET", `/api/character/${characterDetail.uuid}/`);
    const data = await res.json();
    setCharacterDetail(data);
  }, [characterDetail]);

  const createCharacter = useCallback(async (data: CreateCharacterData) => {
    const res = await apiRequest("POST", `/api/character/`, data);
    const responseData = await res.json();
    setCharacterDetail(responseData);
  }, []);

  const updateCharacter = useCallback(async (uuid: string, data: UpdateCharacterData) => {
    const res = await apiRequest("PATCH", `/api/character/${uuid}/`, data);
    const responseData = await res.json();
    setCharacterDetail(responseData);
  }, []);

  const upgradeAttribute = useCallback(async (
    characterUuid: string,
    attribute: BaseAttributeType,
    method: "experience" | "credit"
  ) => {
    return apiRequest("POST", `/api/character/${characterUuid}/upgrade_attribute/`, { attribute, method });
  }, []);

  const upgradeSkill = useCallback(async (characterUuid: string, flag: SkillFlag) => {
    return apiRequest("POST", `/api/character/${characterUuid}/upgrade_skill/`, { skill_flag: flag });
  }, []);

  const getSkillMajor = useCallback(async (characterUuid: string, flag: SkillMajor) => {
    return apiRequest("POST", `/api/character/${characterUuid}/get_skill_major/`, { major_flag: flag });
  }, []);

  const updateCharacterData = useCallback((data: IMugenCharacter) => {
    setCharacterDetail({...data});
    
    setCharacters(prev => {
      const index = prev.findIndex(c => c.uuid === data.uuid);
      if (index !== -1) {
        const newCharacters = [...prev];
        newCharacters[index] = data;
        return newCharacters;
      }
      return prev;
    });
  }, []);

  const transfer = useCallback(async (characterUuid: string, targetUuid: string, credit: number) => {
    return apiRequest("POST", `/api/character/${characterUuid}/transfer/`, { 
      target_uuid: targetUuid,
      transfer_credit: credit,
    });
  }, []);

  const deleteCharacter = useCallback(async (characterUuid: string) => {
    await apiRequest("DELETE", `/api/character/${characterUuid}/`);
    setCharacters(prev => prev.filter(c => c.uuid !== characterUuid));
  }, []);

  const reset = useCallback(() => {
    setInitialized(false);
    setLoading(false);
    setCharacters([]);
    setCharacterDetail(undefined);
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
    reset
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