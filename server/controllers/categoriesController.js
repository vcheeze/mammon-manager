const Category = require('../models/category');

const get = (req, res) => {
  Category.find({})
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
    });
};

const getByName = (req, res) => {
  const { categoryName } = req.params;
  Category.findOne({
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

const deleteAll = (req, res) => {
  Category.deleteMany({})
    .then(() => {
      res.status(200).send({
        message: 'Successful: deleted all Categories!'
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err
      });
    });
};

const deleteByName = (req, res) => {
  const { categoryName } = req.params;
  Category.findOneAndDelete({ name: new RegExp(categoryName, 'i') })
    .then(doc => {
      res.status(200).send({
        message: `Successful: deleted ${doc.name}`,
        category: doc
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err
      });
    });
};

module.exports = { get, getByName, create, deleteAll, deleteByName };
