import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserUpdate = ({name, isLoginCheck}) => {
    const [nickName, setNickName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordChk, setPasswordChk] = useState(false);

    const navigagte = useNavigate();

    const nickChangeHandler = (e) => {
        setNickName(e.target.value);
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value);
    }
    const passwordChkHandler = (e) => {
        if (password === e.target.value) {
            setPasswordChk(true);
        } else {
            setPasswordChk(false);
        }
    }

    const nickSubmitHandler = (e) => {
        e.preventDefault();
        const no = name;
        const nickname = {
            usernick: nickName
        }
        axios({
            url: `http://localhost:8080/usernick/${no}`,
            method: 'put',
            data: nickname
        }).then(function a(response) {
            console.log("good");
            alert("변경 되었습니다. 로그인을 다시 해주세요");
            isLoginCheck(false);
            localStorage.removeItem('lim-token');
            navigagte('/');
        })

    }

    const passwordSubmitHandler = (e) => {
        e.preventDefault();
        if (password.trim().length > 3) {
            const no = name;
            const updatepw = {
                userpassword: password
            }
            axios({
                url: `http://localhost:8080/userpassword/${no}`,
                method: 'put',
                data: updatepw
            }).then(function a(response) {
                console.log("good");
                alert("변경 되었습니다. 로그인을 다시 해주세요");
                isLoginCheck(false);
                localStorage.removeItem('lim-token');
                navigagte('/');
            })
        } else {
            alert('space bar 누르지 말아주세요.')
        }
    }



    return (
        <div>
            <h1>정보수정</h1>
            <form onSubmit={nickSubmitHandler}>
                <label>닉네임</label>
                <input type="text" onChange={nickChangeHandler} value={nickName} minLength="1" />
                <button>닉네임 변경</button>
            </form>
            <form onSubmit={passwordSubmitHandler}>
            <div>
                <label>비밀번호</label>
                <input type="password" onChange={passwordHandler} value={password} minLength="4" />
            </div>
            <div>
                <label>비밀번호 확인</label>
                    <input type="password" onChange={passwordChkHandler} />
                    {passwordChk ? <>맞씁</> : <>틀</>}
                </div>
                <button>비번변경</button>
                </form>
                
                

        </div>
    )
}

export default UserUpdate;