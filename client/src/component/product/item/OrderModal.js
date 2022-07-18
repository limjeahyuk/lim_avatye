import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalCont from "./modal/ModalCont";
import classes from './OrderModal.module.css'

const Modal = ({ onConfirm, proid, username, count, updatecount }) => {
    
    const navigate = useNavigate();

    const [cashApper, setCashApper] = useState(false);
    const [cashOption, setCashOption] = useState('');
    const [cashInfo, setCashInfo] = useState({});
    const [email, setEmail] = useState('');
    const [emailFull, setEmaillFull] = useState('');

    const onCashHandler = (e) => {
        setCashApper(true)
        setCashOption(e.target.value);
    }

    const cashInfoHandler = (data) => {
        setCashInfo( data );
    }

    const onEmailHandler = (e) => {
        setEmail(String(e.target.value).replace(/ /g,""));
    }

    const onEmailAddress = (e) => {
        setEmaillFull(email + "@" + e.target.value);
    }

    const cashSubmitHandler = (e) => {
        e.preventDefault();
        if (cashApper) {
            console.log("ee");
            
            onConfirm();
        const orderData = {
            proid: proid,
            username: username,
            count: count,
            orderdate: new Date().toISOString().slice(0, 10),
            updatecount: updatecount,
            type: cashOption,
            data: JSON.stringify(cashInfo),
            email: emailFull
        };
        
        axios({
            url: "http://localhost:8080/buy",
            method: 'post',
            data: orderData
        }).then(function a(response) {
            alert('구매가 완료되었습니다.')
            navigate('/');
        }).catch(function (error) {
            console.log(error);
        });


        }
        
    }


    return <div>
        <div className={classes.backdrop} onClick={onConfirm}></div>
            <div className={classes.modal}>
                <header className={classes.header}>
                    <h2>결제 창</h2>
            </header>
            <form onSubmit={cashSubmitHandler}>
                <div className={classes.content}>
                    
                    <label>결제수단</label>
                    <select onChange={onCashHandler}>
                        <option value="none" hidden>===선택===</option>
                        <option value="신용카드">신용카드</option>
                        <option value="카카오페이">카카오페이</option>
                        <option value="Toss">Toss</option>
                        <option value="문화상품권">문화상품권</option>
                    </select>
                    {cashApper && <>
                        <h3>결제정보</h3>
                        <ModalCont cashtype={cashOption} onCashInfo={cashInfoHandler} />
                        <div>
                    <label>이메일</label>
                            <input type="text" value={email} onChange={onEmailHandler} />
                    @
                    <select onChange={onEmailAddress}>
                        <option value="none" hidden > ===</option>
                        <option value="naver.com">naver.com</option>
                        <option value="nate.com">nate.com</option>
                        <option value="gmail.com">gmail.com</option>
                        <option value="avatye.com">avatye.com</option>
                    </select>
                </div>
                    </>}
                    
                </div>
                <footer className={classes.actions}>
                    <button type="submit">Okay</button>
                </footer>
                </form>
            </div>
    </div>
}

export default Modal;