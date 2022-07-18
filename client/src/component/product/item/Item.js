import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from './Item.module.css';

const Item = (props) => {
    const [itemData, setItemData] = useState({});
    const [count, setCount] = useState(0);
    const navigate = useNavigate();
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

    // 구매버튼 눌렀을 때
    const buySubmitHandler = (e) => {
        e.preventDefault();
        
        const orderData = {
            proid: id,
            username: props.name,
            count: count,
            orderdate: new Date().toISOString().slice(0, 10),
            updatecount: itemData[0].quantity - count
        };
        
        axios({
            url: "http://localhost:8080/buy",
            method: 'post',
            data: orderData
        }).then(function a(response) {
            alert('구매가 완료되었습니다.')
            navigate('/');
        }).catch(function (error) {
            console.log(error);
        });
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
                    <div className={classes.tag}>
                        <div className={classes.car}>{itemData[0].proca}</div>
                    </div>
                    <div className={classes.itemcont}>{itemData[0].procont}</div>
                    <div className={classes.info}>
                        <div>가격 : {itemData[0].price} 원</div>
                        <div>남은 수량 : {itemData[0].quantity}개</div>
                        {props.name ?
                            <form className={classes.buy} onSubmit={buySubmitHandler}>
                                <input
                                    type="number"
                                    min="1"
                                    max={itemData[0].quantity}
                                    value={count}
                                    onChange={countHandler}
                                    onClick={inputZeroHandler}
                                />
                                <button type="submit" disabled={props.name ? false : true}>구매</button>
                            </form> :
                            <div className={classes.alrt}>로그인 먼저 해주세요</div>}
                    </div>
                </div>
        </div>}
    </>
     
   
}

export default Item;