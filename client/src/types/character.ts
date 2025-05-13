
export enum Attribute {
  // 基础属性
  STRENGTH = 'strength',
  DEXTERITY = 'dexterity',
  CONSTITUTION = 'constitution',
  INTELLIGENCE = 'intelligence',
  WISDOM = 'wisdom',
  DETERMINATION = 'determination',
  CHARISMA = 'charisma',
  CONTROL = 'control',
  COMPOSURE = 'composure',

  // 驱动属性
  SIZE = 'size',
  SPEED = 'speed',
  INITIATIVE = 'initiative',
  REFLEX = 'reflex',
  FORTITUDE = 'fortitude',
  VOLITION = 'volition',
  HEALTH = 'health',
  SENSITIVE_RANGE = 'sensitiveRange',
  BLUR_RANGE =      'blurRange',

  // 防御属性
  BASE_DEFENSE = 'baseDefense',
  NATURAL_DEFENSE = 'naturalDefense',
  LONG_RANGE_ARMOR_DEFENSE = 'longRangeArmorDefense',
  ARMOR_DEFENSE = 'armorDefense',
  DODGE_DEFENSE = 'dodgeDefense',
  INSIGHT_DEFENSE = 'insightDefense',
  PARRY_DEFENSE = 'parryDefense',
  FIELD_DEFENSE = 'fieldDefense',
  DEFLECTION_DEFENSE = 'deflectionDefense',

  LEGEND_STRENGTH = 'legendStrength',
  LEGEND_DEXTERITY = 'legendDexterity',
  LEGEND_CONSTITUTION = 'legendConstitution',
  LEGEND_INTELLIGENCE = 'legendIntelligence',
  LEGEND_WISDOM = 'legendWisdom',
  LEGEND_DETERMINATION = 'legendDetermination',
  LEGEND_CHARISMA = 'legendCharisma',
  LEGEND_CONTROL = 'legendControl',
  LEGEND_COMPOSURE = 'legendComposure',
}

export type BaseAttributeType =  Attribute.STRENGTH |
                                 Attribute.DEXTERITY |
                                 Attribute.CONSTITUTION |
                                 Attribute.INTELLIGENCE |
                                 Attribute.WISDOM |
                                 Attribute.DETERMINATION |
                                 Attribute.CHARISMA |
                                 Attribute.CONTROL |
                                 Attribute.COMPOSURE;

export type LegendAttributeKey =  `legend${Capitalize<BaseAttributeType>}`;
export type BaseAttributeKey = `base${Capitalize<BaseAttributeType>}`

export const AttributeMap = {
  [Attribute.STRENGTH]:         '力量',
  [Attribute.DEXTERITY]:        '敏捷',
  [Attribute.CONSTITUTION]:     '耐力',
  [Attribute.INTELLIGENCE]:     '智力',
  [Attribute.WISDOM]:           '感知',
  [Attribute.DETERMINATION]:    '决心',
  [Attribute.CHARISMA]:         '风度',
  [Attribute.CONTROL]:          '操控',
  [Attribute.COMPOSURE]:        '沉着',

  [Attribute.SIZE]:             '体型',
  [Attribute.SPEED]:            '速度',
  [Attribute.INITIATIVE]:       '先攻',
  [Attribute.REFLEX]:           '反射',
  [Attribute.FORTITUDE]:        '强韧',
  [Attribute.HEALTH]:           '生命',
  [Attribute.VOLITION]:         '意志',
  [Attribute.SENSITIVE_RANGE]:  '敏感范围',
  [Attribute.BLUR_RANGE]:       '模糊范围',

  [Attribute.BASE_DEFENSE]:             '基础防御',
  [Attribute.NATURAL_DEFENSE]:          '天生防御',
  [Attribute.LONG_RANGE_ARMOR_DEFENSE]: '远程护甲防御',
  [Attribute.ARMOR_DEFENSE]:            '护甲防御',
  [Attribute.DODGE_DEFENSE]:            '闪避防御',
  [Attribute.INSIGHT_DEFENSE]:          '洞察防御',
  [Attribute.PARRY_DEFENSE]:            '格挡防御',
  [Attribute.FIELD_DEFENSE]:            '力场防御',
  [Attribute.DEFLECTION_DEFENSE]:       '偏斜防御',

  [Attribute.LEGEND_STRENGTH]:      '传奇力量',
  [Attribute.LEGEND_DEXTERITY]:     '传奇敏捷',
  [Attribute.LEGEND_CONSTITUTION]:  '传奇耐力',
  [Attribute.LEGEND_INTELLIGENCE]:  '传奇智力',
  [Attribute.LEGEND_WISDOM]:        '传奇感知',
  [Attribute.LEGEND_DETERMINATION]: '传奇决心',
  [Attribute.LEGEND_CHARISMA]:      '传奇风度',
  [Attribute.LEGEND_CONTROL]:       '传奇操控',
  [Attribute.LEGEND_COMPOSURE]:     '传奇沉着',
}

export enum AttributeCategory {
  Physiology = 'physiology',
  Mental = 'mental',
  Interaction = 'interaction',
}

export const AttributeCategoryMap = {
  [AttributeCategory.Physiology]:   '生理系',
  [AttributeCategory.Mental]:       '心智系',
  [AttributeCategory.Interaction]:  '互动系',
}

