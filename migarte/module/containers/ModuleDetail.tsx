import React, { Component } from 'react';
import { observer } from 'mobx-react';
import ModuleList from '@/module/components/ModuleList';
import ModuleStore from '@/module/stores/ModuleStore';
import './ModuleDetail.less';

const ModuleDetail: React.SFC = observer(() => {
  return (
    <div className="container">
      <iframe
        className="replay-player"
        src="//player.bilibili.com/player.html?bvid=BV1rt411e79L&page=7" 
        scrolling="no"
        frameBorder="no"
        allowFullScreen={true}
      />
    </div>
  );
});
export default ModuleDetail;
