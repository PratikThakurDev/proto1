import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, default: 'completed' },
  input: mongoose.Schema.Types.Mixed,
  classification: mongoose.Schema.Types.Mixed,
  ip: mongoose.Schema.Types.Mixed,
  regulatory: mongoose.Schema.Types.Mixed,
  tkAbs: mongoose.Schema.Types.Mixed,
  markets: mongoose.Schema.Types.Mixed,
  evidence: [mongoose.Schema.Types.Mixed],
  recommendations: [String],
  confidence: { type: Number, default: 0.86 }
}, { timestamps: true });
export default mongoose.model('ProductAnalysis', schema);
