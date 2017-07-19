var express = require('express');
var mongodb = require('mongodb').MongoClient;
var adminRouter = express.Router();

var books = [
    {
        title: 'War and Peace',
        genre: 'historical',
        author: 'Lev Tolstoy',
        read: false
    },
    {
        title: 'Frodo',
        genre: 'fantasy',
        author: 'J.K.Rolling',
        read: false
    },
    {
        title: 'Harry Potter',
        genre: 'fantasy child',
        author: 'Tolkin',
        read: false
    },
    {
        title: 'Wild Hurt',
        genre: 'psycho',
        author: 'John Eldrech',
        read: false
    },
    {
        title: 'Bible',
        genre: 'religion',
        author: 'St. Spirit',
        read: false
    }
];

var router = function (nav) {

    adminRouter.route('/addBooks').get(function (req, res) {
        var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('books');
            collection.insertMany(books, function (err, results) {
                res.send(results);
                db.close();
            });
        });
    });

    return adminRouter;
};

module.exports = router;