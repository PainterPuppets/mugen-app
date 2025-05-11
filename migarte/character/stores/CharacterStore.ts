import { observable, action, computed } from "mobx";
import BaseProvider from "@/utils/BaseProvider";
import { Attributes } from "../interfaces/character";
import { BaseAttributeType, Gender } from "@/interfaces/character";
import { SkillFlag, SkillMajor } from "@/interfaces/skill";
import { IMugenCharacter } from "@/interfaces/mugen";

type UpdateCharacterData = {
  figure_url?: string;
  appearance?: string;
  overview?: string;
  gender?: string;
  name?: string;
};

type CreateCharacterData = {
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

class CharacterStore {
  @observable initialized = false;
  @observable loading = false;
  @observable characters: IMugenCharacter[] = [];

  @observable detailInitialized = false;
  @observable detailLoading = false;
  @observable characterDetail?: IMugenCharacter;

  @computed get detailReady() {
    return this.detailInitialized && !this.detailLoading;
  }

  @action initCharacterList = () => {
    if (this.initialized) {
      return Promise.resolve();
    }

    return this.fetchCharacterList();
  };

  @action fetchCharacterList = () => {
    if (this.loading) {
      return Promise.resolve();
    }

    this.loading = true;
    return BaseProvider.get<Array<IMugenCharacter>>(`/api/character/`)
      .then((res) => {
        this.characters = res.data;
        this.initialized = true;
      })
      .finally(() => {
        this.loading = false;
      });
  };

  @action fetchCharacterDetail = (uuid: string) => {
    if (this.detailLoading) {
      return Promise.reject("正在获取角色信息");
    }

    const index = this.characters.findIndex(c => c.uuid === uuid)
    if (index !== -1) {
      this.characterDetail = this.characters[index];
      this.detailInitialized = true;
      return Promise.resolve();
    }

    this.detailLoading = true;
    return BaseProvider.get<IMugenCharacter>(`/api/character/${uuid}/`)
      .then((res) => {
        this.characterDetail = res.data;
        this.detailInitialized = true;
      })
      .finally(() => {
        this.detailLoading = false;
      });
  };

  @action refreshCharacterData = () => {
    if (!this.characterDetail) {
      return Promise.resolve();
    }

    return BaseProvider.get<IMugenCharacter>(
      `/api/character/${this.characterDetail.uuid}/`
    ).then((res) => {
      this.characterDetail = res.data;
    });
  };

  @action createCharacter = (data: CreateCharacterData) => {
    return BaseProvider.post<IMugenCharacter>(`/api/character/`, data).then(
      (res) => {
        this.characterDetail = res.data;
      }
    );
  };

  @action updateCharacter = (uuid: string, data: UpdateCharacterData) => {
    return BaseProvider.patch<IMugenCharacter>(
      `/api/character/${uuid}/`,
      data
    ).then((res) => {
      this.characterDetail = res.data;
    });
  };

  @action upgradeAttribute = (
    characterUuid: string,
    attribute: BaseAttributeType,
    method: "experience" | "credit"
  ) => {
    return BaseProvider.post(
      `/api/character/${characterUuid}/upgrade_attribute/`,
      { attribute, method }
    );
  };
  @action upgradeSkill = (characterUuid: string, flag: SkillFlag) => {
    return BaseProvider.post<any>(
      `/api/character/${characterUuid}/upgrade_skill/`,
      { skill_flag: flag }
    );
  };

  @action getSkillMajor = (characterUuid: string, flag: SkillMajor) => {
    return BaseProvider.post(
      `/api/character/${characterUuid}/get_skill_major/`,
      { major_flag: flag }
    );
  };

  @action updateCharacterData = (data: IMugenCharacter) => {
    this.characterDetail = {...data};
    const index = this.characters.findIndex(c => c.uuid === data.uuid);
    if (index !== -1) {
      this.characters[index] = data;
      this.characters = [...this.characters];
    }
  }

  @action transfer = (characterUuid: string, targetUuid: string, credit: number) => {
    return BaseProvider.post(
      `/api/character/${characterUuid}/transfer/`,
      { 
        target_uuid: targetUuid,
        transfer_credit: credit,
      }
    );
  }

  @action delete = (characterUuid: string) => {
    return BaseProvider.delete(`/api/character/${characterUuid}/`).then(() => {
      const nCharacter = this.characters.filter(c => c.uuid !== characterUuid)
      this.characters = [...nCharacter];
    });
  }

  @action reset = () => {
    this.initialized = false;
    this.loading = false;
    this.characters = [];
    this.characterDetail = undefined;
  };
}

const store = new CharacterStore();

export default store;
