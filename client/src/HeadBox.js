import React, { useEffect, useState } from "react";
import classes from './HeadBox.module.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';

const HeadBox = ({userName, userId, isLogin, isLoginCheck}) => {
    const [userNick, setUserNick] = useState('');
    const [searchCont, setSearchCont] = useState('');
    const [searchSel, setSearchSel] = useState("all");
    
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
        navigagte(`/search/${searchCont.trim()}`, { state: searchSel });
        setSearchCont('');
    }

    const onChangeSel = (e) => {
        setSearchSel(e.target.value);
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
                <select onChange={onChangeSel} value={searchSel}>
                    <option value="all">전체</option>
                    <option value="cartegory">카테고리</option>
                    <option value="title">제목</option>
                    <option value="cont">내용</option>
                    <option value="nick">판매자</option>
                </select>
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
        {/* <div className={classes.post}>
            {isLogin && 
            <Link to="/post">상품등록</Link> }
        </div> */}
        <div className={classes.category}>
            <Link to='/category/아케이드'>아케이드</Link>
            <Link to='/category/퍼즐'>퍼즐</Link>
            <Link to='/category/RPG'>RPG</Link>
            <Link to='/category/기타'>기타</Link>
            <Link to='/category/로그라이크'>로그라이크</Link>
        </div>
    </div>)
}

export default HeadBox;