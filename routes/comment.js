const express = require(`express`);
const multer = require(`multer`);
const router = express.Router();
const controller = require(`../controllers/comment`);

const upload = multer();

router.get(`/:commentId`, controller.getComment);
router.delete(`/:commentId`, controller.deleteComment);
router.patch(`/:commentId`, upload.none(), controller.editComment);

module.exports = router;
