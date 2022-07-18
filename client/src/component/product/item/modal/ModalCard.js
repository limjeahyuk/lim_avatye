import React, { useState } from "react";

const ModalCard = ({ onCashInfo }) => {
    
    const [cashData, setCashData] = useState({});

    const onBankHandler = (e) => {
        setCashData({
            ...cashData,
            bank: e.target.value
        })
        onCashInfo(cashData);
    }

    const cardNumHandler = (e) => {
        setCashData({
            ...cashData,
            cardnum: e.target.value
        })
        onCashInfo(cashData);
    }
    
    const onCodeHandler = (e) => {
        setCashData({
            ...cashData,
            month : e.target.value
        })
        onCashInfo(cashData);
    }

    const onYearHandler = (e) => {
        setCashData({
            ...cashData,
            year: e.target.value
        })
        onCashInfo(cashData);
    }

    const onCvgHandler = (e) => {
        setCashData({
            ...cashData,
            cvg: e.target.value
        })
        onCashInfo(cashData);  
    }
    return <div>
                <div>
                    <label htmlFor="bank">은행</label>
                    <select id="bank" onChange={onBankHandler}>
                        <option value="none" hidden>==</option>
                        <option value="국민">국민은행</option>
                        <option value="신한">신한은행</option>
                        <option value="카카오">카카오뱅크</option>
                        <option value="농협">농협은행</option>
                        <option value="하나">하나은행</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="cardnum">카드번호</label>
                    <input id="cardnum" type="text" onChange={cardNumHandler} />
                </div>
                <div>
                    <label htmlFor="code">유효기간 및 보안 코드</label>
                    <div>
                        <select id="code" onChange={onCodeHandler}>
                            <option value="none" hidden>==</option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                        <input type="number" onChange={onYearHandler} />
                        <input type="number" onChange={onCvgHandler} /><p>cvg</p>
                    </div>
                </div> 
            </div>
}

export default ModalCard;