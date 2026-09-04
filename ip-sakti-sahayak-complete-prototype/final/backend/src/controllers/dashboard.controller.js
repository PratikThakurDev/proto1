import { overview } from '../services/dashboard.service.js'; import { ok } from '../utils/apiResponse.js';
export async function getOverview(req,res,next){try{return ok(res,await overview(req.user.id))}catch(e){next(e)}}
