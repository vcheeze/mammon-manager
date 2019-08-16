const express = require('express');
const transactionsController = require('../../controllers/categoriesController');

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
 * Given Transaction name in the req param, get the Transaction
 */
router.get('/:transactionName', transactionsController.getByName);

/**
 * Delete all Transactions
 */
router.delete('/', transactionsController.deleteAll);

/**
 * Delete Transaction by name
 */
router.delete('/:transactionName', transactionsController.deleteByName);

module.exports = router;
