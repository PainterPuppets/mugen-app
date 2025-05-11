import workingSVG from "@/assets/svg/working.svg";
import React, { useState, useReducer, useEffect } from "react";
import _ from 'lodash';
import { Select, Modal, Input, InputNumber, Button, Tag } from "antd";
import { observer } from "mobx-react";
import { PlusOutlined } from "@ant-design/icons";
import {
  AnyRule,
  RuleType,
  RuleTypeMap,
  GetRule,
  LiteralRule,
  SubtractionRule,
  DivisionRule,
  ProductRule,
  PlusRule,
  GetRuleKey,
  GetRuleKeyMap,
  ContextKeyMap,
  GetKeyToFlag,
} from "@/interfaces/rule";
import {
  DEFAULT_RULE,
  RuleTypeDefaultMap,
} from './constants';
import { AttributeMap, Attribute } from "@/interfaces/character";
import { SkillMajorMap, SkillMap } from "@/interfaces/skill";
import { toUnderline, toCamel } from "@/utils/helper";
import "./style.less";

export const renderGetRule = (rule: GetRule) => {
  switch (rule.key) {
    case GetRuleKey.ATTRIBUTE:
      return <span>角色属性:{AttributeMap[(toCamel(rule.flag) as Attribute)]}</span>;
      break;

    case GetRuleKey.CONTEXT:
      return (
        <span>
          {ContextKeyMap[rule.flag]}
        </span>
      );
      break;

    case GetRuleKey.MAJOR:
      return (
        <span>
          角色专业:{SkillMajorMap[rule.flag]}
        </span>
      );
      break;

    case GetRuleKey.SKILL:
      return (
        <span>
          角色技能:{SkillMap[rule.flag]}
        </span>
      );
      break;
  }
};

export const renderLiteralRule = (rule: LiteralRule) => {
  return <span>{rule.value}</span>;
};

