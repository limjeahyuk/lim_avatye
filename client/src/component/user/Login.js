import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
 import classes from './Login.module.css';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [userpw, setUserpw] = useState('');
    const navigate = useNavigate();

    const idChangeHandler = (e) => {
        setUsername(e.target.value);
    }

    const pwChangeHandler = (e) => {
        setUserpw(e.target.value);
    }

    // login 확인 
    const loginHandler = (e) => {
        e.preventDefault();
        
        if (username.trim().length > 0 && userpw.trim().length > 0) {
            const loginData = {
                username: username.trim(),
                password: userpw.trim()
            };

            //login api
            axios({
                url: 'http://localhost:8080/login',
                method: 'post',
                data: loginData
            }).then(function a(response) {
                console.log(response.data);
            if (response.data[0].username === username.trim() || response.data[0].userpassword === userpw.trim()) {
                // login성공
                localStorage.setItem('lim-token', response.data.token);
                props.isLoginCheck(true);
                navigate('/');             
            } else {
                //로그인 x
                alert('틀렸습니다.');
            }
            }).catch(function (error) {
                console.log(error);
            });
        } else {
            alert('입력해주세요')
        }

    }

    return (<div>
        <h2>로그인</h2>
        <form onSubmit={loginHandler}>
            <div>
                아이디
                <input type='text' onChange={idChangeHandler} value={username} minLength="4" />
            </div>
            <div>
                비밀번호
                <input type='password' onChange={pwChangeHandler} value={userpw} minLength="4" />
            </div>
            <button disabled={username.trim().length > 0 && userpw.trim().length > 0 ? false : true}
                type="submit">로그인</button>
            
        </form>
    </div>)
}

export default Login;