import React, { useEffect, useState } from "react";
import classes from './HeadBox.module.css';
import { Link } from "react-router-dom";
import axios from "axios";

const HeadBox = (props) => {
    const [userNick, setUserNick] = useState('');

    const sendRequest = async () => {
        const response = await axios.get(`http://localhost:8080/user/${props.userName}`);
        setUserNick(response.data[0].usernick);
    };

    useEffect(() => {
        if (props.userName) {  
        sendRequest();
        }
    });

    const logoutHandler = () => {
        props.isLoginCheck(false);
        localStorage.removeItem('lim-token');
    }

    return (<div className={classes.headbox}>
        <div className={classes.intro}>
            {props.isLogin ? <div><div onClick={logoutHandler}>logout</div><div>{userNick}</div></div>
            : <div className={classes.user}>
                <Link to='/login'>login</Link>
                |
                <Link to='/sign'>sign</Link>
            </div>}
            

        </div>
        <div className={classes.logo}>
            <Link to="/">Avatye Project</Link>
        </div>
        <div>
            {props.isLogin && 
            <Link to="/post">상품등록</Link> }
        </div>
    </div>)
}

export default HeadBox;