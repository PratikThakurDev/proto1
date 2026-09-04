import mongoose from 'mongoose';
const schema = new mongoose.Schema({ title: String, authority: String, category: String, jurisdiction: String, status: String, requirements: [String], source: String, effectiveDate: String }, { timestamps: true });
export default mongoose.model('RegulatoryRecord', schema);
