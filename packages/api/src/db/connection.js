import { config } from "../../knexfile.js";
import knex from "knex";
const environment = process.env.NODE_ENV || "development";
const knexConfig = config[environment];
export default knex(knexConfig);
