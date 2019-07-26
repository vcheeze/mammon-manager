const Budget = require('../models/budget');

const createBudget = (req, res) => {
    console.log(req.body);
    let budget = new Budget({
        name: req.body.name,
        period: req.body.period,
        budgetItems: []
    });

    budget.save()
        .then(doc => {
            console.log(doc);
            res.status(200).send({
                message: 'successful: saved new budget!',
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

module.exports = { createBudget };