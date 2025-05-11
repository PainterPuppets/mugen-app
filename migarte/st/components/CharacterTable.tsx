import React, { useState } from "react";
import { toJS } from "mobx";
import {
  Avatar,
  Button,
  Table,
  Progress,
  Tooltip,
} from "antd";
import { IMugenCharacter } from "@/interfaces/mugen";
import HamelStrand from "@/shared/components/HamelStrand";
import { observer } from "mobx-react";
import CharacterItemAction from './CharacterItemAction';
import STStore from "@/st/stores/STStore";
import "./CharacterItem.less";

const { Column } = Table;

interface Props {
}

const CharacterItem: React.SFC<Props> = observer((props) => {
  return (
    <React.Fragment>
      <span style={{ display: 'none' }}>
        {STStore.initiative}
        {console.log(STStore.initiativeSet)}
      </span>
      <Table 
        pagination={false}
        dataSource={STStore.characters}
        rowKey="uuid"
      >
        <Column<IMugenCharacter>
          title="角色卡形象"
          key="figure"
          render={(_, character) => (
            <div>
              <Avatar src={character.figureUrl} size="large" />
              <span className="st-character-item-name">{character.name}</span>
            </div>
          )}
        />
        <Column<IMugenCharacter>
          title="生命值"
          key="health"
          width={100}
          align="center"
          render={(_, character) => (
            <HamelStrand
              healthPoint={character.attributes.health}
              damage={character.damage}
            />
          )}
        />
        <Column<IMugenCharacter>
          title="意志值"
          key="will"
          width={150}
          align="center"
          render={(_, character) => (
            <Progress 
              percent={character.currentWill  * 100 / character.attributes.will}
              format={() => (
                <span>{character.currentWill}/{character.attributes.will}</span>
              )}
             />
          )}
        />
        <Column<IMugenCharacter>
          title="先攻值"
          key="initiative"
          width={100}
          align="center"
          sorter={(a, b) => a.attributes.initiative + STStore.getInitiative(a.uuid) - b.attributes.initiative - STStore.getInitiative(b.uuid)}
          render={(_, character) => (
            <React.Fragment>
              <Tooltip title={`基础(${character.attributes.initiative}) + 骰点(${STStore.getInitiative(character.uuid)})`}>
                {character.attributes.initiative + STStore.getInitiative(character.uuid)}
              </Tooltip>
              <Button type="link" onClick={() => STStore.setInitiative(character.uuid)}>重roll</Button>
            </React.Fragment>
          )}
        />
        <Column<IMugenCharacter>
          title="操作"
          key="action"
          align="center"
          render={(_, character) => (
            <React.Fragment>
              <CharacterItemAction character={character}/>
            </React.Fragment>
          )}
        />
      </Table>
    </React.Fragment>
  );
});

export default CharacterItem;
