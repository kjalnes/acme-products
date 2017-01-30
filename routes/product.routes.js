const router = require('express').Router();
const Products = require('../product.model');

// ROUTES
router.get('/', function(req, res, next){
    res.render('index');
})

router.get('/products', function(req, res, next) {
    res.render('products', { title: 'Products', products: Products.getProducts() });
});

router.get('/products/add', function(req, res, next) {
    res.render('add');
});

// DELETE PRODUCT
router.delete('/products/:id', function(req, res, next){
    var id = req.params.id * 1;
    Products.deleteProduct(id);
    res.redirect('/products');
});

// EDIT PRODUCT
// 1. pass the selected product object ot the edit product page
router.get('/products/:id/edit', function(req, res, next){
   var id = req.params.id * 1;
   var productToEdit = Products.findProduct(id);
   res.render('edit', { productToEdit });
});

// 2. when update putton is clicked, get input name and edit product in db
router.post('/update/:id', function(req, res){
   var newName = req.body.product;
   var id = req.params.id * 1;
   Products.editProduct(id, newName);
   res.redirect('/products');
});

// ADD PRODUCT
router.post('/add', function(req, res) {
  var product = req.body.product;
  Products.addProduct(product);
  res.redirect('/products');
});

module.exports = router;
