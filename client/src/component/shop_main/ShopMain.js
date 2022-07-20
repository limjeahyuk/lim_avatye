import React, { useEffect, useState } from "react";
import axios from 'axios';
import classes from './ShopMain.module.css';
import ShopProduct from "../product/UI/ShopProduct";
import NativeSelectDemo from "../product/UI/NativeSelectDemo";

const ShopMain = ({userId}) => {
    const [data, setData] = useState([{}]);
    const [cartegory, setCartegory] = useState('all');
    
    const onChangeCar = (carte) => {
        setCartegory(carte);
    }
    const sendFullRequest = async () => {
        const response = await axios.get('http://localhost:8080');
        setData(response.data);
    }

    useEffect(() => {
        sendFullRequest();
    }, [cartegory]);

    const filterProduct = data.filter(item => item.proca === cartegory || item.proca2 === cartegory);


    return (<div className={classes.main}>
        <NativeSelectDemo onCartegoryHandler={onChangeCar} />
        <div className={classes.conthead}>상품목록</div>
        <div className={classes.cont}>
        {(cartegory!=='all' ? filterProduct : data).map((item, index) => (
            <ShopProduct
                bool={true}
                key={index}
                cont ={item}
                id={userId}
            />
        ))}
            </div>
    </div>)
}

export default ShopMain;