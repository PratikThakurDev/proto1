import TKABSRecord from '../models/TKABSRecord.js';
export const list = () => TKABSRecord.find().sort({ updatedAt: -1 });
export const get = (id) => TKABSRecord.findById(id);
