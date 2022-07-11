import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import classes from './Login.module.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [userpw, setUserpw] = useState('');
    // const [userCheck, setUserCheck] = useState(false);
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

        const loginData = {
            username: username,
            password: userpw
        };

        //login api
        axios({
            url: 'http://localhost:8080/login',
            method: 'post',
            data: loginData
        }).then(function a(response) {
            console.log(response.data);
           if (response.data[0].username === username || response.data[0].userpassword === userpw) {
            //    setUserCheck(true);
               sessionStorage.setItem('user', 'good');
               
           } else {
               //setUserCheck(false);
               alert('xx');
        }
        }).catch(function (error) {
            console.log(error);
        });

        

        // input 창 초기화
        // setUsername('');
        // setUserpw('');
    }

    return (<div>
        <h2>로그인</h2>
        <form onSubmit={loginHandler}>
            <div>
                아이디
                <input type='text' onChange={idChangeHandler} value={ username} />
            </div>
            <div>
                비밀번호
                <input type='password' onChange={pwChangeHandler} value={userpw} />
            </div>
            <button disabled={username.length > 0 && userpw.length > 0 ? false : true}
                type="submit">로그인</button>
            
        </form>
    </div>)
}

export default Login;