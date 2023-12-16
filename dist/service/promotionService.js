"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var promotionModel_1 = __importDefault(require("../models/promotionModel"));
var PromotionService = /** @class */ (function () {
    function PromotionService() {
    }
    PromotionService.prototype.insertPromotion = function (req, res) {
        var data = req.body;
        var newPromotion = new promotionModel_1.default({
            totalPayment: data.totalPayment,
            discount: data.discount,
        });
        newPromotion.save().then(function (response) {
            res.status(200).json(response);
        });
    };
    PromotionService.prototype.getAllPromotion = function (req, res) {
        promotionModel_1.default.find({}).then(function (response) {
            response.sort(function (a, b) { return a.discount - b.discount; });
            res.status(200).json(response);
        });
    };
    PromotionService.prototype.updatePromotion = function (req, res) {
        var data = req.body;
        promotionModel_1.default.find({ _id: data._id }).then(function (response) {
            if (response.length == 1) {
                var dataUpdate = response[0];
                dataUpdate.totalPayment = data.totalPayment;
                dataUpdate.discount = data.discount;
                promotionModel_1.default.updateOne({ _id: data._id }, dataUpdate).then(function (responseUpdate) {
                    if (responseUpdate.acknowledged) {
                        res.status(200).json("Cập nhật thành công thông tin khuyến mãi");
                    }
                });
            }
        });
    };
    PromotionService.prototype.deletePromotion = function (req, res) {
        var _id = req.params.id;
        promotionModel_1.default.deleteOne({ _id: _id }).then(function (response) {
            if (response.acknowledged) {
                res.status(200).json("Xoá thành công khuyến mãi");
            }
        });
    };
    return PromotionService;
}());
exports.default = PromotionService;
