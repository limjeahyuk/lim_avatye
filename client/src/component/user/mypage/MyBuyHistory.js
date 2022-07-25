import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShopProduct from '../../product/UI/ShopProduct'
import classes from './MyBuyHistory.module.css'

const MyBuyHistory = () => {
    const [userBuyData, setUserBuyData] = useState();

    const { id } = useParams();

    const sendRequest = async () => {
        const response = await axios.get(`http://localhost:8080/mypage/${id}`);
        setUserBuyData(response.data);
        console.log(response.data)
    };

    useEffect(() => {
        sendRequest();

    },[])

if(userBuyData){
    return <div className={classes.cont}>
        {userBuyData.map((item, index) => (
            <div>
                <ShopProduct
                    bool={false}
                    key={index}
                    cont ={item}
                    id={id}
                />
            </div>
        ))}
        
    </div>
    }
}

export default MyBuyHistory;