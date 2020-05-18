import { Request, Response } from "express";
import UserController from "../../../UseCases/UserController";
import User from "../../../Entities/User";

export default class UsersMW {
    private userController: UserController;

    constructor(userController: UserController) {
        this.userController = userController;
    }
    public validateToken = async (req: Request, res: Response, next: Function): Promise<void> => {
        const tokenHeader = req.headers.token as string;
        if (!tokenHeader) {
            res.status(401).send("Token header must be present");
            return;
        }
        const [authType, token] = tokenHeader.split(" ");

        switch (authType) {
            case "Bearer":
                let user: User;
                try {
                    user = await this.userController.validateToken(token);
                    res.locals.user = user;
                    next();
                } catch (err) {
                    res.status(403).send("Invalid token");
                }
                break;
            default:
                res.status(400).send("Authentication method not supported");
        }
    };
}
