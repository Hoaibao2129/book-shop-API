"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var roleModels_1 = __importDefault(require("../models/roleModels"));
var RoleService = /** @class */ (function () {
    function RoleService() {
    }
    RoleService.prototype.insertRole = function (req, res) {
        console.log(req.body);
        var data = req.body;
        var dataInser = new roleModels_1.default({
            roleName: data.roleName,
            dataAccess: data.dataAccess,
        });
        dataInser.save().then(function (response) {
            res.status(200).json(response);
        });
    };
    RoleService.prototype.getAllRole = function (req, res) {
        var pipeList = [];
        pipeList.push({
            $addFields: { "idStr": { $toString: "$_id" } }
        }, {
            "$lookup": {
                "from": "staffs",
                "localField": "idStr",
                "foreignField": "roleId",
                "as": "staffs"
            }
        }, {
            $project: {
                _id: 1,
                roleName: 1,
                staffCount: { $ifNull: [{ $size: "$staffs" }, 0] }
            }
        });
        console.log("pipeList " + JSON.stringify(pipeList));
        roleModels_1.default.aggregate(pipeList).then(function (response) {
            res.status(200).json(response);
        });
    };
    RoleService.prototype.deleteRole = function (req, res) {
        var _id = req.body._id;
        roleModels_1.default.deleteOne({ _id: _id }).then(function (response) {
            if (response.acknowledged) {
                res.status(200).json("Xoá thành công phân quyền");
            }
        });
    };
    RoleService.prototype.updateRole = function (req, res) {
        var data = req.body;
        roleModels_1.default.find({ _id: data._id }).then(function (response) {
            console.log(response);
            if (response.length == 1) {
                var dataUpdate = {
                    roleName: data.roleName,
                    dataAccess: data.dataAccess,
                };
                roleModels_1.default.updateOne({ _id: data._id }, dataUpdate).then(function (responseUpdate) {
                    if (responseUpdate.acknowledged) {
                        res.status(200).json("Cập nhật thành công");
                    }
                });
            }
        });
    };
    RoleService.prototype.getRoleById = function (req, res) {
        var _id = req.params.id;
        roleModels_1.default.find({ _id: _id }).then(function (response) {
            res.status(200).json(response);
        });
    };
    return RoleService;
}());
exports.default = RoleService;
