import UsersDB from "./UsersDB";
import LoggedUser from "../../../Entities/LoggedUser";
import User from "../../../Entities/User";
import UserModel from "../user.model";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import * as keys from "../../../../config/key";

export default class UserDBImpl implements UsersDB {
	private getToken(nickname: string, _id: string): string {
		return (
			"Bearer " +
			jwt.sign(
				{
					nickname: nickname,
					id: _id,
				},
				keys.secretOrKey
			)
		);
	}
	async findUserToLogin(user: User): Promise<LoggedUser> {
		try {
			const foundUser = await UserModel.findOne({
				$or: [{ nickname: user.nickname }, { email: user.email }],
			});
			if (foundUser) {
				let isMatch = await bcrypt.compare(
					user.password,
					foundUser.password
				);
				if (isMatch) {
					let token = this.getToken(foundUser.name, foundUser.id);
					return new LoggedUser(
						foundUser.nickname,
						foundUser.email,
						token
					);
				} else {
					return Promise.reject(
						"La contraseña o el usuario no coinciden."
					);
				}
			} else {
				return Promise.reject(
					"La contraseña o el usuario no coinciden."
				);
			}
		} catch (err) {
			throw new Error(err.message);
		}
	}
	async addUser(user: User): Promise<LoggedUser> {
		try {
			const hashedPassword = bcrypt.hashSync(
				user.password,
				bcrypt.genSaltSync(10)
			);
			const newUser = new UserModel({
				name: user.name,
				surname: user.surname,
				nickname: user.nickname,
				email: user.email,
				password: user.password,
			});
			newUser.password = hashedPassword;
			const savedUser = await UserModel.create(newUser);
			let token = this.getToken(savedUser.name, savedUser.id);
			return new LoggedUser(savedUser.nickname, savedUser.email, token);
		} catch (err) {
			throw new Error(err.message);
		}
	}

	async validateToken(token: string): Promise<User> {
		const decoded = await this.decodeToken(token);
		const user = await UserModel.findById(decoded.id);
		return new User(
			user.nickname,
			user.email,
			null,
			null,
			user.name,
			user.surname
		);
	}

	private decodeToken(
		token: string
	): Promise<{ nickname: string; id: string }> {
		return new Promise((resolve, reject) => {
			jwt.verify(
				token,
				keys.secretOrKey,
				(err: any, decoded: { nickname: string; id: string }) => {
					if (err) {
						reject(err);
						return;
					}
					resolve(decoded);
				}
			);
		});
	}
}
