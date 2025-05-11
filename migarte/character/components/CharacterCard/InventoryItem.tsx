import React from "react";
import { observer } from "mobx-react";
import { Button, Popover, Popconfirm, message } from "antd";
import { GoodsType } from '@/interfaces/inventory';
import { IMugenInventory } from '@/interfaces/mugen';
import GoodsPopover from './GoodsPopover';
import InventoryStore from '@/character/stores/InventoryStore';
import './styles.less';

interface InventoryItemProps {
  inventory: IMugenInventory;
  onRefresh: Function;
}

const InventoryItem: React.SFC<InventoryItemProps> = observer((props) => {
  const goods = props.inventory.goods
  return (
    <Popover
      placement="leftTop"
      content={<GoodsPopover goods={goods}/>}
    >
      <div className={`inventory-item ${props.inventory.isEquipped ? 'equipped' : ''}`}>
        <div className="inventory-item-name">
          {goods.name}
        </div>
        {props.inventory.stock > 1 &&
          <div className="inventory-item-stock">
            堆叠数：{props.inventory.stock }
          </div>
        }
        <div className="inventory-item-description">
          {goods.description}
        </div>
        <div className="inventory-item-action">
          {goods.type === GoodsType.EQUIPMENT && (
            props.inventory.isEquipped ? 
              <Button type="primary" onClick={() => {
                InventoryStore.takeoff(props.inventory.id).then(() => {
                  props.onRefresh()
                })
              }}>
                脱下
              </Button> :
              <Button 
                type="primary" 
                onClick={() => {
                  InventoryStore.equip(props.inventory.id).then(() => {
                    props.onRefresh()
                  })
                }}
              >
                装备
              </Button>
          )}
          {goods.type === GoodsType.CONSUMABLES &&
            <Popconfirm
              placement="top"
              title={`确定使用么？这会导致物品库存减少`}
              onConfirm={() => {
                InventoryStore.use(props.inventory.id).then(() => {
                  message.success('使用成功，请找st结算效果')
                  props.onRefresh()
                })
              }}
              okText="使用"
              cancelText="取消"
            >
              <Button type="primary">
                使用
              </Button>
            </Popconfirm>
          }
        </div>
      </div>
    </Popover>
  );
})


export default InventoryItem;
