const Cart = require("./Cart");

const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cartExist = await isExist(userId, productId);
    if (cartExist) {
      const cart = await Cart.findOneAndUpdate(
        { userId, productId },
        { quantity: cartExist.quantity + 1 },
        { new: true }
      );
      res.status(200).json(cart);
    } else {
      const cart = await Cart.create({ userId, productId });
      res.status(201).json(cart);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({message: err.message});
  }
};

const isExist = async (userId, productId) => {
  return await Cart.findOne({ userId, productId });
};

const getUserCartProducts = async (req, res) => {
  const { userId } = req.params;
  const cart = await Cart.find({ userId });
  res.status(200).json(cart);
};

const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cart = await Cart.findOneAndDelete({ userId, productId });
    res.status(200).json({message: 'Removed product from cart'});
  } catch (err) {
    console.log(err);
    res.status(400).json({message: err.message});
  }
};

module.exports = {
  addToCart,
  getUserCartProducts,
  removeFromCart,
};
