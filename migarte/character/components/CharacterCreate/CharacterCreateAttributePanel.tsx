import React, { useReducer, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
  CategoryToAttributeDict,
  AttributeToCategoryDict,
  AttributeCategoryMap,
  AttributeCategory,
  AttributeMap,
  BaseAttributeType,
} from "@/interfaces/character";
import { Attributes } from "@/character/interfaces/character";
import { Button, Modal, Typography } from "antd";
import { Specification } from "@/interfaces/tooltip";
import TooltipText from "@/character/components/TooltipText";
import { MODAL_VISIBLE_KEY } from "@/shared/constants/storage";
import CharacterCreateStore from "@/character/stores/CharacterCreateStore";
import "./CharacterCreateAttributePanel.less";

const { Title, Paragraph, Text } = Typography;

const getResidualPoint = (attributes: Attributes) => {
  let result = 9;
  (Object.keys(attributes) as Array<BaseAttributeType>).map((key) => {
    let value = attributes[key];
    if (value === undefined) {
      return;
    }

    result -= value > 4 ? value : value - 1;
  });

  return result;
};

const getCategoryDict = (attributes: Attributes) => {
  let CategoryDict = {
    [AttributeCategory.Physiology]: 0,
    [AttributeCategory.Mental]: 0,
    [AttributeCategory.Interaction]: 0,
  };

  Object.keys(attributes).map((key) => {
    let value = attributes[key as BaseAttributeType];
    if (value === undefined) {
      return;
    }
    CategoryDict[AttributeToCategoryDict[key as BaseAttributeType]] +=
      value > 4 ? value : value - 1;
  });

  return CategoryDict;
};

const canIncrement = (attributes: Attributes, attr: BaseAttributeType) => {
  let residual = getResidualPoint(attributes);
  if (residual === 0) {
    return false;
  }

  if (attributes[attr] > 4) {
    return false;
  }

  if (attributes[attr] === 4 && residual < 2) {
    return false;
  }

  let MAX_RULE: { [key: number]: number } = {
    0: 3,
    1: 2,
    2: 1,
  };

  let dict = getCategoryDict(attributes);
  let sortableValue = Object.values(dict).sort((a, b) => b - a);
  let categoryValue = dict[AttributeToCategoryDict[attr]];

  let index = sortableValue.findIndex((v) => v === categoryValue);
  let n = 3;
  sortableValue.map((v, i) => {
    n -= Math.max(v - MAX_RULE[i], 0);
    if (i === index) {
      categoryValue -= Math.max(v - MAX_RULE[i], 0);
    }
  });

  if (attributes[attr] === 4) {
    categoryValue += 1;
  }

  return categoryValue < MAX_RULE[index] + n;
};

const canDecrement = (attributes: Attributes, attr: BaseAttributeType) => {
  if (attributes[attr] === 1) {
    return false;
  }

  return true;
};

function reducer(
  state: Attributes,
  action: { attr: BaseAttributeType; type: "increment" | "decrement" }
) {
  switch (action.type) {
    case "increment":
      if (!canIncrement(state, action.attr)) {
        return state;
      }

      state[action.attr] += 1;
      return { ...state };
    case "decrement":
      if (!canDecrement(state, action.attr)) {
        return state;
      }

      state[action.attr] -= 1;
      return { ...state };
    default:
      throw new Error();
  }
}

export const checkAttributes = (attributes: Attributes) => {
  return getResidualPoint(attributes) === 0;
};

