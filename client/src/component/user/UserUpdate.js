import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from './UserUpdate.module.css'

const UserUpdate = ({ name, isLoginCheck }) => {
    // input 창
    const [nickName, setNickName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordChk, setPasswordChk] = useState(false);
    const [passwordCheck, setPasswordCheck] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    // user data 가져오기
    const [userNick, setUserNick] = useState('');
    const [userPw, setUserPw] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userAddress, setUserAddress] = useState('');

    const [data, setData] = useState({})

    const navigagte = useNavigate();

    // input 창 관리
    const nickChangeHandler = (e) => {
        setNickName(e.target.value);
        setData({
            ...data,
            usernick: e.target.value
        })
        if (e.target.value === "") {
            setData({
                ...data,
                usernick: userNick
            })
        }
    }
    const nickClickHandler = (e) => {
        setNickName('');
        setData({
            ...data,
            usernick: userNick
        })
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value);
        setPasswordCheck('');
    }
    const passwordChkHandler = (e) => {
        setPasswordCheck(e.target.value);
        if (password === e.target.value) {
            setPasswordChk(true);
            setData({
                ...data,
                userpw: e.target.value
            })
        } else {
            setPasswordChk(false);
            setData({
                ...data,
                userpw: userPw
            })
        }
    }
    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
        setData({
            ...data,
            email: e.target.value+"@"+address
        })
    }
    const emailClickHandler = (e) => {
        setEmail('');
        setData({
            ...data,
            email: userEmail+"@"+userAddress
        })
    }
    const addressChangeHandler = (e) => {
        setAddress(e.target.value)
        setData({
            ...data,
            email: email+"@"+e.target.value
        })
    }

    // 유저 정보 가져오고 기본값 설정.
    const sendRequest = async () => {
        const response = await axios.get(`http://localhost:8080/user/${name}`);
        setUserNick(response.data[0].usernick);
        setNickName(response.data[0].usernick);
        setUserPw(response.data[0].userpw);
        setUserEmail(response.data[0].email.split('@')[0]);
        setUserAddress(response.data[0].email.split('@')[1]);
        setEmail(response.data[0].email.split('@')[0]);
        setAddress(response.data[0].email.split('@')[1]);
        setData({
        usernick: response.data[0].usernick,
        userpw: response.data[0].userpw,
        email: response.data[0].email.split('@')[0]+"@"+response.data[0].email.split('@')[1]
        })
        console.log(response.data);
    };

    useEffect(() => {
        sendRequest();
    }, [])
    
   

    const updateSubmitHandler = (e) => {
        e.preventDefault();
        console.log(data);
         axios({
            url: `http://localhost:8080/update/${name}`,
            method: 'put',
            data: data
        }).then(function a(response) {
            console.log("good");
            alert("변경 되었습니다. 로그인을 다시 해주세요");
            isLoginCheck(false);
            localStorage.removeItem('lim-token');
            navigagte('/');
        })

    }


    return (
        <div className={classes.cont}>
            <h1>정보수정</h1>
            <form onSubmit={updateSubmitHandler}>
                <div>
                    <label>닉네임 변경</label>
                    <input type="text" onChange={nickChangeHandler} value={nickName} minLength="1" onClick={nickClickHandler} />
                </div>
                <div>
                    <label>비밀번호 변경</label>
                    <input type="password" onChange={passwordHandler} value={password} minLength="4" />
                </div>
                <div>
                    <label>비밀번호 확인</label>
                    <div >
                        <input type="password" value={passwordCheck} onChange={passwordChkHandler} />
                        {passwordChk ? <div className={classes.good}>맞습니다 ^_^</div> : <div className={classes.pwd}>비밀번호를 한 번 더 작성해주세요</div>}
                    </div>
                    </div>
                <div className={classes.emailbox}>
                    <label>이메일 변경</label>
                    <div className={classes.email}>
                        <input type="text" value={email} onChange={emailChangeHandler} onClick={emailClickHandler} />@ 
                        <select value={address} onChange={addressChangeHandler}>
                            <option value="naver.com">naver.com</option>
                            <option value="nate.com">nate.com</option>
                            <option value="gmail.com">gmail.com</option>
                            <option value="avatye.com">avatye.com</option>
                        </select>
                    </div>
                </div>
                <button>submit</button>
            </form>
        </div>
    )
}

export default UserUpdate;