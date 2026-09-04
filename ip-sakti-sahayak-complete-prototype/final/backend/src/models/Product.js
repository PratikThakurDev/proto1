import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  category: String,
  stage: String,
  status: String,
  description: String,
  ingredients: [String],
  formulation: String,
  intendedUse: String,
  markets: [String],
  updatedLabel: String
}, { timestamps: true });
export default mongoose.model('Product', productSchema);
