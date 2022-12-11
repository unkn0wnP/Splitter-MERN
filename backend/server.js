const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const Router = require("./Routes/routes")
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

app.use("/",Router)

app.use(express.static(path.resolve(__dirname, "../frontend/build")));
app.get("*", (request, response) => {
  response.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);



app.listen(PORT, () => {
  console.log("Server is running...");
});
