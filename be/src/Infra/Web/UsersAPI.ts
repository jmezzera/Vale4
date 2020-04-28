import * as express from "express";
import UserController from "../../UseCases/UserController";
import User from "../../Entities/User";
import RegisterValidator from "./validation/RegisterValidator";

export default class UsersAPI {
	private _router: express.Router;
	private usersController: UserController;
	private registerValidator: RegisterValidator;

	constructor(usersController: UserController) {
		this.usersController = usersController;
		this.registerValidator = new RegisterValidator();
		this._router = express.Router();
		this.initializeRoutes();
	}

	private initializeRoutes(): void {
		this._router.get("/login", this.login);
		this._router.get("/registry", this.registry);
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

	private registry = (req: express.Request, res: express.Response): void => {
		let user = new User(
			req.body.nickname,
			req.body.email,
			req.body.password,
			req.body.name,
			req.body.surname
		);
		const resValid = this.registerValidator.validateRegisterInput(user);
		const errors = resValid["errors"];
		const isValid = resValid["isValid"];
		// Check Validation
		if (!isValid) {
			res.status(400).json(errors);
			return;
		}
		res.status(200).send("ENTRO");
	};

	public get router(): express.Router {
		return this._router;
	}
}
