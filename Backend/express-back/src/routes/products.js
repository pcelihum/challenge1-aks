const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// GET /api/products
router.get("/", async (req, res) => {
  const items = await Product.find().sort({ createdAt: -1 });
  res.json(items);
});

// POST /api/products
router.post("/", async (req, res) => {
  const { name, price } = req.body || {};
  if (!name?.trim()) return res.status(400).json({ message: "name is required" });

  const item = await Product.create({ name: name.trim(), price: Number(price) || 0 });
  res.status(201).json(item);
});

// DELETE /api/products/:id  (opcional)
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;