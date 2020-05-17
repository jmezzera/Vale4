import User from "../Entities/User";
import Table from "../Entities/Table";
import TablesSessions from "../Infra/Web/TablesSessions";

export default interface TablesController {
    tablesSessionController: TablesSessions;
    createTable(
        user: User,
        tableName: string,
        playersQty: number,
        isProtected: boolean,
        password: string
    ): Promise<Table>;
    getTables(): Promise<Table[]>;
    joinTable(idTable: string, user: User, password: string): Promise<Table>;
    playerConnected(idTable: string, user: User): Promise<void>;
}
