const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const blogRoutes = require("./routes/blogRoutes");

const app = express();

app.use(
  cors({
    origin:
      "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(
  "/uploads",
  express.static("uploads")
);
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

// Routes
app.use("/api/blogs", blogRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("WildGuard Backend Running");
});

// MongoDB Connection
mongoose.connect(
  process.env.MONGO_URI
)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});

// Server
app.listen(3001, () => {
  console.log("Server running on port 3001");
});