const { storeAudio, retrieveAudio } = require("../services/audio.service");

module.exports.index = async (req, res) => {};

module.exports.store = async (req, res) => {
  const errors = [];
  if (!req.file) {
    errors.push({
      msg: "An audio file is required",
      param: "file",
      location: "body",
    });
  }
  if (!req.body.caption) {
    errors.push({
      msg: "Caption is required",
      param: "caption",
      location: "body",
    });
  }

  if (errors.length) {
    return res.status(422).json({ errors });
  }

  // check for existing audio track
  const checkAudio = await retrieveAudio({ caption: req.body.caption });
  if (checkAudio) {
    return res.status(200).json({
      success: false,
      message: "Audio track already exists",
    });
  }

  await storeAudio({
    caption: req.body.caption,
    filename: req.file.filename,
    fileId: req.file.id,
    user: req.body.authUser.id,
  });

  const audio = await retrieveAudio({ caption: req.body.caption });

  res.status(200).json({
    success: true,
    audio,
  });
};

module.exports.edit = async (req, res) => {};

module.exports.destroy = async (req, res) => {};
