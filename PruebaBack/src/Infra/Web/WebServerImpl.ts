import WebServer from "./WebServer";
import * as express from 'express';
import * as cors from 'cors';
import UserController from "../../UseCases/UserController";
import UsersAPI from "./UsersAPI";


export default class WebServerImpl implements WebServer{
    private app: express.Application;
    private usersAPI: UsersAPI;

    private usersController: UserController;
    constructor(usersController: UserController){
        this.app = express();
        this.usersController = usersController;
        this.usersAPI = new UsersAPI(this.usersController);
        this.app.use(express.json());
        this.app.use(cors())
        this.app.use('/users', this.usersAPI.router);
    }

    public listen(port: number){
        this.app.listen(port)
    }
}