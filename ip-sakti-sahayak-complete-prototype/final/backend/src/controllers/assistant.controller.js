import * as service from '../services/assistant.service.js'; import { ok, fail } from '../utils/apiResponse.js';
export async function ask(req,res,next){try{if(!req.body.message)return fail(res,'message is required',422);return ok(res,await service.ask(req.body))}catch(e){next(e)}}
