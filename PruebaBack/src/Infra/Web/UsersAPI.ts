import UserController from "../../UseCases/UserController";

import * as express from 'express';
import User from "../../Entities/User";

export default class UsersAPI{
    private _router: express.Router;
    private usersController: UserController;

    constructor(usersController: UserController){
        this.usersController = usersController;

        this._router = express.Router();
        this.initRoutes();
    }

    private initRoutes(): void{
        this._router.get('/', this.getUsers);
        this._router.post('/', this.addUser);
    }

    private addUser = (req: express.Request, res: express.Response): void => {
        const name = req.body.name;
        if (!name){
            res.status(400).send("Falta el nombre");
            return;
        }
        this.usersController.addUser(new User(name))
            .then(id => res.status(201).send(id));
    }

    private getUsers = (req: express.Request, res: express.Response): void => {
        this.usersController.getUsers()
            .then(users => res.status(200).send(users));
    }

    public get router(): express.Router{
        return this._router;
    }
}