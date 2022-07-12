import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from './Item.module.css';

const Item = () => {
    const [itemData, setItemData] = useState({});

    const { id } = useParams();

    const sendRequest = async () => {
        const response = await axios.get(`http://localhost:8080/item/${id}`);
        setItemData(response.data);
        console.log(response.data);
    }

    useEffect(() => {
        sendRequest();
    }, []);

    const buySubmitHandler = (e) => {
        e.preventDefault();
    }


    return <>
        <div className={classes.header}>상세페이지</div>
    {itemData[0] &&
            <div className={classes.item}>
                <div className={classes.head}>
                    <h1>{itemData[0].proname}</h1>
                    <p>판매자 : {itemData[0].usernick}</p>
                </div>
                <div className={classes.imgbox}>
                    <img src={itemData[0].proimg} alt="사진"></img>
                </div>
                <div className={classes.cont}>
                    <div className={classes.car}>{itemData[0].proca}</div>
                    <div className={classes.itemcont}>{itemData[0].procont}</div>
                    <div className={classes.info}>
                        <div>가격 : {itemData[0].price} 원</div>
                        <div>남은 수량 : {itemData[0].quantity}개</div>
                    </div>
                    
                </div>
                <form className={classes.buy} onSubmit={buySubmitHandler}>
                    <input type="number" min="1" max={itemData[0].quantity} />
                    <button type="submit">구매</button>
                </form>
        </div>}
    </>
     
   
}

export default Item;