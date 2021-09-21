const { check, param } = require("express-validator");
const User = require("../models/user");

module.exports.registerRequest = () => {
  const isValidUser = async (value) => {
    const username = await User.findOne({ username: value });
    if (username) {
      return Promise.reject("Username already in use");
    }
  };

  return [
    check("firstName", "First name is required").exists().isString(),
    check("lastName", "Lastname is required").exists().isString(),
    check("password", "Password is required").exists().isString(),
    check("dob", "Date of birth is required").exists().isString(),
    check("username", "Username is required")
      .exists()
      .isString()
      .custom(isValidUser),
    check("interests", "Interest should be an array").optional().isArray(),
  ];
};
