const Budget = require('../models/budget');

const create = (req, res) => {
  const budget = new Budget({
    name: req.body.name,
    period: req.body.period,
    budgetItems: []
  });

  budget
    .save()
    .then(doc => {
      console.log(doc);
      res.status(201).send({
        message: 'Success: saved new Budget!',
        budget: doc
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message: 'Error: could not create Budget',
        error: err
      });
    });
};

const get = (req, res) => {
  Budget.find({})
    .then(doc => {
      res.status(200).send({
        message: 'Success: retrieved all Budgets!',
        budgets: doc
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message: 'Error: could not get all Budgets',
        error: err
      });
    });
};

const getByName = (req, res) => {
  const { budgetName } = req.params;
  Budget.findByName(budgetName)
    .populate('budgetItems.category')
    .then(doc => {
      // doc.populate('budgetItems.category');
      res.status(200).send({
        message: 'Success: retrieved Budget by name!',
        budget: doc
      });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error: could not get Budget by name',
        error: err
      });
    });
};

const getActive = (req, res) => {
  console.log('finding active Budget!');
  Budget.findActive()
    .populate('budgetItems.category')
    .then(doc => {
      res.status(200).send({
        message: 'Success: retrieved active Budget!',
        budget: doc
      });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error: could not find active Budget',
        error: err
      });
    });
  console.log('Done finding active Budget!');
};

const deleteAll = (req, res) => {
  Budget.deleteMany({})
    .then(() => {
      res.status(200).send({
        message: 'Success: deleted all Budgets!'
      });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error: could not delete all Budgets',
        error: err
      });
    });
};

const deleteByName = (req, res) => {
  const { budgetName } = req.params;
  Budget.deleteByName(budgetName)
    .then(doc => {
      res.status(200).send({
        message: `Success: deleted ${doc.name}`,
        budget: doc
      });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error: could not delete Budget by name',
        error: err
      });
    });
};

module.exports = { create, get, getByName, getActive, deleteAll, deleteByName };
