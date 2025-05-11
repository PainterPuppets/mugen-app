// 这是为应用程序简化的技能类型定义

export enum SkillCategory {
  Physiology = "physiology",
  Mental = "mental",
  Interaction = "interaction"
}

export enum SkillFlag {
  Fighting = "fighting",
  MeleeWeapon = "meleeWeapon",
  Archery = "archery",
  Firearms = "firearms",
  Sports = "sports",
  Stealth = "stealth",
  Survival = "survival",
  Driving = "driving",
  Handicraft = "handicraft",
  Medical = "medical",
  Occult = "occult",
  Investigation = "investigation",
  Perception = "perception",
  Technology = "technology",
  Academics = "academics",
  Science = "science",
  Empathy = "empathy",
  Intimidation = "intimidation",
  Persuasion = "persuasion",
  Socialize = "socialize",
  Deception = "deception"
}

export enum SkillMajor {
  // Fighting
  Unarmed = "unarmed",
  Boxing = "boxing",
  Martial = "martial",
  
  // Melee Weapon
  Blade = "blade",
  Blunt = "blunt",
  Polearm = "polearm",
  
  // Archery & Firearms
  Bow = "bow",
  Crossbow = "crossbow",
  Pistol = "pistol",
  Rifle = "rifle",
  
  // Sports
  Swim = "swim",
  Sprint = "sprint",
  Climb = "climb",
  Jump = "jump",
  
  // Other skills majors would be defined here
  
  REFLEX = "reflex",
  OVERRUN = "overrun",
  BALANCE = "balance",
  JUMP = "jump",
  CLIMB = "climb",
  ESCAPE = "escape",
  SWIM = "swim",
  GRAPPLE = "grapple"
}

// Map skill flags to category
export const SkillToCategoryDict: Record<SkillFlag, SkillCategory> = {
  [SkillFlag.Fighting]: SkillCategory.Physiology,
  [SkillFlag.MeleeWeapon]: SkillCategory.Physiology,
  [SkillFlag.Archery]: SkillCategory.Physiology,
  [SkillFlag.Firearms]: SkillCategory.Physiology,
  [SkillFlag.Sports]: SkillCategory.Physiology,
  [SkillFlag.Stealth]: SkillCategory.Physiology,
  [SkillFlag.Survival]: SkillCategory.Physiology,
  [SkillFlag.Driving]: SkillCategory.Physiology,
  [SkillFlag.Handicraft]: SkillCategory.Mental,
  [SkillFlag.Medical]: SkillCategory.Mental,
  [SkillFlag.Occult]: SkillCategory.Mental,
  [SkillFlag.Investigation]: SkillCategory.Mental,
  [SkillFlag.Perception]: SkillCategory.Mental,
  [SkillFlag.Technology]: SkillCategory.Mental,
  [SkillFlag.Academics]: SkillCategory.Mental,
  [SkillFlag.Science]: SkillCategory.Mental,
  [SkillFlag.Empathy]: SkillCategory.Interaction,
  [SkillFlag.Intimidation]: SkillCategory.Interaction,
  [SkillFlag.Persuasion]: SkillCategory.Interaction,
  [SkillFlag.Socialize]: SkillCategory.Interaction,
  [SkillFlag.Deception]: SkillCategory.Interaction
};

// Map category to skill flags
export const CategoryToSkillDict: Record<SkillCategory, SkillFlag[]> = {
  [SkillCategory.Physiology]: [
    SkillFlag.Fighting,
    SkillFlag.MeleeWeapon,
    SkillFlag.Archery,
    SkillFlag.Firearms,
    SkillFlag.Sports,
    SkillFlag.Stealth,
    SkillFlag.Survival,
    SkillFlag.Driving
  ],
  [SkillCategory.Mental]: [
    SkillFlag.Handicraft,
    SkillFlag.Medical,
    SkillFlag.Occult,
    SkillFlag.Investigation,
    SkillFlag.Perception,
    SkillFlag.Technology,
    SkillFlag.Academics,
    SkillFlag.Science
  ],
  [SkillCategory.Interaction]: [
    SkillFlag.Empathy,
    SkillFlag.Intimidation,
    SkillFlag.Persuasion,
    SkillFlag.Socialize,
    SkillFlag.Deception
  ]
};

