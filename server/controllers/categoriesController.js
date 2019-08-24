/* eslint-disable no-param-reassign */
const Category = require('../models/category');

const create = (req, res) => {
  console.log(req.body);
  const category = new Category({
    name: req.body.name
  });

  category
    .save()
    .then(doc => {
      console.log(doc);
      res.status(201).send({
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

const update = (req, res) => {
  const { id } = req.params;
  const { newName } = req.body;
  Category.findById(id)
    .then(doc => {
      doc.name = newName;
      doc
        .save()
        .then(newDoc => {
          res.status(200).send({
            message: `Success: updated name to ${newName}`,
            category: newDoc
          });
        })
        .catch(err => {
          res.status(500).send({
            message: 'Error: unable to update name',
            error: err
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error: unable to find name',
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

module.exports = { create, get, getByName, update, deleteAll, deleteByName };
