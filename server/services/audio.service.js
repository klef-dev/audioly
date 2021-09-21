const Audio = require("../models/audio");

module.exports.getAllAudio = async () => {
  return await Audio.find({}).populate("user");
};

module.exports.storeAudio = async (payload) => {
  const newAudio = new Audio(payload);

  return await newAudio.save();
};

module.exports.retrieveAudio = async (payload) => {
  return await Audio.findOne(payload).populate("user");
};

module.exports.deleteAudio = async (id) => {
  return await Audio.deleteOne({ id });
};
