import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  analysis: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductAnalysis' },
  name: String,
  type: String,
  generatedOn: String,
  status: { type: String, default: 'Draft' },
  confidence: String,
  score: Number,
  content: mongoose.Schema.Types.Mixed,
  pdfPath: String
}, { timestamps: true });
export default mongoose.model('Report', schema);
