import mongoose from 'mongoose';
const schema = new mongoose.Schema({ country: { type: String, unique: true }, opportunity: String, regulatoryDifficulty: String, ipImportance: String, labelingComplexity: String, launchTime: String, readinessScore: Number, requirements: [String] }, { timestamps: true });
export default mongoose.model('MarketRecord', schema);
