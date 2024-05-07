import React, { useEffect, useState } from "react";
import classes from "./Home.module.css";
import { ProductCard } from "../ProductCard/ProductCard";
import { useHistory } from "react-router-dom";
import api from "../../api";

export const Home = ({ setIsAuthenticated }) => {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [productError, setProductError] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartError, setCartError] = useState(false);
  const [weather, setWeather] = useState("");
  const [weatherError, setWeatherError] = useState(false);
  const [latestProductAddedToCart, setLatestProductAddedToCart] = useState();
  const logoutHandler = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    history.push("/");
  };

  useEffect(async () => {
    await api
      .getAllProducts()
      .then((products) => {
        setProducts(products?.data?.data);
      })
      .catch((err) => {
        console.log("products err", err);
        setProductError(
          err?.response?.data?.message ||
            "The Products Service is under maintenance and it will be back soon!, Thanks for your patience!!"
        );
      });
  }, []);

  useEffect(async () => {
    const userId = localStorage.getItem("userId");
    await api
      .getProductsFromCart(userId)
      .then((cart) => {
        const cartProducts = cart?.data?.data;
        const result = cartProducts?.map(
          ({ productId }) =>
            products?.find((product) => productId === product?._id) || false
        );
        setCart(result);
      })
      .catch((err) => {
        console.log("cart err", err);
        setCartError(
          err?.response?.data?.message ||
            "The shopping cart Service is under maintenance and it will be back soon!, Thanks for your patience!!"
        );
      });
  }, [products, latestProductAddedToCart]);

  useEffect(async () => {
    await api
      .getWeather()
      .then((weather) => {
        console.log("weather", weather);
        setWeather(weather?.data?.value);
      })
      .catch((err) => {
        console.log("weather err", err);
        setWeatherError(
          err?.response?.data?.message ||
            "The Weather Service is under maintenance and it will be back soon!, Thanks for your patience!!"
        );
      });
  }, []);

  return (
    <>
      <span>Weather</span>
      <p className={classes.weather}>
        {weatherError && <p className={classes.errorMsg}>{weatherError}</p>}
        {!weatherError && weather}
      </p>
      <span>Products</span>
      <div className={classes.container}>
        {productError && <p className={classes.errorMsg}>{productError}</p>}
        {!productError &&
          (products?.length > 0 ? (
            products.map(({ _id, name, price, description }, index) => (
              <ProductCard
                key={index}
                details={{ _id, name, price, description }}
                setLatestProductAddedToCart={setLatestProductAddedToCart}
              />
            ))
          ) : (
            <p className={classes.notFound}>No Products found.</p>
          ))}
      </div>
      <span>Shopping Cart</span>
      <div className={classes.container}>
        {cartError && <p className={classes.errorMsg}>{cartError}</p>}
        {!cartError &&
          (cart?.length > 0 ? (
            cart.map(({ _id, name, price, description }, index) => (
              <ProductCard
                isShoppingCart={true}
                key={index}
                details={{ _id, name, price, description }}
              />
            ))
          ) : (
            <p className={classes.notFound}>No Products found in your cart.</p>
          ))}
      </div>
      <button className={classes.logout} onClick={logoutHandler}>
        Logout
      </button>
    </>
  );
};
