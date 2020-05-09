import * as mongoose from "mongoose";

export interface IUser extends mongoose.Document {
	name: string;
	surname: string;
	nickname: string;
	email: string;
	password: string;
}

export const UserSchema = new mongoose.Schema({
	name: { type: String, required: true },
	surname: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	nickname: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
