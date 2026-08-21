const express = require("express");
const _ = require("lodash");
const axios = require("axios");
const marked = require("marked");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const { ordersCsv } = require("./export");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // nested form bodies are parsed by qs

const products = [
  { id: 1, name: "Notebook", price: 120, description: "**Recycled** paper, 80 pages" },
  { id: 2, name: "Gel pen", price: 35, description: "Blue ink, _smooth_ tip" },
];
const settings = { currency: "INR", theme: "light" };

app.get("/products", (req, res) => res.json(_.sortBy(products, req.query.sort || "price")));

// Product page: sellers write descriptions in markdown.
app.get("/products/:id", (req, res) => {
  const p = products.find((x) => x.id === Number(req.params.id));
  if (!p) return res.sendStatus(404);
  res.send(`<h1>${p.name}</h1>${marked(p.description)}`);
});

// Sellers can import a product photo from a link.
app.post("/products/:id/photo", async (req, res) => {
  const img = await axios.get(req.body.url, { responseType: "arraybuffer" });
  res.json({ bytes: img.data.length });
});

// Shop preferences are deep-merged with what the admin sends.
app.post("/settings", (req, res) => res.json(_.merge(settings, req.body)));

app.post("/login", (req, res) => {
  const token = jwt.sign({ user: req.body.user }, process.env.JWT_SECRET || "dev", { expiresIn: "1h" });
  res.json({ token });
});

app.get("/health", (req, res) => res.json({ ok: true, at: moment().toISOString() }));

// Large order exports are streamed as CSV.
app.get("/orders.csv", (req, res) => ordersCsv([{ id: 1, total: 155 }]).pipe(res.type("text/csv")));

if (require.main === module) app.listen(process.env.PORT || 3000);
module.exports = app;
