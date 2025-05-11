
import React from 'react';
import { observer } from 'mobx-react';
import { Layout } from 'antd';
import AppSider from './AppSider';
import UserModal from '@/shared/components/UserModal';
import LoginModal from '@/shared/components/Login/LoginModal';
import SignupModal from '@/shared/components/Login/SignupModal';
import './styles.less';

const { Content } = Layout;

const AppLayout: React.SFC<any> = observer(({ children }) => {
    return (
      <React.Fragment>
        <Layout className="app-layout">
          <AppSider />
          <Content className="app-layout-content">
            <div className="app-layout-content-children">
              {children}
            </div>
          </Content>
        </Layout>
        <LoginModal />
        <SignupModal />
        <UserModal />
      </React.Fragment>
    )
})

export default AppLayout;
