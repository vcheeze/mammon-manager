const express = require('express');
const router = express.Router();
const budgetsController = require('../../controllers/budgetsController');

/**
 * Given Account name in the req param, get the account
 */
// router.get('/:accountName', budgetsController.getAccountByName);
/**
 * Get all Accounts
 */
// router.get('/', budgetsController.getAllAccounts);

/**
 * Create a budget
 */
router.post('/', budgetsController.createBudget);

module.exports = router;
