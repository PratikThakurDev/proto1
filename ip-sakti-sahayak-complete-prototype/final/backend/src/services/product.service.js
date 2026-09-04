import Product from '../models/Product.js';
export const listProducts = (owner) => Product.find({ owner }).sort({ updatedAt: -1 });
export const getProduct = (owner, id) => Product.findOne({ _id: id, owner });
export const createProduct = (owner, data) => Product.create({ owner, ...data });
export const updateProduct = (owner, id, data) => Product.findOneAndUpdate({ _id: id, owner }, data, { new: true });
export const deleteProduct = (owner, id) => Product.findOneAndDelete({ _id: id, owner });
