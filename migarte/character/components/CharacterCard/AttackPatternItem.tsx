import React, { useState } from "react";
import { observer } from "mobx-react";
import { IMugenAttack, IMugenCharacter } from "@/interfaces/mugen";
import { EquipmentAffixMap } from "@/interfaces/inventory";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import TooltipText, { Specification } from "../TooltipText";
import {
  AttributeMap,
  DamageTypeMap,
  DamageDegreeMap,
  Attribute,
} from "@/interfaces/character";
import { SkillMajorMap, SkillMap } from "@/interfaces/skill";
import {
  AnyRule,
  GetRule,
  LiteralRule,
  PlusRule,
  ProductRule,
  RuleType,
  GetRuleKey,
  ContextKeyMap,
  RuleContext,
  DivisionRule,
  SubtractionRule,
} from "@/interfaces/rule";
import { Tooltip, Modal, message, Popconfirm } from "antd";
import { keysToUnderline, toCamel } from "@/utils/helper";
import { getMajorGrade } from "@/utils/mugen";
import AttackPatternStore from "@/character/stores/AttackPatternStore";
import AttackPatternForm from '@/shared/components/AttackPatternForm';

interface IProps {
  attackPattern: IMugenAttack;
  character: IMugenCharacter;
  action?: React.ReactNode;
  onUpdate?: (attackPattern: IMugenAttack) => void;
  onDelete?: (id: number) => void;
}
const AttackPatternItem: React.SFC<IProps> = observer((props) => {
  const [editModalVisible, setEditModalVisible] = useState(false);

  const renderGetRule = (rule: GetRule, context: RuleContext) => {
    const character = props.character;
    switch (rule.key) {
      case GetRuleKey.ATTRIBUTE:
        const flag = toCamel(rule.flag) as Attribute;
        return (
          <span>
            {character.attributes[flag]}({AttributeMap[flag]})
          </span>
        );
        break;

      case GetRuleKey.CONTEXT:
        context = keysToUnderline(context);
        return (
          <span>
            {context[rule.flag]}({ContextKeyMap[rule.flag]})
          </span>
        );
        break;

      case GetRuleKey.MAJOR:
        return (
          <span>
            {getMajorGrade(character.skills, rule.flag)}(
            {SkillMajorMap[rule.flag]})
          </span>
        );
        break;

      case GetRuleKey.SKILL:
        return (
          <span>
            {character.skills.find((s) => s.flag === rule.flag)!.grade}(
            {SkillMap[rule.flag]})
          </span>
        );
        break;
    }
  };

  const renderLiteralRule = (rule: LiteralRule) => {
    return <span>{rule.value}</span>;
  };

  const renderPlusRule = (rule: PlusRule, context: RuleContext) => {
    return (
      <span>
        {rule.value.map((r, index) => (
          <React.Fragment key={index}>
            {renderRule(r, context)}
            {rule.value.length !== index + 1 && <span>+</span>}
          </React.Fragment>
        ))}
      </span>
    );
  };

  const renderDivisionRule = (rule: DivisionRule, context: RuleContext) => {
    return (
      <span>
        (<span>{renderRule(rule.left, context)}</span> /
        <span>{renderRule(rule.right, context)}</span>)
      </span>
    );
  };

  const renderSubtractionRule = (
    rule: SubtractionRule,
    context: RuleContext
  ) => {
    return (
      <span>
        <span>{renderRule(rule.left, context)}</span> -
        <span>{renderRule(rule.right, context)}</span>
      </span>
    );
  };

  const renderProductRule = (rule: ProductRule, context: RuleContext) => {
    return (
      <span>
        {rule.value.map((r, index) => (
          <React.Fragment key={index}>
            {renderRule(r, context)}
            {rule.value.length !== index + 1 && <span>*</span>}
          </React.Fragment>
        ))}
      </span>
    );
  };

  const renderRule = (rule: AnyRule, context: RuleContext) => {
    if (!rule.type) {
      return 0;
    }

    switch (rule.type) {
      case RuleType.GET:
        return renderGetRule(rule, context);
        break;
      case RuleType.LITERAL:
        return renderLiteralRule(rule);
        break;
      case RuleType.PLUS:
        return renderPlusRule(rule, context);
        break;
      case RuleType.PRODUCT:
        return renderProductRule(rule, context);
        break;
      case RuleType.DIVISION:
        return renderDivisionRule(rule, context);
        break;
      case RuleType.SUBTRACTION:
        return renderSubtractionRule(rule, context);
        break;
      default:
        console.log(rule);
        throw new Error("错误的规则");
        break;
    }
  };

  return (
    <React.Fragment>
      <div className="attack-pattern-item">
        <div className="attack-pattern-item-name divide-bottom">
          {props.attackPattern.name}
          <EditOutlined 
            onClick={() => setEditModalVisible(true)}
            className="primary-text"
            style={{ marginLeft: 8 }}
          />
          <Popconfirm
            placement="top"
            title="确认要删除该攻击预设么"
            onConfirm={() => {
              AttackPatternStore.delete(props.attackPattern.id).then((res) => {
                if (props.onDelete) {
                  props.onDelete(props.attackPattern.id)
                }
                message.success('删除成功');
              })
            }}
            okText="删除"
            cancelText="取消"
          >
            <DeleteOutlined
              className="error-text"
              style={{ marginLeft: 8 }}
            />
          </Popconfirm>
        </div>
        <div className="attack-pattern-item-rules divide-bottom">
          <div className="attack-pattern-item-rule">
            <span className="attack-pattern-item-rule-name">攻击检定(dp)</span>
            <Tooltip
              title={renderRule(
                props.attackPattern.attackCheckRule.rule,
                props.attackPattern.attackCheckRule.context
              )}
            >
              <span>{props.attackPattern.attackCheckRule.value}</span>
            </Tooltip>
          </div>
          <div className="attack-pattern-item-rule">
            <span className="attack-pattern-item-rule-name">额外成功</span>
            <Tooltip
              title={renderRule(
                props.attackPattern.attackAdditionSuccessRule.rule,
                props.attackPattern.attackAdditionSuccessRule.context
              )}
            >
              <span>{props.attackPattern.attackAdditionSuccessRule.value}</span>
            </Tooltip>
          </div>
          <div className="attack-pattern-item-rule">
            <span className="attack-pattern-item-rule-name">攻击上限</span>
            <Tooltip
              title={renderRule(
                props.attackPattern.limitRule.rule,
                props.attackPattern.limitRule.context
              )}
            >
              <span>{props.attackPattern.limitRule.value}</span>
            </Tooltip>
          </div>
        </div>
        <div className="attack-pattern-item-damages divide-bottom">
          <div className="attack-pattern-item-damage">
            <span className="attack-pattern-item-damage-name">伤害类型</span>
            {DamageTypeMap[props.attackPattern.damageType]}
          </div>
          <div className="attack-pattern-item-damage">
            <span className="attack-pattern-item-damage-name">伤害级别</span>
            {DamageDegreeMap[props.attackPattern.damageDegree]}
          </div>
        </div>
        <div className="attack-pattern-item-params divide-bottom">
          <div className="attack-pattern-item-param">
            高速：{props.attackPattern.highSpeed}
          </div>
          <div className="attack-pattern-item-param">
            破甲：{props.attackPattern.armorPenetration}
          </div>
          <div className="attack-pattern-item-param">
            破魔：{props.attackPattern.magicPenetration}
          </div>
        </div>
        {props.attackPattern.affixes.length > 0 &&
          <div className="attack-pattern-item-affixes divide-bottom">
            {props.attackPattern.affixes.map((affix) => (
              <TooltipText
                key={affix}
                readKey={affix}
                tooltip={Specification[affix]}
                wrapperClassName="attack-pattern-item-affix"
              >
                {EquipmentAffixMap[affix]}
              </TooltipText>
            ))}
          </div>
        }
        {props.action && (
          <div className="attack-pattern-item-action divide-bottom">{props.action}</div>
        )}
      </div>
      <Modal
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        closable={false}
        footer={null}
      >
        <AttackPatternForm
          AttackPattern={props.attackPattern}
          onFinish={(values) => {
            AttackPatternStore.update(props.attackPattern.id, values).then((res) => {
              if (props.onUpdate) {
                props.onUpdate(res.data)
              }
              message.success('更新成功');
              setEditModalVisible(false);
            })
          }}
        />
      </Modal>
    </React.Fragment>
  );
});

export default AttackPatternItem;
