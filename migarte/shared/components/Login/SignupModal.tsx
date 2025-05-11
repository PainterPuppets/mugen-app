import React from 'react';
import { observer } from 'mobx-react';
import { Modal, Button } from 'antd';
import AuthStore from 'shared/stores/AuthStore';
import UIStore from 'shared/stores/UIStore';
import SignupForm from './SignupForm';

const SignupModal: React.SFC<any> = observer(() => {
  const handleClickLogin = () => {
    UIStore.closeSignupModal();
    UIStore.openLoginModal();
  }

  const handleSignup = (username: string, email: string, password: string) => {
    return AuthStore.signup(username, email, password).then(() => {
      UIStore.closeSignupModal();
      UIStore.openLoginModal();
    })
  }

  return (
    <Modal
      visible={UIStore.signupModalVisible}
      title={`注册并开始使用Mugen吧！`}
      onCancel={UIStore.closeSignupModal}
      footer={null}
    >
      <SignupForm
        onSignup={handleSignup}
      />
      <div className="login-modal-footer">
        已有账户了？ <Button type="link" onClick={handleClickLogin}>登录</Button>
      </div>
    </Modal>
  );
})

export default SignupModal;
