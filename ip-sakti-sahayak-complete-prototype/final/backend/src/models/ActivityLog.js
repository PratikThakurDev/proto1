import mongoose from 'mongoose';
const schema = new mongoose.Schema({ owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, action: String, entityType: String, entityId: String, metadata: mongoose.Schema.Types.Mixed }, { timestamps: true });
export default mongoose.model('ActivityLog', schema);
