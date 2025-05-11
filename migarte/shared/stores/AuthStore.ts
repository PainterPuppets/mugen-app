import { observable, action, computed } from 'mobx';
import _ from 'lodash';
import BaseProvider from '@/utils/BaseProvider';
import { IUser } from '@/interfaces/user';


class AuthStore {
  @observable initial = true;
  @observable loading = false;
  @observable user: IUser = {
    id: 0,
    username: '',
    email: '',
    avatarUrl: '',
    isSuperuser: false,
  };
  @observable isAuthenticated = false;
  @observable profileModalVisible = false;

  constructor() {
    this.getUser();
  }

  @action _update(user: any) {
    this.isAuthenticated = user.isAuthenticated;
    this.user = user;
  }

  @action getUser() {
    return BaseProvider.get('/api/user/').then((res) => {
      this._update(res.data);
    }).finally(() => {
      this.initial = false;
    });
  }

  @action uploadAvatar = (avatar: Blob) => {
    const formData = new FormData();
    formData.append('avatar', avatar);

    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    return BaseProvider.post('/api/user/upload_avatar/', formData, config).then((res) => {
      this._update(res.data);
    });
  }

  @action login = (username: string, password: string, remember: boolean = false) => {
    return BaseProvider.post('/api/user/login/', { username, password, remember }).then((res) => {
      this._update(res.data);
    });
  }

  @action signup = (username: string, email: string, password: string) => {
    return BaseProvider.post('/api/user/signup/', { username, email, password });
  }

  @action logout() {
    return BaseProvider.post('/api/user/logout/').then(() => {
      this.reset();
    });
  }

  @action openProfileModal = () => {
    this.profileModalVisible = true;
  }

  @action closeProfileModal = () => {
    this.profileModalVisible = false;
  }

  @action reset = () => {
    this.loading = false;
    this.user =  {
      id: 0,
      username: '',
      email: '',
      avatarUrl: '',
      isSuperuser: false,
    };
    this.isAuthenticated = false;
    this.profileModalVisible = false;
  }
}

export default new AuthStore();
