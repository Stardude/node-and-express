

var goodreadsService = function () {
    var getBookById = function (id, callback) {
        callback(null, {description: "Our Description"});
    };

    return {
        getBookById: getBookById
    };
};

module.exports = goodreadsService;