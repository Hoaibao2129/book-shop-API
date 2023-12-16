"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var staffsModel_1 = __importDefault(require("../models/staffsModel"));
var roleModels_1 = __importDefault(require("../models/roleModels"));
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var StaffService = /** @class */ (function () {
    function StaffService() {
    }
    StaffService.prototype.insertStaff = function (req, res) {
        var data = req.body;
        staffsModel_1.default.find({ tel: data.tel }).then(function (responseCheckStaff) {
            if (responseCheckStaff.length > 0) {
                res.status(200).json("Nhân viên đã tồn tại ở hệ thống");
            }
            else {
                roleModels_1.default.find({ roleName: data.roleName }).then(function (responseRole) {
                    bcrypt.genSalt(10, function (err, salt) {
                        if (err) {
                            console.error(err);
                        }
                        else {
                            bcrypt.hash("abc123", salt, function (err, hashedPassword) {
                                if (err) {
                                    console.error(err);
                                }
                                else {
                                    var dataInsert = new staffsModel_1.default({
                                        name: data.name,
                                        tel: data.tel,
                                        id_number: data.id_number,
                                        roleName: data.roleName,
                                        staffId: "NV" + data.tel,
                                        password: hashedPassword,
                                        dataAccess: data.dataAccess,
                                        roleId: responseRole[0]._id,
                                        token: null,
                                    });
                                    dataInsert.save().then(function (response) {
                                        res.status(200).json(response);
                                    });
                                }
                            });
                        }
                    });
                });
            }
        });
    };
    StaffService.prototype.getAllStaffs = function (req, res) {
        staffsModel_1.default.find({}).then(function (response) {
            res.status(200).json(response);
        });
    };
    StaffService.prototype.updateStaff = function (req, res) {
        var data = req.body;
        staffsModel_1.default.find({ _id: data._id }).then(function (response) {
            if (response.length == 1) {
                var dataUpdate = response[0];
                dataUpdate.name = data.name,
                    dataUpdate.tel = data.tel;
                staffsModel_1.default.updateOne({ _id: data._id }, dataUpdate).then(function (response) {
                    if (response.acknowledged) {
                        res.status(200).json("Cập nhật thành công thông tin nhân viên");
                    }
                });
            }
        });
    };
    StaffService.prototype.deleteStaff = function (req, res) {
        var data = req.body;
        staffsModel_1.default.deleteOne({ _id: data._id }).then(function (response) {
            if (response.acknowledged) {
                res.status(200).json("Xoá thành công nhân viên");
            }
        });
    };
    StaffService.prototype.getStaffById = function (req, res) {
        var _id = req.params.id;
        staffsModel_1.default.find({ _id: _id }).then(function (response) {
            res.status(200).json(response);
        });
    };
    StaffService.prototype.login = function (req, res) {
        var data = req.body;
        staffsModel_1.default.find({ tel: data.tel }).then(function (responseLogin) {
            if (responseLogin.length == 1) {
                var resutl = bcrypt.compareSync(data.password, responseLogin[0].password);
                if (resutl) {
                    var secretKey = 'Hoai-bao';
                    var token = jwt.sign(data, secretKey);
                    var dataUpdate = responseLogin[0];
                    dataUpdate.token = token;
                    staffsModel_1.default.updateOne({ tel: data.tel }, dataUpdate).then(function (responseUpdate) {
                        if (responseUpdate.acknowledged) {
                            staffsModel_1.default.find({ tel: data.tel }).then(function (response) {
                                res.status(200).json(response);
                            });
                        }
                    });
                }
                else {
                    res.status(200).json("Số điện thoại hoặc mật khẩu không đúng");
                }
            }
            else {
                res.status(200).json("Số điện thoại không tồn tại");
            }
        });
    };
    StaffService.prototype.filterStaff = function (req, res) {
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
        staffsModel_1.default.aggregate(pipeList).then(function (response) {
            res.status(200).json(response);
        });
    };
    return StaffService;
}());
exports.default = StaffService;
