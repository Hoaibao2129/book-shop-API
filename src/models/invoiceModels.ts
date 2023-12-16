import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  infoPayment: [];
  customerName : string;
  customerID : string ;
  birthDay : string;
  numberPhone : string;
  totalPrice : number;
  totalQuantityBook : number;
  delete : boolean;
  infoDelete : [ 
    {
    name : {type : String},
    note : {type : String} 
  }
];
  discount : number;
  createdAt : Date;
  updatedAt : Date ;
}

const invoiceSchema = new Schema<IUser>({
  infoPayment: { type: []},
  customerName: { type: String },
  customerID: { type: String },
  birthDay: { type: String },
  numberPhone : {type : String},
  totalPrice : {type : Number},
  totalQuantityBook : {type : Number},
  delete : {type : Boolean},
  infoDelete : {type : [
    {
      name : {type : String},
      note : {type : String} 
    }
  ]},
  discount : {type : Number},
  createdAt : {type : Date , default : Date.now},
  updatedAt : {type : Date , default : Date.now},
});

const InvoiceModel = mongoose.model<IUser>('invoice', invoiceSchema);

export default InvoiceModel;