import * as service from '../services/evidence.service.js'; import { ok, fail } from '../utils/apiResponse.js';
export async function list(req,res,next){try{return ok(res,await service.list(req.query.q||''))}catch(e){next(e)}}
export async function get(req,res,next){try{const x=await service.get(req.params.id);return x?ok(res,x):fail(res,'Evidence not found',404)}catch(e){next(e)}}
