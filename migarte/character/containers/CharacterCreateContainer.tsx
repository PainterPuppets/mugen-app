import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import {
  Card,
  Typography,
  Button,
  Col,
  Row,
  Tabs,
  Select,
  Slider,
  Input,
  Alert,
  message,
} from "antd";
import CharacterCreateAttributePanel, {
  checkAttributes,
} from "../components/CharacterCreate/CharacterCreateAttributePanel";
import CharacterCreateSkillPanel, {
  checkSkills,
} from "../components/CharacterCreate/CharacterCreateSkillPanel";
import PageHeader from '@/shared/layout/PageHeader';
import "./CharacterCreateContainer.less";
import TooltipText from "../components/TooltipText";
import ImageUploader from "@/shared/components/ImageUploader";
import {
  BaseAttributeType,
  AttributeMap,
  Gender,
  GENDER_MAP,
} from "@/interfaces/character";
import {
  SkillFlag,
  SkillMap,
  SkillMajor,
  SkillMajorMap,
} from "@/interfaces/skill";
import CharacterStore from "@/character/stores/CharacterStore";
import CharacterCreateStore from "@/character/stores/CharacterCreateStore";
import { useHistory } from "react-router-dom";
const { Option } = Select;
const { Paragraph, Text } = Typography;
const { TabPane } = Tabs;

enum TabPage {
  CONCEPT = "concept",
  ATTRIBUTE = "attribute",
  SKILL = "skill",
  DETAIL = "detail",
}

const MALE_FIGURE = `https://dicetower-media.oss-cn-heyuan.aliyuncs.com/figure/asia-male.png`;
const FEMALE_FIGURE = `https://dicetower-media.oss-cn-heyuan.aliyuncs.com/figure/asia-female.png`;

