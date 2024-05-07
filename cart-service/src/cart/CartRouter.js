const { getUserCartProducts, addToCart, removeFromCart } = require('./CartController');

const router = require('express').Router();

router.post('/', addToCart);

router.delete('/', removeFromCart);

router.get('/:userId', getUserCartProducts);


module.exports = router;