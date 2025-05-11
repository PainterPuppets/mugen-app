import { Character } from './character';
import { Skill, SkillFlag } from './skill';

export class CharacterService {
  static createCharacter(data: Partial<Character>): Character {
    const character = new Character(data);
    character.save();

    // Create default skills
    Object.values(SkillFlag).forEach(flag => {
      const skill = new Skill({
        characterId: character.id,
        flag
      });
      skill.save();
    });

    return character;
  }

  static getCharacterSkills(characterId: string): Skill[] {
    return Skill.getCharacterSkills(characterId);
  }

  static upgradeSkill(characterId: string, skillId: string): void {
    const character = Character.getById(characterId);
    const skill = Skill.getById(skillId);

    if (!character || !skill) {
      throw new Error('Character or skill not found');
    }

    const upgradeCost = this.getSkillUpgradeCost(skill.grade);
    
    if (character.experience < upgradeCost) {
      throw new Error('Insufficient experience');
    }

    character.experience -= upgradeCost;
    skill.grade += 1;

    character.save();
    skill.save();
  }

  private static getSkillUpgradeCost(currentGrade: number): number {
    if (currentGrade === 0) return 3;
    return Math.max((currentGrade - 1) * 2, 1);
  }
}