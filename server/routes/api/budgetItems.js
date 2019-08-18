const express = require('express');
const budgetItemsController = require('../../controllers/budgetItemsController');

const router = express.Router();

/**
 * Create a BudgetItem
 */
router.post('/', budgetItemsController.create);

/**
 * Get all BudgetItems
 */
router.get('/', budgetItemsController.get);

/**
 * Given Category name in the req param, get the BudgetItem
 */
router.get(
  '/:budgetName/:categoryName',
  budgetItemsController.getByBudgetAndCategory
);

/**
 * Given old and new BudgetItem names, update old to new
 */
// router.patch('/', budgetItemsController.update);

/**
 * Delete all BudgetItems in a Budget
 */
router.delete('/:budgetName', budgetItemsController.deleteAllInBudget);

/**
 * Delete BudgetItem by name
 */
router.delete(
  '/:budgetName/:budgetItemId',
  budgetItemsController.deleteByBudgetAndCategory
);

module.exports = router;
