const path = require("path");

const absolutePath = basePath =>
  path.resolve(__dirname, "..", "..", `app/javascript/${basePath}`);

module.exports = {
  alias: {
  },
  extensions: [
    ".ts",
    ".mjs",
    ".js",
    ".sass",
    ".scss",
    ".css",
    ".module.sass",
    ".module.scss",
    ".module.css",
    ".png",
    ".svg",
    ".gif",
    ".jpeg",
    ".jpg",
  ],
};
