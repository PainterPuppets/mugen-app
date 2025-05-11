import React, { useReducer, useState, useEffect } from "react";
import { observer } from "mobx-react";
import { MinusOutlined, PlusOutlined, BulbOutlined } from "@ant-design/icons";
import {
  SkillFlag,
  SkillMajor,
  CategoryToSkillDict,
  SkillCategory,
  SkillCategoryMap,
  SkillMap,
  SkillToCategoryDict,
  MajorToSkillDict,
  SkillToMajorDict,
  SkillMajorMap,
} from "@/interfaces/skill";
import { MODAL_VISIBLE_KEY } from "@/shared/constants/storage";
import { Skills, initSkills } from '@/character/interfaces/character';
import { Button, Modal, Tag, Tooltip, Typography } from "antd";
import TooltipText, { Specification } from '@/character/components/TooltipText';
import CharacterCreateStore from '@/character/stores/CharacterCreateStore';
import "./CharacterCreateSkillPanel.less";

const { Title, Paragraph, Text } = Typography;
const { CheckableTag } = Tag;

const getResidualPoint = (skills: Skills) => {
  let result = 20;
  (Object.keys(skills) as Array<SkillFlag>).map((key) => {
    let value = skills[key];
    if (value === undefined) {
      return;
    }

    result -= value.grade;
  });

  return result;
};

const getCategoryDict = (skills: Skills) => {
  let CategoryDict = {
    [SkillCategory.Physiology]: 0,
    [SkillCategory.Mental]: 0,
    [SkillCategory.Interaction]: 0,
  };

  (Object.keys(skills) as Array<SkillFlag>).map((key) => {
    let value = skills[key];
    if (value === undefined) {
      return;
    }
    CategoryDict[SkillToCategoryDict[key]] += value.grade;
  });

  return CategoryDict;
};

const canIncrementSkill = (skills: Skills, skill: SkillFlag) => {
  let residualPoint = getResidualPoint(skills);
  if (residualPoint === 0) {
    return false;
  }

  if (skills[skill].grade > 2) {
    return false;
  }

  let CATEGORY_MAX_RULE: { [key: number]: number } = {
    0: 6,
    1: 5,
    2: 4,
  };

  let dict = getCategoryDict(skills);
  let skillCategoryValue = dict[SkillToCategoryDict[skill]];
  let sortableValue = Object.values(dict).sort((a, b) => b - a);

  let index = sortableValue.findIndex((v) => v === skillCategoryValue);
  let n = 5;
  sortableValue.map((v, i) => {
    n -= Math.max(v - CATEGORY_MAX_RULE[i], 0);
    if (i === index) {
      skillCategoryValue -= Math.max(v - CATEGORY_MAX_RULE[i], 0);
    }
  });

  return skillCategoryValue < CATEGORY_MAX_RULE[index] + n;
};

const canDecrementSkill = (skills: Skills, skill: SkillFlag) => {
  if (skills[skill].grade === 0) {
    return false;
  }

  return true;
};

const getResidualMajorPoint = (skills: Skills) =>
  3 -
  (Object.keys(skills) as Array<SkillFlag>).reduce<any>(
    (a, b) =>
      a +
      (skills[b].grade > 2
        ? Math.max(skills[b].majors.length - 1, 0)
        : skills[b].majors.length),
    0
  );

const getResidualSkillMajorPointDict = (skills: Skills) => {
  return (Object.keys(skills) as Array<SkillFlag>).reduce((a, b) => {
    if (skills[b].grade < 3) {
      return {...a, [b]: 0}
    }

    if (skills[b].majors.length > 0) {
      return {...a, [b]: 0}
    }

    return {...a, [b]: 1}
  }, {}) as {[key in SkillFlag]: number}
};

const getResidualSkillMajorPoint = (skills: Skills, skill: SkillFlag) => {
  let dict = getResidualSkillMajorPointDict(skills);
  return dict[skill];
};

