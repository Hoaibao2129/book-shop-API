import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  tel : string;
  roleId : string ;
  roleName : string;
  staffId : string ;
  password : string ;
  dataAccess : [];
  token : string ;
}

const staffSchema = new Schema<IUser>({
  name: { type: String},
  tel: { type: String },
  roleId: { type: String },
  roleName: { type: String },
  staffId: { type: String },
  password: { type: String },
  dataAccess: { type: [] },
  token: { type: String },
});

const StaffModel = mongoose.model<IUser>('staff', staffSchema);

export default StaffModel;