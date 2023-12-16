"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var invoiceModels_1 = __importDefault(require("../models/invoiceModels"));
var booksModel_1 = __importDefault(require("../models/booksModel"));
var customerModel_1 = __importDefault(require("../models/customerModel"));
var staffsModel_1 = __importDefault(require("../models/staffsModel"));
var moment = require('moment');
var InvoiceService = /** @class */ (function () {
    function InvoiceService() {
    }
    InvoiceService.prototype.inserInvoice = function (req, res) {
        var _this = this;
        var dataInvoice = req.body;
        booksModel_1.default.find({}).then(function (responseBook) {
            var dataBook = responseBook;
            var checkWareHouse = true;
            dataInvoice.infoPayment.map(function (valPayment) {
                dataBook.map(function (valBook) {
                    if (valBook._id == valPayment.bookId) {
                        if (Number(valBook.quantity) < valPayment.quantity) {
                            return checkWareHouse = false;
                        }
                    }
                });
            });
            if (checkWareHouse) {
                _this.updateWareHouse(dataInvoice.infoPayment);
                var totalPrice_1 = 0;
                var totalQuantityBook_1 = 0;
                dataInvoice.infoPayment.map(function (valInfoPayment) {
                    totalPrice_1 += Number(valInfoPayment.bookPrice);
                    totalQuantityBook_1 += Number(valInfoPayment.quantity);
                });
                customerModel_1.default.find({ tel: dataInvoice.numberPhone }).then(function (responseCustomer) {
                    var dataCustomerUpdate = responseCustomer[0];
                    if (dataInvoice.use) {
                        dataCustomerUpdate.totalPayment = 0;
                        totalPrice_1 = totalPrice_1 - (totalPrice_1 * (dataInvoice.discount / 100));
                    }
                    if (dataInvoice.numberPhone) {
                        dataCustomerUpdate.totalPayment = Number(dataCustomerUpdate.totalPayment) + Number(totalPrice_1);
                        customerModel_1.default.updateOne({ tel: dataInvoice.numberPhone }, dataCustomerUpdate).then(function (ressponseUpdataCustomer) { });
                    }
                    var dataInsertInvoice = new invoiceModels_1.default({
                        infoPayment: dataInvoice.infoPayment,
                        customerName: dataInvoice.customerName ? dataInvoice.customerName : null,
                        customerID: dataInvoice.customerID ? dataInvoice.customerID : null,
                        numberPhone: dataInvoice.numberPhone ? dataInvoice.numberPhone : null,
                        totalPrice: totalPrice_1,
                        totalQuantityBook: totalQuantityBook_1,
                        discount: dataInvoice.discount ? dataInvoice.discount : 0,
                        delete: false
                    });
                    dataInsertInvoice.save().then(function (response) {
                        res.status(200).json(response);
                    });
                });
            }
            else {
                res.status(200).json("Số lượng sách ở kho không đủ");
            }
        });
    };
    InvoiceService.prototype.getAllInvoice = function (req, res) {
        invoiceModels_1.default.find({ delete: false }).then(function (respose) {
            res.status(200).json(respose);
        });
    };
    InvoiceService.prototype.getInvoiceToday = function (req, res) {
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
            res.status(200).json(response);
        });
    };
    InvoiceService.prototype.deleteInvoiceDay = function (req, res) {
        var data = req.body;
        staffsModel_1.default.find({ _id: data.staffId }).then(function (response) {
            var infoDeleteArr = [];
            var infoDelete = {
                name: response[0].name,
                note: data.note,
            };
            infoDeleteArr.push(infoDelete);
            invoiceModels_1.default.find({ _id: data._id }).then(function (responseInvoice) {
                var dataUpdate = responseInvoice[0];
                dataUpdate.infoPayment.map(function (val) {
                    booksModel_1.default.find({ _id: val.bookId }).then(function (responseBook) {
                        var dataBookUpdate = responseBook[0];
                        var quantity = Number(dataBookUpdate.quantity) + Number(val.quantity);
                        dataBookUpdate.quantity = String(quantity);
                        booksModel_1.default.updateOne({ _id: val.bookId }, dataBookUpdate).then(function () { });
                    });
                });
                dataUpdate.delete = true,
                    dataUpdate.infoDelete = infoDeleteArr;
                invoiceModels_1.default.updateOne({ _id: data._id }, dataUpdate).then(function (response) {
                    res.status(200).json("Xoá thành công đơn hàng");
                });
            });
        });
    };
    InvoiceService.prototype.getAllInvoiceWasDelete = function (req, res) {
        invoiceModels_1.default.find({ delete: true }).then(function (response) {
            res.status(200).json(response);
        });
    };
    InvoiceService.prototype.updateWareHouse = function (infoPayment) {
        infoPayment.map(function (val) {
            booksModel_1.default.find({ _id: val.bookId }).then(function (response) {
                var dataUpdate = response[0];
                var quantity = Number(dataUpdate.quantity) - Number(val.quantity);
                dataUpdate.quantity = quantity;
                booksModel_1.default.updateOne({ _id: val.bookId }, dataUpdate).then(function () { });
            });
        });
    };
    return InvoiceService;
}());
exports.default = InvoiceService;
