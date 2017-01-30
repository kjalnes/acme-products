// simialr to tweetBank.js file
var _products = [
    {
        name: 'moon',
        id: 1
    },
    {
        name: 'corny',
        id: 2
    },
    {
        name: 'nancy',
        id: 3
    }
];

module.exports = {
    getProducts : function(){
        return _products;
    },
    deleteProduct : function(id){
        // console.log('id', id);
        var products = this.getProducts();

        var itemToDelete = products.filter(function(product){
           return product.id === id;
        })[0];

        var index = products.indexOf(itemToDelete);

        // console.log('index', index)
        // console.log('itemToDelete', itemToDelete);

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
        console.log(_products);
    }
}
