const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
require("dotenv").config();

exports.createUser = async (req, res) => {
  try {
    let newUser = await User.create(req.body);
    res.json({ message: "User created", newUser });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    const validate = await bcrypt.compare(password, user.password);
    if (user && validate) {
      const token = jwt.sign(
        { email: user.email, _id: user._id },
        process.env.JWT_SECRET
      );
      res.json({ token });
    } else {
      res.status(401).json({ error: " Vos identifiants sont invalides" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
