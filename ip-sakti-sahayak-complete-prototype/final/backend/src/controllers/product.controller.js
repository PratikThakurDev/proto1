import * as service from '../services/product.service.js'; import { ok, fail } from '../utils/apiResponse.js'; import { validateProduct } from '../validators/product.validator.js';
export async function list(req,res,next){try{return ok(res,await service.listProducts(req.user.id))}catch(e){next(e)}}
export async function get(req,res,next){try{const x=await service.getProduct(req.user.id,req.params.id);return x?ok(res,x):fail(res,'Product not found',404)}catch(e){next(e)}}
export async function create(req,res,next){try{const e=validateProduct(req.body);if(e.length)return fail(res,'Validation failed',422,e);return ok(res,await service.createProduct(req.user.id,req.body),'Product created',201)}catch(e){next(e)}}
export async function update(req,res,next){try{return ok(res,await service.updateProduct(req.user.id,req.params.id,req.body),'Product updated')}catch(e){next(e)}}
export async function remove(req,res,next){try{return ok(res,await service.deleteProduct(req.user.id,req.params.id),'Product deleted')}catch(e){next(e)}}
