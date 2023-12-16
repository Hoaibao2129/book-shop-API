"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var roleService_1 = __importDefault(require("../service/roleService"));
var router = express_1.default.Router();
router.post('/', function (req, res) {
    var roleService = new roleService_1.default();
    roleService.insertRole(req, res);
});
router.get("/roleList", function (req, res) {
    var roleService = new roleService_1.default();
    roleService.getAllRole(req, res);
});
router.put("/", function (req, res) {
    var roleService = new roleService_1.default();
    roleService.updateRole(req, res);
});
router.delete("/", function (req, res) {
    var roleService = new roleService_1.default();
    roleService.deleteRole(req, res);
});
router.get("/:id", function (req, res) {
    var roleService = new roleService_1.default();
    roleService.getRoleById(req, res);
});
exports.default = router;
