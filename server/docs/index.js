const info = require("./info");
const user = require("./user");
const audio = require("./audio");
const definitions = require("./definitions");

module.exports = {
  ...info,
  tags: [
    {
      name: "User",
      description: "Includes login, register etc.",
    },
    {
      name: "Audio",
      description: "All audio endpoints",
    },
  ],
  host:
    process.env.NODE_ENV === "production"
      ? "audioly.studio"
      : `127.0.0.1:${process.env.PORT || 3333}`,
  basePath: "/api",
  schemes: ["https", "http"],
  paths: {
    ...user,
    ...audio,
  },
  definitions: { ...definitions },
  securityDefinitions: {
    APIKeyHeader: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
    },
  },
};
