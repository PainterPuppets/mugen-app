import React from "react";
import { observer } from "mobx-react";
import { Button } from "antd";
import notAuthSVG from "@/assets/svg/notAuth.svg";
import UIStore from '@/shared/stores/UIStore';
import "./style.less";

interface IProps {}

const NotAuth: React.SFC<IProps> = observer((props) => {

  return (
    <div className="empty-page">
      <img className="empty-img" src={notAuthSVG} />
      <span className="empty-text">
        看起来您好像没有登录，请登录后再试试吧！
      </span>

      <div className="empty-action">
        <Button type="primary" onClick={() => UIStore.openLoginModal()}>
          登录！
        </Button>
        <Button 
          type="primary" 
          onClick={() => UIStore.openSignupModal()}
          style={{ marginTop: 16 }}
        >
          获得账号！
        </Button>
      </div>
    </div>
  );
});

export default NotAuth;
