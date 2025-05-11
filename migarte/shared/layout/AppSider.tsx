import React from "react";
import { Link, NavLink } from "react-router-dom";
import { observer } from "mobx-react";
import { Layout, Badge, Avatar, Menu, Tooltip } from "antd";
import { UserOutlined, ShopOutlined, VideoCameraOutlined, EnvironmentOutlined, SaveOutlined, MessageOutlined, BookOutlined, UserAddOutlined } from "@ant-design/icons";
import logoLight from "@/assets/img/logo-light.png";
import AuthStore from "shared/stores/AuthStore";
import UIStore from "shared/stores/UIStore";
import "./styles.less";

const { Sider } = Layout;

type MenuItem = {
  title: string;
  link: string;
  icon: React.ForwardRefExoticComponent<any>;
}

const MenuList: Array<MenuItem>  = [
  {
    'title': '人物卡',
    'link': '/character',
    'icon': UserOutlined,
  },
  {
    'title': '商店',
    'link': '/shop',
    'icon': ShopOutlined,
  },
  {
    'title': '地图',
    'link': '/map',
    'icon': EnvironmentOutlined,
  },
  {
    'title': '模组',
    'link': '/module',
    'icon': SaveOutlined,
  },
  {
    'title': '跑团replay',
    'link': '/replay',
    'icon': VideoCameraOutlined,
  },
  {
    'title': '讨论区',
    'link': '/forum',
    'icon': MessageOutlined,
  },
  {
    'title': '规则书',
    'link': '/rule',
    'icon': BookOutlined,
  },
]

const AppSider: React.SFC = observer(() => {

  const renderUserMenu = () => {
    return (
      <ul className="app-header-user-menu">
        <li
          className="app-header-user-menu-list"
          onClick={AuthStore.openProfileModal}
        >
          个人信息
        </li>
        <li className="app-header-user-menu-list" onClick={AuthStore.logout}>
          登出
        </li>
      </ul>
    );
  };

  return (
    <Sider width={72} className={`app-sider ${UIStore.theme}`}>
      <div className="app-sider-main">
        <Link to="/">
          <div className="app-sider-logo">
            <img src={logoLight} />
          </div>
        </Link>

        <div className="app-sider-menu">
          {MenuList.map((item) => (
            <div className="app-sider-menu-item" key={item.title}>
              <Tooltip title={item.title} placement="right">
                <NavLink activeClassName="active" to={item.link} className="app-sider-menu-icon">
                  <item.icon style={{ fontSize: "16px" }} />
                </NavLink>
              </Tooltip>
            </div>
          ))}
        </div>

      </div>

      <div className="app-sider-action">
        {!AuthStore.isAuthenticated ?
          <Tooltip title="登录账号" placement="right">
            <Badge className="login-avatar-badge" dot={true}>
              <div className="login-avatar" onClick={() => UIStore.openLoginModal()}>
                <UserAddOutlined style={{ fontSize: 16 }} />
              </div>
            </Badge>
          </Tooltip> :
          <Tooltip title="个人信息" placement="right">
            <div 
              className="user-profile-icon"
              onClick={() => UIStore.openUserModal()}
            >
              <Avatar
                size="large"
                src={AuthStore.user.avatarUrl}
                alt="avatar"
              />
            </div>
          </Tooltip>
        }
      </div>
    </Sider>
  );
});

export default AppSider;
