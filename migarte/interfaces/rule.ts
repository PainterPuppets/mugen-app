import { Attribute, AttributeMap } from './character'
import { SkillMajor, SkillMajorMap, SkillFlag, SkillMap } from './skill'

export enum RuleType {
  LITERAL = 'literal',  // 字面量
  PLUS = 'plus',  // 加法
  PRODUCT = 'product',  // 乘法
  GET = 'get',  // 取值
  SUBTRACTION = 'subtraction', // 减法
  DIVISION = 'division', // 除法
}

export const RuleTypeMap = {
  [RuleType.LITERAL]: '数值',
  [RuleType.PLUS]: '加法',
  [RuleType.SUBTRACTION]: '减法',
  [RuleType.PRODUCT]: '乘法',
  [RuleType.DIVISION]: '除法',
  [RuleType.GET]: '取值',
}

export enum GetRuleKey {
  ATTRIBUTE = 'attribute', // 属性
  SKILL = 'skill',         // 技能
  MAJOR = 'major',         // 专业
  CONTEXT = 'context',     // 上下文
}

export const GetRuleKeyMap = {
  [GetRuleKey.ATTRIBUTE]: '属性',
  [GetRuleKey.SKILL]: '技能',
  [GetRuleKey.MAJOR]: '专业',
  [GetRuleKey.CONTEXT]: '上下文',
}

export enum ContextKey {
  WEAPON_DAMAGE = 'weapon_damage',  // 武器伤害
  WEAPON_REQUIRED_STRENGTH = 'weapon_required_strength',  // 武器力量需求
}

export type RuleContext = {
  [key in ContextKey]?: number
}

export const ContextKeyMap = {
  [ContextKey.WEAPON_DAMAGE]: '武器伤害',
  [ContextKey.WEAPON_REQUIRED_STRENGTH]: '武器力量需求',
}

export interface BaseRule {
  type: RuleType
}

export interface LiteralRule extends BaseRule {
  type: RuleType.LITERAL,
  value: number,
}

export interface PlusRule extends BaseRule {
  type: RuleType.PLUS,
  value: Array<AnyRule>,
}

export interface ProductRule extends BaseRule {
  type: RuleType.PRODUCT,
  value: Array<AnyRule>,
}

export interface SubtractionRule extends BaseRule {
  type: RuleType.SUBTRACTION,
  left: AnyRule,
  right: AnyRule,
}

export interface DivisionRule extends BaseRule {
  type: RuleType.DIVISION,
  left: AnyRule,
  right: AnyRule,
}

export interface BaseGetRule extends BaseRule {
  type: RuleType.GET,
  key: GetRuleKey,
  flag: string,
}

export const GetKeyToFlag = {
  [GetRuleKey.ATTRIBUTE]: (Object.keys(AttributeMap) as Array<Attribute>),
  [GetRuleKey.SKILL]: (Object.keys(SkillMap) as Array<SkillFlag>),
  [GetRuleKey.MAJOR]:  (Object.keys(SkillMajorMap) as Array<SkillMajor>),
  [GetRuleKey.CONTEXT]: (Object.keys(ContextKeyMap) as Array<ContextKey>),
}

export type GetRuleFlag = Attribute | SkillFlag | SkillMajor | ContextKey;

export interface GetAttributeRule extends BaseGetRule {
  type: RuleType.GET,
  key: GetRuleKey.ATTRIBUTE,
  flag: Attribute,
}

export interface GetSkillRule extends BaseGetRule {
  type: RuleType.GET,
  key: GetRuleKey.SKILL,
  flag: SkillFlag,
}

export interface GetMajorRule extends BaseGetRule {
  type: RuleType.GET,
  key: GetRuleKey.MAJOR,
  flag: SkillMajor,
}

export interface GetContextRule extends BaseGetRule {
  type: RuleType.GET,
  key: GetRuleKey.CONTEXT,
  flag: ContextKey,
}

export type GetRule = GetAttributeRule | GetSkillRule | GetMajorRule | GetContextRule

export type AnyRule = LiteralRule | PlusRule | ProductRule | GetRule | SubtractionRule | DivisionRule;
