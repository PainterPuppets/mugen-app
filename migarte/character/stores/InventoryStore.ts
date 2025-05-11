import { observable, action } from 'mobx';
import BaseProvider from '@/utils/BaseProvider';

class InventoryStore {

  @action equip = (inventoryId: number) => {
    return BaseProvider.post(`/api/inventory/${inventoryId}/equip/`)
  }

  @action takeoff = (inventoryId: number) => {
    return BaseProvider.post(`/api/inventory/${inventoryId}/takeoff/`)
  }

  @action use = (inventoryId: number) => {
    return BaseProvider.post(`/api/inventory/${inventoryId}/use/`)
  }
}

const store = new InventoryStore();

export default store;
