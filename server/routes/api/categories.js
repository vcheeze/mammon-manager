const express = require('express');
const router = express.Router();
const categoriesController = require('../../controllers/categoriesController');

/**
 * Get all Categories
 */
router.get('/', categoriesController.getAllCategories);

/**
 * Given Category name in the req param, get the Category
 */
router.get('/:CategoryName', categoriesController.getCategoryByName);

/**
 * Create a Category
 */
router.post('/', categoriesController.createCategory);

module.exports = router;
