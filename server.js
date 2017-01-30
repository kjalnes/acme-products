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
    Products.deleteProduct(id);
    res.redirect('/products');
});




// EDIT PRODUCT

// pass the selected product object ot the edit product page
app.get('/products/:id/edit', function(req, res, next){
   var id = req.params.id * 1;
   var productToEdit = Products.findProduct(id);
   res.render('edit', { productToEdit });
});

// when update putton is clicked, get input name and pass product object
app.post('/update/:id', function(req, res){
   var newName = req.body.product;
   var id = req.params.id * 1;
   Products.editProduct(id, newName);

   // console.log('newName', newName);
   console.log('id', id);
   console.log('newName', newName);
   console.log('req.params', req.params)
   // console.log(req);
   // res.send('herkjf')
   res.redirect('/products');
});

// hints given vaguesly by proff:
// you may wanna think about using method-override and put or patch
// or you can do somehitng headers



// add a product
app.post('/add', function(req, res) {
  var product = req.body.product;
  Products.addProduct(product);
  res.redirect('/products');
});





app.listen(process.env.PORT, function(){
    console.log('listening on port ' + process.env.PORT)
})
