import Report from '../models/Report.js';
import ReportTemplate from '../models/ReportTemplate.js';
import { createReport } from '../generators/report.generator.js';
export const list = (owner) => Report.find({ owner }).sort({ createdAt: -1 });
export const get = (owner, id) => Report.findOne({ _id: id, owner });
export const templates = () => ReportTemplate.find().sort({ name: 1 });
export { createReport };
