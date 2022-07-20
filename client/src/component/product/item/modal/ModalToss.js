import React, { useState } from "react";
import './Modal.css';

const ModalToss = ({ onCashInfo }) => {

    const [cashData, setCashData] = useState({});

    const [firstNum, setFirstNum] = useState('');
    const [twoNum, setTwoNum] = useState('');
    const [threeNum, setThreeNum] = useState('');

    const onFirstHandler = (e) => {
        if (e.target.value.length < 4) {
            setFirstNum(String(e.target.value).replace(/[^0-9]/g, ""));
        }
    }

    const onTwoHandler = (e) => {
        if (e.target.value.length < 5) {
            setTwoNum(String(e.target.value).replace(/[^0-9]/g, ""));
        }
    }

    const onThreeHandler = (e) => {
        if (e.target.value.length < 5) {
            setThreeNum(String(e.target.value).replace(/[^0-9]/g, ""));
            setCashData({
                phone: firstNum + "-" + twoNum + "-" + threeNum
            })
        }
        onCashInfo(cashData)
    }
    


    return <div className="modaltoss">
                
                    <label htmlFor="phone">휴대폰번호</label>
                    <div>
                        <input id="phone" type="text" value={firstNum} onChange={onFirstHandler} minLength="3" />
                        -
                        <input type="text" value={twoNum} onChange={onTwoHandler} minLength="4" />
                        -
                        <input type="text" value={threeNum} onChange={onThreeHandler} minLength="4" />
                    </div>
                
            </div>
}

export default ModalToss;