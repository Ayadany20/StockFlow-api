import moveRepo from '../repositories/movementRepository.js';
import productRepo from '../repositories/productRepository.js';

export default {
  findAll: ()=> moveRepo.findAll(),

  create: async (data)=>{
    const prod = await productRepo.findById(data.productId);
    if(!prod){ const e=new Error('Product not found'); e.status=404; throw e; }

    if(data.type==='OUT' && prod.stock < data.quantity){
      const e=new Error('Insufficient stock'); e.status=400; throw e;
    }

    const newStock = data.type==='IN'
      ? prod.stock + data.quantity
      : prod.stock - data.quantity;

    await productRepo.update(prod.id, { stock:newStock });
    return moveRepo.create(data);
  }
};
