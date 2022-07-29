import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../../store/auth-context";
import classes from './Item.module.css';
import OrderModal from "./OrderModal.js"

const Item = () => {
    const [itemData, setItemData] = useState({});
    const [count, setCount] = useState(0);
    const [orderState, setOrderState] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [cart, setCart] = useState([]);
    const { id } = useParams();

    const ctx = useContext(AuthContext);
    const navigagte = useNavigate();

    const sendRequest = async () => {
        const response = await axios.get(`http://localhost:8080/item/${id}`);
        setItemData(response.data);
        console.log(response.data[0].cartegory.split(','));
        setCart(response.data[0].cartegory.split(','))
    }

    useEffect(() => {
        sendRequest();
    },[]);

    const countHandler = (e) => {
        setCount(e.target.value);
    }

    const inputZeroHandler = () => {
        setCount('');
    }

    const userRequest = async () => {
        const response = await axios.get(`http://localhost:8080/user/${ctx.username}`);
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
        e.preventDefault();
        if (count === null || count < 1) {
            console.log('dd');
        } else {
               setOrderState(true)
        userRequest();    
        }
 
    }

    const onChangeHandler = () => {
        setOrderState(false);
    }

    const updateHandler = () => {
        navigagte(`/proupdate/${id}`);
    }

    const delectHandler = () => {
        axios({
            url: `http://localhost:8080/stop/${id}`,
            method: 'put'
        }).then(function a(response) {
            console.log(response);
            navigagte('/');
        }).catch(function (error) {
            console.log(error);
        });
    }

    const startHandler = () => {
        axios({
            url: `http://localhost:8080/start/${id}`,
            method: 'put'
        }).then(function a(response) {
            console.log(response);
            navigagte('/');
        }).catch(function (error) {
            console.log(error);
        });
    }

    return <>
        {orderState && <OrderModal
            onConfirm={onChangeHandler}
            proid={id}
            count={count}
            pemail={userEmail}
            pemailAddress={emailAddress}
            proname={itemData[0].proname}
        />}
        <div className={classes.header}>상세페이지</div>
    {itemData[0] &&
            <div className={classes.item}>
                <div className={classes.head}>
                    <h1>{itemData[0].proname}</h1>
                    <div className={classes.cartegory}>
                        {cart[0] && <div>#{cart[0]}</div>}
                        {cart[1] && <div>#{cart[1]}</div>}
                        {cart[2] && <div>#{cart[2]}</div>}
                    </div>
                    <p>판매자 : {itemData[0].usernick}</p>
                </div>
                <div className={classes.imgbox}>
                    <img src={itemData[0].proimg} alt="사진"></img>
                </div>
                <div className={classes.cont}>
                    <div className={classes.tag}>
                        {itemData[0].quantity === 0 && <div className={classes.no}>품절</div>}
                        {itemData[0].username === ctx.username && <div className={classes.my}>MY</div>}
                        {itemData[0].state === 0 && <div className={classes.stop}>판매중지</div>}
                    </div>
                    <div className={classes.itemcont}>{itemData[0].procont}</div>
                    <div className={classes.info}>
                        <div>가격 : {itemData[0].price} 원</div>
                        <div>남은 수량 : {itemData[0].quantity}개</div>
                        {ctx.username ?
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
                        {itemData[0].username === ctx.username && <div className={classes.update}>
                            <div onClick={updateHandler}>수정</div>
                            {itemData[0].state === 1 ?
                                <div onClick={delectHandler}>삭제</div> :
                                <div onClick={startHandler}>판매 시작</div>}
                        </div>}
                    </div>
                </div>
        </div>}
    </>
     
   
}

export default Item;