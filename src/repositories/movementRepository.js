import { InventoryMovement } from '../models/inventoryMovement.js';
export default {
  findAll: () =>
    InventoryMovement.findAll({ order:[['createdAt','DESC']] }),
  findById: (id) => InventoryMovement.findByPk(id),
  create: (d) => InventoryMovement.create(d)
};
