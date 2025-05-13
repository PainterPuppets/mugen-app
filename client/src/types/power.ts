export enum Level {
  D = 1,
  C = 2,
  B = 3,
  A = 4,
  S = 5,
}

export const LevelMap = {
  [Level.D]: "D",
  [Level.C]: "C",
  [Level.B]: "B",
  [Level.A]: "A",
  [Level.S]: "S",
};

export enum PowerType {
  BLOOD = "blood", // 血统
  MODIFICATION = "modification", // 改造
  PUPIL = "pupil", // 瞳术
  CULTIVATION = "cultivation", // 修真功法
  GRIMOIRE = "grimoire", // 魔导书
  TITLE = "title", // 称号
}

export const PowerTypeMap = {
  [PowerType.BLOOD]: "血统",
  [PowerType.MODIFICATION]: "改造",
  [PowerType.PUPIL]: "瞳术",
  [PowerType.CULTIVATION]: "修真功法",
  [PowerType.GRIMOIRE]: "魔导书",
  [PowerType.TITLE]: "称号",
};

export enum SpecialityCategory {
  Combat = "combat",
  Physiology = "physiology",
  Mental = "mental",
  Interaction = "interaction",
}

export const SpecialityCategoryMap = {
  [SpecialityCategory.Combat]: "战斗",
  [SpecialityCategory.Physiology]: "生理",
  [SpecialityCategory.Mental]: "心智",
  [SpecialityCategory.Interaction]: "互动",
};

export interface SpecialityLevel {
  id: number;
  name: string;
  description: string;
  effectDescription: string;
  level: number;
}

export interface Speciality {
  id: number;
  name: string;
  description: string;
  category: SpecialityCategory;
  levels: Array<SpecialityLevel>;
}