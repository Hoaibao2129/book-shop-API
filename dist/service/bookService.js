"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var booksModel_1 = __importDefault(require("../models/booksModel"));
var importHistoryModel_1 = __importDefault(require("../models/importHistoryModel"));
var qrcode_1 = __importDefault(require("qrcode"));
var BookService = /** @class */ (function () {
    function BookService() {
    }
    BookService.prototype.insertBook = function (req, res) {
        var data = req.body;
        var newBook = new booksModel_1.default({
            name: data.name,
            author: data.author,
            price: data.price,
            quantity: data.quantity,
            qr: ""
        });
        newBook.save().then(function (response) {
            var dataUpdate = response;
            qrcode_1.default.toDataURL(String(dataUpdate._id).slice(0, 24)).then(function (url) {
                dataUpdate.qr = url;
                booksModel_1.default.updateOne({ _id: dataUpdate._id }, dataUpdate).then(function (responseUpdate) {
                    if (responseUpdate.acknowledged) {
                        res.status(200).json(dataUpdate);
                    }
                });
            });
        });
    };
    BookService.prototype.getAllBook = function (req, res) {
        booksModel_1.default.find({}).then(function (response) {
            res.status(200).json(response);
        });
    };
    BookService.prototype.getBookById = function (req, res) {
        var _id = req.params.id;
        booksModel_1.default.find({ _id: _id }).then(function (response) {
            res.status(200).json(response);
        });
    };
    BookService.prototype.updateBooks = function (req, res) {
        var data = req.body;
        booksModel_1.default.find({ _id: data._id }).then(function (response) {
            if (response.length == 1) {
                var dataUpdate = {
                    name: data.name,
                    author: data.author,
                    quantity: data.quantity,
                    price: data.price,
                };
                booksModel_1.default.updateOne({ _id: data._id }, dataUpdate).then(function (response) {
                    if (response.acknowledged) {
                        res.status(200).json("Cập nhật thành công thông tin sách");
                    }
                });
            }
        });
    };
    BookService.prototype.deleteBooks = function (req, res) {
        var _id = req.params.id;
        booksModel_1.default.deleteOne({ _id: _id }).then(function (response) {
            if (response.acknowledged) {
                res.status(200).json("Xoá thành công thông tin sách");
            }
        });
    };
    BookService.prototype.importBook = function (req, res) {
        var data = req.body;
        booksModel_1.default.find({ _id: data.id }).then(function (response) {
            if (response.length > 0) {
                var dataUpdate_1 = response[0];
                var quantityUpdate = Number(dataUpdate_1.quantity) + Number(data.quantity);
                dataUpdate_1.quantity = String(quantityUpdate);
                booksModel_1.default.updateOne({ _id: data.id }, dataUpdate_1).then(function (responseUpdate) {
                    if (responseUpdate.acknowledged) {
                        var dataImportHistory = new importHistoryModel_1.default({
                            bookName: dataUpdate_1.name,
                            quantity: data.quantity,
                        });
                        dataImportHistory.save().then(function (responseImportHistory) {
                            res.status(200).json("Nhập sách thành công");
                        });
                    }
                });
            }
        });
    };
    BookService.prototype.filterBook = function (req, res) {
        var data = req.query.name;
        var pipeList = [];
        pipeList.push({
            $match: {
                "$or": [
                    { "name": { '$regex': data, '$options': 'i' } },
                ]
            }
        });
        console.log("pipeList " + JSON.stringify(pipeList));
        booksModel_1.default.aggregate(pipeList).then(function (response) {
            res.status(200).json(response);
        });
    };
    return BookService;
}());
exports.default = BookService;
