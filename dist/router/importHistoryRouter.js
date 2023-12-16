"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var importHistoryService_1 = __importDefault(require("../service/importHistoryService"));
var router = express_1.default.Router();
router.get("/", function (req, res) {
    var importHistoryService = new importHistoryService_1.default();
    importHistoryService.getAllImportHistory(req, res);
});
exports.default = router;
