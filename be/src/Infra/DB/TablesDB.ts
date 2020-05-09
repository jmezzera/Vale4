import Table from "../../Entities/Table";

export default interface TablesDB {
    getTables(): Promise<Table[]>;
    getTable(id: string): Promise<Table>;
    addTable(table: Table): Promise<Table>;
    updateTable(table: Table): Promise<Table>;
}
