import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShopProduct from "../UI/ShopProduct";
import classes from "./Category.module.css";

const Category = () => {
    const [data, setData] = useState([{}])

    const { name } = useParams();

    const sendRequest = async() => {
        const response = await axios.get(`http://localhost:8080/category/${name}`);
        setData(response.data);
        console.log(response.data)
    }

    useEffect(() => {
        sendRequest();
    },[name])

    return <div className={classes.box}>
        <div className={classes.cont}>{data.map((item, index) => (
                <ShopProduct
                bool={true}
                key={index}
                cont={item}
            />
            ))}
        </div>
        </div>
}

export default Category