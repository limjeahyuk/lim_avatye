import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MyBuyHistory from "./MyBuyHistory";
import classes from './MyPage.module.css'
import MyProfile from "./MyProfile";
import MySellHistory from "./MySellHistory";

const MyPage = ({userId, isLoginCheck}) => {
    const [userNick, setUserNick] = useState('');
    const [userPro, setUserPro] = useState({});
    const [userProId, setUserProId] = useState('');

    const [tabState, setTabState] = useState(1);

    const { id } = useParams();

    const navigagte = useNavigate();

    const onTabHandler1 = () => { setTabState(1); } 
    const onTabHandler2 = () => { setTabState(2); } 
    const onTabHandler3 = () => { setTabState(3); } 
    


    const sendRequest = async () => {
        const response = await axios.get(`http://localhost:8080/mypage/${id}`);
        setUserNick(response.data[0].usernick);
    };


    useEffect(() => {  
        sendRequest();
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
                    <div className={classes.tab}>
                        <div className={`${tabState === 1 && classes.click}`} onClick={onTabHandler1} name="1">유저 프로필</div>
                        <div className={`${tabState === 2 && classes.click}`} onClick={onTabHandler2} name="2">구매 내역</div>
                        <div className={`${tabState === 3 && classes.click}`} onClick={onTabHandler3} name="3">등록한 상품</div>
                    </div>
                    {tabState === 1 && <MyProfile />}
                    {tabState === 2 && <MyBuyHistory />}
                    {tabState === 3 && <MySellHistory />} 
                </div>
            }
        </div>
    )
}
    
    
    

export default MyPage;