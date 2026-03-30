import express from "express";
import { crateReviewForProduct, createProduct, deleteProduct, deleteReview, getAdminProducts, getAllProducts, getProductReviews, getSingleProduct, updateProduct } from "../controller/productController.js";
import { verifyUserAuth, roleBasedAccess } from "../middleware/userAuth.js";
const router=express.Router();

router.route("/products")
.get(getAllProducts)
.post(verifyUserAuth,roleBasedAccess("farmer"),createProduct);

router.route("/admin/products")
.get(verifyUserAuth,roleBasedAccess("admin"),getAdminProducts);

router.route("/product/:id")
.put(verifyUserAuth,roleBasedAccess("farmer"),updateProduct)
.delete(verifyUserAuth,roleBasedAccess("farmer"),deleteProduct)
.get(getSingleProduct);

router.route("/review").put(verifyUserAuth,crateReviewForProduct);

router.route("/reviews")
.get(getProductReviews)
.delete(verifyUserAuth,deleteReview);

export default router;