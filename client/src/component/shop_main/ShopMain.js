import React, { useEffect, useState } from "react";
import axios from 'axios';
import classes from './ShopMain.module.css';
import ShopProduct from "./ShopProduct";
import NativeSelectDemo from "./NativeSelectDemo";

const ShopMain = () => {
    const [data, setData] = useState([{}]);
    
    const sendFullRequest = async () => {
        const response = await axios.get('http://localhost:8080');
        setData(response.data);
    }

    useEffect(() => {
        sendFullRequest();
    }, []);


    return (<div className={classes.main}>
        <NativeSelectDemo />
        <div className={classes.conthead}>상품목록</div>
        <div className={classes.cont}>
        {data.map((item, index) => (
            <ShopProduct
                key={index}
                pdid={item.proid}
                userid={item.userid}
                img={item.proimg}
                name={item.proname}
                carte={item.proca}
                price={item.price}
                count={item.quantity}
            />
        ))}
            </div>
    </div>)
}

export default ShopMain;