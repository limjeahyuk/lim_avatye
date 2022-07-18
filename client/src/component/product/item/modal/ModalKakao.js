import React, { useState } from "react";

const ModalKakao = ({ onCashInfo }) => {
    const [qrcode, setQRcode] = useState(false);

    const onQRcodeHandler = (e) => {
        setQRcode(true);
        onCashInfo({
            cash : "kakao"
        })
    }

    return <div>
        {!qrcode && <button onClick={onQRcodeHandler}>QRcode 펼치기</button>}
        {qrcode && <img src="/qrcode.png" alt="qrcode" />} 
            </div>
}

export default ModalKakao;