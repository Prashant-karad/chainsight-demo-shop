const sharp = require("sharp");
const request = require("request");

// Download a seller's photo and make a 400 px thumbnail.
module.exports.thumbnail = (url) =>
  new Promise((resolve, reject) =>
    request({ url, encoding: null }, (err, res, body) =>
      err ? reject(err) : sharp(body).resize(400).toBuffer().then(resolve, reject)));
