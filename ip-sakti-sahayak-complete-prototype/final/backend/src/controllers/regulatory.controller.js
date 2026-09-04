import * as service from '../services/regulatory.service.js'; import { ok, fail } from '../utils/apiResponse.js';
export async function list(req,res,next){try{return ok(res,await service.list())}catch(e){next(e)}}
export async function get(req,res,next){try{const x=await service.get(req.params.id);return x?ok(res,x):fail(res,'Record not found',404)}catch(e){next(e)}}
