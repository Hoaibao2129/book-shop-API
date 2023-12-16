"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require('moment');
var booksModel_1 = __importDefault(require("../models/booksModel"));
var customerModel_1 = __importDefault(require("../models/customerModel"));
var invoiceModels_1 = __importDefault(require("../models/invoiceModels"));
var RevenueService = /** @class */ (function () {
    function RevenueService() {
    }
    RevenueService.prototype.getRevenueDay = function (req, res) {
        var today = moment();
        var fromDate = today.clone().startOf('day').utc().toDate();
        var toDate = today.clone().endOf('day').utc().toDate();
        var pipeList = [];
        pipeList.push({
            $match: {
                createdAt: {
                    $gte: fromDate,
                    $lt: toDate
                }
            }
        }, {
            $match: {
                delete: false
            }
        });
        console.log("pipeList " + JSON.stringify(pipeList));
        invoiceModels_1.default.aggregate(pipeList).then(function (response) {
            var revenue = 0;
            response.map(function (val) {
                revenue += val.totalPrice;
            });
            res.status(200).json(revenue);
        });
    };
    RevenueService.prototype.getRevenueMonth = function (req, res) {
        var today = moment();
        var fromDate = today.clone().startOf('month').utc().toDate();
        var toDate = today.clone().endOf('month').utc().toDate();
        var pipeList = [];
        pipeList.push({
            $match: {
                createdAt: {
                    $gte: fromDate,
                    $lt: toDate
                }
            }
        }, {
            $match: {
                delete: false
            }
        });
        console.log("pipeList " + JSON.stringify(pipeList));
        invoiceModels_1.default.aggregate(pipeList).then(function (response) {
            var revenue = 0;
            response.map(function (val) {
                revenue += val.totalPrice;
            });
            res.status(200).json(revenue);
        });
    };
    RevenueService.prototype.getRevenueFilterDate = function (req, res) {
        var data = req.query;
        var fromDate = moment(data.fromDate, "DD-MM-YYYY").utc();
        var toDate = moment(data.toDate, "DD-MM-YYYY").utc();
        var modifiedFromDate = fromDate.add(1, 'day').startOf('day').toDate();
        var modifiedToDate = toDate.add(1, 'day').endOf('day').toDate();
        var pipeList = [];
        pipeList.push({
            $match: {
                createdAt: {
                    $gte: modifiedFromDate,
                    $lt: modifiedToDate
                }
            }
        }, {
            $match: {
                delete: false
            }
        });
        console.log("pipeList " + JSON.stringify(pipeList));
        invoiceModels_1.default.aggregate(pipeList).then(function (response) {
            var revenue = 0;
            var totalQuantityBook = 0;
            response.map(function (val) {
                revenue += val.totalPrice;
                totalQuantityBook += val.totalQuantityBook;
            });
            var dataResponse = {
                revenue: revenue,
                totalQuantityBook: totalQuantityBook
            };
            res.status(200).json(dataResponse);
        }).catch(function (err) {
            res.status(500).json("500 Internal Server Error");
        });
    };
    RevenueService.prototype.getRenevueBook = function (req, res) {
        booksModel_1.default.find({}).then(function (response) {
            var revenueBooks = 0;
            response.map(function (val) {
                revenueBooks += Number(val.quantity);
            });
            res.status(200).json(revenueBooks);
        }).catch(function (err) {
            res.status(500).json("500 Internal Server Error");
        });
    };
    RevenueService.prototype.getRevenueCustomer = function (req, res) {
        customerModel_1.default.find({}).then(function (response) {
            var revenueCustomer = response.length;
            res.status(200).json(revenueCustomer);
        }).catch(function (err) {
            res.status(500).json("500 Internal Server Error");
        });
    };
    return RevenueService;
}());
exports.default = RevenueService;
