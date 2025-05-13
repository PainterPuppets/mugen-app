import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { apiRequest } from "@/lib/queryClient";
import { IResourceRecord } from "@/types/mugen";

type CharacterResourceContextType = {
  initialized: boolean;
  loading: boolean;
  records: IResourceRecord[];
  ready: boolean;
  fetchRecords: (characterUuid: string) => Promise<void>;
  reset: () => void;
};

const CharacterResourceContext = createContext<CharacterResourceContextType | undefined>(undefined);

export function CharacterResourceProvider({ children }: { children: ReactNode }) {
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState<IResourceRecord[]>([]);

  const ready = initialized && !loading;

  const fetchRecords = useCallback(async (characterUuid: string) => {
    if (loading) {
      return Promise.reject("正在获取积分记录");
    }
    
    setLoading(true);
    try {
      const res = await apiRequest("GET", `/api/record?character__uuid=${characterUuid}`);
      const data = await res.json();
      setRecords(data);
      setInitialized(true);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const reset = useCallback(() => {
    setInitialized(false);
    setLoading(false);
    setRecords([]);
  }, []);

  const value = {
    initialized,
    loading,
    records,
    ready,
    fetchRecords,
    reset
  };

  return (
    <CharacterResourceContext.Provider value={value}>
      {children}
    </CharacterResourceContext.Provider>
  );
}

export function useCharacterResource() {
  const context = useContext(CharacterResourceContext);
  if (context === undefined) {
    throw new Error("useCharacterResource must be used within a CharacterResourceProvider");
  }
  return context;
}