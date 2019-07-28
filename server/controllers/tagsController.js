const Tag = require('../models/tag');
const Category = require('../models/category');

const getAllTags = (req, res) => {
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
            console.log(err);
            res.status(500).send({
                message: err
            });
        });
};

const getTagByName = (req, res) => {
    let tagName = req.params.tagName;
    Tag
        .findOne({
            name: tagName
        })
        .populate('category')
        .exec((err, tag) => {
            if (err) console.error(err);
            console.log(`The category is ${tag.category.name}`);
        });
        // .then(doc => {
        //     res.status(200).send({
        //         message: 'Successful: retrieved Tag by name!',
        //         tag: doc
        //     });
        // })
        // .catch(err => {
        //     res.status(500).send({
        //         message: err
        //     });
        // });
}

const createTag = (req, res) => {
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
                    })
                })
                .catch(err => {
                    res.status(500).send({
                        message: err
                    })
                });
        })
        .catch(err => {
            // TODO consider creating new Category if it doesn't exist
            console.log(err);
        });
}

module.exports = { getAllTags, getTagByName, createTag };
