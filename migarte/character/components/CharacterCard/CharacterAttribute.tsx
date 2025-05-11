import React, { useState } from "react";
import {
  Spin,
  Typography,
  Col,
  Row,
  Card,
  Button,
  message,
  Popover,
  Divider,
  Popconfirm,
} from "antd";
import { PlusOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import CharacterStore from "@/character/stores/CharacterStore";
import {
  BaseAttribute,
  DerivedAttribute,
  DefenseAttribute,
  AttributeMap,
  BaseAttributeType,
  Attribute,
} from "@/interfaces/character";
import CharacterSkillItem from "./CharacterSkillItem";
import {
  CategoryToSkillDict,
  SkillCategory,
  SkillCategoryMap,
} from "@/interfaces/skill";
import UIStore from "@/shared/stores/UIStore";
import { IMugenCharacter } from "@/interfaces/mugen";
import CharacterFigure from "./CharacterFigure";
import CharacterAttributeValue from "./CharacterAttributeValue";
import CharacterScrollPanel from "./CharacterScrollPanel";
import SpecialityItem, { UpgradeSpecialityBtn } from './SpecialityItem';
import SpecialityPanel from "./SpecialityPanel";
import TooltipText, { Specification } from "../TooltipText";
import { getLegendKey, getBaseKey } from "@/utils/mugen";
import "./styles.less";
import Modal from "antd/lib/modal/Modal";

const { Paragraph, Text } = Typography;

interface ITemProps {
  character: IMugenCharacter;
  attribute: BaseAttributeType;
}
const BaseCharacterAttributeItem: React.SFC<ITemProps> = (props) => {
  const character = props.character;
  const key = props.attribute;
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const getAttributeUpgradCredit = (attrVlue: number) => {
    return attrVlue * 200;
  };

  const getAttributeUpgradExp = (attrVlue: number) => {
    return attrVlue * 4;
  };

  const handleUpgrade = (method: "credit" | "experience") => {
    setLoading(true);
    setPopoverVisible(false);
    CharacterStore.upgradeAttribute(character.uuid, key, method)
      .then(() => {
        message.success("升级属性成功");
        CharacterStore.refreshCharacterData();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Paragraph className="character-card-attribute-item">
      <TooltipText
        readKey={key}
        tooltip={Specification[key]}
        className="character-card-attribute-item-key"
      >
        {AttributeMap[key]}
      </TooltipText>
      {character.attributes[getLegendKey(key)] > 0 && (
        <TooltipText
          tooltip={Specification[getLegendKey(key)]}
          className="character-card-attribute-item-key"
        >
          <span className="character-card-legend-attribute">
            {character.attributes[getLegendKey(key)]}
          </span>
        </TooltipText>
      )}
      <CharacterAttributeValue
        className="character-card-attribute-item-value"
        character={character}
        attributeKey={key}
      />
      <span className="character-card-attribute-item-action">
        <Popover
          placement="rightTop"
          visible={popoverVisible}
          title={null}
          trigger="click"
          onVisibleChange={(visible) => setPopoverVisible(visible)}
          content={
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Button
                type="primary"
                style={{ width: 200, marginBottom: 16 }}
                loading={loading}
                disabled={character.credit <
                  getAttributeUpgradCredit(character.attributes[key])
                }
                onClick={() => handleUpgrade("credit")}
              >
                花费
                {getAttributeUpgradCredit(
                  character.attributes[getBaseKey(key)]
                )}
                点积分提升1级
              </Button>
              <Button
                type="primary"
                style={{ width: 200 }}
                loading={loading}
                disabled={character.experience <
                  getAttributeUpgradExp(character.attributes[getBaseKey(key)])
                }
                onClick={() => handleUpgrade("experience")}
              >
                花费
                {getAttributeUpgradExp(character.attributes[getBaseKey(key)])}
                点经验提升1级
              </Button>
            </div>
          }
        >
          <Button
            type="primary"
            shape="circle"
            size="small"
            disabled={
              character.experience <
                getAttributeUpgradExp(character.attributes[key]) &&
              character.credit <
                getAttributeUpgradCredit(character.attributes[key])
            }
            icon={<PlusOutlined style={{ fontSize: 12 }} />}
          />
        </Popover>
      </span>
    </Paragraph>
  );
};


interface IProps {}

const CharacterAttribute: React.SFC<IProps> = observer((props) => {
  const character = CharacterStore.characterDetail;
  const [specialityModalVisible, setSpecialityModalVisible] = useState(false);

  if (!character) {
    return <Spin />;
  }

  return (
    <React.Fragment>
      <Row gutter={16} className="character-card-page">
        {!UIStore.isMobile && (
          <CharacterFigure character={character} />
        )}
        <Col xs={24} md={6} className="character-card-col">
          <CharacterScrollPanel title="属性">
            {BaseAttribute.map((key) => (
              <BaseCharacterAttributeItem
                key={key}
                character={character}
                attribute={key}
              />
            ))}
            <Divider style={{ fontSize: 14 }}>衍生属性</Divider>
            {DerivedAttribute.map((key) => (
              <Paragraph key={key} className="character-card-attribute-item">
                <TooltipText
                  readKey={key}
                  tooltip={Specification[key]}
                  className="character-card-attribute-item-key"
                >
                  {AttributeMap[key]}
                </TooltipText>
                <CharacterAttributeValue
                  className="character-card-attribute-item-value"
                  character={character}
                  attributeKey={key}
                />
              </Paragraph>
            ))}
            <Divider style={{ fontSize: 14 }}>防御属性</Divider>
            {DefenseAttribute.map((key) => (
              <Paragraph key={key} className="character-card-attribute-item">
                <TooltipText
                  readKey={key}
                  tooltip={Specification[key]}
                  className="character-card-attribute-item-key"
                >
                  {AttributeMap[key]}
                </TooltipText>
                <CharacterAttributeValue
                  className="character-card-attribute-item-value"
                  character={character}
                  attributeKey={key}
                />
              </Paragraph>
            ))}
          </CharacterScrollPanel>
        </Col>
        <Col xs={24} md={6} className="character-card-col">
          <CharacterScrollPanel title="技能">
            <Divider style={{ fontSize: 14 }}>
              {SkillCategoryMap[SkillCategory.Physiology]}技能
            </Divider>
            {CategoryToSkillDict[SkillCategory.Physiology].map((skillFlag) => {
              const skill = character.skills.find(
                (skill) => skill.flag === skillFlag
              );
              if (!skill) {
                return null;
              }
              return (
                <CharacterSkillItem
                  key={skillFlag}
                  flag={skillFlag}
                  majors={skill.majors}
                  grade={skill.grade}
                  residueMajorPoint={skill.residueMajorPoint}
                />
              );
            })}
            <Divider style={{ fontSize: 14 }}>
              {SkillCategoryMap[SkillCategory.Mental]}技能
            </Divider>
            {CategoryToSkillDict[SkillCategory.Mental].map((skillFlag) => {
              const skill = character.skills.find(
                (skill) => skill.flag === skillFlag
              );
              if (!skill) {
                return null;
              }
              return (
                <CharacterSkillItem
                  key={skillFlag}
                  flag={skillFlag}
                  majors={skill.majors}
                  grade={skill.grade}
                  residueMajorPoint={skill.residueMajorPoint}
                />
              );
            })}
            <Divider style={{ fontSize: 14 }}>
              {SkillCategoryMap[SkillCategory.Interaction]}技能
            </Divider>
            {CategoryToSkillDict[SkillCategory.Interaction].map((skillFlag) => {
              const skill = character.skills.find(
                (skill) => skill.flag === skillFlag
              );
              if (!skill) {
                return null;
              }
              return (
                <CharacterSkillItem
                  key={skillFlag}
                  flag={skillFlag}
                  majors={skill.majors}
                  grade={skill.grade}
                  residueMajorPoint={skill.residueMajorPoint}
                />
              );
            })}
          </CharacterScrollPanel>
        </Col>
        <Col xs={24} md={8} className="character-card-col">
          <CharacterScrollPanel 
            title="专长"
            actions={[
              <Button type="primary" block onClick={() => setSpecialityModalVisible(true)}>
                获取新专长
              </Button>
            ]}
          >
            {character.specialities.map((s) => (
              <SpecialityItem
                key={`speciality-${s.speciality.id}`}
                speciality={s.speciality}
                currentLevel={s.currentLevel}
                action={(
                  <UpgradeSpecialityBtn 
                    character={character}
                    speciality={s.speciality}
                    currentLevel={s.currentLevel}
                    onRefresh={() => CharacterStore.refreshCharacterData()}
                  />
                )}
              />
            ))}
          </CharacterScrollPanel>
        </Col>
      </Row>
      <Modal
        visible={specialityModalVisible}
        onCancel={() => setSpecialityModalVisible(false)}
        className="speciality-modal"
        title="购买新专长"
        closable={false}
        footer={null}
      >
        <SpecialityPanel 
          character={character}
          onRefresh={() => CharacterStore.refreshCharacterData()}
        />
      </Modal>
    </React.Fragment>
  );
});

export default CharacterAttribute;
