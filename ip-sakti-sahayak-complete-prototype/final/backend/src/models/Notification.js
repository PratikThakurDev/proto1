import mongoose from 'mongoose';
const schema = new mongoose.Schema({ owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, title: String, message: String, read: { type: Boolean, default: false }, type: String }, { timestamps: true });
export default mongoose.model('Notification', schema);
