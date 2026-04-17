const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db");

const auth = require("./routes/auth");
const env = require("./routes/env");
const billing = require("./routes/billing");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", auth);
app.use("/env", env);
app.use("/billing", billing);

app.listen(3000, () => console.log("Server running on 3000"));
