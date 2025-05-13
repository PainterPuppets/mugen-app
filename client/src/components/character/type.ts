import {
  BaseAttributeType,
  BaseAttribute,
} from "@/types/character";
import {
  SkillFlag,
  SkillMajor,
  SkillMap,
} from "@/types/skill";

export enum Race {
  HUMAN = 1,
}

export const RACE_MAP = {
  [Race.HUMAN]: "人类",
};

export type Attributes = {
  [key in BaseAttributeType]: number;
};

export const defaultAttributes: Attributes = BaseAttribute.reduce(
  (a, b) => ({ ...a, [b]: 1 }),
  {}
) as Attributes;

export type Skills = {
  [key in SkillFlag]: {
    grade: number;
    majors: Array<SkillMajor>;
  };
};

export const defaultSkills: Skills = (
  Object.keys(SkillMap) as Array<SkillFlag>
).reduce<any>((a, b) => ({ ...a, [b]: { grade: 0, majors: [] } }), {});
