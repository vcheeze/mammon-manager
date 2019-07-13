const express = require('express');
const router = express.Router();
let accountModel = require('../../models/account');

router.get('/', (req, res) => {
    let account = new accountModel({
        name: 'Liv.',
        bankName: 'Emirates NBD',
        initialAmount: 0,
        currentAmount: 0
    });

    account.save()
        .then(doc => {
            console.log(doc);
            res.status(200).send({
                message: 'successful: saved new account'
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({
                message: err
            });
        });
});

module.exports = router;