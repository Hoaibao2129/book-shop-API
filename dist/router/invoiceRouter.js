"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var invoiceService_1 = __importDefault(require("../service/invoiceService"));
var router = express_1.default.Router();
router.post('/', function (req, res) {
    var invoiceService = new invoiceService_1.default();
    invoiceService.inserInvoice(req, res);
});
router.get("/", function (req, res) {
    var invoiceService = new invoiceService_1.default();
    invoiceService.getAllInvoice(req, res);
});
router.get("/invoiceDay", function (req, res) {
    var invoiceService = new invoiceService_1.default();
    invoiceService.getInvoiceToday(req, res);
});
router.delete("/invoiceDay", function (req, res) {
    var invoiceService = new invoiceService_1.default();
    ;
    invoiceService.deleteInvoiceDay(req, res);
});
router.get("/invoiceWasDelete", function (req, res) {
    var invoiceService = new invoiceService_1.default();
    invoiceService.getAllInvoiceWasDelete(req, res);
});
exports.default = router;
