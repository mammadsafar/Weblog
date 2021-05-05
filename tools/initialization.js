const fs = require("fs");
const path = require("path");

module.exports = (function () {
  fs.existsSync(path.join(__dirname, "../public/images")) ||    fs.mkdirSync(path.join(__dirname, "../public/images"));

  fs.existsSync(path.join(__dirname, "../public/images/avatars")) ||    fs.mkdirSync(path.join(__dirname, "../public/images/avatars"));

  fs.existsSync(path.join(__dirname, "../public/articles")) ||    fs.mkdirSync(path.join(__dirname, "../public/articles"));

  fs.existsSync(path.join(__dirname, "../public/images/background_cover")) ||    fs.mkdirSync(path.join(__dirname, "../public/images/background_cover"));

  fs.existsSync(path.join(__dirname, "../public/articles/images")) ||    fs.mkdirSync(path.join(__dirname, "../public/articles/images"));

  fs.existsSync(path.join(__dirname, "../public/articles/profiles")) ||    fs.mkdirSync(path.join(__dirname, "../public/articles/profiles"));

  fs.existsSync(path.join(__dirname, "../public/articles/text")) ||    fs.mkdirSync(path.join(__dirname, "../public/articles/text"));
  
})();