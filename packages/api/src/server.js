const { PORT = 5000 } = process.env;
import app from "./app.js";
import knex from "./db/connection.js";

knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}...`);
    });
  })
  .catch((error) => {
    console.error(error);
    knex.destroy();
  });
