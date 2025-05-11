import React from "react";
import { Card } from "antd";
import { Scrollbars } from 'react-custom-scrollbars';
import { observer } from "mobx-react";
import { CardProps } from "antd/lib/card";
import UIStore from '@/shared/stores/UIStore';
import "./styles.less";

interface IProps extends CardProps {}

const CharacterScrollPanel: React.SFC<IProps> = observer((props) => {
  if (UIStore.isMobile) {
    return (
      <Card
        bordered={false}
        className="character-card-panel"
        {...props}
      >
        {props.children}
      </Card>
    )
  }

  return (
    <Card
      bordered={false}
      className="character-card-panel character-scrollbar-card"
      {...props}
    >
      <Scrollbars 
        autoHide
        renderThumbVertical={() => <div className="custom-scroll" />}
      >
        {props.children}
      </Scrollbars>
    </Card>
  );
});

export default CharacterScrollPanel;
