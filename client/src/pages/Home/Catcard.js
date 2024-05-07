import React, { useState } from "react";
import classes from '../ProductCard/ProductCard.module.css';
import api from "../../api";

export const CategoriesCard = ({name}) => {
  const [error, setError] = useState('');
  return (
    <div className={classes.card}>
        <h1>{name}</h1>
        {error && <p className={classes.errorMsg}>{error}</p>}
    </div>
  )
}
