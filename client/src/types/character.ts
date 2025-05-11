export enum Gender {
  M = "M",
  F = "F"
}

export const GenderMap = {
  [Gender.M]: "男",
  [Gender.F]: "女"
};

export enum BaseAttributeType {
  Strength = "strength",
  Dexterity = "dexterity",
  Constitution = "constitution",
  Intelligence = "intelligence",
  Perception = "perception"
}

export type Attributes = {
  [key in BaseAttributeType]: number;
};

export enum CharacterStatus {
  Health = "health",
  Mana = "mana",
  Stamina = "stamina"
}

export interface Resource {
  current: number;
  max: number;
}

export type CharacterResources = {
  [key in CharacterStatus]: Resource;
};

// Character interfaces
export interface IMugenCharacter {
  uuid: string;
  name: string;
  gender: Gender;
  figureUrl: string;
  height: number;
  appearance: string;
  overview: string;
  attributes: Attributes;
  resources?: CharacterResources;
  
  // Optional properties for details view
  skills?: any[];
  powers?: any[];
  equipmentSlots?: any[];
  inventories?: any[];
  inventory?: any[];
  specialities?: any[];
}

// Character inventory interfaces
export enum EquipmentPosition {
  Head = "head",
  Chest = "chest",
  Hands = "hands",
  Legs = "legs",
  Feet = "feet",
  Accessory1 = "accessory1",
  Accessory2 = "accessory2",
  Weapon1 = "weapon1",
  Weapon2 = "weapon2"
}

export enum GoodsType {
  Normal = 0,
  Consumable = 1,
  Equipment = 2
}

export interface IGoodsBonus {
  key: string;
  value: number;
}

export interface IGoods {
  uuid: string;
  name: string;
  description: string;
  type: GoodsType;
  bonuses?: IGoodsBonus[];
  affixes?: string[];
  position?: EquipmentPosition;
}

export interface IInventoryItem {
  goods: IGoods;
  stock: number;
  isEquipped: boolean;
}

export interface IEquipmentSlot {
  position: EquipmentPosition;
  goods?: IGoods;
}

// Character power interfaces
export interface IPowerLevel {
  level: string;
  name?: string;
  description?: string;
  bonuses?: IGoodsBonus[];
  properties?: {
    uuid: string;
    name: string;
    description: string;
  }[];
}

export interface IPower {
  id: number;
  name: string;
  type: string;
  levels: IPowerLevel[];
}

// Default resource values
export const defaultResources: CharacterResources = {
  [CharacterStatus.Health]: { current: 100, max: 100 },
  [CharacterStatus.Mana]: { current: 100, max: 100 },
  [CharacterStatus.Stamina]: { current: 100, max: 100 }
};

// Default attribute values
export const defaultAttributes: Attributes = {
  [BaseAttributeType.Strength]: 1,
  [BaseAttributeType.Dexterity]: 1,
  [BaseAttributeType.Constitution]: 1,
  [BaseAttributeType.Intelligence]: 1,
  [BaseAttributeType.Perception]: 1
};