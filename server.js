const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: "https://portfolio-galaxy.netlify.app",
  }),
);
app.use(express.json());

// Routes
app.use("/create", require("./routes/contactRoutes"));
app.use("/message", require("./routes/contactRoutes"));

// Test route
app.get("/", (req, res) => {
  res.send("Portfolio Galaxy server is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");

// dotenv.config();
// connectDB();

// const app = express();

// /* 🔴 BODY PARSER — MUST COME BEFORE ROUTES */
// app.use(express.json());

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://portfolio-galaxy.netlify.app",
// ];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ["GET", "POST", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: false,
//   }),
// );

// /* ROUTES */
// app.use("/create", require("./routes/contactRoutes"));
// app.use("/message", require("./routes/contactRoutes"));

// /* TEST */
// app.get("/", (req, res) => {
//   res.send("Portfolio Galaxy server is running 🚀");
// });

// /* 404 */
// app.use((req, res) => {
//   res.status(404).json({ success: false, message: "Route not found" });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