export const checkSkills = (skills: Skills) => {
  if (getResidualMajorPoint(skills) !== 0) {
    return false
  }

  if (getResidualPoint(skills) !== 0) {
    return false
  }

  return true
}

const canAddMajor = (skills: Skills, skill: SkillFlag) => {
  if (skills[skill].grade === 0) {
    return false;
  }
  if (getResidualMajorPoint(skills) === 0) {
    return getResidualSkillMajorPoint(skills, skill) === 1;
  }

  return true;
};

const canRemoveMajor = (skills: Skills, major: SkillMajor) => {
  let index = skills[MajorToSkillDict[major]].majors.findIndex(
    (m) => m === major
  );

  if (index === -1) {
    return false;
  }

  return true;
};

enum reducerType {
  INCREMENT = "increment",
  DECREMENT = "decrement",
  ADDMAJOR = "addMajor",
  REMOVEMAJOR = "removeMajor",
}

type skillAction = {
  type: reducerType.INCREMENT | reducerType.DECREMENT;
  skill: SkillFlag;
}

type majorAction = {
  type: reducerType.ADDMAJOR | reducerType.REMOVEMAJOR;
  major: SkillMajor;
}

function reducer(
  skills: Skills,
  action: skillAction | majorAction
) {
  switch (action.type) {
    case reducerType.INCREMENT:
      if (!canIncrementSkill(skills, action.skill)) {
        return skills;
      }

      skills[action.skill].grade += 1;
      return { ...skills };
    case reducerType.DECREMENT:
      if (!canDecrementSkill(skills, action.skill)) {
        return skills;
      }

      skills[action.skill].grade -= 1;
      if (skills[action.skill].grade === 0) {
        skills[action.skill].majors = [];
      }

      if (getResidualMajorPoint(skills) < 0) {
        skills[action.skill].majors = [];
      }

      return { ...skills };
    case reducerType.ADDMAJOR:
      if (!canAddMajor(skills, MajorToSkillDict[action.major])) {
        return skills;
      }

      skills[MajorToSkillDict[action.major]].majors.push(action.major);

      return { ...skills };
    case reducerType.REMOVEMAJOR:
      if (!canRemoveMajor(skills, action.major)) {
        return skills;
      }

      let index = skills[MajorToSkillDict[action.major]].majors.findIndex(
        (m) => m === action.major
      );
      skills[MajorToSkillDict[action.major]].majors.splice(index, 1);

      return { ...skills };
    default:
      throw new Error();
  }
}


type MajorTagProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  major: SkillMajor;
};

const MajorTag: React.SFC<MajorTagProps> = observer((props) => {
  return (
    <CheckableTag
      checked={props.checked}
      onChange={props.onChange}
      key={props.major}
    >
      <TooltipText
        readKey={props.major}
        usingDefault={!props.checked}
        tooltip={Specification[props.major]}
      >
        {SkillMajorMap[props.major]}
      </TooltipText>
    </CheckableTag>
  );
});

interface SkillItemProps {
  skills: Skills;
  flag: SkillFlag;
  dispatch: Function;
}

