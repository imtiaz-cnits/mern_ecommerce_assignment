const express = require("express");
const ProductController = require("../controllers/ProductController");
const UserController = require("../controllers/UserController");
const WishListController = require("../controllers/WishListController");
const CartListController = require("../controllers/CartListController");
const AuthVerification = require("../middlewares/AuthVerification");

const router = express.Router();

// Product
router.get("/ProductBrandList", ProductController.ProductBrandList);
router.get("/ProductCategoryList", ProductController.ProductCategoryList);
router.get("/ProductSliderList", ProductController.ProductSliderList);
router.get("/ProductListByBrand/:BrandID", ProductController.ProductListByBrand);
router.get("/ProductListByCategory/:CategoryID", ProductController.ProductListByCategory);
router.get("/ProductListBySimilar/:CategoryID", ProductController.ProductListBySimilar);
router.get("/ProductListByKeyword/:Keyword", ProductController.ProductListByKeyword);
router.get("/ProductListByRemark/:Remark", ProductController.ProductListByRemark);
router.get("/ProductDetails/:ProductID", ProductController.ProductDetails);
router.get("/ProductReviewList/:ProductID", ProductController.ProductReviewList);


// User
router.get("/UserOTP/:email", UserController.UserOTP);
router.get("/VerifyOTP/:email/:otp", UserController.VerifyOTP);
router.get("/UserLogout", AuthVerification, UserController.UserLogout);
router.post("/CreateProfile", AuthVerification, UserController.CreateProfile);
router.post("/UpdateProfile", AuthVerification, UserController.UpdateProfile);
router.get("/ReadProfile", AuthVerification, UserController.ReadProfile);

// Wish
router.get("/WishList", AuthVerification, WishListController.WishList);
router.post("/SaveWishList", AuthVerification, WishListController.SaveWishList);
router.post("/RemoveWishList", AuthVerification, WishListController.RemoveWishList);

// Cart
router.get("/CartList", AuthVerification, CartListController.CartList);
router.post("/SaveCartList", AuthVerification, CartListController.SaveCartList);
router.post("/UpdateCartList/:cartID", AuthVerification, CartListController.UpdateCartList);
router.post("/RemoveCartList", AuthVerification, CartListController.RemoveCartList);

module.exports = router;