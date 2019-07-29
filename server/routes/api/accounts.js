const express = require('express');

const router = express.Router();
const accountsController = require('../../controllers/accountsController');

/**
 * Given Account name in the req param, get the account
 */
router.get('/:accountName', accountsController.getAccountByName);
/**
 * Get all Accounts
 */
router.get('/', accountsController.getAllAccounts);

// router.post('/', accountsController);

module.exports = router;
