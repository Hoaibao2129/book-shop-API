"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var mongoose_1 = __importDefault(require("mongoose"));
var cors = require("cors");
var bodyParser = require("body-parser");
//import router
var bookRouter_1 = __importDefault(require("./router/bookRouter"));
var roleRouter_1 = __importDefault(require("./router/roleRouter"));
var staffRouter_1 = __importDefault(require("./router/staffRouter"));
var invoiceRouter_1 = __importDefault(require("./router/invoiceRouter"));
var customerRouter_1 = __importDefault(require("./router/customerRouter"));
var dataAccessRouter_1 = __importDefault(require("./router/dataAccessRouter"));
var promotionRouter_1 = __importDefault(require("./router/promotionRouter"));
var importHistoryRouter_1 = __importDefault(require("./router/importHistoryRouter"));
var revenueRouter_1 = __importDefault(require("./router/revenueRouter"));
var app = express();
var port = 8000;
app.use(cors());
// Parsers for POST data
app.use(bodyParser.json({ extended: true, limit: "16mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "16mb" }));
// app.get('/', (req : any, res : any) => {
//   res.send('Hello, World!');
// });
app.use(express.json());
// router
app.use('/book', bookRouter_1.default);
app.use("/role", roleRouter_1.default);
app.use("/staff", staffRouter_1.default);
app.use("/invoice", invoiceRouter_1.default);
app.use("/customer", customerRouter_1.default);
app.use("/dataAccess", dataAccessRouter_1.default);
app.use("/promotion", promotionRouter_1.default);
app.use("/importHistory", importHistoryRouter_1.default);
app.use("/revenue", revenueRouter_1.default);
var dbURI = 'mongodb://localhost:27017/books_store';
mongoose_1.default.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}); // Sử dụng "as ConnectOptions" để thông báo cho TypeScript
var db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});
app.listen(port, function () {
    console.log("Server is running at http://localhost:".concat(port));
});
