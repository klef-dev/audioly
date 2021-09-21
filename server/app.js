const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const GridFsStorage = require("multer-gridfs-storage");
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const swaggerUI = require("swagger-ui-express");

// Routes
const userRoute = require("./routes/user");
const audioRoute = require("./routes/audio");

// Docs
const docs = require("./docs");

const app = express();

// Connection to MongoDB
(async () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

  try {
    await mongoose.connect(process.env.MONGO_URI, options);
    console.log(`Database connection successful`);
  } catch (error) {
    console.log(`Error connecting to DB`, error);
    return process.exit(1);
  }
})();

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(methodOverride("_method"));

// create storage engine
const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

app.use("/api/audio", audioRoute(upload));
app.use("/api/user", userRoute);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.use("/docs", swaggerUI.serve, swaggerUI.setup(docs));

app.use("/", (req, res) => {
  res.redirect(301, "/docs");
});

module.exports = app;
