import React, { useEffect, useState } from "react";
import classes from './HeadBox.module.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';

const HeadBox = ({userName, userId, isLogin, isLoginCheck}) => {
    const [userNick, setUserNick] = useState('');
    const [searchCont, setSearchCont] = useState('');
    
    const navigagte = useNavigate()

    const sendRequest = async () => {
        const response = await axios.get(`http://localhost:8080/user/${userName}`);
        setUserNick(response.data[0].usernick);
    };

    useEffect(() => {
        if (userName) {  
        sendRequest();
        }
    });

    const logoutHandler = () => {
        isLoginCheck(false);
        localStorage.removeItem('lim-token');
        navigagte('/');
    }

    const onSearchHandler = (e) => {
        setSearchCont(String(e.target.value).replace(/\//g,""));
    }

    const onSearchClear = () => {
        setSearchCont('');
    }

    const onSearchSubmitHandelr = (e) => {
        e.preventDefault();
        navigagte(`/search/${searchCont}`);
        
    }

    return (<div className={classes.headbox}>
        <div className={classes.intro}>
            {isLogin ? <div className={classes.logout}>
                <div onClick={logoutHandler}>logout</div>
                |
                <Link to={'/mypage/' + userId}>{userNick} 님</Link></div>
            : <div className={classes.user}>
                <Link to='/login'>login</Link>
                |
                <Link to='/sign'>sign</Link>
            </div>}
            

        </div>
        <div className={classes.logo}>
            <Link to="/">Avatye Project</Link>
        </div>
        <div className={classes.search}>
            <form onSubmit={onSearchSubmitHandelr}>
                <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={searchCont}
                    onChange={onSearchHandler}
                    onClick={onSearchClear}
                />
                <button><SearchIcon/></button>
            </form>
        </div>
        <div className={classes.post}>
            {isLogin && 
            <Link to="/post">상품등록</Link> }
        </div>
    </div>)
}

export default HeadBox;