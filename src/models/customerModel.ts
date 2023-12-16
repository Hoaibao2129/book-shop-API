import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  birthday : string;
  addreess : string ;
  tel : string;
  totalPayment : number;
}

const customerSchema = new Schema<IUser>({
  name: { type: String},
  birthday: { type: String },
  tel: { type: String },
  addreess: { type: String },
  totalPayment : {type : Number}
});

const CustomerModel = mongoose.model<IUser>('customer', customerSchema);

export default CustomerModel;