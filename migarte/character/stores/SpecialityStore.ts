import { observable, action, computed } from 'mobx';
import BaseProvider from '@/utils/BaseProvider';
import { Speciality } from '@/interfaces/power';

class SpecialityStore {
  @observable initialized = false;
  @observable loading = false;
  @observable specialities: Array<Speciality> = [];

  @computed get ready() {
    return this.initialized && !this.loading;
  }

  @action initSpecialities = () => {
    if (this.initialized) {
      return Promise.resolve();
    }

    return this.fetchSpecialities();
  }

  @action fetchSpecialities = () => {
    if (this.loading) {
      return Promise.reject("正在获取专长信息");
    }
    this.loading = true;
    return BaseProvider.get<Array<Speciality>>(`/api/speciality/`).then((res) => {
      this.specialities = res.data;
      this.initialized = true;
    }).finally(() => {
      this.loading = false;
    })
  }

  @action upgrade = (characterUuid: string, specialityId: number) => {
    return BaseProvider.post(`/api/speciality/${specialityId}/upgrade/`, {
      character_uuid: characterUuid
    })
  }


}

const store = new SpecialityStore();

export default store;
