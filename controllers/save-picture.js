const fs = require(`fs`);

const _getFileExtension = (mimetype) => {
  return mimetype.split(`/`)[1];
};

const _getPictureUrl = (fileData) => {
  const uniqueValue = Date.now();
  const fileExt = _getFileExtension(fileData.mimetype);
  const filename = `${uniqueValue}.${fileExt}`;

  return `uploads/${filename}`;
};

const _getPicturePath = (url) => {
  return `${process.cwd()}/assets/${url}`;
};

const savePicture = (req, res, next) => {
  const fileData = req.file;

  if (fileData) {
    const pictureUrl = _getPictureUrl(fileData);
    const picturePath = _getPicturePath(pictureUrl);
    const pictureContent = fileData.buffer;

    fs.writeFile(picturePath, pictureContent, {encoding: `binary`}, (err) => {
      if (err) {
        next(err);
      } else {
        req.pictureUrl = pictureUrl;
        next();
      }
    });
  }
};

module.exports = savePicture;
