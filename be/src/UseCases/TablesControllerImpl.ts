import TablesController from "./TablesController";
import User from "../Entities/User";
import Table from "../Entities/Table";
import TablesDB from "../Infra/DB/TablesDB";
import MissingDataException from "../Exceptions/MissingDataException";
import NotFoundException from "../Exceptions/NotFoundException";
import MissingPasswordException from "../Exceptions/MissingPassword";
import WrongPasswordException from "../Exceptions/WrongPasswordException";
import TablesSessions from "../Infra/Web/TablesSessions";

export default class TablesControllerImpl implements TablesController {
    private tablesDB: TablesDB;
    private _tablesSessionController: TablesSessions;
    constructor(tablesDB: TablesDB) {
        this.tablesDB = tablesDB;
    }
    public async createTable(
        user: User,
        tableName: string,
        playersQty: number,
        isProtected: boolean,
        password: string
    ): Promise<Table> {
        const table = new Table(tableName, playersQty, isProtected, password);
        if (!tableName) {
            throw new MissingDataException("Table name parameter is Missing");
        }
        if (isProtected && !password) {
            throw new MissingDataException("Password missing");
        }
        table.addPlayer(user);
        const tableWithDBId = await this.tablesDB.addTable(table);
        this._tablesSessionController.createTable(tableWithDBId.id);
        return tableWithDBId;
    }

    public getTables(): Promise<Table[]> {
        return this.tablesDB.getTables();
    }

    public async joinTable(idTable: string, user: User, password: string): Promise<Table> {
        let table = await this.tablesDB.getTable(idTable);
        if (!table) {
            throw new NotFoundException("Table not Found");
        }
        if (table.isProtected) {
            if (!password) {
                throw new MissingPasswordException("Missing password for protected table");
            }
            if (password !== table.password) {
                throw new WrongPasswordException(`Wrong password for table ${idTable}`);
            }
        }
        table.addPlayer(user);
        return table;
    }

    public async playerConnected(idTable: string, user: User): Promise<void> {
        let table = await this.tablesDB.getTable(idTable);
        table.connectPlayer(user);
    }

    public set tablesSessionController(sessionController: TablesSessions) {
        this._tablesSessionController = sessionController;
    }
}
