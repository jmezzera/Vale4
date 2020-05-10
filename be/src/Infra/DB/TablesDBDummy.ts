import TablesDB from "./TablesDB";
import Table from "../../Entities/Table";

export default class TablesDBDummy implements TablesDB {
    private tables: Table[];
    constructor() {
        this.tables = [];
    }
    getTables(): Promise<Table[]> {
        return Promise.resolve(this.tables);
    }
    getTable(id: string): Promise<Table> {
        const table = this.tables.find(table => table.id === id);
        return Promise.resolve(table);
    }
    addTable(table: Table): Promise<Table> {
        this.tables.push(table);
        return Promise.resolve(table);
    }
    updateTable(table: Table): Promise<Table> {
        let storedTable = this.tables.find(t => t.id === table.id);
        storedTable = table;
        return Promise.resolve(storedTable);
    }
}
