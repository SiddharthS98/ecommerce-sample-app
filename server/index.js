const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const client = require("./database");

const app = express();
const port = 8080;

app.use(cors());

// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// getProducts api
// returns list of products data
app.get("/getProducts", (req, res) => {
  client.query(
    "SELECT * from public.product order by id asc",
    (err, results) => {
      if (!err) {
        res.send({ data: results.rows });
      } else {
        console.log("Some error in fetching product data: ", err);
      }
      client.end;
    }
  );
});

app.post("/buyProduct", (req, res) => {
  const data = req.body;

  client.query(
    `SELECT stock FROM public.product WHERE id = ${data.id}`,
    (err, results) => {
      if (!err) {
        const currentStock = results.rows[0]?.stock;

        if (currentStock == 0) {
          res.send({ data: "Stock is 0", stock: 0 });
        } else {
          client.query(
            `UPDATE public.product
            SET stock = (${currentStock} - 1)
            WHERE id = ${data.id};`,
            (err2, results2) => {
              if (err2) {
                throw err2;
              }
              res.status(201).send({
                data: "Row updated successfully",
                stock: currentStock - 1,
              });
            }
          );
        }
      } else {
        console.log("Some error: ", err);
      }
      client.end;
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
