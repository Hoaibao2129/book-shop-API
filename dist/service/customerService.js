"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var customerModel_1 = __importDefault(require("../models/customerModel"));
var CustomerService = /** @class */ (function () {
    function CustomerService() {
    }
    CustomerService.prototype.insertCustomer = function (req, res) {
        var data = req.body;
        customerModel_1.default.find({ tel: data.tel }).then(function (responeCustomer) {
            if (responeCustomer.length === 0) {
                var newCustomer = new customerModel_1.default({
                    name: data.name,
                    addreess: data.address,
                    birthday: data.birthday,
                    tel: data.tel,
                    totalPayment: 0,
                });
                newCustomer.save().then(function (response) {
                    res.status(200).json(response);
                });
            }
            else {
                res.status(200).json("Số điện thoại đã tồn tại");
            }
        });
    };
    CustomerService.prototype.getAllCustomer = function (req, res) {
        customerModel_1.default.find({}).then(function (response) {
            res.status(200).json(response);
        });
    };
    CustomerService.prototype.getCustomerByTel = function (req, res) {
        var tel = req.params.tel;
        customerModel_1.default.find({ tel: tel }).then(function (response) {
            res.status(200).json(response);
        });
    };
    CustomerService.prototype.updateCustomer = function (req, res) {
        var data = req.body;
        customerModel_1.default.find({ _id: data._id }).then(function (response) {
            if (response.length === 1) {
                var dataUpdate = response[0];
                dataUpdate.name = data.name,
                    dataUpdate.birthday = data.birthday,
                    dataUpdate.addreess = data.addreess,
                    dataUpdate.tel = data.tel,
                    customerModel_1.default.updateOne({ _id: data._id }, dataUpdate).then(function (responseUpdate) {
                        if (responseUpdate.acknowledged) {
                            res.status(200).json("Cập nhật thành công thông tin khách hàng");
                        }
                    });
            }
        });
    };
    CustomerService.prototype.deleteCustomer = function (req, res) {
        var _id = req.body._id;
        customerModel_1.default.deleteOne({ _id: _id }).then(function (response) {
            res.status(200).json("Xoá thành công khách hàng");
        });
    };
    CustomerService.prototype.getTopCustomer = function (req, res) {
        customerModel_1.default.find({}).then(function (response) {
            var dataCustomer = response;
            dataCustomer.sort(function (a, b) { return b.totalPayment - a.totalPayment; });
            if (dataCustomer.length <= 5) {
                res.status(200).json(dataCustomer);
            }
            else {
                var dataCustomerTop = [];
                dataCustomerTop = dataCustomer.slice(0, 5);
                res.status(200).json(dataCustomer);
            }
        });
    };
    return CustomerService;
}());
exports.default = CustomerService;
