import React, { useState, useEffect } from "react";
import { IMugenCharacter } from "@/interfaces/mugen";
import InventoryItem from "@/character/components/CharacterCard/InventoryItem";
import HamelStrand from "@/shared/components/HamelStrand";
import STStore from "@/st/stores/STStore";
import { getCharacterDefense } from "@/utils/mugen";
import "./CharacterItem.less";

interface Props {
  character: IMugenCharacter;
}

const CharacterInventoryPanel: React.SFC<Props> = (props) => {
  const { character } = props;

  return (
    <React.Fragment>
      {character.inventories.map((inventory) => (
        <InventoryItem
          key={inventory.goods.uuid}
          inventory={inventory}
          onRefresh={() => STStore.refreshCharacterData(props.character.uuid)}
        />
      ))}
    </React.Fragment>
  );
};

export default CharacterInventoryPanel;
