import React, { useState } from "react";
import {
  Button,
} from "antd";
import { IMugenCharacter } from "@/interfaces/mugen";
import CharacterDetailModal from "./CharacterDetailModal";

interface Props {
  character: IMugenCharacter;
}

const CharacterItemAction: React.SFC<Props> = (props) => {
  const { character } = props;
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  return (
    <React.Fragment>
      <Button type="primary" onClick={() => setDetailModalVisible(true)}>
        详情
      </Button>
      <CharacterDetailModal
        character={character}
        visible={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
      />
    </React.Fragment>
  );
};

export default CharacterItemAction;
