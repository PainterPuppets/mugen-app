import React, { useState } from "react";
import {
  Button,
  Select,
  InputNumber,
  Form,
  message,
  Modal,
} from "antd";
import {
  DamageDegreeSimpleMap,
  DamageTypeMap,
  DefensePosture,
  DefensePostureMap,
} from "@/interfaces/character";
import { IMugenCharacter, IMugenAttack } from "@/interfaces/mugen";
import AttackPatternItem from "@/character/components/CharacterCard/AttackPatternItem";
import { getHealthString } from "@/utils/mugen";
import { observer } from "mobx-react";
import STStore, { combatReault } from "@/st/stores/STStore";
import "./CharacterItem.less";

const { Option } = Select;

const allDefensePosture = (Object.keys(DefensePostureMap) as Array<
  any
>) as Array<DefensePosture>;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface CombatItemProps {
  attack: IMugenAttack;
  character: IMugenCharacter;
}

const CombatItem: React.SFC<CombatItemProps> = observer((props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [defender, setDefender] = useState("");
  const [combatResult, setCombatResult] = useState<combatReault>();

  const { attack, character } = props;

  return (
    <React.Fragment>
      <AttackPatternItem
        key={attack.id}
        attackPattern={attack}
        character={character}
        action={
          <Button
            block
            type="primary"
            size="small"
            onClick={() => setModalVisible(true)}
          >
            攻击
          </Button>
        }
      />

      <Modal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        title="攻击"
        footer={null}
      >
        <Form
          {...layout}
          onFinish={(values) => {
            setDefender(values.defender);
            STStore.combat({
              attackId: attack.id,
              targetUuid: values.defender,
              attackExtraDice: values.attackExtraDice,
              attackExtraSuccess: values.attackExtraSuccess,
              defensePosture: values.defensePosture,
              defenseExtraDice: values.defenseExtraDice,
              defenseExtraSuccess: values.defenseExtraSuccess,
            }).then((res) => {
              message.success("战斗结算成功");
              setCombatResult(res.data);
            });
          }}
        >
          <Form.Item
            {...tailLayout}
            label="攻击额外加值"
            name="attackExtraDice"
            initialValue={0}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            {...tailLayout}
            label="攻击额外成功"
            name="attackExtraSuccess"
            initialValue={0}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            {...tailLayout}
            label="选择被攻击人"
            name="defender"
            rules={[{ required: true }]}
          >
            <Select placeholder="选择被攻击人">
              {STStore.characters.map((c) => (
                <Option key={c.uuid} value={c.uuid}>
                  {c.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            {...tailLayout}
            label="选择被攻击人的姿态"
            name="defenderPosture"
            rules={[{ required: true }]}
            initialValue={DefensePosture.NORMAL}
          >
            <Select>
              {allDefensePosture.map((p) => (
                <Option key={p} value={p}>
                  {DefensePostureMap[p]}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            {...tailLayout}
            label="防御额外加值"
            name="defenseExtraDice"
            initialValue={0}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            {...tailLayout}
            label="防御额外成功"
            name="defenseExtraSuccess"
            initialValue={0}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              攻击！
            </Button>
          </Form.Item>
        </Form>
        {combatResult && (
          <div className="combat-result">
            <div>
              <span>{combatResult.isHit ? "命中成功！" : "未命中"}</span>
              {combatResult.damageList.map((d, index) => (
                <span key={index}>
                  {character.name} 对 {STStore.getCharacter(defender).name}{" "}
                  造成了{d.count}
                  {DamageDegreeSimpleMap[d.degree]} 的{" "}
                  {d.type ? DamageTypeMap[d.type] : "伤害"}
                </span>
              ))}
            </div>
            <Button
              type="primary"
              onClick={() =>
                STStore.takeDamage(defender, combatResult.damageList).then(
                  () => {
                    const d = STStore.getCharacter(defender);
                    message.success(
                      `扣血成功，当前血量为${getHealthString(
                        d.attributes.health,
                        d.damage
                      )}`
                    );
                  }
                )
              }
            >
              扣血！
            </Button>
          </div>
        )}
      </Modal>
    </React.Fragment>
  );
});

interface Props {
  character: IMugenCharacter;
}

const CharacterStatusPanel: React.SFC<Props> = (props) => {
  const { character } = props;

  return (
    <React.Fragment>
      <div style={{ display: "flex", marginBottom: 8 }}>
        {character.attackPatterns.map((attack) => (
          <CombatItem key={attack.id} attack={attack} character={character} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default CharacterStatusPanel;
