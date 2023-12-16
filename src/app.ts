const express = require('express');
import mongoose, { ConnectOptions } from 'mongoose';
let cors = require("cors");
let bodyParser = require("body-parser");

//import router
import bookRouter from "./router/bookRouter"
import roleRouter from "./router/roleRouter"
import stafRouter from "./router/staffRouter"
import invoiceRouter from "./router/invoiceRouter"
import customerRouter from "./router/customerRouter"
import dataAccessRouter from "./router/dataAccessRouter"
import promotionRouter from "./router/promotionRouter"
import impoerHistoryRouter from "./router/importHistoryRouter"
import revenueRouter from "./router/revenueRouter"

const app = express();
const port = 8000;

app.use(cors());
// Parsers for POST data
app.use(bodyParser.json({ extended: true, limit: "16mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "16mb" }));

// app.get('/', (req : any, res : any) => {
//   res.send('Hello, World!');
// });

app.use(express.json());

// router
app.use('/book', bookRouter);
app.use("/role" , roleRouter);
app.use("/staff" , stafRouter);
app.use("/invoice" , invoiceRouter);
app.use("/customer" , customerRouter);
app.use("/dataAccess", dataAccessRouter);
app.use("/promotion" , promotionRouter);
app.use("/importHistory" , impoerHistoryRouter); 
app.use("/revenue" , revenueRouter);

const dbURI = 'mongodb://localhost:27017/books_store';
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions); // Sử dụng "as ConnectOptions" để thông báo cho TypeScript

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
