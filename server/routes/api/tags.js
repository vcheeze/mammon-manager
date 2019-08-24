const express = require('express');
const tagsController = require('../../controllers/tagsController');

const router = express.Router();

/**
 * Gets all Tags
 */
router.get('/', tagsController.get);

/**
 * Get Tag by name
 */
router.get('/:tagName', tagsController.getByName);

/**
 * Create a Tag
 */
router.post('/', tagsController.create);

/**
 * Update Tag
 */
router.patch('/', tagsController.update);

/**
 * Delete all Tags
 */
router.delete('/', tagsController.deleteAll);

/**
 * Delete Tag by name
 */

router.delete('/:tagName', tagsController.deleteByName);

module.exports = router;
