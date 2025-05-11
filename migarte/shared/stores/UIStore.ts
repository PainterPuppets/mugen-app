import { observable, action } from 'mobx';

class UIStore {
  @observable initial = true;
  @observable userModalVisible = false;
  @observable loginModalVisible = false;
  @observable signupModalVisible = false;
  @observable footerVisible = true;
  @observable theme: 'light' | 'dark' = 'dark'
  @observable isMobile = window.matchMedia('(max-width: 767px)').matches;

  constructor() {
    window
      .matchMedia('(max-width: 767px)')
      .addListener(e => (this.isMobile = Boolean(e.matches)));
  }

  @action swtichTheme = () => {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
  }

  @action openLoginModal = () => {
    this.loginModalVisible = true;
  };
  @action closeLoginModal = () => {
    this.loginModalVisible = false;
  };

  @action openSignupModal = () => {
    this.signupModalVisible = true;
  };
  @action closeSignupModal = () => {
    this.signupModalVisible = false;
  };

  @action openUserModal = () => {
    this.userModalVisible = true;
  };
  @action closeUserModal = () => {
    this.userModalVisible = false;
  };

  @action showFooter = () => {
    this.footerVisible = true;
  };
  @action hideFooter = () => {
    this.footerVisible = false;
  };

  @action reset = () => {
    this.initial = true;
    this.userModalVisible = false;
    this.loginModalVisible = false;
    this.signupModalVisible = false;
    this.footerVisible = true;
    this.theme = 'dark';
  }
}

const store = new UIStore();

export default store;
