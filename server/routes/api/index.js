const express = require('express');
const router = express();
const transactionsRouter = require('./transactions');
const tagsRouter = require('./tags');

router.use('/transactions', transactionsRouter);
router.use('/tags', tagsRouter);

module.exports = router;