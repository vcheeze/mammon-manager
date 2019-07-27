const express = require('express');
const router = express();

// import api routes
const budgetsRouter = require('./budgets');
const categoriesRouter = require('./categories');
// const transactionsRouter = require('./transactions');
// const tagsRouter = require('./tags');
// const accountsRouter = require('./accounts');

router.use('/budgets', budgetsRouter);
router.use('/categories', categoriesRouter);
// router.use('/transactions', transactionsRouter);
// router.use('/tags', tagsRouter);
// router.use('/accounts', accountsRouter);

module.exports = router;
