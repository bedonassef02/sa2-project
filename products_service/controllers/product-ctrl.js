const Product = require('../models/product-model');

getProducts = async (req, res) => {
    await Product.find({}, (err, products) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        
        return res.status(200).json({ success: true, data: products });
    }).catch(err => console.log(err));
}

checkServiceRunning = (req, res) => {
    res.send('Hello World! - from products service');
}

module.exports = {
    getProducts,
    checkServiceRunning
}