import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import axios from "axios";
import classes from './MyProfile.module.css'

const MyProfile = ({username}) => {
    const [userData, setUserData] = useState({
        email: '',
        username: '',
        usernick: ''
    });
    const { id } = useParams();

    const navigagte = useNavigate();

    const userUpdateHandler = () => {
        navigagte('/userupdate');
    }


    const sendRequest = async () => {
        const response = await axios.get(`http://localhost:8080/profile/${username}`);
        setUserData(response.data[0]);
        console.log(response.data[0])
    };

    useEffect(() => {
        sendRequest();
    },[])

    return <div className={classes.cont}>
        
        <div className={classes.icon}>
            <PersonIcon />
        </div>
        <div className={classes.box}>
        {userData &&
            <div className={classes.info}>
            <div className={classes.nick}>{userData.usernick}</div>
                <div className={classes.id}>{userData.username}</div>
                    <div className={classes.email}>{userData.email}</div>
                    <div>선호하는 카테고리 :{ userData.cartegory_name}</div>
        </div>
            }
            
        
        <div className={classes.update}>
            <button onClick={userUpdateHandler}>정보 수정</button>
            </div>
            </div>
        
        
    </div>
}

export default MyProfile;