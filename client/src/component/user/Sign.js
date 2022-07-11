import axios from "axios";
import React, { useState } from "react";
import classes from './Sign.module.css';

const Sign = () => {
    // input 창
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [userNick, setUserNick] = useState('');

    // 확인
    const [idValid, setIdValid] = useState('1');
    const [pwValid, setPwValid] = useState('');


    // input창 value 관리
    const idChangeHandler = (e) => {
        setUserId(e.target.value);
    }

    const pwChangeHandler = (e) => {
        setUserPw(e.target.value);
    }

    const pwhChangeHandler = (e) => {
        if (userPw === e.target.value) {
            setPwValid(true)
        } else {
            setPwValid(false);
        }
    }

     const nickChangeHandler = (e) => {
        setUserNick(e.target.value);
     }
    
    //중복체크 클릭
    const idValidHandler = () => {

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
    }
    
    
    //form 정보 보내기
    const signSubmitHandler = (e) => {
        e.preventDefault();

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

        }).catch(function (error) {
            console.log(error);
        });

    }

    return (<div>
        <h2>
            회원가입
        </h2>
        <form onSubmit={signSubmitHandler}>
            <div>
                아이디
                <input type="text" onChange={idChangeHandler} value={userId} />
                <button type="button" onClick={idValidHandler}>중복체크</button>
            </div>
            <div className={idValid === '1' ? classes.none : classes.block}>
                {idValid === '2' ? <div>good</div> : <div>에러</div>}
                </div>
            <div>
                비밀번호
                <input type="password" onChange={pwChangeHandler} value={userPw} />
            </div>
            <div>
                비밀번호 확인
                <input type="password" onChange={pwhChangeHandler} />
            </div>
            <div>
                닉네임
                <input type="text" onChange={nickChangeHandler} value={userNick} />
            </div>
            <button type="submit"
            disabled={idValid === '2' && pwValid ? false : true}>등록</button>
        </form>
    </div>)
}

export default Sign;