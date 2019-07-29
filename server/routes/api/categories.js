const express = require('express');
const categoriesController = require('../../controllers/categoriesController');

const router = express.Router();

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
