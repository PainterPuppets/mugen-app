import React from "react";
import { Popover } from "antd";
import { Attribute } from "@/interfaces/character";
import { toCamel } from '@/utils/helper';
import { IMugenCharacter } from "@/interfaces/mugen";
import "./styles.less";

interface AttrValueProps {
  character: IMugenCharacter;
  attributeKey: Attribute;
  className?: string;
}

const CharacterAttributeValue: React.SFC<AttrValueProps> = (props) => {
  const { character, attributeKey } = props;
  const bonuses = character.bonuses.filter(
    (bonus) => toCamel(bonus.key) === attributeKey
  );

  if (bonuses.length === 0) {
    return (
      <span className={`character-attribute-value ${props.className || ''}`}>
        {character.attributes[attributeKey]}
      </span>
    )
  }

  return (
    <Popover 
      placement="leftTop" 
      content={(
        <React.Fragment>
          {bonuses.map((bonus, index) => (
            <div key={index}>
              {bonus.source}: +{bonus.value}
            </div>
          ))}
        </React.Fragment>
      )}
    >
      <span className={`character-attribute-value has-bonus ${props.className || ''}`}>
        {character.attributes[attributeKey]}
      </span>
    </Popover>
  );
};

export default CharacterAttributeValue;
