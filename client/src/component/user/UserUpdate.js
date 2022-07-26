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


    const [data, setData] = useState({})

    const navigagte = useNavigate();

    // input 창 관리
    const nickChangeHandler = (e) => {
        setNickName(e.target.value)
        setData({
            ...data,
            usernick: e.target.value
        })
    }

    const nickClickHandler = (e) => {
        setNickName("");
        setData({
            ...data,
            usernick: ""
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
                userpw: ""
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
            email: ""
        })
    }
    const addressChangeHandler = (e) => {
        setAddress(e.target.value)
        if (email) {
            setData({
            ...data,
            email: email+"@"+e.target.value
        })
        } else {
            setData({
                ...data,
                email: ""
            })
        }
        
        
    }

    // 유저 정보 가져오고 기본값 설정.
    const sendRequest = async () => {
        const response = await axios.get(`http://localhost:8080/user/${name}`);
        setNickName(response.data[0].usernick);
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
                    <input type="text" onChange={nickChangeHandler} minLength="1" value={nickName} onClick={nickClickHandler} />
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
                        <input type="text" value={email} onChange={emailChangeHandler} onClick={emailClickHandler}  />@ 
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