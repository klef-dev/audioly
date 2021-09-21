const User = require("../models/user");

module.exports.createUser = async (payload) => {
  return await User.create(payload);
};

module.exports.retrieveUser = async (payload) => {
  return await User.findOne(payload).select("+password");
};
