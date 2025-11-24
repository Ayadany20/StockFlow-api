import repo from '../repositories/providerRepository.js';
export default {
  findAll: ()=>repo.findAll(),
  findById:(id)=>repo.findById(id),
  create:(d)=>repo.create(d),
  update:(id,d)=>repo.update(id,d),
  remove:(id)=>repo.remove(id)
};
