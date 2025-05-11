import React, { CSSProperties, useState } from "react";
import { Tooltip, Badge } from "antd";
import { TOOLTIP_KEY } from '@/shared/constants/storage';
import './TooltipText.less'
export { Specification } from '@/interfaces/tooltip';

interface Props {
  tooltip: React.ReactNode;
  readKey?: string;
  wrapperStyle?: CSSProperties;
  wrapperClassName?: string;
  className?: string;
  style?: CSSProperties;
  usingDefault?: boolean;
}

const TooltipText: React.SFC<Props> = (props) => {
  const [read, setRead] = useState(props.readKey === undefined ? true : localStorage.getItem(TOOLTIP_KEY + props.readKey) === 'true');

  const changeToolTipVisible = () => {
    if (props.readKey === undefined) {
      return;
    }

    localStorage.setItem(TOOLTIP_KEY + props.readKey, 'true')
    setRead(true)
  }

  return (
    <Badge className={`tooltip-badge ${props.wrapperClassName}`} style={props.wrapperStyle} dot={!read}>
      <Tooltip title={props.tooltip} afterVisibleChange={changeToolTipVisible}>
        <span className={`${props.usingDefault ? 'tooltip-text' : ''} ${props.className}`} style={props.style}>
          {props.children}
        </span>
      </Tooltip>
    </Badge>
  );
};

TooltipText.defaultProps = {
  usingDefault: true,
}

export default TooltipText;
