const { storeAudio, retrieveAudio } = require("../services/audio.service");

module.exports.index = async (req, res) => {};

module.exports.store = async (req, res) => {
  // check for existing audio track
  const checkAudio = await retrieveAudio(req.body.caption);
  if (checkAudio) {
    return res.status(200).json({
      success: false,
      message: "Audio track already exists",
    });
  }

  const audio = await storeAudio({
    caption: req.body.caption,
    filename: req.file.filename,
    fileId: req.file.id,
  });

  res.status(200).json({
    success: true,
    audio,
  });
};

module.exports.edit = async (req, res) => {};

module.exports.destroy = async (req, res) => {};
