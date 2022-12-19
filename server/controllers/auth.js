const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const createHttpError = require("http-errors")
const authDB = require("../services/auth")
module.exports = {
  signup: async (req, res) => {
    try {
     await authDB.createUser(req.body)
      res.sendStatus(204)
    } catch (err) {
      console.log(err)
      res.json({ status: "error", error: err });
    }
  },
  signin: async (req, res) => {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (user) {
      const token = jwt.sign(
        {
          email: req.body.email,
        },
        process.env.SECRET_KEY
      );
      return res.json({ status: "ok", user: token });
    } else {
      res.status(400).json("user not found");
    }
  },
  verify: async (req, res, next) => {
    try {
      const accessToken = req.headers.authorization;
      if(!accessToken) throw createHttpError.BadRequest("Access Token is required")
      const isValid = await jwt.verify(accessToken, process.env.SECRET_KEY)
      req.user=isValid
      console.log(isValid,"valid")
      if(!isValid) throw createHttpError.BadRequest("Session Expired")
      next();
    } catch (err) {
      res
        .status(err.status || 500)
        .json(err.message || "Internal Server Error");
    }
  },
};
