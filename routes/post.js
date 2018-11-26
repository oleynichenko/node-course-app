const express = require(`express`);
const passport = require(`passport`);
const multer = require(`multer`);
const router = new express.Router();
const controller = require(`../controllers/post`);
const savePicture = require(`../controllers/save-picture`);

const upload = multer({storage: multer.memoryStorage()});

router.use(passport.authenticate(`jwt`, {session: false}));

router.post(`/`, upload.single(`picture`), savePicture, controller.savePost);

router.get(`/`, controller.getPosts);

router.get(`/:postId`, controller.getPost);
router.patch(`/:postId`, upload.single(`picture`), savePicture, controller.editPost);
router.delete(`/:postId`, controller.deletePost);

module.exports = router;
