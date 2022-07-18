import React, { useState } from "react";
import './Modal.css'

const ModalCulture = ({onCashInfo}) => {
    const [cashData, setCashData] = useState({});

    const [firstNum, setFirstNum] = useState('');
    const [twoNum, setTwoNum] = useState('');
    const [threeNum, setThreeNum] = useState('');
    const [fourNum, setFourNum] = useState('');

    const onFirstHandler = (e) => {
        if (e.target.value.length < 5) {     
        setFirstNum(String(e.target.value).replace(/ /g, ""));
        }
        setFourNum('')
    }

    const onTwoHandler = (e) => {
        if (e.target.value.length < 5) {
           setTwoNum(String(e.target.value).replace(/ /g, "")); 
        }
        
        setFourNum('');
    }

    const onThreeHandler = (e) => {
        if (e.target.value.length < 5) {
            setThreeNum(String(e.target.value).replace(/ /g, ""));
        }
        
        setFourNum('');
    }

    const onFourHandler = (e) => {
        if (e.target.value.length < 5) {
            setFourNum(String(e.target.value).replace(/ /g, ""));
            setCashData({
                number: firstNum+twoNum+threeNum+e.target.value
            })
        }
        onCashInfo(cashData);  
    }

    return <div>    
                    <label htmlFor="num">문화상품권 번호</label>
                    <div>
            <input id="num" type="number" value={firstNum} onChange={onFirstHandler} maxLength='4' />
                        <input type="number" className="pw" value={twoNum} onChange={onTwoHandler} pattern=".{4,4}" required title="4글자"  />
                        <input type="number" value={threeNum} onChange={onThreeHandler} pattern=".{4,4}" required title="4글자"/>
                        <input type="number" className="pw" value={fourNum} onChange={onFourHandler} pattern=".{4,4}" required title="4글자" />
                    </div>
            </div>
}

export default ModalCulture;