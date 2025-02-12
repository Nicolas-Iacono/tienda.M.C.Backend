const express = require('express');
const likeController = require('../controllers/likes/likeController');

const router = express.Router();

router.post('/', likeController.likeProduct);
router.delete('/', likeController.unlikeProduct);
router.get('/products/:id/likes', likeController.countLikes);
router.get('/products/:id/likes/:userId', likeController.hasLiked);
router.get('/mylikes/:userId', likeController.getUserLikesWithProducts);
module.exports = router;
