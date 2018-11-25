const express = require(`express`);
const multer = require(`multer`);
const router = new express.Router();
const controller = require(`../controllers/comments`);

const upload = multer();

router.get(`/:postId`, controller.getComments);
router.post(`/:postId`, upload.none(), controller.saveComment);

module.exports = router;
