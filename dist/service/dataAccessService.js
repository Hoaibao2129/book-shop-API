"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dataAccessModel_1 = __importDefault(require("../models/dataAccessModel"));
var DataAccessService = /** @class */ (function () {
    function DataAccessService() {
    }
    DataAccessService.prototype.getAllDataAccess = function (req, res) {
        dataAccessModel_1.default.find({}).then(function (response) {
            res.status(200).json(response);
        });
    };
    return DataAccessService;
}());
exports.default = DataAccessService;
