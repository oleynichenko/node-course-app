const express = require(`express`);
const router = new express.Router();
const controller = require(`../controllers/index`);

router.get(`/`, controller.getIndex);
router.get(`/profile`, controller.getProfile);
router.get(`/notifications`, controller.getNotifications);
router.get(`/docs`, controller.getDocs);

module.exports = router;
