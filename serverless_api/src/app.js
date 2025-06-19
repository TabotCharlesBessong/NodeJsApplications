const serverless = require("serverless-http");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3000;

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
    DEBUG: process.env.DEBUG,
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

// serverfull app
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

exports.handler = serverless(app);
