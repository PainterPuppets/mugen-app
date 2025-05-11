export type Gender = "M" | "F";

export enum BaseAttributeType {
  Strength = "strength",
  Dexterity = "dexterity",
  Constitution = "constitution",
  Intelligence = "intelligence",
  Perception = "perception",
}

export interface Attributes {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  perception: number;
}

export interface IMugenCharacter {
  uuid: string;
  name: string;
  gender: Gender;
  figure_url: string;
  height: number;
  appearance: string;
  overview: string;
  attributes: Attributes;
  credit: number;
  branch_point: number;
  experience: number;
  skills: any[]; // Replace with proper type
  inventory: any[]; // Replace with proper type
  hit_point: number;
  current_hit_point: number;
  can_revive: boolean;
  owner_uuid: string;
}