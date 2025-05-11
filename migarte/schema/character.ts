import { v4 as uuidv4 } from 'uuid';

export enum Gender {
  MALE = 1,
  FEMALE = 2
}

export enum Race {
  HUMAN = 1
}

export interface ICharacter {
  id: string;
  userId: number;
  uuid: string;
  name: string;
  figureUrl: string;
  gender: Gender;
  height: number;
  weight: number;
  age: number;
  nation: string | null;
  race: Race;
  appearance: string | null;
  overview: string | null;
  experience: number;
  credit: number;
  branchPoint: number;
  currentWill: number;
  baseStrength: number;
  baseDexterity: number;
  baseConstitution: number;
  baseIntelligence: number;
  baseWisdom: number;
  baseDetermination: number;
  baseCharisma: number;
  baseControl: number;
  baseComposure: number;
  baseSize: number;
  type: string;
  isDeleted: boolean;
}

export class Character implements ICharacter {
  id: string;
  userId: number;
  uuid: string;
  name: string;
  figureUrl: string;
  gender: Gender;
  height: number;
  weight: number;
  age: number;
  nation: string | null;
  race: Race;
  appearance: string | null;
  overview: string | null;
  experience: number;
  credit: number;
  branchPoint: number;
  currentWill: number;
  baseStrength: number;
  baseDexterity: number;
  baseConstitution: number;
  baseIntelligence: number;
  baseWisdom: number;
  baseDetermination: number;
  baseCharisma: number;
  baseControl: number;
  baseComposure: number;
  baseSize: number;
  type: string;
  isDeleted: boolean;

  constructor(data: Partial<ICharacter> = {}) {
    this.id = data.id || uuidv4();
    this.userId = data.userId || 0;
    this.uuid = data.uuid || '';
    this.name = data.name || '';
    this.figureUrl = data.figureUrl || '';
    this.gender = data.gender || Gender.MALE;
    this.height = data.height || 0;
    this.weight = data.weight || 0;
    this.age = data.age || 0;
    this.nation = data.nation || null;
    this.race = data.race || Race.HUMAN;
    this.appearance = data.appearance || null;
    this.overview = data.overview || null;
    this.experience = data.experience || 0;
    this.credit = data.credit || 0;
    this.branchPoint = data.branchPoint || 0;
    this.currentWill = data.currentWill || 0;
    this.baseStrength = data.baseStrength || 1;
    this.baseDexterity = data.baseDexterity || 1;
    this.baseConstitution = data.baseConstitution || 1;
    this.baseIntelligence = data.baseIntelligence || 1;
    this.baseWisdom = data.baseWisdom || 1;
    this.baseDetermination = data.baseDetermination || 1;
    this.baseCharisma = data.baseCharisma || 1;
    this.baseControl = data.baseControl || 1;
    this.baseComposure = data.baseComposure || 1;
    this.baseSize = data.baseSize || 5;
    this.type = data.type || 'player';
    this.isDeleted = data.isDeleted || false;
  }

  get strength(): number {
    return this.baseStrength + this.getBonusFromType('strength');
  }

  get dexterity(): number {
    return this.baseDexterity + this.getBonusFromType('dexterity');
  }

  get constitution(): number {
    return this.baseConstitution + this.getBonusFromType('constitution');
  }

  get intelligence(): number {
    return this.baseIntelligence + this.getBonusFromType('intelligence');
  }

  get wisdom(): number {
    return this.baseWisdom + this.getBonusFromType('wisdom');
  }

  get determination(): number {
    return this.baseDetermination + this.getBonusFromType('determination');
  }

  get charisma(): number {
    return this.baseCharisma + this.getBonusFromType('charisma');
  }

  get control(): number {
    return this.baseControl + this.getBonusFromType('control');
  }

  get composure(): number {
    return this.baseComposure + this.getBonusFromType('composure');
  }

  private getBonusFromType(key: string): number {
    // TODO: Implement bonus calculation from storage
    return 0;
  }

  save(): void {
    const characters = Character.getAllCharacters();
    const index = characters.findIndex(c => c.id === this.id);
    
    if (index >= 0) {
      characters[index] = this;
    } else {
      characters.push(this);
    }

    localStorage.setItem('characters', JSON.stringify(characters));
  }

  static getById(id: string): Character | null {
    const characters = this.getAllCharacters();
    const data = characters.find(c => c.id === id);
    return data ? new Character(data) : null;
  }

  static getAllCharacters(): ICharacter[] {
    const data = localStorage.getItem('characters');
    return data ? JSON.parse(data) : [];
  }

  delete(): void {
    this.isDeleted = true;
    this.save();
  }
}