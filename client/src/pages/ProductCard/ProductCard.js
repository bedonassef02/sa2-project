import React, { useState } from "react";
import classes from './ProductCard.module.css';
import api from "../../api";

export const ProductCard = ({details, isShoppingCart, setLatestProductAddedToCart}) => {
  const [error, setError] = useState('');
  const {name, price, description} = details;

  const addToCartHandler = async (event, data) => {
    event.preventDefault();
    const userId = localStorage.getItem("userId");
    const cartObj = {
      productId: data?._id,
      userId,
    };
    await api.addProductToCart(cartObj).then(res => {
      setLatestProductAddedToCart(res?.data);
    }).catch(err => {
      setError(err?.response?.data?.message || 'The Shopping cart Service is under maintenance and it will be back soon!, Thanks for your patience!!');
    });
  };

  return (
    <div className={classes.card}>
        <h1>{name}</h1>
        <p className={classes.price}>{price}</p>
        <p>{description}</p>
        {!isShoppingCart && <p><button className={classes.addToCart} onClick={(e) => addToCartHandler(e, details)}>Add to Cart</button></p>}
        {error && <p className={classes.errorMsg}>{error}</p>}
    </div>
  )
}
