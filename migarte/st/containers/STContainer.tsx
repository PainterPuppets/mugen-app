import React, { useEffect } from "react";
import { Card, Tabs, Button } from "antd";
import { observer } from "mobx-react";
import STStore from "@/st/stores/STStore";
import CharacterTable from '../components/CharacterTable';

const { TabPane } = Tabs;

interface IProps {}

const STContainer: React.SFC<IProps> = observer((props) => {
  useEffect(() => {
    STStore.initCharacter();
  }, []);

  return (
    <Card>
      <div style={{ display: 'flex', marginBottom: 16 }}>
        <Button type="primary" onClick={() => STStore.setAllInitiative()}>
          战斗先攻投掷
        </Button>
        <Button style={{ marginLeft: 'auto' }} type="primary" onClick={() => STStore.fetchCharacter()}>
          刷新
        </Button>
      </div>
      <CharacterTable />
    </Card>
  );
});

export default STContainer;
