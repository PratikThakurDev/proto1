import * as service from '../services/analysis.service.js'; import { ok, fail } from '../utils/apiResponse.js'; import { validateAnalysis } from '../validators/analysis.validator.js';
export async function create(req,res,next){try{const e=validateAnalysis(req.body);if(e.length)return fail(res,'Validation failed',422,e);return ok(res,await service.analyze({owner:req.user.id,productId:req.body.productId,input:req.body.input||req.body}),'Analysis completed',201)}catch(e){next(e)}}
export async function list(req,res,next){try{return ok(res,await service.listAnalyses(req.user.id))}catch(e){next(e)}}
export async function get(req,res,next){try{const x=await service.getAnalysis(req.user.id,req.params.id);return x?ok(res,x):fail(res,'Analysis not found',404)}catch(e){next(e)}}
