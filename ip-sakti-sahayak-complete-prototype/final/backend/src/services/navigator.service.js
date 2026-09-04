import IPRecord from '../models/IPRecord.js';
export const list = () => IPRecord.find().sort({ updatedAt: -1 });
export const get = (id) => IPRecord.findById(id);
