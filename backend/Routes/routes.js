const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");
const model = require("../model/schema");
require("dotenv").config();

//register
Router.post("/register", async (req, res) => {
  const data = await model.User.countDocuments({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  });
  if (data !== 0) {
    res.status(400).json("Username or Email is already in use.");
  } else {
    const newUser = new model.User(req.body);
    await newUser.save();

    //create friend
    const udata = {
      username: req.body.username,
      friends: [],
      pending: [],
    };

    const newRec = new model.Friend(udata);
    await newRec.save();

    res.status(200).json("Registered Successfully.");
  }
});

//login
Router.post("/login", async (req, res) => {
  const data = await model.User.findOne({ username: req.body.username });

  if (data == null) {
    res.status(400).json("User not found.");
  } else if (req.body.password !== data.password) {
    res.status(400).json("Invalid password.");
  } else {
    const user = { username: req.body.username };

    //JSON web token
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);
    res.json({ accessToken: accessToken });
  }
});

//Profile
Router.get("/profile", authenticateToken, async (req, res) => {
  const username = req.user.username;

  const data = await model.User.findOne({ username: username });

  res.status(200).json(data);
});

//update user profile
Router.post("/updateuser", authenticateToken, async (req, res) => {
  const username = req.user.username;
  const update = { $set: req.body };
  model.User.updateOne({ username: username }, update, (err, result) => {
    if (err) res.json(-1);
    else res.json(1);
  });
});

//update friend
Router.post("/updatefriend", authenticateToken, async (req, res) => {
  const username = req.body.username;
  const update = { $set: req.body };
  model.Friend.updateOne({ username: username }, update, (err, result) => {
    if (err) res.json(err);
    else res.json(1);
  });
});

//get friend details
Router.post("/getfriend", authenticateToken, async (req, res) => {
  let data = req.body;
  if (data.hasOwnProperty("username") === false) {
    data.username = req.user.username;
  }

  const res1 = await model.Friend.findOne(data);

  res.status(200).json(res1);
});

// add expense
Router.post("/addexpense", authenticateToken, async (req, res) => {
  const data = req.body;
  const newExp = new model.Expense(data);
  await newExp.save();
  res.json(1);
});

// expense information
Router.post("/getexpense", authenticateToken, async (req, res) => {
  let data = req.body;
  data.username = req.user.username;
  const a = await model.Expense.find(data).sort({ date: -1, tDate: -1 });
  res.status(200).json({ data: a });
});

//delete expense
Router.post("/deleteexp", authenticateToken, async (req, res) => {
  const data = await model.Expense.deleteMany(req.body);
  if (data.deletedCount === 2) res.json("Deleted");
  else res.json(-1);
});

//get expense summary
Router.post("/getsummary", authenticateToken, async (req, res) => {
  let data = req.body;
  data.username = req.user.username;
  const res1 = await model.Expense.aggregate([
    { $match: data },
    { $group: { _id: { friend: "$friend" }, total: { $sum: "$amount" } } },
  ]);
  res.json(res1);
});

//get user
Router.post("/getuser", authenticateToken, async (req, res) => {
  const data = req.body;
  model.User.countDocuments(data, (err, result) => {
    if (err) res.json({ result: -1 });
    else res.json({ result });
  });
});

//send friend request
Router.post("/sendfriendrequest", authenticateToken, async (req, res) => {
  const friend = req.body.friend;
  const update = { $set: { pending: req.body.pending } };
  model.Friend.updateOne({ username: friend }, update, (err, result) => {
    if (err) res.json(err);
    else res.json(1);
  });
});

//jwt token authentication
function authenticateToken(req, res, next) {
  if (req.headers.hasOwnProperty("authorization") === false) {
    res.status(403);
  } else {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token === "null") return res.status(403);

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) {
        res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  }
}

module.exports = Router;
