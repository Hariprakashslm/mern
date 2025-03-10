require("dotenv").config({ path: "../.env" });
const express = require("express");
const appRoutes = require("./routes/appRoutes");
const cors = require("cors");
const { urlencoded, json } = require("body-parser");

require("./db.js");
const app = express();
const PORT = 4000;

app.use(cors("*"));
app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/", appRoutes);
app.listen(PORT, () => {
  console.log(`Node.js application listening on port: ${PORT}`);
});
