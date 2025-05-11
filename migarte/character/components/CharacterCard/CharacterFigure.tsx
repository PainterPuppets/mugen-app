import React, { Fragment, useState } from "react";
import { TransactionOutlined, EditOutlined } from '@ant-design/icons'
import { Typography, Col, Card, Input, Modal, InputNumber, Button, Row, Form, message } from "antd";
import { observer } from "mobx-react";
import CharacterStore from "@/character/stores/CharacterStore";
import ImageUploader from "@/shared/components/ImageUploader";
import CharacterProfileForm from './CharacterProfileForm';
import TooltipText, { Specification } from "../TooltipText";
import "./styles.less";
import { IMugenCharacter } from "@/interfaces/mugen";

const { Paragraph, Text } = Typography;

interface IProps {
  character: IMugenCharacter;
}

const CharacterFigure: React.SFC<IProps> = observer((props) => {
  const [transferModalVisible, setTransferModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [targetUuid, setTargetUuid] = useState("");
  const [transferCredit, setTransferCredit] = useState(0);
  const { character } = props;

  return (
    <Fragment>
      <Col span={4} xs={24} md={4} className="character-card-col">
        <Card
          bordered={false}
          className="character-card-panel character-card-figure"
        >
          <ImageUploader
            defaultImageUrl={character.figureUrl}
            className="character-card-figure-image"
            onUpload={(url) =>
              CharacterStore.updateCharacter(character.uuid, {
                figure_url: url,
              })
            }
          />
          <div className="character-card-figure-title">
            <span>{character.name}</span>
            <EditOutlined 
              onClick={() => setProfileModalVisible(true)}
              style={{ marginLeft: 8 }}
              className="primary-text"
            />
          </div>
        </Card>
        <Card
          bordered={false}
          title="角色资源"
          className="character-card-panel"
        >
          <Paragraph className="character-card-attribute-item">
            <TooltipText
              readKey={"credit"}
              tooltip={Specification["credit"]}
              className="character-card-attribute-item-key"
            >
              积分
            </TooltipText>
            <span className="character-card-attribute-item-value">
              {character.credit}
            </span>
            <span className="character-card-attribute-item-action">
              <Button
                type="primary"
                shape="circle"
                size="small"
                onClick={() => setTransferModalVisible(true)}
                disabled={character.credit <= 0}
                icon={<TransactionOutlined style={{ fontSize: 12 }} />}
              />
            </span>
          </Paragraph>
          <Paragraph className="character-card-attribute-item">
            <TooltipText
              readKey={"branchPoint"}
              tooltip={Specification["branchPoint"]}
              className="character-card-attribute-item-key"
            >
              支线点
            </TooltipText>
            <span className="character-card-attribute-item-value">
              {character.branchPoint}
            </span>
          </Paragraph>
          <Paragraph className="character-card-attribute-item">
            <TooltipText
              readKey={"experience"}
              tooltip={Specification["experience"]}
              className="character-card-attribute-item-key"
            >
              经验
            </TooltipText>
            <span className="character-card-attribute-item-value">
              {character.experience}xp
            </span>
          </Paragraph>
        </Card>
      </Col>
      <Modal
        visible={transferModalVisible}
        onCancel={() => setTransferModalVisible(false)}
        title="转账"
        footer={null}
      >
        <div className="tansfer-modal-self">
          您的角色id为: <Text strong>{character.uuid}</Text>
        </div>
        <Row style={{ marginBottom: 16 }}>
          <Col 
            span={6}
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Text strong>目标uuid</Text>
          </Col>
          <Col span={18}>
            <Input
              value={targetUuid}
              placeholder="请输入要转账角色的uuid"
              onChange={(e) => setTargetUuid(e.target.value)}
            />
          </Col>
        </Row>

        <Row style={{ marginBottom: 16 }}>
          <Col 
            span={6} 
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Text strong>转账积分</Text>
          </Col>
          <Col span={18}>
            <InputNumber
              value={transferCredit}
              placeholder="请输入要转账的积分"
              onChange={(value) => setTransferCredit(parseInt(`${value}`) || 0)}
            />
          </Col>
        </Row>

        <Button 
          type="primary"
          block
          onClick={() => {
            CharacterStore.transfer(
              character.uuid,
              targetUuid,
              transferCredit,
            ).then(() => {{
              message.success('转账成功');
              CharacterStore.refreshCharacterData();
              setTransferModalVisible(false);
              setTransferCredit(0);
              setTargetUuid('');
            }})
          }}
        >
          转账
        </Button>
      </Modal>
      <Modal
        visible={profileModalVisible}
        onCancel={() => setProfileModalVisible(false)}
        title="角色概念更改"
        footer={null}
      >
        <CharacterProfileForm 
          character={character}
          onFinish={(values) => {
            CharacterStore.updateCharacter(character.uuid, values).then(() => {
              message.success('更新成功')
              CharacterStore.refreshCharacterData();
              setProfileModalVisible(false)
            })
          }}
        />
      </Modal>
    </Fragment>
  );
});

export default CharacterFigure;
