const express = require("express");
const _ = require("lodash");
const moment = require("moment");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const products = [
  { id: 1, name: "Notebook", price: 4.5 },
  { id: 2, name: "Pen", price: 1.2 },
];

app.get("/products", (req, res) => res.json(_.sortBy(products, "price")));
app.get("/health", (req, res) => res.json({ ok: true, at: moment().toISOString() }));
app.post("/login", (req, res) => res.json({ token: jwt.sign({ user: req.body.user }, process.env.JWT_SECRET || "dev") }));

app.listen(process.env.PORT || 3000);
