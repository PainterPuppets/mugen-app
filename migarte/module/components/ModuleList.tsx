import React, { Component, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Card, Typography, Row, Col, Space, List } from 'antd';
import { Module } from '@/interfaces/module'
import ModuleStore from '../stores/ModuleStore';
import ModuleItem from './ModuleItem';

const { Paragraph, Text } = Typography;

interface IProps {
  modules: Array<Module>
}

const ModuleList: React.SFC<IProps> = observer((props) => {

  return (
    <React.Fragment>
      <List
        grid={{
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          gutter: [24, 16],
          md: 1,
          lg: 2,
          xl: 3,
        }}
        dataSource={props.modules}
        loadMore
        renderItem={(module: Module) => (
          <List.Item key={module.uuid} style={{ marginBottom: 0 }}>
            <Link to={`/module/${module.uuid}/`}>
              <ModuleItem module={module} />
            </Link>
          </List.Item>
        )}
      />
    </React.Fragment>
  );
});

export default ModuleList;
