import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  author : string;
  price : string ;
  quantity : string;
  qr : string;
}

const bookSchema = new Schema<IUser>({
  name: { type: String},
  author: { type: String },
  price: { type: String },
  quantity: { type: String },
  qr : {type : String}
});

const BookModel = mongoose.model<IUser>('book', bookSchema);

export default BookModel;