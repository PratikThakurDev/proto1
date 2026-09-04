import Evidence from '../models/Evidence.js';
export const list = async (q = '') => Evidence.find(q ? { title: { $regex: q, $options: 'i' } } : {}).sort({ createdAt: 1 });
export const get = (id) => Evidence.findById(id);
