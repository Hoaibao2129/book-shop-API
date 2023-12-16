"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bookService_1 = __importDefault(require("../service/bookService"));
var router = express_1.default.Router();
router.post('/', function (req, res) {
    var bookService = new bookService_1.default();
    bookService.insertBook(req, res);
});
router.get("/", function (req, res) {
    var bookService = new bookService_1.default();
    bookService.getAllBook(req, res);
});
router.get("/filter", function (req, res) {
    var bookService = new bookService_1.default();
    bookService.filterBook(req, res);
});
router.get("/:id", function (req, res) {
    var bookService = new bookService_1.default();
    bookService.getBookById(req, res);
});
router.put("/", function (req, res) {
    var bookService = new bookService_1.default();
    bookService.updateBooks(req, res);
});
router.delete("/:id", function (req, res) {
    var bookService = new bookService_1.default();
    bookService.deleteBooks(req, res);
});
router.post("/importBook", function (req, res) {
    var bookService = new bookService_1.default();
    bookService.importBook(req, res);
});
exports.default = router;
