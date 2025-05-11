import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from "antd";
import { FormProps } from "antd/lib/form";
import {
  DamageDegreeMap,
  DamageDegree,
  DamageType,
  DamageTypeMap,
} from "@/interfaces/character";
import {
  EquipmentAffix,
  EquipmentAffixMap,
} from "@/interfaces/inventory";
import {
  IMugenAttack
} from "@/interfaces/mugen";
import RuleFormItem from "@/shared/components/RuleEditor/RuleFormItem";
import { DEFAULT_RULE } from "@/shared/components/RuleEditor/constants";

const { Option } = Select;

const DEFAULT_VALUES = {
  damageType: DamageType.PHYSICS,
  damageDegree: DamageDegree.LETHAL,
  range: 0,
  attackCheckRule: DEFAULT_RULE,
  attackAdditionSuccessRule: DEFAULT_RULE,
  limitRule: DEFAULT_RULE,
  affixes: [],
  armorPenetration: 0,
  magicPenetration: 0,
  highSpeed: 0,
}

interface AttackPatternFormProps extends FormProps {
  AttackPattern?: IMugenAttack;
  loading?: boolean;
}

const AttackPatternForm: React.SFC<AttackPatternFormProps> = (props) => {
  let initialValues: any = DEFAULT_VALUES;

  if (props.AttackPattern) {
    initialValues = Object.assign(initialValues, props.AttackPattern)
    initialValues.attackCheckRule = props.AttackPattern.attackCheckRule.rule;
    initialValues.attackAdditionSuccessRule = props.AttackPattern.attackAdditionSuccessRule.rule;
    initialValues.limitRule = props.AttackPattern.limitRule.rule;
  }

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      initialValues={initialValues}
      onFinish={props.onFinish}
    >
      <Form.Item label="名字" name="name" required>
        <Input />
      </Form.Item>
      <Form.Item label="伤害类型" name="damageType">
        <Select>
          {(Object.keys(DamageTypeMap) as Array<DamageType>).map((option) => (
            <Option key={option} value={option}>
              {DamageTypeMap[option]}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="伤害等级" name="damageDegree">
        <Select>
          {Object.keys(DamageDegreeMap).map((degree) => (
            <Option key={degree} value={parseInt(degree)}>
              {DamageDegreeMap[(parseInt(degree) as DamageDegree)]}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="攻击距离" name="range">
        <InputNumber />
      </Form.Item>
      <Form.Item label="检定规则" name="attackCheckRule">
        <RuleFormItem />
      </Form.Item>
      <Form.Item label="额外成功" name="attackAdditionSuccessRule">
        <RuleFormItem />
      </Form.Item>
      <Form.Item label="攻击上限" name="limitRule">
        <RuleFormItem />
      </Form.Item>
      <Form.Item label="附加词缀" name="affixes">
        <Select 
          mode="multiple"
        >
          {(Object.keys(EquipmentAffixMap) as Array<EquipmentAffix>).map((option) => (
            <Option key={option} value={option}>
              {EquipmentAffixMap[option]}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="破甲" name="armorPenetration">
        <InputNumber />
      </Form.Item>
      <Form.Item label="破魔" name="magicPenetration">
        <InputNumber />
      </Form.Item>
      <Form.Item label="高速" name="highSpeed">
        <InputNumber />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 20, offset: 4 }}>
        <Button loading={props.loading} type="primary" htmlType="submit">
          保存
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AttackPatternForm;
