"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var revenueService_1 = __importDefault(require("../service/revenueService"));
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.get("/revenueDay", function (req, res) {
    var revenueService = new revenueService_1.default();
    revenueService.getRevenueDay(req, res);
});
router.get("/revenueMonth", function (req, res) {
    var revenueService = new revenueService_1.default();
    revenueService.getRevenueMonth(req, res);
});
router.get("/filterDate", function (req, res) {
    var revenueService = new revenueService_1.default();
    revenueService.getRevenueFilterDate(req, res);
});
router.get("/revenueCustomers", function (req, res) {
    var revenueService = new revenueService_1.default();
    revenueService.getRevenueCustomer(req, res);
});
router.get("/revenueBooks", function (req, res) {
    var revenueService = new revenueService_1.default();
    revenueService.getRenevueBook(req, res);
});
exports.default = router;
