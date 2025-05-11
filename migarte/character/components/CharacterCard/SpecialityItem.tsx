import React from "react";
import { Button, Popconfirm } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { Speciality } from '@/interfaces/power';
import "./SpecialityItem.less";
import { IMugenCharacter } from "@/interfaces/mugen";
import SpecialityStore from "@/character/stores/SpecialityStore";

const getSpecialityUpgradeExp = (targetLevel: number) => {
  return targetLevel * 3;
};

interface UpgradeSpecialityBtnProps {
  character: IMugenCharacter;
  speciality: Speciality;
  currentLevel?: number;
  onRefresh?: Function;
}

export const UpgradeSpecialityBtn: React.SFC<UpgradeSpecialityBtnProps> = observer((props) => {
  const { character, speciality, currentLevel=0 } = props;

  const max = Math.max(...speciality.levels.map((l) => l.level))
  const min = Math.min(...speciality.levels.map((l) => l.level))

  if (max <= currentLevel) {
    return null
  }

  if (currentLevel > 0) {
    return (
      <Popconfirm
        placement="top"
        title={`确定要花费${getSpecialityUpgradeExp(currentLevel + 1)}点xp升级${speciality.name}到${currentLevel + 1}级么`}
        onConfirm={() => {
          SpecialityStore.upgrade(character.uuid, speciality.id).then(() => {
            props.onRefresh && props.onRefresh()
          })
        }}
        okText="升级"
        cancelText="取消"
      >
        <Button
          type="primary"
          shape="circle"
          size="small"
          disabled={
            character.experience < getSpecialityUpgradeExp(currentLevel + 1)
          }
          icon={<ArrowUpOutlined style={{ fontSize: 12 }} />}
        />
      </Popconfirm>
    )
  }

  return (
  <Popconfirm
    placement="top"
    title={`确定要花费${getSpecialityUpgradeExp(min)}点xp获取${speciality.name}专长么`}
    onConfirm={() => {
      SpecialityStore.upgrade(character.uuid, speciality.id).then(() => {
        props.onRefresh && props.onRefresh()
      })
    }}
    okText="获取"
    cancelText="取消"
  >
    <Button
      type="primary"
      size="small"
      disabled={character.experience < getSpecialityUpgradeExp(min)}
    >
      获取专长
    </Button>
  </Popconfirm>
  )
});
  
interface IProps {
  speciality: Speciality;
  currentLevel?: number;
  action?: React.ReactNode;
}

const SpecialityItem: React.SFC<IProps> = observer((props) => {
  const { speciality, currentLevel = 0, action } = props;

  return (
    <div className="speciality-item">

      <div className="speciality-item-hedaer item-divide">
        <div className="speciality-item-name">
          {speciality.name}
        </div>
        {action !== undefined &&
          <div className="speciality-item-action">
            {action}
          </div>
        }
      </div>
      <div className="speciality-item-description">
        {speciality.description}
      </div>
      <div className="speciality-item-levels">
        {speciality.levels.map((specialityLevel) => (
          <div 
            key={`speciality-level-${specialityLevel.id}`}
            className={`speciality-level-item item-divide dashed ${currentLevel >= specialityLevel.level ? 'learned' : ''}`}
          >
            <div className="speciality-level-item-name">
              {currentLevel >= specialityLevel.level &&
                <span className="success-text">
                  [已掌握]
                </span>
              }
              {specialityLevel.level}级
              {specialityLevel.name ? `：${specialityLevel.name}` : ''}
            </div>
            <div>{specialityLevel.description}</div>
            <div>{specialityLevel.effectDescription}</div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default SpecialityItem;
