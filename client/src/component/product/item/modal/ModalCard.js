import React, { useState } from "react";
import './Modal.css';

const ModalCard = ({ onCashInfo }) => {
    
    const [cashData, setCashData] = useState({});

    const [cardNum, setCardNum] = useState('');
    const [codeYear, setCodeYear] = useState('');
    const [codeCvg, setCodeCvg] = useState('');

    const onBankHandler = (e) => {
        setCashData({
            ...cashData,
            bank: e.target.value
        })
        onCashInfo(cashData);
    }

    const cardNumHandler = (e) => {
        if (e.target.value.length < 13) {
            setCardNum(String(e.target.value).replace(/[^0-9]/g, ""));
        setCashData({
            ...cashData,
            cardnum: e.target.value
        })
        onCashInfo(cashData);
        }  
    }
    
    const onCodeHandler = (e) => {
        setCashData({
            ...cashData,
            month : e.target.value
        })
        onCashInfo(cashData);
    }

    const onYearHandler = (e) => {
        if (e.target.value.length < 3) {
            setCodeYear(String(e.target.value).replace(/[^0-9]/g, ""));
        setCashData({
            ...cashData,
            year: e.target.value
        })
        onCashInfo(cashData);
        }
        
    }

    const onCvgHandler = (e) => {
        if (e.target.value.length < 4) {
        setCodeCvg(String(e.target.value).replace(/[^0-9]/g, ""));
        setCashData({
            ...cashData,
            cvg: e.target.value
        })
        onCashInfo(cashData);     
        }
         
    }
    return <div className="modalcard">
                <div className="bank">
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
                <div className="cardnum">
                    <label htmlFor="cardnum">카드번호</label>
            <input
                id="cardnum"
                type="text"
                onChange={cardNumHandler}
                value={cardNum}
                placeholder="숫자만 작성부탁!"
                minLength="12"
            />
                </div>
                <div className="code">
                    <label htmlFor="code">유효기간 및 보안 코드</label>
                    <div className="codebox">
                        <select id="code" onChange={onCodeHandler}>
                            <option value="" hidden>==</option>
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
                        <input type="text" onChange={onYearHandler} className="year" minLength="2" value={codeYear} />
                        <input type="text" onChange={onCvgHandler} className="cvg" minLength="3" value={codeCvg} /><p>cvg</p>
                    </div>
                </div> 
            </div>
}

export default ModalCard;