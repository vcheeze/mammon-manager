const express = require('express');
const router = express();
// import api routes
// const transactionsRouter = require('./transactions');
// const categoriesRouter = require('./categories');
// const tagsRouter = require('./tags');
// const accountsRouter = require('./accounts');
const budgetsRouter = require('./budgets');

// router.use('/transactions', transactionsRouter);
// router.use('/categories', categoriesRouter);
// router.use('/tags', tagsRouter);
// router.use('/accounts', accountsRouter);
router.use('/budgets', budgetsRouter);

module.exports = router;