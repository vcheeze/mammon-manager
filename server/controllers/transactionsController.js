/* eslint-disable no-param-reassign */
const Transaction = require('../models/transaction');
const Budget = require('../models/budget');

const create = (req, res) => {
  const transaction = new Transaction({
    name: req.body.name,
    description: req.body.description,
    budget: req.body.budgetId,
    category: req.body.categoryId,
    amount: req.body.amount,
    date: req.body.date,
    tags: req.body.tags,
    account: req.body.account
  });

  transaction
    .save()
    .then(doc => {
      // update corresponding BudgetItem
      Budget.findOneAndUpdate(
        {
          _id: doc.budget,
          'budgetItems.category': doc.category
        },
        { $inc: { 'budgetItems.$.actual': doc.amount } }
      )
        // TODO modify the 'then' and 'catch' functions
        .then(budget => console.log(budget))
        .catch(err => console.error(err));

      Transaction.populate(doc, 'category', err => {
        if (err) return;
        res.status(201).send({
          message: 'Success: saved new Transaction!',
          transaction: doc
        });
      });
    })
    .catch(err => {
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
      res.status(500).send({
        message: 'Error: could not get all Transactions',
        error: err
      });
    });
};

const getAllInBudget = (req, res) => {
  console.log('getting all in budget...');
  const { budgetId } = req.params;
  console.log(budgetId);
  Transaction.find({ budget: budgetId })
    .populate('budget')
    .populate('category')
    .then(doc => {
      console.log(doc);
      res.status(200).send({
        message: 'Success: got all Transactions in Budget!',
        transactions: doc
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message: 'Error: could not get Transactions in Budget',
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

const deleteAllInBudget = (req, res) => {
  const { budgetId } = req.params;
  Transaction.deleteMany({ budget: budgetId })
    .then(doc => {
      Budget.findById(budgetId).then(budget => {
        budget.resetActual();
      });
      res.status(200).send({
        message: 'Success: deleted all Transactions in Budget!',
        doc
      });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error: could not delete all Transactions in Budget',
        error: err
      });
    });
};

const deleteByName = (req, res) => {
  const { transactionName } = req.params;
  Transaction.deleteByName(transactionName)
    .then(doc => {
      Budget.findOneAndUpdate(
        {
          _id: doc.budget,
          'budgetItems.category': doc.category
        },
        { $inc: { 'budgetItems.$.actual': -doc.amount } }
      )
        // TODO modify the 'then' and 'catch' functions
        .then(budget => console.log(budget))
        .catch(err => console.error(err));

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

module.exports = {
  create,
  get,
  getAllInBudget,
  getByName,
  deleteAll,
  deleteAllInBudget,
  deleteByName
};
