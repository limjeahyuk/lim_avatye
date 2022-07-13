import React, { useEffect, useState } from "react";
import axios from 'axios';
import classes from './ShopMain.module.css';
import ShopProduct from "./ShopProduct";

const ShopMain = () => {
    const [data, setData] = useState([{}]);
    
    const sendFullRequest = async () => {
        const response = await axios.get('http://localhost:8080');
        setData(response.data);
    }

    useEffect(() => {
        sendFullRequest();
    }, []);


    return (<div className={classes.cont}>
        {data.map((item, index) => (
            <ShopProduct
                key={index}
                pdid={item.proid}
                userid={item.userid}
                img={item.proimg}
                name={item.proname}
                carte={item.proca}
                price={item.price}
            />
        ))}
    </div>)
}

export default ShopMain;