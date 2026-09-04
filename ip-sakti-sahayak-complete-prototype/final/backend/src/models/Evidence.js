import mongoose from 'mongoose';
const schema = new mongoose.Schema({ title: { type: String, required: true }, type: String, relevance: String, language: String, category: String, description: String, sourceUrl: String }, { timestamps: true });
export default mongoose.model('Evidence', schema);
