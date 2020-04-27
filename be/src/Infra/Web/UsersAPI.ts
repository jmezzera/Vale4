import * as express from "express";
import UserController from "../../UseCases/UserController";
import User from "../../Entities/User";

export default class UsersAPI {
	private _router: express.Router;
	private usersController: UserController;

	constructor(usersController: UserController) {
		this.usersController = usersController;
		this._router = express.Router();
		this.initializeRoutes();
	}

	private initializeRoutes(): void {
		this._router.get("/login", this.login);
	}

	private login = (req: express.Request, res: express.Response): void => {
		let user = new User(
			req.body.nickname,
			req.body.email,
			req.body.password,
			req.body.name,
			req.body.surname
		);

		this.usersController.login(user).then((loggedUser) => {
			res.status(200).send(loggedUser);
		});
	};

	public get router(): express.Router {
		return this._router;
	}
}
