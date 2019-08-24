const express = require('express');
const transactionsController = require('../../controllers/transactionsController');

const router = express.Router();

/**
 * Create a Transaction
 */
router.post('/', transactionsController.create);

/**
 * Get all Transactions
 */
router.get('/', transactionsController.get);

/**
 * Get all Transactions in a Budget
 */
router.get('/budget/:budgetId', transactionsController.getAllInBudget);

/**
 * Given Transaction name in the req param, get the Transaction
 */
router.get('/:id', transactionsController.getById);

/**
 * Given Transaction ID in req param, update the Transaction with matching ID
 */
router.patch('/:id', transactionsController.update);

/**
 * Delete all Transactions
 */
router.delete('/', transactionsController.deleteAll);

/**
 * Delete all Transactions in Budget
 */
router.delete('/budget/:budgetId', transactionsController.deleteAllInBudget);

/**
 * Delete Transaction by name
 */
router.delete('/:transactionName', transactionsController.deleteByName);

module.exports = router;
