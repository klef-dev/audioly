const mongoose = require("mongoose");
const {
  storeAudio,
  retrieveAudio,
  getAllAudio,
} = require("../services/audio.service");

const url = process.env.MONGO_URI;
const connect = mongoose.createConnection(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;

connect.once("open", () => {
  // initialize stream
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: "uploads",
  });
});

module.exports.index = async (req, res) => {
  const audioTracks = await getAllAudio();
  res.status(200).json(audioTracks);
};

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
    return res.status(400).json({
      error: "Audio track already exists",
    });
  }

  await storeAudio({
    caption: req.body.caption,
    filename: req.file.filename,
    fileId: req.file.id,
    user: req.body.authUser.id,
  });

  const audio = await retrieveAudio({ caption: req.body.caption });

  res.status(201).json(audio);
};

module.exports.show = (req, res) => {
  gfs.find({ filename: req.params.filename }).toArray((err, files) => {
    if (!files[0] || files.length === 0) {
      return res.status(400).json({
        error: "No files available",
      });
    }

    if (files[0].contentType === "audio/mpeg") {
      // render audio to browser
      gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    } else {
      res.status(404).json({
        error: "Not an auido file",
      });
    }
  });
};

module.exports.edit = async (req, res) => {};

module.exports.destroy = async (req, res) => {};
