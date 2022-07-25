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
        console.log(response.data)
    }

    useEffect(() => {
        sendFullRequest();
    }, [cartegory]);

    // const filterProduct = data.filter(item => item.cartegory.indexOf(cartegory) !== -1);

    if (data) {
    return (<div className={classes.main}>
        <NativeSelectDemo onCartegoryHandler={onChangeCar} />
        <div className={classes.conthead}>상품목록</div>
        <div className={classes.cont}>
            {(cartegory === 'all' && data).map((item, index) => {

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