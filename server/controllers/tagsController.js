const Tag = require('../models/tag');

const create = (req, res) => {
  // create the Tag
  const tag = new Tag({
    name: req.body.name
  });

  tag
    .save()
    .then(doc => {
      res.status(201).send({
        message: 'Success: created new Tag!',
        tag: doc
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message: 'Error: could not create Tag',
        error: err
      });
    });
};

const get = (req, res) => {
  Tag.find({})
    .then(doc => {
      res.status(200).send({
        message: 'Success: got all Tags!',
        tags: doc
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message: 'Error: could not get all Tags',
        error: err
      });
    });
};

const getByName = (req, res) => {
  const { tagName } = req.params;
  Tag.findByName(tagName)
    .then(doc => {
      res.status(200).send({
        message: 'Success: retrieved Tag by name!',
        tag: doc
      });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error: could not get Tag by name',
        error: err
      });
    });
};

const deleteAll = (req, res) => {
  Tag.deleteMany({})
    .then(() => {
      res.status(200).send({
        message: 'Success: deleted all Tags!'
      });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error: could not delete all Tags',
        error: err
      });
    });
};

const deleteByName = (req, res) => {
  const { tagName } = req.params;
  Tag.deleteByName(tagName)
    .then(doc => {
      res.status(200).send({
        message: `Success: deleted ${doc.name}`,
        tag: doc
      });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error: could not delete Tag by name',
        error: err
      });
    });
};

module.exports = { create, get, getByName, deleteAll, deleteByName };
