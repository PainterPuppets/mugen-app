import React, { useState, useEffect } from "react";
import {
  Tooltip,
  Button,
  InputNumber,
  message,
  Modal,
  Progress,
} from "antd";
import {
  DamageDegree,
  DefensePosture,
  DefensePostureMap,
  AttributeMap,
} from "@/interfaces/character";
import { IMugenCharacter } from "@/interfaces/mugen";
import HamelStrand from "@/shared/components/HamelStrand";
import STStore from "@/st/stores/STStore";
import { getCharacterDefense } from "@/utils/mugen";
import "./CharacterItem.less";

interface Props {
  character: IMugenCharacter;
}

const CharacterStatusPanel: React.SFC<Props> = (props) => {
  const { character } = props;
  const [healthModalVisible, setHealthModalVisible] = useState(false);
  const [BCount, setBCount] = useState(character.damage[DamageDegree.BASHING]);
  const [LCount, setLCount] = useState(character.damage[DamageDegree.LETHAL]);
  const [ACount, setACount] = useState(
    character.damage[DamageDegree.AGGRAVATED]
  );

  useEffect(() => {
    setBCount(character.damage[DamageDegree.BASHING]);
    setLCount(character.damage[DamageDegree.LETHAL]);
    setACount(character.damage[DamageDegree.AGGRAVATED]);
  }, [healthModalVisible]);


  const defense = getCharacterDefense();

  return (
    <React.Fragment>
      <div
        style={{
          background: "rgba(0,0,0,0.2)",
          padding: 8,
          borderRadius: 4,
          marginBottom: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
          血量:
          <HamelStrand
            healthPoint={character.attributes.health}
            damage={character.damage}
          />
          <Button
            style={{ marginLeft: 8 }}
            type="primary"
            size="small"
            onClick={() => setHealthModalVisible(true)}
          >
            调整伤害
          </Button>
        </div>
        <div className="st-character-status-item">
          <span className="st-character-status-item-label">
            意志
          </span>
          <span className="st-character-status-item-value">
              <Progress 
                className="st-character-status-item-progress"
                percent={Math.round(character.currentWill * 100 / character.attributes.will)}
                showInfo={false}
              />
            <InputNumber 
              className="energypool-current"
              min={0}
              max={character.attributes.will}
              value={character.currentWill}
              onChange={(value) => {
                STStore.updateStatus(character.uuid, {
                  currentWill: parseInt(value!.toString()),
                })
              }}
            />
            <div className="energypool-max">
              {character.attributes.will}
            </div>
          </span>
        </div>
        {character.energyPools.map(pool => (
          <div key={pool.id} className="st-character-status-item">
            <span className="st-character-status-item-label">
              {pool.name}
            </span>


            <span className="st-character-status-item-value">
              <Progress 
                className="st-character-status-item-progress"
                percent={Math.round(pool.current * 100 / pool.limit)}
                showInfo={false}
              />
              <InputNumber 
                className="energypool-current"
                min={0}
                max={pool.limit}
                value={pool.current}
                onChange={(value) => {
                  if (value === undefined) {
                    return;
                  }

                  STStore.updateEnergyPool(character.uuid, pool.id, parseInt(value!.toString()))
                }}
              />
              <div className="energypool-max">
                {pool.limit}
              </div>
            </span>
          </div>
        ))}
      </div>
      <div
        style={{ background: "rgba(0,0,0,0.2)", padding: 8, borderRadius: 4 }}
      >
        {Object.keys(defense)
          .map((k) => parseInt(k) as DefensePosture)
          .map((posture) => (
            <div key={posture}>
              {DefensePostureMap[posture]}：
              <Tooltip
                title={
                  <React.Fragment>
                    {defense[posture].map((attr, index) => (
                      <React.Fragment key={attr}>
                        <span>
                          {character.attributes[attr]}({AttributeMap[attr]})
                        </span>
                        {index !== defense[posture].length - 1 && (
                          <span> + </span>
                        )}
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                }
              >
                <span>
                  {defense[posture].reduce(
                    (a, b) => a + character.attributes[b],
                    0
                  )}
                </span>
              </Tooltip>
            </div>
          ))}
      </div>
      <Modal
        visible={healthModalVisible}
        onCancel={() => setHealthModalVisible(false)}
        footer={null}
        title={`调整${character.name}的血量`}
      >
        <div className="sethealth-modal-content">
          <div className="sethealth-modal-item">
            <span>总生命值</span>
            <span>{character.attributes.health}</span>
          </div>
          <div className="sethealth-modal-item">
            <span>B伤害</span>
            <InputNumber
              min={0}
              max={character.attributes.health}
              value={BCount}
              onChange={(value) => setBCount(parseInt(value!.toString()))}
            />
          </div>
          <div className="sethealth-modal-item">
            <span>L伤害</span>
            <InputNumber
              min={0}
              max={character.attributes.health}
              value={LCount}
              onChange={(value) => setLCount(parseInt(value!.toString()))}
            />
          </div>
          <div className="sethealth-modal-item">
            <span>A伤害</span>
            <InputNumber
              min={0}
              max={character.attributes.health}
              value={ACount}
              onChange={(value) => setACount(parseInt(value!.toString()))}
            />
          </div>
        </div>
        <Button
          block
          type="primary"
          onClick={() =>
            STStore.updateStatus(character.uuid, {
              damages: [
                { degree: DamageDegree.BASHING, count: BCount },
                { degree: DamageDegree.LETHAL, count: LCount },
                { degree: DamageDegree.AGGRAVATED, count: ACount },
              ],
            }).then(() => {
              message.success("更新角色血量成功");
              setHealthModalVisible(false);
            })
          }
        >
          确定
        </Button>
      </Modal>
    </React.Fragment>
  );
};

export default CharacterStatusPanel;
