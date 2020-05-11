"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TablesDBDummy = /** @class */ (function () {
    function TablesDBDummy() {
        this.tables = [];
    }
    TablesDBDummy.prototype.getTables = function () {
        return Promise.resolve(this.tables);
    };
    TablesDBDummy.prototype.getTable = function (id) {
        var table = this.tables.find(function (table) { return table.id === id; });
        return Promise.resolve(table);
    };
    TablesDBDummy.prototype.addTable = function (table) {
        this.tables.push(table);
        return Promise.resolve(table);
    };
    TablesDBDummy.prototype.updateTable = function (table) {
        var storedTable = this.tables.find(function (t) { return t.id === table.id; });
        storedTable = table;
        return Promise.resolve(storedTable);
    };
    return TablesDBDummy;
}());
exports.default = TablesDBDummy;
//# sourceMappingURL=TablesDBDummy.js.map