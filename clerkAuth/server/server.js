const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { clerkClient } = require("@clerk/express");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  const { data, totalCount } = await clerkClient.users.getUserList({
    limit: 10,
    orderBy: "+first_name",
    query: "",
    pageSize: 10,
  });
  // res.send('Hello, World!');

  const userId = "user_2vJA3ubDrgSsFc4oErjo7OKehNI";

  // const userId = "user_2vH5z9pq2yFmcHsNaMDoDMfbNjg"; // another user for testing

  // const banUser = await clerkClient.users.banUser(userId, {
  //   reason: "Violation of terms of service",
  //   expiresAt: new Date(Date.now() + 30 * 1000), // Ban for 5 minutes
  // });

  const unbanUser = await clerkClient.users.unbanUser(userId);

  // const userLocked = await clerkClient.users.lockUser(userId, {
  //   reason: "Suspicious activity detected",
  //   expiresAt: new Date(Date.now() + 10 * 60 * 1000), // Lock for 10 minutes
  // });

  // const unlockUser = await clerkClient.users.unlockUser(userId);

  const getUser = await clerkClient.users.getUser(
    "user_2upgiJPQCLFbwaKnRCD14yVd1rS"
  );
  const getcount = await clerkClient.users.getCount({
    query:""
  });
  res.json({ data, total: getcount });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
