const express = require(`express`);
const multer = require(`multer`);

const router = new express.Router();

const controller = require(`../controllers/login`);


const upload = multer({storage: multer.memoryStorage()});

router
  .post(`/signin`, upload.none(), controller.signin)
  .post(`/signup`, upload.none(), controller.signup);

module.exports = router;
