const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');
const path = require('path');
const Products = require('./product.model');
const bodyParser = require('body-parser');

nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true,
    noCache: true
});

// create a static route for any calls to a file that exist in node_modules (i.e need bootstrap.js)
app.use( express.static(path.join(__dirname, 'node_modules')));

// this allows us to call req.body in products.js
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

// access routes in routes folder
const routes = require('./routes/product.routes');
app.use('/', routes);

const port = process.env.PORT || 3000;

app.listen(process.env.PORT, function(){
    console.log('listening on port ' + process.env.PORT)
})
