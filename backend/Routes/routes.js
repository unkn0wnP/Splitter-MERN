const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendConfirmationMail } = require("../../frontend/src/services/email");
const model = require("../model/schema");

require("dotenv").config();

//email confirmation
Router.get("/verify/:confirmationcode", async (req, res) => {
  const data = await model.User.findOne({
    confirmationcode: req.params.confirmationcode,
  });

  if (!data) {
    res.status(404).json("user not found.");
  } else {
    data.status = "Active";
    data.save((err) => {
      if (err) {
        res.status(500).json(err);
      }
    });
  }
});

//register
Router.post("/register", async (req, res) => {
  const data = await model.User.countDocuments({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  });
  if (data !== 0) {
    res.status(400).json("Username or Email is already in use.");
  } else {
    sendConfirmationMail(
      req.body.username,
      req.body.email,
      req.body.confirmationcode
    );

    let userData = req.body;

    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);

    const newUser = new model.User(userData);
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
  } else if (data.status !== "Active") {
    res
      .status(400)
      .json("Account verification is pending. Please Verify Your Email!");
  } else {
    const validCred = await bcrypt.compare(req.body.password, data.password);
    if (!validCred) {
      res.status(400).json("Invalid password.");
    } else {
      const user = { username: req.body.username };

      //JSON web token
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);
      res.json({ accessToken: accessToken });
    }
  }
});

//Profile
Router.get("/profile", authenticateToken, async (req, res) => {
  const username = req.user.username;

  const data = await model.User.findOne({ username: username });

  res.status(200).json(data);
});

//update user password
Router.post("/updatepassword", authenticateToken, async (req, res) => {
  const username = req.user.username;

  const data = await model.User.findOne({ username: username });

  const validCred = await bcrypt.compare(req.body.password, data.password);
  if (!validCred) {
    res.status(400).json("Incorrect current password.");
  } else {
    const salt = await bcrypt.genSalt(10);
    const newPass = await bcrypt.hash(req.body.newpassword, salt);

    const update = { $set: { password: newPass } };
     model.User.updateOne({ username: username }, update, (err, result) => {
      if (err) {
        res
          .status(400)
          .json("Something went wrong!!!\nFailed to update password.");
      } else res.status(200).json("Password updated successfully.");
    });
  }
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
