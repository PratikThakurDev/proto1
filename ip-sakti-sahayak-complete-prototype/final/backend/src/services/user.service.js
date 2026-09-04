import User from '../models/User.js';
export const getMe = (id) => User.findById(id).select('-password');
export async function updateMe(id, data) { return User.findByIdAndUpdate(id, { $set: data }, { new: true }).select('-password'); }
