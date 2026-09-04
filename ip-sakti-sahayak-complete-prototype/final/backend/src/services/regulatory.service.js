import RegulatoryRecord from '../models/RegulatoryRecord.js';
export const list = () => RegulatoryRecord.find().sort({ updatedAt: -1 });
export const get = (id) => RegulatoryRecord.findById(id);
