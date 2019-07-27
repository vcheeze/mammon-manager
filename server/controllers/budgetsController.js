const Budget = require('../models/budget');

const getAllBudgets = (req, res) => {
    Budget
        .find({})
        .then(doc => {
            res.status(200).send({
                message: 'Successful: retrieved all budgets!',
                budgets: doc
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({
                message: err
            });
        })
};

const getBudgetByName = (req, res) => {
    let budgetName = req.params.budgetName
    Budget
        .findOne({
            name: budgetName
        })
        .then(doc => {
            res.status(200).send({
                message: 'Successful: retrieved budget by name!',
                budget: doc
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err
            });
        });
}

const createBudget = (req, res) => {
    let budget = new Budget({
        name: req.body.name,
        period: req.body.period,
        budgetItems: []
    });

    budget.save()
        .then(doc => {
            console.log(doc);
            res.status(200).send({
                message: 'Successful: saved new budget!',
                budget: doc
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({
                message: err
            });
        });
};

module.exports = { getAllBudgets, getBudgetByName, createBudget };