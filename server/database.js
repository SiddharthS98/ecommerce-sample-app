const { Client } = require("pg");

const client = new Client({
  host: process.env.host,
  user: process.env.user,
  port: process.env.port,
  password: process.env.password,
  database: process.env.database,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

client.query("SELECT * from public.product", (err, res) => {
  if (err) {
    console.log("Some error: ", err);
  }
  console.log("Successfully connected to database");
  client.end;
});

module.exports = client;
