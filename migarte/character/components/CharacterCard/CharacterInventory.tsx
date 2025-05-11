import React from "react";
import { observer } from "mobx-react";
import { Spin, Col, Row, Card, Popover, Empty } from "antd";
import workingSVG from "@/assets/svg/working.svg";
import CharacterStore from "@/character/stores/CharacterStore";
import { EquipmentPositionMap } from "@/interfaces/inventory";
import InventoryItem from "./InventoryItem";
import GoodsPopover from "./GoodsPopover";
import CharacterScrollPanel from "./CharacterScrollPanel";
import "./styles.less";

interface IProps {}
const CharacterInventory: React.SFC<IProps> = observer((props) => {
  const character = CharacterStore.characterDetail;
  if (!character) {
    return <Spin />;
  }

  return (
    <Row gutter={16} className="character-card-page">
      <Col  xs={24} md={8} className="character-card-col">
        <CharacterScrollPanel title="装备">
          {character.equipmentSlots.map((slot, index) => {
            if (slot.goods) {
              return (
                <Popover
                  key={`${slot.position}-${index}`}
                  placement="rightTop"
                  content={<GoodsPopover goods={slot.goods} />}
                >
                  <div className="equipment-slot">
                    <div className="equipment-slot-position">
                      {EquipmentPositionMap[slot.position]}
                    </div>
                    <div className="equipment-slot-goods">
                      {slot.goods.name}
                    </div>
                  </div>
                </Popover>
              );
            }

            return (
              <div className="equipment-slot" key={`${slot.position}-${index}`}>
                <div className="equipment-slot-position">
                  {EquipmentPositionMap[slot.position]}
                </div>
                <div className="equipment-slot-goods">空</div>
              </div>
            );
          })}
        </CharacterScrollPanel>
      </Col>
      <Col xs={24} md={16} className="character-card-col">
        <CharacterScrollPanel title="背包">
          {character.inventories.length === 0 ? (
            <Empty
              className="page-empty"
              image={workingSVG}
              imageStyle={{
                height: 180,
              }}
              description={<span>背包没有物品</span>}
            />
          ) : (
            character.inventories.map((inventory) => (
              <InventoryItem
                key={inventory.goods.uuid}
                inventory={inventory}
                onRefresh={() => CharacterStore.refreshCharacterData()}
              />
            ))
          )}
        </CharacterScrollPanel>
      </Col>
    </Row>
  );
});

export default CharacterInventory;
