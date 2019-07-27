const express = require('express');
const router = express.Router();
const budgetsController = require('../../controllers/budgetsController');

/**
 * Get all Accounts
 */
router.get('/', budgetsController.getAllBudgets);

/**
 * Given Account name in the req param, get the account
 */
router.get('/:budgetName', budgetsController.getBudgetByName);

/**
 * Create a budget
 */
router.post('/', budgetsController.createBudget);

module.exports = router;
