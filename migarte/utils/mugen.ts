import { IMugenSkill, IMugenCharacter } from '@/interfaces/mugen';
import { 
  BaseAttributeType,
  BaseAttributeKey,
  DamageDegree,
  Attribute,
  DefensePosture,
} from '@/interfaces/character';
import { 
  SkillMajor,
  MajorToSkillDict,
  NOT_PUNISHMENT_MAJORS,
  NOT_BONUS_MAJORS,
} from '@/interfaces/skill';
import { 
  SkillCheck,
  SkillCheckAttribute,
} from '@/interfaces/check';
import { toCamel } from './helper';

export const getMajorGrade = (skills: Array<IMugenSkill>, majorFlag: SkillMajor) => {
  const skillFlag = MajorToSkillDict[majorFlag]

  const skill = skills.find(s => s.flag === skillFlag)
  if (!skill) {
    return 0
  }

  if (skill.majors.findIndex((m) => m === majorFlag) !== -1) {
    if (NOT_BONUS_MAJORS.findIndex((m) => m === majorFlag) !== -1) {
      return skill.grade
    }
  
    return skill.grade + 1
  }

  if (NOT_PUNISHMENT_MAJORS.findIndex((m) => m === majorFlag) !== -1) {
    return skill.grade
  }

  return Math.floor(skill.grade / 2)
}

export const getLegendKey = (attr: BaseAttributeType): Attribute => {
  return toCamel('legend_' + attr) as Attribute
}

export const getBaseKey = (attr: BaseAttributeType): BaseAttributeKey => {
  return toCamel('base_' + attr) as BaseAttributeKey
}

export const getHealthString = (health: number, damage: {
  [DamageDegree.BASHING]: number,
  [DamageDegree.LETHAL]: number,
  [DamageDegree.AGGRAVATED]: number,
}): string => {
  let completeHealth = health;
  (Object.keys(damage)).map((key) => {
    let count = damage[parseInt(key) as DamageDegree];
    completeHealth -= count;
  });

  return `${completeHealth}完好，${damage[DamageDegree.BASHING]}B伤，${damage[DamageDegree.LETHAL]}L伤，${damage[DamageDegree.AGGRAVATED]}A伤`
}

export const getCheckedDp = (character: IMugenCharacter, check: SkillCheck): number => {
  const attr = Math.max(...SkillCheckAttribute[check].map((attr) => character.attributes[attr]))
  const majorGrade = getMajorGrade(character.skills, check as any as SkillMajor)
  return attr + majorGrade;
}


export const rollOnce = (dice: number = 10) => Math.floor(Math.random() * dice + 1);

export const roll = (count: number, dice=10) => {
  return new Array(count).fill(0).map(() => rollOnce(dice))
}

export const check = (dicePool: number, diceBonus=10) => {
  let result = 0
  let checked = dicePool
  while (checked > 0) {
    let r = rollOnce()

    if (r >= diceBonus) {
      checked += 1
    }

    if (r > 7) {
        result += 1
    }

    checked -= 1
  }

  return result
}

export const getCharacterDefense = (): {
  [key in DefensePosture]: Array<Attribute>;
} => {
  const initiativeDefense = [Attribute.BASE_DEFENSE, Attribute.DODGE_DEFENSE, Attribute.INSIGHT_DEFENSE];
  const passiveDefense = [Attribute.FIELD_DEFENSE, Attribute.DEFLECTION_DEFENSE];
  const armorDefense = [Attribute.NATURAL_DEFENSE, Attribute.ARMOR_DEFENSE];
  const abandon = [Attribute.FIELD_DEFENSE, Attribute.ARMOR_DEFENSE];
  const normal = [...initiativeDefense, ...passiveDefense, ...armorDefense];
  const parry = [...initiativeDefense, ...passiveDefense, ...armorDefense, Attribute.PARRY_DEFENSE];
  const allDefense = [...initiativeDefense, ...passiveDefense, ...armorDefense, Attribute.BASE_DEFENSE];
  const flatFooted = [...passiveDefense, ...armorDefense];
  const parryAndAll = [...initiativeDefense, ...passiveDefense, ...armorDefense, Attribute.BASE_DEFENSE, Attribute.PARRY_DEFENSE];
  return {
    [DefensePosture.ABANDON]: abandon,
    [DefensePosture.NORMAL]: normal,
    [DefensePosture.PARRY]: parry,
    [DefensePosture.ALL_DEFENSE]: allDefense,
    [DefensePosture.FLAT_FOOTED]: flatFooted,
    [DefensePosture.PARRY_AND_ALL]: parryAndAll,
  }
}