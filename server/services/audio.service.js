const Audio = require("../models/audio");

module.exports.storeAudio = async (payload) => {
  return await Audio.create(payload);
};

module.exports.retrieveAudio = async (id) => {
  return await Audio.findOne({ id });
};

module.exports.deleteAudio = async (id) => {
  return await Audio.deleteOne({ id });
};
