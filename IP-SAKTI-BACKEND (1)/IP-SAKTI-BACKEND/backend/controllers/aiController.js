import Product from "../models/Product.js";
import Passport from "../models/Passport.js";
import { ragSearch, ragAssess, ragPassport, ragChat } from "../services/ragClient.js";

function productPayload(product) {
  return {
    name: product.name,
    description: product.description,
    ingredients: product.ingredients,
    intended_use: product.intendedUse,
    traditional_knowledge: product.traditionalKnowledge,
    target_market: product.targetMarket,
    development_stage: product.developmentStage,
    jurisdiction: product.jurisdiction
  };
}

async function findOwnedProduct(req, id) {
  if (!id) return null;
  return Product.findOne({ _id: id, user: req.user._id });
}

export async function search(req, res) {
  const { question, product = {}, jurisdiction = "India", top_k = 5 } = req.body;

  if (!question?.trim()) {
    return res.status(400).json({ message: "question is required" });
  }

  const data = await ragSearch({
    question,
    product,
    jurisdiction,
    top_k
  });

  res.json(data);
}

export async function assess(req, res) {
  const { productId, ...input } = req.body;

  const product = await findOwnedProduct(req, productId);
  const productInput = product ? productPayload(product) : input;

  const data = await ragAssess(productInput);

  res.json({
    ...data,
    productId: product?._id || null
  });
}

export async function generatePassport(req, res) {
  const { productId, ...input } = req.body;

  const product = await findOwnedProduct(req, productId);

  if (!product && !input.name) {
    return res.status(400).json({ message: "productId or product name is required" });
  }

  const productInput = product ? productPayload(product) : input;
  const ragResult = await ragPassport(productInput);

  const passport = await Passport.create({
    user: req.user._id,
    product: product?._id || null,
    productName: ragResult.product_name || productInput.name,
    category: ragResult.category,
    reason: ragResult.reason,
    confidence: ragResult.confidence || "unknown",
    jurisdiction: productInput.jurisdiction || "India",
    inputSnapshot: productInput,
    evidence: ragResult.evidence || ragResult.sources || [],
    rawRagResponse: ragResult
  });

  if (product) {
    product.latestPassport = passport._id;
    await product.save();
  }

  res.status(201).json({
    passport,
    rag: ragResult
  });
}

export async function chat(req, res) {
  const { question, productId, product = {}, jurisdiction = "India", top_k = 5 } = req.body;

  if (!question?.trim()) {
    return res.status(400).json({ message: "question is required" });
  }

  const ownedProduct = await findOwnedProduct(req, productId);
  const productData = ownedProduct ? productPayload(ownedProduct) : product;

  const data = await ragChat({
    question,
    product: productData,
    jurisdiction,
    top_k
  });

  res.json(data);
}

export async function listPassports(req, res) {
  const passports = await Passport.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .populate("product", "name");

  res.json({ count: passports.length, passports });
}

export async function getPassport(req, res) {
  const passport = await Passport.findOne({
    _id: req.params.id,
    user: req.user._id
  }).populate("product");

  if (!passport) {
    return res.status(404).json({ message: "Passport not found" });
  }

  res.json({ passport });
}
