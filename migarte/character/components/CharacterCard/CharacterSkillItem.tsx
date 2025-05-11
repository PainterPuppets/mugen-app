import React, { useState } from "react";
import {
  Modal,
  Button,
  Tooltip,
  message,
  Popconfirm,
} from "antd";
import { observer } from "mobx-react";
import CharacterStore from "@/character/stores/CharacterStore";
import { BulbOutlined, PlusOutlined, CheckSquareOutlined } from "@ant-design/icons";
import {
  SkillFlag,
  SkillMajor,
  SkillMap,
  SkillToMajorDict,
  SkillMajorMap,
} from "@/interfaces/skill";
import TooltipText, { Specification } from "../TooltipText";
import "./styles.less";

interface SkillItemIProps {
  flag: SkillFlag;
  majors: Array<SkillMajor>;
  grade: number;
  residueMajorPoint: number;
}

const CharacterSkillItem: React.SFC<SkillItemIProps> = observer((props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const character = CharacterStore.characterDetail;
  if (!character) {
    return null;
  }

  const getSkillUpgradExp = (grade: number) => {
    if (grade === 0) {
      return 3;
    }

    return Math.max((grade - 1) * 2, 1);
  };

  return (
    <React.Fragment>
      <div className="character-card-skill-item">
        <div className="character-card-skill-item-main">
          <TooltipText
            readKey={props.flag}
            className="character-card-skill-name"
            tooltip={Specification[props.flag]}
          >
            {SkillMap[props.flag]}
          </TooltipText>
          <Tooltip
            title={
              props.grade === 0
                ? "至少需要1点技能才能获取专业"
                : props.residueMajorPoint > 0
                ? `有${props.residueMajorPoint}个免费专业可获取`
                : "兑换新的技能专业"
            }
          >
            <Button
              type="primary"
              size="small"
              style={{ marginLeft: 8 }}
              icon={<BulbOutlined style={{ fontSize: 12 }} />}
              disabled={
                (props.residueMajorPoint <= 0 && character.experience < 1) ||
                props.grade === 0
              }
              onClick={() => setModalVisible(true)}
            />
          </Tooltip>

          <div className="character-card-skill-value">{props.grade}</div>

          <div className="character-card-skill-action">
            <Popconfirm
              placement="top"
              title={`确定要花费${getSkillUpgradExp(
                props.grade
              )}xp来升级该技能么`}
              onConfirm={() =>
                CharacterStore.upgradeSkill(
                  CharacterStore.characterDetail!.uuid,
                  props.flag
                ).then(() => {
                  message.success("升级技能成功");
                  CharacterStore.refreshCharacterData();
                })
              }
              okText="确认"
              cancelText="取消"
            >
              <Button
                type="primary"
                shape="circle"
                size="small"
                disabled={character.experience < getSkillUpgradExp(props.grade)}
                icon={<PlusOutlined style={{ fontSize: 12 }} />}
              />
            </Popconfirm>
          </div>
        </div>
        {props.majors.length !== 0 && (
          <div className="character-card-skill-item-majors">
            {props.majors.map((major) => (
              <TooltipText
                key={major}
                wrapperClassName="character-card-skill-item-major"
                readKey={major}
                tooltip={Specification[major]}
              >
                {SkillMajorMap[major]}
              </TooltipText>
            ))}
          </div>
        )}
      </div>
      <Modal
        visible={modalVisible}
        title={`获得新的${SkillMap[props.flag]}专业`}
        onCancel={() => setModalVisible(false)}
        className="major-select-modal"
        footer={null}
      >
        <div className="major-item-list">
          {SkillToMajorDict[props.flag].map((major) => {
            const hasMajor =
              props.majors.find((m) => m === major) !== undefined;
            let canExchange = !hasMajor;
            if (!hasMajor && props.residueMajorPoint === 0) {
              canExchange = character.experience >= 1;
            }

            return (
              <div className="major-item" key={major}>
                <TooltipText
                  readKey={major}
                  className="major-item-name"
                  tooltip={Specification[major]}
                >
                  {SkillMajorMap[major]}
                </TooltipText>

                <div className="major-item-action">
                  <Popconfirm
                    placement="top"
                    title={
                      props.residueMajorPoint > 0
                        ? "确定要免费兑换该专业么？"
                        : "确定要花费1xp来获取该专业么"
                    }
                    onConfirm={() => {
                      CharacterStore.getSkillMajor(
                        CharacterStore.characterDetail!.uuid,
                        major
                      ).then(() => {
                        message.success(
                          `成功获取【${SkillMajorMap[major]}】专业`
                        );
                        CharacterStore.refreshCharacterData();
                      });
                    }}
                    disabled={!canExchange}
                    okText="确认"
                    cancelText="取消"
                  >
                    <Button type="primary" size="small" disabled={!canExchange}>
                      {hasMajor ? "已获得" : "获取该专业"}
                    </Button>
                  </Popconfirm>
                </div>
              </div>
            );
          })}
        </div>
        <Button block type="primary" onClick={() => setModalVisible(false)}>
          确定
        </Button>
      </Modal>
    </React.Fragment>
  );
});

export default CharacterSkillItem;