import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MyPage = () => {
    const [userData, setUserData] = useState({});
    const [userNick, setUserNick] = useState('');
    const [userPro, setUserPro] = useState({});
    const [userProId, setUserProId] = useState('');

    const { id } = useParams();

    const sendRequest = async () => {
        const response = await axios.get(`http://localhost:8080/mypage/${id}`);
        setUserData(response.data);
        console.log(response.data);
        setUserNick(response.data[0].usernick);
    };

    const proRequest = async () => {
        const response = await axios.get(`http://localhost:8080/pro/${id}`);
        setUserPro(response.data);
        console.log(response.data);
        setUserProId(response.data[0].userid)
    }

    useEffect(() => {
        sendRequest();
        proRequest();
    }, []);


 
        return (
            <div>
                {userNick && <div>
            <div>
                <h1>{userNick}</h1>
            </div>
            <div>
                <h2>구매한 내역</h2>
                    {userData.map((item) => (
                        <div key={item.orderid}>
                            <div>{item.proname}</div>
                            <img src={item.proimg} alt="img" />
                            <div>{item.price * item.count}원</div>
                            <div>{item.count}개 구매</div>
                            <div>{item.orderdate}</div>
                        </div>
                    ))}
                    </div>
                </div>
                }
                <div>
                    {userProId &&
                    <div>
                    <h1>{userProId}</h1>
                    <h2>등록한 상품</h2>
                    <div>
                        {userPro.map((item) => (
                            <div key={item.proid}>
                                <div>{item.proname}</div>
                                <img src={item.proimg} alt="igm"></img>
                                <div>{item.price}</div>
                                <div>{item.quantity }</div>
                                </div>
                        ))}
                    </div>
                        </div> 
                    }
                    </div>
                    </div>
        )
}
    
    
    

export default MyPage;