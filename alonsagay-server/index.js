require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

// Database Connection
connectDB();

// Middleware
const jsonParser = bodyParser.json();
app.use(express.json());
app.use(jsonParser);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Vercel CORS options
const corsOptions = {
  origin: "*", // Allow all origins
  credentials: true, // Allow credentials
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  preflightContinue: false,
  optionsSuccessStatus: 204, // For legacy browser support
};
app.options("", cors(corsOptions)); // Pre-flight request for all routes
app.use(cors(corsOptions));

// Curb CORS errors manually
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    status: "healthy",
    message: "Ivanka API is running perfectly!",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is healthy",
  });
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

module.exports = app;