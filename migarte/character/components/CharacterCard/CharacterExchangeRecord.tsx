import React, { useEffect } from "react";
import { observer } from "mobx-react";
import workingSVG from "@/assets/svg/working.svg";
import { Spin, Typography, Col, Row, Card, Table, Empty } from "antd";
import CharacterStore from "@/character/stores/CharacterStore";
import CharacterResourceStore from "@/character/stores/CharacterResourceStore";
import CharacterScrollPanel from './CharacterScrollPanel';
import './styles.less';

const { Column } = Table;

interface IProps {}

const CharacterExchangeRecord: React.SFC<IProps> = observer((props) => {
  useEffect(() => {
    CharacterResourceStore.fetchRecords(CharacterStore.characterDetail!.uuid);
  }, [CharacterStore.characterDetail!.uuid]);

  return (
    <Row gutter={16} className="character-card-page">
      <Col span={24} className="character-card-col">
        <CharacterScrollPanel title="兑换记录">
          {CharacterResourceStore.records.length === 0 ?
            <Empty
              image={workingSVG}
              imageStyle={{
                height: 180,
              }}
              description={<span>没有兑换记录</span>}
            /> :
            <Table 
              dataSource={CharacterResourceStore.records}
              pagination={false}
              size="small"
              rowKey="id"
            >
              <Column title="说明" dataIndex="description" key="description" />
              <Column title="点数变化" dataIndex="branchPoint" key="branchPoint" />
              <Column title="积分变化" dataIndex="credit" key="credit" />
              <Column title="经验变化" dataIndex="experience" key="experience" />
            </Table>
          }
        </CharacterScrollPanel>
      </Col>
    </Row>
  );
});

export default CharacterExchangeRecord;
