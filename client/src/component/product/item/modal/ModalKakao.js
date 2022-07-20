import React, { useState } from "react";
import './Modal.css';

const ModalKakao = ({ onCashInfo }) => {
    const [qrcode, setQRcode] = useState(false);

    const onQRcodeHandler = (e) => {
        setQRcode(true);
        onCashInfo({
            cash : "kakao"
        })
    }

    return <div className="modalkakao">
        {!qrcode && <button onClick={onQRcodeHandler}>QRcode 펼치기</button>}
        {qrcode && <img src="/qrcode.png" alt="qrcode" />} 
            </div>
}

export default ModalKakao;