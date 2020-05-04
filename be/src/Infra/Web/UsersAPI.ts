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
			req.body.confirmPassword,
			req.body.name,
			req.body.surname
		);
		const resValid = this.registerValidator.validateRegisterInput(user);
		const errors = resValid["errors"];
		const isNotValid = resValid["isNotValid"];

		// Check Validation
		if (isNotValid) {
			res.status(400).json(errors);
			return;
		}
		this.usersController
			.login(user)
			.then((loggedUser) => {
				res.status(200).send(loggedUser);
				return;
			})
			.catch((err) => res.status(400).send(err));
	};

	private registry = (req: express.Request, res: express.Response): void => {
		let user = new User(
			req.body.nickname,
			req.body.email,
			req.body.password,
			req.body.confirmPassword,
			req.body.name,
			req.body.surname
		);
		const resValid = this.registerValidator.validateRegisterInput(user);
		const errors = resValid["errors"];
		const isNotValid = resValid["isNotValid"];

		// Check Validation
		if (isNotValid) {
			res.status(400).json(errors);
			return;
		}
		this.usersController
			.registry(user)
			.then((loggedUser) => {
				res.status(200).send(loggedUser);
				return;
			})
			.catch((err) => res.status(400).send(err));
	};

	public get router(): express.Router {
		return this._router;
	}
}
