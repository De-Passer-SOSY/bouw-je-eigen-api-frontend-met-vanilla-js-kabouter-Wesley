const knex = require("knex");

const db = knex({
  client: "mysql2",
  connection: {
    host: "web0164.zxcs.be",
    user: "adb_simon",
    password: "j6NTqc8STbYQ5djr9bDV",
    database: "adb_project_simon",
  },
});

module.exports = db;
