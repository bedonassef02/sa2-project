import React, { useEffect, useState } from "react";
import classes from "./Home.module.css";
import { useHistory,Link } from "react-router-dom";
import api from "../../api";


export const AddCat = ({ setIsAuthenticated }) => {
    const history = useHistory();
    const [name, setname] = useState("");


    return(
        <>
        <div className={classes.container}>
            <h1>Add Category</h1>
            <form>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    placeholder="Enter Category Name"
                />
                <button type="submit">Add Category</button>
            </form>
        </div>
        </>
    )
}