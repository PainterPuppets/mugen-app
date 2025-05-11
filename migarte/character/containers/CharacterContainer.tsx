import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Link, NavLink, useRouteMatch, Route, Switch, Redirect } from "react-router-dom";
import { Button, Spin, Col, Row } from "antd";
import { Scrollbars } from 'react-custom-scrollbars';
import CharacterStatus from "../components/CharacterCard/CharacterStatus";
import CharacterAttribute from "../components/CharacterCard/CharacterAttribute";
import CharacterInventory from "../components/CharacterCard/CharacterInventory";
import CharacterPower from "../components/CharacterCard/CharacterPower";
import CharacterExchangeRecord from "../components/CharacterCard/CharacterExchangeRecord";
import { BulbOutlined } from "@ant-design/icons";
import EmptyCharacter from "@/assets/svg/emptyCharacter.svg";
import CharacterStore from '@/character/stores/CharacterStore';
import PageHeader from '@/shared/layout/PageHeader';

import "./CharacterContainer.less";

const CharacterTab = [
  {
    link: 'status',
    title: '角色状态',
  },
  {
    link: 'attribute',
    title: '角色属性',
  },
  {
    link: 'power',
    title: '角色能力',
  },
  // {
  //   link: 'skill',
  //   title: '角色技能',
  // },
  {
    link: 'inventory',
    title: '背包',
  },
  // {
  //   link: 'check',
  //   title: '检定',
  // },
  {
    link: 'exchange-record',
    title: '兑换记录',
  },
]

const CharacterContainer: React.SFC = observer(() => {
  const route = useRouteMatch<{uuid: string}>();

  useEffect(() => {
    CharacterStore.fetchCharacterDetail(route.params.uuid);
  }, [route.params.uuid]);

  if (!CharacterStore.detailReady) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (!CharacterStore.characterDetail) {
    return (
      <div className="invite-create-page">
        <img className="invite-create-img" src={EmptyCharacter} />
        <div>没有找到角色</div>

        <div className="invite-create-action">
          <Link to="/character/">
            <Button type="primary">返回角色列表</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <PageHeader className="character-detail-header">
        <Scrollbars 
          autoHeight={false}
        >
          <div className="character-detail-tabs">
            {CharacterTab.map((tab) => (
              <NavLink
                key={tab.link}
                activeClassName="active"
                to={`${route.url}/${tab.link}`}
                className="character-detail-tab"
              >
                <BulbOutlined className="character-detail-tab-icon" />
                <span className="character-detail-tab-text">{tab.title}</span>
              </NavLink>
            ))}
          </div>
        </Scrollbars>
      </PageHeader>
        <Switch>
          <Route path={`${route.url}/status`} component={CharacterStatus} />
          <Route path={`${route.url}/attribute`} component={CharacterAttribute} />
          <Route path={`${route.url}/power`} component={CharacterPower} />
          <Route path={`${route.url}/inventory`} component={CharacterInventory}/>
          <Route path={`${route.url}/exchange-record`} component={CharacterExchangeRecord}/>
          <Route 
            path={`${route.url}/check`}
            component={() => <span>check</span>}
          />
          <Redirect to={`${route.url}/status`} />
        </Switch>
    </React.Fragment>
  );
});

export default CharacterContainer;
