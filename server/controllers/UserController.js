const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
require("dotenv").config({ path: path.join(__dirname, '../.env') });

const { User, validate } = require("../models/User");
const Blacklist = require("../models/Blacklist");

exports.signup_user = async (req, res) => {
  if (req.user) return res.redirect('/');
  let msg = {};
  try {
      let profile = { username: req.body.username,
                      email: req.body.email,
                      password: req.body.password };
      const { error } = validate(profile);
      if (error) {
          if (error.details[0].context.label == "username") {
              msg.user = "Username must be greater than 2 characters and less than 12.";
          }
          if (error.details[0].context.label == "email") {
              msg.email = "Must be a valid email address."
          }
          if (error.details[0].context.label == "password") {
              msg.password = "Password needs to be at least 8 characters long and include at least 1 of: symbol, number, uppercase, and lowercase letter."
          }
          return res.status(422).json({ msg });
      }

      profile.password = await bcrypt.hash(req.body.password, Number(process.env.SALT))
      const user = await User.create(profile);
      res.status(201).send({user});
  } catch (error) {
      // Username and email is guaranteed to be unique because of schema
      // Code will only reach this point if User.create(profile) fails
      msg.user = "Username & Email must not be taken.";
      res.status(409).json({ msg });
  }
};

exports.login_user = async (req, res) => {
    if (req.user) return res.redirect('/');
    let msg = {};
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            msg.user = "Invalid username or email.";
            return res.status(422).json({ msg });
        }

        const password = await bcrypt.compare(req.body.password, user.password);
        if (!password) {
            msg.password = "Incorrect password.";
            return res.status(422).json({ msg });
        }

        const token_payload = {_id: user._id, username: user.username, isAdmin: user.isAdmin};
        const token = jwt.sign(token_payload, process.env.JWT_KEY,{ expiresIn: "1d" });
        res.cookie('jwt', token, {'httpOnly': true});
        res.status(200).send({token});
    } catch (error) {
        msg.other = "Server error.";
        res.status(500).json({ msg });
    }
};

exports.logout_user = async (req, res) => {
    // will only make it to this point if passed auth middleware
    try {
        // Convert time from Unix epoch from seconds to milliseconds
        const date = new Date(req.user.exp*1000)
        // We don't need to blacklist the token anymore after it expires
        await Blacklist.create({token: req.cookies.jwt, expireAt: date});
        // Tell user to delete cookie
        res.clearCookie('jwt');
        res.send("User Signed Out.");
    } catch (error) {
        res.status(500).json({msg: error});
    }
};
