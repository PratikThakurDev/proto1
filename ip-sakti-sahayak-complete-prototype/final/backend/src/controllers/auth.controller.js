import { register, login } from '../services/auth.service.js';
import { ok, fail } from '../utils/apiResponse.js';
import { validateRegister, validateLogin } from '../validators/auth.validator.js';
export async function registerController(req,res,next){ try { const e=validateRegister(req.body); if(e.length)return fail(res,'Validation failed',422,e); return ok(res,await register(req.body),'Registered successfully',201); } catch(e){next(e)} }
export async function loginController(req,res,next){ try { const e=validateLogin(req.body); if(e.length)return fail(res,'Validation failed',422,e); return ok(res,await login(req.body),'Login successful'); } catch(e){next(e)} }
export async function logoutController(req,res){ return ok(res,null,'Logout successful'); }
