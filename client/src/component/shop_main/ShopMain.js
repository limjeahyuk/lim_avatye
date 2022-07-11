import React, { useEffect, useState } from "react";
import axios from 'axios';
import classes from './ShopMain.module.css';

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
            <div className={classes.item} key={index}>
                <div className={classes.imgbox}>
                    <img src={item.proimg} alt="game_img"></img>
                </div>
                <div className={classes.into}>
                    <div>{item.proname}</div>
                    <div>{item.proca} </div>
                    <div>{item.price}원</div>
                </div>
            </div>
        ))}
    </div>)
}

export default ShopMain;