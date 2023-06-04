// Acquire modules
const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const port=process.env.PORT || 8000;

//  built-in middleware
const staticPath = path.join(__dirname, 'templates/views');
const partialsPath = path.join(__dirname, 'templates/partials');

// set view engine to hbs
app.set('view engine', 'hbs');
app.set('views', staticPath);
hbs.registerPartials(partialsPath);

app.use(express.static(staticPath));  // access static files like HTML,CSS & JS   


// hbs (template engine) route
app.get('/', (req, res) => {
    res.render('index')
})
app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/weather', (req, res) => {
    res.render('weather')
})
app.get('*', (req, res) => {
    res.render('404')
})

app.listen(port, () => console.log('server started'))
