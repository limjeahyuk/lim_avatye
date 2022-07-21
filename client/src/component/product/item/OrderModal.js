import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalCont from "./modal/ModalCont";
import classes from './OrderModal.module.css'

const Modal = ({ onConfirm, proid, username, count, pemail, pemailAddress, usernick, proname }) => {
    
    const navigate = useNavigate();

    const [cashApper, setCashApper] = useState(false);
    const [cashOption, setCashOption] = useState('');
    const [cashInfo, setCashInfo] = useState({});
    const [email, setEmail] = useState('');
    const [emailAddress, setEmailAddress] = useState('')
    const [emailFull, setEmaillFull] = useState('');

    const onCashHandler = (e) => {
        setCashApper(true)
        setCashOption(e.target.value);
        setEmail(pemail);
        setEmailAddress(pemailAddress);
        setEmaillFull(pemail + "@" + pemailAddress);
    }

    const cashInfoHandler = (data) => {
        setCashInfo( data );
    }

    const onClearEmail = () => {
        setEmail('');
    }

    const onEmailHandler = (e) => {
        setEmail(String(e.target.value).replace(/ /g, ""));
    }

    const onEmailAddress = (e) => {
        setEmailAddress(e.target.value);
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
            type: cashOption,
            data: JSON.stringify(cashInfo),
            email: emailFull,
            usernick: usernick,
            proname: proname
        };
        
        axios({
            url: "http://localhost:8080/buy",
            method: 'post',
            data: orderData
        }).then(function a(response) {
            alert(response.data);
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
                    <div  className={classes.cashtype}>
                    <label>결제수단</label>
                    <select onChange={onCashHandler}>
                        <option value="none" hidden>===선택===</option>
                        <option value="신용카드">신용카드</option>
                        <option value="카카오페이">카카오페이</option>
                        <option value="Toss">Toss</option>
                        <option value="문화상품권">문화상품권</option>
                        </select>
                        </div>
                    {cashApper && <>
                        <div className={classes.info}>
                            <h3>결제정보</h3>
                            <p>- 전부 채워주세요 -</p>
                            </div>
                        <ModalCont cashtype={cashOption} onCashInfo={cashInfoHandler} />
                        <div className={classes.email}>
                            <label>이메일</label>
                            <div className={classes.emailbox}>
                            <input type="text" value={email} onChange={onEmailHandler} onClick={onClearEmail} minLength="6" />
                    @
                    <select onChange={onEmailAddress} value={emailAddress}>
                        <option value="" hidden > ===</option>
                        <option value="naver.com">naver.com</option>
                        <option value="nate.com">nate.com</option>
                        <option value="gmail.com">gmail.com</option>
                        <option value="avatye.com">avatye.com</option>
                    </select>
                                </div>
                </div>
                    </>}
                    
                </div>
                <footer className={classes.actions}>
                    <button disabled={cashApper ? false : true} type="submit">Okay</button>
                </footer>
                </form>
            </div>
    </div>
}

export default Modal;