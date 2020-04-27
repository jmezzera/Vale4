import * as express from "express";
export default class StatusAPI {
  private _router: express.Router;
  constructor() {
    this._router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this._router.get("/up", this.uptime);
  }

  private uptime(req: express.Request, res: express.Response): void {
    console.log(process.uptime().toString());

    res.status(200).send({
      uptime: process.uptime(),
    });
  }

  public get router(): express.Router {
    return this._router;
  }
}
