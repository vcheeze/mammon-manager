const express = require('express');
const categoriesController = require('../../controllers/categoriesController');

const router = express.Router();

/**
 * Get all Categories
 */
router.get('/', categoriesController.get);

/**
 * Given Category name in the req param, get the Category
 */
router.get('/:categoryName', categoriesController.getByName);

/**
 * Create a Category
 */
router.post('/', categoriesController.create);

/**
 * Delete all Categories
 */
router.delete('/', categoriesController.deleteAll);

/**
 * Delete Category by name
 */
router.delete('/:categoryName', categoriesController.deleteByName);

module.exports = router;
