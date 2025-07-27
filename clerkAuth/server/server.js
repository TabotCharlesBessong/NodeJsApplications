const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { clerkClient } = require("@clerk/express");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Users Router
const usersRouter = express.Router();

// Register a new user
usersRouter.post("/register", async (req, res) => {
  const { username, emailAddresses, password } = req.body;
  try {
    const user = await clerkClient.users.createUser({
      username,
      emailAddresses,
      password,
    });
    res.status(201).json({
      message: "User created successfully",
      userId: user.id,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      message: "Failed to create user",
      error: error.message,
    });
  }
});

// Get all users
usersRouter.get("/", async (req, res) => {
  try {
    const { data, totalCount } = await clerkClient.users.getUserList({
      limit: 10,
      orderBy: "+first_name",
      query: "",
      pageSize: 10,
    });
    res.json({ users: data, totalCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific user
usersRouter.get("/:userId", async (req, res) => {
  try {
    const user = await clerkClient.users.getUser(req.params.userId);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
});

// Update a user
usersRouter.put("/:userId", async (req, res) => {
  const { username, emailAddresses, firstName, lastName,publicMetadata, privateMetadata, unsafeMetadata } = req.body;
  try {
    const user = await clerkClient.users.updateUser(req.params.userId, {
      username,
      emailAddresses,
      firstName,
      lastName,
      publicMetadata,
      privateMetadata,
      unsafeMetadata
    });
    res.json({ message: "User updated", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use("/api/users", usersRouter);

// Admin Router
const adminRouter = express.Router();

// Ban a user
adminRouter.post("/ban/:userId", async (req, res) => {
  try {
    const banUser = await clerkClient.users.banUser(req.params.userId, {
      reason: req.body.reason || "Violation of terms of service",
      expiresAt: req.body.expiresAt || new Date(Date.now() + 5 * 60 * 1000), // Default 5 min
    });
    res.json({ message: "User banned", banUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Unban a user
adminRouter.post("/unban/:userId", async (req, res) => {
  try {
    const unbanUser = await clerkClient.users.unbanUser(req.params.userId);
    res.json({ message: "User unbanned", unbanUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lock a user
adminRouter.post("/lock/:userId", async (req, res) => {
  try {
    const userLocked = await clerkClient.users.lockUser(req.params.userId, {
      reason: req.body.reason || "Suspicious activity detected",
      expiresAt: req.body.expiresAt || new Date(Date.now() + 10 * 60 * 1000), // Default 10 min
    });
    res.json({ message: "User locked", userLocked });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Unlock a user
adminRouter.post("/unlock/:userId", async (req, res) => {
  try {
    const unlockUser = await clerkClient.users.unlockUser(req.params.userId);
    res.json({ message: "User unlocked", unlockUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use("/api/admin", adminRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
