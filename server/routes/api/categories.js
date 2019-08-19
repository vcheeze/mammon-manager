const express = require('express');
const categoriesController = require('../../controllers/categoriesController');

const router = express.Router();

/**
 * Create a Category
 */
router.post('/', categoriesController.create);

/**
 * Get all Categories
 */
router.get('/', categoriesController.get);

/**
 * Given Category name in the req param, get the Category
 */
router.get('/:categoryName', categoriesController.getByName);

/**
 * Update Category
 */
router.patch('/', categoriesController.update);

/**
 * Delete all Categories
 */
router.delete('/', categoriesController.deleteAll);

/**
 * Delete Category by name
 */
router.delete('/:categoryName', categoriesController.deleteByName);

module.exports = router;
