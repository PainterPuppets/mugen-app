import React from "react";
import { Layout } from 'antd';
import { observer } from "mobx-react";
import "./styles.less"

interface IProps {
  className?: string,
}

const PageHeader: React.SFC<IProps> = observer((props) => {
  return (
    <Layout.Header className={`page-header ${props.className || ''}`}>
      {props.children}
    </Layout.Header>
  );
});

export default PageHeader;
