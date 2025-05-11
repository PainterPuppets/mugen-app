import React from 'react';
import { observer } from 'mobx-react';
import { Modal, Button } from 'antd';
import AuthStore from 'shared/stores/AuthStore';
import UIStore from 'shared/stores/UIStore';
import LoginForm from './LoginForm';

const LoginModal: React.SFC<any> = observer(() => {
  const handleClickSignUp = () => {
    UIStore.closeLoginModal();
    UIStore.openSignupModal();
  }

  const handleLogin = (username: string, password: string, remember: boolean) => {
    return AuthStore.login(username, password, remember).then(() => {
      UIStore.closeLoginModal();
    })
  }

  return (
    <Modal
      visible={UIStore.loginModalVisible}
      title={`登录您的账户！`}
      onCancel={UIStore.closeLoginModal}
      footer={null}
    >
      <LoginForm
        onLogin={handleLogin}
      />
      <div className="login-modal-footer">
        还没有账户么？ <Button type="link" onClick={handleClickSignUp}>注册</Button>
      </div>
    </Modal>
  );
})

export default LoginModal;
