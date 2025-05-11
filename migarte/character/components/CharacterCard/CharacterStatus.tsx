import React, { useState } from "react";
import { toJS } from "mobx";
import {
  Spin,
  Typography,
  Col,
  Row,
  Card,
  Button,
  Modal,
  Tooltip,
  Divider,
  Progress,
} from "antd";
import { CheckSquareOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import CharacterStore from "@/character/stores/CharacterStore";
import {
  AttributeMap,
  Attribute,
  DefensePosture,
  DefensePostureMap,
} from "@/interfaces/character";
import { SkillCheckMap, SkillCheck } from "@/interfaces/check";
import HamelStrand from "@/shared/components/HamelStrand";
import UIStore from "@/shared/stores/UIStore";
import AttackPatternItem from "./AttackPatternItem";
import CharacterScrollPanel from "./CharacterScrollPanel";
import CharacterFigure from "./CharacterFigure";
import AttackPatternAction from "./AttackPatternAction";
import TooltipText, { Specification } from "../TooltipText";
import {
  getCheckedDp,
  check as getCheckResult,
  getCharacterDefense,
} from "@/utils/mugen";
import "./styles.less";

const { Paragraph, Text } = Typography;

interface IProps {}

const CharacterStatus: React.SFC<IProps> = observer((props) => {
  const character = CharacterStore.characterDetail;
  const defense = getCharacterDefense();

  if (!character) {
    return <Spin />;
  }

  return (
    <Row gutter={16} className="character-card-page">
      <CharacterFigure character={character} />
      <Col span={6} xs={24} md={6} className="character-card-col">
        <CharacterScrollPanel title="角色状态">
          <Paragraph className="character-card-attribute-item">
            <TooltipText
              readKey={Attribute.HEALTH}
              tooltip={Specification[Attribute.HEALTH]}
              className="character-card-attribute-item-key"
            >
              生命值
            </TooltipText>
            <span className="character-card-attribute-item-value">
              <HamelStrand
                healthPoint={character.attributes.health}
                damage={character.damage}
              />
            </span>
          </Paragraph>
          <Paragraph className="character-card-attribute-item">
            <TooltipText
              readKey={Attribute.WILL}
              tooltip={Specification[Attribute.WILL]}
              className="character-card-attribute-item-key"
            >
              意志池
            </TooltipText>
            <span className="character-card-attribute-item-progress">
              <Progress
                className="custom-progress"
                percent={Math.round(
                  (character.currentWill * 100) / character.attributes.will
                )}
                format={() => (
                  <span>
                    {character.currentWill}/{character.attributes.will}
                  </span>
                )}
              />
            </span>
          </Paragraph>
          {character.energyPools.length !== 0 && (
            <React.Fragment>
              <Divider style={{ fontSize: 14 }}>能量池</Divider>
              {character.energyPools.map((pool) => (
                <Paragraph
                  key={`energy-pool-${pool.id}`}
                  className="character-card-attribute-item"
                >
                  <TooltipText
                    tooltip={
                      <span style={{ whiteSpace: "pre-line" }}>
                        {pool.description}
                      </span>
                    }
                    className="character-card-attribute-item-key"
                  >
                    {pool.name}
                  </TooltipText>
                  <span className="character-card-attribute-item-progress">
                    <Progress
                      className="custom-progress"
                      percent={Math.round((pool.current * 100) / pool.limit)}
                      format={() => (
                        <span>
                          {pool.current}/{pool.limit}
                        </span>
                      )}
                    />
                  </span>
                </Paragraph>
              ))}
            </React.Fragment>
          )}
          {character.debuff.length !== 0 && (
            <Divider style={{ fontSize: 14 }}>不良状态</Divider>
          )}
          {character.properties.length !== 0 && (
            <React.Fragment>
              <Divider style={{ fontSize: 14 }}>特性</Divider>
              {character.properties.map((property) => (
                <Tooltip
                  key={`property-${property.property.uuid}`}
                  title={
                    <span>
                      {property.property.name}: {property.property.description}
                      <span className="character-card-property-item-source">
                        (来源：{property.source})
                      </span>
                    </span>
                  }
                >
                  <div className="character-card-property-item">
                    <span className="character-card-property-item-name">
                      {property.property.name}
                    </span>
                    <span className="character-card-property-item-description">
                      {property.property.description}
                    </span>
                  </div>
                </Tooltip>
              ))}
            </React.Fragment>
          )}
          <Divider style={{ fontSize: 14 }}>防御预设</Divider>

          {Object.keys(defense)
            .map((k) => parseInt(k) as DefensePosture)
            .map((posture) => (
              <Paragraph
                key={posture}
                className="character-card-attribute-item"
              >
                <TooltipText
                  tooltip={""}
                  className="character-card-attribute-item-key"
                >
                  {DefensePostureMap[posture]}
                </TooltipText>
                <TooltipText
                  tooltip={
                    <React.Fragment>
                      {defense[posture].map((attr, index) => (
                        <React.Fragment key={attr}>
                          <span>
                            {character.attributes[attr]}({AttributeMap[attr]})
                          </span>
                          {index !== defense[posture].length - 1 && (
                            <span> + </span>
                          )}
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  }
                  wrapperClassName="character-card-attribute-item-value"
                >
                  {defense[posture].reduce(
                    (a, b) => a + character.attributes[b],
                    0
                  )}
                </TooltipText>
              </Paragraph>
            ))}
        </CharacterScrollPanel>
      </Col>
      <Col span={6} xs={24} md={6} className="character-card-col">
        <CharacterScrollPanel title="技能检定">
          {((Object.keys(SkillCheckMap) as Array<any>) as Array<
            SkillCheck
          >).map((check) => (
            <div key={check} className="character-skill-check-item">
              <span className="character-skill-check-item-name">
                {SkillCheckMap[check]}
              </span>
              <span className="character-skill-check-item-value">
                {getCheckedDp(character, check)}
              </span>
              <span className="character-skill-check-item-action">
                <Button
                  icon={<CheckSquareOutlined />}
                  size="small"
                  type="primary"
                  onClick={() =>
                    Modal.success({
                      maskClosable: true,
                      title: "检定结果",
                      content: `您的${
                        SkillCheckMap[check]
                      }检定投出了${getCheckResult(
                        getCheckedDp(character, check)
                      )}点`,
                    })
                  }
                />
              </span>
            </div>
          ))}
        </CharacterScrollPanel>
      </Col>
      <Col span={8} xs={24} md={8} className="character-card-col">
        <CharacterScrollPanel 
          title="攻击预设"
          actions={[
            <AttackPatternAction 
              characterUuid={character.uuid}
              onUpdate={() => CharacterStore.refreshCharacterData()}
            />
          ]}
        >
          <div className="character-card-attack-pattern-list">
            {character.attackPatterns.map((attackPattern) => (
              <AttackPatternItem
                key={attackPattern.id}
                attackPattern={toJS(attackPattern)}
                character={character}
                onUpdate={() => CharacterStore.refreshCharacterData()}
                onDelete={() => CharacterStore.refreshCharacterData()}
              />
            ))}
          </div>
        </CharacterScrollPanel>
      </Col>
    </Row>
  );
});

export default CharacterStatus;
