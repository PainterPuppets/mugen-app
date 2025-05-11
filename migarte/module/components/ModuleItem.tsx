import React from 'react';
import { observer } from 'mobx-react';
import { Card, Typography, Tag } from 'antd';
import { Module, TRPGRuleMap } from '@/interfaces/module'
import './ModuleItem.less'

const { Paragraph, Text } = Typography;

interface IProps {
  module: Module
}

const ModuleItem: React.SFC<IProps> = observer(({ module }) => {
  return (
    <Card className="module-item-card" bordered={false}>
      <div className="module-item-header">
        <span className="module-item-title">{module.title}</span>
        <span className="module-item-auther">{module.author.username}</span>
      </div>
      <div className="module-item-content">
        <div className="module-item-info">
          <span>规则：{TRPGRuleMap[module.rule]}</span>
          <span>时长：{module.minTime}-{module.maxTime}</span>
          <span>人数：{module.minParticipants}-{module.maxParticipants}</span>
        </div>
        <div className="module-item-abstract">
          {module.abstract}
        </div>
      </div>
      <div className="module-item-tags">
        {module.tags.map(tag => (
          <Tag key={tag.uuid}>{tag.title}</Tag>
        ))}
      </div>
    </Card>
  );
});

export default ModuleItem;
