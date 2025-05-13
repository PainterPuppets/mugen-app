import { DamageDegree, Attribute, DamageType, BaseAttributeKey, Gender } from './character';
import { SkillMajor, SkillFlag } from './skill';
import { EquipmentPosition, GoodsType, WeaponClassify, EquipmentAffix, Essence, GoodsLevel } from './inventory';
import { AnyRule, RuleContext } from './rule';
import { PowerType, Level, Speciality } from './power';


export type IMugenChracterAttribute = {
  [key in Attribute | BaseAttributeKey]: number;
}

export interface IMugenCharacterSpeciality {
  speciality: Speciality;
  currentLevel: number;
}

export interface IResourceRecord {
  id: number,
  description: string,
  experience: number,
  credit: number,
  branchPoint: number,
  createdAt: string,
}

export interface IMugenAttackRule {
  rule: AnyRule,
  value: number,
  context: RuleContext,
}

export interface IMugenAttack {
  id: number,
  name: string,
  description: string,
  affixes: Array<EquipmentAffix>,
  damageDegree: DamageDegree,
  range: number,
  armorPenetration: number,
  highSpeed: number
  magicPenetration: number,

  damageType: DamageType,

  attackCheckRule: IMugenAttackRule,
  limitRule: IMugenAttackRule,
  attackAdditionSuccessRule: IMugenAttackRule,
}

export interface IMugenGoodsBonus {
  key: Attribute,
  value: number,
}

export interface IMugenGoodsRequirement {
  key: Attribute,
  value: number,
}

export interface Property {
  uuid: string,
  name: string,
  description: string,
}

export interface IMugenGoods {
  uuid: string,
  name: string,
  description: string,
  iconUrl: string,
  type: GoodsType,
  essence: Essence,
  level: GoodsLevel,
  properties: Array<Property>,

  // 装备特有
  position: EquipmentPosition,
  affixes: Array<EquipmentAffix>,
  bonuses: Array<IMugenGoodsBonus>,
  requirements: Array<IMugenGoodsRequirement>,

  // 武器特有
  volume: number,
  weaponClassify: WeaponClassify,
  weaponDamage: number,
  weaponDamageDegree: DamageDegree,
  weaponRange: number,
}

export interface IMugenEquipmentSlot {
  goods?: IMugenGoods,
  position: EquipmentPosition,
  disabled: boolean,
}

export interface IMugenInventory {
  id: number,
  goods: IMugenGoods,
  stock: number,
  isEquipped: boolean,
}

export interface IMugenSkill {
  flag: SkillFlag,
  grade: number,
  majors: Array<SkillMajor>,
  majorPoint: number,
  residueMajorPoint: number,
}

export enum CharacterType {
  PLAYER = 'player',
  NPC = 'npc',
}

export interface IMugenCharacterBonus {
  key: Attribute,
  value: number,
  source: string,
}

export interface IMugenCharacterProperty {
  property: Property,
  source: string,
}

export interface IMugenCharacterEnergyPool {
  id: number,
  description: string,
  current: number,
  limit: number,
  name: string,
}

export interface IMugenCharacterPowerLevel {
  name: string,
  description: string,
  level: Level,
  bonuses: Array<IMugenCharacterBonus>,
  properties: Array<Property>,
}

export interface IMugenCharacterPower {
  id: number,
  name: string,
  description: string,
  essence: Essence,
  type: PowerType,
  levels: Array<IMugenCharacterPowerLevel>,
}

export interface IMugenCharacter {
  // 基本信息
  uuid: string, // 唯一标识
  name: string,
  figureUrl: string,
  age: number,
  gender: Gender,
  race: string,
  appearance: string,
  overview: string,
  type: CharacterType,

  // 状态 & 能量池
  damage: {
    [DamageDegree.BASHING]: number,
    [DamageDegree.LETHAL]: number,
    [DamageDegree.AGGRAVATED]: number,
  },
  currentWill: number,
  energyPools: Array<IMugenCharacterEnergyPool>,
  debuff: Array<any>,

  // 属性信息
  attributes: IMugenChracterAttribute,
  skills: Array<IMugenSkill>,

  // 攻击
  attackPatterns: Array<IMugenAttack>,

  // 能力
  bonuses: Array<IMugenCharacterBonus>,
  properties: Array<IMugenCharacterProperty>,
  powers: Array<IMugenCharacterPower>,
  specialities: Array<IMugenCharacterSpeciality>,

  // 物品信息
  experience: number, // 经验
  credit: number, // 积分
  branchPoint: number, // 支线点

  equipmentSlots: Array<IMugenEquipmentSlot>, // 装备槽
  inventories: Array<IMugenInventory>, // 背包
}
