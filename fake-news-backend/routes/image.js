var express = require('express');
var imageRouter = express.Router();
var fs = require('file-system');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

imageRouter.post('/upload', function (req, res) {
  var { fileName, fileExt } = req.body;

  if (!fileName || !fileExt)
    res.json({ 'error': 'The name and the extension of the file is mandatory' });

  var creationDate = new Date();
  var finalName = fileName + '' + creationDate.getTime() + '.' + fileExt;
  var { data } = req.body;

  if (!data)
    res.json({ "error": "Is necesary upload a image" });

  var finalImage = data.replace(/^data:image\/\w+;base64,/, "");
  var buf = new Buffer(finalImage, 'base64');
  fs.writeFile(finalName, buf);

  var imageRelatedData = {};

  client.webDetection(finalName).then(results => {
    const webDetection = results[0].webDetection;

    if (webDetection.fullMatchingImages.length) {
      imageRelatedData.fullMatchingImages = [];
      webDetection.fullMatchingImages.forEach(image => {
        imageRelatedData.fullMatchingImages.push(
          { 'url': image.url, 'score': image.score, 'listType' : 'grayList' }
        );
      });
    }

    if (webDetection.partialMatchingImages.length) {
      imageRelatedData.partialMatchingImages = [];

      webDetection.partialMatchingImages.forEach(image => {
        imageRelatedData.partialMatchingImages.push(
          { 'url': image.url, 'score': image.score, 'listType' : 'grayList' }
        );
      });
    }

    res.json({ 'data': imageRelatedData });
  }).catch(err => {
    res.json({ 'error': err })
  });
})

module.exports = imageRouter;