// Map majors to skill flags
export const MajorToSkillDict: Record<SkillMajor, SkillFlag> = {
  [SkillMajor.Unarmed]: SkillFlag.Fighting,
  [SkillMajor.Boxing]: SkillFlag.Fighting,
  [SkillMajor.Martial]: SkillFlag.Fighting,
  [SkillMajor.Blade]: SkillFlag.MeleeWeapon,
  [SkillMajor.Blunt]: SkillFlag.MeleeWeapon,
  [SkillMajor.Polearm]: SkillFlag.MeleeWeapon,
  [SkillMajor.Bow]: SkillFlag.Archery,
  [SkillMajor.Crossbow]: SkillFlag.Archery,
  [SkillMajor.Pistol]: SkillFlag.Firearms,
  [SkillMajor.Rifle]: SkillFlag.Firearms,
  [SkillMajor.Swim]: SkillFlag.Sports,
  [SkillMajor.Sprint]: SkillFlag.Sports,
  [SkillMajor.Climb]: SkillFlag.Sports,
  [SkillMajor.Jump]: SkillFlag.Sports,
  
  // Additional mappings
  [SkillMajor.REFLEX]: SkillFlag.Sports,
  [SkillMajor.OVERRUN]: SkillFlag.Sports,
  [SkillMajor.BALANCE]: SkillFlag.Sports,
  [SkillMajor.ESCAPE]: SkillFlag.Sports,
  [SkillMajor.GRAPPLE]: SkillFlag.Fighting
};

// Map skill flags to majors
export const SkillToMajorDict: Record<SkillFlag, SkillMajor[]> = {
  [SkillFlag.Fighting]: [
    SkillMajor.Unarmed,
    SkillMajor.Boxing,
    SkillMajor.Martial,
    SkillMajor.GRAPPLE
  ],
  [SkillFlag.MeleeWeapon]: [
    SkillMajor.Blade,
    SkillMajor.Blunt,
    SkillMajor.Polearm
  ],
  [SkillFlag.Archery]: [
    SkillMajor.Bow,
    SkillMajor.Crossbow
  ],
  [SkillFlag.Firearms]: [
    SkillMajor.Pistol,
    SkillMajor.Rifle
  ],
  [SkillFlag.Sports]: [
    SkillMajor.Swim,
    SkillMajor.Sprint,
    SkillMajor.Climb,
    SkillMajor.Jump,
    SkillMajor.REFLEX,
    SkillMajor.OVERRUN,
    SkillMajor.BALANCE,
    SkillMajor.ESCAPE
  ],
  [SkillFlag.Stealth]: [],
  [SkillFlag.Survival]: [],
  [SkillFlag.Driving]: [],
  [SkillFlag.Handicraft]: [],
  [SkillFlag.Medical]: [],
  [SkillFlag.Occult]: [],
  [SkillFlag.Investigation]: [],
  [SkillFlag.Perception]: [],
  [SkillFlag.Technology]: [],
  [SkillFlag.Academics]: [],
  [SkillFlag.Science]: [],
  [SkillFlag.Empathy]: [],
  [SkillFlag.Intimidation]: [],
  [SkillFlag.Persuasion]: [],
  [SkillFlag.Socialize]: [],
  [SkillFlag.Deception]: []
};

// Map for displaying skill names
export const SkillMap: Record<SkillFlag, string> = {
  [SkillFlag.Fighting]: "格斗",
  [SkillFlag.MeleeWeapon]: "白刃",
  [SkillFlag.Archery]: "弓箭",
  [SkillFlag.Firearms]: "射击",
  [SkillFlag.Sports]: "运动",
  [SkillFlag.Stealth]: "潜行",
  [SkillFlag.Survival]: "生存",
  [SkillFlag.Driving]: "驾驶",
  [SkillFlag.Handicraft]: "手艺",
  [SkillFlag.Medical]: "医疗",
  [SkillFlag.Occult]: "神秘学",
  [SkillFlag.Investigation]: "调查",
  [SkillFlag.Perception]: "感知",
  [SkillFlag.Technology]: "科技",
  [SkillFlag.Academics]: "学识",
  [SkillFlag.Science]: "科学",
  [SkillFlag.Empathy]: "共情",
  [SkillFlag.Intimidation]: "威吓",
  [SkillFlag.Persuasion]: "说服",
  [SkillFlag.Socialize]: "社交",
  [SkillFlag.Deception]: "欺诈"
};