const CharacterCreateContainer: React.SFC = observer(() => {
  const history = useHistory();
  const [tab, setTab] = useState(TabPage.CONCEPT);

  useEffect(() => {
    if (CharacterCreateStore.figureChanged) {
      return;
    }

    if (CharacterCreateStore.gender === Gender.MALE) {
      CharacterCreateStore.figureUrl = MALE_FIGURE
    }
    if (CharacterCreateStore.gender === Gender.FEMALE) {
      CharacterCreateStore.figureUrl = FEMALE_FIGURE
    }
  }, [CharacterCreateStore.gender, CharacterCreateStore.figureChanged]);

  const createCharacter = () => {
    CharacterCreateStore.createCharacter().then(() => {
      CharacterStore.fetchCharacterList();
      message.success("创建成功，快去看看自己的新角色吧");
      history.push("/character/");
    });
  };

  const canCreateCharacter = () => {
    return checkSkills(CharacterCreateStore.skills) && checkAttributes(CharacterCreateStore.attributes);
  };

  return (
    <React.Fragment>
      <PageHeader>
        创建角色
      </PageHeader>
    <Row gutter={16} className="character-creater-container">
      <Col offset={2} span={8}>
        <Card bordered={false} className="character-create-figure-card">
          <ImageUploader
            defaultImageUrl={CharacterCreateStore.figureUrl}
            className="character-create-figure"
            onUpload={(url) => {
              CharacterCreateStore.figureUrl = url;
              CharacterCreateStore.figureChanged = true;
            }}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Tabs
          className="character-create-tab"
          onChange={(tab) => setTab(tab as TabPage)}
          activeKey={tab}
          defaultActiveKey={TabPage.CONCEPT}
          type="card"
          tabPosition="right"
        >
          <TabPane
            style={{ visibility: "visible" }}
            forceRender
            tab="概念段"
            key={TabPage.CONCEPT}
          >
            <Card bordered={false} className="character-create-card">
              <div className="character-create-card-main">
                <div
                  style={{
                    height: "100%",
                    overflowY: "scroll",
                    paddingRight: 16,
                  }}
                >
                  <Paragraph>
                    <TooltipText
                      readKey="nickanme"
                      tooltip="为你的角色起个名字吧，不过为了减少ST的负担，我建议直接用你的常用名"
                      wrapperClassName="character-create-form-label"
                    >
                      名字
                    </TooltipText>
                    <Input
                      value={CharacterCreateStore.name}
                      onChange={(e) => CharacterCreateStore.name = e.target.value}
                      style={{ width: "auto" }}
                    />
                  </Paragraph>
                  <Paragraph>
                    <TooltipText
                      readKey="gender"
                      tooltip="在大部分情况下男性和女性与战斗无关，但是对于扮演来说还是蛮重要的"
                      wrapperClassName="character-create-form-label"
                    >
                      性别
                    </TooltipText>
                    <Select
                      defaultValue={Gender.MALE}
                      value={CharacterCreateStore.gender}
                      onChange={(value) => CharacterCreateStore.gender = value}
                    >
                      {Object.keys(GENDER_MAP).map((gender) => (
                        <Option key={gender} value={parseInt(gender)}>
                          {GENDER_MAP[parseInt(gender) as Gender]}
                        </Option>
                      ))}
                    </Select>
                  </Paragraph>
                  <Paragraph>
                    <TooltipText
                      readKey="height"
                      tooltip="想象一下您脑海中人物形象的身高，身高会影响角色的体型，更小的体型会增加灵活度，但是相应的也会减少正面对抗的强度"
                      wrapperClassName="character-create-form-label"
                    >
                      身高(cm)
                    </TooltipText>
                    <Slider
                      value={CharacterCreateStore.height}
                      onChange={(value: number | number[]) =>
                        Array.isArray(value)
                          ? CharacterCreateStore.height = value[0]
                          : CharacterCreateStore.height = value
                      }
                      min={125}
                      max={225}
                      marks={{
                        150: "150cm",
                        175: "175cm",
                        200: "200cm",
                      }}
                      defaultValue={175}
                    />
                  </Paragraph>
                  <Paragraph>
                    <TooltipText
                      readKey="appearance"
                      tooltip="用文字描述一下你角色的穿着，外貌，发型之类的。在跑团过程中这些描述将会被其他玩家看到"
                      wrapperClassName="character-create-form-label"
                    >
                      外貌长相
                    </TooltipText>
                    <Input.TextArea
                      rows={5}
                      value={CharacterCreateStore.appearance}
                      onChange={(e) => CharacterCreateStore.appearance = e.target.value}
                    />
                  </Paragraph>
                  <Paragraph>
                    <TooltipText
                      readKey="overview"
                      tooltip="这里可以填写一下角色的性格，背景故事之类的。如果没有什么想法的话可以不填。但是相信我，背景越丰满的人物在扮演时也会越开心"
                      wrapperClassName="character-create-form-label"
                    >
                      简述
                    </TooltipText>
                    <Input.TextArea
                      rows={5}
                      value={CharacterCreateStore.overview}
                      onChange={(e) => CharacterCreateStore.overview = e.target.value}
                    />
                  </Paragraph>
                </div>
              </div>
              <div>
                <Button
                  block
                  type="primary"
                  onClick={() => setTab(TabPage.ATTRIBUTE)}
                >
                  下一项
                </Button>
              </div>
            </Card>
          </TabPane>
          <TabPane
            style={{ visibility: "visible" }}
            tab="属性段"
            key={TabPage.ATTRIBUTE}
          >
            <Card bordered={false} className="character-create-card">
              <div className="character-create-card-main">
                <CharacterCreateAttributePanel />
              </div>

              <div>
                <Button
                  block
                  type="primary"
                  onClick={() => setTab(TabPage.SKILL)}
                >
                  下一项
                </Button>
              </div>
            </Card>
          </TabPane>
          <TabPane
            style={{ visibility: "visible" }}
            tab="技能段"
            key={TabPage.SKILL}
          >
            <Card bordered={false} className="character-create-card">
              <div className="character-create-card-main">
                <CharacterCreateSkillPanel />
              </div>
              <div>
                <Button
                  block
                  type="primary"
                  onClick={() => setTab(TabPage.DETAIL)}
                >
                  下一项
                </Button>
              </div>
            </Card>
          </TabPane>
          <TabPane
            style={{ visibility: "visible" }}
            tab="确认"
            key={TabPage.DETAIL}
          >
            <Card bordered={false} className="character-create-card">
              <div className="character-create-card-main">
                <div
                  style={{
                    height: "100%",
                    overflowY: "scroll",
                    paddingRight: 16,
                  }}
                >
                  <div className="check-title">概念</div>
                  <Paragraph className="check-paragraph">
                    <span className="character-create-form-label">名字</span>
                    {CharacterCreateStore.name}
                  </Paragraph>
                  <Paragraph className="check-paragraph">
                    <span className="character-create-form-label">性别</span>
                    {GENDER_MAP[CharacterCreateStore.gender]}
                  </Paragraph>
                  <Paragraph className="check-paragraph">
                    <span className="character-create-form-label">身高</span>
                    {CharacterCreateStore.height}cm
                  </Paragraph>
                  <Paragraph className="check-paragraph">
                    <span className="character-create-form-label">
                      外貌长相
                    </span>
                    {CharacterCreateStore.appearance}
                  </Paragraph>
                  <Paragraph className="check-paragraph">
                    <span className="character-create-form-label">
                      个人概述
                    </span>
                    {CharacterCreateStore.overview}
                  </Paragraph>

                  <div className="check-title">属性</div>
                  {!checkAttributes(CharacterCreateStore.attributes) && (
                    <Alert
                      type="warning"
                      message={
                        <span>
                          还有未分配的自由属性点
                          <Button
                            type="link"
                            onClick={() => setTab(TabPage.ATTRIBUTE)}
                          >
                            去分配
                          </Button>
                        </span>
                      }
                      style={{ marginBottom: 8 }}
                    />
                  )}
                  {(Object.keys(CharacterCreateStore.attributes) as Array<BaseAttributeType>).map(
                    (attr) => (
                      <Paragraph key={attr} className="check-paragraph">
                        <span className="character-create-form-label">
                          {AttributeMap[attr]}
                        </span>
                        {CharacterCreateStore.attributes[attr]}
                      </Paragraph>
                    )
                  )}

                  <div className="check-title">技能</div>
                  {!checkSkills(CharacterCreateStore.skills) && (
                    <Alert
                      type="warning"
                      message={
                        <span>
                          还有未分配的自由技能点
                          <Button
                            type="link"
                            onClick={() => setTab(TabPage.SKILL)}
                          >
                            去分配
                          </Button>
                        </span>
                      }
                      style={{ marginBottom: 8 }}
                    />
                  )}
                  {(Object.keys(CharacterCreateStore.skills) as Array<SkillFlag>).map((skill) => {
                    if (CharacterCreateStore.skills[skill].grade === 0) {
                      return;
                    }

                    return (
                      <Paragraph key={skill} className="check-paragraph">
                        <span className="character-create-form-label">
                          {SkillMap[skill]}
                        </span>
                        {CharacterCreateStore.skills[skill].grade}
                        {CharacterCreateStore.skills[skill].majors.length !== 0 && (
                          <React.Fragment>
                            （专业：
                            {CharacterCreateStore.skills[skill].majors.reduce(
                              (a, b, index) =>
                                a +
                                SkillMajorMap[b] +
                                (index === CharacterCreateStore.skills[skill].majors.length - 1
                                  ? ""
                                  : ", "),
                              ""
                            )}{" "}
                            ）
                          </React.Fragment>
                        )}
                      </Paragraph>
                    );
                  })}
                </div>
              </div>
              <div>
                <Button
                  disabled={!canCreateCharacter()}
                  block
                  type="primary"
                  onClick={createCharacter}
                >
                  创建人物
                </Button>
              </div>
            </Card>
          </TabPane>
        </Tabs>
      </Col>
    </Row>
    </React.Fragment>
  );
});

export default CharacterCreateContainer;
