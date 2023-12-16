import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  roleName: string;
  dataAccess : string[];
}

const roleSchema = new Schema<IUser>({
  roleName: { type: String},
  dataAccess: { type : [] , default: [] },
});

const RoleModel = mongoose.model<IUser>('role', roleSchema);

export default RoleModel;