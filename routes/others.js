const express = require(`express`);
const router = new express.Router();
const controller = require(`../controllers/index`);

router.get(`/`, controller.getIndex);
router.get(`/profile`, controller.getProfile);
router.get(`/notifications`, controller.getNotifications);
router.get(`/docs`, controller.getDocs);
router.get(`/signin`, controller.signin);
router.get(`/signup`, controller.signup);

module.exports = router;