const CharacterCreateSkillItem: React.SFC<SkillItemProps> = observer((props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const skills = props.skills;
  const skill = props.flag;
  const dispatch = props.dispatch;

  return (
    <React.Fragment>
      <div key={skill} className="skill-item">
        <div style={{ display: "flex", alignItems: "center" }}>
          <TooltipText
            readKey={skill}
            className="skill-item-name"
            tooltip={Specification[skill]}
          >
            <span onClick={() => setModalVisible(true)}>
              {SkillMap[skill]}
            </span>
          </TooltipText>

          {canAddMajor(skills, skill) && (
            <Tooltip title="获得新的专业">
              <Button
                type="primary"
                size="small"
                style={{ marginLeft: 8 }}
                icon={<BulbOutlined style={{ fontSize: 12 }} />}
                onClick={() => setModalVisible(true)}
              />
            </Tooltip>
          )}
          <div className="skill-item-main">
            {canDecrementSkill(skills, skill) && (
              <Button
                type="primary"
                shape="circle"
                size="small"
                icon={<MinusOutlined style={{ fontSize: 12 }} />}
                onClick={() =>
                  dispatch({ type: reducerType.DECREMENT, skill })
                }
              />
            )}
            <span className="skill-item-value">
              {skills[skill].grade}
            </span>
            <Button
              type="primary"
              shape="circle"
              size="small"
              disabled={!canIncrementSkill(skills, skill)}
              icon={<PlusOutlined style={{ fontSize: 12 }} />}
              onClick={() =>
                dispatch({ type: reducerType.INCREMENT, skill })
              }
            />
          </div>
        </div>
        <div className="skill-panel-skill-majors">
          {skills[skill].majors.map((major) => (
            <MajorTag
              key={major}
              checked={Boolean(
                skills[skill].majors.find((m) => m === major)
              )}
              onChange={(checked) => dispatch({type: checked ? reducerType.ADDMAJOR : reducerType.REMOVEMAJOR, major: major})}
              major={major}
            />
          ))}
        </div>
      </div>
      <Modal
        visible={modalVisible}
        title={`获得新的${SkillMap[props.flag]}专业`}
        onCancel={() => setModalVisible(false)}
        className="major-select-modal"
        footer={null}
      >
        <div className="major-point-description">
          您当前有{getResidualMajorPoint(skills)}个
          <TooltipText
            readKey="free-major-point"
            tooltip="在建立人物卡时，可以获得3个自由专业点，这些点数可以让你获得技能等级至少1级技能的专业"
            style={{ fontWeight: "bold", margin: "0 4px" }}
          >
            自由专业点
          </TooltipText>
          ， 以及{getResidualSkillMajorPoint(skills, skill)}个
          <TooltipText
            readKey="free-major-point"
            tooltip="每当你的某一项技能升到3、5级时便可以获得一个奖励专业点，用于免费获取一个该技能下的专业"
            style={{ fontWeight: "bold", margin: "0 4px" }}
          >
            奖励专业点
          </TooltipText>
        </div>
        <div className="major-item-list">
          {SkillToMajorDict[props.flag].map((major) => {
            const hasMajor = skills[skill].majors.find((m) => m === major) !== undefined;

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
                  <Button 
                    type={"primary"}
                    danger={hasMajor}
                    size="small"
                    disabled={!hasMajor && getResidualMajorPoint(skills) === 0 && getResidualSkillMajorPoint(skills, skill) === 0}
                    onClick={() => {
                      dispatch({
                        type: hasMajor
                          ? reducerType.REMOVEMAJOR
                          : reducerType.ADDMAJOR,
                        major: major,
                      })
                    }}
                  >
                    {hasMajor ? "取消该专业" : "获取该专业"}
                  </Button>
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

const CharacterCreateSkillPanel: React.SFC = observer(() => {
  const [skills, dispatch] = useReducer(reducer, initSkills);
  const [modalVisible, setModalVisible] = useState(localStorage.getItem(MODAL_VISIBLE_KEY + 'skill-panel') !== 'false');


  useEffect(() => {
    CharacterCreateStore.skills = skills;
  }, [skills])

  return (
    <div className="skill-panel">
      <div className="skill-panel-header">
        剩余技能点：{getResidualPoint(skills)}，剩余专业点：
        {getResidualMajorPoint(skills)}
        <a onClick={() => setModalVisible(true)}>技能是什么？教我建卡</a>
      </div>
      <div style={{ overflowY: "scroll", paddingRight: 16 }}>
        {(Object.keys(CategoryToSkillDict) as Array<SkillCategory>).map(
          (category) => (
            <React.Fragment key={category}>
              <div className="skill-category">
                {SkillCategoryMap[category]} （当前已分配{" "}
                {getCategoryDict(skills)[category]} 点）
              </div>
              {CategoryToSkillDict[category].map((skill) => (
                <CharacterCreateSkillItem key={skill} skills={skills} flag={skill} dispatch={dispatch} />
              ))}
            </React.Fragment>
          )
        )}
      </div>
      <Modal 
        visible={modalVisible}
        maskClosable
        onCancel={() => {
          localStorage.setItem(MODAL_VISIBLE_KEY + 'skill-panel', 'false')
          setModalVisible(false)
        }}
        closable={false}
        footer={null}
        width={720}
      >
        <Typography>
          <Title level={2}>建卡-技能段</Title>
          <Paragraph>
            或许你已经读过其他文档了，不过还是要说一下，非常感谢你能读这篇文档，我也非常荣幸为你介绍如何车一张心仪的人物卡<br/>
            如果你已经完全了解该如何建卡，点击旁边的空白区域可以关闭这个弹框。
          </Paragraph>
          <Paragraph>
            首先我们需要了解的是，如何使用这个页面，分配人物的<Text strong>初始技能</Text>。<br/>
            什么是<Text strong>技能</Text>？
            技能是区别每个角色的重要标识，代表了角色擅长做哪些事，以及不擅长做哪些事。<br/>
            和属性一样，技能也分为生理/心智/互动三个大类。<br/>
            每个类别下都有许多技能，如果你不清楚这些技能都是干什么的，将鼠标放在他们的名字上时就可以显示出这些技能所代表的意义。<br/>
          </Paragraph>
          <Paragraph>
            了解完技能之后我们需要了解另一个重要的概念——<Text strong>技能专业</Text>。<br/>
            即便是同一个技能，但是不同的方向也有可能会有很大的区别，比如虽然游泳和田径都属于运动技能。<br/>
            但是会游泳的人不一定田径也好，所以<Text strong>技能专业</Text>代表了人物在这项技能的哪些方面上更加专业。<br/>
          </Paragraph>

          <Title level={3}>技能分配规则</Title>
          <Paragraph>
            和属性类似。将6/5/4点的点数任意分别分配给生理、心智、互动三类技能，然后将各自的点数加在各项技能上。<br/>
            然后，将5点自由点数任意加在需要的技能上。一般情况下，初始人物卡的技能等级上限为3。<br/>
            另外，人物可以免费获得三个专业，人物可以将这些专业放在一个或多个至少1级的技能下。<br/>
            特殊的是，将一项技能升到3级以及5级时将获得额外免费的专业点数。<br/>
            在这张卡里面这些计算都是自动进行的，并且类型上也会标出已经分配了多少点，所以不用担心会算不清楚。<br/>
          </Paragraph>
          <Title level={3}>给新手的话</Title>
          <Paragraph>
            我是新手？我该如何分配？<br/>
            如果你不知道该分配什么技能的话，这里有一些推荐。<br/>
            和战斗相关的技能有<Text strong>肉搏</Text>、<Text strong>白刃</Text>、<Text strong>弓箭</Text>、<Text strong>枪械</Text>、<Text strong>神秘学</Text>。<br/>
            和防御相关的技能有<Text strong>运动</Text>、<Text strong>求生</Text>。<br/>
            和NPC交流相关的技能有<Text strong>调查</Text>、<Text strong>感受</Text>、<Text strong>胁迫</Text>、<Text strong>交际</Text>、<Text strong>掩饰</Text>。<br/>
            一些常用的技能有<Text strong>驾驶</Text>、<Text strong>手上功夫</Text>、<Text strong>躲藏</Text>、<Text strong>医学</Text>。<br/>
            你可以想一下自己的人物应该擅长哪些方面的技能，然后选取其中一些分配点数。<br/>
          </Paragraph>
          <Paragraph>
            关于技能和专业的知识大概就是这么多了。<br/>
            如果你想再看一遍这篇说明的话，只要点击右上角的<Text strong>这是什么？教我建卡</Text>文字，这份说明就会弹出来。<br/>
            那么，请享受人物卡吧😉<br/>
          </Paragraph>
        </Typography>
      </Modal>
    </div>
  );
});

export default CharacterCreateSkillPanel;
