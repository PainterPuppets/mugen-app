import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Link, useRouteMatch } from "react-router-dom";
import { Button, Spin, Card, List, Popconfirm, message } from "antd";
import { Scrollbars } from 'react-custom-scrollbars';
import { IMugenCharacter } from "@/interfaces/mugen";
import { DeleteOutlined } from "@ant-design/icons";
import EmptyCharacter from "@/assets/svg/emptyCharacter.svg";
import CharacterStore from "@/character/stores/CharacterStore";
import PageHeader from "@/shared/layout/PageHeader";
import "./CharacterList.less";

interface CharacterListCardProps {
  character: IMugenCharacter;
}

const CharacterListCard: React.SFC<CharacterListCardProps> = (props) => {
  const { character } = props;

  return (
    <Card className="character-list-card" bordered={false}>
      <div
        className="character-list-card-figure"
        style={{ backgroundImage: `url(${character.figureUrl})` }}
      />
      <div className="character-list-card-title">
        <span>{character.name}</span>
        <Popconfirm 
          title="确定要删除角色么?"
          okText="删除"
          cancelText="取消"
          onConfirm={() => {
            CharacterStore.delete(character.uuid).then(() => {
              message.success('删除成功')
            })
          }}
        >
          <DeleteOutlined className="error-text" style={{ marginLeft: 16 }} />
        </Popconfirm>
      </div>
      <div className="character-list-card-action">
        <Link to={`/character/${character.uuid}`}>
          <Button type="primary" block>
            选择
          </Button>
        </Link>
      </div>
    </Card>
  );
};

const CharacterContainer: React.SFC = observer(() => {
  const route = useRouteMatch();

  useEffect(() => {
    CharacterStore.initCharacterList();
  }, []);

  if (!CharacterStore.initialized) {
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

  if (CharacterStore.characters.length === 0) {
    return (
      <div className="invite-create-page">
        <img className="invite-create-img" src={EmptyCharacter} />
        <div>看起来你还没有创建自己的人物卡</div>
        <div>别担心，这个过程不会很久。点击下方的按钮来创建吧</div>

        <div className="invite-create-action">
          <Link to="/character/create/">
            <Button type="primary">立刻创建角色！</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <PageHeader>
        <div className="character-detail-tabs">
          选择您的角色
        </div>
      </PageHeader>
      <Scrollbars className="character-list-wrapper">
        <div style={{ padding: '16px 16px 64px' }}>
          <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }}
            dataSource={CharacterStore.characters}
            renderItem={(character) => (
              <List.Item key={character.uuid}>
                <CharacterListCard character={character} />
              </List.Item>
            )}
          />
        </div>
      </Scrollbars>
      <div className="character-list-action">
        <Link to="/character/create/">
          <Button 
            type="primary" 
            className="character-list-create-btn"
          >
            创建新的角色
          </Button>
        </Link>
      </div>
    </React.Fragment>
  );
});

export default CharacterContainer;
