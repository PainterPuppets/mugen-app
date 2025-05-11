import workingSVG from "@/assets/svg/working.svg";
import React from "react";
import { observer } from "mobx-react";
import "./style.less";
import "@/shared/effect.scss"

interface IProps {}

const Working: React.SFC<IProps> = observer((props) => {

  return (
    <div className="working-page">
      <img className="working-img" src={workingSVG} />
      <span className="working-text glitch" data-text="肥肠抱歉，您找的页面正在施工中">
        肥肠抱歉，您找的页面正在施工中
      </span>
    </div>
  );
});

export default Working;
