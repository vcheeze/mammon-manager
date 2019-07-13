const Account = require('../models/account');

const getAccountByName = (req, res) => {
    let accountName = req.params.accountName;
    Account
        .findOne({
            name: accountName
        })
        .then(doc => {
            res.status(200).send({
                message: 'Successful: retrieved account',
                doc: doc
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err
            });
        });
};

const getAllAccounts = (req, res) => {
    Account
        .find({})
        .then(doc => {
            res.status(200).send({
                message: 'Successful: retrieved all accounts',
                doc: doc
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err
            })
        });
};

const createAccount = (req, res) => {
    let account = new Account({
        name: req.body.name,
        bankName: req.body.name,
        initialAmount: req.body.initialAmount,
        currentAmount: req.body.currentAmount
    });

    // account.save()
    //     .then(doc => {
    //         console.log(doc);
    //         res.status(200).send({
    //             message: 'successful: saved new account'
    //         });
    //     })
    //     .catch(err => {
    //         console.error(err);
    //         res.status(500).send({
    //             message: err
    //         });
    //     });
};

module.exports = { getAccountByName, getAllAccounts };