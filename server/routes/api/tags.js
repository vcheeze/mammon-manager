const express = require('express');
const router = express.Router();
const tagsController = require('../../controllers/tagsController');

/**
 * Gets all Tags
 */
router.get('/', tagsController.getAllTags);

/**
 * Get Tag by name
 */
router.get('/:tagName', tagsController.getTagByName);

/**
 * Create a Tag
 */
router.post('/', tagsController.createTag);

module.exports = router;
