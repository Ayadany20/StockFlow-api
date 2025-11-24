import productRepo from '../repositories/productRepository.js';
export default {
  findAll: async (query) => {
    const where = {};
    if(query.categoryId) where.categoryId = query.categoryId;
    if(query.providerId) where.providerId = query.providerId;
    return productRepo.findAll({ where });
  },
  findById: (id) => productRepo.findById(id),
  create: (data) => productRepo.create(data),
  update: async (id,data)=>{
    await productRepo.update(id,data);
    return productRepo.findById(id);
  },
  remove: (id)=>productRepo.remove(id)
};
