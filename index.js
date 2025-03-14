const express = require("express");
const path = require("path");
const app = express();
const usersRoute = require("./routes/users");

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/user", usersRoute);

app.listen(8000, () => {
  console.log("server is running on http://localhost:8000");
});
