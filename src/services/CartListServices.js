const CartModel = require("../models/CartModel");

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const CartListService = async (req) => {
    try {
        let user_id = new ObjectId(req.headers.user_id);
        let MatchStage = {$match: {userID: user_id}};

        let JoinProductStage = {$lookup: {from: "products", localField: "productID", foreignField: "_id", as: "product"}};
        let UnwindProductStage = {$unwind: "$product"};

        let JoinBrandStage = {$lookup: {from: "brands", localField: "product.brandID", foreignField: "_id", as: "brand"}};
        let UnwindBrandStage = {$unwind: "$brand"};

        let JoinCategoryStage = {$lookup: {from: "categories", localField: "product.categoryID", foreignField: "_id", as: "category"}};
        let UnwindCategoryStage = {$unwind: "$category"};

        let ProjectionStage = {
            $project: {
                "_id": 0, "userID": 0, "createdAt": 0, "updatedAt": 0, "product._id": 0,
                "product.categoryID": 0, "product.brandID": 0, "brand._id": 0, "category._id": 0,
            }
        };

        let data = await CartModel.aggregate([
            MatchStage,
            JoinProductStage,
            UnwindProductStage,
            JoinBrandStage,
            UnwindBrandStage,
            JoinCategoryStage,
            UnwindCategoryStage,
            ProjectionStage
        ]);

        return {status: "success", data: data};
    } catch (e) {
        return {status: "fail", message: "Something Went Wrong!"};
    }
};


const SaveCartListService = async (req) => {
    try {
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userId = user_id;

        await CartModel.create(reqBody);

        return {status: "success", message: "Cart List Create Success"};
    } catch (e) {
        return {status: "fail", message: "Something Went Wrong!"};
    }
};

const UpdateCartListService = async (req) => {
    try {
        let user_id = req.headers.user_id;
        let cartID = req.params.cartID;
        let reqBody = req.body;

        await CartModel.updateOne({_id: cartID, userID: user_id}, {$set: reqBody});

        return {status: "success", message: "Cart List Update Success"};
    } catch (e) {
        return {status: "fail", message: "Something Went Wrong!"};
    }
};

const RemoveCartListService = async (req) => {
    try {
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userId = user_id;

        await CartModel.deleteOne(reqBody);

        return {status: "success", message: "Cart List Remove Success"};
    } catch (e) {
        return {status: "fail", message: "Something Went Wrong!"};
    }
};

module.exports = {
    CartListService,
    SaveCartListService,
    UpdateCartListService,
    RemoveCartListService
};
