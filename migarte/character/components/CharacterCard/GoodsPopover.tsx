import React from "react";
import { observer } from "mobx-react";
import { 
  DamageDegreeSimpleMap,
  AttributeMap,
  Attribute,
} from "@/interfaces/character";
import {
  GoodsType,
  EssenceMap,
  GoodsLevelMAP,
  WeaponClassifyMap,
  EquipmentAffixMap,
  EquipmentPosition,
  EquipmentPositionMap,
  GoodsTypeMAP,
} from "@/interfaces/inventory";
import { IMugenGoods, IMugenGoodsRequirement, IMugenChracterAttribute } from "@/interfaces/mugen";
import TooltipText, { Specification } from "../TooltipText";
import { toCamel } from '@/utils/helper'
import "./GoodsPopover.less";

interface IProps {
  goods: IMugenGoods;
  attribute?: IMugenChracterAttribute;
}

const GoodsPopover: React.SFC<IProps> = observer((props) => {
  const checkRequirement = (requirement: IMugenGoodsRequirement) => {
    if (!props.attribute) {
      return false;
    }

    return props.attribute[requirement.key] >= requirement.value
  }

  const goods = props.goods;
  if (goods.type === GoodsType.EQUIPMENT) {
    if (goods.position === EquipmentPosition.HAND) {
      return (
        <div className="goods-popover">
          <div className="goods-name">{goods.name}</div>
          <div className="goods-info goods-divide">
            <div>{EssenceMap[goods.essence]}</div>
            <div>{GoodsLevelMAP[goods.level]} · {GoodsTypeMAP[goods.type]}</div>
            <div className="goods-equipment-info">
              <span>{EquipmentPositionMap[goods.position]}</span>
              <span>{WeaponClassifyMap[goods.weaponClassify]}</span>
            </div>
          </div>
          {goods.requirements.length !== 0 &&
            <div className="goods-equipment-requirements goods-divide">
              <div>装备需求</div>
              {goods.requirements.map((requirement) => (
                <span 
                  className={`goods-equipment-requirement ${checkRequirement(requirement) ? 'active' : ''}`}
                  key={requirement.key}
                >
                  {AttributeMap[requirement.key]}: {requirement.value}
                </span>
              ))}
            </div>
          }
          {goods.description &&
            <div className="goods-description goods-divide">{goods.description}</div>
          }
          <div className="goods-weapon-info goods-divide">
            <div>武器伤害: {goods.weaponDamage}{DamageDegreeSimpleMap[goods.weaponDamageDegree]}</div>
            <div>武器体积: {goods.volume}</div>
            {goods.weaponRange !== 0 &&
              <div>武器射程: {goods.weaponRange}</div>
            }
            {goods.affixes.length !== 0 &&
              <div className="goods-affixes">
                词缀: 
                {goods.affixes.map((affix) => (
                  <TooltipText
                    key={affix}
                    readKey={affix}
                    tooltip={Specification[affix]}
                    wrapperClassName="goods-affix"
                  >
                    {EquipmentAffixMap[affix]}
                  </TooltipText>
                ))}
              </div>
            }
          </div>
          {(Boolean(goods.bonuses.length) || Boolean(goods.properties.length)) &&
            <div className="goods-properties goods-divide">
              {goods.bonuses.map((bonus) => (
                <div key={bonus.key} className="goods-equipment-bonus">
                  {AttributeMap[bonus.key]} + {bonus.value}
                </div>
              ))}
              {goods.properties.map((property) => (
                <div key={property.uuid} className="goods-property">
                  <span className="goods-property-name">{property.name}: </span>
                  <span className="goods-property-description">{property.description}</span>
                </div>
              ))}
            </div>
          }
        </div>
      );
    }

    return (
      <div className="goods-popover">
        <div className="goods-name">{goods.name}</div>
        <div className="goods-info goods-divide">
          <div>{EssenceMap[goods.essence]}</div>
          <div>{GoodsLevelMAP[goods.level]} · {GoodsTypeMAP[goods.type]}</div>
          <div className="goods-equipment-info">
            <span>{EquipmentPositionMap[goods.position]}</span>
          </div>
        </div>
        {goods.requirements.length !== 0 &&
          <div className="goods-equipment-requirements goods-divide">
            <div>装备需求</div>
            {goods.requirements.map((requirement) => (
              <span 
                className={`goods-equipment-requirement ${checkRequirement(requirement) ? 'active' : ''}`}
                key={requirement.key}
              >
                {AttributeMap[requirement.key]}: {requirement.value}
              </span>
            ))}
          </div>
        }
        {goods.description &&
          <div className="goods-description goods-divide">{goods.description}</div>
        }
        {(Boolean(goods.bonuses.length) || Boolean(goods.properties.length)) &&
          <div className="goods-properties goods-divide">
            {goods.bonuses.map((bonus) => (
              <div key={bonus.key} className="goods-equipment-bonus">
                {AttributeMap[bonus.key]} + {bonus.value}
              </div>
            ))}
            {goods.properties.map((property) => (
              <div key={property.uuid} className="goods-property">
                <span className="goods-property-name">{property.name}: </span>
                <span className="goods-property-description">{property.description}</span>
              </div>
            ))}
          </div>
        }
      </div>
    );
  }

  return (
    <div className="goods-popover">
      <div className="goods-name">{goods.name}</div>
      <div className="goods-info goods-divide">
        <div>{EssenceMap[goods.essence]}</div>
        <div>{GoodsLevelMAP[goods.level]} · {GoodsTypeMAP[goods.type]}</div>
      </div>
      {goods.description &&
        <div className="goods-description goods-divide">{goods.description}</div>
      }
      <div className="goods-properties goods-divide">
        {goods.properties.map((property) => (
          <div key={property.uuid} className="goods-property">
            <span className="goods-property-name">{property.name}: </span>
            <span className="goods-property-description">{property.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

export default GoodsPopover;
