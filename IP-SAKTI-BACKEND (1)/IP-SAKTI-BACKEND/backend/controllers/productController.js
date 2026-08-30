import Product from "../models/Product.js";

export async function createProduct(req, res) {
  const product = await Product.create({
    user: req.user._id,
    ...req.body
  });

  res.status(201).json({ product });
}

export async function listProducts(req, res) {
  const products = await Product.find({ user: req.user._id })
    .sort({ updatedAt: -1 })
    .populate("latestPassport");

  res.json({ count: products.length, products });
}

export async function getProduct(req, res) {
  const product = await Product.findOne({
    _id: req.params.id,
    user: req.user._id
  }).populate("latestPassport");

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json({ product });
}

export async function updateProduct(req, res) {
  const product = await Product.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { $set: req.body },
    { new: true, runValidators: true }
  );

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json({ product });
}

export async function deleteProduct(req, res) {
  const product = await Product.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id
  });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json({ message: "Product deleted" });
}
