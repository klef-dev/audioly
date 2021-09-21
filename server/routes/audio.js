const { Router } = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const router = Router();

// Controllers
const { store, index, show } = require("../controllers/audio.controller");

module.exports = (upload) => {
  router
    .post("/", upload.single("file"), isLoggedIn, store)
    .get("/", index)
    .get("/:filename", show);

  return router;
};
