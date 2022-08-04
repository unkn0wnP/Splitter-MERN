const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const model = require("./model/schema");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

app.use(express.static(path.resolve(__dirname, "../frontend/build")));
app.get("*", (request, response) => {
  response.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

app.post("/addUser", async (req, res) => {
  const data = req.body;
  const newUser = new model.User(data);
  await newUser.save();
  res.json(1);
});

app.post("/checkUser", async (req, res) => {
  const data = req.body;
  model.User.countDocuments(data, (err, result) => {
    if (err) res.json({ result: -1 });
    else res.json({ result });
  });
});

app.post("/getInfo", (req, res) => {
  const uname = req.body;
  model.User.findOne(uname, (err, result) => {
    if (err) {
      res.json("error");
    } else if (result === null) {
      res.json("No user found.");
    } else {
      res.json(result);
    }
  });
});

app.post("/createFriendDoc", async (req, res) => {
  const data = {
    username: req.body.username,
    friends: [],
    pending: [],
  };

  const newRec = new model.Friend(data);
  await newRec.save();
  res.json(1);
});

app.post("/getFriend", (req, res) => {
  model.Friend.findOne(req.body, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/sendReq", async (req, res) => {
  const fname = req.body.fname;
  const update = { $set: { pending: req.body.pending } };
  model.Friend.updateOne({ username: fname }, update, (err, result) => {
    if (err) res.json(err);
    else res.json(1);
  });
});

app.post("/updateFriend", async (req, res) => {
  const uname = req.body.username;
  const update = { $set: req.body };
  model.Friend.updateOne({ username: uname }, update, (err, result) => {
    if (err) res.json(err);
    else res.json(1);
  });
});

app.post("/updateUser", async (req, res) => {
  const username = req.body.username;
  const update = { $set: req.body };
  model.User.updateOne({ username: username }, update, (err, result) => {
    if (err) res.json(-1);
    else res.json(1);
  });
});

app.post("/addExpense", async (req, res) => {
  const data = req.body;
  const newExp = new model.Expense(data);
  await newExp.save();
  res.json(1);
});

app.post("/getExpenseInfo", async (req, res) => {
  const a = await model.Expense.find(req.body).sort({ date: -1, tDate: -1 });
  res.json({ data: a });
});

app.post("/getSummary", async (req, res) => {
  const data = await model.Expense.aggregate([
    { $match: req.body },
    { $group: { _id: { friend: "$friend" }, total: { $sum: "$amount" } } },
  ]);
  res.json(data);
});

app.post("/deleteExp", async (req, res) => {
  const data = await model.Expense.deleteMany(req.body);
  if (data.deletedCount === 2) res.json("Deleted");
  else res.json(-1);
});

app.listen(PORT, () => {
  console.log("Server is running...");
});
