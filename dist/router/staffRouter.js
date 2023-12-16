"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var staffSevice_1 = __importDefault(require("../service/staffSevice"));
var router = express_1.default.Router();
router.post('/', function (req, res) {
    var staffService = new staffSevice_1.default();
    staffService.insertStaff(req, res);
});
router.post("/login", function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    var staffService = new staffSevice_1.default();
    staffService.login(req, res);
});
router.get("/filter", function (req, res) {
    var staffService = new staffSevice_1.default();
    staffService.filterStaff(req, res);
});
router.get("/", function (req, res) {
    var staffService = new staffSevice_1.default();
    staffService.getAllStaffs(req, res);
});
router.put("/", function (req, res) {
    var staffService = new staffSevice_1.default();
    staffService.updateStaff(req, res);
});
router.delete("/", function (req, res) {
    var staffService = new staffSevice_1.default();
    staffService.deleteStaff(req, res);
});
router.get("/:id", function (req, res) {
    var staffService = new staffSevice_1.default();
    staffService.getStaffById(req, res);
});
exports.default = router;
