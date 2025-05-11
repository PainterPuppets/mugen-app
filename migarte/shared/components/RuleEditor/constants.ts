import {
    RuleType,
    GetRule,
    LiteralRule,
    SubtractionRule,
    DivisionRule,
    ProductRule,
    PlusRule,
    GetRuleKey,
} from "@/interfaces/rule";
import { Attribute } from "@/interfaces/character";


export const DEFAULT_RULE: LiteralRule = {
  type: RuleType.LITERAL,
  value: 0,
}

export const DEFAULT_GET_RULE: GetRule = {
  type: RuleType.GET,
  key: GetRuleKey.ATTRIBUTE,
  flag: Attribute.STRENGTH,
}

export const DEFAULT_PLUS_RULE: PlusRule = {
  type: RuleType.PLUS,
  value: [DEFAULT_RULE, DEFAULT_RULE]
}

export const DEFAULT_PRODUCT_RULE: ProductRule = {
  type: RuleType.PRODUCT,
  value: [DEFAULT_RULE, DEFAULT_RULE]
}

export const DEFAULT_DIVISION_RULE: DivisionRule = {
  type: RuleType.DIVISION,
  left: DEFAULT_RULE,
  right: DEFAULT_RULE,
}

export const DEFAULT_SUBTRACTION_RULE: SubtractionRule = {
  type: RuleType.SUBTRACTION,
  left: DEFAULT_RULE,
  right: DEFAULT_RULE,
}

export const RuleTypeDefaultMap = {
  [RuleType.GET]: DEFAULT_GET_RULE,
  [RuleType.DIVISION]: DEFAULT_DIVISION_RULE,
  [RuleType.LITERAL]: DEFAULT_RULE,
  [RuleType.PLUS]: DEFAULT_PLUS_RULE,
  [RuleType.PRODUCT]: DEFAULT_PRODUCT_RULE,
  [RuleType.SUBTRACTION]: DEFAULT_SUBTRACTION_RULE,
}
