import mongoose from 'mongoose';
const schema = new mongoose.Schema({ name: String, description: String, type: String }, { timestamps: true });
export default mongoose.model('ReportTemplate', schema);
