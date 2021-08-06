export const up = (db) =>
  db.schema.createTable("game", (table) => {
    table.increments("gameID").primary();
    table.integer("area").notNullable();
    table.integer("bank").notNullable();
    table.integer("zone").notNullable();
    table.integer("stand").notNullable();
    table.integer("asset").notNullable();
    table.integer("netWin").notNullable();
    table.decimal("oldDenom").notNullable();
    table.decimal("newDenom").notNullable();
    table.decimal("oldPayback").notNullable();
    table.decimal("newPayback").notNullable();
    table.date("date").notNullable();
  });

export const down = (db) => db.schema.dropTable("game");
