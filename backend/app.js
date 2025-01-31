const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const propertyRoutes = require("./routes/propertyRoutes");

const app = express();
const PORT = process.env.PORT || 5001;


app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api/properties", propertyRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
