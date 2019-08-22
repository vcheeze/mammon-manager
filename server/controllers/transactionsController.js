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
    .populate('tags')
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
  const { budgetId } = req.params;
  Transaction.find({ budget: budgetId })
    .populate('budget')
    .populate('category')
    .populate('tags')
    .then(doc => {
      res.status(200).send({
        message: 'Success: got all Transactions in Budget!',
        transactions: doc
      });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error: could not get Transactions in Budget',
        error: err
      });
    });
};

const getById = (req, res) => {
  const { id } = req.params;
  Transaction.findById(id)
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

const update = (req, res) => {
  console.log('updating...');
  const updateObject = req.body;
  console.log('updateObject :', updateObject);
  const { id } = req.params;
  console.log('id :', id);
  Transaction.update({ _id: ObjectId(id) }, { $set: updateObject })
    .then(doc => {
      res.status(200).send({
        message: `Success: updated ${updateObject.name}`,
        transaction: doc
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message: `Error: could not update ${updateObject.name}`,
        error: err
      });
    });
};

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
  getById,
  update,
  deleteAll,
  deleteAllInBudget,
  deleteByName
};
