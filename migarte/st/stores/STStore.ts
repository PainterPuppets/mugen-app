import { observable, action, computed } from "mobx";
import BaseProvider from "@/utils/BaseProvider";
import { 
  DamageDegree,
  DamageType,
  DefensePosture
} from "@/interfaces/character";
import { IMugenCharacter, CharacterType } from "@/interfaces/mugen";
import { keysToUnderline } from "@/utils/helper";

export type combatData = {
  attackId: number;
  targetUuid: string;
  attackExtraDice?: number;
  attackExtraSuccess?: number;
  defensePosture?: DefensePosture;
  defenseExtraDice?: number;
  defenseExtraSuccess?: number;
};

export type UpdateStatusData = {
  damages?: Array<{
    degree: DamageDegree,
    count: number,
  }>;
  currentWill?: number;
};

export type Damage = {
  count: number;
  degree: DamageDegree;
  type?: DamageType;
};

export type combatReault = {
  isHit: boolean;
  damageList: Array<Damage>;
};

class InventoryStore {
  @observable initialized = false;
  @observable loading = false;
  @observable characters: IMugenCharacter[] = [];
  @observable initiative: any = 0;
  @observable initiativeSet: any = {};

  // @computed get sortedCharacters() {
  //   return this.characters.sort((a, b) => {
  //     return a.attributes.initiative + this.getInitiative(a.uuid) - b.attributes
  //   })
  // }

  @computed get players() {
    return this.characters.filter((c) => c.type === CharacterType.PLAYER);
  }

  @computed get npcs() {
    return this.characters.filter((c) => c.type === CharacterType.NPC);
  }

  @action getCharacter = (uuid: string) => {
    const index = this.characters.findIndex((c) => c.uuid === uuid);
    if (index === -1) {
      throw new Error("该角色不存在");
    }
    return this.characters[index];
  };

  @action initCharacter = () => {
    if (this.initialized) {
      return Promise.resolve();
    }

    return this.fetchCharacter().then(() => {
      this.initialized = true;
    });
  };

  @action fetchCharacter = () => {
    return BaseProvider.get<Array<IMugenCharacter>>(`/api/st/character/`).then((res) => {
      this.characters = res.data;
    });
  };

  @action refreshCharacterData = (uuid: string) => {
    return BaseProvider.get<IMugenCharacter>(`/api/st/character/${uuid}/`).then((res) => {
      const index = this.characters.findIndex((c) => c.uuid === res.data.uuid);
      if (index !== -1) {
        this.characters[index] = res.data;
        this.characters = [...this.characters];
      }
    });
  };

  @action combat = (data: combatData) => {
    return BaseProvider.post<combatReault>(
      `/api/st/character/combat/`,
      keysToUnderline(data)
    );
  };

  @action takeDamage = (characterUuid: string, damageList: Array<Damage>) => {
    return BaseProvider.post<IMugenCharacter>(
      `/api/st/character/${characterUuid}/take_damage/`,
      keysToUnderline({ damageList })
    ).then((res) => {
      const index = this.characters.findIndex((c) => c.uuid === res.data.uuid);
      if (index !== -1) {
        this.characters[index] = res.data;
        this.characters = [...this.characters];
      }
    });
  };

  @action updateStatus = (characterUuid: string, data: UpdateStatusData) => {
    return BaseProvider.patch<IMugenCharacter>(`/api/st/character/${characterUuid}/update_status/`,
      keysToUnderline(data)
    ).then((res) => {
      const index = this.characters.findIndex((c) => c.uuid === res.data.uuid);
      if (index !== -1) {
        this.characters[index] = res.data;
        this.characters = [...this.characters];
      }
    });
  }

  @action updateEnergyPool = (characterUuid: string, energyId: number, current: number) => {
    return BaseProvider.patch<IMugenCharacter>(`/api/st/character/${characterUuid}/update_energypool/`,
      {
        id: energyId,
        current,
      }
    ).then((res) => {
      const index = this.characters.findIndex((c) => c.uuid === res.data.uuid);
      if (index !== -1) {
        this.characters[index] = res.data;
        this.characters = [...this.characters];
      }
    });
  }

  @action getInitiative = (uuid: string) => {
    if (this.initiativeSet[uuid]) {
      return this.initiativeSet[uuid];
    }
    return 0;
  };

  @action setAllInitiative = () => {
    this.characters.map((c) => {
      const count = Math.floor(Math.random() * 10 + 1);
      this.initiativeSet[c.uuid] = count;
    });
    this.initiativeSet = { ...this.initiativeSet };
  };

  @action setInitiative = (uuid: string) => {
    const count = Math.floor(Math.random() * 20 + 1);
    this.initiativeSet[uuid] = count;
    this.initiativeSet = { ...this.initiativeSet };
  };
}

const store = new InventoryStore();

export default store;
