const express = require('express');
const router = express.Router();

/**
 * Gets all transactions
 */
router.get('/', (req, res) => {
    res.status(200).send({
        message: 'successful: get all tags!'
    });
});

module.exports = router;