const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');
const path = require('path');
const Products = require('./product.model');
const bodyParser = require("body-parser");
// const routes = require('./routes');

nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true,
    noCache: true
});

// we are gonne use methodOverride for the delete methods and the put methods (add)
// create a static route for any calls to a file that exist in node_modules (we need bootstrap.js)
// specify where its located with built in module path
app.use( express.static(path.join(__dirname, 'node_modules')));
// app.use('/vendor' express.static(path.join(__dirname, 'node_modules')));

app.use(methodOverride("_method"));

// this allows us to call req.body in products.js
app.use(bodyParser.urlencoded({ extended: false }));


app.set('view engine', 'html');
app.engine('html', nunjucks.render);


// routes
app.get('/', function(req, res, next){
    res.render('index');
})

app.get('/products', function(req, res, next) {
    // console.log(Products.getProducts());
    res.render('products', { title: 'Products', products: Products.getProducts() });
});

app.get('/add', function(req, res, next) {
    res.render('add');
});

// delete product

app.delete('/products/:id', function(req, res, next){
    var id = req.params.id * 1;
    // console.log(id);
    Products.deleteProduct(id);
    // console.log(Products.getProducts());
    res.redirect('/products');
});


// add a product

app.post('/add', function(req, res) {
  var product = req.body.product;
  // var text = req.body.text;
  Products.addProduct(product);
  res.redirect('/products');
});


// edit a product



app.listen(process.env.PORT, function(){
    console.log('listening on port ' + process.env.PORT)
})
