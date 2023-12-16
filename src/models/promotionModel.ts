import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  totalPayment: number;
  discount : number;
}

const promotionSchema = new Schema<IUser>({
  totalPayment: { type: Number},
  discount: { type : Number},
});

const PromotionModel = mongoose.model<IUser>('promotion', promotionSchema);

export default PromotionModel;