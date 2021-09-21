const { Router } = require("express");
const mongoose = require("mongoose");
const isLoggedIn = require("../middleware/isLoggedIn");
const router = Router();

// Controllers
const { store, index } = require("../controllers/audio.controller");

module.exports = (upload) => {
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

  router.post("/", upload.single("file"), isLoggedIn, store).get("/", index);

  return router;
};
