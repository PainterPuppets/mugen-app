import { v4 as uuidv4 } from 'uuid';

export enum SkillFlag {
  Athletics = 'athletics',
  Fight = 'fight',
  Drive = 'drive',
  Firearms = 'firearms',
  Larceny = 'larceny',
  Stealth = 'stealth',
  Survival = 'survival',
  Blade = 'blade',
  Bow = 'bow',
  // ... add other skill flags
}

export interface ISkill {
  id: string;
  characterId: string;
  flag: SkillFlag;
  majors: string[];
  freeMajorPoint: number;
  exchangeMajorPoint: number;
  grade: number;
}

export class Skill implements ISkill {
  id: string;
  characterId: string;
  flag: SkillFlag;
  majors: string[];
  freeMajorPoint: number;
  exchangeMajorPoint: number;
  grade: number;

  constructor(data: Partial<ISkill> = {}) {
    this.id = data.id || uuidv4();
    this.characterId = data.characterId || '';
    this.flag = data.flag || SkillFlag.Athletics;
    this.majors = data.majors || [];
    this.freeMajorPoint = data.freeMajorPoint || 0;
    this.exchangeMajorPoint = data.exchangeMajorPoint || 0;
    this.grade = data.grade || 0;
  }

  get bonusMajorPoint(): number {
    if (this.grade > 4) return 2;
    if (this.grade > 2) return 1;
    return 0;
  }

  get majorPoint(): number {
    return this.freeMajorPoint + this.bonusMajorPoint + this.exchangeMajorPoint;
  }

  get residueMajorPoint(): number {
    return this.majorPoint - this.majors.length;
  }

  save(): void {
    const skills = Skill.getAllSkills();
    const index = skills.findIndex(s => s.id === this.id);
    
    if (index >= 0) {
      skills[index] = this;
    } else {
      skills.push(this);
    }

    localStorage.setItem('skills', JSON.stringify(skills));
  }

  static getById(id: string): Skill | null {
    const skills = this.getAllSkills();
    const data = skills.find(s => s.id === id);
    return data ? new Skill(data) : null;
  }

  static getAllSkills(): ISkill[] {
    const data = localStorage.getItem('skills');
    return data ? JSON.parse(data) : [];
  }

  static getCharacterSkills(characterId: string): Skill[] {
    return this.getAllSkills()
      .filter(s => s.characterId === characterId)
      .map(s => new Skill(s));
  }
}