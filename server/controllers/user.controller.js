const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Services
const { createUser, retrieveUser } = require("../services/user.service");

module.exports.login = async (req, res) => {
  const logInData = req.body;
  const user = await retrieveUser({ username: logInData.username });

  if (user) {
    const isPasswordMatching = await bcrypt.compare(
      logInData.password,
      user.password
    );
    if (isPasswordMatching) {
      //create token
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
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          token: user.token,
        });
      } catch (error) {
        return res.status(406).json({ error });
      }
    } else {
      return res.status(404).send({
        error: "Username or password maybe incorrect",
      });
    }
  } else {
    return res.status(404).send({
      error: "This user does not exist or username & password maybe incorrect",
    });
  }
};

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
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        token: user.token,
      });
    } catch (error) {
      return res.status(406).json({ error });
    }
  } catch (err) {
    return res.status(400).json({ err });
  }
};
