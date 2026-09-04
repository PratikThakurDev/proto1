import * as service from '../services/report.service.js'; import { ok, fail } from '../utils/apiResponse.js'; import { validateReport } from '../validators/report.validator.js';
export async function list(req,res,next){try{return ok(res,await service.list(req.user.id))}catch(e){next(e)}}
export async function get(req,res,next){try{const x=await service.get(req.user.id,req.params.id);return x?ok(res,x):fail(res,'Report not found',404)}catch(e){next(e)}}
export async function create(req,res,next){try{const e=validateReport(req.body);if(e.length)return fail(res,'Validation failed',422,e);return ok(res,await service.createReport({owner:req.user.id,...req.body}),'Report generated',201)}catch(e){next(e)}}
export async function templates(req,res,next){try{return ok(res,await service.templates())}catch(e){next(e)}}
