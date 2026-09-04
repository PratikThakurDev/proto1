import User from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { signToken } from '../utils/jwt.js';

export async function register({ name, email, password, preferredLanguage = 'en' }) {
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) throw Object.assign(new Error('Email is already registered'), { status: 409 });
  const user = await User.create({ name, email, password: await hashPassword(password), preferredLanguage });
  return { user: { id: user._id, name: user.name, email: user.email, preferredLanguage: user.preferredLanguage }, token: signToken({ id: user._id.toString(), email: user.email, role: user.role }) };
}
export async function login({ email, password }) {
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user || !(await comparePassword(password, user.password))) throw Object.assign(new Error('Invalid email or password'), { status: 401 });
  return { user: { id: user._id, name: user.name, email: user.email, preferredLanguage: user.preferredLanguage }, token: signToken({ id: user._id.toString(), email: user.email, role: user.role }) };
}
