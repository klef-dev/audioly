const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Services
const { createUser } = require("../services/user.service");

module.exports.login = async (req, res) => {};

module.exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ errors: errors.array({ onlyFirstError: true }) });
  }
  let { password } = req.body;
  let hashPassword = await bcrypt.hash(password, 10);
  req.body.password = hashPassword;

  try {
    const user = await createUser(req.body);
    let payload = {
      user: {
        username: user.username,
        id: user.id,
      },
    };
    try {
      const token = jwt.sign(payload, `${process.env.JWT_SECRET}`, {
        expiresIn: "20 days",
      });

      user.token = token;

      return res.status(200).json({
        firstName: user.firstName,
        lastName: user.lastName,
        token: user.token,
        interests: user.interests,
        dob: user.dob,
      });
    } catch (error) {
      return res.status(406).json({ error });
    }
  } catch (err) {
    return res.status(400).json({ err });
  }
};
