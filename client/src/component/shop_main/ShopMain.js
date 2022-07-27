import React, { useEffect, useState } from "react";
import axios from 'axios';
import classes from './ShopMain.module.css';
import ShopProduct from "../product/UI/ShopProduct";

const ShopMain = ({userId}) => {
    const [data, setData] = useState([{}]);
    
    const sendFullRequest = async () => {
        const response = await axios.get('http://localhost:8080');
        setData(response.data);
        console.log(response.data)
    }

    useEffect(() => {
        sendFullRequest();
    }, []);


    if (data) {
    return (<div className={classes.main}>
        {/* <div className={classes.conthead}>상품목록</div> */}
        <div className={classes.cont}>
            {data.map((item, index) => {
                return(
                <ShopProduct
                    bool={true}
                    key={index}
                    cont={item}
                    id={userId}
                    />
                    )
    })}
            </div>
    </div>)
        }
}

export default ShopMain;