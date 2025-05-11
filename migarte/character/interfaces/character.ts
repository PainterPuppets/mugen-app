
import {CategoryToAttributeDict, AttributeToCategoryDict, AttributeCategoryMap, AttributeCategory, AttributeMap, Attribute, BaseAttributeType, BaseAttribute} from '@/interfaces/character';
import {
  SkillFlag,
  SkillMajor,
  CategoryToSkillDict,
  SkillCategory,
  SkillCategoryMap,
  SkillMap,
  SkillToCategoryDict,
  MajorToSkillDict,
  SkillToMajorDict, 
  SkillMajorMap,
} from "@/interfaces/skill";

export enum Race {
    HUMAN = 1,
}

export const RACE_MAP = {
    [Race.HUMAN]: '人类',
}


export type Attributes = {
  [key in BaseAttributeType]: number
}

export const initAttributes: Attributes = BaseAttribute.reduce<any>((a, b) => ({...a, [b]: 1}), {})


export type Skills = {
  [key in SkillFlag]: {
    grade: number;
    majors: Array<SkillMajor>;
  };
};

export const initSkills: Skills = (Object.keys(SkillMap) as Array<SkillFlag>).reduce<
  any
>((a, b) => ({ ...a, [b]: { grade: 0, majors: [] } }), {});

