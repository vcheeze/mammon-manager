const { budgetItem: BudgetItem } = require('../models/budgetItem');
const Budget = require('../models/budget');

const create = (req, res) => {
  const budgetItem = new BudgetItem({
    budget: req.body.budgetId,
    category: req.body.categoryId,
    allotted: req.body.allotted
  });

  Budget.findById(budgetItem.budget)
    .then(budget => {
      budget.budgetItems.push(budgetItem);
      budget
        .save()
        .then(doc => {
          Budget.populate(doc, 'budgetItems.category', err => {
            if (err) return;
            res.status(201).send({
              message: 'Success: saved new BudgetItem to Budget!',
              budgetItem: doc.budgetItems[doc.budgetItems.length - 1]
            });
          });
        })
        .catch(err => {
          console.error('error creating budgetItem: ', err);
          res.status(500).send({
            message: 'Error: could not save BudgetItem to parent Budget',
            error: err
          });
        });
    })
    .catch(err => {
      console.error('error retrieving budget: ', err);
      res.status(500).send({
        message: 'Error: could not retrieve parent Budget',
        error: err
      });
    });
};

const get = (req, res) => {
  BudgetItem.find({})
    .populate('budget')
    .populate('category')
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

const update = (req, res) => {
  const { id } = req.params;
  const bi = req.body;
  console.log(id);
  console.log(bi);
  Budget.findOneAndUpdate(
    {
      _id: bi.budgetId,
      'budgetItems._id': id
    },
    {
      $set: {
        'budgetItems.$.category': bi.categoryId,
        'budgetItems.$.allotted': bi.allotted
      }
    },
    { new: true },
    (err, doc) => {
      if (err) console.error(err);
      Budget.populate(doc, 'budgetItems.category', e => {
        if (e) return;
        console.log(doc.budgetItems[doc.budgetItems.length - 1]);
        res.status(200).send({
          message: 'Success: updated BudgetItem!',
          budgetItem: doc.budgetItems[doc.budgetItems.length - 1]
        });
      });
    }
  );
};

const deleteAllInBudget = (req, res) => {
  const { budgetName } = req.params;
  Budget.findByName(budgetName)
    .then(budget => {
      budget.budgetItems.remove();
      budget.save((err, doc) => {
        if (err) {
          res.status(500).send({
            message: 'Error: could not delete BudgetItem from parent Budget',
            error: err
          });
          return;
        }
        res.status(200).send({
          message: 'Success: deleted BudgetItem from parent Budget',
          budget: doc
        });
      });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error: could not delete all BudgetItems in Budget',
        error: err
      });
    });
};

const deleteByBudgetAndCategory = (req, res) => {
  const { budgetName, budgetItemId } = req.params;
  Budget.findByName(budgetName)
    .populate('budgetItems.category')
    .then(budget => {
      budget.budgetItems.id(budgetItemId).remove();
      budget.save((err, doc) => {
        if (err) {
          res.status(500).send({
            message: 'Error: could not delete BudgetItem from parent Budget',
            error: err
          });
          return;
        }
        res.status(200).send({
          message: 'Success: deleted BudgetItem from parent Budget',
          budget: doc
        });
      });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error: could not get parent Budget by Id',
        error: err
      });
    });
};

module.exports = {
  create,
  get,
  getByBudgetAndCategory,
  update,
  deleteAllInBudget,
  deleteByBudgetAndCategory
};
