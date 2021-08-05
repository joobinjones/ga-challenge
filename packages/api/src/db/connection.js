const environment = process.env.NODE_ENV || "development";
import config from "../../knexfile";
import knex from "knex";
export default knex(config[environment]);
