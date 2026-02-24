require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const productsRouter = require("./routes/products");

const app = express();

app.use(cors());
app.use(express.json());

// Healthcheck (AKS)
app.get("/health", (req, res) => res.json({ ok: true }));

// API
app.use("/api/products", productsRouter);

// Global error handler (simple)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal error" });
});

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

async function start() {
  if (!MONGO_URI) throw new Error("MONGO_URI missing");
  await mongoose.connect(MONGO_URI);
  console.log("Mongo connected");
  app.listen(PORT, () => console.log(`API running on :${PORT}`));
}

start().catch((e) => {
  console.error(e);
  process.exit(1);
});