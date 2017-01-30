// simialr to tweetBank.js file
var _products = [
    {
        name: 'pizza',
        id: 1
    },
    {
        name: 'burger',
        id: 2
    },
    {
        name: 'fish',
        id: 3
    }
];

module.exports = {
    getProducts : function(){
        return _products;
    },
    deleteProduct : function(id){
        var products = this.getProducts();
        var itemToDelete = products.filter(function(product){
           return product.id === id;
        })[0];

        var index = products.indexOf(itemToDelete);
        this.getProducts().splice(index, 1);
    },
    addProduct : function(product) {
        var products = this.getProducts();
        var newProduct = {name : product}
        var max = products.reduce( (memo, product)=> {
        if(product.id > memo)
            memo = product.id;
            return memo;
        }, 0);

        newProduct.id = ++max;
        _products.push(newProduct);
    },
    findProduct : function(id) {
        var products = this.getProducts();
        return products.filter(function(product){
            return product.id === id;
        })[0];
    },
    editProduct : function(id, newName) {
        _products = _products.map(function(product){
            if(product.id === id) {
                product.name = newName;
            }
            return product;
        });
    }
}
