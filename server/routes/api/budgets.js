const express = require('express');

const router = express.Router();
const budgetsController = require('../../controllers/budgetsController');

/**
 * Get all Budgets
 */
router.get('/', budgetsController.get);

/**
 * Given Budget name in the req param, get the Budget
 */
router.get('/:budgetName', budgetsController.getByName);

/**
 * Create a Budget
 */
router.post('/', budgetsController.create);

/**
 * Delete all Budgets
 */
router.delete('/', budgetsController.deleteAll);

/**
 * Delete Budget by name
 */
router.delete('/:categoryName', budgetsController.deleteByName);

module.exports = router;
