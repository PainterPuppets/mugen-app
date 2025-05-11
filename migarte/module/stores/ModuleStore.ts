import { observable, action } from 'mobx';
import BaseProvider from '@/utils/BaseProvider';
import { Module } from '@/interfaces/module'

class ModuleStore {
  @observable initialized = false;
  @observable loading = false;
  @observable modules: Array<Module> = [];

  @action initModuleList = () => {
    if (this.initialized) {
      return Promise.resolve();
    }

    return this.fetchModuleList();
  }

  @action fetchModuleList = () => {
    if (this.loading) {
      return Promise.resolve();
    }

    this.loading = true;
    return BaseProvider.get<Array<Module>>(`/api/module/`).then((data) => {
      // this.modules = data;
      this.initialized = true;
    }).finally(() => {
      this.loading = false;
    });
  }
}

const store = new ModuleStore();

export default store;
