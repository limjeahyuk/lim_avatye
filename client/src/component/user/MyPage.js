import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ShopProduct from "../product/UI/ShopProduct";
import classes from './MyPage.module.css'

const MyPage = ({userId, isLoginCheck}) => {
    const [userData, setUserData] = useState({});
    const [userNick, setUserNick] = useState('');
    const [userPro, setUserPro] = useState({});
    const [userProId, setUserProId] = useState('');

    const { id } = useParams();

    const navigagte = useNavigate();

    const userUpdateHandler = () => {
        navigagte('/userupdate');
    }


    const sendRequest = async () => {
        const response = await axios.get(`http://localhost:8080/mypage/${id}`);
        setUserData(response.data);
        setUserNick(response.data[0].usernick);
        console.log(response.data);
    };

    const proRequest = async () => {
        const response = await axios.get(`http://localhost:8080/pro/${id}`);
        setUserPro(response.data);
        setUserProId(response.data[0].userid)
    }

    useEffect(() => {  
        if (""+userId === ""+id) {
            sendRequest();
            proRequest();
        } else {
            alert('비정상적인 접근입니다.');
            isLoginCheck(false);
            localStorage.removeItem('lim-token');
            navigagte('/');
        }  
    },[]);

    return (
        <div className={classes.cont}>
            {userNick &&
                <div className={classes.buy}>
                    <div className={classes.head}>
                    {userNick}님 환영합니다.
                    </div>
                     <div className={classes.buyhead}>구매 내역</div>
                    <div className={classes.list}>
                        {userData.map((item) => (
                                <ShopProduct
                                    bool={false}
                                    pdid={item.proid}
                                    userid={item.userid}
                                    key={item.orderid}
                                    img={item.proimg}
                                    name={item.proname}
                                    price={item.price * item.count}
                                    carte={item.proca}
                                    count={item.quantity}
                                    buycount={item.count}
                                    date={item.orderdate}
                                    id={userId}
                                />
                        ))}
                    </div>
                </div>
            }
                <div>
                    {userProId &&
                    <div className={classes.sell}>
                        <h1 style={{display:'none'}}>{userProId}</h1>
                        <div className={classes.sellhead}>등록한 상품</div>
                        <div className={classes.list}>
                            {userPro.map((item) => (   
                                <ShopProduct
                                    key={item.pdid}
                                    pdid={item.proid}
                                    userid={item.userid}
                                    name={item.proname}
                                    img={item.proimg}
                                    price={item.price}
                                    count={item.quantity}
                                    carte={item.proca}
                                    id={userId}
                                    bool={true}
                                />    
                            ))}
                        </div>
                    </div> 
                    }
                    <button onClick={userUpdateHandler}>정보수정</button>
                    </div>
                    </div>
        )
}
    
    
    

export default MyPage;