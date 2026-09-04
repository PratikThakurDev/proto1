import mongoose from 'mongoose';
const schema = new mongoose.Schema({ title: String, resource: String, knowledgeType: String, status: String, jurisdiction: String, requirements: [String], source: String }, { timestamps: true });
export default mongoose.model('TKABSRecord', schema);
