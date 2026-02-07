// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");

// dotenv.config();
// connectDB();

// const app = express();

// // Middleware
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//   }),
// );
// app.use(express.json());

// // Routes
// app.use("/api/contact", require("./routes/contactRoutes"));
// app.use("reply", require("./routes/contactRoutes"));

// // Test route
// app.get("/", (req, res) => {
//   res.send("Portfolio Galaxy server is running");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware
const allowedOrigins = [
  "http://localhost:5173", // local frontend
  "https://your-frontend.netlify.app", // deployed frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) callback(null, true);
      else callback(new Error("Not allowed by CORS"));
    },
  }),
);
app.use(express.json());

// Routes
app.use("/api/contact", require("./routes/contactRoutes"));

// Test route
app.get("/", (req, res) => {
  res.send("Portfolio Galaxy server is running 🚀");
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