const CharacterCreateAttributePanel: React.SFC = observer(() => {
  const [attributes, dispatch] = useReducer(
    reducer,
    CharacterCreateStore.attributes
  );
  const [modalVisible, setModalVisible] = useState(localStorage.getItem(MODAL_VISIBLE_KEY + 'attribute-panel') !== 'false');

  useEffect(() => {
    CharacterCreateStore.attributes = attributes;
  }, [attributes]);

  const getCategoryPoint = (category: AttributeCategory) => {
    return getCategoryDict(attributes)[category];
  };

  const renderAttr = (attr: BaseAttributeType) => (
    <div className="attribute-item" key={attr}>
      <TooltipText
        readKey={attr}
        className="attribute-name"
        tooltip={Specification[attr]}
      >
        {AttributeMap[attr]}
      </TooltipText>
      <div className="attribute-main">
        {canDecrement(attributes, attr) && (
          <Button
            type="primary"
            shape="circle"
            size="small"
            icon={<MinusOutlined style={{ fontSize: 12 }} />}
            onClick={() => dispatch({ attr, type: "decrement" })}
          />
        )}
        <span className="attribute-value">{attributes[attr]}</span>
        <Button
          type="primary"
          shape="circle"
          size="small"
          disabled={!canIncrement(attributes, attr)}
          icon={<PlusOutlined style={{ fontSize: 12 }} />}
          onClick={() => dispatch({ attr, type: "increment" })}
        />
      </div>
    </div>
  );

  return (
    <div className="attributes-panel">
      <div className="attributes-panel-header">
        剩余属性点：{getResidualPoint(attributes)} <a onClick={() => setModalVisible(true)}>属性是什么？教我建卡</a>
      </div>
      <div style={{ overflowY: "scroll", paddingRight: 16 }}>
        {(Object.keys(CategoryToAttributeDict) as Array<AttributeCategory>).map(
          (category) => (
            <React.Fragment key={category}>
              <div className="attribute-category">
                {AttributeCategoryMap[category]} (当前已分配：
                {getCategoryPoint(category)})
              </div>
              <div className="attributes">
                {CategoryToAttributeDict[category].map((attr) =>
                  renderAttr(attr)
                )}
              </div>
            </React.Fragment>
          )
        )}
      </div>
      <Modal 
        visible={modalVisible}
        maskClosable
        onCancel={() => {
          localStorage.setItem(MODAL_VISIBLE_KEY + 'attribute-panel', 'false')
          setModalVisible(false)
        }}
        closable={false}
        footer={null}
        width={720}
      >
        <Typography>
          <Title level={2}>建卡-属性段</Title>
          <Paragraph>
            hello，我是布偶。首先十分感谢你能查看这份说明文档，非常荣幸能为你介绍如何建一张心仪的人物卡。<br/>
            如果你已经完全了解该如何建卡，点击旁边的空白区域可以关闭这个弹框。
          </Paragraph>
          <Paragraph>
            首先我们需要了解的是，如何使用这个页面，分配人物的<Text strong>初始属性</Text>。<br/>
            什么是<Text strong>属性</Text>？这是一个好问题，因为至少要知道这是什么，才能构筑出你心中理想的角色卡。<br/>
            属性是衡量一个角色在各方面能力上的数值化体现。<br/>
            对于角色来说一共有9维属性，分为生理/心智/互动三个大类。<br/>
            简单来说，如果你想让你的人物非常强壮，随手能捏爆或者咬碎什么东西，那么别犹豫请在<Text>力量</Text>上多分配一些点数吧。<br/>
            或者你觉得你的角色非常敏锐，能快速洞察周围发生了什么事。那就分配一些点数在<Text>感知</Text>上吧。<br/>
            这只是两个简单的例子，如果你不清楚这9个属性都是干什么的，将鼠标放在他们的名字上时就可以显示出这些属性所代表的意义。<br/>

            或许你对于属性的数值含义还有一些疑问。在无限恐怖的世界中，1代表的是大多数普通人在这项属性上的平均值，而5则是人类的极限水平。<br/>
            而作为玩家来说，在获得一些强化之后突破人类极限也是常有的事。<br/>
          </Paragraph>
          <Title level={3}>属性分配规则</Title>
          <Paragraph>
            那么在了解了什么是属性之后我们就需要知道一张初始人物卡该如何分配属性了。<br/>
            首先，我们需要将1/2/3点的点数任意分别分配给生理、心智、互动三类属性，然后将点数加在各项属性上。<br/>
            然后，将3点自由点数任意加在想要提高的属性上。另外，将一项已经加到4的属性提升到5，需要耗费2点点数。<br/>
            在这张卡里面这些计算都是自动进行的，并且属性类型上也会标出已经分配了多少点，所以不用担心会算不清楚。<br/>
          </Paragraph>
          <Title level={3}>给新手的话</Title>
          <Paragraph>
            我是新手？我该如何分配？<br/>
            如果你不知道该分配什么属性的话，我这里有一些推荐。<br/>
            如果你想玩一个远程的弓箭手，那么请点高敏捷和感知这两项属性。<br/>
            如果你想玩一个近战战士的话，请点一些力量和体质吧。<br/>
            如果你想玩法师，emmm真的想玩法师么？这会有一点点难哦。不过没关系，如果你想玩的话请点一些智力吧，会对施法有很大的帮助。<br/>
          </Paragraph>
          <Paragraph>
            关于属性的介绍大概就是这么多了。<br/>
            如果你想再看一遍这篇说明的话，只要点击右上角的<Text strong>这是什么？教我建卡</Text>文字，这份说明就会弹出来。<br/>
            那么，请享受人物卡吧😉<br/>
          </Paragraph>
        </Typography>
      </Modal>
    </div>
  );
});

export default CharacterCreateAttributePanel;
