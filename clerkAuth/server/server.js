const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { clerkClient } = require("@clerk/express");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  // const { data, totalCount } = await clerkClient.users.getUserList({
  //   limit: 10,
  //   orderBy: "+first_name",
  //   query: "",
  //   pageSize: 10,
  // });
  // res.send('Hello, World!');

  const getUser = await clerkClient.users.getUser(
    "user_2upgiJPQCLFbwaKnRCD14yVd1rS"
  );
  const getcount = await clerkClient.users.getCount({
    query:"Charles"
  });
  res.json({ data: getUser, total: getcount });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
