// simialr to tweetBank.js file
var _products = [
    {
        id: 1,
        name: 'moon'
    },
    {
        id: 2,
        name: 'corny'
    },
    {
        id: 3,
        name: 'nancy'
    }
];

module.exports = {
    getProducts : function(){
        return _products;
    },
    deleteProduct : function(id){
        console.log('id', id);
        var products = this.getProducts();

        var itemToDelete = products.filter(function(product){
           return product.id === id;
        })[0];

        var index = products.indexOf(itemToDelete);

        console.log('index', index)
        console.log('itemToDelete', itemToDelete);

        this.getProducts().splice(index, 1);
    }
}