export const renderPlusRule = (rule: PlusRule) => {
  return (
    <React.Fragment>
      {rule.value.map((r, index) => (
        <React.Fragment key={index}>
          {renderRule(r)}
          {rule.value.length !== index + 1 && <span> + </span>}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export const renderDivisionRule = (rule: DivisionRule) => {
  return (
    <React.Fragment>
      <span>{renderRule(rule.left)}</span> /
      <span>{renderRule(rule.right)}</span>
    </React.Fragment>
  );
};

export const renderSubtractionRule = (rule: SubtractionRule) => {
  return (
    <React.Fragment>
      <span>{renderRule(rule.left)}</span> -
      <span>{renderRule(rule.right)}</span>
    </React.Fragment>
  );
};

export const renderProductRule = (rule: ProductRule) => {
  return (
    <React.Fragment>
      {rule.value.map((r, index) => (
        <React.Fragment key={index}>
          {renderRule(r)}
          {rule.value.length !== index + 1 && <span> * </span>}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export const renderRule = (rule: AnyRule) => {
  if (!rule.type) {
    return 0;
  }

  switch (rule.type) {
    case RuleType.GET:
      return renderGetRule(rule);
      break;
    case RuleType.LITERAL:
      return renderLiteralRule(rule);
      break;
    case RuleType.PLUS:
      return renderPlusRule(rule);
      break;
    case RuleType.PRODUCT:
      return renderProductRule(rule);
      break;
    case RuleType.DIVISION:
      return renderDivisionRule(rule);
      break;
    case RuleType.SUBTRACTION:
      return renderSubtractionRule(rule);
      break;
    default:
      console.log(rule);
      throw new Error("错误的规则");
      break;
  }
};


interface EditableItemProps {
  rule?: AnyRule;
  onSave: (rule: AnyRule) => void;
  closable?: boolean;
  onClose?: Function;
}

const EditableItem: React.SFC<EditableItemProps> = ({
  rule,
  onSave,
  closable,
  onClose = () => {},
}) => {
  const [editorVisible, setEditorVisible] = useState(false)

  return (
    <React.Fragment>
      <Tag 
        closable={closable}
        onClose={onClose as any}
        visible={true}
        className="editable-rule"
        onClick={() => setEditorVisible(true)}
      >
        {rule ? renderRule(rule) : '请点击修改公式'}
      </Tag>
      <RuleItem
        rule={rule}
        visible={editorVisible}
        onCancel={() => setEditorVisible(false)}
        onSave={onSave}
      />
    </React.Fragment>
  )
}

interface RuleItemProps {
  rule?: AnyRule;
  visible: boolean;
  onCancel: Function;
  onSave: (rule: AnyRule) => void;
}

const RuleItem: React.SFC<RuleItemProps> = observer((props) => {
  const reducer = (state: AnyRule, nextState: AnyRule) => ({ ...nextState }) as AnyRule
  const [rule, dispatch] = useReducer(reducer, props.rule || DEFAULT_RULE);

  useEffect(() => {
    if(props.visible) {
      dispatch(props.rule || DEFAULT_RULE)
    }
  }, [props.visible])

  const renderRuleData = (rule: AnyRule) => {
    if (rule.type === RuleType.GET) {
      return (
        <div className="rule-content-expression">
          <Select 
            value={rule.key}
            onChange={(value) => {
              const nRule = {
                type: RuleType.GET,
                key: value,
                flag: GetKeyToFlag[value][0]
              } as GetRule
              dispatch(nRule)
            }}
          >
            {(Object.keys(GetRuleKeyMap) as Array<GetRuleKey>).map((key) => (
              <Select.Option key={key} value={key}>{GetRuleKeyMap[key]}</Select.Option>
            ))}
          </Select>

          <Select 
            value={rule.flag}
            style={{ minWidth: 130 }}
            showSearch
            onChange={(value) => {
              let nRule = rule;
              rule.flag = value;
              dispatch(nRule);
            }}
          >
            {rule.key === GetRuleKey.ATTRIBUTE &&
              GetKeyToFlag[rule.key].map(flag => (
                <Select.Option key={flag} value={toUnderline(flag.toString())}>
                  {AttributeMap[flag]}
                </Select.Option>
              ))
            }
            {rule.key === GetRuleKey.CONTEXT &&
              GetKeyToFlag[rule.key].map(flag => (
                <Select.Option key={flag} value={toUnderline(flag.toString())}>
                  {ContextKeyMap[flag]}
                </Select.Option>
              ))
            }
            {rule.key === GetRuleKey.MAJOR &&
              GetKeyToFlag[rule.key].map(flag => (
                <Select.Option key={flag} value={toUnderline(flag.toString())}>
                  {SkillMajorMap[flag]}
                </Select.Option>
              ))
            }
            {rule.key === GetRuleKey.SKILL &&
              GetKeyToFlag[rule.key].map(flag => (
                <Select.Option key={flag} value={toUnderline(flag.toString())}>
                  {SkillMap[flag]}
                </Select.Option>
              ))
            }
          </Select>
        </div>
      );
    }

    if (rule.type === RuleType.LITERAL) {
      return (
        <div className="rule-content-expression">
          <InputNumber 
            value={rule.value} 
            onChange={(value) => {
              let nRule = rule;
              nRule.value = parseInt(`${value}`) || 0;
              dispatch(nRule);
            }}
          />
        </div>
      )
    }

    if (rule.type === RuleType.PLUS) {
      return (
        <React.Fragment>
          <div className="rule-content-expression">
            {rule.value.map((r, index) => (
              <React.Fragment key={index}>
                <EditableItem
                  rule={r}
                  closable={rule.value.length > 2}
                  onClose={() => {
                    let nRule = _.cloneDeep(rule);
                    nRule.value.splice(index, 1);
                    dispatch(nRule)
                  }}
                  onSave={(value) => {
                    let nRule = _.cloneDeep(rule);
                    nRule.value[index] = value;
                    dispatch(nRule)
                  }}
                />
                {rule.value.length !== index + 1 && <span> + </span>}
              </React.Fragment>
            ))}
          </div>
          <div className="rule-content-action">
            <Button
              type="primary" 
              icon={<PlusOutlined />}
              size="small"
              onClick={() => {
                let nRule = _.cloneDeep(rule);
                nRule.value.push(DEFAULT_RULE);
                dispatch(nRule)
              }}
            >
              增加一项
            </Button>
          </div>
        </React.Fragment> 
      )
    }

    if (rule.type === RuleType.PRODUCT) {
      return (
        <React.Fragment>
          <div className="rule-content-expression">
            {rule.value.map((r, index) => (
              <React.Fragment key={index}>
                <EditableItem
                  rule={r}
                  closable={rule.value.length > 2}
                  onClose={() => {
                    let nRule = _.cloneDeep(rule);
                    nRule.value.splice(index, 1);
                    dispatch(nRule)
                  }}
                  onSave={(r) => {
                    let nRule = _.cloneDeep(rule);
                    nRule.value[index] = r;
                    dispatch(nRule);
                  }}
                />
                {rule.value.length !== index + 1 && <span> * </span>}
              </React.Fragment>
            ))}
          </div>
          <div className="rule-content-action">
            <Button
              type="primary" 
              icon={<PlusOutlined />}
              size="small"
              onClick={() => {
                let nRule = _.cloneDeep(rule);
                nRule.value.push(DEFAULT_RULE);
                dispatch(nRule)
              }}
            >
              增加一项
            </Button>
          </div>
        </React.Fragment> 
      )
    }

    if (rule.type === RuleType.DIVISION) {
      return (
        <div className="rule-content-expression">
          <EditableItem
            rule={rule.left}
            onSave={(r) => {
              let nRule = _.cloneDeep(rule);
              nRule.left = r;
              dispatch(nRule);
            }}
          />
          <span> / </span>
          <EditableItem
            rule={rule.right}
            onSave={(r) => {
              let nRule = _.cloneDeep(rule);
              nRule.right = r;
              dispatch(nRule);
            }}
          />
        </div> 
      );  
    }

    if (rule.type === RuleType.SUBTRACTION) {
      return (
        <div className="rule-content-expression">
          <EditableItem
            rule={rule.left}
            onSave={(r) => {
              let nRule = _.cloneDeep(rule);
              nRule.left = r;
              dispatch(nRule);
            }}
          />
          <span> - </span>
          <EditableItem
            rule={rule.right}
            onSave={(r) => {
              let nRule = _.cloneDeep(rule);
              nRule.right = r;
              dispatch(nRule);
            }}
          />
        </div>
      )
    }
  };

  return (
    <Modal 
      visible={props.visible}
      onCancel={() => props.onCancel()}
      title={null}
      closable={false}
      okText="确定"
      onOk={() => {
        props.onSave(rule);
        props.onCancel();
      }}
      cancelText="取消"
      className="rule-editor"
    >
      <div className="rule-editor-body">
        <div className="rule-type">
          <Select
            value={rule.type} 
            onChange={(type) => {
              dispatch(RuleTypeDefaultMap[type])
            }}
          >
            {(Object.keys(RuleTypeMap) as Array<RuleType>).map((type) => (
              <Select.Option key={type} value={type}>{RuleTypeMap[type]}</Select.Option>
            ))}
          </Select>
        </div>
        <div className="rule-content">
          {renderRuleData(rule)}
        </div>
      </div>
    </Modal>
  );
});

export default RuleItem;