// Map for displaying skill major names
export const SkillMajorMap: Record<SkillMajor, string> = {
  [SkillMajor.Unarmed]: "徒手格斗",
  [SkillMajor.Boxing]: "拳击",
  [SkillMajor.Martial]: "武术",
  [SkillMajor.Blade]: "刀剑",
  [SkillMajor.Blunt]: "钝器",
  [SkillMajor.Polearm]: "长兵器",
  [SkillMajor.Bow]: "弓",
  [SkillMajor.Crossbow]: "弩",
  [SkillMajor.Pistol]: "手枪",
  [SkillMajor.Rifle]: "步枪",
  [SkillMajor.Swim]: "游泳",
  [SkillMajor.Sprint]: "奔跑",
  [SkillMajor.Climb]: "攀爬",
  [SkillMajor.Jump]: "跳跃",
  
  // Additional mappings
  [SkillMajor.REFLEX]: "反射",
  [SkillMajor.OVERRUN]: "冲撞",
  [SkillMajor.BALANCE]: "平衡",
  [SkillMajor.ESCAPE]: "闪避",
  [SkillMajor.GRAPPLE]: "擒拿"
};

// Map for displaying skill category names
export const SkillCategoryMap: Record<SkillCategory, string> = {
  [SkillCategory.Physiology]: "生理技能",
  [SkillCategory.Mental]: "心智技能",
  [SkillCategory.Interaction]: "互动技能"
};

// Skill specification (tooltips)
export const Specification: Record<SkillFlag | SkillMajor, string> = {
  [SkillFlag.Fighting]: "使用徒手或轻便武器进行近身格斗的技能",
  [SkillFlag.MeleeWeapon]: "使用刀剑等白刃武器进行战斗的技能",
  [SkillFlag.Archery]: "使用弓箭等远程武器的技能",
  [SkillFlag.Firearms]: "使用各种枪械的技能",
  [SkillFlag.Sports]: "各种身体活动的技能",
  [SkillFlag.Stealth]: "隐藏自己或物品的技能",
  [SkillFlag.Survival]: "在恶劣环境中生存的技能",
  [SkillFlag.Driving]: "驾驶各种交通工具的技能",
  [SkillFlag.Handicraft]: "手工制作物品的技能",
  [SkillFlag.Medical]: "医疗和急救的技能",
  [SkillFlag.Occult]: "对超自然现象和神秘学的了解",
  [SkillFlag.Investigation]: "收集和分析信息的技能",
  [SkillFlag.Perception]: "察觉周围环境的技能",
  [SkillFlag.Technology]: "使用和理解各种技术的能力",
  [SkillFlag.Academics]: "对人文学科的了解",
  [SkillFlag.Science]: "对自然科学的了解",
  [SkillFlag.Empathy]: "理解他人情感的能力",
  [SkillFlag.Intimidation]: "威吓他人的技能",
  [SkillFlag.Persuasion]: "说服他人的技能",
  [SkillFlag.Socialize]: "社交和建立人际关系的技能",
  [SkillFlag.Deception]: "欺骗和隐瞒的技能",
  
  // Majors
  [SkillMajor.Unarmed]: "不使用武器进行格斗的技能",
  [SkillMajor.Boxing]: "拳击技巧",
  [SkillMajor.Martial]: "各种武术技巧",
  [SkillMajor.Blade]: "使用刀剑类武器的技能",
  [SkillMajor.Blunt]: "使用棍棒等钝器的技能",
  [SkillMajor.Polearm]: "使用长枪等长兵器的技能",
  [SkillMajor.Bow]: "使用弓的技能",
  [SkillMajor.Crossbow]: "使用弩的技能",
  [SkillMajor.Pistol]: "使用手枪的技能",
  [SkillMajor.Rifle]: "使用步枪的技能",
  [SkillMajor.Swim]: "游泳技能",
  [SkillMajor.Sprint]: "短距离快速奔跑的能力",
  [SkillMajor.Climb]: "攀爬各种表面的技能",
  [SkillMajor.Jump]: "跳跃的技能",
  
  [SkillMajor.REFLEX]: "快速反应的能力",
  [SkillMajor.OVERRUN]: "冲过障碍物的能力",
  [SkillMajor.BALANCE]: "保持平衡的能力",
  [SkillMajor.ESCAPE]: "逃脱束缚的能力",
  [SkillMajor.GRAPPLE]: "擒拿和控制对手的能力"
};

// Export skill type
export type Skills = {
  [key in SkillFlag]: {
    grade: number;
    majors: SkillMajor[];
  };
};

// Initialize empty skills object
export const initSkills = (): Skills => {
  const skills: Partial<Skills> = {};
  
  (Object.keys(SkillFlag) as Array<keyof typeof SkillFlag>).forEach(key => {
    const flag = SkillFlag[key];
    skills[flag] = {
      grade: 0,
      majors: []
    };
  });
  
  return skills as Skills;
};