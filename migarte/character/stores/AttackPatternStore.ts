import { observable, action } from 'mobx';
import BaseProvider from '@/utils/BaseProvider';
import { EquipmentAffix } from '@/interfaces/inventory';
import { DamageType, DamageDegree } from '@/interfaces/character';
import { AnyRule } from '@/interfaces/rule';
import { keysToUnderline, toCamel } from '@/utils/helper';
import { IMugenAttack } from '@/interfaces/mugen';

export type CreateAttackPatternData = {
  name: string;
  characterUuid: string;
  damageType: DamageType;
  damageDegree: DamageDegree;
  range: number;
  attackCheckRule?: AnyRule;
  attackAdditionSuccessRule?: AnyRule;
  limitRule?: AnyRule;
  affixes: Array<EquipmentAffix>;
  armorPenetration: number;
  magicPenetration: number;
  highSpeed: number;
};

export type UpdateAttackPatternData = Partial<Omit<CreateAttackPatternData, "characterUuid">>;

class AttackPatternStore {
  @action create = (data: CreateAttackPatternData) => {
    return BaseProvider.post<IMugenAttack>(
      `/api/attack_pattern/`,
      keysToUnderline(data),
    );
  }

  @action update = (id: number, data: UpdateAttackPatternData) => {
    return BaseProvider.patch<IMugenAttack>(
      `/api/attack_pattern/${id}/`,
      keysToUnderline(data),
    );
  };

  @action delete = (id: number) => {
    return BaseProvider.delete(`/api/attack_pattern/${id}/`);
  };
}

const store = new AttackPatternStore();

export default store;
