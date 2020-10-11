const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts_controoler');
router.get('/',postController.posts);
module.exports = router;