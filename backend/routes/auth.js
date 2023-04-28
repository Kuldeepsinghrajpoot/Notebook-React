const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

const fatchuser = require("../middleware/fatchuser");
// using the jwt for session token
var jwt = require("jsonwebtoken");
// for encryption of password using this method here
var bcrypt = require("bcryptjs");
// user = require("../models/User");
// create user using post and doesn't require auth

//  this is salt
const jwt_secrit = "hellobradar@hellobradar";

// user validation input user input valid or not using express and node
router.post("/createuser",
  [
    body("name", "enter valid name").isLength({ min: 3 }),
    body("email", "enter the valid email").isEmail(),
    body("password", "enter the min 3 length").isLength({ min: 5 }),
  ],

  // created user using async funtion then all function's data is loaded than it will fire
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // finding the email form the database and check this is registered or not if then send a message to use
    let user = await User.findOne({ email: req.body.email });  
    try {
      if (user) {
        return res.status(400).json({ errors: "Email already used" });
      }

      // using the authentication of user and the hash value for storing to the database
      var salt = await bcrypt.genSaltSync(10);
      var hash = await bcrypt.hashSync(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      var token = jwt.sign(data, jwt_secrit);
      res.json({ token });
    } catch (e) {
      console.log({ errors: "Internal some errors" });
    }

  });

 // user login end point
router.post("/login",
  [
    body("email", "enter the valid email").isEmail(),
    body("password", "enter the min 3 length").exists(),
  ],

  // created user using async funtion then all function's data is loaded than it will fire
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    let user = await User.findOne({ email });
    try {
      if (!user) {
        return res.status(400).json({ errors: "enter correct cradential" });
      }

      const passwordCompair = await bcrypt.compare(password, user.password);

      if (!passwordCompair) {
        return res.status(400).json({ errors: "enter correct cradential" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authenticToken = jwt.sign(data, jwt_secrit);

      res.json({ authenticToken });
    } catch (e) {
      console.log({ errors: e.message });
    }
  }
);

// get user details from database
router.post("/getuser", fatchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

});
module.exports = router;
