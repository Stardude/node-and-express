var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

//key: BeTb8mVLwrcE9DNcx8iDlA
//secret: ArjeBjOF7FPC3ZKm3Pz4mDWyHjRdG8vydKJ7Vp3JSw

var app = express();
var nav = [
    {Link: '/books', Text: 'Books'},
    {Link: '/authors', Text: 'Authors'}
];
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({secret: 'library', resave: true, saveUninitialized: true}));
require('./src/config/passport')(app);

app.set('views', './src/views');

app.set('view engine', 'ejs');

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: "Hello from render",
        nav: [
            {Link: '/books', Text: 'Books'},
            {Link: '/authors', Text: 'Authors'}]
    });
});

app.get('*', function (req, res) {
    res.end('There is no such page');
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Server is listening on port ' + port);
});