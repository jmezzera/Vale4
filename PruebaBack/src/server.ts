import WebServer from "./Infra/Web/WebServer";
import WebServerImpl from "./Infra/Web/WebServerImpl";
import UsersDB from "./Infra/DB/Users/UsersDB";
import UserDBDummy from "./Infra/DB/Users/UserDBDummy";
import UserController from "./UseCases/UserController";
import UserControllerImpl from "./UseCases/UserControllerImpl";

export default class Server{
    private webServer: WebServer;
    
    private userController: UserController;
    private usersDB: UsersDB;

    constructor(){
        this.usersDB = new UserDBDummy();
        this.userController = new UserControllerImpl(this.usersDB);

        this.webServer = new WebServerImpl(this.userController);
    }
    public run(){
        this.webServer.listen(8080);

    }
}