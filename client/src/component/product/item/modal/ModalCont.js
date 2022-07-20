import React from "react";
import ModalCard from "./ModalCard";
import ModalCulture from "./ModalCulture";
import ModalKakao from "./ModalKakao";
import ModalToss from "./ModalToss";
import './Modal.css';

const ModalCont = ({ cashtype, onCashInfo }) => {
    
    const onCashData = (item) => {
        onCashInfo(item);
    }

    switch (cashtype){
        case '신용카드':
            return <ModalCard onCashInfo={onCashData} />
        case '카카오페이':
            return <ModalKakao onCashInfo={onCashData}/>
        case '문화상품권':
            return <ModalCulture onCashInfo={onCashData}/>
        case 'Toss':
            return <ModalToss onCashInfo={onCashData}/>
    }
}

export default ModalCont;