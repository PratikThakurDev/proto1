import { verifyToken } from '../utils/jwt.js';
export function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ success: false, message: 'Authentication required' });
    req.user = verifyToken(token);
    next();
  } catch { return res.status(401).json({ success: false, message: 'Invalid or expired token' }); }
}
