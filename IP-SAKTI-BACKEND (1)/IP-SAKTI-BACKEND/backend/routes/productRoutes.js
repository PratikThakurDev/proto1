import { Router } from "express";
import {
  createProduct,
  listProducts,
  getProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.use(protect);
router.route("/").get(listProducts).post(createProduct);
router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct);

export default router;
