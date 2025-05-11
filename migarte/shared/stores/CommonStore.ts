import { action, computed, observable } from 'mobx';
import AuthStore from './AuthStore';
import UIStore from './UIStore';
import CharacterStore from '@/character/stores/CharacterStore';

class CommonStore {
  @computed get initialized() {
    return true;
  }

  @action initApp = () => {
  }

  @action resetApp = () => {
    AuthStore.reset();
    UIStore.reset();
    CharacterStore.reset();
    this.reset();
  }

  @action logout = () => {
    return AuthStore.logout().then(() => {
      this.resetApp();
    }); 
  }

  @action reset = () => {
  }
}

const store = new CommonStore();

export default store;
