const Category = require('../models/category');

const get = (req, res) => {
  Category.find({})
    .then(doc => {
      res.status(200).send({
        message: 'Success: got all Categories!',
        categories: doc
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message: 'Error: could not get all Categories',
        error: err
      });
    });
};

const getByName = (req, res) => {
  const { categoryName } = req.params;
  Category.findByName(categoryName)
    .then(doc => {
      res.status(200).send({
        message: 'Success: got Category by name!',
        category: doc
      });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error: could not get Category by name',
        error: err
      });
    });
};

const create = (req, res) => {
  console.log(req.body);
  const category = new Category({
    name: req.body.name
  });

  category
    .save()
    .then(doc => {
      console.log(doc);
      res.status(200).send({
        message: 'Success: saved new Category!',
        category: doc
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message: 'Error: could not create Category',
        error: err
      });
    });
};

const deleteAll = (req, res) => {
  Category.deleteMany({})
    .then(() => {
      res.status(200).send({
        message: 'Success: deleted all Categories!'
      });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error: could not delete all Categories',
        error: err
      });
    });
};

const deleteByName = (req, res) => {
  const { categoryName } = req.params;
  Category.deleteByName(categoryName)
    .then(doc => {
      res.status(200).send({
        message: `Success: deleted ${doc.name}`,
        category: doc
      });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error: could not delete Category',
        error: err
      });
    });
};

module.exports = { get, getByName, create, deleteAll, deleteByName };
