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
    };

    const proRequest = async () => {
        const response = await axios.get(`http://localhost:8080/pro/${id}`);
        setUserPro(response.data);
        setUserProId(response.data[0].userid)

    }

    useEffect(() => {  
        sendRequest();
        proRequest();
        if ("" + userId !== "" + id) {
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
                        {userData.map((item,index) => (
                                <ShopProduct
                                    bool={false}
                                    key={index}
                                    cont={item}
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
                            {userPro.map((item,index) => (   
                                <ShopProduct
                                    key={index}
                                    cont={item}
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