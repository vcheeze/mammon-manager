/* eslint-disable no-param-reassign */
const Transaction = require('../models/transaction');

const create = (req, res) => {
  console.log(req.body);
  const transaction = new Transaction({
    name: req.body.name,
    description: req.body.description,
    budgetItem: req.body.budgetItemId,
    amount: req.body.amount,
    date: req.body.date,
    tags: req.body.tags,
    account: req.body.account
  });

  transaction
    .save()
    .then(doc => {
      console.log(doc);
      res.status(201).send({
        message: 'Success: saved new Transaction!',
        transaction: doc
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message: 'Error: could not create Transaction',
        error: err
      });
    });
};

const get = (req, res) => {
  Transaction.find({})
    .then(doc => {
      res.status(200).send({
        message: 'Success: got all Transactions!',
        transaction: doc
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message: 'Error: could not get all Transactions',
        error: err
      });
    });
};

const getByName = (req, res) => {
  const { transactionName } = req.params;
  Transaction.findByName(transactionName)
    .then(doc => {
      res.status(200).send({
        message: 'Success: got Transaction by name!',
        transaction: doc
      });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error: could not get Transaction by name',
        error: err
      });
    });
};

// const update = (req, res) => {};

const deleteAll = (req, res) => {
  Transaction.deleteMany({})
    .then(() => {
      res.status(200).send({
        message: 'Success: deleted all Transactions!'
      });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error: could not delete all Transactions',
        error: err
      });
    });
};

const deleteByName = (req, res) => {
  const { transactionName } = req.params;
  Transaction.deleteByName(transactionName)
    .then(doc => {
      res.status(200).send({
        message: `Success: deleted ${doc.name}`,
        transaction: doc
      });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error: could not delete Transaction',
        error: err
      });
    });
};

module.exports = { create, get, getByName, deleteAll, deleteByName };
