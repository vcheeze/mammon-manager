const BudgetItem = require('../models/budgetItem');

const create = (req, res) => {
  const budgetItem = new BudgetItem({
    budget: req.body.budgetId,
    category: req.body.categoryId,
    allotted: req.body.allotted,
    actual: req.body.actuals
  });

  budgetItem
    .save()
    .then(doc => {
      console.log(doc);
      res.status(201).send({
        message: 'Success: saved new BudgetItem!',
        budgetItem: doc
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message: 'Error: could not create BudgetItem',
        error: err
      });
    });
};

const get = (req, res) => {
  BudgetItem.find({})
    .then(doc => {
      res.status(200).send({
        message: 'Success: retrieved all BudgetItems!',
        budgetItems: doc
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message: 'Error: could not get all BudgetItems',
        error: err
      });
    });
};

const getByBudgetAndCategory = (req, res) => {
  const { budgetName, categoryName } = req.params;
  BudgetItem.findByBudgetAndCategory(budgetName, categoryName)
    .then(doc => {
      res.status(200).send({
        message: 'Success: retrieved BudgetItem by name!',
        budgetItem: doc
      });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error: could not get BudgetItem by name',
        error: err
      });
    });
};

const deleteAll = (req, res) => {
  BudgetItem.deleteMany({})
    .then(() => {
      res.status(200).send({
        message: 'Success: deleted all BudgetItems!'
      });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error: could not delete all BudgetItems',
        error: err
      });
    });
};

const deleteByBudgetAndCategory = (req, res) => {
  const { budgetName, categoryName } = req.params;
  BudgetItem.deleteByBudgetAndCategory(budgetName, categoryName)
    .then(doc => {
      res.status(200).send({
        message: `Success: deleted ${doc.name}`,
        budgetItem: doc
      });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error: could not delete BudgetItem by name',
        error: err
      });
    });
};

module.exports = {
  create,
  get,
  getByBudgetAndCategory,
  deleteAll,
  deleteByBudgetAndCategory
};
