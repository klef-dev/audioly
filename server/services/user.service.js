const User = require("../models/user");

module.exports.createUser = async (payload) => {
  return await User.create(payload);
};

module.exports.retrieveUser = async (id) => {
  return await User.findOne({ id });
};
