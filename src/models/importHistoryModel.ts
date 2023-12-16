import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  bookName : string;
  quantity : string ;
  createdAt : Date;
  updatedAt : Date ;
}

const importHistorySchema = new Schema<IUser>({
  bookName: { type: String },
  quantity: { type: String },
  createdAt : {type : Date , default : Date.now},
  updatedAt : {type : Date , default : Date.now},
});

const ImportHistoryModel = mongoose.model<IUser>('importHistory', importHistorySchema);

export default ImportHistoryModel;