const Category = require('../models/category');

const getAllCategories = (req, res) => {
    Category
        .find({})
        .then(doc => {
            res.status(200).send({
                message: 'Successful: retrieved all Categories!',
                category: doc
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({
                message: err
            });
        })
};

const getCategoryByName = (req, res) => {
    let categoryName = req.params.categoryName
    Category
        .findOne({
            name: categoryName
        })
        .then(doc => {
            res.status(200).send({
                message: 'Successful: retrieved Category by name!',
                category: doc
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err
            });
        });
}

const createCategory = (req, res) => {
    console.log(req.body);
    let category = new Category({
        name: req.body.name,
        tags: []
    });

    category.save()
        .then(doc => {
            console.log(doc);
            res.status(200).send({
                message: 'Successful: saved new Category!',
                category: doc
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({
                message: err
            });
        });
};

module.exports = { getAllCategories, getCategoryByName, createCategory };
