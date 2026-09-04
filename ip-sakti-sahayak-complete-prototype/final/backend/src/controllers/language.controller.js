import * as service from '../services/language.service.js'; import { ok, fail } from '../utils/apiResponse.js'; import { validateTranslation } from '../validators/language.validator.js';
export function getLanguages(req,res){return ok(res,service.languages())}
export async function translate(req,res,next){try{const e=validateTranslation(req.body);if(e.length)return fail(res,'Validation failed',422,e);return ok(res,await service.translate(req.body))}catch(e){next(e)}}
export async function detect(req,res,next){try{if(!req.body.text)return fail(res,'text is required',422);return ok(res,await service.detectLanguage(req.body.text))}catch(e){next(e)}}
