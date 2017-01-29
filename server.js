const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');
const path = require('path');
const Products = require('./product.model');
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


app.set('view engine', 'html');
app.engine('html', nunjucks.render);


// routes
app.get('/', function(req, res, next){
    res.render('index');
})

app.get('/products', function(req, res, next){
    console.log(Products.getProducts())
    res.render('products', { title: 'Products', products: Products.getProducts() });
})

app.delete('/products/:id', function(req, res, next){

    var id = req.params.id * 1;
    console.log(id);
    Products.deleteProduct(id)
    res.redirect('/products');
})

app.listen(process.env.PORT, function(){
    console.log('listening on port ' + process.env.PORT)
})
