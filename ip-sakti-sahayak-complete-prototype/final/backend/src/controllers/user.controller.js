import * as service from '../services/user.service.js'; import { ok } from '../utils/apiResponse.js';
export async function me(req,res,next){try{return ok(res,await service.getMe(req.user.id))}catch(e){next(e)}}
export async function update(req,res,next){try{return ok(res,await service.updateMe(req.user.id,req.body),'Profile updated')}catch(e){next(e)}}
