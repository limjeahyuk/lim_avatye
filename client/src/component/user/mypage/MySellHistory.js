import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShopProduct from "../../product/UI/ShopProduct";
import classes from './MySellHistory.module.css'

const MySellHistory = () => {
    const [userSellData, setUserSellData] = useState({
    });

    const { id } = useParams();

    const sendRequest = async () => {
        const response = await axios.get(`http://localhost:8080/pro/${id}`);
        setUserSellData(response.data);
        console.log(response.data);
    };

    useEffect(() => {
        sendRequest();
    },[])


    if (userSellData[0]) {
        return <div className={classes.cont}>
            {userSellData.map((item, index) => (
                <ShopProduct
                    bool={true}
                    key={index}
                    cont={item}
                    id={id}
                />
            ))}
        </div>
    }
}

export default MySellHistory;