export const CategoryToAttributeDict: {
  [key in AttributeCategory]: Array<BaseAttributeType>
} = {
  [AttributeCategory.Physiology]: [
    Attribute.STRENGTH,
    Attribute.DEXTERITY,
    Attribute.CONSTITUTION,
  ],
  [AttributeCategory.Mental]: [
    Attribute.INTELLIGENCE,
    Attribute.WISDOM,
    Attribute.DETERMINATION,
  ],
  [AttributeCategory.Interaction]: [
    Attribute.CHARISMA,
    Attribute.CONTROL,
    Attribute.COMPOSURE,
  ],
}

export const AttributeToCategoryDict = {
  [Attribute.STRENGTH]: AttributeCategory.Physiology,
  [Attribute.DEXTERITY]: AttributeCategory.Physiology,
  [Attribute.CONSTITUTION]: AttributeCategory.Physiology,
  [Attribute.INTELLIGENCE]: AttributeCategory.Mental,
  [Attribute.WISDOM]: AttributeCategory.Mental,
  [Attribute.DETERMINATION]: AttributeCategory.Mental,
  [Attribute.CHARISMA]: AttributeCategory.Interaction,
  [Attribute.CONTROL]: AttributeCategory.Interaction,
  [Attribute.COMPOSURE]: AttributeCategory.Interaction,
}

export const BaseAttribute: Array<BaseAttributeType> = [
  Attribute.STRENGTH,
  Attribute.DEXTERITY,
  Attribute.CONSTITUTION,
  Attribute.INTELLIGENCE,
  Attribute.WISDOM,
  Attribute.DETERMINATION,
  Attribute.CHARISMA,
  Attribute.CONTROL,
  Attribute.COMPOSURE,
]

export const DerivedAttribute = [
  Attribute.SIZE,
  Attribute.SPEED,
  Attribute.INITIATIVE,
  Attribute.REFLEX,
  Attribute.FORTITUDE,
  Attribute.HEALTH,
  Attribute.VOLITION,
  Attribute.SENSITIVE_RANGE,
  Attribute.BLUR_RANGE,
]

export const DefenseAttribute = [
  Attribute.BASE_DEFENSE,
  Attribute.NATURAL_DEFENSE,
  Attribute.LONG_RANGE_ARMOR_DEFENSE,
  Attribute.ARMOR_DEFENSE,
  Attribute.DODGE_DEFENSE,
  Attribute.INSIGHT_DEFENSE,
  Attribute.PARRY_DEFENSE,
  Attribute.FIELD_DEFENSE,
  Attribute.DEFLECTION_DEFENSE,
]

export enum DamageDegree {
    BASHING = 1,
    LETHAL = 2,
    AGGRAVATED = 3,
}

export const DamageDegreeSimpleMap = {
  [DamageDegree.BASHING]: 'B',
  [DamageDegree.LETHAL]: 'L',
  [DamageDegree.AGGRAVATED]: 'A',
}

export const DamageDegreeMap = {
    [DamageDegree.BASHING]: '冲击伤害',
    [DamageDegree.LETHAL]: '严重伤害',
    [DamageDegree.AGGRAVATED]: '恶性伤害',
}

export enum DamageType {
  PHYSICS = 'physics',  // 物理伤害
  ENERGY = 'energy',  // 纯能量伤害
  FIRE = 'fire',  // 火焰伤害
  ICE = 'ice',  // 寒冰伤害
  LIGHTNING = 'lightning',  // 雷电伤害
  ACID = 'acid',  // 腐蚀伤害
  SONIC = 'Sonic',  // 音波伤害
  LASER = 'laser',  // 光能伤害
  HOLY = 'holy',  // 光明伤害
  SHADOW = 'shadow',  // 黑暗伤害
  SPIRITUAL = 'spiritual',  // 精神伤害
  FIELD = 'field',  // 力场伤害
  POISON = 'poison',  // 毒素伤害
  FALL = 'fall',  // 坠落伤害
  INEVITABLE = 'inevitable',  // 不可避免
}

export const DamageTypeMap = {
    [DamageType.PHYSICS]: '物理伤害',
    [DamageType.ENERGY]: '纯能量伤害',
    [DamageType.FIRE]: '火焰伤害',
    [DamageType.ICE]: '寒冰伤害',
    [DamageType.LIGHTNING]: '雷电伤害',
    [DamageType.ACID]: '腐蚀伤害',
    [DamageType.SONIC]: '音波伤害',
    [DamageType.LASER]: '光能伤害',
    [DamageType.HOLY]: '光明伤害',
    [DamageType.SHADOW]: '黑暗伤害',
    [DamageType.SPIRITUAL]: '精神伤害',
    [DamageType.FIELD]: '力场伤害',
    [DamageType.POISON]: '毒素伤害',
    [DamageType.FALL]: '坠落伤害',
    [DamageType.INEVITABLE]: '不可避免伤害',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export const GENDER_MAP = {
  [Gender.MALE]: '男性',
  [Gender.FEMALE]: '女性',
}

export enum DefensePosture {
  ABANDON = 0,
  NORMAL = 1,
  PARRY = 2,
  ALL_DEFENSE = 3,
  FLAT_FOOTED = 4,
  PARRY_AND_ALL = 5,
}

export const DefensePostureMap = {
  [DefensePosture.ABANDON]: '放弃防御',
  [DefensePosture.NORMAL]: '平时',
  [DefensePosture.PARRY]: '格挡',
  [DefensePosture.ALL_DEFENSE]: '全防御',
  [DefensePosture.FLAT_FOOTED]: '措手不及',
  [DefensePosture.PARRY_AND_ALL]: '格挡 + 全防御',
}
