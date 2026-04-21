import express from "express";
import { crateReviewForProduct, createProduct, deleteProduct, deleteReview, getAdminProducts, getAllProducts, getProductReviews, getSingleProduct, updateProduct } from "../controller/productController.js";
import { verifyUserAuth, roleBasedAccess } from "../middleware/userAuth.js";
const router=express.Router();

router.route("/products").get(getAllProducts)
router.route("/admin/product/create").post(verifyUserAuth,roleBasedAccess("admin"),createProduct);

router.route("/admin/products")
.get(verifyUserAuth,roleBasedAccess("admin"),getAdminProducts);
router.route("/product/:id")
.get(getSingleProduct);
router.route("/admin/product/:id")
.put(verifyUserAuth,roleBasedAccess("admin"),updateProduct)
.delete(verifyUserAuth,roleBasedAccess("admin"),deleteProduct)
.get(getSingleProduct);

router.route("/review").put(verifyUserAuth,crateReviewForProduct);

router.route("/admin/reviews")
.get(verifyUserAuth,roleBasedAccess("admin"),getProductReviews)
.delete(verifyUserAuth,roleBasedAccess("admin"),deleteReview);

export default router;