import Product from '../models/Product.js';
import ProductAnalysis from '../models/ProductAnalysis.js';
import Evidence from '../models/Evidence.js';
import { ragAnalyze } from '../rag-client/rag.client.js';

export async function analyze({ owner, productId, input = {} }) {
  let product = productId ? await Product.findOne({ _id: productId, owner }) : null;
  if (!product && input.name) product = await Product.create({ owner, name: input.name, category: input.category || 'Ayurvedic Medicine', stage: input.stage || 'Research', status: 'Analyzed', ingredients: input.ingredients || [], intendedUse: input.intendedUse || '', markets: input.markets || [] });
  if (!product) throw Object.assign(new Error('Product not found'), { status: 404 });
  const ragInput = { name: product.name, description: input.description || '', intendedUse: product.intendedUse || input.intendedUse || '', ingredients: product.ingredients || input.ingredients || [], formulation: input.formulation || input.formulationType || '', stage: product.stage, markets: product.markets || input.markets || [], answers: input.answers || {} };
  let result;
  try { result = await ragAnalyze(ragInput); }
  catch (err) {
    result = { classification:{category:product.category||'Ayurvedic Medicine',confidence:0.5,signals:['RAG service unavailable; fallback used']}, ip:{score:60,risk:'Medium',findings:['Start patent novelty review']}, regulatory:{score:60,risk:'Review Required',requirements:['Confirm product classification']}, tkAbs:{score:55,risk:'Review Required',requirements:['Assess TK/ABS relevance']}, markets:{India:70,USA:60,UK:55,Japan:45}, evidence:await Evidence.find().limit(5).lean(), recommendations:['Start the RAG service for evidence-backed analysis'] };
  }
  return ProductAnalysis.create({ product: product._id, owner, input, ...result, status:'completed', confidence:result.classification?.confidence || 0.5 });
}
export async function listAnalyses(owner){ return ProductAnalysis.find({owner}).populate('product').sort({createdAt:-1}); }
export async function getAnalysis(owner,id){ return ProductAnalysis.findOne({_id:id,owner}).populate('product'); }
