import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
}

const dataAccessSchema = new Schema<IUser>({
    name: { type: String},
});

const DataAccessModel = mongoose.model<IUser>('dataAccess', dataAccessSchema);

export default DataAccessModel;