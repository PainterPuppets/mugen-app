import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { Select, Button, Spin } from "antd";
import { Scrollbars } from 'react-custom-scrollbars';
import SpecialityStore from '@/character/stores/SpecialityStore';
import { IMugenCharacter } from "@/interfaces/mugen";
import { SpecialityCategoryMap, SpecialityCategory } from "@/interfaces/power";
import SpecialityItem, { UpgradeSpecialityBtn } from './SpecialityItem';

interface IProps {
  character: IMugenCharacter;
  onRefresh?: Function;
}
const SpecialityPanel: React.SFC<IProps> = observer((props) => {
  const [category, setCategory] = useState(SpecialityCategory.Combat);
  const { character, onRefresh } = props;

  useEffect(() => {
    SpecialityStore.initSpecialities();
  }, [])


  return (
    <div className="speciality-panel">
      <div className="speciality-panel-action">
        <Select value={category} onSelect={(value: any) => setCategory(value)}>
          {(Object.keys(SpecialityCategoryMap) as Array<SpecialityCategory>).map((option) => (
            <Select.Option value={option} key={option}>
              {SpecialityCategoryMap[option]}专长
            </Select.Option>
          ))}
        </Select>
      </div>

      <Scrollbars 
        autoHide
        renderThumbVertical={() => <div className="custom-scroll" />}
        style={{ height: 480 }}
      >
        {!SpecialityStore.ready 
        ? <div className="max-spin"><Spin /></div>
        : SpecialityStore.specialities
          .filter(s => s.category === category)
          .map((speciality) => {
            const cSpeciality = character.specialities.find(s => s.speciality.id === speciality.id)
            return (
              <SpecialityItem
                speciality={speciality}
                currentLevel={cSpeciality?.currentLevel || 0}
                action={(
                  <UpgradeSpecialityBtn
                    character={character}
                    speciality={speciality}
                    currentLevel={cSpeciality?.currentLevel}
                    onRefresh={onRefresh}
                  />
                )}
              />
            )
          })
        }
      </Scrollbars>
    </div>
  );
});

export default SpecialityPanel;
