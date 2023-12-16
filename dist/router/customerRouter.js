"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var customerService_1 = __importDefault(require("../service/customerService"));
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.post('/', function (req, res) {
    var customerService = new customerService_1.default();
    customerService.insertCustomer(req, res);
});
router.get("/", function (req, res) {
    var customerService = new customerService_1.default();
    customerService.getAllCustomer(req, res);
});
router.get("/topCustomer", function (req, res) {
    var customerService = new customerService_1.default();
    customerService.getTopCustomer(req, res);
});
router.get("/:tel", function (req, res) {
    var customerService = new customerService_1.default();
    customerService.getCustomerByTel(req, res);
});
router.put("/", function (req, res) {
    var customerService = new customerService_1.default();
    customerService.updateCustomer(req, res);
});
router.delete("/", function (req, res) {
    var customerService = new customerService_1.default();
    customerService.deleteCustomer(req, res);
});
exports.default = router;
