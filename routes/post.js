const express = require(`express`);
const multer = require(`multer`);
const router = express.Router();
const controller = require(`../controllers/post`);

const upload = multer({storage: multer.memoryStorage()});

router.post(`/`, upload.single(`picture`), controller.savePost);

router.get(`/`, controller.getPosts);

router.get(`/:postId`, controller.getPost);
router.patch(`/:postId`, upload.single(`picture`), controller.editPost);
router.delete(`/:postId`, controller.deletePost);

module.exports = router;
