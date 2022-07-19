import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from './Item.module.css';
import OrderModal from "./OrderModal.js"

const Item = ({name}) => {
    const [itemData, setItemData] = useState({});
    const [count, setCount] = useState(0);
    const [orderState, setOrderState] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const { id } = useParams();

    const sendRequest = async () => {
        const response = await axios.get(`http://localhost:8080/item/${id}`);
        setItemData(response.data);
        console.log(response.data);
    }

    useEffect(() => {
        sendRequest();
    }, []);

    const countHandler = (e) => {
        setCount(e.target.value);
    }

    const inputZeroHandler = () => {
        setCount('');
    }

    const userRequest = async () => {
        const response = await axios.get(`http://localhost:8080/email/${name}`);
        if (response.data[0].email === null) {
            console.log("null");
            setUserEmail('');
            setEmailAddress('');
        } else {
            setUserEmail(response.data[0].email.split('@')[0]);
            setEmailAddress(response.data[0].email.split('@')[1]);
        }
    }

    // 구매버튼 눌렀을 때
    const buySubmitHandler = (e) => {
        setOrderState(true)
        e.preventDefault();
        userRequest();
    }

    const onChangeHandler = () => {
        setOrderState(false);
    }

    return <>
        {orderState && <OrderModal
            onConfirm={onChangeHandler}
            proid={id}
            username={name}
            count={count}
            pemail={userEmail}
            pemailAddress={emailAddress}
        />}
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
                    <div className={classes.tag}>
                        <div className={classes.car}>{itemData[0].proca}</div>
                        {itemData[0].quantity === 0 && <div className={classes.no}>품절</div>}
                        {itemData[0].username === name && <div className={classes.my}>MY</div>}
                    </div>
                    <div className={classes.itemcont}>{itemData[0].procont}</div>
                    <div className={classes.info}>
                        <div>가격 : {itemData[0].price} 원</div>
                        <div>남은 수량 : {itemData[0].quantity}개</div>
                        {name ?
                            <form className={classes.buy} onSubmit={buySubmitHandler}>
                                <input
                                    type="number"
                                    min="1"
                                    max={itemData[0].quantity}
                                    value={count}
                                    onChange={countHandler}
                                    onClick={inputZeroHandler}
                                    disabled={itemData[0].quantity !== 0 ? false : true}
                                />
                                <button type="submit" disabled={itemData[0].quantity !== 0 ? false : true}>구매</button>
                            </form> :
                            <div className={classes.alrt}>로그인 먼저 해주세요</div>}
                        {itemData[0].quantity === 0 && <div>품절입니다</div>}
                    </div>
                </div>
        </div>}
    </>
     
   
}

export default Item;