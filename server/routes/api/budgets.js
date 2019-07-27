const express = require('express');
const router = express.Router();
const budgetsController = require('../../controllers/budgetsController');

/**
 * Get all Budgets
 */
router.get('/', budgetsController.getAllBudgets);

/**
 * Given Budget name in the req param, get the Budget
 */
router.get('/:budgetName', budgetsController.getBudgetByName);

/**
 * Create a Budget
 */
router.post('/', budgetsController.createBudget);

module.exports = router;
