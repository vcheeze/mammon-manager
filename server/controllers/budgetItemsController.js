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
        .populate('budgetItems.category')
        .then(doc => {
          res.status(201).send({
            message: 'Success: saved new BudgetItem to Budget!',
            budgetItem: doc.budgetItems[doc.budgetItems.length - 1]
          });
        })
        .catch(err => {
          res.status(500).send({
            message: 'Error: could not save BudgetItem to parent Budget',
            error: err
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error: could not retrieve parent Budget',
        error: err
      });
    });

  // budgetItem
  //   .save()
  //   .then(doc => {
  //     console.log(doc);
  //     doc.populate('budget');
  //     doc.populate('category');
  //     res.status(201).send({
  //       message: 'Success: saved new BudgetItem!',
  //       budgetItem: doc
  //     });
  //   })
  //   .catch(err => {
  //     console.error(err);
  //     res.status(500).send({
  //       message: 'Error: could not create BudgetItem',
  //       error: err
  //     });
  //   });
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

// const update = (req, res) => {

// }

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
  const { budgetId, budgetItemId } = req.params;
  Budget.findById(budgetId)
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

  // BudgetItem.deleteByBudgetAndCategory(budgetName, categoryName)
  //   .then(doc => {
  //     res.status(200).send({
  //       message: `Success: deleted ${doc.name}`,
  //       budgetItem: doc
  //     });
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message: 'Error: could not delete BudgetItem by name',
  //       error: err
  //     });
  //   });
};

module.exports = {
  create,
  get,
  getByBudgetAndCategory,
  deleteAll,
  deleteByBudgetAndCategory
};
