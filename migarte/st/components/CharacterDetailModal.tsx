import React, { useState } from "react";
import {
  Avatar,
  Button,
  Table,
  Progress,
  Modal,
  Tabs,
  Typography,
} from "antd";
import { 
  AttributeMap, 
  BaseAttribute, 
  DerivedAttribute, 
  DefenseAttribute, 
  GENDER_MAP,
} from "@/interfaces/character";
import { 
  SkillFlag,
  SkillMap,
  SkillMajorMap,
} from "@/interfaces/skill";
import { 
  SkillCheckMap,
  SkillCheck,
} from "@/interfaces/check";
import { IMugenCharacter } from "@/interfaces/mugen";
import { getCheckedDp } from "@/utils/mugen";
import CharacterStatusPanel from './CharacterStatusPanel';
import CharacterCombatPanel from './CharacterCombatPanel';
import CharacterInventoryPanel from './CharacterInventoryPanel';
import { observer } from "mobx-react";
import "./CharacterDetailModal.less";

const { TabPane } = Tabs;
const { Title, Text, Paragraph } = Typography;

interface Props {
  visible: boolean;
  onCancel: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  character: IMugenCharacter;
}


const CharacterDetailModal: React.SFC<Props> = observer((props) => {
  const { visible, onCancel, character } = props;

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={null}
      title={null}
      closable={false}
    >
      <Tabs>
        <TabPane tab="状态" key="status">
          <CharacterStatusPanel character={character} />
        </TabPane>
        <TabPane tab="战斗" key="combat">
          <CharacterCombatPanel character={character} />
        </TabPane>
        <TabPane tab="基本属性" key="attribute">
          <Paragraph>
            <Text strong>{character.name} / {GENDER_MAP[character.gender]} / {character.age}</Text>
          </Paragraph>
          <div className="character-detail-modal-panel">
            <Paragraph>
              <Text>外貌</Text>
              <Text>{character.appearance}</Text>
            </Paragraph>
          </div>
          <div className="character-detail-modal-panel">
            {BaseAttribute.map((attr) => (
              <Paragraph key={attr}>
                <Text strong>{AttributeMap[attr]}</Text>
                <Text>{character.attributes[attr]}</Text>
              </Paragraph>
            ))}
          </div>
          <div className="character-detail-modal-panel">
            {DerivedAttribute.map((attr) => (
              <Paragraph key={attr}>
                <Text strong>{AttributeMap[attr]}</Text>
                <Text>{character.attributes[attr]}</Text>
              </Paragraph>
            ))}
          </div>
          <div className="character-detail-modal-panel">
            {DefenseAttribute.map((attr) => (
              <Paragraph key={attr}>
                <Text strong>{AttributeMap[attr]}</Text>
                <Text>{character.attributes[attr]}</Text>
              </Paragraph>
            ))}
          </div>
        </TabPane>
        <TabPane tab="技能" key="skill">
          <div className="character-detail-modal-panel">
            {(Object.keys(SkillMap) as Array<SkillFlag>).map((flag) => (
              <Paragraph key={flag}>
                <Text strong>{SkillMap[flag]}</Text>
                <Text>
                  {character.skills.find(skill => skill.flag === flag)!.grade}
                </Text>
                <Text>
                  {character.skills.find(skill => skill.flag === flag)!.majors.map((major) => (
                    <span key={major} style={{ margin: '0 4px' }}>[{SkillMajorMap[major]}]</span>
                  ))}
                </Text>
              </Paragraph>
            ))}
          </div>
        </TabPane>
        <TabPane tab="检定" key="check">
          <div className="character-detail-modal-panel">
            {(Object.keys(SkillCheckMap) as Array<any> as Array<SkillCheck>).map((check) => (
              <Paragraph key={check}>
                <Text strong>{SkillCheckMap[check]}</Text>
                <Text>
                  {getCheckedDp(character, check)}
                </Text>
              </Paragraph>
            ))}
          </div>
        </TabPane>
        <TabPane tab="背包" key="inventory">
          <CharacterInventoryPanel character={character} />
        </TabPane> 
      </Tabs>
    </Modal>
  );
});

export default CharacterDetailModal;
