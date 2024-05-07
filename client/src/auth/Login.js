import React, { useState } from "react";
import classes from "./Login.module.css";
import { useHistory } from "react-router-dom";
import api from "../api";

export const Login = ({ setIsAuthenticated }) => {
  const history = useHistory();
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
//////////////////////////////////////////////////////////////////////////

  const handleCh = (ev) => {
    const name = ev.target.name;
    const value = ev.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
////////////////////////////////////////////////////////////////////////
{/*************************SIGNUP******************************************/}
  const handleSignUp = async(e)=>{
    await api
    .userRegsiter(inputs)
    .then((res) => {
      console.log("user auth", res);
    })
    .catch((err) => {
      setError(
        err?.response?.data?.message ||
          "The Authentication Service is under maintenance and it will be back soon!, Thanks for your patience!!"
      );
    })
    .finally(() => setIsLoading(false));
  }
  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    await api
      .userAuthenticate(inputs)
      .then((res) => {
        console.log("user auth", res);
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("userId", res?.data?.id);
        setInputs(null);
        setIsAuthenticated(true);
        history.push("/products");
      })
      .catch((err) => {
        setError(
          err?.response?.data?.message ||
            "The Authentication Service is under maintenance and it will be back soon!, Thanks for your patience!!"
        );
      })
      .finally(() => setIsLoading(false));
  };

  return (<>
  
    <form className={classes.formContainer} onSubmit={handleSubmit}>
      <h1>Sign In</h1>
      <label className={classes.label}>
        <span className={classes.labelText}>Username:</span>
        <input
          className={classes.input}
          type="text"
          name="email"
          onChange={handleChange}
          autoComplete="off"
          required
        />
      </label>
      <label className={classes.label}>
        <span className={classes.labelText}>Password:</span>
        <input
          className={classes.input}
          type="password"
          name="password"
          onChange={handleChange}
          autoComplete="off"
          required
        />
      </label>
      <input className={classes.submit} type="submit" />
      {error && <p className={classes.errorMsg}>{error}</p>}
      {isLoading && <p>isLoading ... </p>}
    </form>
    <br>
    </br>
  {/*******************************************************************/}
    <form className={classes.formContainer} onSubmit={handleSignUp}>
      <h1>Sign Up</h1>
      <label className={classes.label}>
        <span className={classes.labelText}>Username:</span>
        <input
          className={classes.input}
          type="text"
          name="email"
          onChange={handleCh}
          autoComplete="off"
          required
        />
        <span className={classes.labelText}>name:</span>
        <input
          className={classes.input}
          type="text"
          name="name"
          onChange={handleCh}
          autoComplete="off"
          required
        />
      </label>
      <label className={classes.label}>
        <span className={classes.labelText}>Password:</span>
        <input
          className={classes.input}
          type="password"
          name="password"
          onChange={handleCh}
          autoComplete="off"
          required
        />
      </label>
      <input className={classes.submit} type="submit" />
      
    </form></>
  );
};
