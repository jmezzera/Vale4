import * as express from "express";
import TablesController from "../../UsesCases/TablesController";
export default class TablesAPI {
    private _router: express.Router;
    private tablesController: TablesController;
    constructor(tablesController: TablesController) {
        this.tablesController = tablesController;
        this._router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this._router.get("/", this.getTables);
        this._router.post("/", this.createTable);
        this._router.post("/:idTable", this.joinTable);
    }

    private getTables = (req: express.Request, res: express.Response): void => {
        this.tablesController.getTables().then(tables => res.status(200).send(tables));
    };

    private createTable = (req: express.Request, res: express.Response): void => {
        const { name, playersQty, isProtected, password } = req.body;
        this.tablesController
            .createTable(null, name, playersQty, isProtected, password)
            .then(table => res.status(200).send({ tableId: table.id }))
            .catch(err => res.status(500).send(err));
    };

    private joinTable = (req: express.Request, res: express.Response): void => {
        const idTable = req.params.idTable;
        const password = req.body.password;
        this.tablesController
            .joinTable(idTable, null, password)
            .then(table => res.status(201).send({ tableId: table.id }));
    };

    public get router(): express.Router {
        return this._router;
    }
}
