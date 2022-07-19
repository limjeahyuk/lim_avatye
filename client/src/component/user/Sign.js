import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from './Sign.module.css';

const Sign = () => {
    // input 창
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [userNick, setUserNick] = useState('');
    const [userPwh, setUserPwh] = useState('');

    // 확인
    const [idValid, setIdValid] = useState('1');
    const [pwValid, setPwValid] = useState('');

    const navigate = useNavigate();


    // input창 value 관리
    const idChangeHandler = (e) => {
        setUserId(String(e.target.value).replace(/ /g,""));
    }

    const pwChangeHandler = (e) => {
        setUserPw(String(e.target.value).replace(/ /g, ""));
        setUserPwh('');
        setPwValid(false);
    }

    const pwhChangeHandler = (e) => {
        setUserPwh(String(e.target.value).replace(/ /g, ""));
        if (userPw === e.target.value) {
            setPwValid(true)
        } else {
            setPwValid(false);
        }
    }

     const nickChangeHandler = (e) => {
        setUserNick(String(e.target.value).replace(/ /g, ""));
     }
    
    //중복체크 클릭
    const idValidHandler = () => {
        if (userId.length > 3) {
            axios({
            url: 'http://localhost:8080/valid',
            method: 'post',
            data: { username: userId }
        }).then(function a(response) {
            console.log(response.data);
            if (response.data === 'good') {
                setIdValid('2');
            } else {
                setIdValid('3');
            }
        }).catch(function (error) {
            console.log(error);
        });
        } else {
            setIdValid('3');
        } 
    }
    
    
    //form 정보 보내기
    const signSubmitHandler = (e) => {
        
        e.preventDefault();

        if (idValid === '2' && pwValid) {
            if (userId.length > 3 && userPw.length > 3) {
                const userData = {
                    username: userId,
                    userpw: userPw,
                    usernick : userNick
                }
                axios({
                    url: "http://localhost:8080/sign",
                    method: 'post',
                    data: userData
                }).then(function a(response) {
                    console.log(response.data);
                    navigate('/');

                }).catch(function (error) {
                    console.log(error);
                });
            }
            else {
                alert("빈칸 없이 해주세요.");
            }
        } else {
            alert('다 채워주세요.')
        }
    }

    return (<div className={classes.cont}>
        <div className={classes.sign}>
            Sign
        </div>
        <form onSubmit={signSubmitHandler}>
            <div className={classes.box}>
                <label htmlFor="signid">아이디</label>
                <div className={classes.inputbox}>
                    <input type="text" id="signid" onChange={idChangeHandler} value={userId} minLength="4" placeholder="아이디를 입력하세요" />
                <button type="button" onClick={idValidHandler}>중복체크</button>    
                </div>
                <div className={idValid === '1' ? classes.none : classes.block}>
                {idValid === '2' ? <div>너무 좋아요 👍</div> : <div style={{color: 'red'}}>아이디가 중복입니다 👻</div>}
                </div>
            </div>
            
            <div className={classes.box}>
                <label htmlFor="signpw">비밀번호</label>
                <div className={classes.inputbox}>
                <input type="password" id="signpw" onChange={pwChangeHandler} value={userPw} minLength="4" placeholder="비밀번호를 입력하세요"/>
            </div>
                </div>
            <div className={classes.box}>
                <label htmlFor="signpwh">비밀번호 확인</label>
                <div className={classes.inputbox}>
                <input type="password" id="signpwh" onChange={pwhChangeHandler} value={userPwh} minLength="4" placeholder="비밀번호를 다시 입력하세요" />
                </div>
                </div>
            <div className={classes.box}>
                <label htmlFor="nick">닉네임</label>
                <div className={classes.inputbox}>
                <input type="text" id="nick" onChange={nickChangeHandler} value={userNick} minLength="1" placeholder="닉네임은 변경가능합니다." />
                </div>
                </div>
            <button type="submit" className={classes.subbtn}
            disabled={idValid === '2' && pwValid ? false : true}>등록</button>
        </form>
    </div>)
}

export default Sign;