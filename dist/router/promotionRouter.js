"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var promotionService_1 = __importDefault(require("../service/promotionService"));
var router = express_1.default.Router();
router.get("/", function (req, res) {
    var promotionService = new promotionService_1.default();
    promotionService.getAllPromotion(req, res);
});
router.post("/", function (req, res) {
    var promotionService = new promotionService_1.default();
    promotionService.insertPromotion(req, res);
});
router.put("/", function (req, res) {
    var promotionService = new promotionService_1.default();
    promotionService.updatePromotion(req, res);
});
router.delete("/:id", function (req, res) {
    var promotionService = new promotionService_1.default();
    promotionService.deletePromotion(req, res);
});
exports.default = router;
