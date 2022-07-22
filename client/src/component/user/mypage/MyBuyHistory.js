import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MyBuyHistory = () => {
    const [userData, setUserData] = useState();

    const { id } = useParams();

    const sendRequest = async () => {
        const response = await axios.get(`http://localhost:8080/mypage/${id}`);
        setUserData(response.data);
    };

    useEffect(() => {
        sendRequest();
    },[])


    return <div>
        
    </div>
}

export default MyBuyHistory;