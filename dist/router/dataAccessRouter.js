"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dataAccessService_1 = __importDefault(require("../service/dataAccessService"));
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.get("/", function (req, res) {
    var dataAccessService = new dataAccessService_1.default();
    dataAccessService.getAllDataAccess(req, res);
});
exports.default = router;
