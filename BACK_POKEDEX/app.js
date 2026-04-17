require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/models/db.js");
const pokemonRoutes = require("./src/routes/pokemonRoutes.js");
const routeTest = require("./src/routes/routeTest.js");
const adminRoutes = require("./src/routes/adminRoutes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());
connectDB();

app.use("/pokemon", pokemonRoutes);

app.use("/admin", adminRoutes);

app.use("/testing", routeTest);

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}...`);
});
