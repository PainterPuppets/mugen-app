import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Layout, Button, Avatar, Menu } from 'antd';
// import logo from '../../assets/img/logo.png'
import logoLight from '@/assets/img/logo-light.png'
import AuthStore from 'shared/stores/AuthStore';
import UIStore from 'shared/stores/UIStore';
import './styles.less';

const { Header } = Layout;

@observer
class AppHeader extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  renderUserMenu = () => {
    return (
      <ul className="app-header-user-menu">
        <li className="app-header-user-menu-list" onClick={AuthStore.openProfileModal}>
          个人信息
        </li>
        <li className="app-header-user-menu-list" onClick={AuthStore.logout}>
          登出
        </li>
      </ul>
    );
  }

  render() {
    return (
      <Header className={`app-header ${UIStore.theme}`}>
        <div className="app-header-logo">
          <img src={logoLight} />
        </div>

        <Menu className="app-header-menu"
          theme={UIStore.theme}
          mode="horizontal"
          selectable={false}
        >
          <Menu.Item key="character">
            <Link to="/character/">人物卡</Link>
          </Menu.Item>
          <Menu.Item key="mugen">
            <Link to="/mugen/">无限团工具</Link>
          </Menu.Item>
        </Menu>

        <div className="app-header-right">
          {!AuthStore.isAuthenticated ?
            <React.Fragment>
              <Button onClick={UIStore.openLoginModal}>
                登录
              </Button>
              <Button type='primary' onClick={UIStore.openSignupModal} style={{ marginLeft: '8px' }}>
                注册
              </Button>
            </React.Fragment> :
            <React.Fragment>
              <Avatar
                size="large"
                className="header-avatar"
                src={AuthStore.user.avatarUrl}
                alt="avatar"
              />
            </React.Fragment>
          }
        </div>
      </Header>
    );
  }
}

export default withRouter(AppHeader);
