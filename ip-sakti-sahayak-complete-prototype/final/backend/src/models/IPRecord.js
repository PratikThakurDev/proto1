import mongoose from 'mongoose';
const schema = new mongoose.Schema({ title: String, type: String, jurisdiction: String, status: String, ownerName: String, reference: String, description: String, source: String }, { timestamps: true });
export default mongoose.model('IPRecord', schema);
