// getting necessary modules
const express =  require('express');
const hbs = require('hbs');

// creating express application
var app = express();

// setting default view engine
app.set('view engine', 'hbs');

// registering Partials
hbs.registerPartials(__dirname + '/views/partials');

// registering Helper for fetching Current Year 
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

// registering Helper - screamIt to caplitalize the input
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// express middleware - for maintenance
/*
app.use((req, res, next) => {
    res.render('maintenance');
    next();
});
*/

// express middleware - for static page
app.use(express.static(__dirname + '/public'));

// express middleware - server log
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    next();
});

// home route
app.get('/', (req, res) => {
    res.render('home', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website',
    });
});

// about route
app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About Page'
    });
});

// bad route
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

// starting the server
app.listen(3000, () => {
    console.log('Server is up on the port 3000.');
});