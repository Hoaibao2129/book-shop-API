"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var importHistoryModel_1 = __importDefault(require("../models/importHistoryModel"));
var ImportHistoryService = /** @class */ (function () {
    function ImportHistoryService() {
    }
    ImportHistoryService.prototype.getAllImportHistory = function (req, res) {
        importHistoryModel_1.default.find({}).then(function (response) {
            res.status(200).json(response);
        });
    };
    return ImportHistoryService;
}());
exports.default = ImportHistoryService;
