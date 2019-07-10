const express = require('express');
const router = express();
// import api routes
const transactionsRouter = require('./transactions');
const categoriesRouter = require('./categories');
const tagsRouter = require('./tags');

router.use('/transactions', transactionsRouter);
router.use('/categories', categoriesRouter);
router.use('/tags', tagsRouter);

module.exports = router;