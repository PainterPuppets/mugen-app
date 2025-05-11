import React from 'react';
import { observer } from 'mobx-react';
import { Modal, Button, Typography } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import UIStore from '@/shared/stores/UIStore';
import AvatarUploader from '@/shared/components/AvatarUploader';
import CommonStore from '@/shared/stores/CommonStore';
import AuthStore from '@/shared/stores/AuthStore';
import './style.less'

const { Paragraph, Text } = Typography;

const UserModal: React.SFC<any> = observer(() => {
  return (
    <Modal
      visible={UIStore.userModalVisible}
      onCancel={UIStore.closeUserModal}
      centered
      title={null}
      footer={null}
      closable={false}
    >
      <div className="user-profile-card">
        <AvatarUploader className="user-profile-avatar"/>
        <Typography className="user-profile">
          <Text strong>用户名</Text>
          <Paragraph className="username">{AuthStore.user.username}</Paragraph>
          {AuthStore.user.email &&
            <React.Fragment>
              <Text strong>电子邮箱</Text>
              <Paragraph className="username">{AuthStore.user.email}</Paragraph>
            </React.Fragment>
          }
        </Typography>
      </div>
      <Button
        type="primary"
        danger
        block
        icon={<LogoutOutlined />}
        className="logout-btn"
        onClick={CommonStore.logout}
      >
        登出
      </Button>
    </Modal>
  );
})

export default UserModal;
