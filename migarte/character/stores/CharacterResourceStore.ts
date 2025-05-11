import { observable, action, computed } from "mobx";
import BaseProvider from "@/utils/BaseProvider";
import { IResourceRecord } from "@/interfaces/mugen";

class CharacterResourceStore {
  @observable initialized = false;
  @observable loading = false;
  @observable records: Array<IResourceRecord> = [];

  @computed get ready() {
    return this.initialized && !this.loading;
  }

  @action fetchRecords = (characterUuid: string) => {
    if (this.loading) {
      return Promise.reject("正在获取积分记录");
    }
    this.loading = true;
    return BaseProvider.get<Array<IResourceRecord>>(
      `/api/record?character__uuid=${characterUuid}`
    ).then((res) => {
      this.records = res.data;
      this.initialized = true;
    }).finally(() => {
      this.loading = false;
    });
  };

  @action reset = () => {
    this.initialized = false;
    this.loading = false;
    this.records = [];
  };
}

const store = new CharacterResourceStore();

export default store;
