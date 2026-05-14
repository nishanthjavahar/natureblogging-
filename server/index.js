const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const blogRoutes = require("./routes/blogRoutes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://natureblogging.vercel.app",
    ],
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
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});