const Tag = require('../models/tag');
const Category = require('../models/category');

const get = (req, res) => {
    Tag
        .find({})
        .populate('category')
        .then(doc => {
            res.status(200).send({
                message: 'Successful: retrieved all Tags!',
                tags: doc
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
    const tagName = req.params.tagName;
    Tag
        .findOne({
            name: tagName
        })
        .populate('category')
        .then(doc => {
            res.status(200).send({
                message: 'Successful: retrieved Tag by name!',
                tag: doc
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err
            });
        });
}

const create = (req, res) => {
    let categoryId;
    Category
        .findOne({
            name: req.body.category
        })
        .then(doc => {
            // console.log(doc);
            categoryId = doc._id;
            
            // create the Tag
            let tag = new Tag({
                name: req.body.name,
                category: categoryId
            });
        
            tag.save()
                .then(doc => {
                    res.status(200).send({
                        message: 'Successful: created new Tag!',
                        tag: doc
                    });
                })
                .catch(err => {
                    console.error(err)
                    res.status(500).send({
                        message: err
                    });
                });
        })
        .catch(err => {
            // TODO consider creating new Category if it doesn't exist
            console.error(err);
        });
}

const deleteAll = (req, res) => {
    Tag.deleteMany({})
        .then(doc => {
            res.status(200).send({
                message: 'Successful: deleted all Tags!'
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err
            });
        });
}

const deleteByName = (req, res) => {
    const tagName = req.params.tagName
    Tag.findOneAndDelete({name: new RegExp(tagName, 'i')})
        .then(doc => {
            res.status(200).send({
                message: `Successful: deleted ${doc.name}`,
                tag: doc
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err
            })
        });
}

module.exports = { get, getByName, create, deleteAll, deleteByName };
